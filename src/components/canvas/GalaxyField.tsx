'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function GalaxyField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useMouseParallax();
  const scrollProgress = useScrollProgress();
  const { camera } = useThree();
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalParticles = isMobile ? 5000 : 12000;

  const { positions, colors, sizes, brightIndices } = useMemo(() => {
    const armParticles = Math.floor(totalParticles * 0.66);
    
    const positions = new Float32Array(totalParticles * 3);
    const colors = new Float32Array(totalParticles * 3);
    const sizes = new Float32Array(totalParticles);
    const brightIndices: number[] = [];

    const colorBlueWhite = new THREE.Color('#cad8ff');
    const colorWhite = new THREE.Color('#ffffff');
    const colorYellowWhite = new THREE.Color('#fff4ea');
    const colorOrange = new THREE.Color('#ffd2a1');
    const colorRedOrange = new THREE.Color('#ff9c6f');

    const getRandomStarColor = () => {
      const rand = Math.random();
      if (rand < 0.15) return colorBlueWhite;
      if (rand < 0.55) return colorWhite;
      if (rand < 0.80) return colorYellowWhite;
      if (rand < 0.95) return colorOrange;
      return colorRedOrange;
    };

    // Generate arm particles
    for (let i = 0; i < armParticles; i++) {
      const i3 = i * 3;
      const armIndex = i % 2; // 2 arms
      const r = 0.1 + Math.random() * 3.9; // 0.1 to 4
      
      const randomSpread = (Math.random() - 0.5) * (r * 0.2 + 0.1);
      const angle = armIndex * Math.PI + r * 2 + randomSpread;
      
      const x = Math.sin(angle) * r;
      const z = Math.cos(angle) * r;
      const y = (Math.random() - 0.5) * 0.2 * r;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const c = getRandomStarColor();
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      if (r < 0.3 && Math.random() > 0.5) {
        sizes[i] = 0.05 + Math.random() * 0.05; // Bright core cluster
        brightIndices.push(i);
      } else {
        sizes[i] = 0.005 + Math.random() * 0.015;
      }
    }

    // Generate scatter particles
    for (let i = armParticles; i < totalParticles; i++) {
      const i3 = i * 3;
      
      const r = Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3; // flattened
      positions[i3 + 2] = r * Math.cos(phi);

      const c = getRandomStarColor();
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i] = 0.003 + Math.random() * 0.007;
    }

    return { positions, colors, sizes, brightIndices };
  }, [totalParticles]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Slow rotation
      pointsRef.current.rotation.y += 0.0002;

      // Mouse parallax
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mouse.y * 0.05, 0.05);
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, mouse.x * 0.03, 0.05);

      // Scroll camera receding effect
      camera.position.z = 4 + scrollProgress * 3;
      camera.position.y = 1 - scrollProgress * 0.5;
      camera.lookAt(0, 0, 0);

      // Core pulse effect
      const geometry = pointsRef.current.geometry;
      const sizeAttribute = geometry.attributes.size;
      if (sizeAttribute) {
        const time = state.clock.elapsedTime;
        const pulseFactor = Math.sin(time * 0.8) * 0.5 + 0.5;
        
        brightIndices.forEach(idx => {
          // Base size is around 0.05-0.1, we pulse it
          const originalSize = sizes[idx];
          sizeAttribute.setX(idx, originalSize * (1 + pulseFactor * 0.5));
        });
        sizeAttribute.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
