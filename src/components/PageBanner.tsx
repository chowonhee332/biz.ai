interface PageBannerProps {
  title: string;
  subtitle?: string;
  label?: string;
}

export default function PageBanner({ title, subtitle, label }: PageBannerProps) {
  return (
    <div style={{ marginTop: '68px' }} className="mx-2">
      <div
        className="relative h-[280px] flex items-center justify-center"
      >
        {/* Text */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto container-responsive text-center">
          {label && (
            <p className="text-text-secondary text-[13px] font-normal mb-3 tracking-wide">{label}</p>
          )}
          <h1 className="text-heading-md md:text-heading-lg lg:text-display-md font-bold text-text-primary tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-secondary mt-2 text-body-sm font-medium">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
