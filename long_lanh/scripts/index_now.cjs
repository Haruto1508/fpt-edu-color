// scripts/index_now.cjs
const https = require('https');

const API_KEY = '9116485C0592F54E0419A0F4AFD362D2';
const HOST = 'www.tienglongmientay.com';
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;

const URLS_TO_INDEX = [
  `https://${HOST}/`,
  `https://${HOST}/favicon.ico`,
  `https://${HOST}/kham-pha`,
  `https://${HOST}/tu-dien`,
  `https://${HOST}/game`,
  `https://${HOST}/dong-gop`
];

const postData = JSON.stringify({
  host: HOST,
  key: API_KEY,
  keyLocation: KEY_LOCATION,
  urlList: URLS_TO_INDEX
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🚀 Đang gửi yêu cầu lập chỉ mục tới Microsoft Bing IndexNow...');
console.log('Danh sách URLs:', URLS_TO_INDEX);

const req = https.request(options, (res) => {
  console.log(`\nPhản hồi từ IndexNow API: HTTP ${res.statusCode} ${res.statusMessage}`);
  
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log('✅ THÀNH CÔNG! Microsoft Bing đã tiếp nhận yêu cầu lập chỉ mục khẩn cấp.');
    console.log('   (Mã 202 Accepted: Bing đã đưa các URL vào hàng đợi crawl ưu tiên cao nhất).');
  } else {
    console.log(`⚠️ Mã trạng thái: ${res.statusCode}.`);
  }
  
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error('❌ Lỗi khi gửi IndexNow:', e);
});

req.write(postData);
req.end();
