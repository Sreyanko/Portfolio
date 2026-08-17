import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import SectionTitle from '../components/SectionTitle';
import navataranImg from '../assets/navataran.png';
import travelassistantImg from '../assets/travelassistant.png';
import minisearchImg from '../assets/minisearch.png';

import { siteConfig } from '../data/siteConfig';
import './Projects.css';

// ── Globe Scene (Travel Assistant) ───────────────────────────
function Globe() {
  const globeRef = useRef();
  const pointsRef = useRef();

  // Generate destination points
  const destinations = useMemo(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const phi = Math.acos(-1 + (2 * i) / 20);
      const theta = Math.sqrt(20 * Math.PI) * phi;
      points.push(
        new THREE.Vector3(
          1.02 * Math.cos(theta) * Math.sin(phi),
          1.02 * Math.sin(theta) * Math.sin(phi),
          1.02 * Math.cos(phi)
        )
      );
    }
    return points;
  }, []);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={globeRef}>
        {/* Main globe — wireframe sphere */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#0a1628"
            emissive="#4a7dff"
            emissiveIntensity={0.1}
            transparent
            opacity={0.6}
            roughness={0.5}
            metalness={0.6}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh>
          <sphereGeometry args={[1.005, 24, 24]} />
          <meshBasicMaterial color="#4a7dff" wireframe transparent opacity={0.08} />
        </mesh>
        {/* Destination points */}
        {destinations.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
        ))}
        {/* Atmosphere ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.3, 0.003, 16, 100]} />
          <meshBasicMaterial color="#4a7dff" transparent opacity={0.15} />
        </mesh>
        <pointLight color="#4a7dff" intensity={1} distance={5} />
      </group>
    </Float>
  );
}

// ── Search Core Scene (Mini-Search-Engine) ─────────────────────────────
function SearchCore() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Core data crystal */}
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.4} wireframe />
        </mesh>
        {/* Orbiting data ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 16, 64]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
        </mesh>
        {/* Outer processing ring */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[1.6, 0.01, 16, 48]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
        </mesh>
        {/* Floating data particles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI) / 3) * 1.2,
              Math.sin((i * Math.PI) / 3) * 0.5,
              Math.sin((i * Math.PI) / 3) * 1.2,
            ]}
          >
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} />
          </mesh>
        ))}
        <pointLight color="#8b5cf6" intensity={1} distance={5} />
      </group>
    </Float>
  );
}

// ── Project Card ─────────────────────────────────────────────
const ProjectCard = ({ project, index, children }) => {
  return (
    <div className="project fade-in" data-theme={project.theme}>
      <div className="project__info">
        <div className="project__header">
          <span className="project__number font-mono">MISSION.0{index + 1}</span>
          <h3 className="project__title font-display">{project.title}</h3>
          <p className="project__subtitle font-mono">{project.subtitle}</p>
        </div>

        <p className="project__description">{project.description}</p>

        <div className="project__tech">
          {project.technologies.map((tech) => (
            <span key={tech} className="project__tech-tag font-mono">{tech}</span>
          ))}
        </div>

        <div className="project__features">
          {project.features.map((feature) => (
            <div key={feature} className="project__feature font-mono">
              <span className="project__feature-dot">▸</span>
              {feature}
            </div>
          ))}
        </div>

        <a
          href={project.url}
          className="project__cta font-display"
          data-cursor="EXPLORE"
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.id === 'mini-search-engine' ? 'VIEW ON GITHUB →' : 'VIEW PROJECT →'}
        </a>
      </div>

      <div className="project__canvas">
        <Suspense fallback={<div className="project__canvas-placeholder" />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
};

// ── Projects Section ─────────────────────────────────────────
const Projects = () => {
  const projects = siteConfig.projects;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section className="projects section" id="projects">
      <div className="section-inner">
        <SectionTitle number="03" title="MISSION CONTROL" subtitle="PROJECTS" />

        {/* NAVA-TARAN */}
        <ProjectCard project={projects[0]} index={0}>
          <div style={{ width: '100%', height: '100%', padding: '10px' }}>
            <img
              src={navataranImg}
              alt="Navataran Project"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(0, 229, 255, 0.2)' }}
            />
          </div>
        </ProjectCard>

        {/* TRAVEL ASSISTANT */}
        <ProjectCard project={projects[1]} index={1}>
          <div style={{ width: '100%', height: '100%', padding: '10px' }}>
            <img
              src={travelassistantImg}
              alt="Travel Assistant Project"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(0, 229, 255, 0.2)' }}
            />
          </div>
        </ProjectCard>

        {/* MINI-SEARCH-ENGINE */}
        <ProjectCard project={projects[2]} index={2}>
          <div style={{ width: '100%', height: '100%', padding: '10px' }}>
            <img 
              src={minisearchImg} 
              alt="Mini-Search-Engine Project" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)' }} 
            />
          </div>
        </ProjectCard>
      </div>
    </section>
  );
};

export default Projects;
