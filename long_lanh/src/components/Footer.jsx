import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/headerLogo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="Long Lanh Logo" style={{ height: '200px', margin: '-30px'}} />
        </div>
        <p className="footer-desc">
          Một dự án văn hóa số về tiếng lóng miền Tây <br/>
          cho ai từng nói, từng nghe, và cả ai lần đầu ghé qua.
        </p>
      </div>
      
      <div className="footer-col">
        <h4 className="footer-title">Đi đâu tiếp</h4>
        <div className="footer-links">
          <Link to="/kham-pha" className="footer-link">➔ Kho tàng tiếng lóng</Link>
          <Link to="/chuyen-phia-sau" className="footer-link">➔ Chuyện phía sau dự án</Link>
        </div>
      </div>
      
      <div className="footer-col">
        <div>
          <h4 className="footer-title">Liên hệ</h4>
          <p className="footer-contact">xuanptk.ce190531@gmail.com</p>
        </div>
        <p className="footer-copy">© 2026 Trạm Dừng Lóng Lánh</p>
      </div>
    </footer>
  );
}
