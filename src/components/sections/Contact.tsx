'use client';

import { useRef, useState } from 'react';
import { CONTACT_LINKS } from '@/lib/constants';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API transmission
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setMessage('');
      setSubject('');
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const emailLink = CONTACT_LINKS.find(link => link.icon === 'Mail')?.href || 'mailto:sansh3030@gmail.com';
  const githubLink = CONTACT_LINKS.find(link => link.icon === 'Github')?.href || 'https://github.com/AnshSingh30';
  const linkedinLink = CONTACT_LINKS.find(link => link.icon === 'Linkedin')?.href || 'https://linkedin.com/in/ansh-singh';

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative w-full py-24 flex flex-col justify-between bg-[#0b0908]"
    >
      {/* Cinematic labeling chrome */}
      <div className="absolute top-6 left-6 z-20 font-mono text-[10px] tracking-[0.25em] text-accent-primary uppercase flex items-center gap-3">
        <span>CHAPTER VII</span>
        <span className="text-text-muted">/</span>
        <span className="text-text-secondary">THE GRID</span>
      </div>

      <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-[0.2em] text-text-secondary pointer-events-none">
        07 / THE GRID
      </div>

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 mt-12 px-6">
        
        {/* Left Side: Let's talk & Meta */}
        <div className="flex flex-col items-start justify-center">
          <h2 className="font-display italic text-[4.5rem] sm:text-[6.5rem] leading-none mb-6 text-text-primary">
            Let&apos;s talk.
          </h2>
          <p className="font-body text-text-secondary text-base sm:text-lg mb-12 max-w-md leading-relaxed">
            I read every message and usually reply within 24 hours. Let&apos;s build something intelligent.
          </p>

          <div className="space-y-4 font-mono text-xs w-full max-w-sm">
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-border-subtle">
              <span className="text-text-muted tracking-widest uppercase">EMAIL</span>
              <a href={emailLink} className="col-span-3 text-text-primary hover:text-accent-primary transition-colors truncate">
                sansh3030@gmail.com
              </a>
            </div>
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-border-subtle">
              <span className="text-text-muted tracking-widest uppercase">BASED</span>
              <span className="col-span-3 text-text-secondary">Lucknow, India</span>
            </div>
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-border-subtle">
              <span className="text-text-muted tracking-widest uppercase">ZONE</span>
              <span className="col-span-3 text-text-secondary">IST · GMT+5:30</span>
            </div>
          </div>

          <div className="mt-12 border border-border-subtle rounded p-6 flex items-center gap-4 bg-surface-1/30 max-w-sm">
            <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_#d97a4f]"></div>
            <div>
              <div className="font-mono text-[9px] tracking-widest text-text-primary uppercase mb-1 font-bold">Open to work</div>
              <div className="font-mono text-[8px] tracking-wider text-text-secondary uppercase">Agentic AI · RAG Systems · Distributed APIs</div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:mt-4">
          <form 
            onSubmit={handleSubmit}
            className="border border-border-subtle rounded bg-surface-1/10 flex flex-col h-full overflow-hidden"
          >
            <div className="border-b border-border-subtle p-5 flex flex-col gap-2">
              <label htmlFor="subject" className="font-mono text-[9px] tracking-widest text-text-muted uppercase">SUBJECT</label>
              <input
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Collaboration, role, or request..."
                className="w-full bg-transparent border-none text-text-primary font-body text-base focus:outline-none placeholder:text-text-muted/60"
              />
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <label htmlFor="message" className="font-mono text-[9px] tracking-widest text-text-muted uppercase mb-3">MESSAGE</label>
              <textarea 
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-full min-h-[220px] bg-transparent border border-border-subtle rounded p-4 text-text-primary font-body text-base focus:outline-none focus:border-accent-primary transition-colors resize-none placeholder:text-text-muted/50"
                placeholder="Tell me about the system you want to construct."
              />
              
              {success && (
                <div className="mt-4 font-mono text-[9px] tracking-wider text-accent-primary uppercase animate-fade-in">
                  Transmission dispatched successfully.
                </div>
              )}

              <button 
                type="submit"
                disabled={sending}
                className="mt-6 self-start bg-accent-primary hover:bg-accent-primary/85 text-background px-8 py-3.5 rounded font-mono text-[9px] tracking-widest uppercase transition-colors flex items-center gap-3 font-semibold disabled:opacity-55"
              >
                {sending ? 'DISPATCHING...' : 'Send Transmission'}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1400px] w-full mx-auto mt-28 border-t border-border-subtle pt-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="font-display italic text-lg text-text-primary tracking-wide">Ansh Singh</span>

        <div className="flex items-center gap-8">
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] tracking-[0.2em] text-text-secondary hover:text-accent-primary transition-colors">
            GITHUB
          </a>
          <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] tracking-[0.2em] text-text-secondary hover:text-accent-primary transition-colors">
            LINKEDIN
          </a>
          <a href={emailLink} className="font-mono text-[9px] tracking-[0.2em] text-text-secondary hover:text-accent-primary transition-colors">
            EMAIL
          </a>
        </div>

        <span className="font-mono text-[9px] tracking-widest text-text-muted uppercase">© 2026 Ansh Singh</span>
      </div>
    </section>
  );
}
