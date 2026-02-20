import { Linkedin, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-on-surface)] text-[var(--color-surface-variant)] py-20 px-6 border-t border-[var(--color-outline)]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8"><span className="text-3xl font-black text-[var(--color-surface)] tracking-tighter uppercase">kt ds</span></div>
            <p className="text-sm leading-relaxed mb-8 max-w-xs">비즈니스를 위한 엔터프라이즈급 AI Agent 플랫폼<br />Biz.AI와 함께 데이터 혁신을 시작하세요.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-surface)]/10 flex items-center justify-center hover:bg-[var(--color-surface)]/20 transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-surface)]/10 flex items-center justify-center hover:bg-[var(--color-surface)]/20 transition-colors"><Youtube size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--color-surface)]/10 flex items-center justify-center hover:bg-[var(--color-surface)]/20 transition-colors"><Mail size={18} /></a>
            </div>
          </div>
          <div>
            <h5 className="text-[var(--color-surface)] font-bold mb-8 uppercase text-xs tracking-widest">AI 솔루션</h5>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">고객지원·VOC 자동화</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">데이터 기반 의사결정</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">내부 운영·업무 자동화</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">기획·보고·문서 업무</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">리스크·품질 관리</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[var(--color-surface)] font-bold mb-8 uppercase text-xs tracking-widest">제품</h5>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">데이터 Agent</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">분류·분석 Agent</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">리포트·문서 Agent</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">운영·지원 Agent</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">AI Agent 스튜디오</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[var(--color-surface)] font-bold mb-8 uppercase text-xs tracking-widest">회사</h5>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">우수 사례</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">가격 안내</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">문서</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">고객 지원</a></li>
              <li><a href="#" className="hover:text-[var(--color-surface)] transition-colors">파트너십</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[var(--color-surface)]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-wider">
          <p>© 2026 AI Biz Portal. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[var(--color-surface)] transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-[var(--color-surface)] transition-colors">이용약관</a>
            <a href="#" className="hover:text-[var(--color-surface)] transition-colors">보안정책</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
