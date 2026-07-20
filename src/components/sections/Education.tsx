'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EDUCATION, PATENTS } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = containerRef.current.children;

    const ctx = gsap.context(() => {
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const primaryEdu = EDUCATION.filter(e => e.prominence === 'primary');
  const secondaryEdu = EDUCATION.filter(e => e.prominence === 'secondary');

  return (
    <section 
      id="education" 
      ref={sectionRef} 
      className="relative w-full py-32 px-6 bg-[#0b0908] border-b border-border-subtle"
    >
      {/* Cinematic labeling chrome */}
      <div className="absolute top-6 left-6 z-20 font-mono text-[10px] tracking-[0.25em] text-accent-primary uppercase flex items-center gap-3">
        <span>CHAPTER VI</span>
        <span className="text-text-muted">/</span>
        <span className="text-text-secondary">GROUND TRUTH</span>
      </div>

      <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-[0.2em] text-text-secondary">
        06 / GROUND TRUTH
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="font-body font-bold text-4xl sm:text-5xl text-text-primary mb-16">
          <span className="font-display italic font-light block mb-2 text-text-secondary">Where I verified.</span>
          PATENTS & EDUCATION
        </h2>

        <div ref={containerRef} className="flex flex-col gap-8">
          {/* Patents Card — leads the section; filed IP is a stronger, rarer signal
              than coursework, so it gets first position and the most visual weight. */}
          {PATENTS.map((pat, i) => (
            <div
              key={`pat-${i}`}
              className="relative border border-accent-primary/35 p-7 sm:p-10 bg-gradient-to-br from-accent-primary/[0.07] to-transparent rounded backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/60 shadow-[0_0_30px_rgba(217,122,79,0.08)]"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
                    <path d="M12 2a4 4 0 0 0-4 4v3a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
                    <path d="M9 18v3M15 18v3M8 14h8" />
                    <path d="M6 9H4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2" />
                  </svg>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-accent-primary uppercase font-bold">
                    Intellectual Property
                  </span>
                </div>
                <span className="bg-accent-primary/10 border border-accent-primary text-accent-primary px-3 py-1 rounded text-[8px] tracking-widest uppercase font-mono font-bold animate-pulse">
                  Pending
                </span>
              </div>

              <h3 className="font-body font-bold text-2xl sm:text-3xl text-text-primary mb-3">
                {pat.title}
              </h3>

              <p className="font-body text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl">
                {pat.description}
              </p>
            </div>
          ))}

          {/* Primary Education Card */}
          {primaryEdu.map((edu, i) => (
            <div 
              key={`primary-${i}`} 
              className="border border-border-subtle p-6 sm:p-10 bg-surface-1/30 rounded backdrop-blur-sm transition-all duration-300 hover:border-[#f3eee3]/15"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
                <div>
                  <h3 className="font-body font-bold text-xl sm:text-2xl text-text-primary">
                    {edu.degree}
                  </h3>
                  <div className="font-mono text-[10px] tracking-[0.15em] text-accent-primary uppercase mt-1">
                    {edu.institution}
                  </div>
                </div>
                <div className="flex flex-col text-left lg:text-right font-mono text-[9px] text-text-secondary uppercase tracking-wider gap-1">
                  <span>{edu.period}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
              
              {edu.note && (
                <div className="border-l-2 border-accent-primary pl-4 font-display italic text-text-secondary text-base">
                  &quot;{edu.note}&quot;
                </div>
              )}
            </div>
          ))}
          
          {/* Secondary Schooling Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryEdu.map((edu, i) => (
              <div 
                key={`secondary-${i}`} 
                className="border border-border-subtle p-6 bg-surface-1/20 rounded backdrop-blur-sm transition-all duration-300 hover:border-[#f3eee3]/10"
              >
                <h3 className="font-body font-bold text-base text-text-primary leading-tight">
                  {edu.degree}
                </h3>
                <div className="font-mono text-[9px] tracking-[0.15em] text-accent-primary uppercase mt-1 mb-6">
                  {edu.institution}
                </div>
                
                <div className="flex items-end justify-between gap-4 mt-auto">
                  <div className="flex flex-col font-mono text-[9px] text-text-secondary uppercase tracking-wider gap-1">
                    <span>{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                  
                  {edu.grade && (
                    <div className="bg-surface-2 border border-border-subtle px-3 py-1 rounded text-[#f3eee3] font-mono font-semibold text-[10px]">
                      {edu.grade}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
