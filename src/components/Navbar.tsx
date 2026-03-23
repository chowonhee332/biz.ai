import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activePage?: 'home' | 'platform' | 'use-cases' | 'news';
  scrollLineProgress?: MotionValue<number>;
}

export default function Navbar({ activePage, scrollLineProgress }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'AI 제품/서비스', path: '/platform', id: 'platform' },
    { name: '고객 사례', path: '/use-cases', id: 'use-cases' },
    { name: '새로운 소식', path: '/news', id: 'news' },
  ];

  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const scrolledBg = isDark ? 'rgba(10, 10, 10, 1)' : 'rgba(255, 255, 255, 1)';
  const borderClass = isDark ? 'border-white/10' : 'border-black/10';
  const mobileMenuBg = isDark ? '#0A0A0A' : '#FFFFFF';
  const ktdsLogo = isDark ? '/kt ds_dark.png' : '/kt ds_light.png';

  return (
    <nav
      className={`fixed top-0 w-full z-50 py-4 transition-all duration-500 ${scrolled ? `backdrop-blur-md shadow-lg` : 'backdrop-blur-none'}`}
      style={{ backgroundColor: scrolled ? scrolledBg : (isDark ? 'transparent' : 'rgba(255,255,255,1)') }}
    >
      <div className="max-w-[1280px] mx-auto container-responsive flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          <span className={`text-[22px] font-bold tracking-tighter ${textColor}`}>Biz.AI</span>
        </Link>

        {/* Desktop Navigation - 정중앙 */}
        <div className="hidden lg:flex items-center gap-10 text-body-xs tracking-tight absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`${textColor} ${activePage === link.id ? 'font-bold' : 'font-medium'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-[0.7rem] ml-auto">
          <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className={`${textColor} hover:${textColor} hover:bg-transparent group h-9`}>
              <img src={ktdsLogo} alt="kt ds" className="h-[17px] w-auto object-contain transition-opacity" onError={(e) => { (e.target as HTMLImageElement).src = ktdsLogo; }} />
              <ArrowUpRight size={28} className="-ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Button>
          </a>
          <a href="https://studio.abclab.ktds.com/auth/login" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className={`px-4 py-0 h-9 rounded-[8px] font-bold hover:scale-100 hover:bg-transparent group ${textColor}`} style={{ fontSize: '15px' }}>
              AI Agent 스튜디오
              <ArrowUpRight size={28} stroke={isDark ? 'white' : 'black'} className="-ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className={`${textColor} hover:bg-transparent h-9 w-9`}
            onClick={toggleTheme}
            aria-label="테마 변경"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`lg:hidden ml-auto ${textColor} h-10 w-10 hover:bg-bg-active rounded-lg`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </Button>
      </div>

      {/* Scroll Progress Line */}
      <div className="absolute bottom-[-1px] left-0 w-full h-[3px]">
        {scrollLineProgress && (
          <motion.div
            style={{ scaleX: scrollLineProgress, originX: 0 }}
            className="absolute inset-0 bg-blue-500"
          />
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden absolute top-full left-0 right-0 border-b px-6 py-6 overflow-hidden ${borderClass}`}
            style={{ backgroundColor: mobileMenuBg }}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`text-body-sm font-bold py-1 ${activePage === link.id ? textColor : (isDark ? 'text-text-secondary/60' : 'text-gray-500')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className={`h-px my-2 ${isDark ? 'bg-border-light' : 'bg-black/10'}`} />
              <div className="flex flex-col gap-5">
                <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 font-medium py-1 ${isDark ? 'text-text-secondary/60' : 'text-gray-500'}`}>
                  <span className="text-body-sm">kt ds 홈페이지</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
                <a href="https://studio.abclab.ktds.com/auth/login" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 font-medium py-1 ${isDark ? 'text-text-secondary/60' : 'text-gray-500'}`}>
                  <span className="text-body-sm">AI Agent 스튜디오</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
