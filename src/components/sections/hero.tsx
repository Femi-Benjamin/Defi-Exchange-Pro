"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

// Floating token nodes rendered on canvas for performance
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const nodes: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    function animate() {
      ctx!.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - dist / 150)})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw & update nodes
      for (const node of nodes) {
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 229, 255, ${node.opacity})`;
        ctx!.fill();

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
      }

      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-gradient" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        <ParticleBackground />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            Now Live — v2.0 Release
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-6">
            Institutional-Grade{" "}
            <span className="gradient-text">Decentralized</span> Trading
            Infrastructure
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">
            Aggregate liquidity. Optimize execution. Trade at scale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-[#0B0F19] font-semibold text-sm hover:bg-primary/90 transition-all duration-300 glow-primary hover:glow-primary-intense hover:-translate-y-0.5"
            >
              Launch App
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <button
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass text-white font-medium text-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              data-case-study-trigger
            >
              <Play size={14} />
              View Case Study
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
