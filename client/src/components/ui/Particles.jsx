import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function createParticle(canvas, colors) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 3 + 1;
    const speedX = Math.random() * 1 - 0.5;
    const speedY = Math.random() * 1 - 0.5;
    let color = colors[Math.floor(Math.random() * colors.length)];

    return {
        get x() { return x; },
        get y() { return y; },
        get size() { return size; },
        update(currentColors) {
            x += speedX;
            y += speedY;

            if (size > 0.2) size -= 0.01;

            if (x < 0) x = canvas.width;
            if (x > canvas.width) x = 0;
            if (y < 0) y = canvas.height;
            if (y > canvas.height) y = 0;

            if (size <= 0.2) {
                size = Math.random() * 3 + 1;
                color = currentColors[Math.floor(Math.random() * currentColors.length)];
            }
        },
        draw(ctx) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    };
}

const Particles = () => {
    const canvasRef = useRef(null);
    const { darkMode } = useSelector((state) => state.theme);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 60;

        const getColors = () => darkMode 
            ? ['rgba(255, 191, 0, 0.4)', 'rgba(217, 119, 6, 0.3)'] 
            : ['rgba(217, 119, 6, 0.3)', 'rgba(255, 191, 0, 0.2)'];

        const init = () => {
            particles.length = 0;
            const colors = getColors();
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle(canvas, colors));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const currentColors = getColors();
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(currentColors);
                particles[i].draw(ctx);
            }
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
