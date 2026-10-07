import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gameQuestions } from '../data/gameQuestions';
import { playSound } from '../utils/gameAudio';
import useSEO from '../utils/useSEO';
import { pageMetaMap } from '../data/seoMetadata';

import imgBoat from '../assets/game/start_game.png';
import imgWinner from '../assets/game/winner_clean.png';
import imgSaiBet from '../assets/game/sai_bet.png';

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
  const [_userAnswers, setUserAnswers] = useState([]);

  const currentQ = questions[currentIndex] || questions[0];

  // Bắt đầu game
  const handleStartGame = () => {
    playSound('click', isMuted);
    setQuestions(gameQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
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

  // Chuyển sang câu tiếp theo
  const handleNextQuestion = () => {
    playSound('click', isMuted);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setGameState('question');
    } else {
      setGameState('summary');
    }
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
    <div className="game-page-wrapper">
      {/* Top Floating Controls Bar */}
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
                    />
                  </div>
                </motion.div>

                {/* Cột phải: Tiêu đề NỐI TỪ & Nút CHƠI THÔI */}
                <div className="intro-action-col">
                  <h1 className="game-title-huge">
                    NỐI TỪ
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
                <h2 className="quiz-top-title">NỐI TỪ</h2>

                {/* Thanh trạng thái / tiến độ */}
                <div className="quiz-status-bar">
                  <span className="quiz-badge neo-border">
                    Câu {currentIndex + 1} / {questions.length}
                  </span>
                  <span className="quiz-badge badge-score neo-border">
                    🏆 {score} điểm
                  </span>
                  {streak > 1 && (
                    <span className="quiz-badge badge-streak neo-border">
                      🔥 Chuỗi x{streak}
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

          {/* MÀN HÌNH 3 & 4: KẾT QUẢ ĐÚNG / SAI (DEMO SCREEN 3 & 4) */}
          {gameState === 'result' && (
            <motion.div 
              key="result"
              className="game-screen game-screen-result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {isCorrect ? (
                /* MÀN HÌNH 3: ĐÚNG - NGAY CHÓC LUÔN */
                <div className="result-layout result-win">
                  <div className="result-text-col">
                    <h2 className="win-heading">
                      NGAY<br />
                      CHÓC<br />
                      LUÔN
                    </h2>
                    <div className="result-info-box neo-border neo-shadow">
                      <p className="result-point-badge">+10 ĐIỂM 🎉</p>
                      <h4 className="word-reveal-title text-blue">
                        {currentQ.correctWord}
                      </h4>
                      <p className="word-meaning-snippet">
                        <strong>Nghĩa:</strong> {currentQ.meaning}
                      </p>
                      <p className="word-explanation-snippet">
                        {currentQ.explanation}
                      </p>
                    </div>

                    <div className="result-actions">
                      <motion.button
                        className="btn-next-question neo-border neo-shadow neo-shadow-hover neo-shadow-active"
                        onClick={handleNextQuestion}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {currentIndex + 1 < questions.length ? "CÂU TIẾP THEO ➔" : "XEM TỔNG KẾT ➔"}
                      </motion.button>
                      {currentQ.slug && (
                        <Link 
                          to={`/tu-vung/${currentQ.slug}`} 
                          target="_blank" 
                          className="link-view-dict"
                        >
                          📖 Xem trong từ điển
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="result-graphic-col">
                    <motion.div 
                      className="character-box"
                      initial={{ scale: 0.8, rotate: -5 }}
                      animate={{ scale: 1, rotate: [ -3, 3, 0 ] }}
                      transition={{ duration: 0.5, type: 'spring' }}
                    >
                      <img 
                        src={imgWinner} 
                        alt="Đúng rồi! Cầm tiền vui mừng" 
                        className="result-char-img"
                      />
                    </motion.div>
                  </div>
                </div>
              ) : (
                /* MÀN HÌNH 4: SAI - SAI BÉT */
                <div className="result-layout result-lose">
                  <div className="result-graphic-col">
                    <motion.div 
                      className="character-box"
                      initial={{ scale: 0.8, rotate: 5 }}
                      animate={{ scale: 1, rotate: [ 3, -3, 0 ] }}
                      transition={{ duration: 0.5, type: 'spring' }}
                    >
                      <img 
                        src={imgSaiBet} 
                        alt="Sai bét! Bé gái đội nón lá khoanh tay" 
                        className="result-char-img"
                      />
                    </motion.div>
                  </div>

                  <div className="result-text-col">
                    <h2 className="lose-heading">
                      SAI BÉT
                    </h2>
                    <div className="result-info-box neo-border neo-shadow">
                      <p className="result-wrong-hint">Hổng phải rồi đa! Gần đúng mà trật lất.</p>
                      <h4 className="word-reveal-title text-red">
                        Đáp án đúng: {currentQ.correctWord}
                      </h4>
                      <p className="word-meaning-snippet">
                        <strong>Nghĩa:</strong> {currentQ.meaning}
                      </p>
                      <p className="word-explanation-snippet">
                        {currentQ.explanation}
                      </p>
                    </div>

                    <div className="result-actions">
                      <motion.button
                        className="btn-next-question neo-border neo-shadow neo-shadow-hover neo-shadow-active"
                        onClick={handleNextQuestion}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {currentIndex + 1 < questions.length ? "CÂU TIẾP THEO ➔" : "XEM TỔNG KẾT ➔"}
                      </motion.button>
                      {currentQ.slug && (
                        <Link 
                          to={`/tu-vung/${currentQ.slug}`} 
                          target="_blank" 
                          className="link-view-dict"
                        >
                          📖 Xem trong từ điển
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

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

                <div className="summary-buttons">
                  <button 
                    className="btn-restart neo-border neo-shadow neo-shadow-hover neo-shadow-active"
                    onClick={handleStartGame}
                  >
                    🔄 CHƠI LẠI VÒNG MỚI
                  </button>
                  <Link 
                    to="/kham-pha" 
                    className="btn-explore-dict neo-border neo-shadow neo-shadow-hover neo-shadow-active"
                  >
                    📖 KHÁM PHÁ TỪ ĐIỂN
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
