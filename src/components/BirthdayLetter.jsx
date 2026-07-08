import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Lock, Unlock, Trash2, Heart } from 'lucide-react';

const BirthdayLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expandedEntry, setExpandedEntry] = useState(null);

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('karthika_future_diary');
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load diary entries:", e);
    }
  }, []);

  const saveEntries = (newEntries) => {
    setEntries(newEntries);
    try {
      localStorage.setItem('karthika_future_diary', JSON.stringify(newEntries));
    } catch (e) {
      console.error("Failed to save diary entries:", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this capsule letter?")) {
      const updated = entries.filter(entry => entry.id !== id);
      saveEntries(updated);
      if (expandedEntry === id) {
        setExpandedEntry(null);
      }
    }
  };

  return (
    <div className="birthday-letter-section animate-fade-in">
      <h2 className="section-title text-center glow-text">For You</h2>
      <p className="section-subtitle text-center">A personal letter and capsule space just for you</p>

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
              <p className="letter-salutation">Dear Karthu, 🦄</p>
              
              <p>
                Happy Birthday! I wanted to write you this little note to tell you how incredibly 
                grateful I am to have you in my life. Meeting you in college was easily the best 
                thing that could have happened, and every single moment we've shared since orientation 
                has been filled with smiles and unforgettable memories.
              </p>
              
              <p>
                You are my absolute favorite human, my partner in crime, and the one person who can 
                always make me laugh, no matter what. Thank you for all the late-night waffle hunts, 
                sunrises, deep talks, and all our wonderful inside jokes.
              </p>
              
              <p>
                I hope this year brings you all the magic, success, and pure happiness that you deserve. 
                No matter where life takes us, we're locked in as best friends forever. Have the most 
                beautiful day!
              </p>
              
              <div className="letter-signoff">
                <p>With love always,</p>
                <p className="letter-signature">Your Best Friend ❤️</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Time Capsules Segment */}
      <div className="future-writings-section" style={{ marginTop: '3.5rem' }}>
        <h3 className="capsules-header text-center glow-text">Letters to the Future</h3>
        <p className="section-subtitle text-center" style={{ fontSize: '0.8rem', marginTop: '-0.3rem' }}>
          Write and lock down a goal or letter for your future self
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="notebook-form glass">
          <div className="notebook-header">
            <Mail className="notebook-icon" size={18} />
            <span>New Capsule Letter</span>
          </div>
          <div className="notebook-paper">
            <input 
              type="text" 
              placeholder="Letter Subject / Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="notebook-title-input"
              required
              maxLength={60}
            />
            <textarea
              placeholder="Dear Future Karthu..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="notebook-text-area"
              required
              rows={5}
            ></textarea>
          </div>
          <button type="submit" className="notebook-submit-btn">
            Lock in Time Capsule 🔒
          </button>
        </form>

        {/* Saved Items */}
        <div className="saved-capsules-area">
          <h4 className="capsules-list-title">Your Time Capsules</h4>
          {entries.length === 0 ? (
            <div className="empty-capsules glass">
              <Lock size={24} className="text-muted" style={{ marginBottom: '0.5rem' }} />
              <p>No future letters locked. Write your first capsule letter above!</p>
            </div>
          ) : (
            <div className="capsules-list">
              {entries.map((entry) => {
                const isExpanded = expandedEntry === entry.id;
                return (
                  <div 
                    key={entry.id}
                    className={`capsule-card glass ${isExpanded ? 'is-expanded' : ''}`}
                    onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}
                  >
                    <div className="capsule-card-header">
                      <div className="capsule-card-meta">
                        <Calendar size={13} className="meta-icon" />
                        <span>{entry.date}</span>
                      </div>
                      <button 
                        onClick={(e) => handleDelete(entry.id, e)}
                        className="delete-capsule-btn"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    
                    <div className="capsule-card-title-row">
                      {isExpanded ? <Unlock size={16} className="lock-icon-unlocked" /> : <Lock size={16} className="lock-icon" />}
                      <h4 className="capsule-card-title">{entry.title}</h4>
                    </div>

                    {isExpanded && (
                      <div className="capsule-card-body animate-fade-in">
                        <p className="capsule-content-text">{entry.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Internal Close Icon since X is already imported
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default BirthdayLetter;
