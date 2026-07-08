import React, { useEffect, useRef } from 'react';

const RainbowCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let hue = 0;
    
    // Track mouse position to prevent creating trails when stationary
    let lastX = null;
    let lastY = null;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawSparkle = (ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.moveTo(0, -outerRadius);
      
      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      
      // Neon glow
      ctx.shadowBlur = 6;
      ctx.shadowColor = color;
      
      ctx.fill();
      ctx.restore();
    };

    class Particle {
      constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4; // Sparkle size
        // Slighter explosion speeds
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5 - 0.2; // Drift up slightly
        this.color = `hsla(${hue}, 100%, 75%, `;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.02 + 0.015; // Fade out rate
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      }

      draw() {
        drawSparkle(ctx, this.x, this.y, 4, this.size, this.size / 3.5, `${this.color}${this.alpha})`, this.alpha);
      }
    }

    const addParticles = (x, y) => {
      // Don't draw if distance is too small (stationary cursor filter)
      if (lastX !== null && lastY !== null) {
        const dist = Math.hypot(x - lastX, y - lastY);
        if (dist < 4) return;
      }
      
      lastX = x;
      lastY = y;
      
      // Create 2 sparkles per movement step
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(x, y, hue));
      }
      
      // Increment color hue
      hue = (hue + 6) % 360;
      
      // Cap max particles to ensure zero lag
      if (particles.length > 100) {
        particles.shift();
      }
    };

    // PC Mouse Move
    const handleMouseMove = (e) => {
      addParticles(e.clientX, e.clientY);
    };

    // Phone Touch Drag
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        addParticles(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // Allow clicks to pass through canvas
        zIndex: 99999, // Render on top of everything, including modals!
      }}
    />
  );
};

export default RainbowCursor;
