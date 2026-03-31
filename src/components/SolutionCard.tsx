import { memo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SolutionCard = memo(function SolutionCard({ image, title, desc, highlight, idx, link, hideNumber }: {
  image: string;
  title: string;
  desc: string;
  highlight: string;
  idx: number;
  link?: string;
  hideNumber?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={link ? () => navigate(link) : undefined}
      className={`group relative bg-[#F6F6F6] rounded-[20px] p-9 flex flex-col w-full h-[420px] font-pretendard overflow-hidden transition-colors duration-300 ${link ? 'cursor-pointer hover:bg-[#EBEBEB]' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
    >
      {/* 아이콘: 상단 좌측 */}
      <div className="mb-auto -mt-[30px]">
        <img
          src={image}
          alt={title}
          className="w-[120px] h-[120px] object-contain"
        />
      </div>

      {/* 제목 + 설명 */}
      <div className="absolute left-9 right-9 top-[200px] flex flex-col gap-2">
        {!hideNumber && (
          <span className="text-black text-[15px] font-extrabold">
            {String(idx + 1).padStart(2, '0')}
          </span>
        )}
        <h4 className="text-black text-[26px] font-extrabold tracking-tight leading-tight break-keep">
          {title}
        </h4>
        <p className="text-[#666666] text-[16px] leading-relaxed font-normal break-keep">
          {desc}
        </p>
      </div>

      {/* 태그 + 화살표 */}
      <div className="absolute left-9 right-9 bottom-8 flex items-center justify-between">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/[0.06] text-[#444444] text-[14px] font-medium">
          {highlight.startsWith('#') ? highlight.slice(1) : highlight}
        </span>
        {link && (
          <ArrowRight size={28} className="text-black transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </div>
    </motion.div>
  );
});

export default SolutionCard;
