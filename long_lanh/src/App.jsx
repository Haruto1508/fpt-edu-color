import React, { useEffect } from 'react';
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
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import { visitedPaths } from './utils/animationState';
import { preloadWordImages } from './utils/wordAssets';

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
      <Route path="/game" element={<Game />} />
      <Route path="/noi-tu" element={<Game />} />
      <Route path="/tu-vung/:word" element={<WordDetail />} />
      <Route path="/chuyen-phia-sau" element={<BehindTheScenes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    preloadWordImages();
  }, []);

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
