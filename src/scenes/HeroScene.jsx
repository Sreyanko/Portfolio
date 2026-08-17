import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// ── Holographic Orb ──────────────────────────────────────────
function HoloOrb() {
  const meshRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2;
      innerRef.current.rotation.z = t * 0.1;
      const scale = 1 + Math.sin(t * 0.5) * 0.03;
      innerRef.current.scale.setScalar(scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.15;
      ringRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Outer wireframe */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshBasicMaterial
            color="#00e5ff"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial
            color="#0a1628"
            emissive="#00e5ff"
            emissiveIntensity={0.15}
            transparent
            opacity={0.6}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Orbital ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.4, 0.008, 16, 100]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.25} />
        </mesh>

        {/* Second orbital ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.8, 0.005, 16, 100]} />
          <meshBasicMaterial color="#4a7dff" transparent opacity={0.12} />
        </mesh>

        {/* Core glow point */}
        <pointLight color="#00e5ff" intensity={2} distance={8} />
      </group>
    </Float>
  );
}

// ── Floating Particles ───────────────────────────────────────
function Particles({ count = 200 }) {
  const meshRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.02 + 0.005;
    }
    return s;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const posArr = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.001;
      posArr[i * 3] += Math.cos(t * 0.2 + i * 0.5) * 0.0005;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00e5ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Grid Floor ───────────────────────────────────────────────
function GridFloor() {
  return (
    <gridHelper
      args={[40, 40, '#1a1a2e', '#0d0d18']}
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// ── Mouse Camera Control ─────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.02;
    camera.position.y += (mouse.current.y * 0.5 + 0.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  // Track mouse
  if (typeof window !== 'undefined') {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Attach once
    if (!CameraRig._attached) {
      window.addEventListener('mousemove', handleMouseMove);
      CameraRig._attached = true;
      CameraRig._cleanup = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        CameraRig._attached = false;
      };
    }
  }

  return null;
}

// ── Main Scene ───────────────────────────────────────────────
const HeroScene = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
    }}>
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 50 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Fog for depth */}
        <fog attach="fog" args={['#050508', 5, 25]} />

        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#4a7dff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.15} color="#8b5cf6" />

        {/* Objects */}
        <HoloOrb />
        <Particles count={isMobile ? 80 : 200} />
        <Stars radius={50} depth={50} count={isMobile ? 1000 : 3000} factor={3} saturation={0} fade speed={0.5} />
        <GridFloor />
        <CameraRig />
      </Canvas>
    </div>
  );
};

export default HeroScene;
