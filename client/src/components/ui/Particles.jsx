import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Particles = () => {
    const canvasRef = useRef(null);
    const { darkMode } = useSelector((state) => state.theme);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 60;
        
        // Colors from theme: 
        // light mode: orange, dark mode: yellow/amber
        const getColors = () => darkMode 
            ? ['rgba(255, 191, 0, 0.4)', 'rgba(217, 119, 6, 0.3)'] 
            : ['rgba(217, 119, 6, 0.3)', 'rgba(255, 191, 0, 0.2)'];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.colors = getColors();
                this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.01;

                // wrap around
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
                
                // Keep glowing/fading
                if(this.size <= 0.2) {
                    this.size = Math.random() * 3 + 1;
                    this.colors = getColors();
                    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
                }
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            // Add subtle connections
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        ctx.strokeStyle = darkMode ? `rgba(255, 191, 0, ${0.1 - distance/1200})` : `rgba(217, 119, 6, ${0.1 - distance/1200})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [darkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    );
};

export default Particles;
