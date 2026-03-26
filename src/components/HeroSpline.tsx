import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function HeroSpline() {
  return (
    <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2">
      <div className="scale-[1] md:scale-[1.2] lg:scale-[1.25] origin-center">
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/mI8hnuZfc0mxniMC/scene.splinecode"
            style={{ width: 1000, height: 616 }}
          />
        </Suspense>
      </div>
    </div>
  );
}
