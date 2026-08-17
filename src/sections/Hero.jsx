import { useEffect, useRef } from 'react';
import HeroScene from '../scenes/HeroScene';
import { siteConfig } from '../data/siteConfig';
import { createHeroTimeline } from '../animations/heroAnimations';
import './Hero.css';

const Hero = ({ loaded }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (loaded) {
      // Small delay to let the loader exit animation complete
      const timer = setTimeout(() => {
        createHeroTimeline();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  const scrollTo = (selector) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero section" id="hero" ref={heroRef}>
      {/* 3D Background */}
      <div className="hero__bg">
        <HeroScene />
      </div>

      {/* Content Overlay */}
      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__name font-display">{siteConfig.name}</h1>
          <p className="hero__role font-mono">{siteConfig.role}</p>
          <p className="hero__tagline font-mono">{siteConfig.tagline}</p>
          <p className="hero__specialization font-mono">SPECIALIZATION: BIOINFORMATICS</p>
          <p className="hero__description">{siteConfig.description}</p>

          <div className="hero__actions">
            <button
              className="hero__cta hero__cta--primary font-display"
              onClick={() => scrollTo('#about')}
              data-cursor="EXPLORE"
              aria-label="Explore the portfolio"
            >
              EXPLORE MY UNIVERSE →
            </button>
            <button
              className="hero__cta hero__cta--secondary font-display"
              onClick={() => scrollTo('#projects')}
              data-cursor="GO"
              aria-label="View projects"
            >
              VIEW PROJECTS
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text font-mono">SCROLL TO EXPLORE</span>
      </div>

      {/* Corner UI Elements */}
      <div className="hero__ui-corner hero__ui-corner--tl font-mono">
        <span>SYS.STATUS</span>
        <span className="hero__ui-value">ONLINE</span>
      </div>
      <div className="hero__ui-corner hero__ui-corner--tr font-mono">
        <span>LAT 00.0000</span>
        <span>LON 00.0000</span>
      </div>
    </section>
  );
};

export default Hero;
