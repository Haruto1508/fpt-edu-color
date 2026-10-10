import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { visitedPaths } from '../utils/animationState';

const MotionLink = motion.create(Link);

export default function WordCard({ slug, color, tag, hashtag, title, desc, imgSrc: _imgSrc, isMore }) {
  const location = useLocation();
  const animProps = {
    initial: visitedPaths.has(location.pathname) ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: "some" },
    transition: { duration: 0.45, ease: "easeOut" }
  };

  if (isMore) {
    return (
      <motion.div className="word-card card-bg-white neo-border neo-shadow neo-shadow-hover" style={{cursor: 'pointer'}} {...animProps}>
        <Link className="card-more" to="/tu-dien" style={{textDecoration: 'none', color: 'inherit'}}>Xem Thêm ➔</Link>
      </motion.div>
    );
  }

  const cardColor = (color === 'green' || color === 'blue') ? color : 'blue';
  const bgClass = `card-bg-${cardColor}`;
  const cardSlug = slug || title.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  
  return (
    <MotionLink to={`/tu-vung/${cardSlug}`} className={`word-card ${bgClass} neo-border neo-shadow neo-shadow-hover`} {...animProps}>
      <div className="card-header">
        <span className="card-tag neo-border">{tag}</span>
        <span className="card-hashtag">{hashtag}</span>
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc" dangerouslySetInnerHTML={{ __html: desc }}></p>
    </MotionLink>
  );
}
