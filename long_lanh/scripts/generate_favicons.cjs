const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAllAssets() {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const assetsDir = path.join(rootDir, 'src/assets');
  const masterSrc = path.join(assetsDir, 'LOGO.png');
  const backupSrc = path.join(assetsDir, 'LOGO_master_original.png');

  // 1. Back up original 8334x8334 master if not already backed up
  if (!fs.existsSync(backupSrc)) {
    fs.copyFileSync(masterSrc, backupSrc);
    console.log('✓ Backed up master LOGO.png to LOGO_master_original.png');
  }

  const masterFile = fs.existsSync(backupSrc) ? backupSrc : masterSrc;

  // 2. Trim master logo to get exact boundary of text, stars and cloud badge
  console.log('Trimming master logo bounding box...');
  const trimmedBuffer = await sharp(masterFile)
    .trim()
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log(`Trimmed size: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // 3. Create a 512x512 Master Square Logo with 10% safe zone
  // Fitting inside 420x420 ensures nothing is cut off even when cropped to a circle by Google/social apps
  const targetLogoSize = 420;
  const resizedLogoBuf = await sharp(trimmedBuffer)
    .resize(targetLogoSize, targetLogoSize, { fit: 'inside', kernel: 'lanczos3' })
    .toBuffer();

  const resizedMeta = await sharp(resizedLogoBuf).metadata();
  const leftOffset = Math.round((512 - resizedMeta.width) / 2);
  const topOffset = Math.round((512 - resizedMeta.height) / 2);

  // Master 512x512 transparent logo
  const master512Buf = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resizedLogoBuf, top: topOffset, left: leftOffset }])
    .png()
    .toBuffer();

  // Save public/logo.png and android-chrome-512x512.png
  fs.writeFileSync(path.join(publicDir, 'logo.png'), master512Buf);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), master512Buf);
  console.log('✓ Generated public/logo.png (512x512, uncut with safe zone)');

  // Master 512x512 JPEG with brand cream background
  const logoJpegBuf = await sharp(master512Buf)
    .flatten({ background: { r: 254, g: 248, b: 231 } }) // #fef8e7
    .jpeg({ quality: 96 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo.jpeg'), logoJpegBuf);
  console.log('✓ Generated public/logo.jpeg (512x512 with brand background)');

  // 4. Generate all Google Search multiple-of-48px Favicons + browser sizes
  // 48x48: Google Search default
  const fav48 = await sharp(master512Buf)
    .resize(48, 48, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.6, m1: 1.0, m2: 0.5 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), fav48);

  // 96x96: Google Search high-DPI
  const fav96 = await sharp(master512Buf)
    .resize(96, 96, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.5, m1: 0.8, m2: 0.4 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-96x96.png'), fav96);

  // 144x144: Google Search 3x DPI
  const fav144 = await sharp(master512Buf)
    .resize(144, 144, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-144x144.png'), fav144);

  // 192x192: Android Chrome
  const fav192 = await sharp(master512Buf)
    .resize(192, 192, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), fav192);
  fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), fav192);

  // 16x16, 32x32, 64x64 for desktop browser tabs
  const fav16 = await sharp(master512Buf)
    .resize(16, 16, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.7, m1: 1.2, m2: 0.5 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), fav16);

  const fav32 = await sharp(master512Buf)
    .resize(32, 32, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.6, m1: 1.0, m2: 0.5 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), fav32);

  const fav64 = await sharp(master512Buf)
    .resize(64, 64, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-64x64.png'), fav64);

  // Apple touch icon (180x180 with solid cream background for iOS squircle)
  const appleTouchBuf = await sharp(master512Buf)
    .resize(180, 180, { kernel: 'lanczos3' })
    .flatten({ background: { r: 254, g: 248, b: 231 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchBuf);
  console.log('✓ Generated all PNG favicons (16, 32, 48, 64, 96, 144, 180, 192, 512)');

  // 5. Generate Multi-resolution favicon.ico containing 16, 32, 48, 64
  const icoSizes = [16, 32, 48, 64];
  const icoBuffers = [fav16, fav32, fav48, fav64];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(icoSizes.length, 4); // count

  let offset = 6 + (16 * icoSizes.length);
  const dirEntries = [];
  for (let i = 0; i < icoSizes.length; i++) {
    const s = icoSizes[i];
    const b = icoBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(s, 0); // width
    entry.writeUInt8(s, 1); // height
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(b.length, 8); // image size in bytes
    entry.writeUInt32LE(offset, 12); // file offset
    dirEntries.push(entry);
    offset += b.length;
  }

  const icoBuf = Buffer.concat([header, ...dirEntries, ...icoBuffers]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  console.log('✓ Generated public/favicon.ico with multi-resolution layers');

  // 6. Generate 1200x630 High-Resolution Open Graph / Social Media Banner (og-image.png)
  console.log('Generating 1200x630 og-image.png...');
  const ogLogoBuf = await sharp(trimmedBuffer)
    .resize(380, 380, { fit: 'inside', kernel: 'lanczos3' })
    .toBuffer();
  const ogLogoMeta = await sharp(ogLogoBuf).metadata();
  const ogLogoTop = Math.round((630 - ogLogoMeta.height) / 2);
  const ogLogoLeft = 70;

  const svgOgCard = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="120%" height="120%">
      <feDropShadow dx="6" dy="6" stdDeviation="0" flood-color="#111111" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="#fef8e7" />

  <!-- Outer Card with Neobrutalism Border -->
  <rect x="28" y="28" width="1144" height="574" rx="20" fill="#fffef9" stroke="#111111" stroke-width="4.5" />

  <!-- Decorative Top Banner Bar -->
  <rect x="28" y="28" width="1144" height="18" fill="#f5d657" stroke="#111111" stroke-width="4.5" />

  <!-- Tag Pill Top Right -->
  <g transform="translate(480, 85)">
    <rect x="0" y="0" width="620" height="64" rx="14" fill="#f5d657" stroke="#111111" stroke-width="3.5" filter="url(#shadow)" />
    <text x="310" y="42" font-family="'VL Grauna', 'Be Vietnam Pro', system-ui, sans-serif" font-size="26" font-weight="900" fill="#111111" text-anchor="middle" letter-spacing="1.5">TIẾNG LÓNG MIỀN TÂY</text>
  </g>

  <!-- Headline -->
  <text x="480" y="215" font-family="'VL Grauna', 'Be Vietnam Pro', system-ui, sans-serif" font-size="36" font-weight="900" fill="#2c4a9a" letter-spacing="-0.5">KHO TÀNG KHẨU NGỮ NAM BỘ</text>

  <!-- Description lines -->
  <text x="480" y="268" font-family="'Be Vietnam Pro', system-ui, sans-serif" font-size="20" font-weight="600" fill="#333333">
    Tra cứu từ điển tiếng lóng mộc mạc, dí dỏm, chân chất
  </text>
  <text x="480" y="302" font-family="'Be Vietnam Pro', system-ui, sans-serif" font-size="20" font-weight="600" fill="#333333">
    kèm audio giọng chuẩn miền Tây &amp; trò chơi nối từ thú vị.
  </text>

  <!-- Feature Badges -->
  <g transform="translate(480, 355)">
    <!-- Badge 1 -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="165" height="44" rx="10" fill="#2c4a9a" stroke="#111111" stroke-width="2.5" filter="url(#shadow)" />
      <text x="82" y="28" font-family="'Be Vietnam Pro', system-ui, sans-serif" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">14+ TỪ LÓNG</text>
    </g>
    <!-- Badge 2 -->
    <g transform="translate(180, 0)">
      <rect x="0" y="0" width="180" height="44" rx="10" fill="#38a169" stroke="#111111" stroke-width="2.5" filter="url(#shadow)" />
      <text x="90" y="28" font-family="'Be Vietnam Pro', system-ui, sans-serif" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">AUDIO PHÁT ÂM</text>
    </g>
    <!-- Badge 3 -->
    <g transform="translate(375, 0)">
      <rect x="0" y="0" width="165" height="44" rx="10" fill="#e53e3e" stroke="#111111" stroke-width="2.5" filter="url(#shadow)" />
      <text x="82" y="28" font-family="'Be Vietnam Pro', system-ui, sans-serif" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">GAME NỐI TỪ</text>
    </g>
  </g>

  <!-- Domain Bar Bottom -->
  <g transform="translate(480, 455)">
    <rect x="0" y="0" width="380" height="50" rx="12" fill="#ffffff" stroke="#111111" stroke-width="3" filter="url(#shadow)" />
    <text x="190" y="32" font-family="system-ui, monospace, sans-serif" font-size="19" font-weight="800" fill="#2c4a9a" text-anchor="middle">🌐 tienglongmientay.com</text>
  </g>
</svg>
`;

  const ogCardBuf = await sharp(Buffer.from(svgOgCard))
    .composite([{ input: ogLogoBuf, top: ogLogoTop, left: ogLogoLeft }])
    .png({ quality: 95 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogCardBuf);
  console.log('✓ Generated public/og-image.png (1200x630)');

  // 7. Optimize src/assets/LOGO.png for web header loading (800x800 ~45KB instead of 1MB)
  const optimizedHeaderLogo = await sharp(trimmedBuffer)
    .resize(800, 800, { fit: 'inside', kernel: 'lanczos3' })
    .png({ palette: true, quality: 92, compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(masterSrc, optimizedHeaderLogo);
  console.log(`✓ Optimized src/assets/LOGO.png for web header (${optimizedHeaderLogo.length} bytes, was 1.03 MB)`);

  console.log('\nAll SEO image assets generated successfully!');
}

generateAllAssets().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
