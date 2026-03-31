import { memo } from 'react';
import { motion } from 'motion/react';

const SolutionCard = memo(function SolutionCard({ image, title, desc, highlight, idx }: {
  image: string;
  title: string;
  desc: string;
  highlight: string;
  idx: number;
}) {
  return (
    <motion.div
      className="relative bg-[#F6F6F6] rounded-[20px] p-10 flex flex-col w-full h-[400px] cursor-pointer font-pretendard overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
    >
      {/* 상단: 번호 + 제목 + 설명 */}
      <div className="flex flex-col">
        <span className="text-black text-[16px] font-extrabold mb-2">
          {String(idx + 1).padStart(2, '0')}
        </span>
        <h4 className="text-black text-[26px] font-extrabold tracking-tight leading-tight break-keep mb-3">
          {title}
        </h4>
        <p className="text-[#666666] text-[15px] leading-relaxed font-normal break-keep">
          {desc}
        </p>
      </div>
      {/* 해시태그: 절대 위치 고정 */}
      <span className="absolute bottom-[180px] left-10 text-brand-primary text-[15px] font-semibold">
        {highlight.startsWith('#') ? highlight : `#${highlight}`}
      </span>
      {/* 아이콘: 우측 하단 고정 */}
      <img
        src={image}
        alt={title}
        className="absolute bottom-[10px] right-[40px] w-[100px] h-[100px] object-contain"
      />
    </motion.div>
  );
});

export default SolutionCard;
