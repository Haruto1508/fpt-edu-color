import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpeg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="Long Lanh Logo" style={{ height: '90px' }} />
        </div>
        <p className="footer-desc">
          Một dự án văn hóa số về tiếng lóng miền Tây cho ai cũng nói, từng nghe, và có ai lần đầu ghé qua.
        </p>
      </div>
      
      <div className="footer-col">
        <h4 className="footer-title">Đi đâu tiếp</h4>
        <div className="footer-links">
          <Link to="/kham-pha" className="footer-link">➔ Kho từ tiếng lóng</Link>
          <Link to="/chuyen-phia-sau" className="footer-link">➔ Chuyện phía sau dự án</Link>
        </div>
      </div>
      
      <div className="footer-col" style={{justifyContent: 'space-between'}}>
        <div>
          <h4 className="footer-title">Liên hệ</h4>
          <p className="footer-contact">xuanptk.ce190531@gmail.com</p>
        </div>
        <p className="footer-copy">© 2026 Trạm Dừng Long Lanh</p>
      </div>
    </footer>
  );
}
