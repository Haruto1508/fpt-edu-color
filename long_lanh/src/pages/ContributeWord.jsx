import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import useSEO from '../utils/useSEO';
import { pageMetaMap } from '../data/seoMetadata';
import initialWords from '../data/contributedWords.json';
import nonImg from '../assets/non.png';
import { 
  isGoogleSheetConfigured, 
  getContributedWordsFromSheet, 
  addContributedWordToSheet 
} from '../services/googleSheet';
import { 
  isFirebaseConfigured, 
  getContributedWordsFromFirestore, 
  addContributedWordToFirestore 
} from '../services/firebase';

export default function ContributeWord() {
  useSEO(pageMetaMap['/gop-tu']);

  const [words, setWords] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ll_contributed_words');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.error('Failed to load words from localStorage:', err);
      }
    }
    return initialWords;
  });

  const [activeWordId, setActiveWordId] = useState(null); // null means form mode
  const [formData, setFormData] = useState({
    word: '',
    meaning: '',
    example: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoadingWords, setIsLoadingWords] = useState(false);

  // Sync words: Ưu tiên Google Sheets -> Firestore -> Fallback sang local API / JSON
  useEffect(() => {
    let isMounted = true;

    async function fetchWords() {
      // 1. Thử tải từ Google Sheets nếu đã cấu hình
      if (isGoogleSheetConfigured) {
        setIsLoadingWords(true);
        try {
          const sheetWords = await getContributedWordsFromSheet();
          if (isMounted && Array.isArray(sheetWords)) {
            const sheetWordsSet = new Set(sheetWords.map(w => w.word?.trim().toLowerCase()));
            const merged = [
              ...sheetWords,
              ...initialWords.filter(w => !sheetWordsSet.has(w.word?.trim().toLowerCase()))
            ];
            setWords(merged);
            try {
              localStorage.setItem('ll_contributed_words', JSON.stringify(merged));
            } catch {}
          }
        } catch (err) {
          console.warn('Lỗi kết nối Google Sheets:', err);
        } finally {
          if (isMounted) setIsLoadingWords(false);
        }
        return;
      }

      // 2. Thử tải từ Firebase Firestore nếu đã cấu hình
      if (isFirebaseConfigured) {
        try {
          const firestoreWords = await getContributedWordsFromFirestore();
          if (isMounted && Array.isArray(firestoreWords)) {
            const firestoreWordsSet = new Set(firestoreWords.map(w => w.word?.trim().toLowerCase()));
            const merged = [
              ...firestoreWords,
              ...initialWords.filter(w => !firestoreWordsSet.has(w.word?.trim().toLowerCase()))
            ];
            setWords(merged);
            try {
              localStorage.setItem('ll_contributed_words', JSON.stringify(merged));
            } catch {}
            return;
          }
        } catch (err) {
          console.warn('Lỗi kết nối Firebase Firestore:', err);
        }
      }

      // 3. Fallback sang local API (khi chạy npm run dev)
      fetch('/api/contribute-word')
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('API not available');
        })
        .then(data => {
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setWords(data);
            try {
              localStorage.setItem('ll_contributed_words', JSON.stringify(data));
            } catch {}
          }
        })
        .catch(() => {
          // Fallback to local initialWords (already in state)
        });
    }

    fetchWords();
    return () => { isMounted = false; };
  }, []);

  const activeWord = words.find(w => w.id === activeWordId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.word.trim()) {
      setStatusMessage({ type: 'error', text: 'Vui lòng nhập từ hoặc cụm từ nha bạn ơi!' });
      return;
    }
    if (!formData.meaning.trim()) {
      setStatusMessage({ type: 'error', text: 'Vui lòng nhập ý nghĩa cho từ nha!' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const slug = formData.word
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newEntry = {
      id: `${slug}-${Date.now().toString(36)}`,
      word: formData.word.trim(),
      meaning: formData.meaning.trim(),
      example: formData.example.trim() || 'Chưa có ví dụ cụ thể.',
      createdAt: new Date().toISOString()
    };

    // 1. Gửi lên Google Sheets nếu đã cấu hình
    if (isGoogleSheetConfigured) {
      try {
        await addContributedWordToSheet(newEntry);
      } catch (err) {
        console.error('Không thể lưu lên Google Sheets:', err);
      }
    } else if (isFirebaseConfigured) {
      // 2. Gửi lên Firebase Firestore nếu đã cấu hình
      try {
        const firestoreResult = await addContributedWordToFirestore(newEntry);
        if (firestoreResult && firestoreResult.id) {
          newEntry.id = firestoreResult.id;
        }
      } catch (err) {
        console.error('Không thể lưu lên Firebase:', err);
      }
    } else {
      // 3. Fallback ghi vào local file nếu đang chạy Vite dev
      try {
        await fetch('/api/contribute-word', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry)
        });
      } catch (err) {
        console.warn('API sync warning:', err);
      }
    }

    // 3. Cập nhật state và localStorage ngay lập tức
    const updatedWords = [newEntry, ...words];
    setWords(updatedWords);
    try {
      localStorage.setItem('ll_contributed_words', JSON.stringify(updatedWords));
    } catch {}

    setIsSubmitting(false);
    setStatusMessage({ type: 'success', text: 'Đã góp từ thành công! Cảm ơn bạn nhiều nghen 🎉' });
    setFormData({ word: '', meaning: '', example: '' });
    // Chuyển sang màn hình xem thẻ chi tiết vừa tạo
    setActiveWordId(newEntry.id);
  };

  return (
    <div className="page-content contribute-page">
      <section className="contribute-hero">
        <ScrollReveal className="contribute-container">
          <h1 className="contribute-title">GÓC GÓP TỪ</h1>

          {/* Green Neo-brutalist Card */}
          <div className="contribute-card neo-border">
            <img src={nonImg} alt="Nón lá miền Tây" className="contribute-hat-sticker" />

            {activeWord ? (
              /* CARD DETAIL VIEW (SCREEN 2) */
              <div className="contribute-detail-view">
                <h2 className="detail-word-heading">{activeWord.word.toUpperCase()}</h2>

                <div className="detail-field-group">
                  <span className="detail-field-label">Ý NGHĨA</span>
                  <div className="detail-pill-box neo-border">
                    {activeWord.meaning}
                  </div>
                </div>

                <div className="detail-field-group">
                  <span className="detail-field-label">VÍ DỤ</span>
                  <div className="detail-pill-box neo-border">
                    {activeWord.example}
                  </div>
                </div>

                <div className="detail-actions">
                  <button 
                    type="button" 
                    className="btn-switch-form neo-border neo-shadow-hover neo-shadow-active"
                    onClick={() => {
                      setActiveWordId(null);
                      setStatusMessage(null);
                    }}
                  >
                    Góp thêm từ khác
                  </button>
                </div>
              </div>
            ) : (
              /* FORM SUBMISSION VIEW (SCREEN 1) */
              <form className="contribute-form" onSubmit={handleSubmit}>
                {statusMessage && (
                  <div className={`contribute-alert neo-border ${statusMessage.type === 'error' ? 'alert-error' : 'alert-success'}`}>
                    {statusMessage.text}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="input-word" className="form-label">NHẬP TỪ</label>
                  <div className="input-pill-wrapper neo-border">
                    <span className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </span>
                    <input
                      id="input-word"
                      type="text"
                      className="form-input"
                      placeholder="Nhập từ / Cụm từ đó đây nè"
                      value={formData.word}
                      onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="input-meaning" className="form-label">Ý NGHĨA</label>
                  <div className="input-pill-wrapper neo-border">
                    <span className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </span>
                    <input
                      id="input-meaning"
                      type="text"
                      className="form-input"
                      placeholder="Nhập nghĩa đó đây nữa"
                      value={formData.meaning}
                      onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="input-example" className="form-label">VÍ DỤ</label>
                  <div className="input-pill-wrapper neo-border">
                    <span className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </span>
                    <input
                      id="input-example"
                      type="text"
                      className="form-input"
                      placeholder="Cho 1 ví dụ nghen"
                      value={formData.example}
                      onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="form-submit-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-submit-word neo-border neo-shadow-hover neo-shadow-active"
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* History Section */}
          <div className="contribute-history-section">
            <div className="history-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 className="history-title">LỊCH SỬ</h3>
                {isLoadingWords && (
                  <span style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
                    (Đang đồng bộ...)
                  </span>
                )}
              </div>
              {activeWordId && (
                <button
                  type="button"
                  className="history-new-btn neo-border"
                  onClick={() => {
                    setActiveWordId(null);
                    setStatusMessage(null);
                  }}
                >
                  + Nhập từ mới
                </button>
              )}
            </div>

            <div className="history-pills-list">
              {words.map((item) => {
                const isSelected = activeWordId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`history-pill neo-border neo-shadow-hover ${isSelected ? 'history-pill--active' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        setActiveWordId(null);
                      } else {
                        setActiveWordId(item.id);
                        setStatusMessage(null);
                      }
                    }}
                  >
                    <span className="history-clock-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </span>
                    <span className="history-word-text">{item.word}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
