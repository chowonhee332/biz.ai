import { memo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

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
      className={`group relative bg-[#F6F6F6] rounded-[20px] p-9 flex flex-col w-full h-[320px] md:h-[360px] font-pretendard overflow-hidden transition-colors duration-300 ${link ? 'cursor-pointer hover:bg-[#EBEBEB]' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
    >
      {/* 좌상단: 번호 + 타이틀 + 설명 + 태그 */}
      <div className="flex flex-col gap-2">
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
        <span className="inline-flex items-center self-start mt-1 text-[#0066FF] text-[14px] font-medium">
          {highlight}
        </span>
      </div>

      {/* 우하단: 아이콘 */}
      <div className="absolute bottom-0 right-[36px]">
        <img
          src={image}
          alt={title}
          className="w-[110px] h-[110px] object-contain"
        />
      </div>
    </motion.div>
  );
});

export default SolutionCard;
