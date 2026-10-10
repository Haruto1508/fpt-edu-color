import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';

// Cấu hình Firebase từ biến môi trường Vite (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Kiểm tra xem cấu hình Firebase đã được điền hợp lệ chưa
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('YOUR_')
);

let app = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
  } catch (error) {
    console.error('Lỗi khởi tạo Firebase:', error);
  }
} else {
  console.info('ℹ️ Firebase chưa được cấu hình key trong .env. Ứng dụng sẽ dùng dữ liệu dự phòng (local/JSON).');
}

export { db };

const COLLECTION_NAME = 'contributed_words';

/**
 * Lấy danh sách các từ đã góp từ Firestore
 * @param {number} maxWords - Số lượng từ tối đa cần lấy (mặc định 100)
 * @returns {Promise<Array>} Danh sách các từ
 */
export async function getContributedWordsFromFirestore(maxWords = 100) {
  if (!isFirebaseConfigured || !db) {
    return null; // Báo hiệu chưa có Firebase để fallback
  }

  try {
    const wordsRef = collection(db, COLLECTION_NAME);
    const q = query(wordsRef, orderBy('createdAt', 'desc'), limit(maxWords));
    const querySnapshot = await getDocs(q);

    const result = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      result.push({
        id: doc.id,
        word: data.word || '',
        meaning: data.meaning || '',
        example: data.example || '',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString())
      });
    });

    return result;
  } catch (error) {
    console.error('Lỗi khi tải từ đóng góp từ Firestore:', error);
    return null;
  }
}

/**
 * Gửi một từ mới lên Cloud Firestore
 * @param {Object} wordData - { word, meaning, example }
 * @returns {Promise<Object>} Bản ghi vừa được tạo
 */
export async function addContributedWordToFirestore(wordData) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase chưa được cấu hình API Key');
  }

  const wordsRef = collection(db, COLLECTION_NAME);
  const docData = {
    word: wordData.word.trim(),
    meaning: wordData.meaning.trim(),
    example: wordData.example.trim() || 'Chưa có ví dụ cụ thể.',
    createdAt: serverTimestamp(),
    status: 'approved' // Mặc định hiển thị, bạn có thể đổi thành 'pending' nếu muốn duyệt thủ công
  };

  const docRef = await addDoc(wordsRef, docData);
  return {
    id: docRef.id,
    ...docData,
    createdAt: new Date().toISOString()
  };
}
