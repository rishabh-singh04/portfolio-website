import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, isDown: false });
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const analyticsRef = useRef({ moves: 0, clicks: 0, lastReport: Date.now() });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#6366f1", "#818cf8", "#a5b4fc", "#60a5fa", "#38bdf8"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };
    initParticles();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isDown: mouseRef.current.isDown,
      };

      analyticsRef.current.moves += 1;
      if (analyticsRef.current.moves % 300 === 0) {
        const now = Date.now();
        const elapsed = (now - analyticsRef.current.lastReport) / 1000;
        console.debug(
          `[analytics] mouse move count=${analyticsRef.current.moves}, clicks=${analyticsRef.current.clicks}, elapsed=${elapsed.toFixed(1)}s`,
        );
        analyticsRef.current.lastReport = now;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      mouseRef.current = { ...mouseRef.current, x: clickX, y: clickY };
      analyticsRef.current.clicks += 1;

      for (let i = 0; i < 15; i++) {
        const p: Particle = {
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          size: Math.random() * 2 + 1,
          opacity: 0.9,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        particlesRef.current.push(p);
      }
      if (particlesRef.current.length > 220) {
        particlesRef.current.splice(0, particlesRef.current.length - 220);
      }
    };
    window.addEventListener("click", onClick);

    const drawLine = (p1: Particle, p2: Particle, dist: number, maxDist: number) => {
      const alpha = (1 - dist / maxDist) * 0.15;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const maxDist = 150;
      const mouseInfluence = 120;

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseInfluence) {
          const force = (mouseInfluence - dist) / mouseInfluence;
          const attraction = mouse.isDown ? -0.05 : 0.03;
          p.vx += (dx / dist) * force * attraction;
          p.vy += (dy / dist) * force * attraction;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw a small indicator ring around cursor for better hover interactivity
      if (mouse.x >= 0 && mouse.y >= 0 && mouse.x <= canvas.width && mouse.y <= canvas.height) {
        const ping = 6 + Math.sin(Date.now() / 180) * 2;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, ping, 0, Math.PI * 2);
        ctx.strokeStyle = mouse.isDown ? "rgba(248, 113, 113, 0.8)" : "rgba(37, 99, 235, 0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            drawLine(particles[i], particles[j], dist, maxDist);
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener("resize", onResize);

    const onMouseDown = () => {
      mouseRef.current.isDown = true;
    };
    const onMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
