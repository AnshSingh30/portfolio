'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CanvasErrorBoundary from '@/components/canvas/CanvasErrorBoundary';

// The dolly stages — what I build — reused by the 3D scene and the no-WebGL fallback.
// The camera flies through them front-to-back, so read this list as the journey order.
const DOLLY_STAGES = [
  { foreground: 'AGENTIC AI SYSTEMS', background: 'PYTHON · C++' },
  { foreground: 'PRODUCTION RAG', background: 'FAISS · POSTGRES · SUPABASE' },
  { foreground: 'MULTI-AGENT FLOWS', background: 'LANGCHAIN · LLAMAINDEX' },
  { foreground: 'FULL-STACK PRODUCTS', background: 'REACT · FASTAPI · DOCKER' },
  { foreground: 'UNIVERSITY PLATFORM', background: 'FLUTTER · SUPABASE · REALTIME' },
  { foreground: 'ORCHESTRATOR OF MODELS', background: 'INTELLIGENCE · SCALE' },
] as const;

// Stage layout: each stage sits STAGE_GAP units deeper along -Z than the last.
const STAGE_GAP = 12;
const STAGE_COUNT = DOLLY_STAGES.length;
const LAST_STAGE_Z = -(STAGE_COUNT - 1) * STAGE_GAP;

// Drifting wireframes scattered through the full depth the camera travels. Generated
// deterministically (no Math.random, so no per-render jitter) so the field automatically
// fills however many stages DOLLY_STAGES defines.
const SHAPE_COLORS = ['#d97a4f', '#8b8175', '#b83232'];
const SHAPES: { pos: [number, number, number]; size: number; color: string }[] = Array.from(
  { length: STAGE_COUNT * 3 },
  (_, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const x = side * (1.5 + ((i * 7) % 11) / 10); // 1.5 .. 2.5
    const y = ((i * 13) % 29) / 10 - 1.4; // -1.4 .. 1.4
    const z = -4 - (i * (Math.abs(LAST_STAGE_Z) + 3)) / (STAGE_COUNT * 3);
    const size = 0.35 + ((i * 5) % 6) / 20; // 0.35 .. 0.6
    return { pos: [x, y, z], size, color: SHAPE_COLORS[i % SHAPE_COLORS.length] };
  }
);

// Static, readable fallback shown when WebGL is unavailable.
function DollyFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10 px-8">
      {DOLLY_STAGES.map((stage) => (
        <div key={stage.foreground} className="text-center">
          <div className="font-mono text-[9px] tracking-[0.3em] text-text-muted uppercase mb-1">
            {stage.background}
          </div>
          <div className="font-display italic text-2xl sm:text-4xl text-accent-primary uppercase tracking-wider">
            {stage.foreground}
          </div>
        </div>
      ))}
    </div>
  );
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 3D Polyhedron component drifting in space
function WireframeShape({ position, size = 0.6, color = '#8b8175' }: { position: [number, number, number]; size?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2 + position[0];
    meshRef.current.rotation.y = time * 0.1 + position[1];
    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(time + position[2]) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
    </mesh>
  );
}

// Smootherstep easing for a cinematic ease-in/ease-out feel
function smootherstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

// Camera dolly path constants
const START_Z = 6; // camera starts here (stage 1 sits at z=0, 6 units ahead → readable)
const END_Z = LAST_STAGE_Z + 6; // stop 6 units in FRONT of the final stage so it stays readable
const TRAVEL = 0.82; // fraction of scroll spent travelling; the rest HOLDS on the final content

