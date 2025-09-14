import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Utility functions for color management
function readHslTriplet(varName: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const [h, s, l] = raw.split(' ').map((v, i) => {
    if (i === 0) return parseFloat(v);
    return parseFloat(v.replace('%', ''));
  });
  return [h || 210, s || 100, l || 56];
}

function colorFromVar(varName: string, lightnessOffset = 0): THREE.Color {
  const [h, s, l] = readHslTriplet(varName);
  const color = new THREE.Color();
  color.setHSL(
    (h % 360) / 360, 
    Math.min(1, Math.max(0, s / 100)), 
    Math.min(1, Math.max(0, (l + lightnessOffset) / 100))
  );
  return color;
}

function toHexString(color: THREE.Color): string {
  return `#${color.getHexString()}`;
}

// Book types and themes
const bookThemes = [
  {
    title: "Grammar Master",
    subtitle: "Perfect Rules",
    arabic: "قواعد اللغة",
    color: '--primary',
    accent: '--neon-cyan',
    emissive: 0.3
  },
  {
    title: "Conversation",
    subtitle: "Speak Freely", 
    arabic: "المحادثة",
    color: '--accent',
    accent: '--neon-purple',
    emissive: 0.25
  },
  {
    title: "Business English",
    subtitle: "Professional",
    arabic: "الإنجليزية المهنية", 
    color: '--neon-cyan',
    accent: '--electric-blue',
    emissive: 0.35
  },
  {
    title: "Cultural Bridge", 
    subtitle: "Libya & World",
    arabic: "الجسر الثقافي",
    color: '--neon-purple',
    accent: '--neon-pink',
    emissive: 0.28
  },
  {
    title: "Tech English",
    subtitle: "Digital Future", 
    arabic: "الإنجليزية التقنية",
    color: '--electric-blue',
    accent: '--neon-green',
    emissive: 0.32
  }
];

interface BookProps {
  theme: typeof bookThemes[0];
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  animationDelay: number;
}

function ModernBook({ theme, position, rotation, scale, animationDelay }: BookProps) {
  const bookRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Dynamic colors from CSS variables
  const primaryColor = useMemo(() => colorFromVar(theme.color), [theme.color]);
  const accentColor = useMemo(() => colorFromVar(theme.accent), [theme.accent]);
  const darkColor = useMemo(() => colorFromVar(theme.color, -30), [theme.color]);
  const foreground = useMemo(() => colorFromVar('--foreground'), []);

  useFrame((state) => {
    if (!bookRef.current) return;
    
    const time = state.clock.elapsedTime + animationDelay;
    
    // Organic floating motion
    bookRef.current.position.y = position[1] + Math.sin(time * 0.4) * 0.15;
    bookRef.current.rotation.y = rotation[1] + Math.sin(time * 0.3) * 0.1;
    
    if (hovered) {
      bookRef.current.rotation.x = rotation[0] + Math.sin(time * 2) * 0.02;
      bookRef.current.scale.setScalar(scale * (1 + Math.sin(time * 4) * 0.01));
    }
  });

  return (
    <group 
      ref={bookRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main Book Body */}
      <RoundedBox
        args={[2.4, 3.2, 0.4]}
        radius={0.1}
        smoothness={16}
      >
        <meshPhysicalMaterial 
          color={hovered ? primaryColor : darkColor}
          roughness={0.08}
          metalness={0.9}
          clearcoat={1.5}
          clearcoatRoughness={0.03}
          emissive={primaryColor}
          emissiveIntensity={hovered ? theme.emissive * 1.5 : theme.emissive}
          envMapIntensity={2.5}
          transmission={0.05}
          thickness={0.1}
        />
      </RoundedBox>

      {/* Holographic Cover Design */}
      <RoundedBox
        args={[2.0, 0.6, 0.42]}
        position={[0, 0.8, 0]}
        radius={0.06}
      >
        <meshPhysicalMaterial 
          color={accentColor}
          roughness={0}
          metalness={1}
          emissive={accentColor}
          emissiveIntensity={hovered ? 0.6 : 0.4}
          clearcoat={2}
          transmission={0.3}
          thickness={0.05}
          transparent
        />
      </RoundedBox>

      {/* Central Glow Strip */}
      <RoundedBox
        args={[1.8, 0.15, 0.43]}
        position={[0, 0, 0]}
        radius={0.08}
      >
        <meshPhysicalMaterial 
          color={accentColor}
          roughness={0}
          metalness={0}
          emissive={accentColor}
          emissiveIntensity={hovered ? 1.2 : 0.8}
          transmission={0.95}
          thickness={0.02}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Bottom Accent */}
      <RoundedBox
        args={[2.0, 0.6, 0.42]}
        position={[0, -0.8, 0]}
        radius={0.06}
      >
        <meshPhysicalMaterial 
          color={primaryColor}
          roughness={0.02}
          metalness={0.95}
          emissive={primaryColor}
          emissiveIntensity={hovered ? 0.5 : 0.3}
          clearcoat={1.8}
          transmission={0.2}
        />
      </RoundedBox>

      {/* Text Elements */}
      <Text
        position={[0, 0.4, 0.22]}
        fontSize={0.24}
        color={toHexString(foreground)}
        anchorX="center"
        anchorY="middle"
        fontWeight="900"
        outlineWidth={0.02}
        outlineColor={toHexString(accentColor)}
      >
        {theme.title}
      </Text>

      <Text
        position={[0, 0.1, 0.22]}
        fontSize={0.14}
        color={toHexString(accentColor)}
        anchorX="center"
        anchorY="middle"
        fontWeight="700"
      >
        {theme.subtitle}
      </Text>

      <Text
        position={[0, -0.3, 0.22]}
        fontSize={0.12}
        color={toHexString(primaryColor)}
        anchorX="center"
        anchorY="middle"
        fontWeight="600"
      >
        {theme.arabic}
      </Text>

      {/* Floating Energy Orb */}
      <Sphere
        args={[0.08, 32, 32]}
        position={[
          Math.sin(Date.now() * 0.001 + animationDelay) * 1.5,
          Math.cos(Date.now() * 0.0008 + animationDelay) * 0.8 + 1.2,
          0.3
        ]}
      >
        <meshPhysicalMaterial 
          color={accentColor}
          roughness={0}
          metalness={0}
          transmission={0.98}
          thickness={0.5}
          emissive={accentColor}
          emissiveIntensity={0.8}
          opacity={0.9}
          transparent
        />
      </Sphere>
    </group>
  );
}

