<div align="center">

# 🌟 LÓNG LÁNH - TIẾNG LÓNG MIỀN TÂY (WEB APP)

### *Dự án Văn hóa số 2026 | Tiếng lóng miền Tây - Nói sao cho đã?*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Style](https://img.shields.io/badge/Style-Neobrutalism-FFE600?style=for-the-badge&logo=css3&logoColor=black)](https://neobrutalism.dev/)

</div>

---

## 📖 Giới Thiệu

**LÓNG LÁNH** là website tôn vinh nét đẹp tiếng lóng, khẩu ngữ dân dã, chân chất của người dân miền Tây Nam Bộ qua lăng kính đồ họa Neobrutalism hiện đại, sống động kết hợp cùng âm thanh thực tế giọng phát âm miền Tây.

---

## ⚡ Hướng Dẫn Cài Đặt & Chạy Nhanh (Quick Start)

### 1. Cài đặt các gói phụ thuộc:
```bash
npm install
```

### 2. Chạy máy chủ phát triển (Development):
```bash
npm run dev
```
Sau đó truy cập vào [http://localhost:5173](http://localhost:5173) trên trình duyệt.

### 3. Đóng gói cho Production:
```bash
npm run build
```

### 4. Kiểm tra mã nguồn (Linter):
```bash
npm run lint
```

---

## 📁 Cấu Trúc Mã Nguồn

```plaintext
long_lanh/
├── public/                 # Tài nguyên tĩnh (Favicon, Logo...)
├── src/
│   ├── assets/             # Hình ảnh (words/) và âm thanh giọng đọc (record/)
│   ├── components/         # Header, Footer, WordCard, ScrollReveal, ScrollToTop...
│   ├── data/               # words.json chứa toàn bộ dữ liệu từ điển
│   ├── pages/              # Home, Explore, Dictionary, WordDetail, BehindTheScenes, NotFound
│   ├── utils/              # Tiện ích preload ảnh, animation state
│   ├── App.jsx             # Cấu hình Router & Layout chính
│   ├── App.css             # Style Neobrutalism cho toàn bộ trang
│   ├── index.css           # Biến màu sắc, font chữ và reset css
│   └── main.jsx            # Entry point
├── generate_real_data.cjs  # Script sinh dữ liệu words.json
├── package.json
└── vite.config.js
```

---

## 👥 Đội Ngũ Phát Triển

- **Kiều Châu Quốc Huy**
- **Phạm Thị Kim Xuân**
- **Lê Đăng Khoa**
