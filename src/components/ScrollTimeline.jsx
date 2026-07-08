import React, { useState, useEffect, useRef } from 'react';

const ScrollTimeline = ({ memories, onSelectMemory }) => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  const totalItems = memories.length;
  const nodeSpacing = 130; 
  const timelineHeight = totalItems * nodeSpacing;

  let pathD = "M 25 20";
  for (let i = 0; i < totalItems; i++) {
    const startY = 20 + i * nodeSpacing;
    const midY = startY + nodeSpacing / 2;
    const endY = startY + nodeSpacing;
    const wiggleX = i % 2 === 0 ? 38 : 12;
    pathD += ` C ${wiggleX} ${midY - 25}, ${wiggleX} ${midY + 25}, 25 ${endY}`;
  }

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [timelineHeight]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const startTrigger = viewportHeight * 0.8;
      const endTrigger = viewportHeight * 0.2;
      const totalScrollableDist = rect.height - (startTrigger - endTrigger);
      const currentScrollPos = startTrigger - rect.top;

      let percent = currentScrollPos / totalScrollableDist;
      percent = Math.max(0, Math.min(1, percent));
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const strokeDashoffset = pathLength - (pathLength * scrollPercent);

  return (
    <div className="scroll-timeline-section" ref={containerRef}>
      <h2 className="section-title text-center glow-text">Our Journey</h2>
      <p className="section-subtitle text-center">Tap a date to reveal the memory</p>

      <div className="timeline-container-relative" style={{ minHeight: `${timelineHeight + 80}px` }}>
        {/* SVG Curved Timeline Line Centered */}
        <div className="timeline-svg-wrapper">
          <svg 
            width="50" 
            height={timelineHeight + 80} 
            viewBox={`0 0 50 ${timelineHeight + 80}`}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Wavy Path */}
            <path
              d={pathD}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="5 5"
            />
            {/* Foreground Scroll-Reactive Glowing Path */}
            <path
              ref={pathRef}
              d={pathD}
              stroke="url(#gold-gradient-timeline)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={pathLength}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
            <defs>
              <linearGradient id="gold-gradient-timeline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff79c6" />
                <stop offset="50%" stopColor="#f1fa8c" />
                <stop offset="100%" stopColor="#8be9fd" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Timeline Dates List */}
        <div className="timeline-nodes-list">
          {memories.map((memory, index) => {
            const nodeY = 20 + index * nodeSpacing;
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={memory.id} 
                className={`timeline-node-item ${isLeft ? 'node-left' : 'node-right'} animate-fade-in`}
                style={{ 
                  position: 'absolute', 
                  top: `${nodeY}px`,
                  left: '0',
                  width: '100%',
                  height: '40px'
                }}
                onClick={() => onSelectMemory(memory)}
              >
                {/* Center Dot Marker */}
                <div className="timeline-dot-marker">
                  <span className="dot-pulse"></span>
                </div>
                
                {/* Alternating Clickable Date Label */}
                <div className="timeline-node-label-box glass">
                  <span className="timeline-node-date glow-text">{memory.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollTimeline;