// Floating UI Elements
function FloatingUIElements() {
  const uiRef = useRef<THREE.Group>(null);
  const primaryColor = useMemo(() => colorFromVar('--primary'), []);
  const accentColor = useMemo(() => colorFromVar('--accent'), []);
  const neonCyan = useMemo(() => colorFromVar('--neon-cyan'), []);

  useFrame((state) => {
    if (!uiRef.current) return;
    
    const time = state.clock.elapsedTime;
    uiRef.current.rotation.y = time * 0.1;
  });

  return (
    <group ref={uiRef}>
      {/* Floating Progress Ring */}
      <Torus
        args={[2.8, 0.03, 16, 100]}
        position={[0, 0, -1]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial 
          color={neonCyan}
          emissive={neonCyan}
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </Torus>

      {/* Data Visualization Bars */}
      {[...Array(8)].map((_, i) => (
        <Cylinder
          key={i}
          args={[0.02, 0.02, 0.5 + Math.sin(i) * 0.3, 8]}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 3.5,
            -1.5 + Math.sin((i / 8) * Math.PI * 2) * 0.3,
            -0.5
          ]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshPhysicalMaterial 
            color={i % 2 === 0 ? primaryColor : accentColor}
            emissive={i % 2 === 0 ? primaryColor : accentColor}
            emissiveIntensity={0.4}
            transmission={0.8}
            transparent
            opacity={0.8}
          />
        </Cylinder>
      ))}

      {/* Achievement Badges */}
      {[...Array(6)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.12, 16, 16]}
          position={[
            Math.sin((i / 6) * Math.PI * 2) * 4.2,
            Math.cos((i / 6) * Math.PI * 2) * 2.5 + 1,
            Math.sin(i * 0.5) * 1.5
          ]}
        >
          <meshPhysicalMaterial 
            color={i % 3 === 0 ? primaryColor : i % 3 === 1 ? accentColor : neonCyan}
            emissive={i % 3 === 0 ? primaryColor : i % 3 === 1 ? accentColor : neonCyan}
            emissiveIntensity={0.5}
            transmission={0.7}
            transparent
            opacity={0.85}
          />
        </Sphere>
      ))}
    </group>
  );
}

export function ModernBookCollection() {
  return (
    <group>
      {/* Book Collection */}
      {bookThemes.map((theme, index) => {
        const angle = (index / bookThemes.length) * Math.PI * 2;
        const radius = 3.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index * 1.2) * 0.5;
        
        return (
          <ModernBook
            key={index}
            theme={theme}
            position={[x, y, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            scale={0.8 + Math.sin(index) * 0.1}
            animationDelay={index * 0.5}
          />
        );
      })}

      {/* Central Hologram */}
      <group position={[0, 0, 0]}>
        <Sphere args={[0.3, 32, 32]}>
          <meshPhysicalMaterial 
            color={colorFromVar('--neon-cyan')}
            roughness={0}
            metalness={0}
            transmission={0.95}
            thickness={0.8}
            emissive={colorFromVar('--neon-cyan')}
            emissiveIntensity={0.8}
            opacity={0.6}
            transparent
          />
        </Sphere>
        
        <Text
          position={[0, 0, 0]}
          fontSize={0.15}
          color={toHexString(colorFromVar('--foreground'))}
          anchorX="center"
          anchorY="middle"
          fontWeight="900"
        >
          Libya-Can
        </Text>
      </group>

      {/* Floating UI Elements */}
      <FloatingUIElements />

      {/* Ambient Particles */}
      {[...Array(15)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.03, 8, 8]}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 20
          ]}
        >
          <meshPhysicalMaterial 
            color={i % 4 === 0 ? colorFromVar('--primary') : 
                  i % 4 === 1 ? colorFromVar('--accent') :
                  i % 4 === 2 ? colorFromVar('--neon-cyan') : 
                  colorFromVar('--neon-purple')}
            emissive={i % 4 === 0 ? colorFromVar('--primary') : 
                     i % 4 === 1 ? colorFromVar('--accent') :
                     i % 4 === 2 ? colorFromVar('--neon-cyan') : 
                     colorFromVar('--neon-purple')}
            emissiveIntensity={0.6}
            transparent
            opacity={0.4}
          />
        </Sphere>
      ))}
    </group>
  );
}