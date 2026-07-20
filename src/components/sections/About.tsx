'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Github, Linkedin } from '@/components/common/Icons';
import ChapterLabel from '@/components/common/ChapterLabel';
import { BIO, CONTACT_LINKS } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ElementType<{ size?: number | string; className?: string }>> = {
  MapPin, Mail, Github, Linkedin, Phone
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-[100vh] py-32 px-6">
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center" ref={contentRef}>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          
          {/* Left Column */}
          <div className="w-full lg:w-[55%]">
            <ChapterLabel number="01" label="ABOUT ME" />
            
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#ffffff] leading-[1.1] max-w-[600px]">
              Building at the intersection of AI and engineering.
            </h2>
            
            <p className="font-body font-medium text-[1rem] text-[#b3b3b3] leading-[1.75] max-w-[540px] mt-8">
              {BIO}
            </p>
            
            <div className="flex flex-col gap-4 mt-12">
              {CONTACT_LINKS.map((link, i) => {
                const Icon = iconMap[link.icon];
                
                if (link.type === 'location') {
                  return (
                    <div key={i} className="flex items-center gap-3 text-[#b3b3b3]">
                      <Icon size={16} className="text-[#ffffff]" />
                      <span className="font-body text-[0.9rem]">{link.text}</span>
                    </div>
                  );
                }
                
                return (
                  <a 
                    key={i} 
                    href={link.href!} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#b3b3b3] hover:text-[#ffffff] transition-colors w-fit"
                  >
                    <Icon size={16} className="text-[#ffffff]" />
                    <span className="font-body text-[0.9rem]">{link.text}</span>
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="hidden lg:flex w-[45%] justify-end items-center relative">
            <div className="w-[1px] h-full bg-[#ffffff]/10 absolute left-0" />
            <span className="font-display font-extrabold text-[clamp(8rem,20vw,18rem)] text-[#ffffff]/[0.04] select-none pointer-events-none leading-none">
              01
            </span>
          </div>
          
        </div>
      </div>
    </section>
  );
}
