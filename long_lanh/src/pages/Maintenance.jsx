import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSEO from '../utils/useSEO';
import logoImg from '../assets/headerLogo.png';
import boatImg from '../assets/game/start_game.png';

export default function Maintenance({ onEnterPreview }) {
  useSEO({
    title: 'Website Đang Bảo Trì & Nâng Cấp | Lóng Lánh - Tiếng Lóng Miền Tây',
    description: 'Trạm dừng Lóng Lánh đang tạm nghỉ để bảo trì và nâng cấp thêm nhiều nội dung văn hóa, từ lóng miền Tây thú vị hơn. Hẹn sớm gặp lại bạn nghen!',
    canonicalPath: '/'
  });

  // Set noindex during maintenance
  React.useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    const oldContent = metaRobots.getAttribute('content');
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (oldContent) {
        metaRobots.setAttribute('content', oldContent);
      } else {
        metaRobots.remove();
      }
    };
  }, []);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    // Allow either empty, "admin", or "longlanh" for flexibility
    if (!adminPass || adminPass.trim().toLowerCase() === 'admin' || adminPass.trim().toLowerCase() === 'longlanh') {
      if (onEnterPreview) onEnterPreview();
    } else {
      setErrorMsg('Mật mã hổng đúng rồi đa! Thử nhập "longlanh" hoặc để trống nha.');
    }
  };

  return (
    <div className="maintenance-page">
      {/* Top Brand Bar */}
      <header className="maintenance-top-bar">
        <div className="maintenance-logo-wrap">
          <img src={logoImg} alt="Lóng Lánh Logo" className="maintenance-logo" />
        </div>
        <div className="maintenance-status-pill neo-border">
          <span className="pulsing-dot" />
          <span>BẢO TRÌ HỆ THỐNG</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="maintenance-content">
        <motion.div 
          className="maintenance-card neo-border neo-shadow"
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', damping: 20 }}
        >
          {/* Badge */}
          <div className="maintenance-badge">
            <span className="badge-icon">🛠️</span>
            <span>TRẠM DỪNG ĐANG NÂNG CẤP & TÂN TRANG</span>
          </div>

          {/* Heading */}
          <h1 className="maintenance-heading">
            DỪNG CHÂN NGHỈ MỆT <br className="br-desktop" />
            <span className="text-yellow-glow">XÍU NGHEN BÀ CON!</span>
          </h1>

          {/* Intro Description */}
          <p className="maintenance-desc">
            Trạm dừng <strong>Lóng Lánh</strong> đang được đội ngũ kéo ghe lên bến để tân trang lại,
            bổ sung thêm nhiều <em>từ lóng miền Tây</em> độc lạ, phát âm chuẩn chỉ và làm mượt mà thêm trải nghiệm.
            Tụi mình sẽ sớm mở cửa trở lại thiệt lẹ để đón bạn ghé chơi nghen!
          </p>

          {/* Floating Illustration */}
          <motion.div 
            className="maintenance-illustration"
            animate={{ y: [-6, 8, -6] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <img 
              src={boatImg} 
              alt="Ba bạn trẻ chèo thuyền miền Tây" 
              className="maintenance-boat-img"
            />
            <div className="boat-caption-chip neo-border neo-shadow-sm">
              🛶 Đang chèo ghe đi gom thêm từ lóng...
            </div>
          </motion.div>

          {/* Roadmap / Features in Progress */}
          <div className="maintenance-features-grid">
            <div className="m-feature-item neo-border">
              <div className="m-feature-icon">✨</div>
              <div className="m-feature-info">
                <h4>Tân trang giao diện</h4>
                <p>Nâng cấp hiệu năng, tối ưu hiển thị mượt mà trên mọi dòng điện thoại & máy tính.</p>
              </div>
            </div>

            <div className="m-feature-item neo-border">
              <div className="m-feature-icon">📚</div>
              <div className="m-feature-info">
                <h4>Cập nhật kho từ vựng</h4>
                <p>Bổ sung thêm hàng loạt tiếng lóng Nam Bộ chân chất, kèm audio phát âm sinh động.</p>
              </div>
            </div>

            <div className="m-feature-item neo-border">
              <div className="m-feature-icon">🎮</div>
              <div className="m-feature-info">
                <h4>Nâng cấp minigame</h4>
                <p>Trò chơi đố từ tiếng lóng với đồ họa full-width và câu đố mới toanh siêu cuốn.</p>
              </div>
            </div>
          </div>

          {/* Timeline & Contact Box */}
          <div className="maintenance-footer-info neo-border">
            <div className="info-col">
              <span className="info-label">⏱️ Dự kiến hoàn tất</span>
              <strong className="info-val text-green">Sớm nhất có thể nghen!</strong>
            </div>
            <div className="info-divider" />
            <div className="info-col">
              <span className="info-label">📬 Liên hệ / Góp ý</span>
              <a href="mailto:longlanhfptcantho03@gmail.com" className="info-val info-link">
                longlanhfptcantho03@gmail.com
              </a>
            </div>
          </div>

          {/* Admin Preview Trigger */}
          <div className="maintenance-admin-action">
            <button
              type="button"
              className="btn-admin-preview-trigger"
              onClick={() => setShowAdminModal(true)}
            >
              🔑 Dành cho Admin / Tác giả: Mở khóa xem trước website
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer minimal */}
      <footer className="maintenance-bottom-footer">
        <p>© 2026 Trạm Dừng Lóng Lánh • Dự án Văn hóa số FPT University Cần Thơ</p>
      </footer>

      {/* Modal for Admin Preview Bypass */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="admin-modal-backdrop" onClick={() => setShowAdminModal(false)}>
            <motion.div 
              className="admin-modal-card neo-border neo-shadow"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              <div className="modal-header">
                <h3>🔓 Mở Khóa Xem Trước Website</h3>
                <button 
                  type="button" 
                  className="modal-close-btn"
                  onClick={() => setShowAdminModal(false)}
                >
                  ✕
                </button>
              </div>

              <p className="modal-desc">
                Bạn có thể vào xem trước toàn bộ website để kiểm tra, sửa đổi nội dung trước khi tắt chế độ bảo trì. Khách truy cập bên ngoài vẫn sẽ thấy trang bảo trì này.
              </p>

              <form onSubmit={handleAdminSubmit} className="modal-form">
                <label htmlFor="admin-pass-input">
                  Mật mã truy cập <em>(nhập &quot;longlanh&quot; hoặc bấm nút bên dưới để vào liền):</em>
                </label>
                <input
                  id="admin-pass-input"
                  type="text"
                  placeholder="Nhập mã hoặc để trống..."
                  value={adminPass}
                  onChange={(e) => {
                    setAdminPass(e.target.value);
                    setErrorMsg('');
                  }}
                  className="admin-pass-input neo-border"
                  autoFocus
                />

                {errorMsg && <p className="modal-error-msg">{errorMsg}</p>}

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary neo-border"
                    onClick={() => setShowAdminModal(false)}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary neo-border neo-shadow-sm neo-shadow-hover neo-shadow-active"
                  >
                    Vào Xem Trước Website ➔
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
