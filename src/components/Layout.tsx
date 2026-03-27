import type { ReactNode } from 'react';
import type { MotionValue } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  activePage?: 'home' | 'platform' | 'ai-agents' | 'ai-solutions' | 'use-cases' | 'news';
  scrollLineProgress?: MotionValue<number>;
  children: ReactNode;
  className?: string;
}

export default function Layout({ activePage, scrollLineProgress, children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen text-text-primary font-pretendard flex flex-col bg-bg-main ${className}`}>
      <Navbar activePage={activePage} scrollLineProgress={scrollLineProgress} />
      {children}
      <Footer />
    </div>
  );
}
