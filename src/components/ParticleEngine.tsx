import { useRef, useMemo, useEffect } from 'react';
import { motion, useTransform, useMotionValue } from 'motion/react';
import type { MotionValue } from 'motion/react';

const PARTICLE_COUNT = 30000;
const RING_CENTER = 0.72; // Larger overall shape
const RING_SIGMA = 0.12; // Tighter core density
const MOUSE_INFLUENCE = 0.01;
const MOUSE_RADIUS = 0.16;
const GATHER_DURATION = 4;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// 화면 가장자리에서 흩어진 시작 위치
const getStartPos = () => {
  const edge = Math.floor(Math.random() * 4);
  if (edge === 0) return { x: Math.random() * 1.2 - 0.1, y: -0.15 - Math.random() * 0.5 };
  if (edge === 1) return { x: Math.random() * 1.2 - 0.1, y: 1.15 + Math.random() * 0.5 };
  if (edge === 2) return { x: -0.15 - Math.random() * 0.5, y: Math.random() * 1.2 - 0.1 };
  return { x: 1.15 + Math.random() * 0.5, y: Math.random() * 1.2 - 0.1 };
};

// Box-Muller 가우시안 랜덤
const gaussRandom = (mean: number, sigma: number) => {
  const u1 = Math.random() || 1e-10;
  const u2 = Math.random();
  return mean + sigma * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
};

interface Particle {
  startX: number;
  startY: number;
  angle: number;
  radius: number;
  orbitSpeed: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  delay: number;
  color: string;
}

interface ParticleEngineProps {
  scrollYProgress?: MotionValue<number>;
  className?: string;
  mode?: "default" | "logo";
}

