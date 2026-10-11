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

// Critical UI & Hero Images
import imgNon from '../assets/non.png';
import imgBoy from '../assets/explore_character_clean.png';
import imgHeroChar from '../assets/hero_character.png';
import imgQuotePerson from '../assets/quote_person_clean.png';
import imgQuoteHat from '../assets/quote_hat_clean.png';
import imgBoat from '../assets/game/start_game.png';

// Backup stickers
import imgBkpBaChay from '../assets/words_backup/ba_chay.png';
import imgBkpBanhTon from '../assets/words_backup/banh_ton.png';
import imgBkpChaBa from '../assets/words_backup/cha_ba.png';
import imgBkpChangHang from '../assets/words_backup/chang_hang.png';
import imgBkpMitUot from '../assets/words_backup/mit_uot.png';
import imgBkpMungHum from '../assets/words_backup/mung_hum.png';
import imgBkpTumHum from '../assets/words_backup/tum_hum.png';
import imgBkpXiXon from '../assets/words_backup/xi_xon.png';

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

export const allCriticalImages = [
  imgChaBa,
  imgBkpChaBa,
  imgHeroChar,
  imgNon,
  imgBoy,
  imgBoat,
  imgQuotePerson,
  imgQuoteHat,
  imgBkpBaChay,
  imgBkpBanhTon,
  imgBkpChangHang,
  imgBkpMitUot,
  imgBkpMungHum,
  imgBkpTumHum,
  imgBkpXiXon,
  ...Object.values(wordImages)
];

// Preload ngay lập tức khi ứng dụng khởi động để ảnh hiển thị đồng bộ với hiệu ứng
export function preloadWordImages() {
  if (typeof window === 'undefined') return;

  const preloadSingle = (src) => {
    if (!src) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  };

  // Preload các ảnh hero quan trọng nhất ngay tức thì
  allCriticalImages.slice(0, 10).forEach(preloadSingle);

  // Các ảnh còn lại tải tiếp nối sau vài mili-giây
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      allCriticalImages.slice(10).forEach(preloadSingle);
    });
  } else {
    setTimeout(() => {
      allCriticalImages.slice(10).forEach(preloadSingle);
    }, 150);
  }
}
