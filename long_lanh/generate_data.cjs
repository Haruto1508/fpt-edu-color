const fs = require('fs');

const topics = ["Đời sống", "Con người", "Cảm xúc", "Sinh hoạt", "Ăn uống", "Giao tiếp"];
const colors = ["red", "green", "blue", "yellow"];

const baseWords = [
  { title: "CHÀ BÁ", subtitle: "To, bự, lớn, khổng lồ", desc: "To, bự, lớn, khổng lồ.<br/><br/>VD: Ổ bánh mì chà bá", meaningMain: "rất to, khổng lồ.", meaningDesc: "Dùng để nhấn mạnh kích thước.", examples: ["\"Ổ bánh mì chà bá.\"", "\"Nhà chà bá.\""], storyLines: ["Người miền Tây thích nói quá lên cho vui."] },
  { title: "XÍ XỌN", subtitle: "Trang điểm, điệu đà", desc: "Trang điểm, điệu đà.<br/><br/>VD: Xí xọn quá!", meaningMain: "làm dáng, chưng diện.", meaningDesc: "Ám chỉ sự điệu đà.", examples: ["\"Xí xọn quá hen!\"", "\"Đi đâu xí xọn vậy?\""], storyLines: ["Mộc mạc nhưng cũng thích làm đẹp."] },
  { title: "MỪNG HÚM", subtitle: "Vui mừng bất ngờ", desc: "Vui mừng bất ngờ.<br/><br/>VD: Mừng húm luôn.", meaningMain: "vui vẻ, phấn khích.", meaningDesc: "Cảm xúc mừng rỡ.", examples: ["\"Đậu đại học mừng húm.\"", "\"Cho tiền mừng húm.\""], storyLines: ["Cảm xúc chân thật, có sao nói vậy."] },
  { title: "BÁ CHÁY", subtitle: "Rất ngon, rất đỉnh", desc: "Rất ngon, rất đỉnh.<br/><br/>VD: Ngon bá cháy.", meaningMain: "tuyệt vời, xuất sắc.", meaningDesc: "Khen ngợi hết mức.", examples: ["\"Ngon bá cháy.\"", "\"Đẹp bá cháy bọ chét.\""], storyLines: ["Từ cửa miệng quen thuộc khi khen."] },
  { title: "BẢNH TỎN", subtitle: "Đẹp, phong độ", desc: "Đẹp, phong độ.<br/><br/>VD: Bảnh tỏn dữ hen!", meaningMain: "chải chuốt, sang trọng.", meaningDesc: "Khen ngợi vẻ bề ngoài tươm tất.", examples: ["\"Nay bảnh tỏn dữ!\"", "\"Chú rể bảnh tỏn.\""], storyLines: ["Sự tôn trọng ngoại hình trong dịp lễ."] }
];

const words = [];
let colorIndex = 0;

topics.forEach((topic) => {
  for (let i = 1; i <= 20; i++) {
    const base = baseWords[i % baseWords.length];
    const title = `${base.title} ${i}`;
    const slug = `${topic.toLowerCase().replace(/ /g, '-')}-${i}`;
    
    words.push({
      slug,
      color: colors[colorIndex % colors.length],
      tag: topic,
      hashtag: `#${title.replace(/ /g, '').toLowerCase()}`,
      title: title,
      subtitle: base.subtitle,
      desc: base.desc.replace(base.title.toLowerCase(), title.toLowerCase()),
      meaningMain: base.meaningMain,
      meaningDesc: base.meaningDesc,
      examples: base.examples,
      storyLines: base.storyLines
    });
    colorIndex++;
  }
});

fs.writeFileSync('./src/data/words.json', JSON.stringify(words, null, 2), 'utf-8');
console.log('Generated 120 words successfully!');
