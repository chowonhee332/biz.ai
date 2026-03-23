import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string | string[];
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: 'capsule' | 'sphere' | 'box' | 'tetrahedron';
  fieldStrength?: number;
}

const AntigravityInner = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = '#FF9FFC',
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10
}: AntigravityProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => new Float32Array(count * 3), [count]);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  // 전역 마우스 트래킹 추가
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x, y };
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // "AI" 글자 포인트 생성
  const textPoints = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];

    canvas.width = 200;
    canvas.height = 100;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AI', canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const points = [];
    const step = 2; // 샘플링 간격

    for (let y = 0; y <canvas.height; y += step) {
      for (let x = 0; x <canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        if (imageData[index]> 128) {
          // Normalize to -0.5 ~ 0.5
          points.push({
            x: (x / canvas.width - 0.5) * 1.5,
            y: -(y / canvas.height - 0.5) * 1.5
          });
        }
      }
    }
    return points;
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    const colors = Array.isArray(color) ? color : [color, color];
    const threeColors = colors.map(c => new THREE.Color(c));

    for (let i = 0; i <count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;

      // 원형 분포를 위한 좌표 계산
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * (Math.min(width, height) * 0.8);
      const tx = Math.cos(angle) * radius;
      const ty = Math.sin(angle) * radius;

      // 초기 위치도 목표 근처로 설정하여 너무 많이 움직이지 않게 함
      const x = tx + (Math.random() - 0.5) * 5;
      const y = ty + (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 5;

      const randomRadiusOffset = (Math.random() - 0.5) * 2;

      // Color interpolation
      const mix = Math.random();
      const pColor = new THREE.Color().copy(threeColors[0]).lerp(threeColors[1], mix);
      colorArray[i * 3] = pColor.r;
      colorArray[i * 3 + 1] = pColor.g;
      colorArray[i * 3 + 2] = pColor.b;

      temp.push({
        t, factor, speed,
        mx: tx, my: ty, mz: 0,
        cx: x, cy: y, cz: z,
        vx: 0, vy: 0, vz: 0,
        randomRadiusOffset
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height, color, colorArray]);

  useFrame(state => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v } = state;
    const m = lastMousePos.current;

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    const smoothFactor = 0.05;
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;
    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, i) => {
      let { t, speed, mx, my, mz, cz, randomRadiusOffset } = particle;
      t = particle.t += speed / 2;

      const dx = particle.cx - targetX;
      const dy = particle.cy - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetPos = { x: mx, y: my, z: mz * depthFactor };

      if (dist <magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));
        const currentRingRadius = ringRadius + wave + deviation;

        targetPos.x = targetX + currentRingRadius * Math.cos(angle);
        targetPos.y = targetY + currentRingRadius * Math.sin(angle);
        targetPos.z = mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor);
      }

      particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(targetX, targetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.sqrt(
        Math.pow(particle.cx - targetX, 2) + Math.pow(particle.cy - targetY, 2)
      );

      let scaleFactor = 1;
      if (currentDistToMouse <magnetRadius) {
        const distFromRing = Math.abs(currentDistToMouse - ringRadius);
        scaleFactor = 1 - distFromRing / 15;
        scaleFactor = Math.max(0.3, Math.min(1, scaleFactor));
      }

      const finalScale = scaleFactor * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
      {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </capsuleGeometry>}
      {particleShape === 'sphere' && <sphereGeometry args={[0.2, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>}
      {particleShape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </boxGeometry>}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.3]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </tetrahedronGeometry>}
      <meshBasicMaterial vertexColors />
    </instancedMesh>
  );
};

export default function Antigravity(props: AntigravityProps) {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 35 }} gl={{ antialias: true, alpha: true }}>
      <AntigravityInner {...props} />
    </Canvas>
  );
}

