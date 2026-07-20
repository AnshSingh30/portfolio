'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from '@/components/ui/Navbar';
import ChapterNav from '@/components/ui/ChapterNav';
import ScrollProgressLine from '@/components/ui/ScrollProgressLine';

import Hero from '@/components/sections/Hero';
import Dolly from '@/components/sections/Dolly';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

import CustomCursor from '@/components/ui/CustomCursor';
import AskAboutAnsh from '@/components/ui/AskAboutAnsh';
import { useActiveSection } from '@/hooks/useActiveSection';

const Preloader = dynamic(() => import('@/components/ui/Preloader'), { ssr: false });

export default function Home() {
  const [, setReady] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep ScrollTrigger in lockstep with Lenis' smoothed scroll position.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so pinning + smooth scroll share one clock.
    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    document.fonts.ready.then(() => { ScrollTrigger.refresh(); });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  // Map active section ID to cinematic shorthand progress label
  const progressLabels: Record<string, string> = {
    hero: '01 / WHO AM I',
    dolly: '02 / WHAT I BUILD',
    skills: '03 / THE TOOLKIT',
    projects: '04 / SELECTED WORK',
    experience: '05 / FIELD NOTES',
    education: '06 / GROUND TRUTH',
    contact: '07 / THE GRID',
  };

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={() => setReady(true)} />

      {/* Cinematic film-grain overlay across the whole app */}
      <div className="film-grain" aria-hidden="true" />

      {/* Main bordered application container */}
      <div className="w-full min-h-screen bg-background relative selection:bg-accent-primary/30 p-2 sm:p-4 lg:p-6 overflow-hidden">
        
        {/* Glow orbs in background */}
        <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-primary opacity-5 blur-[150px] pointer-events-none" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent-primary opacity-[0.03] blur-[120px] pointer-events-none" />

        <div className="relative w-full h-full max-w-[1920px] mx-auto border border-border-subtle rounded-sm bg-background/50 backdrop-blur-3xl overflow-hidden z-10 flex flex-col">
          
          <ScrollProgressLine />
          <Navbar />
          <ChapterNav />
          
          <main className="w-full z-10">
            <Hero />
            <Dolly />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </main>

          {/* Dynamic Bottom-Left Shorthand Progress Label */}
          <div className="fixed bottom-6 left-6 z-40 hidden sm:flex font-mono text-[9px] tracking-[0.25em] text-text-secondary uppercase select-none pointer-events-none">
            {progressLabels[activeSection] || '01 / WHO AM I'}
          </div>
          
          {/* "Ask about Ansh" fixed bottom-right chat trigger */}
          <button 
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-accent-primary text-background font-mono text-[10px] tracking-widest uppercase px-6 py-3 rounded hover:bg-accent-primary/85 transition-all duration-300 shadow-[0_0_15px_rgba(217,122,79,0.35)] flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            Ask about Ansh
          </button>

          {/* Interactive Chatbot Drawer */}
          <AskAboutAnsh isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        </div>
      </div>
    </>
  );
}
