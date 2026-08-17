import { Suspense } from 'react';
import SectionTitle from '../components/SectionTitle';
import DNAScene from '../scenes/DNAScene';
import { siteConfig } from '../data/siteConfig';
import './About.css';

const About = () => {
  const fields = [
    { label: 'NAME', value: siteConfig.fullName },
    { label: 'ROLE', value: siteConfig.role },
    { label: 'FIELD', value: 'COMPUTER SCIENCE' },
    { label: 'SPECIALIZATION', value: 'BIOINFORMATICS' },
    {
      label: 'FOCUS',
      value: ['SOFTWARE DEVELOPMENT', 'WEB TECHNOLOGY', 'COMPUTING', 'SYSTEMS'],
    },
  ];

  return (
    <section className="about section" id="about">
      {/* 3D DNA Background */}
      <Suspense fallback={null}>
        <DNAScene />
      </Suspense>

      <div className="section-inner">
        <SectionTitle number="01" title="IDENTITY" subtitle="WHO I AM" />

        <div className="about__grid">
          <div className="about__info">
            {fields.map((field, index) => (
              <div
                className="about__field fade-in"
                key={field.label}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="about__field-label font-mono">{field.label}</span>
                <div className="about__field-divider" />
                <div className="about__field-value font-display">
                  {Array.isArray(field.value) ? (
                    field.value.map((v) => (
                      <span key={v} className="about__field-item">{v}</span>
                    ))
                  ) : (
                    <span>{field.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="about__visual fade-in">
            <div className="about__badge font-mono">
              <span className="about__badge-icon">◈</span>
              <span>SOFTWARE × SYSTEMS</span>
            </div>
            <p className="about__statement font-display">
              Building robust digital experiences, software systems and interactive technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
