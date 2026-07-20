'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import CanvasErrorBoundary from '@/components/canvas/CanvasErrorBoundary';

// Branded placeholder shown if WebGL can't initialise.
function HeroFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div
        className="w-40 h-40 rounded-full blur-2xl animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(217,122,79,0.5), rgba(184,50,50,0.15) 60%, transparent 75%)' }}
      />
      <span className="absolute font-display italic text-accent-primary/70 text-lg tracking-widest">A.S.</span>
    </div>
  );
}

// Soft radial-gradient sprite texture used for the glowing core seen through the gate.
// Built with a canvas (not a static asset) so the gradient/colors stay in sync with the
// theme. Safe to touch `document` here — components mounted inside <Canvas> only ever
// render client-side, never during SSR.
function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255, 225, 195, 1)');
    gradient.addColorStop(0.35, 'rgba(217, 122, 79, 0.65)');
    gradient.addColorStop(1, 'rgba(217, 122, 79, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);
}

// The glowing "energy core" at the center the orbital rings encircle —
// a soft halo sprite plus a brighter hot centre.
function GlowCore() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useGlowTexture();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    // Spin in the screen plane (z-axis) so the rotation actually reads face-on to camera.
    groupRef.current.rotation.z = time * 0.15;
    const pulse = 1 + Math.sin(time * 1.1) * 0.06;
    groupRef.current.scale.setScalar(pulse);
  });

  if (!texture) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer soft halo */}
      <sprite scale={[2, 2, 1]}>
        <spriteMaterial map={texture} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.85} />
      </sprite>
      {/* Bright hot centre */}
      <sprite scale={[0.65, 0.65, 1]}>
        <spriteMaterial map={texture} color="#fff0e0" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

// Armillary-sphere-like cluster of tilted rings, each spinning independently
// around its own axis, encircling the glow core like a gyroscope.
function OrbitalRings({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Subtle drift
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;

      // Mouse parallax tilt
      const targetX = mouse.x * 0.3;
      const targetY = -mouse.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
    }

    // Each ring spins independently around its own axis — the gyroscope look.
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.x = time * -0.22;
    if (ring3Ref.current) ring3Ref.current.rotation.y = time * 0.4;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ring1Ref} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#d97a4f" emissive="#d97a4f" emissiveIntensity={0.5} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-0.6, 0.3, 0]}>
        <torusGeometry args={[1.05, 0.018, 16, 100]} />
        <meshStandardMaterial color="#b83232" emissive="#b83232" emissiveIntensity={0.4} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0.2, -0.5, 0.3]}>
        <torusGeometry args={[0.8, 0.015, 16, 100]} />
        <meshStandardMaterial color="#8b8175" emissive="#8b8175" emissiveIntensity={0.3} roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

