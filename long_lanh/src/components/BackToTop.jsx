import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button 
      onClick={scrollToTop} 
      className="neo-border neo-shadow-hover"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '55px',
        height: '55px',
        borderRadius: '50%',
        backgroundColor: 'var(--yellow)',
        color: 'var(--black)',
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 1000
      }}
      title="Lên đầu trang"
    >
      ↑
    </button>
  );
}
