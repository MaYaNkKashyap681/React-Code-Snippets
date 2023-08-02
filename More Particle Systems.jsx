import React, { useState, useEffect, useRef } from 'react';

const App4 = () => {
    const canvasRef = useRef(null);
    let particles = [];
    const particleSize = 2;
    const maxParticles = 4;
    const mouseEffectRadius = 100;

    class Particle {
        constructor(x, y, vx, vy, color) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.color = color;
            this.life = 100;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            const mousePosX = e.clientX;
            const mousePosY = e.clientY;
            const newParticles = [];
            for (let i = 0; i < maxParticles; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 1;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                const color = getRandomColor();
                newParticles.push(new Particle(mousePosX, mousePosY, vx, vy, color));
            }
            particles.push(...newParticles);
        };

        const animate = () => {
            updateParticles();
            drawParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        const updateParticles = () => {
            particles = particles
                .map((particle) => ({
                    ...particle,
                    x: particle.x + particle.vx,
                    y: particle.y + particle.vy,
                    life: particle.life - 1,
                }))
                .filter((particle) => particle.life > 0);
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particleSize, 0, 2 * Math.PI);
                ctx.fill();
            });
        };

        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        animate();

        // Clean up event listeners and animation frame
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []); // Empty dependency array to run the effect only once

    return (
        <div className="h-screen w-screen relative">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            <div className="relative z-10 p-10">
                <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
                <p className="text-lg text-gray-600">This is some content below the interactive particle system.</p>
            </div>
        </div>
    );

    /*    const canvasRef = useRef(null);
       let particles = [];
       const particleSize = 2;
       const maxParticles = 100;
       const mouseEffectRadius = 100;
   
       class Particle {
           constructor(x, y, vx, vy, color) {
               this.x = x;
               this.y = y;
               this.vx = vx;
               this.vy = vy;
               this.color = color;
               this.life = 100;
           }
   
           update() {
               this.x += this.vx;
               this.y += this.vy;
               this.life -= 2; // Particles will disappear more quickly
           }
       }
   
       useEffect(() => {
           const canvas = canvasRef.current;
           const ctx = canvas.getContext('2d');
           let animationFrameId;
   
           const handleResize = () => {
               canvas.width = window.innerWidth;
               canvas.height = window.innerHeight;
           };
   
           const handleMouseMove = (e) => {
               const mousePosX = e.clientX;
               const mousePosY = e.clientY;
               const newParticles = [];
               for (let i = 0; i < maxParticles; i++) {
                   const angle = Math.random() * Math.PI * 2;
                   const speed = Math.random() * 3 + 1;
                   const vx = Math.cos(angle) * speed;
                   const vy = Math.sin(angle) * speed;
                   const color = getRandomColor();
                   newParticles.push(new Particle(mousePosX, mousePosY, vx, vy, color));
               }
               particles.push(...newParticles);
           };
   
           const animate = () => {
               updateParticles();
               drawParticles();
               animationFrameId = requestAnimationFrame(animate);
           };
   
           const updateParticles = () => {
               particles.forEach((particle) => particle.update());
               particles = particles.filter((particle) => particle.life > 0);
           };
   
           const drawParticles = () => {
               ctx.clearRect(0, 0, canvas.width, canvas.height);
               ctx.shadowBlur = 20;
               ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'; // Add glowing trail effect
               particles.forEach((particle) => {
                   const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particleSize);
                   gradient.addColorStop(0, particle.color);
                   gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent outer color for sparkle effect
                   ctx.fillStyle = gradient;
                   ctx.beginPath();
                   ctx.arc(particle.x, particle.y, particleSize, 0, 2 * Math.PI);
                   ctx.fill();
               });
           };
   
           const getRandomColor = () => {
               const letters = '0123456789ABCDEF';
               let color = '#';
               for (let i = 0; i < 6; i++) {
                   color += letters[Math.floor(Math.random() * 16)];
               }
               return color;
           };
   
           canvas.width = window.innerWidth;
           canvas.height = window.innerHeight;
   
           window.addEventListener('resize', handleResize);
           window.addEventListener('mousemove', handleMouseMove);
   
           animate();
   
           // Clean up event listeners and animation frame
           return () => {
               window.removeEventListener('resize', handleResize);
               window.removeEventListener('mousemove', handleMouseMove);
               cancelAnimationFrame(animationFrameId);
           };
       }, []); // Empty dependency array to run the effect only once
   
       return (
           <div className="h-screen w-screen relative bg-black">
               <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
               <div className="relative z-10 p-10">
                   <h1 className="text-4xl font-bold mb-4 text-white">Welcome to My Website</h1>
                   <p className="text-lg text-gray-300">This is some content below the interactive particle system.</p>
               </div>
           </div>
       ); */
    /*  const canvasRef = useRef(null);
     let particles = [];
     const particleSize = 2;
     const maxParticles = 100;
     const mouseEffectRadius = 100;
 
     class Particle {
         constructor(x, y, vx, vy, color) {
             this.x = x;
             this.y = y;
             this.vx = vx;
             this.vy = vy;
             this.color = color;
             this.life = 100;
         }
 
         update() {
             this.x += this.vx;
             this.y += this.vy;
             this.life -= 2; // Particles will disappear more quickly
         }
     }
 
     useEffect(() => {
         const canvas = canvasRef.current;
         const ctx = canvas.getContext('2d');
         let animationFrameId;
 
         const handleResize = () => {
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
         };
 
         const handleMouseMove = (e) => {
             const mousePosX = e.clientX;
             const mousePosY = e.clientY;
             const newParticles = [];
             for (let i = 0; i < maxParticles; i++) {
                 const angle = Math.random() * Math.PI * 2;
                 const speed = Math.random() * 3 + 1;
                 const vx = Math.cos(angle) * speed;
                 const vy = Math.sin(angle) * speed;
                 const color = '#FFFFFF'; // White color for the particles
                 newParticles.push(new Particle(mousePosX, mousePosY, vx, vy, color));
             }
             particles.push(...newParticles);
         };
 
         const animate = () => {
             updateParticles();
             drawParticles();
             animationFrameId = requestAnimationFrame(animate);
         };
 
         const updateParticles = () => {
             particles.forEach((particle) => particle.update());
             particles = particles.filter((particle) => particle.life > 0);
         };
 
         const drawParticles = () => {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
             ctx.shadowBlur = 10;
             ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'; // Add glowing trail effect
 
             particles.forEach((particle) => {
                 const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particleSize * 5);
                 gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); // Inner white color with neon glow
                 gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Outer transparent color for sparkle effect
                 ctx.fillStyle = gradient;
                 ctx.beginPath();
                 ctx.arc(particle.x, particle.y, particleSize * 5, 0, 2 * Math.PI);
                 ctx.fill();
             });
         };
 
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
 
         window.addEventListener('resize', handleResize);
         window.addEventListener('mousemove', handleMouseMove);
 
         animate();
 
         // Clean up event listeners and animation frame
         return () => {
             window.removeEventListener('resize', handleResize);
             window.removeEventListener('mousemove', handleMouseMove);
             cancelAnimationFrame(animationFrameId);
         };
     }, []); // Empty dependency array to run the effect only once
 
     return (
         <div className="h-screen w-screen relative bg-black">
             <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
             <div className="relative z-10 p-10">
                 <h1 className="text-4xl font-bold mb-4 text-white">Welcome to My Website</h1>
                 <p className="text-lg text-gray-300">This is some content below the interactive particle system.</p>
             </div>
         </div>
     ); */
};

export default App4;
