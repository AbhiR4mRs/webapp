import React, { useState } from 'react';
import FloatingParticles from './components/FloatingParticles';
import FloatingHearts from './components/FloatingHearts';
import RainbowCursor from './components/RainbowCursor';
import Countdown from './components/Countdown';
import FoldingCard3D from './components/FoldingCard3D';
import Cake from './components/Cake';
import ScrollTimeline from './components/ScrollTimeline';
import Gallery from './components/Gallery';
import BirthdayLetter from './components/BirthdayLetter';
import { BIRTHDAY_CONFIG } from './config/memories';
import { Home, Mail, Camera, Image, Calendar, X, Download, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'letter' | 'memories' | 'gallery'
  const [isTabChanging, setIsTabChanging] = useState(false);
  
  // Lifted modal state for centering outside animated transform blocks
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Lifted Gallery Lightbox state
  const [activePhoto, setActivePhoto] = useState(null);

  const isVideo = (url) => {
    if (!url) return false;
    const ext = url.split('.').pop().toLowerCase();
    return ['mp4', 'mov', 'webm', 'ogg'].includes(ext);
  };

  const handleDownload = (e, imgUrl, title) => {
    e.stopPropagation();
    const cleanTitle = title ? title.toLowerCase().replace(/\s+/g, '_') : 'memory';
    const filename = `${cleanTitle}.jpg`;

    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUnlock = () => {
    setUnlocked(true);
    
    // Launch a celebratory welcome confetti shower!
    confetti({
      particleCount: 150,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#ffe596', '#d4af37', '#ff7597', '#c084fc']
    });
  };

  const handleTabChange = (tabName) => {
    if (tabName === activeTab) return;
    
    setIsTabChanging(true);
    
    // Smooth transition delay to show unicorn loading spinner
    setTimeout(() => {
      setActiveTab(tabName);
      
      // Scroll window back to top when switching tabs
      window.scrollTo({
        top: 0,
        behavior: 'instant' 
      });
      
      setIsTabChanging(false);
    }, 750);
  };

  const handleOpenMemory = (memory) => {
    setSelectedMemory(memory);
    setIsFlipped(true); // Show written side (story text) first!
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="tab-pane animate-fade-in">
            {/* Floating Hearts active on the home tab */}
            <FloatingHearts />
            
            {/* Section 1: 3D Greeting Card */}
            <section className="section-card-wrapper">
              <FoldingCard3D 
                name={BIRTHDAY_CONFIG.birthdayName} 
                greeting={BIRTHDAY_CONFIG.cardGreeting} 
              />
            </section>

            {/* Section 2: Virtual Interactive Cake */}
            <section className="section-cake-wrapper">
              <Cake />
            </section>

            {/* Section 3: What I Love About You Joke Section */}
            <section className="joke-section glass animate-fade-in">
              <h2 className="joke-title glow-text">
                <span>🦄</span> What I Love About You...
              </h2>
              <div className="joke-gallery">
                <div className="joke-photo-card">
                  <img src="/images/joke1.jpg" alt="You" />
                </div>
                <div className="joke-photo-card">
                  <img src="/images/joke2.jpg" alt="You" />
                </div>
                <div className="joke-photo-card">
                  <img src="/images/joke3.jpg" alt="You" />
                </div>
                <div className="joke-photo-card">
                  <img src="/images/joke4.jpg" alt="You" />
                </div>
              </div>
              <div className="joke-punchline glow-text">
                ITS YOUR BUTT 🍑
              </div>
            </section>
          </div>
        );
      
      case 'letter':
        return (
          <div className="tab-pane animate-fade-in">
            <BirthdayLetter />
          </div>
        );

      case 'memories':
        return (
          <div className="tab-pane animate-fade-in">
            <ScrollTimeline 
              memories={BIRTHDAY_CONFIG.memories} 
              onSelectMemory={handleOpenMemory}
            />
          </div>
        );

      case 'gallery':
        return (
          <div className="tab-pane animate-fade-in">
            <Gallery 
              memories={BIRTHDAY_CONFIG.gallery} 
              onSelectPhoto={setActivePhoto}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Interactive Rainbow Cursor trail follows mouse/finger drags */}
      <RainbowCursor />

      {/* Sparkly particle canvas drifting in the background globally */}
      <FloatingParticles />

      {/* Main App Container */}
      <div className="app-container">
        {!unlocked ? (
          <div className="entry-wrapper">
            <Countdown 
              targetDate={BIRTHDAY_CONFIG.birthdayDate} 
              name={BIRTHDAY_CONFIG.birthdayName}
              onComplete={handleUnlock}
            />
          </div>
        ) : (
          <div className="main-content-layout animate-fade-in">
            {/* Header Area */}
            <header className="header-area">
              <span className="celebration-sparkle-text">Happy Birthday, {BIRTHDAY_CONFIG.birthdayName}! </span>
              <h1 className="page-title glow-text">Celebrating You</h1>
            </header>

            {/* Tab Page Area */}
            <main className="tab-content-area">
              {renderTabContent()}
            </main>

            {/* App Footer */}
            <footer className="app-footer" style={{ marginBottom: '80px' }}>
              <p className="footer-text">
                Made with <span className="footer-heart">❤️</span> by your best friend
              </p>
              <p className="footer-text" style={{ fontSize: '0.7rem', marginTop: '0.2rem', opacity: 0.6 }}>
                July 24, 2026
              </p>
            </footer>

            {/* Bottom Tab Navigation Bar */}
            <nav className="bottom-navbar glass">
              <button 
                className={`nav-tab-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleTabChange('home')}
                aria-label="Home Wishes Tab"
              >
                <Home size={22} className="nav-tab-icon" />
                <span className="nav-tab-label">HOME</span>
              </button>
              
              <button 
                className={`nav-tab-item ${activeTab === 'letter' ? 'active' : ''}`}
                onClick={() => handleTabChange('letter')}
                aria-label="Birthday Letter Tab"
              >
                <Mail size={22} className="nav-tab-icon" />
                <span className="nav-tab-label">FOR YOU</span>
              </button>
              
              <button 
                className={`nav-tab-item ${activeTab === 'memories' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('memories');
                  confetti({ particleCount: 30, spread: 40, origin: { y: 0.85 } });
                }}
                aria-label="Memories Timeline Tab"
              >
                <Camera size={22} className="nav-tab-icon" />
                <span className="nav-tab-label">Memories</span>
              </button>

              <button 
                className={`nav-tab-item ${activeTab === 'gallery' ? 'active' : ''}`}
                onClick={() => handleTabChange('gallery')}
                aria-label="Photo Gallery Tab"
              >
                <Image size={22} className="nav-tab-icon" />
                <span className="nav-tab-label">Gallery</span>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Fullscreen Unicorn Page Transition Loading Overlay */}
      {isTabChanging && (
        <div className="tab-loading-overlay animate-fade-in">
          <div className="unicorn-loading-container">
            <div className="unicorn-spinner">
              <span className="spinner-unicorn-emoji">🦄</span>
            </div>
            <p className="unicorn-loading-text animate-pulse">Chasing Rainbows...</p>
          </div>
        </div>
      )}

      {/* Pop-up Memory Details Modal - Rendered at ROOT level outside parent transforms */}
      {selectedMemory && (
        <div className="memory-modal-overlay" onClick={() => setSelectedMemory(null)}>
          <div 
            className="memory-modal-perspective"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Magical Unicorn Horn & Ears Headband */}
            <div className="card-unicorn-horn"></div>
            <div className="card-unicorn-ear ear-left"></div>
            <div className="card-unicorn-ear ear-right"></div>

            {/* 3D Flip Card Container */}
            <div 
              className={`memory-modal-flip-card ${isFlipped ? 'is-flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* FRONT FACE: Photo Cover */}
              <div className="memory-modal-face memory-modal-front glass">
                <button 
                  className="close-modal-btn" 
                  onClick={(e) => { e.stopPropagation(); setSelectedMemory(null); }} 
                  aria-label="Close Memory"
                >
                  <X size={22} />
                </button>

                <div className="memory-front-photo-wrapper">
                  <img 
                    src={selectedMemory.image} 
                    alt="" 
                    className="memory-image-blur-bg" 
                  />
                  <img 
                    src={selectedMemory.image} 
                    alt={selectedMemory.title}
                    className="memory-image-fg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('image-fallback');
                    }}
                  />
                  <div className="photo-placeholder-overlay">
                    <span className="photo-placeholder-icon">📸</span>
                    <span className="photo-placeholder-text">{selectedMemory.date}</span>
                  </div>

                  {/* Tap to Rotate indicator badge */}
                  <div className="photo-rotate-badge">
                    <RefreshCw size={12} className="rotate-badge-icon" />
                    <span>Tap to Flip</span>
                  </div>
                </div>

                <div className="memory-front-footer">
                  <span className="tap-flip-hint glow-text">Tap photo to read story ✨</span>
                </div>
              </div>

              {/* BACK FACE: Text story details */}
              <div className="memory-modal-face memory-modal-back glass">
                <button 
                  className="close-modal-btn" 
                  onClick={(e) => { e.stopPropagation(); setSelectedMemory(null); }} 
                  aria-label="Close Memory"
                >
                  <X size={22} />
                </button>

                <div className="memory-modal-details">
                  <div>
                    <div className="memory-modal-meta">
                      <Calendar size={13} className="meta-icon" />
                      <span>{selectedMemory.date}</span>
                    </div>
                    <h3 className="memory-modal-title glow-text">{selectedMemory.title}</h3>
                    
                    <div className="notebook-divider"></div>
                  </div>
                  
                  <p className="memory-modal-desc">{selectedMemory.description}</p>
                  
                  <div className="memory-back-footer">
                    <span className="tap-flip-hint">Tap card to see photo 📸</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal - Rendered at ROOT level outside parent transforms */}
      {activePhoto && (
        <div className="lightbox-overlay" onClick={() => setActivePhoto(null)}>
          <div className="lightbox-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="close-lightbox-btn" onClick={() => setActivePhoto(null)} aria-label="Close Lightbox">
              <X size={24} />
            </button>

            {/* Lightbox Image / Video */}
            <div className="lightbox-image-wrapper">
              {isVideo(activePhoto.image) ? (
                <video 
                  src={activePhoto.image}
                  controls
                  autoPlay
                  playsInline
                  className="lightbox-video-player"
                />
              ) : (
                <>
                  <img 
                    src={activePhoto.image} 
                    alt="" 
                    className="gallery-image-blur-bg" 
                  />
                  <img 
                    src={activePhoto.image} 
                    alt={activePhoto.title}
                    className="gallery-image-fg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('image-fallback');
                    }}
                  />
                </>
              )}
              <div className="photo-placeholder-overlay">
                <span className="photo-placeholder-icon">📸</span>
                <span className="photo-placeholder-text">{activePhoto.date}</span>
              </div>
            </div>

            {/* Lightbox details & download */}
            <div className="lightbox-footer glass">
              <div className="lightbox-meta">
                <div className="lightbox-date-row">
                  <Calendar size={13} className="meta-icon" />
                  <span>{activePhoto.date}</span>
                </div>
                <h3 className="lightbox-title glow-text">{activePhoto.title}</h3>
              </div>
              <button 
                className="lightbox-download-action-btn"
                onClick={(e) => handleDownload(e, activePhoto.image, activePhoto.title)}
              >
                <Download size={18} style={{ marginRight: '0.4rem' }} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
