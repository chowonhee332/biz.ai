import { Menu, ExternalLink, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div className="w-full max-w-5xl bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl px-6 py-3 flex justify-between items-center shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black shadow-inner">
            <span className="font-bold text-lg">B</span>
          </div>
          <span className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">Biz.AI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[var(--color-text-secondary)] text-[14px] font-medium">
          <a href="#solution" className="hover:text-white transition-colors">AI Agent 제품군</a>
          <a href="#domain" className="hover:text-white transition-colors">AI 솔루션</a>
          <a href="#use-cases" className="hover:text-white transition-colors">고객 사례</a>
          <a href="#about" className="hover:text-white transition-colors">회사 소개</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium transition-colors">
            Log in
          </button>
          <button className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-accent)]/90 transition-all shadow-[0_0_15px_var(--color-accent-glow)] flex items-center gap-1">
            Sign Up <ChevronRight size={14} />
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
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
