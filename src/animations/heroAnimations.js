import { gsap } from 'gsap';

/**
 * Hero entrance timeline — called after loading screen exits.
 * Animates elements in sequence for a cinematic reveal.
 */
export function createHeroTimeline() {
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  tl.fromTo('.hero__bg', { opacity: 0 }, { opacity: 1, duration: 1 })
    .fromTo(
      '.hero__name',
      { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.2 },
      '-=0.4'
    )
    .fromTo(
      '.hero__role',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      '.hero__tagline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      '.hero__specialization',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      '.hero__description',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(
      '.hero__cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      '-=0.2'
    )
    .fromTo(
      '.hero__scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.1'
    );

  return tl;
}
