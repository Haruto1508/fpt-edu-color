const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Template dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const wordsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'src/data/words.json'), 'utf8'));

const BASE_URL = 'https://www.tienglongmientay.com';

const routes = [
  {
    path: '/kham-pha',
    title: 'Khám Phá Tiếng Lóng Miền Tây | Lóng Lánh',
    description: 'Khám phá và tra cứu kho tàng tiếng lóng miền Tây Nam Bộ theo các chủ đề đời sống, con người, cảm xúc, tính cách với phát âm thực tế và hình ảnh sinh động.',
    h1: 'KHÁM PHÁ TIẾNG LÓNG MIỀN TÂY',
    content: `
      <section style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2.2rem; color: #111;">KHÁM PHÁ TIẾNG LÓNG MIỀN TÂY</h1>
        <p style="font-size: 1.1rem; line-height: 1.6;">Tra cứu và khám phá những tiếng lóng độc đáo, mộc mạc và chân chất của miền sông nước Nam Bộ.</p>
        <div style="margin-top: 2rem;">
          <h2>Danh sách từ lóng nổi bật:</h2>
          <ul>
            ${wordsData.map(w => `<li><a href="${BASE_URL}/tu-vung/${w.slug}"><strong>${w.title}</strong></a> - ${w.subtitle}</li>`).join('\n')}
          </ul>
        </div>
      </section>
    `
  },
  {
    path: '/tu-dien',
    title: 'Từ Điển Tiếng Lóng Theo Chủ Đề | Lóng Lánh',
    description: 'Tổng hợp từ điển tiếng lóng miền Tây Nam Bộ phân loại theo chủ đề: Đời sống, Con người, Cảm xúc, Hành động... dễ dàng tra cứu và ghi nhớ.',
    h1: 'TỪ ĐIỂN TIẾNG LÓNG THEO CHỦ ĐỀ',
    content: `
      <section style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2.2rem; color: #111;">TỪ ĐIỂN TIẾNG LÓNG THEO CHỦ ĐỀ</h1>
        <p style="font-size: 1.1rem; line-height: 1.6;">Hệ thống phân nhóm từ ngữ Nam Bộ theo các đề mục Đời sống, Con người, Cảm xúc.</p>
        <ul>
          ${wordsData.map(w => `<li><a href="${BASE_URL}/tu-vung/${w.slug}">[${w.tag}] <strong>${w.title}</strong></a>: ${w.meaningMain}</li>`).join('\n')}
        </ul>
      </section>
    `
  },
  {
    path: '/game',
    title: 'Thử Thách Nối Từ Miền Tây - Game Lóng Lánh',
    description: 'Thử tài đoán và nối từ tiếng lóng miền Tây cực vui và hấp dẫn. Xem bạn hiểu khẩu ngữ Nam Bộ đến mức nào cùng Lóng Lánh!',
    h1: 'TRÒ CHƠI THỬ THÁCH NỐI TỪ MIỀN TÂY',
    content: `
      <section style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2.2rem; color: #111;">TRÒ CHƠI NỐI TỪ MIỀN TÂY</h1>
        <p style="font-size: 1.1rem; line-height: 1.6;">Thử sức với các câu đố tiếng lóng và khẩu ngữ Nam Bộ cực kỳ dí dỏm cùng Lóng Lánh.</p>
      </section>
    `
  },
  {
    path: '/chuyen-phia-sau',
    title: 'Chuyện Phía Sau Dự Án | Lóng Lánh - Tiếng Lóng Miền Tây',
    description: 'Tìm hiểu câu chuyện, hành trình phát triển và sứ mệnh "Giữ chữ, giữ hồn quê" của dự án văn hóa số Lóng Lánh - Tiếng Lóng Miền Tây.',
    h1: 'CHUYỆN PHÍA SAU DỰ ÁN LÓNG LÁNH',
    content: `
      <section style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2.2rem; color: #111;">CHUYỆN PHÍA SAU DỰ ÁN LÓNG LÁNH</h1>
        <p style="font-size: 1.2rem; font-weight: bold; color: #d63031;">Sứ mệnh: Giữ chữ, giữ hồn quê</p>
        <p style="font-size: 1.05rem; line-height: 1.6;">Tiếng lóng không chỉ là cách nói. Nó là cách một vùng đất kể chuyện về chính mình.</p>
      </section>
    `
  },
  {
    path: '/gop-tu',
    title: 'Góc Góp Từ | Lóng Lánh - Đóng Góp Tiếng Lóng Miền Tây',
    description: 'Cùng chung tay đóng góp và làm phong phú thêm kho tàng tiếng lóng miền Tây Nam Bộ tại Góc Góp Từ của dự án Lóng Lánh.',
    h1: 'GÓC GÓP TỪ',
    content: `
      <section style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2.2rem; color: #111;">GÓC GÓP TỪ</h1>
        <p style="font-size: 1.1rem; line-height: 1.6;">Cùng nhau lưu giữ và chia sẻ những câu nói, tiếng lóng mộc mạc và dí dỏm của người dân miền Tây sông nước.</p>
      </section>
    `
  }
];

