import { useRef, useMemo, useEffect } from 'react';
import { motion, useTransform, useMotionValue, useInView } from 'motion/react';
import type { MotionValue } from 'motion/react';

const PARTICLE_COUNT = 12000;
const RING_CENTER = 0.72; // Larger overall shape
const RING_SIGMA = 0.12; // Tighter core density
const MOUSE_INFLUENCE = 0.08;
const MOUSE_RADIUS = 0.22;
const GATHER_DURATION = 4;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t <0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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
      const GRID_RADIUS = 0.28;
      const GRID_STEP = 0.045;
      const logoDots: { rX: number; rY: number; s: number }[] = [];

      for (let x = -GRID_RADIUS; x <= GRID_RADIUS; x += GRID_STEP) {
        for (let y = -GRID_RADIUS; y <= GRID_RADIUS; y += GRID_STEP) {
          const dist = Math.sqrt(x * x + y * y);
          if (dist <= GRID_RADIUS) {
            // Size increases from left to right
            // Map x from [-GRID_RADIUS, GRID_RADIUS] to size [4, 18]
            const sizeWeight = (x + GRID_RADIUS) / (GRID_RADIUS * 2);
            const size = 4 + sizeWeight * 14;
            logoDots.push({ rX: x, rY: y, s: size });
          }
        }
      }

      const LOGO_PARTICLE_COUNT = 10000; // Optimized for performance
      return Array.from({ length: LOGO_PARTICLE_COUNT }, (_, i) => {
        const start = getStartPos();
        const targetDot = logoDots[i % logoDots.length];
        const angle = Math.random() * Math.PI * 2;

        // Denser clustering for structured intelligence feel
        const radius = Math.random() * (targetDot.s * 0.0008);
        const endX = targetDot.rX + Math.cos(angle) * Math.sqrt(radius);
        const endY = targetDot.rY + Math.sin(angle) * Math.sqrt(radius);

        return {
          startX: start.x,
          startY: start.y,
          angle,
          radius: Math.sqrt(endX * endX + endY * endY),
          orbitSpeed: (Math.random() - 0.5) * 0.002,
          size: 0.4 + Math.random() * 0.4,
          opacity: 0.1 + Math.random() * 0.4,
          twinkleSpeed: 0.5 + Math.random() * 1.5,
          twinkleOffset: Math.random() * Math.PI * 2,
          delay: (i / LOGO_PARTICLE_COUNT) * 0.5, // Staggered arrival for cinematic flow
          color: `255, 255, 255`,
          targetX: endX,
          targetY: endY,
          targetSize: targetDot.s
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

      const isGlow = Math.random() <0.15; // More bright points for richness
      return {
        startX: start.x,
        startY: start.y,
        angle,
        radius,
        orbitSpeed: (Math.random() - 0.5) * 0.02, // Majestic, slow rotation
        size: 0.5 + Math.random() * 0.7, // 0.5 ~ 1.2 range
        opacity: 0.8 + Math.random() * 0.2, // 0.8 ~ 1.0 range
        twinkleSpeed: 0.4 + Math.random() * 1.4,
        twinkleOffset: Math.random() * Math.PI * 2,
        delay: 0,
        color: Math.random() <0.85
          ? `190, 230, 255` // Bright vibrant blue
          : Math.random() <0.5
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

  const isInView = useInView(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;

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

      const mouseX = mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * 0.08;
      const mouseY = mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * 0.08;

      const globalProgress = Math.min(1, elapsed / (GATHER_DURATION * 1.5));
      const viewScale = 1 + globalProgress * 0.08;

      const scaleX = (minSize / (2 * w)) * viewScale;
      const scaleY = (minSize / (2 * h)) * viewScale;

      // REMOVED ctx.shadowBlur - This was the performance killer

      for (let i = 0; i <particles.length; i++) {
        const p = particles[i];
        const progress = Math.max(0, Math.min(1, (elapsed - p.delay * GATHER_DURATION) / GATHER_DURATION));
        // Use a faster easing for performance
        const eased = progress <0.5 ? 2 * progress * progress : 1 - ((-2 * progress + 2) ** 2) / 2;

        p.angle += p.orbitSpeed * (0.005 + 0.015 * eased);

        let targetX = 0.5, targetY = 0.5;
        if ((p as any).targetX !== undefined) {
          const noise = (Math.sin(elapsed * 2 + p.twinkleOffset) * 0.03) * (1 - eased);
          targetX = 0.5 + scaleX * ((p as any).targetX + noise);
          targetY = 0.5 + scaleY * ((p as any).targetY + noise);
        } else {
          const radialPulse = 1 + (0.05 * Math.sin(elapsed * 1.2 + p.twinkleOffset)) * eased;
          targetX = 0.5 + scaleX * p.radius * radialPulse * Math.cos(p.angle);
          targetY = 0.5 + scaleY * p.radius * radialPulse * Math.sin(p.angle);
        }

        const easedX = p.startX + (targetX - p.startX) * eased;
        const easedY = p.startY + (targetY - p.startY) * eased;

        // Mouse displacement logic: particles move away from/towards the cursor based on distance
        const dx = easedX - mouseX;
        const dy = easedY - mouseY;
        const distSq = dx * dx + dy * dy;
        const mouseRadiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

        let offsetX = 0;
        let offsetY = 0;

        if (distSq <mouseRadiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_INFLUENCE * eased;
          offsetX = dx * force;
          offsetY = dy * force;
        }

        const x = easedX + offsetX;
        const y = easedY + offsetY;

        const size = p.size * (1 - eased) + ((p as any).targetSize * 0.01 * minSize / 400 || p.size) * eased;
        const twinkle = 0.4 + 0.6 * Math.sin(elapsed * p.twinkleSpeed + p.twinkleOffset);
        const opacity = p.opacity * (0.4 + 0.6 * eased) * twinkle;

        ctx.fillStyle = `rgba(${p.color},${opacity})`;

        // Replaced arc() with fillRect() for massive performance gain
        ctx.fillRect(x * w - size, y * h - size, size * 2, size * 2);
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [particles, isInView]);

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
        style={{
          width: '100%',
          height: '100%',
          filter: mode === "logo" ? 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' : 'none'
        }}
      />
    </motion.div>
  );
}