// Glowing Particles Cluster — embers swirling inside the glow core
function ParticlesCluster({ count = 260 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useRef(new Float32Array(count * 3));
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Bias radius toward the center (denser core, thinning outward) so embers
      // swarm around the glow core and rings rather than filling the whole scene.
      const r = 0.15 + Math.pow(Math.random(), 1.7) * 2.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions.current[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions.current[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions.current[i3 + 2] = r * Math.cos(phi) * 0.9;
    }
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    // Spin face-on (z) so the rotation is visible to camera, plus a gentle wobble.
    pointsRef.current.rotation.z = time * 0.12;
    pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#f2a877"
        size={0.055}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating Ambient Artifacts (drifting cubes/spheres)
function FloatingArtifacts() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, index) => {
      child.rotation.x += 0.01;
      child.rotation.y += 0.005;
      child.position.y += Math.sin(time + index) * 0.002;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[1.8, 1.0, -1.0]}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#d97a4f" wireframe roughness={0.1} />
      </mesh>
      <mesh position={[-1.8, -0.8, 0.8]}>
        <dodecahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#8b8175" wireframe roughness={0.1} />
      </mesh>
      <mesh position={[0.8, -1.4, -0.5]}>
        <icosahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#b83232" wireframe roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen pt-32 pb-16 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden border-b border-border-subtle"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left Column: Typography & Bio */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          <div className="font-mono text-[10px] tracking-[0.25em] text-accent-primary mb-6 uppercase flex items-center gap-3">
            <span>CHAPTER I</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-secondary">WHO AM I</span>
          </div>

          <h1 className="font-body font-bold text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[1.0] tracking-tight mb-8">
            <span className="text-text-secondary font-display font-light italic block mb-1">Hi, I&apos;m</span>
            <span className="text-gradient-accent animate-shimmer block">ANSH SINGH</span>
          </h1>

          <div className="font-display italic text-2xl sm:text-3xl text-accent-primary mb-8 tracking-wide">
            Agentic AI Engineer <span className="text-text-muted not-italic mx-1">·</span> Full-Stack Developer
          </div>

          <p className="font-body text-text-secondary text-base sm:text-lg max-w-xl leading-relaxed mb-10">
            Graduating May 2026 — building LLM-powered applications, RAG pipelines, and multi-agent orchestration systems. 
            Demonstrated performance delivering <span className="text-text-primary font-display italic">60% hallucination reduction</span> in production pipelines, 
            <span className="text-text-primary font-display italic">40% manual inspection optimization</span> for enterprise ML anomaly triaging, and 
            <span className="text-text-primary font-display italic">20% database query acceleration</span>.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-6 mb-12">
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="bg-accent-primary hover:bg-accent-primary/85 text-background px-8 py-3.5 rounded font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 font-semibold"
            >
              VIEW PROJECTS →
            </a>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="border border-[#f3eee3]/30 hover:border-accent-primary hover:text-accent-primary px-8 py-3.5 rounded font-mono text-[10px] tracking-widest uppercase transition-all duration-300"
            >
              GET IN TOUCH
            </a>
            <a 
              href="/Ansh-Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase text-text-primary hover:underline hover:underline-offset-4 ml-2"
            >
              RESUME ↓
            </a>
          </div>

          {/* Social Row */}
          <div className="flex items-center gap-8 font-mono text-[10px] tracking-[0.2em] text-text-secondary border-t border-border-subtle pt-8 w-full max-w-md">
            <a href="https://github.com/AnshSingh30" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">
              GITHUB
            </a>
            <a href="https://linkedin.com/in/ansh-singh" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">
              LINKEDIN
            </a>
            <a href="mailto:sansh3030@gmail.com" className="hover:text-accent-primary transition-colors">
              EMAIL
            </a>
          </div>
        </div>

        {/* Right Column: 3D Scene — corner-bracket "viewfinder" instead of a hard
            rectangle border, so the glow/rings can bleed to the edge without looking
            like they're cropped by a box. */}
        <div className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] w-full relative rounded-sm overflow-hidden">
          {/* Soft radial vignette so the scene fades into the page instead of cutting off */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(11,9,8,0.65) 100%)' }}
          />

          {/* Corner brackets (viewfinder framing, no continuous border line) */}
          <span className="absolute top-3 left-3 z-20 w-4 h-4 border-t border-l border-border-subtle pointer-events-none" />
          <span className="absolute top-3 right-3 z-20 w-4 h-4 border-t border-r border-border-subtle pointer-events-none" />
          <span className="absolute bottom-3 left-3 z-20 w-4 h-4 border-b border-l border-border-subtle pointer-events-none" />
          <span className="absolute bottom-3 right-3 z-20 w-4 h-4 border-b border-r border-border-subtle pointer-events-none" />

          {/* Lat/Long Readout */}
          <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.2em] text-text-secondary z-20 pointer-events-none select-none">
            LAT 26.85° N / LNG 80.95° E
          </div>
          <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.2em] text-text-muted z-20 pointer-events-none select-none uppercase">
            Location // Lucknow, India
          </div>

          {/* 3D R3F Canvas */}
          <CanvasErrorBoundary fallback={<HeroFallback />}>
            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 50 }}
              gl={{ alpha: true, antialias: true }}
              dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1}
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#d97a4f" />
              <pointLight position={[-5, 5, 5]} intensity={0.8} color="#b83232" />
              <pointLight position={[0, -5, -2]} intensity={0.5} color="#ffffff" />

              <OrbitalRings mouse={mouse} />
              <GlowCore />
              <ParticlesCluster count={260} />
              <FloatingArtifacts />

              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />

              <EffectComposer>
                <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.9} intensity={1.15} radius={0.55} mipmapBlur />
              </EffectComposer>
            </Canvas>
          </CanvasErrorBoundary>
        </div>
      </div>
    </section>
  );
}
