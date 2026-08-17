import { useState, useEffect, useRef, useCallback } from 'react';
import { siteConfig } from '../data/siteConfig';
import './Navbar.css';

const Navbar = ({ visible }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('.section[id]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [visible]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen, handleKeyDown]);

  if (!visible) return null;

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar__inner">
        {/* Logo */}
        <a
          href="#hero"
          className="navbar__logo font-display"
          data-cursor="GO"
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          SREYANKO
        </a>

        {/* Desktop Nav */}
        <div className="navbar__links">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link font-mono ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
              data-cursor="GO"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* System Status */}
        <div className="navbar__status font-mono">
          <span className="navbar__status-dot" />
          SYSTEM ONLINE
        </div>

        {/* Mobile Toggle */}
        <button
          className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          data-cursor="OPEN"
        >
          <span className="navbar__toggle-line" />
          <span className="navbar__toggle-line" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="navbar__mobile-inner">
          {siteConfig.navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link font-display"
              style={{ animationDelay: `${i * 0.08}s` }}
              data-cursor="GO"
              onClick={(e) => handleNavClick(e, link.href)}
              tabIndex={mobileOpen ? 0 : -1}
            >
              <span className="navbar__mobile-link-number font-mono">0{i + 1}</span>
              {link.label}
            </a>
          ))}
          <div className="navbar__mobile-footer font-mono">
            <span className="navbar__status-dot" />
            SYSTEM ONLINE
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
