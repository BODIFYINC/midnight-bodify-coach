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

  const primary = useMemo(() => colorFromVar('--violet'), []);
  const primaryDark = useMemo(() => colorFromVar('--violet', -20), []);
  const accent = useMemo(() => colorFromVar('--accent'), []);
  const indigo = useMemo(() => colorFromVar('--indigo'), []);
  const amber = useMemo(() => colorFromVar('--amber'), []);
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
          args={[2.6, 3.4, 0.5]}
          position={[0, 0, 0]}
          radius={0.12}
          smoothness={12}
        >
          <meshPhysicalMaterial 
            color={hovered ? primary : primaryDark}
            roughness={0.1}
            metalness={0.8}
            clearcoat={1.2}
            clearcoatRoughness={0.05}
            emissive={hovered ? indigo : primary}
            emissiveIntensity={hovered ? 0.15 : 0.08}
            envMapIntensity={2.0}
            transmission={0.1}
            thickness={0.2}
          />
        </RoundedBox>

        {/* Futuristic Cover Elements */}
        <RoundedBox
          args={[2.2, 0.7, 0.52]}
          position={[0, 0.9, 0]}
          radius={0.08}
        >
          <meshPhysicalMaterial 
            color={accent}
            roughness={0.05}
            metalness={0.9}
            emissive={accent}
            emissiveIntensity={hovered ? 0.35 : 0.25}
            clearcoat={1}
            transmission={0.15}
          />
        </RoundedBox>

        <RoundedBox
          args={[2.2, 0.7, 0.52]}
          position={[0, -0.9, 0]}
          radius={0.08}
        >
          <meshPhysicalMaterial 
            color={amber}
            roughness={0.05}
            metalness={0.9}
            emissive={amber}
            emissiveIntensity={hovered ? 0.2 : 0.15}
            clearcoat={1}
            transmission={0.15}
          />
        </RoundedBox>

        {/* Central Glow Element */}
        <RoundedBox
          args={[1.8, 0.3, 0.53]}
          position={[0, 0, 0]}
          radius={0.1}
        >
          <meshPhysicalMaterial 
            color={indigo}
            roughness={0}
            metalness={0}
            emissive={indigo}
            emissiveIntensity={hovered ? 0.4 : 0.25}
            transmission={0.9}
            thickness={0.1}
            transparent
            opacity={0.8}
          />
        </RoundedBox>

        {/* Text Elements */}
        <Text
          position={[0, 0.4, 0.26]}
          fontSize={0.32}
          color={toHexString(foreground)}
          anchorX="center"
          anchorY="middle"
          fontWeight="900"
          outlineWidth={0.03}
          outlineColor={toHexString(indigo)}
        >
          Libya-Can
        </Text>

        <Text
          position={[0, -0.05, 0.26]}
          fontSize={0.18}
          color={toHexString(accent)}
          anchorX="center"
          anchorY="middle"
          fontWeight="800"
          outlineWidth={0.01}
          outlineColor={toHexString(amber)}
        >
          Future Learning
        </Text>

        <Text
          position={[0, -0.5, 0.26]}
          fontSize={0.14}
          color={toHexString(indigo)}
          anchorX="center"
          anchorY="middle"
          fontWeight="700"
        >
          تعلم المستقبل
        </Text>
      </group>

      {/* Floating Neon Orbs */}
      <Sphere
        ref={orbRef}
        args={[0.18, 32, 32]}
      >
        <meshPhysicalMaterial 
          color={indigo}
          roughness={0}
          metalness={0}
          transmission={0.95}
          thickness={0.8}
          emissive={indigo}
          emissiveIntensity={0.3}
          opacity={0.9}
          transparent
        />
      </Sphere>

      {/* Secondary Floating Orb */}
      <Sphere
        args={[0.12, 32, 32]}
        position={[
          Math.sin(Date.now() * 0.001) * 2.5,
          Math.cos(Date.now() * 0.0008) * 1.2 + 0.8,
          Math.sin(Date.now() * 0.0006) * 0.8
        ]}
      >
        <meshPhysicalMaterial 
          color={amber}
          roughness={0}
          metalness={0}
          transmission={0.9}
          thickness={0.6}
          emissive={amber}
          emissiveIntensity={0.25}
          opacity={0.85}
          transparent
        />
      </Sphere>

      {/* Energy Particles */}
      {[...Array(8)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.06, 16, 16]}
          position={[
            Math.sin(i * 0.785) * 3.5,
            Math.cos(i * 0.785) * 2.5,
            Math.sin(i * 0.524) * 2
          ]}
        >
          <meshPhysicalMaterial 
            color={i % 3 === 0 ? indigo : i % 3 === 1 ? amber : accent}
            emissive={i % 3 === 0 ? indigo : i % 3 === 1 ? amber : accent}
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
            transmission={0.3}
          />
        </Sphere>
      ))}

      {/* Floating UI Elements */}
      <group position={[2.2, 1.5, 0.5]}>
        <RoundedBox args={[0.8, 0.3, 0.05]} radius={0.05}>
          <meshPhysicalMaterial 
            color={primary}
            emissive={primary}
            emissiveIntensity={0.3}
            transmission={0.8}
            opacity={0.9}
            transparent
          />
        </RoundedBox>
      </group>

      <group position={[-2.2, -1.5, 0.5]}>
        <RoundedBox args={[0.8, 0.3, 0.05]} radius={0.05}>
          <meshPhysicalMaterial 
            color={accent}
            emissive={accent}
            emissiveIntensity={0.3}
            transmission={0.8}
            opacity={0.9}
            transparent
          />
        </RoundedBox>
      </group>
    </group>
  );
}