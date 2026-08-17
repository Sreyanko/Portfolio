import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ── Satellite Body ───────────────────────────────────────────
function SatelliteModel() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Central body */}
        <mesh>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.2}
            emissive="#00e5ff"
            emissiveIntensity={0.05}
          />
        </mesh>

        {/* Solar panel left */}
        <mesh position={[-1.8, 0, 0]}>
          <boxGeometry args={[2, 0.02, 0.8]} />
          <meshStandardMaterial
            color="#0a1628"
            metalness={0.8}
            roughness={0.3}
            emissive="#4a7dff"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Solar panel right */}
        <mesh position={[1.8, 0, 0]}>
          <boxGeometry args={[2, 0.02, 0.8]} />
          <meshStandardMaterial
            color="#0a1628"
            metalness={0.8}
            roughness={0.3}
            emissive="#4a7dff"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Panel connectors */}
        <mesh position={[-0.6, 0, 0]}>
          <boxGeometry args={[0.4, 0.05, 0.1]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0.6, 0, 0]}>
          <boxGeometry args={[0.4, 0.05, 0.1]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* Antenna dish */}
        <mesh position={[0, 0.5, 0]} rotation={[0.3, 0, 0]}>
          <coneGeometry args={[0.25, 0.15, 16, 1, true]} />
          <meshStandardMaterial
            color="#2a2a3e"
            metalness={0.8}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Antenna mast */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15]} />
          <meshStandardMaterial color="#3a3a4e" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Status light */}
        <mesh position={[0, -0.35, 0.4]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
        <pointLight color="#00e5ff" intensity={0.5} distance={3} position={[0, -0.35, 0.4]} />
      </group>
    </Float>
  );
}

// ── Orbital Ring ─────────────────────────────────────────────
function OrbitalPath() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.005, 16, 100]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[5, 0.003, 16, 100]} />
        <meshBasicMaterial color="#4a7dff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

// ── Small Orbiting Particles ─────────────────────────────────
function OrbitParticles({ count = 30 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 3.5 + Math.random() * 2;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00e5ff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── Main Scene ───────────────────────────────────────────────
const Satellite = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Canvas
      camera={{ position: [0, 1, 6], fov: 40 }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <fog attach="fog" args={['#050508', 5, 20]} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
      <directionalLight position={[-3, 2, -3]} intensity={0.15} color="#4a7dff" />

      <SatelliteModel />
      <OrbitalPath />
      <OrbitParticles count={isMobile ? 15 : 30} />
    </Canvas>
  );
};

export default Satellite;
