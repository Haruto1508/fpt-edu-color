import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/LOGO.png';
import wordsData from '../data/words.json';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [searchTerm, setSearchTerm] = useState('');
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

  const dropdownWords = wordsData.filter(word => {
    return searchTerm && (word.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           word.slug.includes(searchTerm.toLowerCase()));
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      // Tìm từ khớp chính xác hoặc khớp một phần
      const matchedWord = wordsData.find(w => 
        w.title.toLowerCase() === term || 
        w.slug.toLowerCase() === term ||
        w.title.toLowerCase().replace(/\s+/g, '') === term.replace(/\s+/g, '') ||
        w.title.toLowerCase().includes(term) ||
        w.slug.includes(term)
      );

      setIsDropdownVisible(false);
      const query = searchTerm.trim();
      setSearchTerm('');
      if (matchedWord) {
        navigate(`/tu-vung/${matchedWord.slug}`);
      } else {
        // Chuyển sang trang chi tiết từ với từ khóa vừa nhập (sẽ hiển thị màn hình 'không có từ này')
        navigate(`/tu-vung/${encodeURIComponent(query)}`);
      }
    }
  };

  const handleSuggestionClick = (slug) => {
    setIsDropdownVisible(false);
    setSearchTerm('');
    navigate(`/tu-vung/${slug}`);
  };

  return (
    <header className="header">
      <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoImg} alt="Long Lanh Logo" style={{ height: '85px' }} />
      </Link>
      
      <nav className="nav-links">
        <Link to="/" className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>TRANG CHỦ</Link>
        <Link to="/kham-pha" className={`nav-item ${currentPath === '/kham-pha' ? 'active' : ''}`}>KHÁM PHÁ</Link>
        {/* <Link to="/tu-dien" className={`nav-item ${currentPath === '/tu-dien' ? 'active' : ''}`}>TỪ ĐIỂN</Link> */}
        <Link to="/chuyen-phia-sau" className={`nav-item ${currentPath === '/chuyen-phia-sau' ? 'active' : ''}`}>CHUYỆN PHÍA SAU</Link>
      </nav>

      <form 
        ref={searchContainerRef}
        className="header-search neo-border neo-shadow-hover" 
        onSubmit={handleSearch} 
        style={{ position: 'relative' }}
      >
        <button type="submit" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <input 
          type="text" 
          placeholder="Tìm Tiếng Lóng" 
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
            top: 'calc(100% + 10px)',
            right: -4,
            width: '320px',
            backgroundColor: 'var(--white)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '260px',
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
                  padding: '0.85rem 1rem',
                  borderBottom: idx < Math.min(dropdownWords.length, 5) - 1 ? '2px solid var(--black)' : 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s',
                  color: 'var(--black)'
                }}
                onClick={() => handleSuggestionClick(word.slug)}
              >
                <span style={{ color: `var(--${word.color})`, marginRight: '10px' }}>{word.title}</span>
                <span style={{ fontWeight: 'normal', fontSize: '0.85rem', color: '#333' }}>{word.subtitle}</span>
              </div>
            ))}
          </div>
        )}
      </form>
    </header>
  );
}
