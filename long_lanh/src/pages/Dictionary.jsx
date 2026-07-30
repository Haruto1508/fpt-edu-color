import React, { useState } from 'react';
import WordCard from '../components/WordCard';
import ScrollReveal from '../components/ScrollReveal';
import wordsData from '../data/words.json';

export default function Dictionary() {
  const [collapsedCategories, setCollapsedCategories] = useState({});

  // Group words by tag
  const groupedWords = wordsData.reduce((acc, word) => {
    if (!acc[word.tag]) {
      acc[word.tag] = [];
    }
    acc[word.tag].push(word);
    return acc;
  }, {});

  const categories = Object.keys(groupedWords);

  const toggleCategory = (category) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="page-content">
      {/* Hero Section */}
      <ScrollReveal className="explore-hero">
        <h1 className="explore-title" style={{ marginTop: '2rem' }}>
          <span className="title-blue">TỪ ĐIỂN</span><br/>
          <span className="title-red">THEO CHỦ ĐỀ</span>
        </h1>
        <p className="explore-subtitle" style={{ marginTop: '1rem' }}>Tổng hợp tất cả tiếng lóng phân theo từng nhóm</p>
      </ScrollReveal>

      {/* Dictionary Categories */}
      <div style={{ paddingBottom: '6rem' }}>
        {categories.map((category, index) => (
          <ScrollReveal key={index} delay={0.1} className="neo-border-top" style={{ paddingTop: '3rem', paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '7rem' }}>
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', cursor: 'pointer' }}
              onClick={() => toggleCategory(category)}
            >
              <h2 className="text-blue" style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
                Chủ đề: {category}
              </h2>
              <button 
                className="neo-border neo-shadow-hover" 
                style={{ backgroundColor: 'var(--yellow)', padding: '0.4rem 1rem', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title={collapsedCategories[category] ? "Mở rộng" : "Thu gọn"}
              >
                {collapsedCategories[category] ? '+' : '−'}
              </button>
            </div>
            
            {!collapsedCategories[category] && (
              <div className="cards-grid dict-grid">
                {groupedWords[category].map((word, idx) => (
                  <WordCard 
                    key={idx} 
                    slug={word.slug}
                    color={word.color} 
                    tag={word.tag} 
                    hashtag={word.hashtag} 
                    title={word.title} 
                    desc={word.desc} 
                  />
                ))}
              </div>
            )}
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
