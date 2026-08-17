import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const target = useRef({ x: -100, y: -100 });
  const [isTouch, setIsTouch] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const isTouchDevice =
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouch(isTouchDevice);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    let firstMove = true;

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (firstMove) {
        firstMove = false;
        setHasMoved(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let rafId;

    const animate = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouch]);

  // Add/remove cursor:none on body only when custom cursor is active
  useEffect(() => {
    if (!isTouch && hasMoved) {
      document.body.classList.add('custom-cursor-active');
    }
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isTouch, hasMoved]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorDotRef}
      className={`cursor-dot ${hasMoved ? '' : 'cursor-dot--hidden'}`}
    />
  );
};

export default CustomCursor;