// Helper lấy ảnh đại diện đã build của từ vựng
const distAssets = fs.existsSync(path.join(distDir, 'assets')) ? fs.readdirSync(path.join(distDir, 'assets')) : [];
function getWordAssetImage(slug) {
  const cleanName = slug.replace(/-/g, '_');
  const matched = distAssets.find(f => f.startsWith(`${cleanName}-`) && f.endsWith('.png'));
  return matched ? `${BASE_URL}/assets/${matched}` : `${BASE_URL}/logo.png`;
}

// Thêm các trang chi tiết từ vựng
wordsData.forEach(word => {
  const wordImageUrl = getWordAssetImage(word.slug);
  routes.push({
    path: `/tu-vung/${word.slug}`,
    title: `${word.title} là gì? Ý nghĩa từ điển tiếng lóng miền Tây | Lóng Lánh`,
    description: `Giải nghĩa từ lóng "${word.title}": ${word.meaningMain} ${word.subtitle}. Nghe audio phát âm giọng miền Tây chuẩn và ví dụ minh họa dí dỏm.`,
    keywords: `${word.title}, ${word.title} là gì, nghĩa của ${word.title}, từ điển ${word.title}, tiếng lóng ${word.title}, ${word.hashtag}, khẩu ngữ nam bộ, tiếng miền tây`,
    image: wordImageUrl,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "DefinedTerm",
          "@id": `${BASE_URL}/tu-vung/${word.slug}#term`,
          "name": word.title,
          "description": `${word.meaningMain} - ${word.subtitle}`,
          "image": wordImageUrl,
          "inDefinedTermSet": {
            "@type": "DefinedTermSet",
            "name": "Lóng Lánh - Từ Điển Tiếng Lóng Miền Tây",
            "url": `${BASE_URL}/tu-dien`
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": `${BASE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Từ điển", "item": `${BASE_URL}/tu-dien` },
            { "@type": "ListItem", "position": 3, "name": word.title, "item": `${BASE_URL}/tu-vung/${word.slug}` }
          ]
        }
      ]
    },
    content: `
      <article style="padding: 2rem; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2.5rem; color: #111; margin-bottom: 0.5rem;">${word.title}</h1>
        <p style="font-size: 1.2rem; color: #555; margin-bottom: 1.5rem;">${word.subtitle}</p>
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <img src="${wordImageUrl}" alt="${word.title} - Tiếng Lóng Miền Tây" width="400" height="400" style="max-width: 100%; height: auto; border-radius: 12px; border: 2.5px solid #111;" />
        </div>
        <div style="background: #fdf6d8; border: 2px solid #111; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.3rem; margin-top: 0;">Ý nghĩa tiếng lóng:</h2>
          <p style="font-size: 1.1rem; line-height: 1.6;"><strong>${word.title}</strong> nghĩa là <strong>${word.meaningMain}</strong></p>
          <p style="line-height: 1.6;">${word.meaningDesc}</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.2rem;">Ví dụ câu nói thực tế:</h3>
          <ul>
            ${(word.examples || []).map(ex => `<li style="font-size: 1.05rem; margin-bottom: 0.5rem;">${ex}</li>`).join('\n')}
          </ul>
        </div>
        <div>
          <h3 style="font-size: 1.2rem;">Chuyện đằng sau từ:</h3>
          ${(word.storyLines || []).map(line => `<p style="line-height: 1.6;">${line}</p>`).join('\n')}
        </div>
        <p style="margin-top: 2rem;"><a href="${BASE_URL}/kham-pha">← Quay lại kho tàng từ điển Lóng Lánh</a></p>
      </article>
    `
  });
});

