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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Click outside to close desktop search dropdown
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
    return searchTerm && (
      word.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      word.slug.includes(searchTerm.toLowerCase())
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      const matchedWord = wordsData.find(w => 
        w.title.toLowerCase() === term || 
        w.slug.toLowerCase() === term ||
        w.title.toLowerCase().replace(/\s+/g, '') === term.replace(/\s+/g, '') ||
        w.title.toLowerCase().includes(term) ||
        w.slug.includes(term)
      );

      setIsDropdownVisible(false);
      setIsMobileMenuOpen(false);
      const query = searchTerm.trim();
      setSearchTerm('');
      if (matchedWord) {
        navigate(`/tu-vung/${matchedWord.slug}`);
      } else {
        navigate(`/tu-vung/${encodeURIComponent(query)}`);
      }
    }
  };

  const handleSuggestionClick = (slug) => {
    setIsDropdownVisible(false);
    setIsMobileMenuOpen(false);
    setSearchTerm('');
    navigate(`/tu-vung/${slug}`);
  };

  return (
    <header className="header">
      {/* Brand Logo */}
      <Link to="/" className="logo header-logo-link" aria-label="Trang chủ Lóng Lánh">
        <img src={logoImg} alt="Lóng Lánh Logo" className="header-logo-img" />
      </Link>
      
      {/* Desktop Navigation Links */}
      <nav className="nav-links desktop-nav" aria-label="Menu chính">
        <Link to="/" className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>TRANG CHỦ</Link>
        <Link to="/kham-pha" className={`nav-item ${currentPath === '/kham-pha' ? 'active' : ''}`}>KHÁM PHÁ</Link>
        <Link to="/game" className={`nav-item ${currentPath === '/game' || currentPath === '/noi-tu' ? 'active' : ''}`}>GAME</Link>
        <Link to="/gop-tu" className={`nav-item ${currentPath === '/gop-tu' || currentPath === '/goc-gop-tu' ? 'active' : ''}`}>GÓC GÓP TỪ</Link>
        <Link to="/chuyen-phia-sau" className={`nav-item ${currentPath === '/chuyen-phia-sau' ? 'active' : ''}`}>CHUYỆN PHÍA SAU</Link>
      </nav>

      {/* Desktop Search */}
      <form 
        ref={searchContainerRef}
        className="header-search desktop-search neo-border neo-shadow-hover" 
        onSubmit={handleSearch}
        role="search"
      >
        <button type="submit" aria-label="Tìm kiếm" className="header-search-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <input 
          type="text" 
          placeholder="Tìm Tiếng Lóng" 
          aria-label="Nhập từ lóng cần tìm"
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
                onClick={() => handleSuggestionClick(word.slug)}
              >
                <span className="dropdown-word-title" style={{ color: `var(--${word.color})` }}>{word.title}</span>
                <span className="dropdown-word-desc">{word.subtitle}</span>
              </div>
            ))}
          </div>
        )}
      </form>

      {/* Mobile Actions: Hamburger Toggle */}
      <div className="mobile-header-actions">
        <button 
          className="mobile-menu-toggle neo-border neo-shadow"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="mobile-menu-drawer neo-border" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng"
          >
            <div className="mobile-menu-header">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={logoImg} alt="Lóng Lánh" className="mobile-drawer-logo" />
              </Link>
              <button 
                className="mobile-menu-close neo-border"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Đóng menu"
              >
                ✕
              </button>
            </div>

            {/* Mobile Search Form inside Drawer */}
            <form 
              ref={mobileSearchRef}
              className="mobile-drawer-search neo-border neo-shadow"
              onSubmit={handleSearch}
              role="search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Tìm tiếng lóng..."
                aria-label="Tìm tiếng lóng trên di động"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="mobile-drawer-search-btn">
                Tìm
              </button>
            </form>

            {/* Suggestions in mobile drawer */}
            {searchTerm && dropdownWords.length > 0 && (
              <div className="mobile-search-results neo-border">
                {dropdownWords.slice(0, 4).map((word, idx) => (
                  <div 
                    key={idx} 
                    className="mobile-search-item"
                    onClick={() => handleSuggestionClick(word.slug)}
                  >
                    <span style={{ color: `var(--${word.color})`, fontWeight: 800 }}>{word.title}</span>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{word.subtitle}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Navigation Links as Neobrutalism Cards */}
            <nav className="mobile-nav-links">
              <Link 
                to="/" 
                className={`mobile-nav-link neo-border neo-shadow ${currentPath === '/' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">🏠</span>
                <span>TRANG CHỦ</span>
              </Link>

              <Link 
                to="/kham-pha" 
                className={`mobile-nav-link neo-border neo-shadow ${currentPath === '/kham-pha' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">🔍</span>
                <span>KHÁM PHÁ</span>
              </Link>

              <Link 
                to="/game" 
                className={`mobile-nav-link neo-border neo-shadow ${currentPath === '/game' || currentPath === '/noi-tu' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">🎮</span>
                <span>TRÒ CHƠI NỐI TỪ</span>
              </Link>

              <Link 
                to="/gop-tu" 
                className={`mobile-nav-link neo-border neo-shadow ${currentPath === '/gop-tu' || currentPath === '/goc-gop-tu' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">✍️</span>
                <span>GÓC GÓP TỪ</span>
              </Link>

              <Link 
                to="/chuyen-phia-sau" 
                className={`mobile-nav-link neo-border neo-shadow ${currentPath === '/chuyen-phia-sau' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">📖</span>
                <span>CHUYỆN PHÍA SAU</span>
              </Link>
            </nav>

            <div className="mobile-drawer-footer">
              <p className="mobile-drawer-slogan">Lóng Lánh • Giữ chữ, giữ hồn quê</p>
              <p className="mobile-drawer-sub">Dự án văn hóa số 2026</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
