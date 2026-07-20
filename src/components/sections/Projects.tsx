'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: containerRef.current,
      pinType: 'transform',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div
      id="projects"
      ref={sectionRef}
      className="relative w-full h-[400vh] bg-[#0b0908]"
    >
      {/* Sticky container */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Cinematic labeling chrome */}
        <div className="absolute top-6 left-6 z-20 font-mono text-[10px] tracking-[0.25em] text-accent-primary uppercase flex items-center gap-3 pointer-events-none">
          <span>CHAPTER IV</span>
          <span className="text-text-muted">/</span>
          <span className="text-text-secondary">SELECTED WORK</span>
        </div>

        <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-[0.2em] text-text-secondary pointer-events-none">
          04 / SELECTED WORK
        </div>

        <div className="absolute bottom-6 right-6 z-20 font-mono text-[9px] tracking-[0.2em] text-text-muted text-right uppercase pointer-events-none flex items-center gap-2">
          <span>KEEP SCROLLING</span>
          <div className="w-[10px] h-[10px] rounded-full border border-text-muted flex items-center justify-center">
            <div className="w-[2px] h-[2px] bg-accent-primary rounded-full animate-ping" />
          </div>
        </div>

        {/* Horizontal slider track */}
        <div
          ref={trackRef}
          className="flex h-full w-fit transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(-${scrollProgress * 75}%, 0, 0)`,
          }}
        >
        {PROJECTS.map((project, idx) => {
          const totalSlides = PROJECTS.length;
          const slideNumber = String(idx + 1).padStart(2, '0');

          // Different abstract background style for each project slide
          const bgGridStyles = [
            'radial-gradient(circle, rgba(217,122,79,0.06) 1px, transparent 1px)',
            'linear-gradient(rgba(184,50,50,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,50,50,0.04) 1px, transparent 1px)',
            'radial-gradient(circle, rgba(139,129,117,0.08) 1.5px, transparent 1.5px)',
            'linear-gradient(rgba(217,122,79,0.03) 2px, transparent 2px)'
          ];

          return (
            <div
              key={project.id}
              className="w-screen h-screen flex flex-col justify-center relative p-8 sm:p-16 lg:p-24 overflow-hidden border-r border-[#f3eee3]/5 bg-[#0b0908] flex-shrink-0"
            >
              {/* Abstract pattern panel behind slide */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: bgGridStyles[idx % bgGridStyles.length],
                  backgroundSize: '24px 24px',
                  maskImage: 'radial-gradient(circle at 60% 50%, black 20%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(circle at 60% 50%, black 20%, transparent 70%)'
                }}
              />

              {/* Huge watermark index numeral */}
              <div className="absolute right-12 lg:right-24 bottom-16 lg:bottom-12 font-display text-[15rem] lg:text-[24rem] text-[#f3eee3]/[0.02] leading-none select-none pointer-events-none font-bold">
                {slideNumber}
              </div>

              <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
                {/* Text Content */}
                <div className="lg:col-span-8 flex flex-col items-start text-left">

                  {/* Eyebrow index + Badge */}
                  <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.25em] text-text-secondary mb-4 uppercase">
                    <span>FRAME {slideNumber}</span>
                    <span className="text-[#f3eee3]/20">·</span>
                    <span className="text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-sm">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-body font-bold text-3xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="font-display italic text-lg sm:text-xl text-accent-primary mb-6">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="font-body text-text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-8 max-w-xl">
                    {project.tech_tags.map((tag, j) => (
                      <span
                        key={j}
                        className="font-mono text-[9px] tracking-wider text-text-secondary border border-[#f3eee3]/10 px-3 py-1 rounded-full bg-surface-1/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Button Group */}
                  <div className="flex items-center gap-6 mt-4">
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent-primary hover:bg-accent-primary/85 text-background px-6 py-3 rounded font-mono text-[9px] tracking-widest uppercase transition-colors duration-300 font-semibold flex items-center gap-2"
                    >
                      GITHUB SOURCE
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </a>
                  </div>
                </div>

                {/* Stat Display Box */}
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <div className="border border-border-subtle p-8 bg-surface-1/10 rounded-sm backdrop-blur-sm max-w-xs w-full">
                    <div className="font-mono text-[8px] tracking-[0.2em] text-text-muted mb-4 uppercase">
                      PERFORMANCE METRIC
                    </div>

                    <div className="font-display font-bold text-5xl text-accent-primary mb-2">
                      {project.highlight_stat.value}
                    </div>

                    <div className="font-mono text-[9px] tracking-wider text-text-secondary uppercase leading-relaxed">
                      {project.highlight_stat.label}
                    </div>

                    <div className="mt-8 pt-4 border-t border-border-subtle flex justify-between font-mono text-[8px] tracking-wider text-text-muted">
                      <span>PAGINATION</span>
                      <span className="text-text-primary">{slideNumber} / {String(totalSlides).padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
