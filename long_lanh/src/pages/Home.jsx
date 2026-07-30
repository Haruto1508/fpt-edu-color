import React from 'react';
import { Link } from 'react-router-dom';
import WordCard from '../components/WordCard';
import ScrollReveal from '../components/ScrollReveal';
import wordsData from '../data/words.json';

export default function Home() {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero">
        <ScrollReveal className="hero-content">
          <div className="badge neo-border neo-shadow">Dự án văn hóa số 2026</div>
          
          <h1 className="hero-title">
            <span className="title-line-1">TIẾNG LÓNG</span>
            <span className="title-line-2">MIỀN TÂY</span>
            <span className="title-line-3">NÓI SAO</span>
            <span className="title-line-4">CHO ĐÃ?</span>
          </h1>
          
          <p className="hero-desc">
            Những con chữ lóng lánh (từ) miền Tây nghe quen mà đôi khi chẳng biết nghĩa gì. Vô đây, thử coi sao.
          </p>
          
          <div className="hero-buttons">
            <Link to="/kham-pha" className="btn btn-primary neo-border neo-shadow-hover neo-shadow-active" style={{textDecoration: 'none'}}>
              Khám phá tiếng lóng ➔
            </Link>
            <Link to="/tu-dien" className="btn btn-secondary neo-border neo-shadow-hover neo-shadow-active" style={{textDecoration: 'none'}}>
              Thử cho chữ ngẫu nhiên
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal className="hero-graphic" delay={0.2}>
          <div className="sticky-note neo-border neo-shadow">
            <div className="sticky-badge neo-border">Nghe là ghiền</div>
            <div className="sticky-note-text">NÓI GÌ<br/>DẬY<br/>TRỜI</div>
          </div>
        </ScrollReveal>
      </section>

      {/* Trending Section */}
      <section className="trending">
        <ScrollReveal className="trending-header">
          <p className="trending-subtitle">Tuần này ai cũng nói</p>
          <h2 className="trending-title">ĐANG RẦN RẦN</h2>
        </ScrollReveal>

        <div className="cards-grid">
          {wordsData.slice(0, 5).map((word, idx) => (
            <WordCard 
              key={idx} 
              slug={word.slug}
              color={word.color} 
              tag={word.tag} 
              hashtag={word.hashtag} 
              title={word.title} 
              desc={word.desc} 
            />
          ))}
          <WordCard isMore={true} />
        </div>
      </section>

      {/* Quote Section */}
      <ScrollReveal className="quote-section">
        <p className="quote-subtitle">Thông điệp từ lóng lánh</p>
        <h2 className="quote-text">
          "TIẾNG LÓNG KHÔNG CHỈ LÀ CÁCH NÓI. NÓ LÀ CÁCH MỘT VÙNG ĐẤT KỂ CHUYỆN VỀ CHÍNH MÌNH."
        </h2>
        <Link to="/chuyen-phia-sau" className="btn btn-primary neo-border neo-shadow-hover neo-shadow-active" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Chuyện phía sau ➔
        </Link>
      </ScrollReveal>
    </div>
  );
}
