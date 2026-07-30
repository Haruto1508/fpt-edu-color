import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Dictionary from './pages/Dictionary';
import WordDetail from './pages/WordDetail';
import BehindTheScenes from './pages/BehindTheScenes';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import { visitedPaths } from './utils/animationState';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      visitedPaths.add(location.pathname);
    }, 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kham-pha" element={<Explore />} />
      <Route path="/tu-dien" element={<Dictionary />} />
      <Route path="/tu-vung/:word" element={<WordDetail />} />
      <Route path="/chuyen-phia-sau" element={<BehindTheScenes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--yellow)', margin: 0 }}>
        <div className="neo-border neo-shadow" style={{ padding: '2rem 3rem', backgroundColor: 'var(--white)', fontSize: '2rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '1rem', textTransform: 'uppercase' }}>
          <svg className="spinner" width="40" height="40" viewBox="0 0 50 50" style={{ animation: 'spin 1s linear infinite' }}>
            <circle cx="25" cy="25" r="20" fill="none" stroke="var(--black)" strokeWidth="5" strokeDasharray="31.4 31.4" />
          </svg>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Header />
        <BackToTop />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
