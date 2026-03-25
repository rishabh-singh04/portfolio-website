import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Github, ExternalLink } from "lucide-react";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { LazyImage } from "@/components/ui/lazy-loading";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const PROJECTS = [
  {
    title: "LLM-based Content Moderation System",
    description: "Built a RAG-based content moderation system leveraging embeddings of policy guidelines (US laws, Indian IPC, and platform policies like Meta, Google, Reddit). Uses similarity search to map user content against relevant rules and applies LLM reasoning to classify violations with contextual justification, enabling scalable and explainable moderation workflows.",
    tech: [
      "Python",
      "RAG",
      "Embeddings",
      "LLMs (OpenAI)",
      "FAISS",
      "FastAPI",
      "PostgreSQL",
      "Docker"
    ],
    github: "https://github.com/rishabh-singh04",
    image: "https://repository-images.githubusercontent.com/282252594/0bc47500-d67a-11ea-9e1b-8ddadf5e9b90",
    featured: true,
  },

  {
    title: "AI-Powered Resume Screener",
    description: "Built a full-stack recruitment platform enabling recruiters to post jobs and automatically rank candidates based on skill and experience matching. Implemented LLM-based resume parsing using LLaMA-2 via Ollama, combined with a scoring algorithm to evaluate and rank candidates. Features include resume upload, job-based filtering, and detailed candidate views with structured insights.",
    tech: [
      "Python",
      "FastAPI",
      "HTML",
      "CSS",
      "JavaScript",
      "MongoDB",
      "NLP",
      "LLMs (Ollama - LLaMA 2)",
      "Docker"
    ],
    github: "https://github.com/rishabh-singh04",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIAcsJYTVSxKPdn3meOD7KKy0Usbb41VnGIw&s",
    featured: true,
  },

  {
    title: "Real-Time Discussion Forum",
    description: "Built a backend-driven real-time discussion platform with live updates using GraphQL APIs, Redis Pub/Sub for messaging, and RabbitMQ for asynchronous processing.",
    tech: [
      "FastAPI",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "RabbitMQ"
    ],
    github: "https://github.com/rishabh-singh04",
    image: "https://img.freepik.com/premium-photo/business-meeting-with-colorful-thought-bubbles_1280516-37623.jpg?semt=ais_hybrid&w=740&q=80",
    demo: "#",
    featured: false,
  },

  {
    title: "PPE Violation Detection System",
    description: "Implemented a computer vision system to detect PPE violations using deep learning models, enabling real-time safety monitoring in industrial environments.",
    tech: [
      "Python",
      "Computer Vision",
      "PyTorch",
      "OpenCV",
      "Roboflow",
      "Sandbox"
    ],
    github: "https://github.com/rishabh-singh04",
    image: "https://gotapway.com/wp-content/uploads/2023/08/Insights-2.png",
    featured: false,
  }
];

export function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const animatedProjects = useStaggeredAnimation(PROJECTS, 0.1);

  return (
    <section ref={ref} id="projects" className="py-24 bg-card/30 relative overflow-hidden">
      <AnimatedGrid variant="cross" opacity={0.4} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(99,102,241,0.06), transparent)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="Featured Projects" subtitle="A selection of recent engineering work and AI solutions." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animatedProjects.map(({ item: project, delay }) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay }}
              className="group h-full flex flex-col bg-background rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Project Image */}
              <div className="h-48 bg-card border-b border-white/5 relative overflow-hidden">
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t: string) => (
                    <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-foreground/80 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
