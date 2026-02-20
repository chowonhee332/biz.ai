import { Store, Utensils, Monitor, Car, HeartPulse, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

const SolutionItem = ({ type, tag, title, desc, icon }: { type: 'top' | 'bottom', tag: string, title: string, desc: string, icon: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group relative flex flex-col items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 hover:border-[var(--color-text-secondary)] transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--color-accent)]/10"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface-hover)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
    
    <div className="relative z-10 flex flex-col items-center text-center h-full">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <p className="text-[var(--color-accent)] text-xs font-semibold tracking-wide uppercase mb-3">{tag}</p>
      <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">{title}</h4>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default function Solutions() {
  return (
    <section id="solution" className="py-32 px-6 bg-[var(--color-background)] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">KT DS의 AI 솔루션</h2>
          <p className="text-[var(--color-text-secondary)] text-xl max-w-2xl mx-auto">기업의 AI 도입부터 클라우드 인프라 관리까지 전 과정을 표준화하고 안정적으로 지원합니다</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SolutionItem type="top" tag="No-Code Agent Builder" title="AI:ON-U" desc="엔터프라이즈 맞춤형 AI Agent를 빠르게 구축하는 No-Code 기반 Agent Builder (비개발자 생성 가능)" icon={<Store size={28} />} />
          <SolutionItem type="top" tag="AI Portal" title="Works AI" desc="AI Agent 기반으로 다양한 업무처리를 지원하는 사내 AI Agent Portal" icon={<Utensils size={28} />} />
          <SolutionItem type="top" tag="Meeting Assistant" title="AI 회의록" desc="음성 기반 회의 자동 기록 · 요약 · 업무 추출 AI 서비스" icon={<Monitor size={28} />} />
          <SolutionItem type="bottom" tag="Cloud Management" title="CloudWiz" desc="클라우드 운영 효율화와 자동화를 지원하는 관리 서비스" icon={<Car size={28} />} />
          <SolutionItem type="bottom" tag="AI Gateway" title="Beast AI Gateway" desc="엔터프라이즈용 AI 기술, API를 통합 관리하는 서비스" icon={<HeartPulse size={28} />} />
          <SolutionItem type="bottom" tag="Secure Development" title="Codebox" desc="폐쇄형 설치형 AI 코드 개발 어플라이언스" icon={<ShoppingBag size={28} />} />
        </div>
      </div>
    </section>
  );
}
