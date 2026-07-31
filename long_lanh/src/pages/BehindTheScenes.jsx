import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import imgXuan from '../assets/logoArtboard 5ĐƯA DÔ WEB.png';
import imgKhoa from '../assets/logoArtboard 6ĐƯA DÔ WEB.png';
import imgHuy from '../assets/logoArtboard 7ĐƯA DÔ WEB.png';

export default function BehindTheScenes() {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <ScrollReveal className="bts-hero">
        <p className="bts-subtitle">Vì sao tụi mình làm dự án này?</p>
        <h1 className="bts-title">
          CHUYỆN<br/>PHÍA SAU
        </h1>
        <p className="bts-desc">
          <strong>Tiếng lóng không chỉ là cách nói.</strong><br/>
          <strong>Nó là cách một vùng đất kể chuyện về chính mình.</strong>
        </p>
      </ScrollReveal>

      {/* Mission Section */}
      <section className="bts-mission neo-border-top">
        <ScrollReveal className="mission-left">
          <p className="section-subtitle">Sứ mệnh nho nhỏ</p>
          <h2 className="mission-title">
            <span className="text-red">GIỮ CHỮ,</span><br/>
            <span className="text-blue">GIỮ HỒN QUÊ.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal className="mission-right" delay={0.2}>
          <p>Miền Tây không chỉ được nhớ bởi sông nước hay chợ nổi, mà còn bởi cách người ta nói chuyện. Mỗi tiếng lóng, mỗi câu cửa miệng đều mang theo sự chân chất, hài hước và gần gũi của vùng đất này.</p>
          <p>Theo thời gian, nhiều cách nói đã vượt khỏi ranh giới địa phương để xuất hiện trên mạng xã hội và trong đời sống hằng ngày. Nhưng phía sau mỗi câu nói ấy vẫn là một phần văn hóa được gìn giữ qua nhiều thế hệ.</p>
          <p>Dự án này mong góp một phần nhỏ lưu giữ những tiếng lóng miền Tây, để người từng gắn bó thấy thân thương, còn người chưa từng nghe có thêm cơ hội hiểu về sắc màu độc đáo trong cách nói của miền sông nước.</p>
        </ScrollReveal>
      </section>

      {/* Process Section */}
      <section className="bts-process neo-border-top">
        <ScrollReveal className="process-title">
          <span className="text-red">QUÁ TRÌNH</span><br/>
          <span className="text-blue" style={{ display: 'inline-block', marginTop: '1rem' }}>PHÁT TRIỂN CỦA TIẾNG LÓNG</span>
        </ScrollReveal>
        
        <div className="process-timeline">
          <div className="timeline-line"></div>
          
          {[
            { id: 1, title: 'Khởi nguồn', text: 'Từ khi là tiếng nói mộc mạc của người miền Tây, tiếng lóng dần hình thành trong đời sống.' },
            { id: 2, title: 'Gắn bó', text: 'Theo những buổi chợ, bến sông và câu chuyện thường ngày, tiếng lóng trở nên thân thuộc.' },
            { id: 3, title: 'Gìn giữ', text: 'Được truyền qua nhiều thế hệ, mang theo cách nói và nét duyên của miền Tây.' },
            { id: 4, title: 'Lan tỏa', text: 'Nhờ internet và mạng xã hội, tiếng lóng miền Tây được nhiều người biết đến hơn.' },
            { id: 5, title: 'Ghi dấu', text: 'Xuất hiện trong nội dung sáng tạo, giải trí và trở thành một nét riêng của văn hóa đại chúng.' },
            { id: 6, title: 'Tiếp nối', text: 'Xuất hiện trong nội dung sáng tạo, giải trí và trở thành một nét riêng của văn hóa đại chúng.' }
          ].map((step, index) => (
            <ScrollReveal key={step.id} className="timeline-item" delay={index * 0.1}>
              <div className="timeline-number neo-border">{step.id}</div>
              <div className="timeline-content neo-border neo-shadow">
                <h3 className="text-blue">{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bts-team neo-border-top">
        <ScrollReveal className="team-title text-blue">ĐỘI NGŨ NHỎ</ScrollReveal>
        <div className="team-grid">
          <ScrollReveal delay={0.1}>
            <div className="team-photo"><img src={imgHuy} alt="KIỀU CHÂU QUỐC HUY" /></div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="team-photo"><img src={imgXuan} alt="PHẠM THỊ KIM XUÂN" /></div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="team-photo"><img src={imgKhoa} alt="LÊ ĐĂNG KHOA" /></div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
