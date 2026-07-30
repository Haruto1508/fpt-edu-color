import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

export default function NotFound() {
  return (
    <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '4rem 1rem' }}>
      <ScrollReveal className="explore-hero" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 className="explore-title" style={{ fontSize: '8rem', marginBottom: '1rem', lineHeight: 1 }}>
          <span className="title-red">404</span>
        </h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--blue)', textTransform: 'uppercase' }}>
          Ủa, Lạc Đường Rồi Má Ơi!
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', color: 'var(--black)' }}>
          Trang bạn đang kiếm hổng có tồn tại ở miền Tây thu nhỏ này đâu nha. Quay xe lẹ lẹ còn kịp!
        </p>
        <Link to="/" className="btn btn-primary neo-border neo-shadow-hover neo-shadow-active" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '1.2rem', padding: '1rem 2rem' }}>
          Quay đầu là bờ ➔
        </Link>
      </ScrollReveal>
    </div>
  );
}
