const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAllFavicons() {
  const src = 'src/assets/LOGO.png';

  // Crop parameters: perfect square centered on "Lóng Lánh" text and badge
  // Dimensions determined by pixel analysis:
  // Text bounds: X: 924..6884 (center 3904), Y: 1216..6244
  // Badge bounds: Y: 884..6996 (height ~6112)
  const cropLeft = 844;
  const cropTop = 880;
  const cropSize = 6120;

  console.log(`Extracting square crop: left=${cropLeft}, top=${cropTop}, size=${cropSize}...`);

  // Extract the 1:1 master square buffer
  const masterSquareBuffer = await sharp(src)
    .extract({ left: cropLeft, top: cropTop, width: cropSize, height: cropSize })
    .png()
    .toBuffer();

  const publicDir = 'public';

  // 1. Generate PNG favicons for web tabs and devices
  // For small sizes (16, 32), we add slight sharpening to maximize crispness and legibility in tabs
  const tab16 = await sharp(masterSquareBuffer)
    .resize(16, 16, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 1.2, m2: 0.5 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), tab16);

  const tab32 = await sharp(masterSquareBuffer)
    .resize(32, 32, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 1.0, m2: 0.5 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), tab32);

  const tab48 = await sharp(masterSquareBuffer)
    .resize(48, 48, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), tab48);

  const tab64 = await sharp(masterSquareBuffer)
    .resize(64, 64, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-64x64.png'), tab64);

  const appleTouch = await sharp(masterSquareBuffer)
    .resize(180, 180, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

  const android192 = await sharp(masterSquareBuffer)
    .resize(192, 192, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), android192);

  const logo512 = await sharp(masterSquareBuffer)
    .resize(512, 512, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), logo512);
  fs.writeFileSync(path.join(publicDir, 'logo.png'), logo512);

  // Also update logo.jpeg with solid white background just in case it is requested
  const logoJpeg = await sharp(masterSquareBuffer)
    .resize(512, 512, { kernel: 'lanczos3' })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 95 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo.jpeg'), logoJpeg);

  // 2. Generate multi-resolution Windows favicon.ico (16, 32, 48, 64)
  const icoSizes = [16, 32, 48, 64];
  const icoBuffers = [tab16, tab32, tab48, tab64];

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
    entry.writeUInt8(s === 256 ? 0 : s, 0); // width
    entry.writeUInt8(s === 256 ? 0 : s, 1); // height
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

  console.log('Successfully generated all favicons, logo.png, logo.jpeg, and favicon.ico!');
}

generateAllFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
