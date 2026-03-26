import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <div className="absolute bottom-[-350px] left-1/2 -translate-x-1/2">
      <div className="scale-[0.6] md:scale-[0.85] lg:scale-[1.1] origin-center">
        <Spline
          scene="https://prod.spline.design/Moq5HLTRAocsfeFn/scene.splinecode"
          style={{ width: 1000, height: 616 }}
        />
      </div>
    </div>
  );
}
