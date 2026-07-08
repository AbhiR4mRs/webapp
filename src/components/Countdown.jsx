import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate, name, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isCompleted: true }));
        return true;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false
      });
      return false;
    };

    const isPast = calculateTime();
    if (isPast) return;

    const timer = setInterval(() => {
      calculateTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const padZero = (num) => String(num).padStart(2, '0');

  if (timeLeft.isCompleted) {
    return (
      <div className="countdown-complete-container animate-fade-in">
        {/* Pulsing Unicorn Sticker Logo */}
        <img src="/images/unicorn.png" alt="Unicorn Logo" className="unicorn-pulse-logo" />
        <h1 className="birthday-title glow-text">It's July 24th!</h1>
        <p className="birthday-subtitle">Karthika's magic portal is open.</p>
        <button className="unlock-btn" onClick={onComplete}>
          Enter Unicorn Land 🦄
        </button>
      </div>
    );
  }

  return (
    <div className="countdown-card glass">
      {/* Pulsing Unicorn Sticker Logo */}
      <img src="/images/unicorn.png" alt="Unicorn Logo" className="unicorn-pulse-logo" />
      
      <h2 className="countdown-header glow-text">{name}'s Birthday Portal</h2>
      <div className="countdown-timer">
        <div className="time-block">
          <span className="time-val">{padZero(timeLeft.days)}</span>
          <span className="time-lbl">Days</span>
        </div>
        <div className="time-divider">:</div>
        <div className="time-block">
          <span className="time-val">{padZero(timeLeft.hours)}</span>
          <span className="time-lbl">Hours</span>
        </div>
        <div className="time-divider">:</div>
        <div className="time-block">
          <span className="time-val">{padZero(timeLeft.minutes)}</span>
          <span className="time-lbl">Mins</span>
        </div>
        <div className="time-divider">:</div>
        <div className="time-block">
          <span className="time-val">{padZero(timeLeft.seconds)}</span>
          <span className="time-lbl">Secs</span>
        </div>
      </div>
      <p className="countdown-footer">Unlocking magical wishes on July 24th, midnight</p>
      
      {/* Developer Skip Preview Button */}
      <button className="skip-test-btn" onClick={onComplete}>
        Enter Portal (Developer Mode) 🦄
      </button>
    </div>
  );
};

export default Countdown;
