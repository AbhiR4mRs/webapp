import React, { useState } from 'react';

const FoldingCard3D = ({ name, greeting }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="card-3d-wrapper">
      <div 
        className={`card-3d ${isOpen ? 'is-open' : ''}`} 
        onClick={handleCardClick}
      >
        {/* Cover Page Wrapper */}
        <div className="card-cover-wrapper">
          {/* Cover Front Page */}
          <div className="card-face card-front">
            <div className="card-cover-content">
              {/* Unicorn Seal instead of Heart */}
              <div className="unicorn-card-seal animate-pulse">
                <img src="/images/unicorn.png" alt="Unicorn Seal" className="unicorn-seal-img" />
              </div>
              <h1 className="cover-title glow-text">Happy Birthday</h1>
              <h2 className="cover-subtitle">{name}</h2>
              <div className="cover-decoration"></div>
              <p className="tap-instruction">Tap to open card</p>
            </div>
          </div>

          {/* Cover Back Page (Inside Left) */}
          <div className="card-face card-inside-left">
            <div className="card-inside-left-content">
              <div className="decorations-3d">
                <span className="balloon">🎈</span>
                <span className="sparkle">✨</span>
                <span className="balloon balloon-2">🎈</span>
              </div>
              <h3>To My Best Friend</h3>
              <p className="card-date">July 24, 2026</p>
            </div>
          </div>
        </div>

        {/* Base Page (Inside Right) */}
        <div className="card-face card-inside-right">
          <div className="card-inside-right-content">
            <h3 className="inside-title">Hey {name},</h3>
            <p className="greeting-text">{greeting}</p>
            <div className="card-sign-off">
              <p className="sign-off-prefix">With love,</p>
              <p className="signature-handwritten">Your Best Friend ❤️</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating help hint for mobile tap */}
      <div className={`card-hint ${isOpen ? 'hidden' : ''}`}>
        Tap the card above to open it!
      </div>
    </div>
  );
};

export default FoldingCard3D;
