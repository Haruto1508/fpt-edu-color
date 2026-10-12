import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import WordCard from '../components/WordCard';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import wordsData from '../data/words.json';
import useSEO from '../utils/useSEO';
import { pageMetaMap } from '../data/seoMetadata';
import { wordImages } from '../utils/wordAssets';
import imgNon from '../assets/non.png';
import imgBoy from '../assets/explore_character_clean.png';

const CATEGORIES = ['Đời Sống', 'Con người', 'Cảm xúc', 'Sinh hoạt', 'Ăn uống', 'Giao tiếp'];
const FEATURED_SLUGS = ['cha-ba', 'xi-xon', 'mung-hum', 'ba-chay', 'banh-ton'];

export default function Explore() {
  useSEO(pageMetaMap['/kham-pha']);

  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const resultsRef = useRef(null);

  const orderedAllWords = useMemo(() => {
    const featured = FEATURED_SLUGS.map(slug => wordsData.find(w => w.slug === slug)).filter(Boolean);
    const remaining = wordsData.filter(w => !FEATURED_SLUGS.includes(w.slug));
    return [...featured, ...remaining].map(word => ({
      ...word,
      imgSrc: wordImages[word.slug]
    }));
  }, []);

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(queryParam);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [showAll, setShowAll] = useState(false);
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

  const dropdownWords = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return orderedAllWords.filter(word => {
      return word.title.toLowerCase().includes(term) ||
        word.desc.toLowerCase().includes(term) ||
        word.hashtag.toLowerCase().includes(term);
    });
  }, [orderedAllWords, searchTerm]);

  const filteredWords = useMemo(() => {
    return orderedAllWords.filter(word => {
      const term = submittedSearchTerm.toLowerCase().trim();
      const matchesSearch = !term ||
        word.title.toLowerCase().includes(term) ||
        word.desc.toLowerCase().includes(term) ||
        word.hashtag.toLowerCase().includes(term);

      const matchesFilter = activeFilter === "Tất cả" || 
        word.tag.toLowerCase() === activeFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [orderedAllWords, submittedSearchTerm, activeFilter]);

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
    <div className="page-content explore-page">
      {/* Hero Section */}
      <div className="explore-hero bg-dots">
        <div className="explore-hero-inner">
          {/* Conical hat decoration */}
          <div className="decor-non">
            <img 
              src={imgNon} 
              alt="Nón lá" 
              className="hero-non-img" 
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          {/* Centered title & search */}
          <div className="explore-hero-center">
            <p className="explore-subtitle">Đi một vòng coi miền Tây nói chuyện sao</p>
            <h1 className="explore-title">
              KHO TÀNG<br />
              TIẾNG LÓNG
            </h1>

            <form 
              ref={searchContainerRef}
              className="explore-search" 
              onSubmit={handleSearchSubmit} 
            >
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                className="main-search-input"
                type="text"
                placeholder="Nhập tiếng lóng vô đây...."
                value={searchTerm}
                onFocus={() => setIsDropdownVisible(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownVisible(true);
                }}
              />
              {isDropdownVisible && searchTerm && dropdownWords.length > 0 && (
                <div className="search-dropdown neo-border neo-shadow">
                  {dropdownWords.slice(0, 5).map((word, idx) => (
                    <div
                      key={idx}
                      className="dropdown-item"
                      onClick={() => handleSuggestionClick(word.title)}
                    >
                      <span style={{ color: 'var(--blue)', marginRight: '10px', fontWeight: 800 }}>{word.title}</span>
                      <span style={{ fontWeight: 'normal', color: '#555', fontSize: '0.9rem' }}>{word.subtitle}</span>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Boy character decoration */}
          <div className="decor-boy">
            <img 
              src={imgBoy} 
              alt="Nhân vật Lóng Lánh" 
              className="hero-boy-img" 
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* Yellow Filter Bar */}
      <div className="filters-section">
        <div className="filters-container">
          <button 
            type="button"
            className="filter-main-btn"
            onClick={() => {
              setActiveFilter("Tất cả");
              setSearchTerm("");
              setSubmittedSearchTerm("");
              setShowAll(false);
            }}
          >
            Chủ đề ➔
          </button>
          <div className="filter-tags">
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeFilter.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={idx}
                  type="button"
                  className={`filter-tag ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveFilter(prev => prev.toLowerCase() === cat.toLowerCase() ? "Tất cả" : cat);
                    setShowAll(false);
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cards Collection Grid */}
      <div ref={resultsRef} className="explore-cards bg-dots">
        <div className="explore-cards-inner">
          {isDefaultView ? (
            <>
              <h3 className="explore-cards-title">SẮP XẾP THEO BỘ SƯU TẬP</h3>
              <StaggerContainer className="cards-grid" staggerDelay={0.07} delayStart={0.05}>
                {(showAll ? orderedAllWords : orderedAllWords.slice(0, 5)).map((word, idx) => (
                  <StaggerItem key={word.slug || idx} variant="scale-up">
                    <WordCard
                      slug={word.slug}
                      color={idx % 2 === 0 ? 'green' : 'blue'}
                      tag={word.tag}
                      hashtag={word.hashtag}
                      title={word.title}
                      desc={word.desc}
                      imgSrc={word.imgSrc}
                    />
                  </StaggerItem>
                ))}
                {!showAll && (
                  <StaggerItem variant="scale-up">
                    <div className="card-more-slot">
                      <button 
                        type="button"
                        className="btn-explore-more-text"
                        onClick={() => setShowAll(true)}
                      >
                        Xem Thêm ➔
                      </button>
                    </div>
                  </StaggerItem>
                )}
              </StaggerContainer>
            </>
          ) : (
            <>
              <h3 className="explore-cards-title">KẾT QUẢ TÌM KIẾM ({filteredWords.length})</h3>
              <StaggerContainer className="cards-grid" staggerDelay={0.07}>
                {filteredWords.map((word, idx) => (
                  <StaggerItem key={word.slug || idx} variant="scale-up">
                    <WordCard
                      slug={word.slug}
                      color={idx % 2 === 0 ? 'green' : 'blue'}
                      tag={word.tag}
                      hashtag={word.hashtag}
                      title={word.title}
                      desc={word.desc}
                      imgSrc={word.imgSrc}
                    />
                  </StaggerItem>
                ))}
                {filteredWords.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }}>
                    Không tìm thấy tiếng lóng nào phù hợp. Bạn thử từ khóa khác xem sao nha!
                  </div>
                )}
              </StaggerContainer>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
