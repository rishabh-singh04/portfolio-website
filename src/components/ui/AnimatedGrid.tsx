import { motion } from "framer-motion";

interface AnimatedGridProps {
  variant?: "dots" | "lines" | "cross";
  className?: string;
  opacity?: number;
}

export function AnimatedGrid({ variant = "dots", className = "", opacity = 1 }: AnimatedGridProps) {
  if (variant === "dots") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          opacity,
          backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    );
  }

  if (variant === "lines") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          opacity,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
    );
  }

  if (variant === "cross") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          opacity,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: "-1px -1px",
        }}
      />
    );
  }

  return null;
}

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[30%] right-[5%] w-[450px] h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 50, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}

export function NoiseMask() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }}
    />
  );
}

export function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
        top: 0,
      }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function GeometricShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-primary/5 rounded-full"
          style={{
            width: 200 + i * 120,
            height: 200 + i * 120,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
