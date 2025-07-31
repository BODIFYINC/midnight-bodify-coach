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
          color={hovered ? "#2F7D32" : "#1B5E20"} 
          roughness={0.3}
          metalness={0.1}
        />
      </Box>
      
      <Text
        position={[0, 0.3, 0.16]}
        fontSize={0.2}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Libya-Can
      </Text>
      
      <Text
        position={[0, -0.1, 0.16]}
        fontSize={0.12}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        English Learning
      </Text>
      
      <Text
        position={[0, -0.3, 0.16]}
        fontSize={0.1}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        تعلم الإنجليزية
      </Text>
      
      {/* Libya flag colors accent */}
      <Box args={[2, 0.1, 0.31]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#FF0000" />
      </Box>
      <Box args={[2, 0.1, 0.31]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#000000" />
      </Box>
    </group>
  );
}