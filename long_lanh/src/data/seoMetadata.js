/**
 * Centralized SEO Metadata configuration for Lóng Lánh
 * Optimized for Google Knowledge Graph, Featured Snippets, and Top Search Rankings
 */

export const BASE_URL = 'https://www.tienglongmientay.com';
export const SITE_NAME = 'Lóng Lánh - Tiếng Lóng Miền Tây';
export const DEFAULT_OG_IMAGE = 'https://www.tienglongmientay.com/logo.jpeg';

export const primaryKeywords = [
  'tiếng lóng miền tây',
  'tieng long mien tay',
  'lóng lánh',
  'long lanh',
  'từ điển tiếng lóng',
  'khẩu ngữ nam bộ',
  'phương ngữ miền tây',
  'tiếng miền tây'
];

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/#faq`,
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Tiếng lóng miền Tây là gì?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Tiếng lóng miền Tây là hệ thống khẩu ngữ, phương ngữ dân dã và sinh động được người dân Nam Bộ sáng tạo và sử dụng thường ngày, tiêu biểu như Chà Bá, Bá Cháy, Bảnh Tỏn, Xí Xọn, Chàng Hảng, Túm Húm...'
      }
    },
    {
      '@type': 'Question',
      'name': 'Website Lóng Lánh tra cứu từ điển như thế nào?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Website Lóng Lánh (tienglongmientay.com) cho phép tra cứu miễn phí kho từ điển tiếng lóng miền Tây với audio thu âm phát âm chuẩn bản địa, giải nghĩa ngữ cảnh, hình ảnh minh họa Neobrutalism và trò chơi nối từ.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Từ Chà Bá có nghĩa là gì?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Chà Bá là cách nói cường điệu của người miền Tây để chỉ kích thước rất to lớn, khổng lồ (ví dụ: ổ bánh mì chà bá, con cá chà bá).'
      }
    },
    {
      '@type': 'Question',
      'name': 'Từ Bá Cháy có nghĩa là gì?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Bá Cháy (hay bá cháy bọ chét) là câu khen ngợi quen thuộc chỉ sự tuyệt vời, cực ngon, đỉnh cao không chê vào đâu được (ví dụ: món này ngon bá cháy).'
      }
    },
    {
      '@type': 'Question',
      'name': 'Từ Bảnh Tỏn có nghĩa là gì?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Bảnh Tỏn là từ khen ngợi người ăn mặc đẹp đẽ, lịch sự, chải chuốt và phong độ hơn ngày thường một cách dí dỏm, thân mật.'
      }
    }
  ]
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      'name': 'Lóng Lánh',
      'alternateName': [
        'Tiếng Lóng Miền Tây',
        'tieng long mien tay',
        'Lóng Lánh - Tiếng Lóng Miền Tây'
      ],
      'url': `${BASE_URL}/`,
      'description': 'Dự án văn hóa số tra cứu từ điển tiếng lóng miền Tây Nam Bộ qua audio phát âm thực tế và hình ảnh sinh động.',
      'inLanguage': 'vi-VN',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/kham-pha?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${BASE_URL}/#organization`,
      'name': 'Lóng Lánh - Tiếng Lóng Miền Tây',
      'url': `${BASE_URL}/`,
      'logo': {
        '@type': 'ImageObject',
        'url': DEFAULT_OG_IMAGE,
        'width': 1200,
        'height': 630
      },
      'description': 'Dự án văn hóa số gìn giữ và lan tỏa tiếng lóng, khẩu ngữ Nam Bộ.',
      'slogan': 'Giữ chữ, giữ hồn quê'
    },
    faqSchema
  ]
};

