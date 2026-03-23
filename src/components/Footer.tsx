import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// 모든 페이지에서 공통으로 사용하는 푸터 컴포넌트
export default function Footer() {
  const { isDark } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border-light py-10 container-responsive relative bg-bg-section">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* 좌측: 로고 + 주소 */}
        <div className="flex flex-col gap-3">
          <img src={isDark ? '/kt ds_dark.png' : '/kt ds_light.png'} alt="kt ds" className="h-5 w-auto object-contain" />
          <p className="text-[13px] font-medium text-text-secondary">
            (06707) 서울 서초구 효령로 176, 02-523-7029
          </p>
        </div>

        {/* 우측: 링크 + 카피라이트 */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-6 text-[13px] font-medium text-text-secondary">
            <a href="#" className="hover:text-text-primary transition-colors">사이트맵</a>
            <a href="#" className="hover:text-text-primary transition-colors">공지사항</a>
            <a href="#" className="hover:text-text-primary transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-text-primary transition-colors">이용약관</a>
          </div>
          <p className="text-[12px] text-text-dim">© 2026 AI Biz Portal. All rights reserved.</p>
        </div>
      </div>

      {/* 상단으로 스크롤 버튼 - 프리미엄 버전 */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-lg shadow-brand-primary/30 transition-colors cursor-pointer"
            aria-label="맨 위로 가기"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
