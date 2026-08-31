import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/LOGO.png';
import luaTrenImg from '../assets/lua_tren.png';
import luaDuoiImg from '../assets/lua_duoi.png';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Decorative Background Rice Waves from Figma */}
      <div className="footer-decor" aria-hidden="true">
        <img src={luaTrenImg} alt="" className="footer-decor-top" />
        <img src={luaDuoiImg} alt="" className="footer-decor-bottom" />
      </div>

      <div className="footer-container">
        {/* Column 1: Brand Logo & Description */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <img src={logoImg} alt="Lóng Lánh Logo" className="footer-logo-img" />
          </Link>
          <p className="footer-desc">
            Một dự án văn hóa số về tiếng lóng<br />
            miền Tây cho ai từng nói, từng<br />
            nghe, và cả ai lần đầu ghé qua.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-col footer-nav">
          <h4 className="footer-heading">Đi đâu tiếp</h4>
          <div className="footer-links-list">
            <Link to="/kham-pha" className="footer-link-item">
              <span className="footer-arrow">➔</span>
              <span>Kho tàng tiếng lóng</span>
            </Link>
            <Link to="/chuyen-phia-sau" className="footer-link-item">
              <span className="footer-arrow">➔</span>
              <span>Chuyện phía sau dự án</span>
            </Link>
          </div>
        </div>

        {/* Column 3: Contact & Copyright */}
        <div className="footer-col footer-contact-col">
          <h4 className="footer-heading">Liên hệ</h4>
          <div className="footer-contact-info">
            <a href="mailto:longlanhfptcantho03@gmail.com" className="footer-contact-email">
              longlanhfptcantho03@gmail.com
            </a>
            <p className="footer-copyright">
              © 2026 Trạm Dừng Lóng Lánh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