export const pageMetaMap = {
  '/': {
    title: 'Lóng Lánh - Tiếng Lóng Miền Tây | Tra cứu khẩu ngữ Nam Bộ',
    description: 'Lóng Lánh - Website tra cứu từ điển tiếng lóng miền Tây, khẩu ngữ Nam Bộ mộc mạc, dí dỏm. Khám phá nét đẹp văn hóa sông nước qua audio phát âm thực tế và hình ảnh sinh động.',
    canonicalPath: '/',
    ogImage: DEFAULT_OG_IMAGE,
    schema: websiteSchema
  },
  '/kham-pha': {
    title: 'Khám Phá Tiếng Lóng Miền Tây | Lóng Lánh',
    description: 'Khám phá và tra cứu kho tàng tiếng lóng miền Tây Nam Bộ theo các chủ đề đời sống, con người, cảm xúc, tính cách với phát âm thực tế và hình ảnh sinh động.',
    canonicalPath: '/kham-pha',
    ogImage: DEFAULT_OG_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': `${BASE_URL}/` },
        { '@type': 'ListItem', 'position': 2, 'name': 'Khám phá', 'item': `${BASE_URL}/kham-pha` }
      ]
    }
  },
  '/tu-dien': {
    title: 'Từ Điển Tiếng Lóng Theo Chủ Đề | Lóng Lánh',
    description: 'Tổng hợp từ điển tiếng lóng miền Tây Nam Bộ phân loại theo chủ đề: Đời sống, Con người, Cảm xúc, Hành động... dễ dàng tra cứu và ghi nhớ.',
    canonicalPath: '/tu-dien',
    ogImage: DEFAULT_OG_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': `${BASE_URL}/` },
        { '@type': 'ListItem', 'position': 2, 'name': 'Từ điển', 'item': `${BASE_URL}/tu-dien` }
      ]
    }
  },
  '/game': {
    title: 'Thử Thách Nối Từ Miền Tây - Game Lóng Lánh',
    description: 'Thử tài đoán và nối từ tiếng lóng miền Tây cực vui và hấp dẫn. Xem bạn hiểu khẩu ngữ Nam Bộ đến mức nào cùng Lóng Lánh!',
    canonicalPath: '/game',
    ogImage: DEFAULT_OG_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Game Nối Từ Miền Tây - Lóng Lánh',
      'applicationCategory': 'GameApplication',
      'browserRequirements': 'Requires JavaScript',
      'operatingSystem': 'All'
    }
  },
  '/chuyen-phia-sau': {
    title: 'Chuyện Phía Sau Dự Án | Lóng Lánh - Tiếng Lóng Miền Tây',
    description: 'Tìm hiểu câu chuyện, hành trình phát triển và sứ mệnh "Giữ chữ, giữ hồn quê" của dự án văn hóa số Lóng Lánh - Tiếng Lóng Miền Tây.',
    canonicalPath: '/chuyen-phia-sau',
    ogImage: DEFAULT_OG_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'Chuyện Phía Sau Dự Án Lóng Lánh',
      'url': `${BASE_URL}/chuyen-phia-sau`
    }
  },
  '/gop-tu': {
    title: 'Góc Góp Từ | Lóng Lánh - Đóng Góp Tiếng Lóng Miền Tây',
    description: 'Cùng chung tay đóng góp và làm phong phú thêm kho tàng tiếng lóng miền Tây Nam Bộ tại Góc Góp Từ của dự án Lóng Lánh.',
    canonicalPath: '/gop-tu',
    ogImage: DEFAULT_OG_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Góc Góp Từ - Lóng Lánh',
      'url': `${BASE_URL}/gop-tu`
    }
  },
  '/goc-gop-tu': {
    title: 'Góc Góp Từ | Lóng Lánh - Đóng Góp Tiếng Lóng Miền Tây',
    description: 'Cùng chung tay đóng góp và làm phong phú thêm kho tàng tiếng lóng miền Tây Nam Bộ tại Góc Góp Từ của dự án Lóng Lánh.',
    canonicalPath: '/gop-tu',
    ogImage: DEFAULT_OG_IMAGE
  }
};

/**
 * Tạo SEO metadata và Schema chi tiết cho từng từ vựng
 */
export function getWordSEO(wordData, wordImgSrc) {
  if (!wordData) {
    return {
      title: 'Không tìm thấy từ | Lóng Lánh',
      description: 'Từ lóng này chưa có trong kho tàng từ điển Lóng Lánh.',
      canonicalPath: '/kham-pha',
      ogImage: DEFAULT_OG_IMAGE
    };
  }

  const title = `${wordData.title} là gì? Ý nghĩa từ điển tiếng lóng miền Tây | Lóng Lánh`;
  const description = `Giải nghĩa từ lóng "${wordData.title}": ${wordData.meaningMain} ${wordData.subtitle}. Nghe audio phát âm giọng miền Tây chuẩn và ví dụ minh họa dí dỏm.`;
  const canonicalPath = `/tu-vung/${wordData.slug}`;
  const ogImage = wordImgSrc || DEFAULT_OG_IMAGE;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTerm',
        '@id': `${BASE_URL}${canonicalPath}#term`,
        'name': wordData.title,
        'description': `${wordData.meaningMain} - ${wordData.subtitle}`,
        'inDefinedTermSet': {
          '@type': 'DefinedTermSet',
          'name': 'Lóng Lánh - Từ Điển Tiếng Lóng Miền Tây',
          'url': `${BASE_URL}/tu-dien`
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': `${BASE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Từ điển', 'item': `${BASE_URL}/tu-dien` },
          { '@type': 'ListItem', 'position': 3, 'name': wordData.title, 'item': `${BASE_URL}${canonicalPath}` }
        ]
      }
    ]
  };

  return {
    title,
    description,
    canonicalPath,
    ogImage,
    schema
  };
}
