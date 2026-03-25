import { motion } from "framer-motion";
import { Github, Linkedin, ArrowRight, Mail } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { AnimatedGrid, FloatingOrbs, ScanLine } from "@/components/ui/AnimatedGrid";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function Hero() {
  const { ref, isVisible } = useScrollAnimation();

  const roles = [
    "Software Engineer",
    "AI Engineer",
    "ML Engineer",
    "Data Scientist",
    "Backend Developer",
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dark deep bg base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />

      {/* Interactive particle canvas */}
      <ParticleCanvas />

      {/* Animated dot grid */}
      <AnimatedGrid variant="dots" opacity={0.6} />

      {/* Floating gradient orbs */}
      <FloatingOrbs />

      {/* Horizontal scan line */}
      <ScanLine />

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(5,6,15,0.7) 100%)"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-start max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 leading-[1.05]"
          >
            Hi, I'm{" "}
            <br className="hidden md:block" />
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #818cf8 0%, #6366f1 40%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <TypeAnimation
                sequence={[
                  'Rishabh Singh',
                  2000,
                  'Rishabh',
                  1000,
                  'Rishabh Singh',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </span>
            <br />
            {/* <span
              style={{
                background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Singh
            </span> */}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <motion.div
              className="px-3 py-1 rounded-md text-sm font-semibold border border-primary/20 bg-primary/5 text-primary/90 backdrop-blur-sm"
            >
              <TypeAnimation
                sequence={roles.flatMap(role => [role, 3000]).slice(0, -1)}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={false}
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mb-10 leading-relaxed"
          >
            Building scalable AI systems, LLM pipelines, and intelligent backend architectures
            that transform complex ML research into robust, deployable solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="group px-8 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
              style={{
                background: "linear-gradient(135deg, #6366f1, #38bdf8)",
                boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
              }}
            >
              View Projects
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-xl font-semibold bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-12 flex items-center gap-4"
          >
            <a
              href="https://github.com/rishabh-singh04"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/rishabhsingh0"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <div className="ml-2 h-px flex-1 max-w-24"
              style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40 text-xs"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-primary/40" />
        <span className="tracking-widest uppercase text-[10px]">scroll</span>
      </motion.div>
    </section>
  );
}
