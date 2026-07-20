'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '@/lib/constants';
import { SKILL_ICONS } from '@/lib/skillIcons';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// A bento-style card per skill domain. The AI & LLM domain has the most tools, so it
// gets a double-width tile — the varied tile sizes are what give the grid its bento feel
// while every row still fills cleanly on a 3-column layout.
const CARD_SPAN: Record<string, string> = {
  'Agentic AI & LLMs': 'lg:col-span-2',
};

// A single skill: real brand logo in its brand color (or a themed stand-in), plus name.
function SkillChip({ name }: { name: string }) {
  const entry = SKILL_ICONS[name];
  const Icon = entry?.Icon;
  const color = entry?.color ?? '#8b8175';

  return (
    <span className="group/chip flex items-center gap-1.5 border border-[#f3eee3]/10 rounded-md px-2.5 py-1.5 bg-[#0b0908]/40 hover:border-accent-primary/40 hover:bg-surface-1/40 transition-colors duration-200">
      {Icon ? (
        <Icon size={14} color={color} />
      ) : (
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      )}
      <span className="font-mono text-[10px] tracking-wide text-text-secondary group-hover/chip:text-text-primary transition-colors">
        {name}
      </span>
    </span>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const totalSkills = SKILLS.reduce((sum, c) => sum + c.items.length, 0);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-32 px-6 bg-[#0b0908] border-b border-border-subtle"
    >
      {/* Cinematic labeling chrome */}
      <div className="absolute top-6 left-6 z-20 font-mono text-[10px] tracking-[0.25em] text-accent-primary uppercase flex items-center gap-3">
        <span>CHAPTER III</span>
        <span className="text-text-muted">/</span>
        <span className="text-text-secondary">THE TOOLKIT</span>
      </div>

      <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-[0.2em] text-text-secondary">
        03 / THE TOOLKIT
      </div>

      <div className="max-w-6xl mx-auto mt-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <h2 className="font-body font-bold text-4xl sm:text-5xl text-text-primary">
            <span className="font-display italic font-light block mb-2 text-text-secondary">What I work with.</span>
            THE TOOLKIT
          </h2>
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="font-display italic text-[2.5rem] text-accent-primary leading-none">{totalSkills}</span>
              <span className="font-mono text-[8px] tracking-widest text-text-muted uppercase mt-1">Total Tools</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display italic text-[2.5rem] text-accent-primary leading-none">{SKILLS.length}</span>
              <span className="font-mono text-[8px] tracking-widest text-text-muted uppercase mt-1">Domains</span>
            </div>
          </div>
        </div>

        {/* Bento grid of skill domains */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {SKILLS.map((cat) => (
            <div
              key={cat.category}
              className={cn(
                'group border border-border-subtle rounded-lg p-6 bg-surface-1/20 backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/30 hover:bg-surface-1/40 flex flex-col',
                CARD_SPAN[cat.category] ?? ''
              )}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_#d97a4f] group-hover:scale-125 transition-transform" />
                  <h3 className="font-mono text-[10px] tracking-[0.2em] text-accent-primary uppercase font-bold">
                    {cat.category}
                  </h3>
                </div>
                <span className="font-mono text-[9px] tracking-wider text-text-muted tabular-nums">
                  {String(cat.items.length).padStart(2, '0')}
                </span>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <SkillChip key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
