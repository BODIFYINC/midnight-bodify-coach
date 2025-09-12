import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { LibyanBook } from './LibyanBook';
import * as THREE from 'three';

interface Scene3DProps {
  className?: string;
}

function readHslTriplet(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const [h, s, l] = raw.split(' ').map((v, i) => (i === 0 ? parseFloat(v) : parseFloat(v.replace('%', ''))));
  return [h || 190, s || 80, l || 45];
}

function colorFromVar(varName: string, lOffset = 0) {
  const [h, s, l] = readHslTriplet(varName);
  const c = new THREE.Color();
  c.setHSL((h % 360) / 360, Math.min(1, Math.max(0, s / 100)), Math.min(1, Math.max(0, (l + lOffset) / 100)));
  return c;
}

export function Scene3D({ className }: Scene3DProps) {
  const ambientC = useMemo(() => colorFromVar('--foreground', -70), []);
  const warmKey = useMemo(() => colorFromVar('--accent', -5), []);
  const coolFill = useMemo(() => colorFromVar('--primary', -10), []);

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
          <ambientLight intensity={0.35} color={ambientC} />
          <directionalLight position={[8, 8, 5]} intensity={1.1} color={warmKey} />
          <pointLight position={[-6, -6, -5]} intensity={0.6} color={coolFill} />
          <pointLight position={[4, -4, 4]} intensity={0.4} color={warmKey} />
          <spotLight position={[0, 10, 0]} intensity={0.4} color={coolFill} angle={0.3} penumbra={0.6} />

          <LibyanBook />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        </Suspense>
      </Canvas>
    </div>
  );
}