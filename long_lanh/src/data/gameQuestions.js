// Danh sách câu hỏi trắc nghiệm tiếng lóng miền Tây
// Dựa trên kho từ điển có sẵn của Lóng Lánh

export const gameQuestions = [
  {
    id: 1,
    question: "Từ nào sau đây là tiếng lóng miền Tây?",
    options: [
      { key: "A", text: "Chàng hảng", isCorrect: true },
      { key: "B", text: "Chi rứa", isCorrect: false },
      { key: "C", text: "Khổ qua", isCorrect: false },
      { key: "D", text: "Sức khỏe", isCorrect: false }
    ],
    correctWord: "Chàng hảng",
    slug: "chang-hang",
    meaning: "Giạng chân, dang rộng hai chân.",
    explanation: "Chàng hảng là cách nói dân dã của người miền Tây để chỉ dáng đứng, ngồi hoặc đi hai chân dang rộng, đầy vẻ tự nhiên xề xòa."
  },
  {
    id: 2,
    question: "Từ nào sau đây là tiếng lóng miền Tây mang nghĩa 'To, bự, lớn, khổng lồ'?",
    options: [
      { key: "A", text: "Chà bá", isCorrect: true },
      { key: "B", text: "To đùng", isCorrect: false },
      { key: "C", text: "Bự chảng", isCorrect: false },
      { key: "D", text: "Vĩ đại", isCorrect: false }
    ],
    correctWord: "Chà bá",
    slug: "cha-ba",
    meaning: "To, bự, lớn, khổng lồ.",
    explanation: "\"Chà bá\" là cách nói cường điệu nhấn mạnh kích thước cực lớn, người miền Tây thường ghép \"chà bá lửa\" cho thêm phần sinh động!"
  },
  {
    id: 3,
    question: "Khi gặp điều may mắn bất ngờ, vui sướng khôn xiết, người miền Tây dùng từ gì?",
    options: [
      { key: "A", text: "Hí hửng", isCorrect: false },
      { key: "B", text: "Mừng húm", isCorrect: true },
      { key: "C", text: "Khoái trá", isCorrect: false },
      { key: "D", text: "Phấn chấn", isCorrect: false }
    ],
    correctWord: "Mừng húm",
    slug: "mung-hum",
    meaning: "Vui mừng khôn xiết, mừng rỡ bất ngờ.",
    explanation: "\"Húm\" là từ láy đệm nhấn mạnh niềm vui vỡ òa khi gặp chuyện may mắn bất ngờ như trúng số hay bất ngờ được nhận quà."
  },
  {
    id: 4,
    question: "Từ \"Bá cháy\" trong tiếng lóng miền Tây mang ý nghĩa gì?",
    options: [
      { key: "A", text: "Lửa cháy quá lớn", isCorrect: false },
      { key: "B", text: "Nóng nảy, dễ quạo", isCorrect: false },
      { key: "C", text: "Rất ngon, tuyệt vời, đỉnh cao", isCorrect: true },
      { key: "D", text: "Cháy túi vì hết tiền", isCorrect: false }
    ],
    correctWord: "Bá cháy",
    slug: "ba-chay",
    meaning: "Rất ngon, xuất sắc, không còn gì bằng.",
    explanation: "\"Bá cháy\" (hoặc \"Bá cháy bọ chét\") là câu khen ngợi quen thuộc nhất xứ sông nước dành cho món ăn ngon hoặc trải nghiệm tuyệt đỉnh."
  },
  {
    id: 5,
    question: "Từ nào sau đây là tiếng lóng miền Tây khen người ăn mặc đẹp, phong độ?",
    options: [
      { key: "A", text: "Lịch lãm", isCorrect: false },
      { key: "B", text: "Bảnh tỏn", isCorrect: true },
      { key: "C", text: "Đẹp mã", isCorrect: false },
      { key: "D", text: "Soái ca", isCorrect: false }
    ],
    correctWord: "Bảnh tỏn",
    slug: "banh-ton",
    meaning: "Ăn mặc đẹp, chỉn chu, sáng sủa, phong độ.",
    explanation: "\"Bảnh tỏn dữ hen!\" là lời khen giản dị mà đầy thân tình khi thấy ai đó diện đồ mới hay chải chuốt gọn gàng."
  },
  {
    id: 6,
    question: "Ở miền Tây, câu \"Nhỏ đó xí xọn ghê\" thường dùng trong ngữ cảnh nào?",
    options: [
      { key: "A", text: "Trang điểm, thích mặc đẹp, điệu đà", isCorrect: true },
      { key: "B", text: "Hay nói xấu người khác", isCorrect: false },
      { key: "C", text: "Lười biếng, không chịu làm việc", isCorrect: false },
      { key: "D", text: "Ăn nói chua ngoa", isCorrect: false }
    ],
    correctWord: "Xí xọn",
    slug: "xi-xon",
    meaning: "Thích làm đẹp, thích ăn diện, chăm chút ngoại hình.",
    explanation: "\"Xí xọn\" là cách mọi người trêu vui một cách dễ thương khi ai đó diện đẹp hay trang điểm nổi bật, hoàn toàn không mang ý chê bai."
  },
  {
    id: 7,
    question: "Từ \"Túm húm\" dùng để mô tả điều gì trong đời sống miền Tây?",
    options: [
      { key: "A", text: "Cái túi đựng đồ nhiều thứ", isCorrect: false },
      { key: "B", text: "Nhỏ hẹp, chật chội, co cụm", isCorrect: true },
      { key: "C", text: "Hành động lén lút", isCorrect: false },
      { key: "D", text: "Tụ tập đông người", isCorrect: false }
    ],
    correctWord: "Túm húm",
    slug: "tum-hum",
    meaning: "Nhỏ hẹp, chật chội, co cụm.",
    explanation: "Thay vì nói chật chội khô khan, người miền Tây buông hai chữ \"túm húm\" như \"ngồi túm húm một góc\" vừa hóm hỉnh vừa đậm chất tả thực."
  },
  {
    id: 8,
    question: "Người mau nước mắt, dễ xúc động hay khóc ở miền Tây hay bị chọc là:",
    options: [
      { key: "A", text: "Yếu bóng vía", isCorrect: false },
      { key: "B", text: "Khóc nhè", isCorrect: false },
      { key: "C", text: "Mít ướt", isCorrect: true },
      { key: "D", text: "Sụt sùi", isCorrect: false }
    ],
    correctWord: "Mít ướt",
    slug: "mit-uot",
    meaning: "Dễ xúc động, hay khóc, mau nước mắt.",
    explanation: "Ví von như trái mít ướt xơ mềm chảy mủ, tiếng lóng \"mít ướt\" vừa tếu táo vừa thương, biến sự nhạy cảm thành nét đáng yêu."
  },
  {
    id: 9,
    question: "Từ nào sau đây là tiếng lóng miền Tây diễn tả không khí náo nhiệt, đông người?",
    options: [
      { key: "A", text: "Rần rần", isCorrect: true },
      { key: "B", text: "Râm ran", isCorrect: false },
      { key: "C", text: "Ồn ào", isCorrect: false },
      { key: "D", text: "Xôn xao", isCorrect: false }
    ],
    correctWord: "Rần rần",
    slug: "ran-ran",
    meaning: "Đông đúc, ồn ào, náo nhiệt.",
    explanation: "\"Bà con kéo tới rần rần\" hay \"đang hot rần rần\" là câu cửa miệng tả cảnh đông vui nhộn nhịp rất Nam Bộ."
  },
  {
    id: 10,
    question: "Người miền Tây khen \"Món này ngon hết sẩy\", chữ \"Hết sẩy\" có nghĩa là gì?",
    options: [
      { key: "A", text: "Ăn không còn sót miếng nào", isCorrect: false },
      { key: "B", text: "Rất tuyệt, hoàn hảo không chê vào đâu được", isCorrect: true },
      { key: "C", text: "Nấu quá tay bị khét", isCorrect: false },
      { key: "D", text: "Đắt tiền quá chừng", isCorrect: false }
    ],
    correctWord: "Hết sẩy",
    slug: "het-say",
    meaning: "Rất tuyệt, hoàn hảo, tuyệt đỉnh.",
    explanation: "\"Hết sẩy con bà Bảy\" là cách khen tới bến, thể hiện trọn vẹn tinh thần hào sảng, khen là khen hết nấc của người miền Tây!"
  }
];

export function getRandomQuestions(count = 10) {
  const shuffled = [...gameQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
