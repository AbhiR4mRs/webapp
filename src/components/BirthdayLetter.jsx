import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const BirthdayLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="birthday-letter-section animate-fade-in">
      <h2 className="section-title text-center glow-text">For You</h2>
      <p className="section-subtitle text-center">A personal letter just for you</p>

      {/* Interactive Envelope and Letter */}
      <div className="letter-envelope-container">
        {!isOpen ? (
          <div className="envelope-wrapper glass animate-float" onClick={() => setIsOpen(true)}>
            <div className="envelope-back"></div>
            <div className="envelope-paper-preview">
              <span className="preview-text">Dear Karthu... 💖</span>
            </div>
            <div className="envelope-front"></div>
            <div className="envelope-wax-seal">
              <div className="seal-unicorn-stamp">🦄</div>
            </div>
            <div className="envelope-tap-instruction">
              <Heart size={16} className="heart-icon animate-pulse" />
              <span>Tap seal to open letter</span>
            </div>
          </div>
        ) : (
          <div className="letter-paper-wrapper glass animate-scale-in">
            <button className="close-letter-btn" onClick={() => setIsOpen(false)} aria-label="Close Letter">
              <XIcon />
            </button>
            
            {/* The Handwritten Letter */}
            <div className="letter-header">
              <span className="letter-date">July 24, 2026</span>
              <span className="letter-stamp">💌</span>
            </div>
            
            <div className="letter-body">
              <p className="letter-salutation">Dear Karthu, ❤️</p>
              
              <p>
                You've always been a part of my life. The laughter we shared, the tears we wiped away, and every challenge we faced somehow connected us in a way I once believed could never be broken.
              </p>
              
              <p>
                All I ever wanted was a friend like you—someone who would always stay in touch, share every little madness, celebrate the smallest moments, and make life feel lighter just by being there. And for a long time, you were exactly that person for me.
              </p>
              
              <p>
                Somewhere along the way, though, we got lost. Things changed in ways I was always afraid they would. Even now, I know we're still the same people at heart, even if life has taken us in different directions. But that doesn't stop me from missing you.
              </p>
              
              <p>
                I always imagined things would be different for us. Maybe that's why it's been hard to accept how much has changed. I hope you know that I've always loved you—in the way I've always meant it—with care, respect, admiration, and a place in my heart that will always be yours. No matter where life takes us, the memories we created together will always be among the most beautiful parts of my life.
              </p>
              
              <p>
                Thank you for being the person who made ordinary days unforgettable, who understood my silence, laughed at my terrible jokes, and stood beside me through moments I'll never forget.
              </p>
              
              <p>
                On your birthday, I don't wish for anything except your happiness. I hope life gives you every dream you've worked for, every smile you deserve, and people who love you as deeply as you deserve to be loved. I hope you keep shining, just as you always have.
              </p>
              
              <p>
                I miss you more than you'll probably ever know.
              </p>
              
              <p className="letter-closing" style={{ fontStyle: 'italic', marginTop: '1.5rem', color: 'var(--unicorn-pink)', fontWeight: '700' }}>
                Happy Birthday, my Radhe. ❤️
              </p>
              
              <div className="letter-signoff">
                <p>With love,</p>
                <p className="letter-signature">Kannan</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Internal Close Icon since X is already imported
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default BirthdayLetter;
