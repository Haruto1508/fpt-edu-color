import { Link } from 'react-router-dom';

export default function WordCard({ slug, color, tag, hashtag, title, desc, imgSrc: _imgSrc, isMore }) {
  if (isMore) {
    return (
      <Link
        to="/kham-pha"
        className="word-card card-bg-white neo-border neo-shadow neo-shadow-hover card-more-card"
        style={{ textDecoration: 'none', color: 'var(--blue)' }}
      >
        <span className="card-more">Xem Thêm ➔</span>
      </Link>
    );
  }

  const cardColor = (color === 'green' || color === 'blue') ? color : 'blue';
  const bgClass = `card-bg-${cardColor}`;
  const cardSlug = slug || title.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  
  // Tách nghĩa và ví dụ thành 2 phần riêng biệt, dọn dẹp các thẻ br thừa
  const cleanDesc = (desc || '').replace(/(<br\s*\/?>\s*)+/gi, '<br/>');
  const parts = cleanDesc.split(/<br\s*\/?>/i);
  const meaning = parts[0] ? parts[0].trim() : '';
  const example = parts[1] ? parts[1].trim() : (parts.slice(1).join(' ').trim());

  return (
    <Link to={`/tu-vung/${cardSlug}`} className={`word-card ${bgClass} neo-border neo-shadow neo-shadow-hover`}>
      <div className="card-header">
        <span className="card-tag neo-border">{tag}</span>
        {hashtag && <span className="card-hashtag">{hashtag}</span>}
      </div>
      <h3 className="card-title">{title}</h3>
      <div className="card-desc">
        {meaning && <span className="card-meaning" title={meaning}>{meaning}</span>}
        {example && <span className="card-example" title={example}>{example}</span>}
      </div>
    </Link>
  );
}
