import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function HeroSpline() {
  return (
    <div className="absolute top-[130%] md:top-[95%] left-[150%] md:left-[170%] lg:left-[120%] -translate-x-1/2 -translate-y-1/2">
      <div className="scale-[1] md:scale-[1.2] origin-center">
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/mI8hnuZfc0mxniMC/scene.splinecode"
            style={{ width: 2000, height: 1231 }}
          />
        </Suspense>
      </div>
    </div>
  );
}
