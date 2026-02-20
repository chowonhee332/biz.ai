import { motion } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-48 pb-32 px-6 flex items-center justify-center min-h-[90vh] overflow-hidden bg-[var(--color-background)]">
      {/* Framer-style Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)] rounded-full blur-[120px] opacity-10 pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm font-medium mb-8 hover:border-[var(--color-text-secondary)] transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          KT DS New AI Solutions
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl md:text-2xl font-medium mb-6 text-[var(--color-text-secondary)]"
        >
          KT DS의 AI 솔루션은
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter text-white"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">[데이터 활용 극대화]</span>
          <br />
          를 이끌어
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl font-normal mb-12 text-[var(--color-text-secondary)] max-w-2xl leading-relaxed"
        >
          기업의 모든 데이터를 경쟁력으로 만듭니다.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="h-14 px-8 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            무료 체험 신청하기
          </button>
          <button className="h-14 px-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-white font-bold text-lg hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-secondary)] transition-all flex items-center gap-2">
            <Play size={18} fill="currentColor" />
            솔루션 문의하기
          </button>
        </motion.div>

        {/* Hero Image / Visual Placeholder (Framer style often has a UI preview here) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 w-full max-w-5xl aspect-video bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-2xl overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/10 to-purple-500/10 opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[var(--color-text-tertiary)] font-mono text-sm">Interactive 3D / UI Preview Area</div>
          </div>
          {/* Decorative UI elements */}
          <div className="absolute top-4 left-4 right-4 h-8 bg-[var(--color-background)]/50 rounded-lg flex items-center px-3 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
