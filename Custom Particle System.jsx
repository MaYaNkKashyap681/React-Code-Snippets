import React, { useEffect, useRef } from 'react';
import CustomCursor2 from './CustomCursor2';

const App2 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
      x: undefined,
      y: undefined
    }

    var particlesArr = []
    canvas.addEventListener("click", (e) => {
      (mouse.x = e.x), (mouse.y = e.y);
      for (var i = 0; i < 2; ++i) {
        particlesArr.push(new Particle());
      }
    });

    canvas.addEventListener("mousemove", (e) => {
      (mouse.x = e.x), (mouse.y = e.y);
      for (var i = 0; i < 2; ++i) {
        particlesArr.push(new Particle());
      }

      console.log(particlesArr)
    });

    class Particle {
      constructor() {
        this.posX = mouse.x;
        this.posY = mouse.y;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.cSize = Math.floor(Math.random() * 4);
        this.color = "white"
      }

      update() {
        if (
          this.posX + this.cSize > window.innerWidth ||
          this.posX - this.cSize < 0
        ) {
          this.speedX = -this.speedX;
        }
        if (
          this.posY + this.cSize > window.innerHeight ||
          this.posY - this.cSize < 0
        ) {
          this.speedY = -this.speedY;
        }
        this.posX += this.speedX;
        this.posY += this.speedY;

        if (this.cSize > 0.2) {
          this.cSize -= 0.1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "yellow";
        ctx.fillStyle = this.color;
        ctx.arc(this.posX, this.posY, this.cSize, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
      }
    }
    function handleParticle() {
      for (var i = 0; i < particlesArr.length; ++i) {
        particlesArr[i].update();
        particlesArr[i].draw();
        if (particlesArr[i].cSize < 0.2) {
          particlesArr.splice(i, 1);
          i--;
        }
      }
    }
    function animate() {
      requestAnimationFrame(animate);
      ctx.fillStyle = "rgba(12, 12, 32)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      handleParticle();
    }
    animate();
  }, [])


  return (
    <>
      <div className='relative'>
        <CustomCursor2 />
        <canvas id="particleCanvas" ref={canvasRef} className = "z-[3]">

        </canvas>
        <div className='absolute top-10 left-10'>
          <h1 className='text-white text-2xl font-bold leading-none'>Hello, I am</h1>
          <h3 className='text-white font-third text-[10rem] font-bold leading-none'>Mayank Kashyap</h3>
        </div>
      </div>
    </>
  );
};

export default App2;
