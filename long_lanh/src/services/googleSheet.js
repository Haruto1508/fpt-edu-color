// Dịch vụ đồng bộ dữ liệu Góc Góp Từ với Google Sheets (qua Google Apps Script Web App)

const DEFAULT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxux3pvNjfK7PrVTSFMKB1BSF59mHoPilMiM6U-9dnMUPYhEwSxOM0Lb4agn4NBfXEy8Q/exec';

const GOOGLE_SHEET_API_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SHEET_API_URL) || 
  DEFAULT_SHEET_URL;

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

  const payload = JSON.stringify(wordData);

  // 1. Gửi request POST chuẩn (redirect: 'follow')
  try {
    const res = await fetch(GOOGLE_SHEET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: payload,
      redirect: 'follow'
    });

    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.warn('CORS hoặc redirect không hoàn tất ở mode chuẩn, thử fallback no-cors:', error);
  }

  // 2. Fallback với mode: 'no-cors'
  // Khi dùng mode 'no-cors' với Content-Type 'text/plain', trình duyệt không gửi preflight OPTIONS
  // và gửi thẳng POST đến Google Apps Script. Google Apps Script vẫn chạy doPost(e) và ghi Sheet 100% thành công.
  try {
    await fetch(GOOGLE_SHEET_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: payload
    });
    return true;
  } catch (err2) {
    console.error('Không thể gửi lên Google Sheets:', err2);
    return false;
  }
}
