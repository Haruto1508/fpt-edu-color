import React from 'react';
import { Link } from 'react-router-dom';
import WordCard from '../components/WordCard';
import ScrollReveal from '../components/ScrollReveal';
import wordsData from '../data/words.json';
import nonImg from '../assets/non.png';

import imgChaBa from '../assets/words/cha_ba.png';
import imgXiXon from '../assets/words/xi_xon.png';
import imgBanhTon from '../assets/words/banh_ton.png';
import imgMungHum from '../assets/words/mung_hum.png';
import imgBaChay from '../assets/words/ba_chay.png';
import imgChangHang from '../assets/words/chang_hang.png';
import imgTumHum from '../assets/words/tum_hum.png';
import imgMitUot from '../assets/words/mit_uot.png';

const getMockData = () => [
  {
    "slug": "cha-ba", "color": "red", "tag": "Đời sống", "hashtag": "#chaba", "title": "CHÀ BÁ",
    "desc": "To, bự, lớn, khổng lồ.<br/><br/>VD: Ổ bánh mì chà bá", "imgSrc": imgChaBa
  },
  {
    "slug": "chang-hang", "color": "blue", "tag": "Đời sống", "hashtag": "#changhang", "title": "CHÀNG HẢNG",
    "desc": "Giạng chân, dang rộng hai chân.<br/><br/>VD: Đứng chàng hảng coi chừng té.", "imgSrc": imgChangHang
  },
  {
    "slug": "tum-hum", "color": "green", "tag": "Đời sống", "hashtag": "#tumhum", "title": "TUM HÚM",
    "desc": "Nhỏ hẹp, chật chội, co cụm.<br/><br/>VD: Cái nhà tum húm mà ấm cúng.", "imgSrc": imgTumHum
  },
  {
    "slug": "mit-uot", "color": "red", "tag": "Đời sống", "hashtag": "#mituot", "title": "MÍT ƯỚT",
    "desc": "Dễ xúc động, hay khóc, mau nước mắt.<br/><br/>VD: Nhỏ đó mít ướt lắm, coi phim là khóc.", "imgSrc": imgMitUot
  },
  {
    "slug": "xi-xon", "color": "green", "tag": "Con người", "hashtag": "#xixon", "title": "XÍ XỌN",
    "desc": "Trang điểm, mặc đẹp, điệu đà.<br/><br/>VD: Nhỏ đó xí xọn ghê.", "imgSrc": imgXiXon
  },
  {
    "slug": "mung-hum", "color": "blue", "tag": "Cảm xúc", "hashtag": "#munghum", "title": "MỪNG HÚM",
    "desc": "Vui mừng khôn xiết.<br/><br/>VD: Được quà mừng húm.", "imgSrc": imgMungHum
  },
  {
    "slug": "ba-chay", "color": "blue", "tag": "Đời sống", "hashtag": "#bachay", "title": "BÁ CHÁY",
    "desc": "Rất ngon, tuyệt vời.<br/><br/>VD: Món này ngon bá cháy.", "imgSrc": imgBaChay
  },
  {
    "slug": "banh-ton", "color": "yellow", "tag": "Con người", "hashtag": "#banhton", "title": "BẢNH TỎN",
    "desc": "Đẹp, lịch sự, phong độ.<br/><br/>VD: Nay bảnh tỏn dữ hen!", "imgSrc": imgBanhTon
  }
];

export default function Home() {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero">
        <ScrollReveal className="hero-content">
          <div className="badge neo-border neo-shadow">Dự án văn hóa số 2026</div>
          
          <h1 className="hero-title">
            <span className="title-line-1">TIẾNG LÓNG</span>
            <span className="title-line-2">MIỀN TÂY</span>
            <span className="title-line-3">NÓI SAO</span>
            <span className="title-line-4">CHO ĐÃ?</span>
          </h1>
          
          <p className="hero-desc">
            Những con chữ lóng lánh (từ) miền Tây nghe quen mà đôi khi chẳng biết nghĩa gì. Vô đây, thử coi sao.
          </p>
          
          <div className="hero-buttons">
            <Link to="/kham-pha" className="btn btn-primary neo-border neo-shadow-hover neo-shadow-active" style={{textDecoration: 'none'}}>
              Khám phá tiếng lóng ➔
            </Link>
            <Link to="/tu-dien" className="btn btn-secondary neo-border neo-shadow-hover neo-shadow-active" style={{textDecoration: 'none'}}>
              Thử cho chữ ngẫu nhiên
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal className="hero-graphic" delay={0.2}>
          <img src={nonImg} alt="Nón lá" className="hero-hat" />
          <div className="sticky-note neo-border neo-shadow">
            <div className="sticky-badge neo-border">Nghe là ghiền</div>
            <div className="sticky-note-text">NÓI GÌ<br/>DẬY<br/>TRỜI</div>
          </div>
        </ScrollReveal>
      </section>

      {/* Trending Section */}
      <section className="trending">
        <ScrollReveal className="trending-header">
          <p className="trending-subtitle">Tuần này ai cũng nói</p>
          <h2 className="trending-title">ĐANG RẦN RẦN</h2>
        </ScrollReveal>

        <div className="cards-grid">
          {getMockData().map((word, idx) => (
            <WordCard 
              key={idx} 
              slug={word.slug}
              color={word.color} 
              tag={word.tag} 
              hashtag={word.hashtag} 
              title={word.title} 
              desc={word.desc}
              imgSrc={word.imgSrc}
            />
          ))}
          {/* <WordCard isMore={true} /> */}
        </div>
      </section>

      {/* Quote Section */}
      <ScrollReveal className="quote-section">
        <p className="quote-subtitle">Thông điệp từ lóng lánh</p>
        <h2 className="quote-text">
          "TIẾNG LÓNG KHÔNG CHỈ LÀ CÁCH NÓI. NÓ LÀ CÁCH MỘT VÙNG ĐẤT KỂ CHUYỆN VỀ CHÍNH MÌNH."
        </h2>
        <Link to="/chuyen-phia-sau" className="btn btn-primary neo-border neo-shadow-hover neo-shadow-active" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Chuyện phía sau ➔
        </Link>
      </ScrollReveal>
    </div>
  );
}
