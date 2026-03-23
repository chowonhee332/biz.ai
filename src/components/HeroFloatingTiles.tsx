import React from 'react';
import { motion } from 'framer-motion';

// Enhanced SVG Noise Filter for metallic/sparkly texture (glitch-like grain)
const NoiseFilter = () => (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.8] mix-blend-overlay">
        <filter id="metallicNoise">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                stitchTiles="stitch"
            />
            {/* Boost contrast of the noise to make it sparkly */}
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1.2 0 0, 0 0 0 1.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#metallicNoise)" />
    </svg>
);

const EngravedIcon = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="text-[#000] flex items-center justify-center w-full h-full opacity-90"
            style={{
                // Deep inner shadow for engraving depth + sharp white highlight (specular) on the opposite edge
                filter: 'drop-shadow(1px 1.5px 0.5px rgba(255, 255, 255, 0.25)) drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.9))',
            }}
        >
            {children}
        </div>
    );
};

// Reusable 3D Tile Component providing true thickness and metallic lighting
const Thick3DTile = ({ children, thickness = 22, ...props }: any) => {
    return (
        <motion.div {...props} style={{ transformStyle: 'preserve-3d', ...props.style }}>
            {/* Base/Bottom Shadow Layer */}
            <div
                className="absolute inset-0 rounded-[32px] md:rounded-[44px] bg-[#000] shadow-[0_45px_100px_rgba(0,0,0,1)]"
                style={{ transform: `translateZ(-${thickness}px)`, filter: 'blur(10px)' }}
            />

            {/* Extrusion / Sides (Stacked layers) - Distinct grey metallic sheen */}
            {Array.from({ length: thickness }).map((_, i) => (
                <div
                    key={i}
                    className="absolute inset-0 rounded-[32px] md:rounded-[44px] bg-metal-base"
                    style={{
                        transform: `translateZ(-${i}px)`,
                        // Simulate rim lighting on the edges of the 3D block
                        boxShadow: i === 0 ? 'none' : 'inset 1px 1px 1px var(--color-metal-rim), inset -1px -1px 2px rgba(0,0,0,1)'
                    }}
                />
            ))}

            {/* Top Surface Layer - Visible dark metallic grey with noise */}
            <div
                className="absolute inset-0 rounded-[32px] md:rounded-[44px] overflow-hidden bg-gradient-to-br from-metal-gradient-start to-metal-gradient-end flex items-center justify-center border-t border-l border-border-light"
                style={{
                    transform: 'translateZ(0px)',
                    // Soft inner glow to simulate specular highlight on rounded edges
                    boxShadow: 'inset 0 4px 15px rgba(255,255,255,0.15), inset 1.5px 0 4px rgba(255,255,255,0.1), inset -2px -2px 10px rgba(0,0,0,0.9)'
                }}
            >
                <NoiseFilter />
                {/* Center diffuse light */}
                <div
                    className="absolute inset-0 opacity-40 mix-blend-color-dodge pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.15) 0%, transparent 60%)'
                    }}
                />
                <div className="absolute w-[60%] h-[60%] flex items-center justify-center mix-blend-multiply opacity-95 bg-black rounded-[20px] blur-[8px] translate-y-2"></div>
                <div className="relative z-20 w-[60%] h-[60%] flex items-center justify-center">
                    <EngravedIcon>
                        {children}
                    </EngravedIcon>
                </div>
            </div>
        </motion.div>
    );
};

export default function HeroFloatingTiles() {
    // 5개의 타일 
    // 이미지에 보여진 완벽한 겹침 순서(Z-Index)와 앵글(rotateX, rotateY)을 구현.
    const tiles = [
        {
            id: 1, // Top (Framer) -> Overlapped by Dollar and Shield
            icon: <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8l-8-8z" /></svg>,
            initialRotation: { rotateX: 25, rotateY: 20, rotateZ: -5 },
            yAnim: [-4, 4, -4],
            delay: 0,
            style: { top: '3%', left: '44%', zIndex: 10 },
            thickness: 20
        },
        {
            id: 2, // Right (Shield) -> Overlaps Framer, Overlapped by Check
            icon: <svg width="110%" height="110%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M14 16l-4-4 4-4" /></svg>,
            initialRotation: { rotateX: -20, rotateY: 25, rotateZ: -10 },
            yAnim: [4, -4, 4],
            delay: 0.5,
            style: { top: '32%', left: '60%', zIndex: 20 },
            thickness: 18
        },
        {
            id: 3, // Bottom Right (Check) -> Topmost over Shield and Dots
            icon: <svg width="120%" height="120%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            initialRotation: { rotateX: -35, rotateY: 20, rotateZ: 5 },
            yAnim: [-5, 5, -5],
            delay: 1,
            style: { top: '60%', left: '42%', zIndex: 40 },
            thickness: 20
        },
        {
            id: 4, // Bottom Left (Flower/Dots) -> Lowest, overlapped by Dollar and Check
            icon: <svg width="90%" height="90%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>,
            initialRotation: { rotateX: -30, rotateY: -25, rotateZ: 20 },
            yAnim: [5, -5, 5],
            delay: 1.5,
            style: { top: '55%', left: '10%', zIndex: 10 },
            thickness: 18
        },
        {
            id: 5, // Top Left (Dollar) -> Topmost over Dots and Framer
            icon: <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
            initialRotation: { rotateX: 25, rotateY: -25, rotateZ: -10 },
            yAnim: [-6, 6, -6],
            delay: 2,
            style: { top: '22%', left: '8%', zIndex: 30 },
            thickness: 18
        },
    ];

    return (
        <div className="relative w-full aspect-square max-w-[550px] mx-auto flex items-center justify-center perspective-[1400px]">
            {tiles.map((tile) => (
                <Thick3DTile
                    key={tile.id}
                    className="absolute w-40 h-40 md:w-[210px] md:h-[210px]"
                    thickness={tile.thickness}
                    style={tile.style}
                    initial={{
                        opacity: 0,
                        scale: 0.7,
                        rotateX: tile.initialRotation.rotateX,
                        rotateY: tile.initialRotation.rotateY,
                        rotateZ: tile.initialRotation.rotateZ,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: tile.yAnim,
                        rotateX: [tile.initialRotation.rotateX, tile.initialRotation.rotateX + 4, tile.initialRotation.rotateX],
                        rotateY: [tile.initialRotation.rotateY, tile.initialRotation.rotateY - 4, tile.initialRotation.rotateY],
                        rotateZ: [tile.initialRotation.rotateZ, tile.initialRotation.rotateZ + 2, tile.initialRotation.rotateZ],
                    }}
                    transition={{
                        opacity: { duration: 1.5, delay: tile.delay },
                        scale: { duration: 1.5, delay: tile.delay, type: 'spring', stiffness: 50 },
                        y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                        rotateX: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                        rotateY: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                        rotateZ: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                    }}
                >
                    {tile.icon}
                </Thick3DTile>
            ))}
        </div>
    );
}
