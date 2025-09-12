import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import * as THREE from 'three';

export function LibyanBook() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <group>
      <Box
        ref={meshRef}
        args={[2, 2.8, 0.3]}
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#33B4E6" : "#1A8FCC"} 
          roughness={0.2}
          metalness={0.3}
          emissive={hovered ? "#0D4F6B" : "#0A3A52"}
          emissiveIntensity={0.2}
        />
      </Box>
      
      <Text
        position={[0, 0.3, 0.16]}
        fontSize={0.2}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Libya-Can
      </Text>
      
      <Text
        position={[0, -0.1, 0.16]}
        fontSize={0.12}
        color="#FBBF24"
        anchorX="center"
        anchorY="middle"
      >
        English Learning
      </Text>
      
      <Text
        position={[0, -0.3, 0.16]}
        fontSize={0.1}
        color="#FCD34D"
        anchorX="center"
        anchorY="middle"
      >
        تعلم الإنجليزية
      </Text>
      
      {/* Ocean sunset accent stripes */}
      <Box args={[2, 0.1, 0.31]} position={[0, 1, 0]}>
        <meshStandardMaterial 
          color="#F59E0B" 
          emissive="#F59E0B"
          emissiveIntensity={0.1}
        />
      </Box>
      <Box args={[2, 0.1, 0.31]} position={[0, -1, 0]}>
        <meshStandardMaterial 
          color="#1E40AF" 
          emissive="#1E40AF"
          emissiveIntensity={0.1}
        />
      </Box>
    </group>
  );
}