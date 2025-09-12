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
          <Environment preset="sunset" />
          <ambientLight intensity={0.3} color="#FEF3C7" />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FBBF24" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3B82F6" />
          <pointLight position={[3, -3, 3]} intensity={0.4} color="#A855F7" />
          
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