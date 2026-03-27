export default function SolutionCard({ image, title, desc, highlight, idx }: {
  image: string;
  title: string;
  desc: string;
  highlight: string;
  idx: number;
}) {
  return (
    <div className="bg-[#F6F6F6] rounded-[20px] p-6 md:p-8 flex flex-col w-full h-[360px] cursor-pointer font-pretendard relative overflow-hidden">
      {/* 번호 */}
      <span className="text-black text-[20px] font-bold mb-2 block">
        {String(idx + 1).padStart(2, '0')}
      </span>

      {/* 타이틀 + 설명 + 태그 묶음 */}
      <div className="flex flex-col gap-3">
        <h4 className="text-black text-[28px] font-bold tracking-tight leading-tight break-keep">
          {title}
        </h4>
        <p className="text-[#666666] text-[15px] leading-relaxed font-normal break-keep">
          {desc}
        </p>
        <span className="text-brand-primary text-[15px] font-semibold">
          {highlight.startsWith('#') ? highlight : `#${highlight}`}
        </span>
      </div>

      {/* 로고 - 우측 하단 절대 위치 */}
      <img
        src={image}
        alt={title}
        className="absolute bottom-[-5px] right-6 w-[100px] h-[100px] object-contain"
      />
    </div>
  );
}
