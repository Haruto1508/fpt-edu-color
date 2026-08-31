import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/headerLogo.png';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Decorative Green Waves with Grid & Coral Accent on the left */}
      <div className="footer-decor" aria-hidden="true">
        <svg
          viewBox="0 0 460 200"
          preserveAspectRatio="none"
          className="footer-decor-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="footer-grid-pattern"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(12)"
            >
              <line x1="0" y1="0" x2="0" y2="14" stroke="#088f3c" strokeWidth="1.2" strokeOpacity="0.75" />
              <line x1="0" y1="0" x2="14" y2="0" stroke="#088f3c" strokeWidth="1.2" strokeOpacity="0.75" />
            </pattern>
          </defs>

          {/* Top-Left Wave */}
          <path
            d="M 0,0 L 175,0 C 120,40 50,60 0,68 Z"
            fill="#0db14b"
          />
          <path
            d="M 0,0 L 175,0 C 120,40 50,60 0,68 Z"
            fill="url(#footer-grid-pattern)"
          />
          <path
            d="M 175,0 C 120,40 50,60 0,68"
            fill="none"
            stroke="#f26d5f"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Bottom-Left Wave */}
          <path
            d="M 0,115 C 80,85 190,100 295,135 C 360,158 410,182 450,200 L 0,200 Z"
            fill="#0db14b"
          />
          <path
            d="M 0,115 C 80,85 190,100 295,135 C 360,158 410,182 450,200 L 0,200 Z"
            fill="url(#footer-grid-pattern)"
          />
          <path
            d="M 0,115 C 80,85 190,100 295,135 C 360,158 410,182 450,200"
            fill="none"
            stroke="#f26d5f"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
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
