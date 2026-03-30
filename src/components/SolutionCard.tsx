import { memo } from 'react';

const SolutionCard = memo(function SolutionCard({ image, title, desc, highlight }: {
  image: string;
  title: string;
  desc: string;
  highlight: string;
  idx: number;
}) {
  return (
    <div className="bg-[#F6F6F6] rounded-[24px] p-7 md:p-8 flex flex-row items-start gap-6 w-full h-[220px] cursor-pointer font-pretendard">
      {/* 좌측: 텍스트 */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <h4 className="text-black text-[26px] font-bold tracking-tight leading-tight break-keep mb-2">
          {title}
        </h4>
        <p className="text-[#666666] text-[15px] leading-relaxed font-normal break-keep max-w-[320px]">
          {desc}
        </p>
        <span className="text-brand-primary text-[14px] font-semibold mt-auto">
          {highlight.startsWith('#') ? highlight : `#${highlight}`}
        </span>
      </div>

      {/* 우측: 아이콘 (최상단 정렬) */}
      <img
        src={image}
        alt={title}
        className="w-[80px] h-[80px] object-contain shrink-0 -mt-2"
      />
    </div>
  );
});

export default SolutionCard;
