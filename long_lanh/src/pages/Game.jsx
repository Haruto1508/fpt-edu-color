import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gameQuestions } from '../data/gameQuestions';
import wordsData from '../data/words.json';
import { playSound } from '../utils/gameAudio';
import useSEO from '../utils/useSEO';
import { pageMetaMap } from '../data/seoMetadata';

import imgBoat from '../assets/game/start_game.png';
import imgWin from '../assets/game/win.png';
import imgWrong from '../assets/game/wrong.png';
import heroBg from '../assets/hero_bg.png';

export default function Game() {
  useSEO(pageMetaMap['/game']);

  const [gameState, setGameState] = useState('intro'); // 'intro' | 'question' | 'result' | 'summary'
  const [questions, setQuestions] = useState(gameQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Option index (0, 1, 2, 3)
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  // Chuyển sang câu tiếp theo
  const handleNextQuestion = useCallback(() => {
    playSound('click', isMuted);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setGameState('question');
    } else {
      setGameState('summary');
    }
  }, [currentIndex, isMuted, questions.length]);

  // Lắng nghe phím Enter hoặc Space khi ở màn hình kết quả để chuyển tiếp nhanh
  useEffect(() => {
    if (gameState !== 'result') return;
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleNextQuestion]);

  // Bắt đầu game
  const handleStartGame = () => {
    playSound('click', isMuted);
    setQuestions(gameQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setShowReview(false);
    setGameState('question');
  };

  // Chọn một đáp án
  const handleSelectOption = (idx) => {
    playSound('click', isMuted);
    setSelectedOption(idx);
  };

  // Bấm nút "CHỌN" để chấm điểm
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const chosen = currentQ.options[selectedOption];
    const correct = Boolean(chosen && chosen.isCorrect);

    setIsCorrect(correct);
    if (correct) {
      playSound('correct', isMuted);
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
    } else {
      playSound('wrong', isMuted);
      setStreak(0);
    }

    setUserAnswers(prev => [...prev, { questionId: currentQ.id, selected: selectedOption, isCorrect: correct }]);
    setGameState('result');
  };

  // Lấy danh hiệu miền Tây dựa trên điểm số
  const getBadgeTitle = (finalScore) => {
    const totalPossible = questions.length * 10;
    const percent = (finalScore / totalPossible) * 100;
    if (percent === 100) return { title: "DÂN MIỀN TÂY CHÍNH HIỆU 🌟", desc: "Rành rọt 6 câu vọng cổ, không từ nào làm khó được bạn!" };
    if (percent >= 80) return { title: "THỔ ĐỊA MIỀN SÔNG NƯỚC 😎", desc: "Nói câu nào chắc câu đó, đi chợ nổi là trả giá phà phà!" };
    if (percent >= 50) return { title: "TẬP SỰ GẶT LÚA 🌾", desc: "Nghe quen quen mà đôi chỗ còn hơi bỡ ngỡ, ráng thêm xíu nữa nha!" };
    return { title: "MỚI XUỐNG BẾN PHÀ 🥥", desc: "Vô ngay kho tàng tiếng lóng để tra cứu ôn bài liền thôi nè!" };
  };

  return (
    <div className={`game-page-wrapper ${gameState === 'result' ? 'game-page-wrapper-result' : ''}`} style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Top Floating Controls Bar */}
      {gameState !== 'result' && (
        <div className="game-top-bar">
          <Link to="/" className="game-back-link">
            ← Về trang chủ
          </Link>
          <div className="game-bar-right">
            <button 
              className="sound-toggle-btn neo-border neo-shadow-hover"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted ? "🔇 Tắt âm" : "🔊 Âm thanh"}
            </button>
          </div>
        </div>
      )}

      <div className="game-main-content">
        <AnimatePresence mode="wait">
          {/* MÀN HÌNH 1: INTRO / LOBBY (DEMO SCREEN 1) */}
          {gameState === 'intro' && (
            <motion.div 
              key="intro"
              className="game-screen game-screen-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="intro-hero-layout">
                {/* Cột trái: Hình ảnh thuyền 3 người bồng bềnh */}
                <motion.div 
                  className="intro-boat-col"
                  animate={{ y: [-5, 6, -5] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                >
                  <div className="boat-image-container">
                    <img 
                      src={imgBoat} 
                      alt="Ba bạn trẻ chèo thuyền miền Tây" 
                      className="boat-img"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>
                </motion.div>

                {/* Cột phải: Tiêu đề NỐI TỪ & Nút CHƠI THÔI */}
                <div className="intro-action-col">
                  <h1 className="game-title-huge">
                    ĐOÁN TỪ
                  </h1>
                  <p className="game-tagline">
                    Đố bạn biết đâu là tiếng lóng miền Tây chuẩn chỉnh trong từ điển Lóng Lánh!
                  </p>
                  <motion.button 
                    className="game-play-btn neo-border neo-shadow neo-shadow-hover neo-shadow-active"
                    onClick={handleStartGame}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    CHƠI THÔI
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* MÀN HÌNH 2: CÂU HỎI TRẮC NGHIỆM (DEMO SCREEN 2) */}
          {gameState === 'question' && (
            <motion.div 
              key={`question-${currentIndex}`}
              className="game-screen game-screen-quiz"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <div className="quiz-container">
                {/* Tiêu đề trên cùng */}
                <h2 className="quiz-top-title">ĐOÁN TỪ</h2>

                {/* Thanh trạng thái / tiến độ */}
                <div className="quiz-status-bar">
                  <span className="quiz-badge neo-border">
                    Câu {currentIndex + 1} / {questions.length}
                  </span>
                  <span className="quiz-badge badge-score neo-border">
                    {score} điểm
                  </span>
                  {streak > 1 && (
                    <span className="quiz-badge badge-streak neo-border">
                      Chuỗi x{streak}
                    </span>
                  )}
                </div>

                {/* Hộp câu hỏi màu vàng phong cách Neo-brutalism */}
                <div className="quiz-yellow-card neo-border neo-shadow">
                  <h3 className="quiz-question-text">
                    {currentQ.question}
                  </h3>

                  {/* Lưới 4 đáp án (2x2 grid) */}
                  <div className="quiz-options-grid">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      return (
                        <motion.button
                          key={idx}
                          type="button"
                          className={`quiz-option-btn neo-border neo-shadow ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelectOption(idx)}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="option-key">{opt.key}.</span>
                          <span className="option-text">{opt.text}</span>
                          {isSelected && <span className="option-check">✓</span>}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Nút CHỌN xanh lá cây */}
                  <div className="quiz-action-area">
                    <motion.button
                      type="button"
                      className={`quiz-submit-btn neo-border neo-shadow ${selectedOption === null ? 'disabled' : ''}`}
                      disabled={selectedOption === null}
                      onClick={handleSubmitAnswer}
                      whileHover={selectedOption !== null ? { scale: 1.06 } : {}}
                      whileTap={selectedOption !== null ? { scale: 0.94 } : {}}
                    >
                      CHỌN
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* MÀN HÌNH 3 & 4: KẾT QUẢ ĐÚNG / SAI - CÓ PHẦN GIẢI THÍCH CHI TIẾT */}
          {gameState === 'result' && (() => {
            const chosenOpt = selectedOption !== null ? currentQ.options[selectedOption] : null;
            const correctOpt = currentQ.options.find(opt => opt.isCorrect);
            const hasWordDetail = Boolean(currentQ.slug && wordsData.some(w => w.slug === currentQ.slug));

            return (
              <motion.div 
                key="result"
                className="game-screen game-screen-result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div 
                  className={`result-stage-layout ${isCorrect ? 'layout-win' : 'layout-wrong'}`}
                  onClick={handleNextQuestion}
                >
                  {isCorrect ? (
                    <>
                      {/* CỘT TRÁI: CHỮ "NGAY CHÓC LUÔN" & HỘP GIẢI THÍCH */}
                      <div className="result-text-col result-text-col-win">
                        <motion.div 
                          className="result-typography-win"
                          initial={{ opacity: 0, x: -35, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ type: 'spring', damping: 14, stiffness: 220 }}
                        >
                          <span className="result-win-line">NGAY</span>
                          <span className="result-win-line">CHÓC</span>
                          <span className="result-win-line">LUÔN</span>
                        </motion.div>

                        {/* HỘP GIẢI THÍCH KHI ĐÚNG */}
                        <motion.div 
                          className="result-explanation-card card-win neo-border neo-shadow"
                          onClick={(e) => e.stopPropagation()}
                          initial={{ opacity: 0, y: 20, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.12, duration: 0.35 }}
                        >
                          <div className="expl-card-header">
                            <span className="expl-badge expl-badge-win neo-border">
                              ✓ CHÍNH XÁC (+10 ĐIỂM)
                            </span>
                            {streak > 1 && (
                              <span className="expl-streak-tag neo-border">
                                🔥 Chuỗi x{streak}
                              </span>
                            )}
                          </div>

                          <div className="expl-word-row">
                            <span className="expl-word-title">{currentQ.correctWord || correctOpt?.text}</span>
                            {currentQ.meaning && (
                              <span className="expl-word-meaning"> = {currentQ.meaning}</span>
                            )}
                          </div>

                          {currentQ.explanation && (
                            <div className="expl-desc-box">
                              <p className="expl-desc">
                                <span className="expl-lightbulb">💡</span> {currentQ.explanation}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      </div>

                      {/* CỘT PHẢI: NHÂN VẬT CẦM TIỀN (WIN.PNG) CHẠM SÁT VIỀN ĐÁY */}
                      <div className="result-char-col result-char-col-win">
                        <motion.img 
                          src={imgWin} 
                          alt="Ngay chóc luôn!" 
                          className="result-character-hero result-char-win"
                          initial={{ opacity: 0, y: 70, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* CỘT TRÁI: NHÂN VẬT BÉ GÁI ĐỘI NÓN LÁ (WRONG.PNG) CHẠM SÁT VIỀN ĐÁY */}
                      <div className="result-char-col result-char-col-wrong">
                        <motion.img 
                          src={imgWrong} 
                          alt="Sai bét!" 
                          className="result-character-hero result-char-wrong"
                          initial={{ opacity: 0, y: 70, scale: 0.95 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0, 
                            scale: 1, 
                            rotate: [0, -3, 3, -2, 2, 0]
                          }}
                          transition={{ 
                            y: { type: 'spring', damping: 15, stiffness: 200 },
                            rotate: { delay: 0.2, duration: 0.55 }
                          }}
                        />
                      </div>

                      {/* CỘT PHẢI: CHỮ "SAI BÉT" & HỘP GIẢI THÍCH */}
                      <div className="result-text-col result-text-col-wrong">
                        <motion.div 
                          className="result-typography-wrong"
                          initial={{ opacity: 0, x: 35, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ type: 'spring', damping: 14, stiffness: 220 }}
                        >
                          <h2 className="result-wrong-title">SAI BÉT</h2>
                        </motion.div>

                        {/* HỘP GIẢI THÍCH KHI SAI */}
                        <motion.div 
                          className="result-explanation-card card-wrong neo-border neo-shadow"
                          onClick={(e) => e.stopPropagation()}
                          initial={{ opacity: 0, y: 20, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.12, duration: 0.35 }}
                        >
                          <div className="expl-card-header">
                            <span className="expl-badge expl-badge-wrong neo-border">
                              ✕ CHƯA ĐÚNG NÈ
                            </span>
                          </div>

                          <div className="expl-answer-callout neo-border">
                            <span className="expl-callout-label">ĐÁP ÁN ĐÚNG LÀ:</span>
                            <div className="expl-word-row">
                              <span className="expl-word-title text-green">{correctOpt?.key}. {currentQ.correctWord || correctOpt?.text}</span>
                              {currentQ.meaning && (
                                <span className="expl-word-meaning"> = {currentQ.meaning}</span>
                              )}
                            </div>
                          </div>

                          {currentQ.explanation && (
                            <div className="expl-desc-box">
                              <p className="expl-desc">
                                <span className="expl-lightbulb">💡</span> {currentQ.explanation}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </>
                  )}

                  {/* NÚT TIẾP TỤC ĐẶT Ở PHÍA TRÊN GÓC PHẢI */}
                  <div className="result-floating-action">
                    <motion.button
                      className="btn-result-next neo-border neo-shadow neo-shadow-hover neo-shadow-active"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextQuestion();
                      }}
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentIndex + 1 < questions.length ? "CÂU TIẾP THEO ➔" : "XEM KẾT QUẢ ➔"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* MÀN HÌNH TỔNG KẾT SAU KHI HOÀN THÀNH VÒNG CHƠI */}
          {gameState === 'summary' && (
            <motion.div 
              key="summary"
              className="game-screen game-screen-summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="summary-card neo-border neo-shadow">
                <h2 className="summary-title text-blue">KẾT QUẢ VÒNG ĐẤU</h2>
                
                <div className="summary-score-circle neo-border">
                  <span className="score-num">{score}</span>
                  <span className="score-total">/ {questions.length * 10}</span>
                </div>

                <div className="summary-badge-box">
                  <h3 className="badge-name">{getBadgeTitle(score).title}</h3>
                  <p className="badge-desc">{getBadgeTitle(score).desc}</p>
                </div>

                {/* NÚT BẬT / TẮT XEM LẠI CÂU HỎI VÀ GIẢI THÍCH */}
                <button
                  type="button"
                  className="btn-review-toggle neo-border neo-shadow-hover neo-shadow-active"
                  onClick={() => setShowReview(prev => !prev)}
                >
                  {showReview ? "▲ ẨN BẢNG GIẢI THÍCH" : "▼ XEM LẠI ĐÁP ÁN & GIẢI THÍCH"}
                </button>

                {showReview && (
                  <div className="summary-review-list">
                    {questions.map((q, idx) => {
                      const userAns = userAnswers.find(a => a.questionId === q.id);
                      const isAnsCorrect = userAns ? userAns.isCorrect : false;
                      const userChosen = userAns && userAns.selected !== null ? q.options[userAns.selected] : null;
                      const correctOpt = q.options.find(o => o.isCorrect);
                      const hasDict = Boolean(q.slug && wordsData.some(w => w.slug === q.slug));

                      return (
                        <div key={q.id || idx} className={`review-item neo-border ${isAnsCorrect ? 'review-correct' : 'review-wrong'}`}>
                          <div className="review-item-header">
                            <span className={`review-badge ${isAnsCorrect ? 'badge-green' : 'badge-red'}`}>
                              {isAnsCorrect ? "✓ ĐÚNG (+10)" : "✕ CHƯA ĐÚNG"}
                            </span>
                            <span className="review-q-num">Câu {idx + 1}</span>
                          </div>

                          <p className="review-question">{q.question}</p>

                          <div className="review-ans-info">
                            {!isAnsCorrect && userChosen && (
                              <div className="review-user-chosen">
                                Bạn chọn: <span className="strike-text">{userChosen.key}. {userChosen.text}</span>
                              </div>
                            )}
                            <div className="review-correct-ans">
                              Đáp án: <strong className="text-green">{correctOpt?.key}. {q.correctWord || correctOpt?.text}</strong>
                              {q.meaning && <span className="review-meaning"> = {q.meaning}</span>}
                            </div>
                          </div>

                          {q.explanation && (
                            <div className="review-expl">
                              <span className="expl-lightbulb">💡</span> {q.explanation}
                            </div>
                          )}

                          {hasDict && (
                            <div style={{ marginTop: '0.4rem' }}>
                              <Link
                                to={`/tu-vung/${q.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-review-dict"
                              >
                                📖 Xem chi tiết trong từ điển ➔
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="summary-buttons">
                  <button 
                    className="btn-restart neo-border neo-shadow neo-shadow-hover neo-shadow-active"
                    onClick={handleStartGame}
                  >
                    CHƠI LẠI VÒNG MỚI
                  </button>
                  <Link 
                    to="/kham-pha" 
                    className="btn-explore-dict neo-border neo-shadow neo-shadow-hover neo-shadow-active"
                  >
                    KHÁM PHÁ TỪ ĐIỂN
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
