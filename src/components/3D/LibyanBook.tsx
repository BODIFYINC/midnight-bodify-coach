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
        args={[2.2, 3, 0.35]}
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#A855F7" : "#7C3AED"} 
          roughness={0.15}
          metalness={0.4}
          emissive={hovered ? "#4C1D95" : "#3730A3"}
          emissiveIntensity={0.3}
        />
      </Box>
      
      <Text
        position={[0, 0.4, 0.18]}
        fontSize={0.22}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Libya-Can
      </Text>
      
      <Text
        position={[0, 0, 0.18]}
        fontSize={0.14}
        color="#FCD34D"
        anchorX="center"
        anchorY="middle"
        fontWeight="600"
      >
        English Learning
      </Text>
      
      <Text
        position={[0, -0.35, 0.18]}
        fontSize={0.11}
        color="#FEF3C7"
        anchorX="center"
        anchorY="middle"
        fontWeight="500"
      >
        تعلم الإنجليزية
      </Text>
      
      {/* Premium accent design */}
      <Box args={[2.2, 0.12, 0.36]} position={[0, 1.2, 0]}>
        <meshStandardMaterial 
          color="#F59E0B" 
          emissive="#F59E0B"
          emissiveIntensity={0.15}
          roughness={0.1}
          metalness={0.6}
        />
      </Box>
      <Box args={[2.2, 0.12, 0.36]} position={[0, -1.2, 0]}>
        <meshStandardMaterial 
          color="#A855F7" 
          emissive="#A855F7"
          emissiveIntensity={0.15}
          roughness={0.1}
          metalness={0.6}
        />
      </Box>
    </group>
  );
}