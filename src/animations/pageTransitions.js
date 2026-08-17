import { gsap } from 'gsap';

/**
 * Stagger children elements into view.
 */
export function staggerIn(selector, options = {}) {
  const {
    y = 30,
    opacity = 0,
    duration = 0.6,
    stagger = 0.08,
    ease = 'power3.out',
    delay = 0,
  } = options;

  return gsap.fromTo(
    selector,
    { y, opacity },
    { y: 0, opacity: 1, duration, stagger, ease, delay }
  );
}

/**
 * Smooth section transition helper.
 */
export function sectionTransition(element, direction = 'in') {
  if (direction === 'in') {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    );
  }
  return gsap.to(element, {
    opacity: 0,
    y: -30,
    filter: 'blur(5px)',
    duration: 0.5,
    ease: 'power2.in',
  });
}

/**
 * Text reveal animation — clip-path based.
 */
export function textReveal(selector, options = {}) {
  const { duration = 1, delay = 0, stagger = 0.1 } = options;

  return gsap.fromTo(
    selector,
    { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
    }
  );
}
