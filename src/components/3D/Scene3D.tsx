import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { LibyanBook } from './LibyanBook';

interface Scene3DProps {
  className?: string;
}

export function Scene3D({ className }: Scene3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.4} color="#E0E7FF" />
          <directionalLight position={[8, 8, 5]} intensity={1.5} color="#F59E0B" />
          <pointLight position={[-6, -6, -5]} intensity={0.8} color="#A855F7" />
          <pointLight position={[4, -4, 4]} intensity={0.6} color="#EC4899" />
          <spotLight position={[0, 10, 0]} intensity={0.5} color="#F59E0B" angle={0.3} />
          
          <LibyanBook />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}