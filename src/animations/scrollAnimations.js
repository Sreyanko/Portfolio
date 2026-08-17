import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize all scroll-triggered animations.
 * Call once after DOM is ready and Lenis is set up.
 */
export function initScrollAnimations() {
  // ── Section Reveal Animations ──────────────────────────────
  const sections = document.querySelectorAll('.section');
  sections.forEach((section) => {
    const reveals = section.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    gsap.fromTo(
      reveals,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Parallax elements ──────────────────────────────────────
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach((el) => {
    const speed = el.dataset.speed || 0.3;
    gsap.to(el, {
      y: () => -parseFloat(speed) * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // ── Fade-in on scroll ──────────────────────────────────────
  const fadeIns = document.querySelectorAll('.fade-in');
  fadeIns.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/**
 * Refresh ScrollTrigger — call after layout changes.
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
