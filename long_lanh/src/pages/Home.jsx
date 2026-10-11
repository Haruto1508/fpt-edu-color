import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WordCard from '../components/WordCard';
import ScrollReveal from '../components/ScrollReveal';
import wordsData from '../data/words.json';
import useSEO from '../utils/useSEO';
import { pageMetaMap } from '../data/seoMetadata';
import { wordImages } from '../utils/wordAssets';

import chaBaImg from '../assets/words/cha_ba.png';
import heroCharacterImg from '../assets/hero_character.png';
import quotePersonImg from '../assets/quote_person_clean.png';
import quoteHatImg from '../assets/quote_hat_clean.png';

// Import images directly from words_backup
import imgBaChay from '../assets/words_backup/ba_chay.png';
import imgBanhTon from '../assets/words_backup/banh_ton.png';
import imgChaBa from '../assets/words_backup/cha_ba.png';
import imgChangHang from '../assets/words_backup/chang_hang.png';
import imgMitUot from '../assets/words_backup/mit_uot.png';
import imgMungHum from '../assets/words_backup/mung_hum.png';
import imgTumHum from '../assets/words_backup/tum_hum.png';
import imgXiXon from '../assets/words_backup/xi_xon.png';

const backupWordImages = {
  'cha-ba': imgChaBa,
  'ba-chay': imgBaChay,
  'banh-ton': imgBanhTon,
  'chang-hang': imgChangHang,
  'mit-uot': imgMitUot,
  'mung-hum': imgMungHum,
  'tum-hum': imgTumHum,
  'xi-xon': imgXiXon
};

export default function Home() {
  useSEO(pageMetaMap['/']);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Only use the words present in src/assets/words_backup
  const BACKUP_WORD_SLUGS = [
    'cha-ba',
    'ba-chay',
    'banh-ton',
    'chang-hang',
    'mit-uot',
    'mung-hum',
    'tum-hum',
    'xi-xon'
  ];

  // Random word for hero section on page load / reload, avoiding showing the same word twice consecutively
  const [featuredWord] = useState(() => {
    const candidates = wordsData.filter(w => BACKUP_WORD_SLUGS.includes(w.slug));
    if (!candidates.length) return wordsData[0];
    try {
      const lastSlug = typeof window !== 'undefined' ? sessionStorage.getItem('long_lanh_last_hero_word') : null;
      const available = lastSlug ? candidates.filter(w => w.slug !== lastSlug) : candidates;
      const pool = available.length > 0 ? available : candidates;
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      if (typeof window !== 'undefined' && chosen) {
        sessionStorage.setItem('long_lanh_last_hero_word', chosen.slug);
      }
      return chosen || candidates[0];
    } catch {
      return candidates[Math.floor(Math.random() * candidates.length)] || candidates[0];
    }
  });

  // 5 featured trending words matching the design mockup: Chà Bá, Xí Xoạn, Mừng Húm, Bá Cháy, Bảnh Tòn
  const trendingSlugs = ['cha-ba', 'xi-xon', 'mung-hum', 'ba-chay', 'banh-ton'];
  const trendingWords = trendingSlugs
    .map(slug => wordsData.find(w => w.slug === slug))
    .filter(Boolean);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      // If empty, pick a random word to explore
      const randomWord = wordsData[Math.floor(Math.random() * wordsData.length)];
      navigate(`/tu-vung/${randomWord.slug}`);
      return;
    }
    const matchedWord = wordsData.find(w =>
      w.title.toLowerCase() === term ||
      w.slug.toLowerCase() === term ||
      w.title.toLowerCase().replace(/\s+/g, '') === term.replace(/\s+/g, '') ||
      w.title.toLowerCase().includes(term) ||
      w.slug.includes(term)
    );
    if (matchedWord) {
      navigate(`/tu-vung/${matchedWord.slug}`);
    } else {
      navigate(`/tu-dien?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

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
            Những con chữ lóng lánh từ miền Tây nghe quen mà đôi khi chẳng biết nghĩa gì. Vô đây, mò gõ một từ coi.
          </p>

          <form onSubmit={handleSearchSubmit} className="hero-search-form">
            <div className="hero-search-bar neo-border neo-shadow">
              <span className="hero-search-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                type="text"
                className="hero-search-input"
                placeholder="Nhập tiếng lóng vô đây..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="hero-buttons">
              <Link to="/kham-pha" className="btn btn-primary neo-border neo-shadow-hover neo-shadow-active" style={{ textDecoration: 'none' }}>
                Khám phá tiếng lóng ➔
              </Link>
              <button type="submit" className="btn btn-secondary neo-border neo-shadow-hover neo-shadow-active" style={{ cursor: 'pointer' }}>
                Thử tra một từ
              </button>
            </div>
          </form>
        </ScrollReveal>

        <ScrollReveal className="hero-graphic" delay={0.2}>
          <div className="hero-word-feature">
            <img 
              src={backupWordImages[featuredWord.slug] || wordImages[featuredWord.slug] || chaBaImg} 
              alt={featuredWord.title} 
              className="hero-word-sticker" 
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero-word-info">
              <h2 className="hero-word-title">{featuredWord.title}</h2>
              <p className="hero-word-sub">
                {featuredWord.subtitle ? featuredWord.subtitle.replace(/\.$/, '') : ''}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Trending Section */}
      <section className="trending">
        <img 
          src={heroCharacterImg} 
          alt="Nhân vật Lóng Lánh" 
          className="trending-corner-character" 
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <ScrollReveal className="trending-header">
          <p className="trending-subtitle">Tuần này ai cũng nói</p>
          <h2 className="trending-title">ĐANG RẦN RẦN</h2>
        </ScrollReveal>

        <div className="cards-grid">
          {trendingWords.map((word, idx) => (
            <WordCard 
              key={word.slug} 
              slug={word.slug}
              color={idx % 2 === 0 ? 'green' : 'blue'} 
              tag={word.tag} 
              hashtag={word.hashtag} 
              title={word.title} 
              desc={word.desc}
              imgSrc={wordImages[word.slug]}
            />
          ))}
          <WordCard isMore={true} />
        </div>
      </section>

      {/* Quote Section */}
      <ScrollReveal className="quote-section">
        <img src={quotePersonImg} alt="Minh họa Lóng Lánh" className="quote-illustration-left" />
        <img src={quoteHatImg} alt="Nón lá miền Tây" className="quote-illustration-right" />
        <div className="quote-content">
          <p className="quote-subtitle">Thông điệp từ lóng lánh</p>
          <h2 className="quote-text">
            "TIẾNG LÓNG KHÔNG CHỈ LÀ CÁCH NÓI. NÓ LÀ CÁCH MỘT VÙNG ĐẤT KỂ CHUYỆN VỀ CHÍNH MÌNH."
          </h2>
          <Link to="/chuyen-phia-sau" className="btn btn-green neo-border neo-shadow-hover neo-shadow-active" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Chuyện phía sau ➔
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
