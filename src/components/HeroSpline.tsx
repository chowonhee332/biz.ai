import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <div className="absolute bottom-[-350px] left-1/2" style={{ transform: 'translateX(-50%) translateZ(0)', willChange: 'transform' }}>
      <div className="scale-[0.8] md:scale-[0.9] lg:scale-[1.1] origin-center" style={{ willChange: 'transform' }}>
        <Spline
          scene="/spline/scene.splinecode"
          style={{ width: 1000, height: 616 }}
        />
      </div>
    </div>
  );
}
