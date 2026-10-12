import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);
          const scrollDiff = lastScrollY - currentScrollY;

          // Nếu ở gần đầu trang (< 250px), luôn ẩn nút
          if (currentScrollY < 250) {
            setIsVisible(false);
          } else if (scrollDiff > 6) {
            // Người dùng cuộn LÊN -> Hiện nút
            setIsVisible(true);
          } else if (scrollDiff < -6) {
            // Người dùng cuộn XUỐNG -> Ẩn nút
            setIsVisible(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsVisible(false);
  };

  return (
    <button 
      type="button"
      onClick={scrollToTop} 
      className={`back-to-top-btn ${isVisible ? 'back-to-top-visible' : 'back-to-top-hidden'}`}
      aria-label="Cuộn lên đầu trang"
      title="Lên đầu trang"
    >
      ↑
    </button>
  );
}
