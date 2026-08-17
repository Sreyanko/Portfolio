import { useState, useEffect, useCallback } from 'react';
import { siteConfig } from '../data/siteConfig';
import './Loader.css';

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'ready' | 'exiting'

  const messages = siteConfig.loadingMessages;

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Variable speed — faster at start, slower near end
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Cycle through messages
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 600);
    return () => clearInterval(msgInterval);
  }, [messages.length]);

  // When progress hits 100, transition to ready
  useEffect(() => {
    if (progress === 100 && phase === 'loading') {
      setTimeout(() => setPhase('ready'), 400);
    }
  }, [progress, phase]);

  const handleEnter = useCallback(() => {
    setPhase('exiting');
    setTimeout(() => {
      onLoadingComplete();
    }, 800);
  }, [onLoadingComplete]);

  // Build progress bar
  const filledBlocks = Math.floor(progress / 5);
  const emptyBlocks = 20 - filledBlocks;
  const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <div className={`loader ${phase === 'exiting' ? 'loader--exiting' : ''}`}>
      <div className="loader__content">
        {/* System Header */}
        <div className="loader__header">
          <span className="loader__sys font-mono">SREYANKO.SYS</span>
          <div className="loader__divider" />
          <span className="loader__init font-mono">INITIALIZING DIGITAL UNIVERSE</span>
        </div>

        {/* Progress Section */}
        <div className="loader__progress-section">
          <div className="loader__label font-mono">LOADING EXPERIENCE</div>
          <div className="loader__bar-container">
            <span className="loader__bar font-mono">{progressBar}</span>
            <span className="loader__percent font-mono">{progress}%</span>
          </div>
        </div>

        {/* Status Messages */}
        <div className="loader__messages">
          <span className="loader__status-indicator">▸</span>
          <span className="loader__message font-mono">
            {phase === 'ready' ? 'SYSTEM READY' : messages[currentMessage]}
          </span>
        </div>

        {/* Enter Button */}
        {phase === 'ready' && (
          <button
            className="loader__enter font-display"
            onClick={handleEnter}
            data-cursor="ENTER"
            aria-label="Enter the portfolio experience"
          >
            ENTER EXPERIENCE →
          </button>
        )}
      </div>

      {/* Corner decorations */}
      <div className="loader__corner loader__corner--tl" />
      <div className="loader__corner loader__corner--tr" />
      <div className="loader__corner loader__corner--bl" />
      <div className="loader__corner loader__corner--br" />
    </div>
  );
};

export default Loader;
