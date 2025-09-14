import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import { LibyanBook } from './LibyanBook';
import * as THREE from 'three';

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
          <Environment resolution={512} background={false}>
            <Lightformer intensity={1.2} color={keyColor} position={[12, 12, 12]} scale={25} />
            <Lightformer intensity={0.8} color={fillColor} position={[-12, -8, -12]} scale={25} />
            <Lightformer intensity={0.6} color={rimColor} position={[0, 0, -20]} scale={35} />
            <Lightformer intensity={0.4} color={keyColor} position={[15, 5, 8]} scale={15} />
          </Environment>
          
          <ambientLight intensity={0.3} color={ambientColor} />
          
          {/* Primary Key Light - Cinematic */}
          <directionalLight 
            position={[8, 12, 10]} 
            intensity={2.5} 
            color={keyColor}
            castShadow
            shadow-mapSize={[4096, 4096]}
            shadow-camera-far={100}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
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