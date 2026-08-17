import { useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { siteConfig } from '../data/siteConfig';
import './Journey.css';

const Journey = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const items = timelineRef.current?.querySelectorAll('.journey__item');
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('journey__item--visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const journey = siteConfig.journey;
  const futureEntry = journey[journey.length - 1];
  const timelineEntries = journey.slice(0, -1);

  return (
    <section className="journey section" id="journey">
      <div className="section-inner">
        <SectionTitle number="04" title="JOURNEY" subtitle="PATH THROUGH TIME" />

        <div className="journey__timeline" ref={timelineRef}>
          {/* Timeline line */}
          <div className="journey__line" />

          {timelineEntries.map((entry, index) => (
            <div className="journey__item" key={entry.year}>
              <div className="journey__marker">
                <div className="journey__dot" />
              </div>
              <div className="journey__content">
                <span className="journey__year font-display">{entry.year}</span>
                {entry.events.map((event, i) => (
                  <div className="journey__event" key={i}>
                    <h4 className="journey__event-title font-display">{event.title}</h4>
                    <p className="journey__event-desc font-mono">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Future Section */}
        <div className="journey__future fade-in">
          <div className="journey__future-line" />
          <h3 className="journey__future-title font-display">FUTURE</h3>
          <div className="journey__future-statement font-display">
            <span className="journey__future-word">BUILD.</span>
            <span className="journey__future-word">EXPLORE.</span>
            <span className="journey__future-word">EVOLVE.</span>
          </div>
          <p className="journey__future-tagline font-mono">
            {futureEntry.events[0].description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Journey;
