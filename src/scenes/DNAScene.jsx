import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Digital Network Cylinder ──────────────────────────────────
function NetworkCylinder() {
  const groupRef = useRef();
  const pointsCount = 80;
  const radius = 1.5;
  const height = 8;

  // Generate cylinder network positions
  const { nodes1, nodes2, connections } = useMemo(() => {
    const s1 = [];
    const s2 = [];
    const conn = [];

    for (let i = 0; i < pointsCount; i++) {
      // Create a more structured cylindrical grid rather than a twisted helix
      const angle = (i % 8) * (Math.PI / 4);
      const y = (Math.floor(i / 8) / 10) * height - height / 2;

      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI / 4) * (radius * 0.7); // inner cylinder
      const z2 = Math.sin(angle + Math.PI / 4) * (radius * 0.7);

      s1.push(new THREE.Vector3(x1, y, z1));
      s2.push(new THREE.Vector3(x2, y, z2));

      // Connect nodes in a structured tech-grid way
      if (i > 0 && i % 8 !== 0) {
        conn.push({ from: s1[i], to: s1[i - 1] });
        conn.push({ from: s2[i], to: s2[i - 1] });
      } else if (i % 8 === 0 && i > 0) {
        // connect back to start of ring
        conn.push({ from: s1[i - 1], to: s1[i - 8] });
        conn.push({ from: s2[i - 1], to: s2[i - 8] });
      }

      // connect between rings
      if (i >= 8) {
         conn.push({ from: s1[i], to: s1[i - 8] });
      }

      // Cross connections between inner and outer cylinder randomly
      if (Math.random() > 0.7) {
        conn.push({ from: s1[i], to: s2[i] });
      }
    }

    return { nodes1: s1, nodes2: s2, connections: conn };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer nodes */}
      {nodes1.map((pos, i) => (
        <mesh key={`s1-${i}`} position={pos}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Inner nodes */}
      {nodes2.map((pos, i) => (
        <mesh key={`s2-${i}`} position={pos}>
          <boxGeometry args={[0.03, 0.03, 0.03]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Connection lines */}
      {connections.map((conn, i) => {
        const points = [conn.from, conn.to];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={`conn-${i}`} geometry={geometry}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </line>
        );
      })}

      {/* Central glow */}
      <pointLight color="#00e5ff" intensity={1.5} distance={8} position={[0, 0, 0]} />
      <pointLight color="#8b5cf6" intensity={1} distance={6} position={[0, 2, 0]} />
    </group>
  );
}

// ── Main Network Scene ───────────────────────────────────────────
const DNAScene = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: isMobile ? '100%' : '50%',
      height: '100%',
      zIndex: 0,
      opacity: isMobile ? 0.3 : 0.6,
    }}>
      <Canvas
        camera={{ position: [3, 0, 4], fov: 45 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#050508', 4, 15]} />
        <ambientLight intensity={0.2} />
        <NetworkCylinder />
      </Canvas>
    </div>
  );
};

export default DNAScene;
