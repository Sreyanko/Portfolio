import { useState, useEffect, useCallback, Suspense } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Contact from './sections/Contact';

import { initScrollAnimations } from './animations/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // ── Lenis + GSAP Sync ──────────────────────────────────────
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      autoRaf: false,
    });

    // Sync Lenis with GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Initialize scroll animations after a brief delay for DOM
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      initScrollAnimations();
    }, 500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, [loading]);

  // ── Loading Complete Handler ────────────────────────────────
  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    // Small delay then trigger hero animations
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  return (
    <div className="app">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {loading && <Loader onLoadingComplete={handleLoadingComplete} />}

      {/* Navigation */}
      <Navbar visible={!loading} />

      {/* Main Content */}
      <main>
        <Hero loaded={loaded} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </div>
  );
}

export default App;
