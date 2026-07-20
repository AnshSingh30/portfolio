'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'hero', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'skills', label: 'STACK' },
    { id: 'projects', label: 'WORK' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <>
      <header className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
        {/* Left Side Logo */}
        <div className="pointer-events-auto px-6 py-3 rounded-full border border-border-subtle bg-surface-1/40 backdrop-blur-md">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="font-display italic text-lg text-text-primary hover:text-accent-primary transition-colors tracking-widest font-semibold"
          >
            A.S.
          </a>
        </div>

        {/* Right Side Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 px-6 py-3 rounded-full border border-border-subtle bg-surface-1/40 backdrop-blur-md pointer-events-auto">
          <nav className="flex items-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={cn(
                  'font-mono text-[10px] tracking-[0.2em] uppercase transition-colors',
                  activeSection === item.id
                    ? 'text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden flex items-center justify-center p-3 rounded-full border border-border-subtle bg-surface-1/40 backdrop-blur-md text-text-primary pointer-events-auto"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 p-3 rounded-full border border-border-subtle bg-surface-1 text-text-primary"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          <nav className="flex flex-col gap-8 text-center">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={cn(
                  'font-display italic text-4xl transition-colors',
                  activeSection === item.id
                    ? 'text-accent-primary'
                    : 'text-text-primary hover:text-accent-primary'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
