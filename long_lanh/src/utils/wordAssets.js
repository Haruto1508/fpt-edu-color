import imgChaBa from '../assets/words/cha_ba.png';
import imgXiXon from '../assets/words/xi_xon.png';
import imgBanhTon from '../assets/words/banh_ton.png';
import imgMungHum from '../assets/words/mung_hum.png';
import imgBaChay from '../assets/words/ba_chay.png';
import imgChangHang from '../assets/words/chang_hang.png';
import imgTumHum from '../assets/words/tum_hum.png';
import imgMitUot from '../assets/words/mit_uot.png';
import imgNoNoc from '../assets/words/no_noc.png';
import imgThangBang from '../assets/words/thang_bang.png';
import imgChotLet from '../assets/words/chot_let.png';
import imgLocChoc from '../assets/words/loc_choc.png';
import imgChuU from '../assets/words/chu_u.png';
import imgBanhChanh from '../assets/words/banh_chanh.png';

export const wordImages = {
  "cha-ba": imgChaBa,
  "xi-xon": imgXiXon,
  "banh-ton": imgBanhTon,
  "mung-hum": imgMungHum,
  "ba-chay": imgBaChay,
  "chang-hang": imgChangHang,
  "tum-hum": imgTumHum,
  "mit-uot": imgMitUot,
  "no-noc": imgNoNoc,
  "thang-bang": imgThangBang,
  "chot-let": imgChotLet,
  "loc-choc": imgLocChoc,
  "chu-u": imgChuU,
  "banh-chanh": imgBanhChanh
};

// Hàm preload toàn bộ ảnh từ vựng vào cache trình duyệt
export function preloadWordImages() {
  if (typeof window === 'undefined') return;
  Object.values(wordImages).forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