console.log(`Pre-rendering ${routes.length} static SEO pages...`);

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}

routes.forEach(route => {
  const fullUrl = `${BASE_URL}${route.path}`;
  const safeTitle = escapeAttr(route.title);
  const safeDesc = escapeAttr(route.description);
  let html = template;

  // 1. Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  html = html.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${safeTitle}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta property="twitter:title" content=".*?" \/>/, `<meta property="twitter:title" content="${safeTitle}" />`);

  // 2. Description & Keywords
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${safeDesc}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${safeDesc}" />`);
  html = html.replace(/<meta property="twitter:description" content=".*?" \/>/, `<meta property="twitter:description" content="${safeDesc}" />`);
  if (route.keywords) {
    const safeKeywords = escapeAttr(route.keywords);
    html = html.replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${safeKeywords}" />`);
  }

  // 3. Canonical & OG URL
  html = html.replace(/<link rel="canonical" id="canonical-url" href=".*?" \/>/, `<link rel="canonical" id="canonical-url" href="${fullUrl}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${fullUrl}" />`);
  html = html.replace(/<meta property="twitter:url" content=".*?" \/>/, `<meta property="twitter:url" content="${fullUrl}" />`);

  // 4. Image
  if (route.image) {
    const safeImg = escapeAttr(route.image);
    html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${safeImg}" />`);
    html = html.replace(/<meta property="twitter:image" content=".*?" \/>/, `<meta property="twitter:image" content="${safeImg}" />`);
  }

  // 5. Schema if provided
  if (route.schema) {
    const schemaTag = `<script id="page-structured-data" type="application/ld+json">${JSON.stringify(route.schema)}</script>`;
    html = html.replace('</head>', `  ${schemaTag}\n</head>`);
  }

  // 5. Injected pre-rendered fallback in root div
  if (route.content) {
    html = html.replace('<div id="root"></div>', `<div id="root">${route.content}</div>`);
  }

  // Write target index.html
  const targetDir = path.join(distDir, route.path.replace(/^\//, ''));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`✓ Generated: dist${route.path}/index.html`);
});

// Cập nhật schema FAQ cho trang chủ dist/index.html
const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}/#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Tiếng lóng miền Tây là gì?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tiếng lóng miền Tây là hệ thống khẩu ngữ, phương ngữ dân dã, biểu cảm và sinh động được người dân miền Tây Nam Bộ sử dụng thường nhật như Chà Bá, Bá Cháy, Bảnh Tỏn, Xí Xọn, Chàng Hảng, Túm Húm..."
      }
    },
    {
      "@type": "Question",
      "name": "Website Lóng Lánh tra cứu từ điển tiếng lóng như thế nào?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Website Lóng Lánh cung cấp tính năng tra cứu từ điển tiếng lóng Nam Bộ trực tuyến miễn phí kèm phát âm audio giọng chuẩn miền Tây, hình ảnh minh họa độc quyền và game nối từ."
      }
    },
    {
      "@type": "Question",
      "name": "Từ 'Chà Bá' có nghĩa là gì?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "'Chà Bá' là cách nói cường điệu của người miền Tây để chỉ kích thước rất to, khổng lồ (ví dụ: ổ bánh mì chà bá, con cá chà bá)."
      }
    },
    {
      "@type": "Question",
      "name": "Từ 'Bá Cháy' có nghĩa là gì?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "'Bá Cháy' (hay bá cháy bọ chét) là câu khen ngợi quen thuộc chỉ sự tuyệt vời, cực ngon, đỉnh cao không chê vào đâu được."
      }
    }
  ]
};

const homeFaqTag = `<script id="home-faq-structured-data" type="application/ld+json">${JSON.stringify(homeFaqSchema)}</script>`;
let rootHtml = fs.readFileSync(templatePath, 'utf8');
if (!rootHtml.includes('home-faq-structured-data')) {
  rootHtml = rootHtml.replace('</head>', `  ${homeFaqTag}\n</head>`);
  fs.writeFileSync(templatePath, rootHtml, 'utf8');
  console.log('✓ Injected FAQPage schema into root dist/index.html');
}

console.log('Pre-rendering completed successfully!');
