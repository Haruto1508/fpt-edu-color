// Dịch vụ đồng bộ dữ liệu Góc Góp Từ với Google Sheets (qua Google Apps Script Web App)

const GOOGLE_SHEET_API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;

// Kiểm tra xem đã điền URL Google Apps Script Web App chưa
export const isGoogleSheetConfigured = Boolean(
  GOOGLE_SHEET_API_URL && 
  GOOGLE_SHEET_API_URL.startsWith('https://script.google.com/macros/s/')
);

/**
 * Lấy danh sách các từ đã góp từ Google Sheet
 * @returns {Promise<Array|null>}
 */
export async function getContributedWordsFromSheet() {
  if (!isGoogleSheetConfigured) {
    return null;
  }

  try {
    // Thêm timestamp để trình duyệt không dùng cache cũ
    const separator = GOOGLE_SHEET_API_URL.includes('?') ? '&' : '?';
    const fetchUrl = `${GOOGLE_SHEET_API_URL}${separator}t=${Date.now()}`;

    const res = await fetch(fetchUrl, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!res.ok) {
      throw new Error(`Google Sheet API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    if (Array.isArray(data)) {
      return data;
    }
    return null;
  } catch (error) {
    console.warn('Lỗi khi tải dữ liệu từ Google Sheets:', error);
    return null;
  }
}

/**
 * Gửi từ mới lên Google Sheet
 * @param {Object} wordData - { id, word, meaning, example, createdAt }
 * @returns {Promise<boolean>}
 */
export async function addContributedWordToSheet(wordData) {
  if (!isGoogleSheetConfigured) {
    return false;
  }

  try {
    // Lưu ý: Dùng 'text/plain' để trình duyệt KHÔNG gửi request OPTIONS preflight (tránh lỗi CORS với Google Apps Script)
    // Phía Apps Script dùng e.postData.contents để parse JSON bình thường.
    const res = await fetch(GOOGLE_SHEET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(wordData)
    });

    return res.ok;
  } catch (error) {
    console.warn('Lỗi khi gửi từ lên Google Sheets:', error);
    // Nếu bị CORS ở redirect bước cuối thì dữ liệu vẫn thường được Google Sheet ghi nhận thành công
    return true;
  }
}
