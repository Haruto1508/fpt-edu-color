import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import WordCard from '../components/WordCard';
import ScrollReveal from '../components/ScrollReveal';
import wordsData from '../data/words.json';

import imgChaBa from '../assets/words/cha_ba.png';
import imgXiXon from '../assets/words/xi_xon.png';
import imgBanhTon from '../assets/words/banh_ton.png';
import imgMungHum from '../assets/words/mung_hum.png';
import imgBaChay from '../assets/words/ba_chay.png';
import imgChangHang from '../assets/words/chang_hang.png';
import imgTumHum from '../assets/words/tum_hum.png';
import imgMitUot from '../assets/words/mit_uot.png';

const wordImages = {
  "cha-ba": imgChaBa,
  "xi-xon": imgXiXon,
  "banh-ton": imgBanhTon,
  "mung-hum": imgMungHum,
  "ba-chay": imgBaChay,
  "chang-hang": imgChangHang,
  "tum-hum": imgTumHum,
  "mit-uot": imgMitUot
};

export default function Explore() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const resultsRef = useRef(null);

  const allWordsData = useMemo(() => {
    return wordsData.map(word => ({
      ...word,
      imgSrc: wordImages[word.slug]
    }));
  }, []);

  const filters = useMemo(() => {
    const tags = new Set(wordsData.map(word => word.tag));
    return ["Tất cả", ...tags];
  }, []);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(queryParam);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchParams.has('q')) {
      const q = searchParams.get('q') || '';
      setSearchTerm(q);
      setSubmittedSearchTerm(q);
    }
  }, [searchParams]);

  const dropdownWords = allWordsData.filter(word => {
    return word.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.hashtag.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredWords = allWordsData.filter(word => {
    const matchesSearch = word.title.toLowerCase().includes(submittedSearchTerm.toLowerCase()) ||
      word.desc.toLowerCase().includes(submittedSearchTerm.toLowerCase()) ||
      word.hashtag.toLowerCase().includes(submittedSearchTerm.toLowerCase());

    const matchesFilter = activeFilter === "Tất cả" || word.tag === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const isDefaultView = submittedSearchTerm === "" && activeFilter === "Tất cả";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearchTerm(searchTerm);
    setIsDropdownVisible(false);
    if (resultsRef.current) {
      setTimeout(() => resultsRef.current.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setSubmittedSearchTerm(title);
    setIsDropdownVisible(false);
    if (resultsRef.current) {
      setTimeout(() => resultsRef.current.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  return (
    <div className="page-content">
      <ScrollReveal className="explore-hero" style={{ position: 'relative', zIndex: 50 }}>
        <p className="explore-subtitle">Đi một vòng coi miền Tây nói chuyện sao</p>
        <h1 className="explore-title">
          <span className="title-red">KHO TÀNG</span><br />
          <span className="title-blue">TIẾNG LÓNG</span>
        </h1>
        <form 
          ref={searchContainerRef}
          className="explore-search neo-border neo-shadow" 
          onSubmit={handleSearchSubmit} 
          style={{ position: 'relative', zIndex: 60 }}
        >
          <svg style={{ marginRight: '0.5rem' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            className="main-search-input"
            type="text"
            placeholder="Nhập tiếng lóng vô đây..."
            style={{ padding: '0.5rem', flex: 1 }}
            value={searchTerm}
            onFocus={() => setIsDropdownVisible(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownVisible(true);
            }}
          />
          {isDropdownVisible && searchTerm && dropdownWords.length > 0 && (
            <div className="search-dropdown neo-border neo-shadow" style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              left: 0,
              right: 0,
              backgroundColor: 'var(--white)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '280px',
              overflowY: 'auto',
              border: '3.5px solid var(--black)',
              borderRadius: '16px',
              boxShadow: '6px 6px 0px var(--black)',
              textAlign: 'left'
            }}>
              {dropdownWords.slice(0, 5).map((word, idx) => (
                <div
                  key={idx}
                  className="dropdown-item"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--white)'}
                  style={{
                    padding: '0.85rem 1.2rem',
                    borderBottom: idx < Math.min(dropdownWords.length, 5) - 1 ? '2px solid var(--black)' : 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => handleSuggestionClick(word.title)}
                >
                  <span style={{ color: `var(--${word.color})`, marginRight: '10px' }}>{word.title}</span>
                  <span style={{ fontWeight: 'normal', color: '#333', fontSize: '0.9rem' }}>{word.subtitle}</span>
                </div>
              ))}
            </div>
          )}
        </form>
      </ScrollReveal>

      <ScrollReveal className="filters-section" delay={0.2}>
        <button className="filter-main-btn">
          Chủ đề ➔
        </button>
        <div className="filter-tags">
          {filters.map((filter, idx) => (
            <button
              key={idx}
              className="filter-tag neo-border"
              style={{
                backgroundColor: activeFilter === filter ? 'var(--blue)' : 'var(--white)',
                color: activeFilter === filter ? 'var(--white)' : 'var(--blue)'
              }}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div ref={resultsRef} style={{ paddingBottom: '6rem' }}>
        {isDefaultView ? (
          <ScrollReveal className="explore-cards" delay={0.3} style={{ marginBottom: '2rem' }}>
            <h3 className="explore-cards-title" style={{ textTransform: 'uppercase', color: 'var(--black)' }}>SẮP XẾP THEO BỘ SƯU TẬP</h3>
            <div className="cards-grid">
              {allWordsData.map((word, idx) => (
                <WordCard
                  key={idx}
                  slug={word.slug}
                  color={word.color}
                  tag={word.tag}
                  hashtag={word.hashtag}
                  title={word.title}
                  desc={word.desc}
                  imgSrc={word.imgSrc}
                />
              ))}
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal className="explore-cards" delay={0.3}>
            <h3 className="explore-cards-title">KẾT QUẢ TÌM KIẾM</h3>
            <div className="cards-grid">
              {filteredWords.map((word, idx) => (
                <WordCard
                  key={idx}
                  slug={word.slug}
                  color={word.color}
                  tag={word.tag}
                  hashtag={word.hashtag}
                  title={word.title}
                  desc={word.desc}
                  imgSrc={word.imgSrc}
                />
              ))}
              {filteredWords.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }}>
                  Không tìm thấy tiếng lóng nào phù hợp. Bạn thử từ khóa khác xem sao nha!
                </div>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
