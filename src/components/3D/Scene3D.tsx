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
  const ambientColor = useMemo(() => colorFromVar('--primary', -35), []);
  const keyColor = useMemo(() => colorFromVar('--accent', 10), []);
  const fillColor = useMemo(() => colorFromVar('--primary', -20), []);
  const rimColor = useMemo(() => colorFromVar('--primary', 15), []);

  return (
    <div className={className}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 35 }} 
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment resolution={256} background={false}>
            <Lightformer intensity={0.8} color={keyColor} position={[10, 10, 10]} scale={20} />
            <Lightformer intensity={0.5} color={fillColor} position={[-10, -10, -10]} scale={20} />
            <Lightformer intensity={0.3} color={rimColor} position={[0, 0, -15]} scale={30} />
          </Environment>
          
          <ambientLight intensity={0.2} color={ambientColor} />
          
          {/* Key Light */}
          <directionalLight 
            position={[5, 8, 6]} 
            intensity={1.8} 
            color={keyColor}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* Fill Light */}
          <pointLight 
            position={[-8, -4, -3]} 
            intensity={1.2} 
            color={fillColor}
            distance={20}
            decay={2}
          />
          
          {/* Rim Light */}
          <spotLight 
            position={[0, 12, -8]} 
            intensity={0.8} 
            color={rimColor}
            angle={0.4} 
            penumbra={0.8}
            distance={25}
            decay={2}
          />
          
          {/* Accent Lights */}
          <pointLight 
            position={[6, -2, 4]} 
            intensity={0.6} 
            color={keyColor}
            distance={15}
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