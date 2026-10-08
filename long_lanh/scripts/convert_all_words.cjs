const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Projects/fpt-edu-color/long_lanh/Ảnh wed';
const destDir = 'c:/Projects/fpt-edu-color/long_lanh/src/assets/words';

const wordMappings = [
  { raw: 'banh chành-01.png', target: 'banh_chanh.png' },
  { raw: 'bá cháy-01.png', target: 'ba_chay.png' },
  { raw: 'Bảnh tỏn-01.png', target: 'banh_ton.png' },
  { raw: 'chà bá-01.png', target: 'cha_ba.png' },
  { raw: 'chàng hảng-01.png', target: 'chang_hang.png' },
  { raw: 'chù ụ-01.png', target: 'chu_u.png' },
  { raw: 'chọt lét-01.png', target: 'chot_let.png' },
  { raw: 'lóc chóc-01.png', target: 'loc_choc.png' },
  { raw: 'mít ướt-01.png', target: 'mit_uot.png' },
  { raw: 'mừng húm -01.png', target: 'mung_hum.png' },
  { raw: 'no nóc-01.png', target: 'no_noc.png' },
  { raw: 'thẳng băng-01.png', target: 'thang_bang.png' },
  { raw: 'túm húm-01.png', target: 'tum_hum.png' },
  { raw: 'xí xọn-01.png', target: 'xi_xon.png' }
];

async function convertAllWords() {
  console.log('--- Starting conversion of 14 word images ---');

  for (const item of wordMappings) {
    const rawPath = path.join(srcDir, item.raw);
    const targetPath = path.join(destDir, item.target);

    if (!fs.existsSync(rawPath)) {
      console.error(`ERROR: Source file not found: ${rawPath}`);
      continue;
    }

    try {
      const result = await sharp(rawPath)
        .trim()
        .png({ quality: 90, compressionLevel: 8 })
        .toFile(targetPath);

      const sizeKb = Math.round(result.size / 1024);
      console.log(`✓ Converted: ${item.target.padEnd(16)} -> ${result.width}x${result.height} (${sizeKb} KB)`);
    } catch (err) {
      console.error(`✗ Error converting ${item.raw}:`, err);
    }
  }

  // Remove redundant xi_lon.png if present
  const xiLonPath = path.join(destDir, 'xi_lon.png');
  if (fs.existsSync(xiLonPath)) {
    fs.unlinkSync(xiLonPath);
    console.log('✓ Removed obsolete duplicate xi_lon.png');
  }

  console.log('--- Finished converting all word images ---');
}

convertAllWords();
