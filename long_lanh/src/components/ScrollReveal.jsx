import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { visitedPaths } from '../utils/animationState';

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  yOffset = 16, 
  duration = 0.35, 
  className = "", 
  style = {} 
}) {
  const location = useLocation();
  const isVisited = visitedPaths.has(location.pathname);

  // If page was already visited or refreshed, render directly with zero animation overhead
  if (isVisited) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0.92, y: Math.min(yOffset, 16) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "80px" }}
      transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}
