import { useEffect, useRef } from 'react';
import './SectionTitle.css';

const SectionTitle = ({ number, title, subtitle }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    // Intersection observer for reveal animation
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('section-title--visible');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-title" ref={titleRef}>
      <div className="section-title__line" />
      <div className="section-title__content">
        {number && (
          <span className="section-title__number font-mono">{number}</span>
        )}
        <h2 className="section-title__heading font-display">{title}</h2>
        {subtitle && (
          <p className="section-title__subtitle font-mono">{subtitle}</p>
        )}
      </div>
      <div className="section-title__line" />
    </div>
  );
};

export default SectionTitle;
