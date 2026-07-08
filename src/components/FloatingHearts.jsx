import React, { useEffect, useRef } from 'react';

const FloatingHearts = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let items = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initItems();
    };

    class MagicalItem {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 12 + 6; // 6 to 18px
        this.speedY = Math.random() * 0.6 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleRange = Math.random() * 10 + 5;
        this.wobbleOffset = Math.random() * 100;
        
        // Colors: pinks, lavenders, cyans
        const colors = [
          '#ff79c6', // Pink
          '#bd93f9', // Purple
          '#8be9fd', // Cyan
          '#ffb86c'  // Orange
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.3 + 0.15;
        // 0 = Heart, 1 = Glowing Bubble
        this.type = Math.random() > 0.55 ? 0 : 1;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin((this.y * this.wobbleSpeed) + this.wobbleOffset) * 0.15;

        if (this.y < -30) {
          this.y = canvas.height + 30;
          this.x = Math.random() * canvas.width;
          this.alpha = Math.random() * 0.3 + 0.15;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        if (this.type === 0) {
          // Heart shape
          ctx.scale(this.size / 30, this.size / 30);
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.bezierCurveTo(-10, -25, -25, -10, -25, 10);
          ctx.bezierCurveTo(-25, 25, -10, 35, 0, 45);
          ctx.bezierCurveTo(10, 35, 25, 25, 25, 10);
          ctx.bezierCurveTo(25, -10, 10, -25, 0, -10);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.alpha;
          ctx.shadowBlur = 6;
          ctx.shadowColor = this.color;
          ctx.fill();
        } else {
          // Bubble shape
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 1.5, 0, Math.PI * 2);
          
          // Bubble gradient
          const grad = ctx.createRadialGradient(-this.size/6, -this.size/6, 1, 0, 0, this.size/1.5);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
          grad.addColorStop(0.3, this.color);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = grad;
          ctx.globalAlpha = this.alpha;
          ctx.shadowBlur = 4;
          ctx.shadowColor = this.color;
          ctx.fill();
          
          // Draw subtle bubble ring
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = '#ffffff';
          ctx.globalAlpha = this.alpha * 0.4;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        ctx.restore();
      }
    }

    const initItems = () => {
      items = [];
      const count = Math.min(Math.floor(window.innerWidth * 0.02), 20);
      for (let i = 0; i < count; i++) {
        const item = new MagicalItem();
        item.y = Math.random() * canvas.height;
        items.push(item);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < items.length; i++) {
        items[i].update();
        items[i].draw();
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

export default FloatingHearts;
