import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';

const HeroSpline = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoad = () => {
    const canvas = containerRef.current?.querySelector('canvas');
    if (!canvas) return;
    canvas.style.pointerEvents = 'all';

    // Spline이 내부적으로 pointer-events를 변경하는 것을 방지
    const observer = new MutationObserver(() => {
      if (canvas.style.pointerEvents !== 'all') {
        canvas.style.pointerEvents = 'all';
      }
    });
    observer.observe(canvas, { attributes: true, attributeFilter: ['style'] });
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-650px] md:left-auto md:right-[-350px] md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0 lg:right-[-200px]">
      <div ref={containerRef} className="scale-[0.46] md:scale-[0.615] lg:scale-[0.85] origin-center md:origin-right">
        <Spline
          scene="https://prod.spline.design/w3rRLdiJPjOpXuBz/scene.splinecode"
          onLoad={handleLoad}
          style={{ width: 1300, height: 1000 }}
        />
      </div>
    </div>
  );
});

export default HeroSpline;