// Interactive Scene component inside Canvas
function DollyScene({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  // Stages laid out along Z, STAGE_GAP units apart (0, -12, -24, …).
  const stages = DOLLY_STAGES.map((s, i) => ({ ...s, z: i * -STAGE_GAP }));

  // Deterministic camera target for this scrollProgress — a pure function of props,
  // unlike camera.position.z which only *approaches* it via per-frame lerp inside
  // useFrame. Opacity below is derived from THIS, not the live camera position: on a
  // fast/instant scroll jump the smoothed camera can take many frames to catch up,
  // and since React only recalculates opacity when scrollProgress changes, deriving
  // it from the lagging camera position left text stuck invisible after a quick jump.
  const travelT = smootherstep(0, TRAVEL, scrollProgress);
  const targetZ = THREE.MathUtils.lerp(START_Z, END_Z, travelT);

  useFrame(() => {
    // Dolly camera: travel through Z during the first TRAVEL of the scroll, then HOLD.
    // This guarantees the final stage stays framed and readable until the section
    // releases — the next chapter arrives *after* the last content, not mid-void.
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.12);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.lookAt(0, 0, camera.position.z - 10);
  });

  return (
    <group>
      {/* Light Source */}
      <ambientLight intensity={0.5} />

      {/* Shapes */}
      {SHAPES.map((s, idx) => (
        <WireframeShape key={idx} position={s.pos} size={s.size} color={s.color} />
      ))}

      {/* Text Stages */}
      {stages.map((stage, index) => {
        // Distance from the camera's TARGET position (not its lerped-toward-target
        // live position — see targetZ comment above) to this stage's plane.
        const distanceToCam = targetZ - stage.z;

        // Clip stages the camera has already flown past.
        if (distanceToCam < -1) return null;

        // Opacity band — text emerges from the distance, holds while readable,
        // then dissolves as the camera flies through it:
        //   d <= 0        camera has passed  → 0
        //   0 < d < 4     flying through      → fade out
        //   4 <= d <= 12  readable window     → 1
        //   12 < d < 18   still approaching   → fade in
        //   d >= 18       too far             → 0
        let opacity = 0;
        if (distanceToCam <= 0) {
          opacity = 0;
        } else if (distanceToCam < 4) {
          opacity = distanceToCam / 4;
        } else if (distanceToCam <= 12) {
          opacity = 1;
        } else if (distanceToCam < 18) {
          opacity = (18 - distanceToCam) / 6;
        }

        return (
          <group key={index} position={[0, 0, stage.z]}>
            <Html
              transform
              center
              distanceFactor={3}
              pointerEvents="none"
              style={{
                transition: 'opacity 0.1s ease-out',
                opacity: opacity,
              }}
            >
              <div className="flex flex-col items-center justify-center text-center select-none w-[60vw]">
                {/* Background Wordmark (tech stack) */}
                <div 
                  className="font-body font-bold text-[5rem] sm:text-[8rem] lg:text-[10rem] tracking-widest leading-none select-none opacity-5 uppercase select-none pointer-events-none"
                  style={{
                    WebkitTextStroke: '1.5px #f3eee3',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stage.background}
                </div>
                
                {/* Foreground Word (identity/role) */}
                <div 
                  className="font-display italic text-3xl sm:text-5xl lg:text-6xl text-accent-primary leading-tight mt-[-2rem] sm:mt-[-4rem] drop-shadow-[0_0_20px_rgba(217,122,79,0.35)] select-none uppercase tracking-wider"
                >
                  {stage.foreground}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function Dolly() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: containerRef.current,
      pinType: 'transform',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  // Which stage the camera is currently framing (drives the HUD).
  const activeStage = Math.min(STAGE_COUNT, Math.floor((scrollProgress / TRAVEL) * STAGE_COUNT) + 1);

  return (
    <div id="dolly" ref={sectionRef} className="relative w-full h-[460vh] bg-[#0b0908]">
      {/* Pinned container */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Cinematic labeling chrome */}
        <div className="absolute top-6 left-6 z-20 font-mono text-[10px] tracking-[0.25em] text-accent-primary uppercase flex items-center gap-3">
          <span>CHAPTER II</span>
          <span className="text-text-muted">/</span>
          <span className="text-text-secondary">WHAT I BUILD</span>
        </div>

        {/* Live stage HUD (top-right) */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          {Array.from({ length: STAGE_COUNT }, (_, i) => i + 1).map((n) => (
            <span
              key={n}
              className={`h-[3px] w-4 sm:w-5 rounded-full transition-all duration-300 ${
                n <= activeStage ? 'bg-accent-primary shadow-[0_0_8px_#d97a4f]' : 'bg-border-subtle'
              }`}
            />
          ))}
          <span className="ml-2 font-mono text-[9px] tracking-[0.2em] text-text-secondary tabular-nums">
            {String(activeStage).padStart(2, '0')} / {String(STAGE_COUNT).padStart(2, '0')}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-[0.2em] text-text-secondary">
          02 / WHAT I BUILD
        </div>

        <div className="absolute bottom-6 right-6 z-20 font-mono text-[9px] tracking-[0.2em] text-text-muted text-right uppercase">
          {scrollProgress >= TRAVEL ? 'ARRIVED — SCROLL TO CONTINUE' : 'SCROLL — CAMERA TRAVELS THROUGH Z'}
        </div>

        {/* 3D Canvas */}
        <div className="w-full h-full z-10">
          <CanvasErrorBoundary fallback={<DollyFallback />}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 60 }}
              gl={{ alpha: true, antialias: true }}
              dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1}
            >
              {/* Depth fog so distant shapes dissolve into the void for a sense of travel.
                  Far plane sits just beyond the last stage so nothing pops in abruptly. */}
              <fog attach="fog" args={['#0b0908', 9, Math.abs(LAST_STAGE_Z) + 12]} />
              <DollyScene scrollProgress={scrollProgress} />
            </Canvas>
          </CanvasErrorBoundary>
        </div>

        {/* Cinematic vignette + centre focus reticle */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(11,9,8,0.55) 100%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="relative w-16 h-16 opacity-30">
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent-primary" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-primary" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent-primary" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-primary" />
          </div>
        </div>

        {/* Visual progress bar at bottom of dolly scene */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border-subtle z-20">
          <div 
            className="h-full bg-accent-primary transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
