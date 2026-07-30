import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import WordCard from '../components/WordCard';
import ScrollReveal from '../components/ScrollReveal';
import wordsData from '../data/words.json';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const resultsRef = useRef(null);

  const filters = ["Tất cả", "Đời sống", "Con người", "Cảm xúc", "Sinh hoạt", "Ăn uống", "Giao tiếp"];
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(queryParam);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (searchParams.has('q')) {
      const q = searchParams.get('q') || '';
      setSearchTerm(q);
      setSubmittedSearchTerm(q);
    }
  }, [searchParams]);

  // Generate random default view once (2 random topics, 4 random words each)
  const randomTopicsView = useMemo(() => {
    // get all unique tags from data
    const allTags = [...new Set(wordsData.map(w => w.tag))];
    // shuffle and pick 2 tags
    const shuffledTags = allTags.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    return shuffledTags.map(tag => {
      const wordsInTag = wordsData.filter(w => w.tag === tag);
      const random4Words = wordsInTag.sort(() => 0.5 - Math.random()).slice(0, 4);
      return { tag, words: random4Words };
    });
  }, []);

  const dropdownWords = wordsData.filter(word => {
    return word.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           word.desc.toLowerCase().includes(searchTerm.toLowerCase()) || 
           word.hashtag.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredWords = wordsData.filter(word => {
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
      {/* Explore Hero */}
      <ScrollReveal className="explore-hero">
        <p className="explore-subtitle">Đi một vòng coi miền Tây nói chuyện sao</p>
        <h1 className="explore-title">
          <span className="title-red">KHO TÀNG</span><br/>
          <span className="title-blue">TIẾNG LÓNG</span>
        </h1>
        <form className="explore-search neo-border neo-shadow" onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
          <svg style={{marginRight: '0.5rem'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            className="main-search-input" 
            type="text" 
            placeholder="Nhập tiếng lóng vô đây..." 
            style={{padding: '0.5rem', flex: 1}}
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
              top: '100%',
              left: -4,
              right: -4,
              marginTop: '1rem',
              backgroundColor: 'var(--white)',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '250px',
              overflowY: 'auto',
              border: '4px solid var(--black)',
              textAlign: 'left'
            }}>
              {dropdownWords.slice(0, 5).map((word, idx) => (
                <div 
                  key={idx} 
                  className="dropdown-item"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--white)'}
                  style={{
                    padding: '1rem',
                    borderBottom: idx < Math.min(dropdownWords.length, 5) - 1 ? '2px solid var(--black)' : 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => handleSuggestionClick(word.title)}
                >
                  <span style={{ color: `var(--${word.color})`, marginRight: '10px' }}>{word.title}</span>
                  <span style={{ fontWeight: 'normal', color: 'var(--black)' }}>{word.subtitle}</span>
                </div>
              ))}
            </div>
          )}
        </form>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal className="filters-section" delay={0.2}>
        <button className="filter-main-btn neo-border neo-shadow-hover">
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

      {/* Cards List */}
      <div ref={resultsRef} style={{ paddingBottom: '6rem' }}>
        {isDefaultView ? (
          randomTopicsView.map((topicBlock, index) => (
             <ScrollReveal key={index} className="explore-cards" delay={0.3} style={{ marginBottom: '2rem' }}>
               <h3 className="explore-cards-title" style={{textTransform: 'uppercase', color: 'var(--blue)'}}>CHỦ ĐỀ: {topicBlock.tag}</h3>
               <div className="cards-grid">
                 {topicBlock.words.map((word, idx) => (
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
             </ScrollReveal>
          ))
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
                />
              ))}
              {filteredWords.length === 0 && (
                <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', fontSize: '1.2rem'}}>
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
