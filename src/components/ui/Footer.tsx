import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/common/Icons';

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000]/95 border-t border-[#ffffff]/10 py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-[0.65rem] text-[#6e6e6e]">
          Ansh Singh · Built with Next.js & Three.js · 2025
        </div>
        
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/AnshSingh30"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6e6e6e] hover:text-[#ffffff] transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/ansh-singh-36a459317"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6e6e6e] hover:text-[#ffffff] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:sansh3030@gmail.com"
            className="text-[#6e6e6e] hover:text-[#ffffff] transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
