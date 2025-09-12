import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function readHslTriplet(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const [h, s, l] = raw.split(' ').map((v, i) => {
    if (i === 0) return parseFloat(v);
    return parseFloat(v.replace('%', ''));
  });
  return [h || 185, s || 85, l || 55];
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
  const bookRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const primary = useMemo(() => colorFromVar('--primary'), []);
  const primaryDark = useMemo(() => colorFromVar('--primary', -15), []);
  const accent = useMemo(() => colorFromVar('--accent'), []);
  const foreground = useMemo(() => colorFromVar('--foreground'), []);

  useFrame((state) => {
    if (bookRef.current) {
      // Organic floating motion
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      bookRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
      
      if (hovered) {
        bookRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
        bookRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.02);
      }
    }

    if (orbRef.current) {
      // Floating orb
      orbRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.8) * 1.5;
      orbRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.6) * 0.8 + 1.2;
      orbRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
    }
  });

  return (
    <group>
      {/* Main Book */}
      <group 
        ref={bookRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <RoundedBox
          args={[2.4, 3.2, 0.4]}
          position={[0, 0, 0]}
          radius={0.1}
          smoothness={8}
        >
          <meshPhysicalMaterial 
            color={hovered ? primary : primaryDark}
            roughness={0.15}
            metalness={0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive={primary}
            emissiveIntensity={hovered ? 0.15 : 0.08}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* Cover Design Elements */}
        <RoundedBox
          args={[2.0, 0.6, 0.42]}
          position={[0, 0.8, 0]}
          radius={0.05}
        >
          <meshPhysicalMaterial 
            color={accent}
            roughness={0.1}
            metalness={0.8}
            emissive={accent}
            emissiveIntensity={0.2}
          />
        </RoundedBox>

        <RoundedBox
          args={[2.0, 0.6, 0.42]}
          position={[0, -0.8, 0]}
          radius={0.05}
        >
          <meshPhysicalMaterial 
            color={accent}
            roughness={0.1}
            metalness={0.8}
            emissive={accent}
            emissiveIntensity={0.2}
          />
        </RoundedBox>

        {/* Text Elements */}
        <Text
          position={[0, 0.3, 0.21]}
          fontSize={0.26}
          color={toHexString(foreground)}
          anchorX="center"
          anchorY="middle"
          fontWeight="900"
          outlineWidth={0.02}
          outlineColor={toHexString(primary)}
        >
          Libya-Can
        </Text>

        <Text
          position={[0, -0.1, 0.21]}
          fontSize={0.16}
          color={toHexString(accent)}
          anchorX="center"
          anchorY="middle"
          fontWeight="700"
        >
          English Learning
        </Text>

        <Text
          position={[0, -0.45, 0.21]}
          fontSize={0.12}
          color={toHexString(foreground)}
          anchorX="center"
          anchorY="middle"
          fontWeight="600"
        >
          تعلم الإنجليزية
        </Text>
      </group>

      {/* Floating Accent Orb */}
      <Sphere
        ref={orbRef}
        args={[0.15, 32, 32]}
      >
        <meshPhysicalMaterial 
          color={accent}
          roughness={0}
          metalness={0}
          transmission={0.9}
          thickness={0.5}
          emissive={accent}
          emissiveIntensity={0.3}
          opacity={0.8}
          transparent
        />
      </Sphere>

      {/* Ambient Light Points */}
      {[...Array(5)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.04, 16, 16]}
          position={[
            Math.sin(i * 1.26) * 3,
            Math.cos(i * 0.95) * 2,
            Math.sin(i * 0.73) * 1.5
          ]}
        >
          <meshBasicMaterial 
            color={i % 2 === 0 ? primary : accent}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
}