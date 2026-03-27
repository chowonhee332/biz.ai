export default function SolutionCard({ image, title, desc, highlight, category }: {
  image: string;
  title: string;
  desc: string;
  highlight: string;
  category?: string;
}) {
  return (
    <div className="bg-[#F6F6F6] rounded-[20px] p-6 md:p-8 flex flex-col w-full min-w-[280px] h-[340px] md:h-[380px] cursor-pointer font-pretendard">
      <div className="w-[60px] h-[60px] md:w-[120px] md:h-[60px] shrink-0">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col gap-3 mt-auto">
        <h4 className="text-black text-[22px] md:text-[28px] font-bold tracking-tight leading-tight">{title}</h4>
        <p className="text-[#444444] text-[15px] leading-relaxed font-normal break-keep min-h-[80px] md:min-h-[96px]">{desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {category && (
            <span className="px-3 h-7 rounded-full bg-[#E8E8E8] text-[#555555] text-[14px] font-medium leading-none inline-flex items-center">{category}</span>
          )}
          <span className="px-3 h-7 rounded-full bg-[#E8E8E8] text-[#555555] text-[14px] font-medium leading-none inline-flex items-center">
            {highlight.replace(/^#\s*/, '')}
          </span>
        </div>
      </div>
    </div>
  );
}
