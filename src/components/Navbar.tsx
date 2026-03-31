import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { throttle } from '../lib/utils';
import { NAV_LINKS, NAV_CTA_LINKS } from '../context/home/home-data';

interface NavbarProps {
  activePage?: 'home' | 'platform' | 'ai-agents' | 'ai-solutions' | 'use-cases' | 'news';
  scrollLineProgress?: MotionValue<number>;
}

export default function Navbar({ activePage, scrollLineProgress }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 20);
    }, 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = NAV_LINKS;

  const textColor = 'text-text-primary';
  const scrolledBg = isDark ? 'rgba(10, 10, 10, 1)' : 'rgba(255, 255, 255, 1)';
  const borderClass = isDark ? 'border-white/10' : 'border-black/10';
  const mobileMenuBg = isDark ? '#0A0A0A' : '#FFFFFF';
  const ktdsLogo = isDark ? '/logos/kt-ds-dark.png' : '/logos/kt-ds-light.png';
  const hoverBg = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';

  return (
    <nav
      className={`fixed top-0 w-full z-50 h-[68px] transition-all duration-500 ${scrolled ? `backdrop-blur-md shadow-lg` : 'backdrop-blur-none'}`}
      style={{ backgroundColor: scrolled ? scrolledBg : (isDark ? 'transparent' : 'rgba(255,255,255,1)') }}
    >
      <div className="max-w-[1280px] mx-auto container-responsive flex items-center h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          <img src={isDark ? '/logos/logo_bizai_dark.png' : '/logos/logo_bizai_light.png'} alt="Biz.AI" className="w-auto object-contain" style={{ height: 34 }} />
        </Link>

        {/* Desktop Navigation - 정중앙 */}
        <div className="hidden lg:flex items-center gap-10 text-body-xs tracking-tight absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`${activePage === link.id ? 'text-text-primary font-bold' : 'text-text-secondary font-semibold'} hover:text-text-primary transition-colors`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-0">
            <a href={NAV_CTA_LINKS[0].href} target="_blank" rel="noopener noreferrer" className={`${textColor} flex items-center gap-0.5 px-3 h-10 rounded-full ${hoverBg} transition-colors group`}>
              <img src={ktdsLogo} alt="kt ds" className="h-[17px] w-auto object-contain" />
              <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
            <a href={NAV_CTA_LINKS[1].href} target="_blank" rel="noopener noreferrer" className={`${textColor} flex items-center gap-0.5 px-3 h-10 rounded-full ${hoverBg} transition-colors text-[15px] font-bold group`}>
              {NAV_CTA_LINKS[1].label}
              <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
          <button className={`${textColor} flex items-center justify-center w-10 h-10 rounded-full ${hoverBg} transition-colors`} onClick={toggleTheme} aria-label="테마 변경">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile: 테마 토글 + 메뉴 버튼 */}
        <div className="lg:hidden ml-auto flex items-center gap-4">
          <button className={`${textColor} flex items-center justify-center w-10 h-10 rounded-full ${hoverBg} transition-colors`} onClick={toggleTheme} aria-label="테마 변경">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={`${textColor} flex items-center justify-center`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Line */}
      <div className="absolute bottom-[-1px] left-0 w-full h-[4px]">
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
                {NAV_CTA_LINKS.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 font-medium py-1 ${isDark ? 'text-text-secondary/60' : 'text-gray-500'}`}>
                    <span className="text-body-sm">{link.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
