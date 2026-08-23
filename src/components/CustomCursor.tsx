import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export type CursorType = 'default' | 'link' | 'project' | 'drag' | 'button' | 'hidden';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [customText, setCustomText] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device or reduced motion
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (hasTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as CursorType;
        const text = cursorTarget.getAttribute('data-cursor-text') || '';
        setCursorType(type || 'link');
        setCustomText(text);
        return;
      }

      if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorType('button');
        setCustomText('');
      } else {
        setCursorType('default');
        setCustomText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible || cursorType === 'hidden') {
    return null;
  }

  const getCursorDimensions = () => {
    switch (cursorType) {
      case 'project':
        return { width: 72, height: 72, bg: 'rgba(6, 182, 212, 0.95)', text: customText || 'VIEW' };
      case 'drag':
        return { width: 64, height: 64, bg: 'rgba(245, 158, 11, 0.95)', text: customText || 'DRAG' };
      case 'link':
      case 'button':
        return { width: 44, height: 44, bg: 'rgba(6, 182, 212, 0.25)', text: '' };
      case 'default':
      default:
        return { width: 14, height: 14, bg: 'rgba(6, 182, 212, 0.9)', text: '' };
    }
  };

  const { width, height, bg, text } = getCursorDimensions();

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center font-bold text-[10px] tracking-widest text-slate-950 uppercase border border-cyan-400/40 backdrop-blur-xs shadow-[0_0_20px_rgba(6,182,212,0.35)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width,
          height,
          backgroundColor: bg,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {text && <span className="font-extrabold text-[9px] text-slate-950 drop-shadow-xs">{text}</span>}
      </motion.div>
    </div>
  );
};
