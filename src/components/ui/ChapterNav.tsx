'use client';

import { useActiveSection } from '@/hooks/useActiveSection';
import { NAV_SECTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ChapterNav() {
  const activeSection = useActiveSection();

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1">
      {NAV_SECTIONS.map((section, index) => {
        const isActive = activeSection === section.id;
        const isLast = index === NAV_SECTIONS.length - 1;

        // Custom short names for tooltip readability
        const shortLabels: Record<string, string> = {
          hero: '01 / WHO AM I',
          dolly: '02 / WHAT I BUILD',
          skills: '03 / THE TOOLKIT',
          projects: '04 / SELECTED WORK',
          experience: '05 / FIELD NOTES',
          education: '06 / GROUND TRUTH',
          contact: '07 / THE GRID',
        };

        return (
          <div key={section.id} className="relative flex flex-col items-center group">
            <a
              href={`#${section.id}`}
              onClick={(e) => scrollToSection(e, section.id)}
              className="relative flex items-center justify-center p-2"
              aria-label={`Scroll to ${section.label}`}
            >
              <div
                className={cn(
                  'w-[6px] h-[6px] rounded-full transition-all duration-300',
                  isActive 
                    ? 'bg-accent-primary shadow-[0_0_8px_#d97a4f] scale-125' 
                    : 'bg-[#f3eee3]/30 group-hover:bg-[#f3eee3]/70'
                )}
              />
              
              {/* Tooltip Label */}
              <span className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-[#f3eee3] pointer-events-none bg-surface-1/85 px-3 py-1.5 rounded border border-border-subtle backdrop-blur-sm">
                {shortLabels[section.id] || section.label.toUpperCase()}
              </span>
            </a>
            
            {/* Connector Line */}
            {!isLast && (
              <div className={cn(
                "w-[1px] h-4 transition-colors duration-300",
                isActive ? "bg-accent-primary/40" : "bg-[#f3eee3]/10"
              )} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
