import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const Cake = () => {
  const [candles, setCandles] = useState([false, false, false]);
  const [wishMade, setWishMade] = useState(false);

  const blowCandle = (index) => {
    if (candles[index]) return;
    
    const newCandles = [...candles];
    newCandles[index] = true;
    setCandles(newCandles);
  };

  useEffect(() => {
    const allBlown = candles.every(c => c === true);
    if (allBlown && !wishMade) {
      setWishMade(true);
      triggerConfetti();
    }
  }, [candles, wishMade]);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      // Confetti left side with Unicorn pastel colors
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff79c6', '#bd93f9', '#8be9fd', '#f1fa8c', '#ffb86c']
      });
      // Confetti right side
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#ff79c6', '#bd93f9', '#8be9fd', '#f1fa8c', '#ffb86c']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  };

  const handleReset = () => {
    setCandles([false, false, false]);
    setWishMade(false);
  };

  return (
    <div className="cake-section">
      <h2 className="section-title text-center glow-text">Make a Wish!</h2>
      <p className="section-subtitle text-center">Tap individual candles to blow them out</p>

      <div className="cake-container">
        {/* Unicorn Horn */}
        <div className="unicorn-horn"></div>
        
        {/* Unicorn Ears */}
        <div className="unicorn-ears">
          <div className="ear left-ear"></div>
          <div className="ear right-ear"></div>
        </div>

        {/* Candles on top (distributed around the horn) */}
        <div className="candle-wrapper">
          {candles.map((isBlown, idx) => (
            <div 
              key={idx}
              className={`candle ${isBlown ? 'is-blown' : ''}`}
              onClick={() => blowCandle(idx)}
            >
              <div className="flame"></div>
              <div className="smoke"></div>
            </div>
          ))}
        </div>

        {/* Cake Tier */}
        <div className="cake-tier">
          <div className="frosting">
            <div className="drip"></div>
            <div className="drip"></div>
            <div className="drip"></div>
            <div className="drip"></div>
            <div className="drip"></div>
            <div className="drip"></div>
            <div className="drip"></div>
            <div className="drip"></div>
            <div className="drip"></div>
            <div className="drip"></div>
          </div>
        </div>

        {/* Plate */}
        <div className="cake-plate"></div>
      </div>

      {wishMade ? (
        <div className="animate-fade-in text-center">
          <p className="celebration-sparkle-text">✨ Your magical wish is sent! ✨</p>
          <button onClick={handleReset} className="cake-btn">
            Light Candles Again
          </button>
        </div>
      ) : (
        <p className="cake-instructions">Tap candles one by one</p>
      )}
    </div>
  );
};

export default Cake;
