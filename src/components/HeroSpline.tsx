import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0, // 아주 조금이라도 화면에 걸치면(또는 여백 안에 들어오면) 렌더링
        rootMargin: '200px' // 화면 밖 200px 지점부터 미리가져오기(Preload) 시작
      } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      // 컨테이너 크기를 미리 확보하여 3D가 사라져도 영역이 줄어들지 않도록 강제 (중요!)
      className="absolute bottom-[-350px] left-1/2 w-[1000px] h-[616px]" 
      style={{ transform: 'translateX(-50%)' }}
    >
      {/* 메모리에서 완전히 언마운트하는 것은 잠재적인 로딩 깜빡임을 유발하므로 Opacity 조절로 GPU 프레임 드랍을 막습니다. 
          pointer-events-none과 visibility 처리 등을 통해 연산을 최소화 */}
      <div 
        className={`scale-[0.8] md:scale-[0.9] lg:scale-[1.1] origin-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Spline
          scene="/spline/scene.splinecode"
          style={{ width: 1000, height: 616 }}
        />
      </div>
    </div>
  );
}
