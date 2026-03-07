"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

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
      color: string;
    }[] = [];

    // Subtle mix of primary and secondary colors
    const colors = ["#00F0FF", "#00C4D4", "#8B5CF6", "#7C3AED"];

    for (let i = 0; i < 45; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
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
          if (dist < 180) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - dist / 180)})`;
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

        // Add subtle glow to nodes
        ctx!.shadowBlur = 10;
        ctx!.shadowColor = node.color;

        ctx!.fillStyle = node.color;
        ctx!.globalAlpha = node.opacity;
        ctx!.fill();

        // Reset state
        ctx!.shadowBlur = 0;
        ctx!.globalAlpha = 1;

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
      style={{ opacity: 0.7 }}
    />
  );
}

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
      {/* Animated gradient BG with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />

        {/* Parallax Blurs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"
          animate={{
            x: mousePos.x * -40,
            y: mousePos.y * -40,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px]"
          animate={{
            x: mousePos.x * 50,
            y: mousePos.y * 50,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
        />

        <ParticleBackground />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none mask-image:linear-gradient(to_bottom,black,transparent)" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/20 shadow-[0_0_15px_rgba(0,240,255,0.1)] text-xs font-medium text-primary mb-8 hover:bg-white/5 transition-colors cursor-default">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-semibold text-white mr-1 outline-1">
              v2.0 Release
            </span>
            Institutional Demo Live
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-[5rem] font-bold tracking-tight text-white mb-6 leading-[1.05]">
            <span className="block mb-2">Institutional-Grade</span>
            <span className="gradient-text font-extrabold pb-2">
              Decentralized
            </span>{" "}
            Trading
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-light max-w-2xl mx-auto leading-relaxed mb-10">
            A high-performance trading engine built for scale. Aggregate deep
            liquidity, optimize execution routes, and trade with sub-second
            latency.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-10 text-base group">
                Launch Application
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-base group"
              data-case-study-trigger
            >
              <Play
                size={16}
                className="text-white group-hover:text-primary transition-colors"
              />
              View Case Study
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20 sm:mt-28 flex justify-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="w-6 h-10 rounded-full border border-white/20 flex flex-col items-center justify-start p-1.5 glass bg-black/20">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
