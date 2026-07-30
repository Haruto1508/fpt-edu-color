import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/headerLogo.png';
import wordsData from '../data/words.json';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownWords = wordsData.filter(word => {
    return searchTerm && (word.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           word.slug.includes(searchTerm.toLowerCase()));
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      // Find the best match
      const matchedWord = wordsData.find(w => 
        w.title.toLowerCase().includes(term) || w.slug.includes(term)
      );

      setIsDropdownVisible(false);
      setSearchTerm('');
      if (matchedWord) {
        navigate(`/tu-vung/${matchedWord.slug}`);
      } else {
        // Navigate to a non-existent word to trigger the "Word not found" page
        navigate(`/tu-vung/${encodeURIComponent(term)}`);
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
        <Link to="/tu-dien" className={`nav-item ${currentPath === '/tu-dien' ? 'active' : ''}`}>TỪ ĐIỂN</Link>
        <Link to="/chuyen-phia-sau" className={`nav-item ${currentPath === '/chuyen-phia-sau' ? 'active' : ''}`}>CHUYỆN PHÍA SAU</Link>
      </nav>

      <form className="header-search neo-border neo-shadow-hover" onSubmit={handleSearch} style={{ position: 'relative' }}>
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
            top: '100%',
            right: -4,
            width: '300px',
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
                  transition: 'background-color 0.2s',
                  color: 'var(--black)'
                }}
                onClick={() => handleSuggestionClick(word.slug)}
              >
                <span style={{ color: `var(--${word.color})`, marginRight: '10px' }}>{word.title}</span>
                <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{word.subtitle}</span>
              </div>
            ))}
          </div>
        )}
      </form>
    </header>
  );
}
