import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import { LibyanBook } from './LibyanBook';
import * as THREE from 'three';

// Patch: prevent react-three-fiber from crashing when the dev tagger injects
// dashed data-* props (e.g., data-lov-id, data-path). R3F treats dash-cased
// props as deep paths and will traverse instance.data.lov.path, etc. Ensure
// those objects exist on common Three.js prototypes used by R3F instances.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ensureLovData = (proto: any) => {
  try {
    proto.data ??= {};
    proto.data.lov ??= {};
  } catch {
    // Some prototypes may not allow direct assignment; fall back gracefully.
    try {
      Object.defineProperty(proto, 'data', { value: { lov: {} }, writable: true, configurable: true });
    } catch {/* ignore */}
  }
};
// Apply to common instance types created by R3F
ensureLovData((THREE.Object3D as any).prototype);
ensureLovData((THREE.Material as any).prototype);
ensureLovData((THREE.BufferGeometry as any).prototype);
// Optional extras for safety
if ((THREE.Texture as any)?.prototype) ensureLovData((THREE.Texture as any).prototype);

interface Scene3DProps {
  className?: string;
}

function readHslTriplet(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const [h, s, l] = raw.split(' ').map((v, i) => (i === 0 ? parseFloat(v) : parseFloat(v.replace('%', ''))));
  return [h || 185, s || 85, l || 55];
}

function colorFromVar(varName: string, lOffset = 0) {
  const [h, s, l] = readHslTriplet(varName);
  const c = new THREE.Color();
  c.setHSL((h % 360) / 360, Math.min(1, Math.max(0, s / 100)), Math.min(1, Math.max(0, (l + lOffset) / 100)));
  return c;
}

export function Scene3D({ className }: Scene3DProps) {
  const ambientColor = useMemo(() => colorFromVar('--primary', -40), []);
  const keyColor = useMemo(() => colorFromVar('--neon-cyan', 20), []);
  const fillColor = useMemo(() => colorFromVar('--accent', -10), []);
  const rimColor = useMemo(() => colorFromVar('--neon-purple', 25), []);

  return (
    <div className={className}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 35 }} 
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Environment temporarily disabled to resolve runtime error */}
          
          <ambientLight intensity={0.3} color={ambientColor} />
          
          <directionalLight 
            position={[8, 12, 10]} 
            intensity={2.2} 
            color={keyColor}
            castShadow
          />
          
          {/* Accent Fill Light */}
          <pointLight 
            position={[-10, -6, -5]} 
            intensity={1.8} 
            color={fillColor}
            distance={30}
            decay={1.5}
          />
          
          {/* Dramatic Rim Light */}
          <spotLight 
            position={[0, 15, -12]} 
            intensity={1.2} 
            color={rimColor}
            angle={0.5} 
            penumbra={0.9}
            distance={40}
            decay={1.8}
          />
          
          {/* Additional Accent Lights for Depth */}
          <pointLight 
            position={[10, -3, 6]} 
            intensity={0.8} 
            color={keyColor}
            distance={20}
          />
          
          <pointLight 
            position={[-6, 8, -4]} 
            intensity={0.6} 
            color={rimColor}
            distance={18}
          />

          <LibyanBook />

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.15}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}