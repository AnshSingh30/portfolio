'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Keep the latest callback without re-running (and restarting) the loader effect.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onCompleteRef.current(), 600); // Wait for exit animation
        }, 100);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0b0908] flex flex-col items-center justify-center"
        >
          {/* Custom Glow Filters */}
          <svg className="hidden">
            <defs>
              <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Top Row: 3 Minimalist Glowing Glyphs */}
          <div className="flex items-center gap-10 mb-12">
            {/* Glyph 1: Sideways/Open Circle */}
            <svg width="45" height="45" viewBox="0 0 100 100" className="opacity-80">
              <path 
                d="M 32 72 A 22 22 0 1 1 68 72" 
                fill="none" 
                stroke="#2c2420" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
              />
              <circle 
                cx="50" 
                cy="28" 
                r="3.5" 
                fill="#d97a4f" 
                filter="url(#orange-glow)" 
              />
            </svg>

            {/* Glyph 2: Broken/Open Delta Triangle */}
            <svg width="45" height="45" viewBox="0 0 100 100" className="opacity-80">
              <path 
                d="M 50 28 L 28 72 L 72 72 L 60 48" 
                fill="none" 
                stroke="#2c2420" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <circle 
                cx="53" 
                cy="35" 
                r="3.5" 
                fill="#d97a4f" 
                filter="url(#orange-glow)" 
              />
            </svg>

            {/* Glyph 3: Open Gate/Staple */}
            <svg width="45" height="45" viewBox="0 0 100 100" className="opacity-80">
              <path 
                d="M 28 72 L 28 28 L 72 28 L 72 72" 
                fill="none" 
                stroke="#2c2420" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <circle 
                cx="50" 
                cy="28" 
                r="3.5" 
                fill="#d97a4f" 
                filter="url(#orange-glow)" 
              />
            </svg>
          </div>

          {/* Middle Row: Progress line & Center Circle */}
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-10 flex items-center justify-center mb-8">
            {/* Background inactive line */}
            <div className="absolute left-0 right-0 h-[1px] bg-[#2c2420]" />
            
            {/* Active orange progress line */}
            <div 
              className="absolute left-0 h-[1.5px] bg-accent-primary transition-all duration-75"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 8px rgba(217, 122, 79, 0.4)'
              }}
            />
            
            {/* Hollow white center circle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#f3eee3]/45 bg-[#0b0908]" />
          </div>

          {/* Booting Label */}
          <span className="font-mono text-[#8b8175] text-[9px] sm:text-[10px] tracking-[0.35em] uppercase mb-16 select-none">
            BOOTING WORKSPACE...
          </span>

          {/* Percentage display */}
          <div className="flex items-center gap-2.5 font-mono text-accent-primary text-[10px] sm:text-[11px] tracking-[0.25em] select-none">
            <span 
              className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" 
              style={{ filter: 'drop-shadow(0 0 4px #d97a4f)' }}
            />
            <span>{String(progress).padStart(3, '0')}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
