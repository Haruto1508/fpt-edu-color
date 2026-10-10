import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { visitedPaths } from '../utils/animationState';

export default function ScrollReveal({ children, delay = 0, yOffset = 30, duration = 0.45, className = "", style = {} }) {
  const location = useLocation();
  const initial = visitedPaths.has(location.pathname) ? false : { opacity: 0, y: yOffset };
  
  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
