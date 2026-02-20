import { Menu, ExternalLink, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <div className={`
        w-full max-w-5xl pointer-events-auto 
        backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 
        flex justify-between items-center transition-all duration-500
        ${scrolled
          ? 'bg-black/80 shadow-2xl shadow-black/80 py-2.5'
          : 'bg-black/10 shadow-none py-3'}
      `}>
        <a href="#" className="flex items-center group">
          <span className="text-xl font-bold text-white tracking-tight">Biz.AI</span>
        </a>

        <div className="hidden lg:flex items-center gap-10 text-white/60 text-[14px] font-medium uppercase tracking-wider">
          <a href="#solution" className="hover:text-white transition-all relative group">
            AI Agent 제품군
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
          </a>
          <a href="#domain" className="hover:text-white transition-all relative group">
            AI 솔루션
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
          </a>
          <a href="#use-cases" className="hover:text-white transition-all relative group">
            고객 사례
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
          </a>
          <a href="#about" className="hover:text-white transition-all relative group">
            회사 소개
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
          </a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button className="text-white/50 hover:text-white text-sm font-semibold transition-colors">
            Log in
          </button>
          <button className="bg-white text-black px-5 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition-all active:scale-95 flex items-center gap-1.5">
            Sign Up <ChevronRight size={16} strokeWidth={3} />
          </button>
        </div>

        <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-20 left-4 right-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 shadow-2xl overflow-hidden z-50"
          >
            <div className="flex flex-col gap-4">
              <a href="#solution" className="text-[var(--color-text-secondary)] hover:text-white font-medium px-2 py-1">AI Agent 제품군</a>
              <a href="#domain" className="text-[var(--color-text-secondary)] hover:text-white font-medium px-2 py-1">AI 솔루션</a>
              <a href="#use-cases" className="text-[var(--color-text-secondary)] hover:text-white font-medium px-2 py-1">고객 사례</a>
              <a href="#about" className="text-[var(--color-text-secondary)] hover:text-white font-medium px-2 py-1">회사 소개</a>
              <div className="h-px bg-[var(--color-border)] my-2" />
              <button className="w-full bg-[var(--color-accent)] text-white px-4 py-3 rounded-xl text-sm font-semibold">
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
