import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import SectionTitle from '../components/SectionTitle';
import { siteConfig } from '../data/siteConfig';
import './Contact.css';

// ── Portal Orb ───────────────────────────────────────────────
function PortalOrb() {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.15) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#0a1628"
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
            transparent
            opacity={0.5}
            wireframe
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#0a0a15"
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh ref={ringRef}>
          <torusGeometry args={[1.5, 0.006, 16, 80]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
        </mesh>
        <pointLight color="#8b5cf6" intensity={2} distance={6} />
        <pointLight color="#00e5ff" intensity={0.5} distance={4} position={[0, 1, 0]} />
      </group>
    </Float>
  );
}

// ── Contact Section ──────────────────────────────────────────
const Contact = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section className="contact section" id="contact">
      {/* 3D Background */}
      <div className="contact__canvas">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <fog attach="fog" args={['#050508', 3, 12]} />
            <ambientLight intensity={0.1} />
            <PortalOrb />
          </Canvas>
        </Suspense>
      </div>

      <div className="section-inner contact__inner">
        <SectionTitle number="05" title="ESTABLISH CONNECTION" subtitle="CONTACT" />

        <div className="contact__content fade-in">
          <h3 className="contact__heading font-display">READY TO BUILD SOMETHING?</h3>
          <p className="contact__subheading font-display">LET'S CONNECT.</p>

          <div className="contact__buttons">
            <a
              href={siteConfig.social.email}
              className="contact__btn font-display"
              data-cursor="OPEN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send email"
            >
              <span className="contact__btn-icon">✉</span>
              EMAIL
            </a>
            <a
              href={siteConfig.social.github}
              className="contact__btn font-display"
              data-cursor="OPEN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile"
            >
              <span className="contact__btn-icon">◆</span>
              GITHUB
            </a>
            <a
              href={siteConfig.social.linkedin}
              className="contact__btn font-display"
              data-cursor="OPEN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LinkedIn profile"
            >
              <span className="contact__btn-icon">▲</span>
              LINKEDIN
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__brand font-display">{siteConfig.footer.brand}</span>
          <div className="footer__meta font-mono">
            <span className="footer__status">
              <span className="footer__status-dot" />
              {siteConfig.footer.status}
            </span>
            <span>{siteConfig.footer.copyright}</span>
            <span>{siteConfig.footer.builtWith}</span>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
