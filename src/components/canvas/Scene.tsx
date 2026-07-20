'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import GalaxyField from './GalaxyField';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 60 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1}
    >
      <color attach="background" args={['#000000']} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} color="#ffffff" intensity={2} distance={3} />
      
      <GalaxyField />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={1.5} radius={0.4} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
