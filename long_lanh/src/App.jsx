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
import Game from './pages/Game';
import NotFound from './pages/NotFound';
import Maintenance from './pages/Maintenance';
import ContributeWord from './pages/ContributeWord';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import { markPathVisited } from './utils/animationState';
import { preloadWordImages } from './utils/wordAssets';

import { motion, AnimatePresence } from 'framer-motion';

// Check if maintenance mode is enabled via environment variable
const isMaintenanceConfigured = 
  import.meta.env.VITE_MAINTENANCE_MODE === 'true' || 
  import.meta.env.VITE_MAINTENANCE_MODE === '1';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    markPathVisited(location.pathname);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={location.pathname}
        className="page-transition-wrapper"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/kham-pha" element={<Explore />} />
          <Route path="/tu-dien" element={<Dictionary />} />
          <Route path="/game" element={<Game />} />
          <Route path="/noi-tu" element={<Game />} />
          <Route path="/tu-vung/:word" element={<WordDetail />} />
          <Route path="/chuyen-phia-sau" element={<BehindTheScenes />} />
          <Route path="/gop-tu" element={<ContributeWord />} />
          <Route path="/goc-gop-tu" element={<ContributeWord />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [isPreviewMode, setIsPreviewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('preview') === 'true' || params.get('preview') === '1') {
          sessionStorage.setItem('ll_preview_mode', 'true');
          return true;
        }
        return sessionStorage.getItem('ll_preview_mode') === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    preloadWordImages();
  }, []);

  const handleExitPreview = () => {
    try {
      sessionStorage.removeItem('ll_preview_mode');
    } catch {
      // ignore
    }
    setIsPreviewMode(false);
  };

  const handleEnterPreview = () => {
    try {
      sessionStorage.setItem('ll_preview_mode', 'true');
    } catch {
      // ignore
    }
    setIsPreviewMode(true);
  };

  // If maintenance mode is configured and NOT bypassed by preview mode
  if (isMaintenanceConfigured && !isPreviewMode) {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Maintenance onEnterPreview={handleEnterPreview} />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Floating banner when admin is previewing during maintenance mode */}
      {isMaintenanceConfigured && isPreviewMode && (
        <div className="maintenance-preview-banner">
          <span>👀 Đang bật <strong>Chế độ Xem trước</strong> (Khách bên ngoài vẫn thấy trang bảo trì)</span>
          <button 
            type="button" 
            className="maintenance-preview-exit-btn"
            onClick={handleExitPreview}
          >
            Quay lại trang bảo trì ➔
          </button>
        </div>
      )}
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
