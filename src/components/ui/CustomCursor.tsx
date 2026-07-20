'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // Only hijack the cursor on real pointing devices — never on touch.
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.style.cursor = 'none';

    // quickTo gives the ring a smooth, velocity-aware lag behind the instant dot.
    const xTo = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.tagName === 'INPUT' ||
        t.tagName === 'TEXTAREA' ||
        !!t.closest('a') ||
        !!t.closest('button') ||
        t.classList.contains('cursor-pointer')
      );
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Each element owns exactly ONE transform channel so they never fight:
  //   ringRef  → GSAP translate (x/y)
  //   scale wrapper → hover scale
  //   inner ring → continuous rotate (spinning dashes)
  return (
    <>
      <div ref={ringRef} className="fixed top-0 left-0 -ml-5 -mt-5 pointer-events-none z-[9999] mix-blend-difference">
        <div className={`transition-transform duration-300 ease-out ${isHovering ? 'scale-[1.6]' : 'scale-100'}`}>
          <div
            className={`w-10 h-10 rounded-full border border-dashed animate-[spin_6s_linear_infinite] transition-colors duration-300 ${
              isHovering ? 'border-white bg-white/15' : 'border-white/70'
            }`}
          />
        </div>
      </div>
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-[3px] -mt-[3px] w-1.5 h-1.5 rounded-full bg-accent-primary pointer-events-none z-[9999] transition-opacity duration-200 ${
          isHovering ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </>
  );
}
