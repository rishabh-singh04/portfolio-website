import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Terminal, BrainCircuit, Rocket } from "lucide-react";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";

export function About() {
  const highlights = [
    { icon: Terminal, title: "1+ Years", desc: "Professional Experience" },
    { icon: BrainCircuit, title: "Data Science", desc: "Research and Development for AI and ML Systems" },
    { icon: Rocket, title: "AI Engineering", desc: "Building AI Agents to production" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <AnimatedGrid variant="lines" opacity={0.4} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 10% 50%, rgba(99,102,241,0.05), transparent)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="About Me" />
        
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Avatar / Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-card to-background border border-white/10 overflow-hidden group shadow-2xl relative flex items-center justify-center">
  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  
  <img
    src="/self.png"
    alt="Rishabh Singh"
    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
  />
</div>
            
            {/* Decorative dots */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_2px,transparent_2px)] [background-size:12px_12px]" />
          </motion.div>

          {/* Text Content Column */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-invert prose-lg max-w-none text-muted-foreground"
            >
              <p>
                I am a Software Engineer focused on building scalable backend systems and production-ready AI solutions. With hands-on experience in GenAI, LLM fine-tuning, and distributed systems, I specialize in designing high-performance APIs, intelligent workflows, and data-driven applications.
              </p>
              <p>
                I have worked on enterprise SaaS platforms, optimizing search systems, deploying AI agents, and reducing infrastructure costs through efficient model usage.
              </p>
              <p>
                My work sits at the intersection of backend engineering and applied AI—where performance, scalability, and real-world impact matter.
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h4 className="text-foreground font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

