import React, { useEffect, useRef, useContext, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { visitedPaths } from '../utils/animationState';

/**
 * Lightweight scroll animation system using IntersectionObserver + CSS.
 * No JS animation loop. Pure GPU-composited CSS transitions.
 * 
 * Variants:
 *   'fade-up'    : slide up from below (default)
 *   'fade-down'  : slide down from above
 *   'fade-left'  : slide in from left
 *   'fade-right' : slide in from right
 *   'scale'      : scale from slightly smaller
 *   'scale-up'   : scale + slide up
 *   'none'       : fade only
 */

// ─── CSS injected once at module load ────────────────────────────────────────
const ANIMATION_CSS = `
  .sr-hidden {
    opacity: 0;
    will-change: opacity, transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  /* Variants - initial hidden state */
  .sr-fade-up    { transform: translateY(28px); }
  .sr-fade-down  { transform: translateY(-22px); }
  .sr-fade-left  { transform: translateX(-32px); }
  .sr-fade-right { transform: translateX(32px); }
  .sr-scale      { transform: scale(0.9); }
  .sr-scale-up   { transform: scale(0.88) translateY(18px); }
  .sr-none       { transform: none; }

  /* Visible state - animation triggered by adding .sr-visible */
  .sr-visible {
    opacity: 1 !important;
    transform: none !important;
    transition: opacity var(--sr-dur, 0.42s) var(--sr-ease, cubic-bezier(0.22,1,0.36,1)),
                transform var(--sr-dur, 0.42s) var(--sr-ease, cubic-bezier(0.22,1,0.36,1));
    transition-delay: var(--sr-delay, 0s);
  }

  /* Trên điện thoại / màn hình hẹp: không dùng translateX để tránh lệch trang và giật ngang */
  @media (max-width: 768px) {
    .sr-fade-left  { transform: translateY(18px); }
    .sr-fade-right { transform: translateY(18px); }
  }

  /* Reduced motion: skip all animations */
  @media (prefers-reduced-motion: reduce) {
    .sr-hidden { opacity: 1 !important; transform: none !important; }
    .sr-visible { transition: none !important; }
  }
`;

let cssInjected = false;
function injectCSS() {
  if (cssInjected || typeof document === 'undefined') return;
  cssInjected = true;
  const style = document.createElement('style');
  style.textContent = ANIMATION_CSS;
  document.head.appendChild(style);
}
injectCSS();

// ─── Shared IntersectionObserver (one per threshold, not one per element) ────
let sharedObserver = null;
const observedElements = new WeakMap();

function getObserver() {
  if (!sharedObserver && typeof IntersectionObserver !== 'undefined') {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('sr-visible');
            sharedObserver.unobserve(el);
            observedElements.delete(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
  }
  return sharedObserver;
}

// ─── Stagger context ──────────────────────────────────────────────────────────
const StaggerCtx = createContext({ baseDelay: 0, staggerDelay: 0.08, index: 0 });

// ─── ScrollReveal component ───────────────────────────────────────────────────
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.42,
  className = '',
  style = {},
  variant = 'fade-up',
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const location = useLocation();
  const isVisited = visitedPaths.has(location.pathname);

  useEffect(() => {
    if (isVisited) return;
    const el = ref.current;
    if (!el) return;

    el.style.setProperty('--sr-dur', `${duration}s`);
    el.style.setProperty('--sr-delay', `${delay}s`);

    const observer = getObserver();
    if (observer) {
      observer.observe(el);
      return () => observer.unobserve(el);
    } else {
      // Fallback: just show immediately
      el.classList.add('sr-visible');
    }
  }, [isVisited, delay, duration]);

  if (isVisited) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`sr-hidden sr-${variant}${className ? ' ' + className : ''}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

// ─── StaggerContainer ─────────────────────────────────────────────────────────
export function StaggerContainer({
  children,
  className = '',
  style = {},
  staggerDelay = 0.08,
  delayStart = 0,
  as: Tag = 'div',
}) {
  const location = useLocation();
  const isVisited = visitedPaths.has(location.pathname);

  if (isVisited) {
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  return (
    <StaggerCtx.Provider value={{ baseDelay: delayStart, staggerDelay, isVisited }}>
      <Tag className={className} style={style}>
        {React.Children.map(children, (child, index) =>
          child ? React.cloneElement(child, { _staggerIndex: index }) : child
        )}
      </Tag>
    </StaggerCtx.Provider>
  );
}

// ─── StaggerItem ──────────────────────────────────────────────────────────────
export function StaggerItem({
  children,
  className = '',
  style = {},
  variant = 'fade-up',
  duration = 0.42,
  _staggerIndex = 0,
}) {
  const { baseDelay, staggerDelay, isVisited } = useContext(StaggerCtx);
  const delay = baseDelay + _staggerIndex * staggerDelay;

  return (
    <ScrollReveal
      variant={variant}
      delay={delay}
      duration={duration}
      className={className}
      style={style}
    >
      {children}
    </ScrollReveal>
  );
}