export default function ParticleEngine({ scrollYProgress, className = '', mode = "default" }: ParticleEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });

  const particles = useMemo((): Particle[] => {
    // If it's logo mode, pre-calculate specific dot clustering
    if (mode === "logo") {
      // Create a hexagonal dot grid similar to the user's reference logo using coordinates
      const logoDots = [
        { rX: -0.15, rY: -0.1, s: 6 },
        { rX: -0.05, rY: -0.2, s: 12 },
        { rX: 0.05, rY: -0.3, s: 16 },

        { rX: -0.2, rY: 0, s: 8 },
        { rX: -0.1, rY: -0.1, s: 14 },
        { rX: 0, rY: -0.2, s: 18 },
        { rX: 0.1, rY: -0.3, s: 22 },

        { rX: -0.25, rY: 0.1, s: 6 },
        { rX: -0.15, rY: 0, s: 10 },
        { rX: -0.05, rY: -0.1, s: 16 },
        { rX: 0.05, rY: -0.2, s: 20 },
        { rX: 0.15, rY: -0.3, s: 24 },

        { rX: -0.2, rY: 0.2, s: 8 },
        { rX: -0.1, rY: 0.1, s: 12 },
        { rX: 0, rY: 0, s: 18 },
        { rX: 0.1, rY: -0.1, s: 24 },
        { rX: 0.2, rY: -0.2, s: 28 },

        { rX: -0.1, rY: 0.3, s: 10 },
        { rX: 0, rY: 0.2, s: 14 },
        { rX: 0.1, rY: 0.1, s: 18 },
        { rX: 0.2, rY: 0, s: 22 },

        { rX: 0.05, rY: 0.3, s: 12 },
        { rX: 0.15, rY: 0.2, s: 16 }
      ];

      // We don't need 30k particles for the logo, just enough to form dense glowing clusters at these points
      const LOGO_PARTICLE_COUNT = 8000;
      return Array.from({ length: LOGO_PARTICLE_COUNT }, (_, i) => {
        const start = getStartPos();
        // Clump to specific logical dots
        const targetDot = logoDots[i % logoDots.length];
        // Add random scatter around the target dot. Larger base 's' means larger radius.
        const angle = Math.random() * Math.PI * 2;
        // Make the scatter proportional to the visual size of the dot we're simulating
        const radius = Math.random() * (targetDot.s * 0.002);
        const endX = targetDot.rX + Math.cos(angle) * Math.sqrt(radius);
        const endY = targetDot.rY + Math.sin(angle) * Math.sqrt(radius);

        return {
          startX: start.x,
          startY: start.y,
          angle,
          radius: Math.sqrt(endX * endX + endY * endY), // Fake radius to leverage existing logic
          orbitSpeed: (Math.random() - 0.5) * 0.005,
          size: 0.3 + Math.random() * 0.5,
          opacity: 0.15 + Math.random() * 0.35,
          twinkleSpeed: 0.2 + Math.random() * 1.0,
          twinkleOffset: Math.random() * Math.PI * 2,
          delay: Math.random() * 1.2,
          color: `255, 255, 255`,
          // inject specific target pos to override
          targetX: endX,
          targetY: endY
        } as any;
      });
    }

    // Default giant sphere/galaxy mode:
    return Array.from({ length: PARTICLE_COUNT }, () => {
      const start = getStartPos();
      const angle = Math.random() * Math.PI * 2;

      // More dramatic organic distortion for the larger scale
      const distortion = Math.sin(angle * 3.5) * 0.12 + Math.cos(angle * 6) * 0.06 + (Math.random() - 0.5) * 0.08;
      const baseRadius = Math.max(0.01, gaussRandom(RING_CENTER, RING_SIGMA));
      const radius = baseRadius * (1 + distortion);

      const isGlow = Math.random() < 0.15; // More bright points for richness
      return {
        startX: start.x,
        startY: start.y,
        angle,
        radius,
        orbitSpeed: (Math.random() - 0.5) * 0.02, // Majestic, slow rotation
        size: 0.5 + Math.random() * 0.7, // 0.5 ~ 1.2 range
        opacity: isGlow ? 0.25 + Math.random() * 0.45 : 0.1 + Math.random() * 0.18,
        twinkleSpeed: 0.4 + Math.random() * 1.4,
        twinkleOffset: Math.random() * Math.PI * 2,
        delay: Math.random() * 0.8,
        color: Math.random() < 0.85
          ? `190, 230, 255` // Bright vibrant blue
          : Math.random() < 0.5
            ? `255, 255, 255` // Pure white
            : `150, 190, 255`, // Rich sky blue
      };
    });
  }, [mode]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTargetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? canvas.offsetWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? canvas.offsetHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    let rafId: number;
    const start = performance.now();

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const elapsed = (performance.now() - start) * 0.001;

      const minSize = Math.min(w, h);
      const scaleX = minSize / (2 * w);
      const scaleY = minSize / (2 * h);

      mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * 0.08;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const progress = Math.max(0, Math.min(1, (elapsed - p.delay * GATHER_DURATION) / GATHER_DURATION));
        const eased = easeInOutCubic(progress);

        if (eased >= 1) {
          // Increase orbit speed for more motion
          p.angle += p.orbitSpeed * 0.03;
        }

        // Add subtle radial oscillation for "breathing" effect
        const radialPulse = eased >= 1 ? 1 + 0.05 * Math.sin(elapsed * 1.2 + p.twinkleOffset) : 1;
        const finalRadius = p.radius * radialPulse;

        // If mode is logo, we override ringX/ringY with target pos + slow orbit
        let ringX = 0.5 + scaleX * finalRadius * Math.cos(p.angle);
        let ringY = 0.5 + scaleY * finalRadius * Math.sin(p.angle);

        if ((p as any).targetX !== undefined) {
          // Instead of circling origin, we circle our specific clump center slightly
          ringX = 0.5 + scaleX * ((p as any).targetX + Math.cos(p.angle) * 0.015);
          ringY = 0.5 + scaleY * ((p as any).targetY + Math.sin(p.angle) * 0.015);
        }

        const baseX = p.startX + (ringX - p.startX) * eased;
        const baseY = p.startY + (ringY - p.startY) * eased;

        let x = baseX, y = baseY;

        // Magnetic Attraction: Strongly pull particles towards the mouse
        const dx = mx - baseX;
        const dy = my - baseY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

        // Subtle follow effect: gentle pull towards the mouse
        const MAGNETIC_RANGE = 0.28;
        const falloff = Math.max(0, 1 - dist / MAGNETIC_RANGE);

        // Lower power and multiplier for a "slight follow" feel
        const attractionStrength = Math.pow(falloff, 2) * 0.18 * eased;

        x = baseX + dx * attractionStrength;
        y = baseY + dy * attractionStrength;

        const twinkle = eased >= 1
          ? 0.4 + 0.6 * Math.sin(elapsed * p.twinkleSpeed * 1.5 + p.twinkleOffset)
          : 0.3 + 0.7 * eased;
        const opacity = p.opacity * Math.min(1, twinkle);

        ctx.beginPath();
        ctx.arc(x * w, y * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [particles]);

  // If mode is logo, no fade. Otherwise, fade according to scrollYProgress
  // We handle the hook unconditionally so React is happy, but return a static value if no scroll progress exists
  const fallbackProgress = useMotionValue(0);
  const mappedOpacity = useTransform(scrollYProgress || fallbackProgress, [0, 0.05, 0.12], [1, 1, 0]);
  const containerOpacity = mode === "logo" ? 1 : mappedOpacity;

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity: containerOpacity }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
}
