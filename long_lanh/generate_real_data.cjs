const fs = require('fs');

const data = [
  // Đời sống
  {
    slug: 'cha-ba', color: 'red', tag: 'Đời sống', hashtag: '#chaba', title: 'CHÀ BÁ', subtitle: 'To, bự, lớn, khổng lồ',
    desc: 'To, bự, lớn, khổng lồ.<br/><br/>VD: Ổ bánh mì chà bá',
    meaningMain: 'rất to, rất lớn, khổng lồ.',
    meaningDesc: '"Chà bá" là cách nói cường điệu để nhấn mạnh kích thước. Người miền Tây dùng từ này rất thường xuyên.',
    examples: ['"Ổ bánh mì chà bá."', '"Cái núi chà bá lửa"'],
    storyLines: ['Người miền Tây thích cách nói giàu hình ảnh.', 'Đó là nét hài hước rất đặc trưng.']
  },
  {
    slug: 'ran-ran', color: 'green', tag: 'Đời sống', hashtag: '#ranran', title: 'RẦN RẦN', subtitle: 'Đông đúc, ồn ào, náo nhiệt',
    desc: 'Đông đúc, ồn ào, náo nhiệt.<br/><br/>VD: Đám cưới rần rần',
    meaningMain: 'nhộn nhịp, đông vui.',
    meaningDesc: 'Mô tả không khí sôi động, đông người tụ tập.',
    examples: ['"Bà con kéo tới rần rần."', '"Đang hot rần rần trên mạng."'],
    storyLines: ['Thích sự đông vui náo nhiệt.', 'Chuyện gì vui là bà con gom lại.']
  },
  {
    slug: 'ta-la', color: 'blue', tag: 'Đời sống', hashtag: '#tala', title: 'TÁ LẢ', subtitle: 'Nhiều quá, lộn xộn, đủ thứ',
    desc: 'Nhiều quá, lộn xộn, đủ thứ.<br/><br/>VD: Đồ đạc tá lả',
    meaningMain: 'rất nhiều, đa dạng.',
    meaningDesc: 'Chỉ sự phong phú hoặc đôi khi là bừa bộn.',
    examples: ['"Bán tá lả âm binh."', '"Mua đồ tá lả."'],
    storyLines: ['Miền Tây sông nước trù phú nên cái gì cũng nhiều.', 'Nói tá lả cho lẹ.']
  },
  {
    slug: 'het-say', color: 'yellow', tag: 'Đời sống', hashtag: '#hetsay', title: 'HẾT SẨY', subtitle: 'Rất tuyệt, hoàn hảo',
    desc: 'Rất tuyệt, hoàn hảo.<br/><br/>VD: Tuyệt vời hết sẩy',
    meaningMain: 'tuyệt đỉnh, không chê vào đâu được.',
    meaningDesc: 'Dùng để khen ngợi mọi thứ từ đồ ăn tới cảnh đẹp.',
    examples: ['"Cảnh đẹp hết sẩy."', '"Mát mẻ hết sẩy con bà bảy."'],
    storyLines: ['Khen là phải khen tới bến.', 'Tính cách sảng khoái của người Nam.']
  },
  
  // Con người
  {
    slug: 'xi-xon', color: 'red', tag: 'Con người', hashtag: '#xixon', title: 'XÍ XỌN', subtitle: 'Trang điểm, mặc đẹp, điệu đà',
    desc: 'Trang điểm, mặc đẹp, điệu đà.<br/><br/>VD: Nhỏ đó xí xọn ghê.',
    meaningMain: 'làm dáng, hay chưng diện.',
    meaningDesc: 'Ám chỉ sự điệu đà, thích trang điểm.',
    examples: ['"Bữa nay xí xọn quá hen!"', '"Thích xí xọn từ bé."'],
    storyLines: ['Mộc mạc nhưng cũng rất thích cái đẹp.', 'Từ này mang sắc thái vui vẻ.']
  },
  {
    slug: 'banh-ton', color: 'yellow', tag: 'Con người', hashtag: '#banhton', title: 'BẢNH TỎN', subtitle: 'Đẹp, lịch sự, phong độ',
    desc: 'Đẹp, lịch sự, phong độ.<br/><br/>VD: Nay bảnh tỏn dữ hen!',
    meaningMain: 'chải chuốt, ăn mặc sang trọng.',
    meaningDesc: 'Dùng khen người đàn ông ăn mặc đẹp đẽ hơn ngày thường.',
    examples: ['"Nay bảnh tỏn dữ!"', '"Chú rể hôm nay bảnh tỏn quá."'],
    storyLines: ['Lúc cần cũng rất tươm tất.', 'Lời khen mang lại niềm vui nho nhỏ.']
  },
  {
    slug: 'tanh-tanh', color: 'blue', tag: 'Con người', hashtag: '#tanhtanh', title: 'TÀNH TÀNH', subtitle: 'Thong thả, không vội, từ từ',
    desc: 'Thong thả, không vội, từ từ.<br/><br/>VD: Đi tành tành thôi.',
    meaningMain: 'thong thả, nhẩn nha.',
    meaningDesc: 'Làm việc gì đó chậm rãi, không gấp gáp.',
    examples: ['"Cứ chạy tành tành ra chợ."', '"Làm tành tành cũng xong."'],
    storyLines: ['Nhịp sống bình dị.', 'Không chen lấn, vội vã.']
  },
  {
    slug: 'cuc-suc', color: 'green', tag: 'Con người', hashtag: '#cucsuc', title: 'CỤC SÚC', subtitle: 'Nóng tính, thô lỗ, dễ quạo',
    desc: 'Nóng tính, thô lỗ, dễ quạo.<br/><br/>VD: Đừng có cục súc.',
    meaningMain: 'thái độ thô lỗ, cáu bẳn.',
    meaningDesc: 'Người hay nóng giận vô cớ.',
    examples: ['"Nói chuyện cục súc ghê."', '"Ổng đang cục súc đó."'],
    storyLines: ['Người miền Tây có sao nói vậy.', 'Nhưng đôi khi cũng thẳng thắn quá mức.']
  },

  // Cảm xúc
  {
    slug: 'mung-hum', color: 'blue', tag: 'Cảm xúc', hashtag: '#munghum', title: 'MỪNG HÚM', subtitle: 'Vui mừng, yêu thích bất ngờ',
    desc: 'Vui mừng, yêu thích bất ngờ.<br/><br/>VD: Mừng húm chạy ra.',
    meaningMain: 'vui vẻ, phấn khích bất ngờ.',
    meaningDesc: 'Diễn tả cảm xúc mừng rỡ không giấu được ra mặt.',
    examples: ['"Nghe tin đậu đại học, mừng húm."', '"Được cho tiền, mừng húm."'],
    storyLines: ['Cảm xúc chân thật, có sao nói vậy.', 'Niềm vui hiện rõ trên nụ cười.']
  },
  {
    slug: 'queo', color: 'red', tag: 'Cảm xúc', hashtag: '#queo', title: 'QUÉO', subtitle: 'Sợ hãi, co rúm, bất ngờ',
    desc: 'Sợ hãi, co rúm, bất ngờ.<br/><br/>VD: Sợ teo quéo.',
    meaningMain: 'sợ điếng người, hoảng hốt.',
    meaningDesc: 'Sợ đến mức không nói nên lời.',
    examples: ['"Chó sủa cái quéo luôn."', '"Sợ quéo râu."'],
    storyLines: ['Cách nói hình tượng hài hước.', 'Làm giảm nhẹ đi sự sợ hãi.']
  },
  {
    slug: 'que-xe', color: 'yellow', tag: 'Cảm xúc', hashtag: '#quexe', title: 'QUÊ XỆ', subtitle: 'Xấu hổ, ngượng ngùng, bẽ mặt',
    desc: 'Xấu hổ, ngượng ngùng, bẽ mặt.<br/><br/>VD: Làm rớt đồ quê xệ.',
    meaningMain: 'rất xấu hổ.',
    meaningDesc: 'Cảm giác bị hớ trước đám đông.',
    examples: ['"Chào lộn người, quê xệ."', '"Quê xệ mặt luôn."'],
    storyLines: ['Chọc ghẹo nhau là niềm vui.', 'Quê thì chịu thôi.']
  },
  {
    slug: 'suong-ron', color: 'green', tag: 'Cảm xúc', hashtag: '#suongron', title: 'SƯỚNG RƠN', subtitle: 'Vui sướng tột độ, đã đời',
    desc: 'Vui sướng tột độ, đã đời.<br/><br/>VD: Được ăn sướng rơn.',
    meaningMain: 'vui sướng tột đỉnh.',
    meaningDesc: 'Niềm vui lớn được thỏa mãn.',
    examples: ['"Cầm cục tiền sướng rơn."', '"Sướng rơn trong bụng."'],
    storyLines: ['Cảm giác mãn nguyện.', 'Nụ cười thả ga của dân miền Tây.']
  },

  // Sinh hoạt
  {
    slug: 'man', color: 'green', tag: 'Sinh hoạt', hashtag: '#man', title: 'MẦN', subtitle: 'Làm việc, lao động',
    desc: 'Làm việc, lao động.<br/><br/>VD: Đi mần ăn.',
    meaningMain: 'làm.',
    meaningDesc: 'Từ "làm" được phát âm thành "mần" rất mộc mạc.',
    examples: ['"Nay tui đi mần."', '"Mần lụng vất vả."'],
    storyLines: ['Gắn liền với hình ảnh người nông dân.', 'Chăm chỉ chịu thương chịu khó.']
  },
  {
    slug: 'lum', color: 'blue', tag: 'Sinh hoạt', hashtag: '#lum', title: 'LỤM', subtitle: 'Nhặt, lấy, hoàn thành',
    desc: 'Nhặt, lấy, hoàn thành.<br/><br/>VD: Lụm nó luôn.',
    meaningMain: 'nhặt lên, thu phục.',
    meaningDesc: 'Nghĩa gốc là nhặt, nay dùng như lấy hoặc chốt đơn.',
    examples: ['"Rớt kìa, lụm lên."', '"Lụm ngay 5 củ."'],
    storyLines: ['Sự dứt khoát nhanh nhẹn.', 'Đã nhắm là phải lụm.']
  },
  {
    slug: 'nhau', color: 'red', tag: 'Sinh hoạt', hashtag: '#nhau', title: 'NHẬU', subtitle: 'Uống rượu bia, tụ tập',
    desc: 'Uống rượu bia, tụ tập.<br/><br/>VD: Tối nay nhậu không?',
    meaningMain: 'tụ tập ăn uống có cồn.',
    meaningDesc: 'Văn hóa quen thuộc sau giờ làm.',
    examples: ['"Rảnh không đi nhậu."', '"Nhậu nhẹt hoài."'],
    storyLines: ['Không phải để say.', 'Mà để gắn kết anh em.']
  },
  {
    slug: 'quay', color: 'yellow', tag: 'Sinh hoạt', hashtag: '#quay', title: 'QUẬY', subtitle: 'Phá phách, đùa giỡn, chơi vui',
    desc: 'Phá phách, đùa giỡn, chơi vui.<br/><br/>VD: Quậy banh nóc.',
    meaningMain: 'chơi đùa thỏa thích.',
    meaningDesc: 'Làm náo động không khí.',
    examples: ['"Mấy đứa nhỏ quậy quá."', '"Tối nay quậy xả láng."'],
    storyLines: ['Tinh thần vui chơi hết mình.', 'Sống trọn vẹn từng khoảnh khắc.']
  },

  // Ăn uống
  {
    slug: 'ba-chay', color: 'yellow', tag: 'Ăn uống', hashtag: '#bachay', title: 'BÁ CHÁY', subtitle: 'Rất hay, rất chất, rất ngon',
    desc: 'Rất hay, rất chất, rất ngon.<br/><br/>VD: Món này ngon bá cháy.',
    meaningMain: 'ngon tuyệt đỉnh.',
    meaningDesc: 'Khen ngợi đồ ăn xuất sắc.',
    examples: ['"Tô phở ngon bá cháy bọ chét."', '"Chấm nước mắm bá cháy."'],
    storyLines: ['Ẩm thực miền Tây đậm đà.', 'Khen là phải bá cháy.']
  },
  {
    slug: 'da-cai-net', color: 'blue', tag: 'Ăn uống', hashtag: '#dacainet', title: 'ĐÃ CÁI NẾT', subtitle: 'Thỏa mãn cơn thèm',
    desc: 'Thỏa mãn cơn thèm.<br/><br/>VD: Ăn đã cái nết.',
    meaningMain: 'rất vừa ý, thỏa mãn.',
    meaningDesc: 'Ăn được món đúng gu.',
    examples: ['"Ly trà sữa đã cái nết."', '"Ăn no nê đã cái nết."'],
    storyLines: ['Ăn không chỉ để no.', 'Ăn còn để sướng.']
  },
  {
    slug: 'hup', color: 'red', tag: 'Ăn uống', hashtag: '#hup', title: 'HÚP', subtitle: 'Uống nước súp sùm sụp',
    desc: 'Uống nước súp sùm sụp.<br/><br/>VD: Húp hết nước.',
    meaningMain: 'uống cạn nhanh chóng.',
    meaningDesc: 'Thường dùng với các món nước.',
    examples: ['"Húp sùm sụp."', '"Ngon quá húp cạn tô."'],
    storyLines: ['Không cần giữ kẽ.', 'Ăn là phải tự nhiên.']
  },
  {
    slug: 'ghien', color: 'green', tag: 'Ăn uống', hashtag: '#ghien', title: 'GHIỀN', subtitle: 'Nghiện, thèm, thích mê',
    desc: 'Nghiện, thèm, thích mê.<br/><br/>VD: Nhìn là ghiền.',
    meaningMain: 'cực kỳ thích.',
    meaningDesc: 'Thích đến mức muốn ăn mãi.',
    examples: ['"Ăn 1 lần là ghiền."', '"Bị ghiền chè thái."'],
    storyLines: ['Sự hấp dẫn của món ngon.', 'Khó cưỡng lại được.']
  },

  // Giao tiếp
  {
    slug: 'troi-dat-oi', color: 'green', tag: 'Giao tiếp', hashtag: '#troidatoi', title: 'TRỜI ĐẤT ƠI', subtitle: 'Cảm thán, bất ngờ',
    desc: 'Cảm thán, bất ngờ.<br/><br/>VD: Trời đất ơi, sao vậy.',
    meaningMain: 'biểu hiện sự ngạc nhiên.',
    meaningDesc: 'Câu cửa miệng phổ biến nhất.',
    examples: ['"Trời đất ơi, tin được hông?"', '"Chu choa trời đất ơi."'],
    storyLines: ['Câu thốt ra tự nhiên.', 'Thể hiện tính cách bộc trực.']
  },
  {
    slug: 'che', color: 'red', tag: 'Giao tiếp', hashtag: '#che', title: 'CHẾ', subtitle: 'Chị gái, cách gọi thân thương',
    desc: 'Chị gái, cách gọi thân thương.<br/><br/>VD: Chế đi đâu đó.',
    meaningMain: 'cách gọi người chị.',
    meaningDesc: 'Biến âm từ chữ "chị", gốc Hoa.',
    examples: ['"Chế hai mới về."', '"Dạ thưa chế."'],
    storyLines: ['Giao thoa văn hóa.', 'Cách xưng hô gần gũi.']
  },
  {
    slug: 'thay-mo', color: 'blue', tag: 'Giao tiếp', hashtag: '#thaymo', title: 'THẤY MỒ', subtitle: 'Khủng khiếp, quá sức',
    desc: 'Khủng khiếp, quá sức.<br/><br/>VD: Mệt thấy mồ.',
    meaningMain: 'cực kỳ, quá chừng.',
    meaningDesc: 'Từ dùng để nhấn mạnh mức độ cao.',
    examples: ['"Đói thấy mồ nội."', '"Làm mệt thấy mồ."'],
    storyLines: ['Cách nhấn mạnh dân dã.', 'Thường đi kèm lời than vãn.']
  },
  {
    slug: 'ne', color: 'yellow', tag: 'Giao tiếp', hashtag: '#ne', title: 'NÈ', subtitle: 'Từ đệm cuối câu',
    desc: 'Từ đệm cuối câu, tạo sự thân thiện.<br/><br/>VD: Tới đây nè.',
    meaningMain: 'này, đây.',
    meaningDesc: 'Tạo cảm giác nhẹ nhàng, dễ thương cho câu nói.',
    examples: ['"Em ở đây nè."', '"Ăn cơm nè."'],
    storyLines: ['Giọng điệu mềm mỏng.', 'Đặc trưng giao tiếp Nam Bộ.']
  }
];

fs.writeFileSync('d:/My_Project/FPT color up/figma/long_lanh/src/data/words.json', JSON.stringify(data, null, 2));
console.log('Generated fresh distinct words successfully!');
