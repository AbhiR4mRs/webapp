import React from 'react';
import { Download, ZoomIn, Play } from 'lucide-react';

const Gallery = ({ memories, onSelectPhoto }) => {
  const isVideo = (url) => {
    if (!url) return false;
    const ext = url.split('.').pop().toLowerCase();
    return ['mp4', 'mov', 'webm', 'ogg'].includes(ext);
  };

  const handleDownload = (e, imgUrl, title) => {
    e.stopPropagation(); // Stop from opening the lightbox
    
    // Clean title to form a friendly filename
    const cleanTitle = title ? title.toLowerCase().replace(/\s+/g, '_') : 'memory';
    const filename = `${cleanTitle}.jpg`;

    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="gallery-section animate-fade-in">
      <h2 className="section-title text-center glow-text">Photo Gallery</h2>
      <p className="section-subtitle text-center">A collection of Karthu's favorite captures</p>

      {/* Grid of Photos - Masonry column layout */}
      <div className="gallery-grid">
        {memories.map((photo, index) => {
          const videoType = isVideo(photo.image);
          return (
            <div 
              key={photo.id} 
              className="gallery-card glass"
              style={{ '--i': index }} // Pass index for staggered transition delay
              onClick={() => onSelectPhoto(photo)}
            >
              {/* Image/Video Box */}
              <div className="gallery-image-box">
                {videoType ? (
                  <div className="gallery-video-wrapper">
                    <video 
                      src={photo.image} 
                      muted 
                      playsInline
                      preload="metadata"
                      className="gallery-video-preview"
                    />
                    <div className="video-play-indicator">
                      <Play size={18} className="play-icon" />
                    </div>
                  </div>
                ) : (
                  <img 
                    src={photo.image} 
                    alt={photo.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      // Add image fallback to parent
                      e.target.parentNode.classList.add('image-fallback');
                    }}
                  />
                )}
                
                <div className="photo-placeholder-overlay">
                  <span className="photo-placeholder-icon">📸</span>
                  <span className="photo-placeholder-text">Karthu 💖</span>
                </div>
                
                {/* Floating Download Button in corner */}
                <button 
                  className="gallery-floating-download-btn"
                  onClick={(e) => handleDownload(e, photo.image, photo.title)}
                  aria-label="Download Photo"
                >
                  <Download size={15} />
                </button>

                {/* Zoom overlay on hover */}
                <div className="gallery-hover-overlay">
                  <ZoomIn size={24} className="zoom-icon" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
