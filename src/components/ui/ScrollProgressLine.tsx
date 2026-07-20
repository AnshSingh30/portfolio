'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollProgressLine() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] z-50 bg-border-subtle overflow-hidden rounded-t-sm">
      <div 
        className="h-full bg-accent-primary transition-all duration-75"
        style={{
          width: `${scrollProgress * 100}%`,
          boxShadow: '0 0 10px rgba(217, 102, 63, 0.8)'
        }}
      />
    </div>
  );
}
