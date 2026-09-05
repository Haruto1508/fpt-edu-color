import imgChaBa from '../assets/words/cha_ba.png';
import imgXiXon from '../assets/words/xi_xon.png';
import imgBanhTon from '../assets/words/banh_ton.png';
import imgMungHum from '../assets/words/mung_hum.png';
import imgBaChay from '../assets/words/ba_chay.png';
import imgChangHang from '../assets/words/chang_hang.png';
import imgTumHum from '../assets/words/tum_hum.png';
import imgMitUot from '../assets/words/mit_uot.png';

export const wordImages = {
  "cha-ba": imgChaBa,
  "xi-xon": imgXiXon,
  "banh-ton": imgBanhTon,
  "mung-hum": imgMungHum,
  "ba-chay": imgBaChay,
  "chang-hang": imgChangHang,
  "tum-hum": imgTumHum,
  "mit-uot": imgMitUot
};

// Hàm preload toàn bộ ảnh từ vựng vào cache trình duyệt
export function preloadWordImages() {
  if (typeof window === 'undefined') return;
  Object.values(wordImages).forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
