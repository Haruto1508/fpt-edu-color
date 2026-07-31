import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import WordCard from '../components/WordCard';
import wordsData from '../data/words.json';

import imgChaBa from '../assets/Chà bá.png';
import imgXiXon from '../assets/Xí xọn new.png';
import imgBanhTon from '../assets/Bảnh tỏn.png';
import imgMungHum from '../assets/Mừng Húm.png';
import imgBaChay from '../assets/Bá cháy.png';

const wordImages = {
  "cha-ba": imgChaBa,
  "xi-xon": imgXiXon,
  "banh-ton": imgBanhTon,
  "mung-hum": imgMungHum,
  "ba-chay": imgBaChay
};

export default function WordDetail() {
  const { word } = useParams();
  const wordData = wordsData.find(w => w.slug === word);
  const [isPlaying, setIsPlaying] = useState(false);

  const randomSuggestions = useMemo(() => {
    const otherWords = wordsData.filter(w => w.slug !== word);
    return otherWords.sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [word]);

  // Ngắt âm thanh khi chuyển sang từ mới hoặc rời trang
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return () => {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [word]);

  if (!wordData) {
    return (
      <div className="page-content" style={{ padding: '10rem 4rem', textAlign: 'center' }}>
        <h1 className="word-title">KHÔNG TÌM THẤY TỪ NÀY</h1>
        <Link to="/kham-pha" className="btn btn-primary neo-border neo-shadow-hover neo-shadow-active" style={{ marginTop: '2rem' }}>
          Quay lại trang khám phá
        </Link>
      </div>
    );
  }

  // Pre-defined colors for example boxes
  const boxColors = ["box-blue", "box-yellow", "box-red", "box-green"];

  // Tải danh sách giọng đọc ngay khi component mount để tránh lỗi delay
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const handlePlayAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Luôn luôn hủy các luồng đọc đang chờ
    window.speechSynthesis.cancel();

    // Dùng setTimeout để đảm bảo cancel() đã hoàn tất trước khi speak()
    setTimeout(() => {
      const voices = window.speechSynthesis.getVoices();
      
      const viVoice = voices.find(v => 
        v.lang.toLowerCase().includes('vi') || 
        v.name.toLowerCase().includes('vietnamese')
      );

      // Nếu đã có danh sách giọng mà không có tiếng Việt
      if (!viVoice && voices.length > 0) {
        alert("⚠️ Máy tính của bạn chưa cài đặt Giọng Đọc Tiếng Việt.\n\nCách khắc phục (Windows):\n1. Mở Settings -> Time & Language -> Speech.\n2. Chọn 'Add voices' và tải 'Vietnamese'.\n3. Khởi động lại trình duyệt để nghe âm thanh!");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(wordData.title);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      if (viVoice) {
        utterance.voice = viVoice;
      }

      // Giữ tham chiếu global để chống garbage collection ở Chrome
      window.speechSynthesisUtterance = utterance;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = (e) => {
        if (e.error !== 'interrupted') {
          console.error("Lỗi SpeechSynthesis:", e);
        }
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    }, 150); // Tăng delay một chút để trình duyệt xả hàng đợi ổn định
  };

  return (
    <div className="page-content">
      {/* Word Header Section */}
      <section className="word-hero">
        <div className="word-hero-nav">
          <Link to="/kham-pha" className="back-btn neo-border neo-shadow">
            <span>←</span> Quay lại trang khám phá
          </Link>
          <div className="word-tag neo-border neo-shadow">{wordData.tag}</div>
        </div>

        <ScrollReveal className="word-hero-center" delay={0.2}>
          <div className="graphic-placeholder">
            {wordImages[wordData.slug] ? (
              <img src={wordImages[wordData.slug]} alt={wordData.title} className="word-hero-img" />
            ) : (
              <div className="graphic-text-3d" dangerouslySetInnerHTML={{ __html: wordData.title.replace(' ', '<br/>') }}></div>
            )}
          </div>
          <h1 className="word-title">{wordData.title}</h1>
          <p className="word-subtitle">{wordData.subtitle}</p>
        </ScrollReveal>
      </section>

      {/* Meaning Section */}
      <ScrollReveal className="word-meaning neo-border-top neo-border-bottom">
        <div className="meaning-content">
          <p className="section-subtitle">Ủa, nghĩa là gì</p>
          <h2 className="meaning-main">
            {wordData.title} <span className="text-blue">= {wordData.meaningMain}</span>
          </h2>
          <p className="meaning-desc">{wordData.meaningDesc}</p>
        </div>

        <div className="audio-card neo-border neo-shadow">
          <p className="audio-subtitle">Nghe thử coi</p>
          <h3 className="audio-title">CÁCH PHÁT ÂM</h3>

          <div className="audio-player neo-border">
            <button className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={handlePlayAudio} style={{ cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
                {isPlaying ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                ) : (
                  <path d="M8 5v14l11-7z"></path>
                )}
              </svg>
            </button>
            <div className={`waveform ${isPlaying ? 'playing' : ''}`}>
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </div>
          </div>

          <button className="share-btn neo-border neo-shadow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" height="14" width="14" style={{ marginRight: '5px' }}><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Chia sẻ từ này
          </button>
        </div>
      </ScrollReveal>

      {/* Examples Section */}
      <ScrollReveal className="word-examples bg-dots">
        <div className="examples-header">
          <p className="section-subtitle">Nói sao cho đúng bài ?</p>
          <h2 className="examples-title">Ví dụ</h2>
        </div>

        <div className="examples-grid">
          {wordData.examples && wordData.examples.map((example, idx) => (
            <div key={idx} className={`example-box ${boxColors[idx % boxColors.length]} neo-border neo-shadow`}>
              {example}
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Suggestions Section */}
      {/* <section className="word-suggestions neo-border-top" style={{ backgroundColor: 'var(--white)' }}>
        <ScrollReveal>
          <div className="explore-cards-title" style={{ padding: '3rem 4rem 1rem' }}>Có Thể Bạn Muốn Xem</div>
          <div className="cards-grid" style={{ padding: '0 4rem 4rem' }}>
            {randomSuggestions.map((w, idx) => (
              <WordCard
                key={idx}
                slug={w.slug}
                color={w.color}
                tag={w.tag}
                hashtag={w.hashtag}
                title={w.title}
                desc={w.desc}
              />
            ))}
          </div>
        </ScrollReveal>
      </section> */}

      {/* Story Section */}
      <ScrollReveal className="word-story bg-dots neo-border-top neo-border-bottom">
        <div className="story-left">
          <p className="section-subtitle text-blue">Đằng sau một tiếng lóng</p>
          <h2 className="story-title">
            <span className="text-red">Một cách nói</span><br />
            <span className="text-blue">Một vùng đất</span><br />
            <span className="text-black">Một kiểu người</span>
          </h2>
        </div>
        <div className="story-right">
          {wordData.storyLines && wordData.storyLines.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
