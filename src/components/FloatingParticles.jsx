import React, { useEffect, useRef } from 'react';

const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Draw helper for a 4-pointed sparkle or 5-pointed star
    const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha, rotation = 0) => {
      let rot = (Math.PI / 2) * 3 + rotation;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
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
      
      // Add neon aura glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      
      ctx.fill();
      ctx.restore();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height;
        this.size = Math.random() * 6 + 4; // size in radius
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.2;
        
        // Unicorn Pastel Colors
        const colors = [
          '#ff79c6', // Pastel Pink
          '#bd93f9', // Pastel Purple
          '#8be9fd', // Pastel Cyan
          '#f1fa8c', // Pastel Gold
          '#ffb86c'  // Pastel Orange
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = Math.random() * 0.004 + 0.002;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        
        // Shape type: 0 = 4-point sparkle, 1 = 5-point star, 2 = circular bubble
        this.type = Math.floor(Math.random() * 3);
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y / 40) * 0.12;
        this.rotation += this.rotationSpeed;

        // Fade in and out
        if (this.alpha <= 0.15) this.direction = 1;
        if (this.alpha >= 0.75) this.direction = -1;
        this.alpha += this.direction * this.fadeSpeed;

        // Reset if goes off screen
        if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
          this.y = canvas.height + 20;
          this.x = Math.random() * canvas.width;
          this.alpha = Math.random() * 0.5 + 0.2;
        }
      }

      draw() {
        if (this.type === 0) {
          // 4-pointed sparkle
          drawStar(ctx, this.x, this.y, 4, this.size, this.size / 3.5, this.color, this.alpha, this.rotation);
        } else if (this.type === 1) {
          // 5-pointed star
          drawStar(ctx, this.x, this.y, 5, this.size, this.size / 2.2, this.color, this.alpha, this.rotation);
        } else {
          // Circular magical bubble
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.alpha;
          ctx.shadowBlur = 6;
          ctx.shadowColor = this.color;
          ctx.fill();
          ctx.restore();
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.04), 45); // Responsive density
      for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        p.y = Math.random() * canvas.height;
        particles.push(p);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
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
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default FloatingParticles;
