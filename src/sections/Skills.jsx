import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import SectionTitle from '../components/SectionTitle';
import { siteConfig } from '../data/siteConfig';
import ParticleField from '../scenes/ParticleField';
import './Skills.css';

// ── 3D Skill Node ────────────────────────────────────────────
function SkillNode({ position, name, color = '#00e5ff', isCenter = false }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const originalPos = useRef(position);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      // Gentle floating
      meshRef.current.position.y =
        originalPos.current[1] + Math.sin(t * 0.5 + originalPos.current[0]) * 0.15;
      meshRef.current.position.x =
        originalPos.current[0] + Math.cos(t * 0.3 + originalPos.current[1]) * 0.08;

      // Hover scale
      const targetScale = hovered ? (isCenter ? 1.3 : 1.15) : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  const size = isCenter ? 0.35 : 0.18;

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {isCenter ? (
          <icosahedronGeometry args={[size, 1]} />
        ) : (
          <octahedronGeometry args={[size, 0]} />
        )}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          wireframe={isCenter}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      {/* Label */}
      <Html
        position={[position[0], position[1] + (isCenter ? 0.6 : 0.4), position[2]]}
        center
        style={{
          color: hovered ? '#00e5ff' : '#6a6a7a',
          fontSize: isCenter ? '12px' : '9px',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.2em',
          whiteSpace: 'nowrap',
          transition: 'color 0.3s ease, opacity 0.3s ease',
          opacity: hovered || isCenter ? 1 : 0.6,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {name}
      </Html>
    </group>
  );
}

// ── Connection Lines ─────────────────────────────────────────
function ConnectionLines({ centerPos, nodePositions }) {
  const linesRef = useRef();

  const linePositions = useMemo(() => {
    const positions = [];
    nodePositions.forEach((pos) => {
      positions.push(centerPos[0], centerPos[1], centerPos[2]);
      positions.push(pos[0], pos[1], pos[2]);
    });
    return new Float32Array(positions);
  }, [centerPos, nodePositions]);

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.08 + Math.sin(clock.getElapsedTime() * 0.5) * 0.03;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00e5ff" transparent opacity={0.1} />
    </lineSegments>
  );
}

// ── Skills Network Scene ─────────────────────────────────────
function SkillsNetwork() {
  const skills = siteConfig.skills;

  // Position nodes in a 3D arrangement around center
  const nodePositions = useMemo(() => {
    return skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const radius = 2.0 + (i % 2) * 0.5;
      const yOffset = (Math.random() - 0.5) * 1.5;
      return [
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius,
      ];
    });
  }, [skills]);

  const centerPos = [0, 0, 0];

  const getColor = (category) => {
    switch (category) {
      case 'frontend': return '#00e5ff';
      case 'backend': return '#4a7dff';
      case 'language': return '#8b5cf6';
      case 'tools': return '#22c55e';
      default: return '#00e5ff';
    }
  };

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} color="#00e5ff" intensity={1} distance={8} />
      <fog attach="fog" args={['#050508', 4, 15]} />

      {/* Center node */}
      <SkillNode position={centerPos} name="SREYANKO" color="#00e5ff" isCenter />

      {/* Skill nodes */}
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          position={nodePositions[i]}
          name={skill.name}
          color={getColor(skill.category)}
        />
      ))}

      {/* Connections */}
      <ConnectionLines centerPos={centerPos} nodePositions={nodePositions} />

      <ParticleField count={60} color="#4a7dff" spread={10} opacity={0.15} />
    </>
  );
}

// ── Skills Section ───────────────────────────────────────────
const Skills = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section className="skills section" id="skills">
      <div className="section-inner">
        <SectionTitle number="02" title="TECH DNA" subtitle="SKILL MATRIX" />
      </div>

      {isMobile ? (
        /* Mobile: 2D Grid Fallback */
        <div className="skills__grid section-inner">
          {siteConfig.skills.map((skill) => (
            <div className="skills__card fade-in" key={skill.name}>
              <div className="skills__card-indicator" style={{
                background: skill.category === 'frontend' ? 'var(--color-cyan)' :
                  skill.category === 'backend' ? 'var(--color-blue)' :
                  skill.category === 'language' ? 'var(--color-violet)' : 'var(--color-green)'
              }} />
              <span className="skills__card-name font-mono">{skill.name}</span>
              <div className="skills__card-bar">
                <div className="skills__card-fill" style={{ width: `${skill.level * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: 3D Network */
        <div className="skills__canvas">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={Math.min(window.devicePixelRatio, 1.5)}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <SkillsNetwork />
            </Canvas>
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default Skills;
