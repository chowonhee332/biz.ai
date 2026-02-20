import { useRef, useMemo, useEffect } from 'react';
import { motion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';

const PARTICLE_COUNT = 7600;
const RING_CENTER = 0.62; // 링 중심 반지름
const RING_SIGMA = 0.18; // 가우시안 표준편차 (링 두께)
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
}

interface ParticleEngineProps {
  scrollYProgress: MotionValue<number>;
  className?: string;
}

export default function ParticleEngine({ scrollYProgress, className = '' }: ParticleEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });

  const particles = useMemo((): Particle[] => {
    return Array.from({ length: PARTICLE_COUNT }, () => {
      const start = getStartPos();
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.max(0.08, gaussRandom(RING_CENTER, RING_SIGMA));
      const isGlow = Math.random() < 0.05;
      return {
        startX: start.x,
        startY: start.y,
        angle,
        radius,
        orbitSpeed: (Math.random() - 0.5) * 0.06,
        size: 0.5 + Math.random() * 0.8,
        opacity: isGlow ? 0.04 + Math.random() * 0.06 : 0.22 + Math.random() * 0.3,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        delay: Math.random() * 0.5,
      };
    });
  }, []);

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
          p.angle += p.orbitSpeed * 0.016;
        }

        const finalRadius = p.radius;
        const ringX = 0.5 + scaleX * finalRadius * Math.cos(p.angle);
        const ringY = 0.5 + scaleY * finalRadius * Math.sin(p.angle);

        const baseX = p.startX + (ringX - p.startX) * eased;
        const baseY = p.startY + (ringY - p.startY) * eased;

        let x = baseX, y = baseY;
        if (eased >= 1) {
          const dx = baseX - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const falloff = Math.max(0, 1 - dist / MOUSE_RADIUS);
          const strength = easeOutCubic(falloff) * MOUSE_INFLUENCE;
          x = baseX + (dx / dist) * strength;
          y = baseY + (dy / dist) * strength;
        }

        const twinkle = eased >= 1
          ? 0.5 + 0.5 * Math.sin(elapsed * p.twinkleSpeed + p.twinkleOffset)
          : 0.3 + 0.7 * eased;
        const opacity = p.opacity * Math.min(1, twinkle);

        ctx.beginPath();
        ctx.arc(x * w, y * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
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

  const containerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12], [1, 1, 0]);

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
