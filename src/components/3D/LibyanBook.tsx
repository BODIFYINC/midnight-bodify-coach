import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import * as THREE from 'three';

function readHslTriplet(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  // Expecting format like: "190 90% 45%"
  const [h, s, l] = raw.split(' ').map((v, i) => {
    if (i === 0) return parseFloat(v);
    return parseFloat(v.replace('%', ''));
  });
  return [h || 190, s || 80, l || 45];
}

function colorFromVar(varName: string, lightnessOffset = 0): THREE.Color {
  const [h, s, l] = readHslTriplet(varName);
  const color = new THREE.Color();
  color.setHSL((h % 360) / 360, Math.min(1, Math.max(0, s / 100)), Math.min(1, Math.max(0, (l + lightnessOffset) / 100)));
  return color;
}

function toHexString(color: THREE.Color) {
  return `#${color.getHexString()}`;
}

export function LibyanBook() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const primary = useMemo(() => colorFromVar('--primary'), []);
  const primaryHover = useMemo(() => colorFromVar('--primary', 6), []);
  const accent = useMemo(() => colorFromVar('--accent'), []);
  const foreground = useMemo(() => colorFromVar('--foreground'), []);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle float
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.08;
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
          color={hovered ? primaryHover : primary}
          roughness={0.2}
          metalness={0.35}
          emissive={accent}
          emissiveIntensity={0.12}
        />
      </Box>

      <Text
        position={[0, 0.4, 0.18]}
        fontSize={0.22}
        color={toHexString(accent)}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Libya-Can
      </Text>

      <Text
        position={[0, 0, 0.18]}
        fontSize={0.14}
        color={toHexString(primary)}
        anchorX="center"
        anchorY="middle"
        fontWeight="600"
      >
        English Learning
      </Text>

      <Text
        position={[0, -0.35, 0.18]}
        fontSize={0.11}
        color={toHexString(foreground)}
        anchorX="center"
        anchorY="middle"
        fontWeight="500"
      >
        تعلم الإنجليزية
      </Text>

      {/* Subtle accents */}
      <Box args={[2.2, 0.12, 0.36]} position={[0, 1.2, 0]}>
        <meshStandardMaterial 
          color={accent}
          emissive={accent}
          emissiveIntensity={0.08}
          roughness={0.18}
          metalness={0.5}
        />
      </Box>
      <Box args={[2.2, 0.12, 0.36]} position={[0, -1.2, 0]}>
        <meshStandardMaterial 
          color={primary}
          emissive={primary}
          emissiveIntensity={0.06}
          roughness={0.18}
          metalness={0.5}
        />
      </Box>
    </group>
  );
}