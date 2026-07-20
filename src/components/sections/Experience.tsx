'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.exp-card');

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 30 },
          {
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="relative w-full py-32 px-6 bg-[#0b0908] border-b border-border-subtle"
    >
      {/* Cinematic labeling chrome */}
      <div className="absolute top-6 left-6 z-20 font-mono text-[10px] tracking-[0.25em] text-accent-primary uppercase flex items-center gap-3">
        <span>CHAPTER V</span>
        <span className="text-text-muted">/</span>
        <span className="text-text-secondary">THE FIELD NOTES</span>
      </div>

      <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-[0.2em] text-text-secondary">
        05 / FIELD NOTES
      </div>

      <div className="max-w-4xl mx-auto mt-8" ref={containerRef}>
        <h2 className="font-body font-bold text-4xl sm:text-5xl text-text-primary mb-16">
          <span className="font-display italic font-light block mb-2 text-text-secondary">Where I&apos;ve deployed.</span>
          WORK TIMELINE
        </h2>
        
        <div className="relative border-l border-border-subtle pl-6 sm:pl-10 flex flex-col gap-16">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="relative exp-card">
              {/* Timeline Connector Dot */}
              <div className="absolute -left-[30px] sm:-left-[46px] top-2.5 w-[9px] h-[9px] rounded-full bg-accent-primary shadow-[0_0_8px_#d97a4f] border border-background scale-110 z-10 animate-pulse" />
              
              {/* Card container with deep espresso background */}
              <div className="border border-border-subtle p-6 sm:p-8 bg-surface-1/30 rounded backdrop-blur-sm transition-all duration-300 hover:border-[#f3eee3]/15">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h3 className="font-body font-bold text-xl text-text-primary leading-snug">
                      {exp.role}
                    </h3>
                    <div className="font-mono text-[10px] tracking-[0.15em] text-accent-primary uppercase mt-1">
                      {exp.company}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end text-left md:text-right font-mono text-[9px] text-text-secondary uppercase tracking-wider gap-1">
                    <span>{exp.period}</span>
                    <span>{exp.location}</span>
                    <span className="bg-surface-2 border border-border-subtle px-2 py-0.5 rounded text-[8px] tracking-widest text-[#f3eee3]/70 w-fit mt-1">{exp.type}</span>
                  </div>
                </div>
                
                {/* Impact Stats Row */}
                {exp.impact_stats && (
                  <div className="relative mb-8 p-6 border-y border-border-subtle bg-[#120c0a]/40 rounded-sm flex flex-col sm:flex-row items-center justify-around gap-6">
                    {exp.impact_stats.map((stat, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <span className="font-display italic text-[2.2rem] text-accent-primary leading-none">
                          {stat.value}{stat.unit}
                        </span>
                        <span className="font-mono text-[8px] tracking-wider text-text-secondary uppercase max-w-[120px]">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Bullets */}
                <ul className="flex flex-col gap-3">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="relative pl-5 font-body text-text-secondary text-sm leading-relaxed">
                      <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 bg-accent-primary/55 rounded-full" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
