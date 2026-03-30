import { motion } from 'motion/react';
import Silk from '@/components/Silk';

interface ServiceHeroProps {
    title: string;
    description: string;
    activeTab: string;
    silkColor?: string;
    silkScale?: number;
}

export default function ServiceHero({ title, description, activeTab, silkColor = '#c8d8ff', silkScale = 0.6 }: ServiceHeroProps) {
    return (
        <div className="relative overflow-hidden bg-[#3a3a3a] mx-3 mt-[68px] mb-3 rounded-[28px] h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Silk speed={1} scale={silkScale} color={silkColor} noiseIntensity={1.2} rotation={5} />
            </div>
            <motion.div
                key={activeTab + 'header'}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 text-center px-6"
            >
                <h1 className="text-heading-lg lg:text-display-md font-extrabold tracking-tight leading-tight font-display text-white">
                    {title}
                </h1>
                <p className="mt-4 text-[16px] text-white font-normal">{description}</p>
            </motion.div>
        </div>
    );
}
