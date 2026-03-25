import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function HeroSpline() {
  return (
    <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2">
      <div className="scale-[0.55] origin-center">
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/2UO9IOrNh3JYR1wS/scene.splinecode"
            style={{ width: 2000, height: 1231 }}
          />
        </Suspense>
      </div>
    </div>
  );
}
