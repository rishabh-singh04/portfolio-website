import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Database, Cpu, Workflow, CheckCircle2, Server } from "lucide-react";
import { AnimatedGrid, FloatingOrbs } from "@/components/ui/AnimatedGrid";

const EXPERTISE = [
  {
    title: "RAG & Search Systems",
    icon: Database,
    description: "Designing scalable retrieval systems combining semantic understanding with enterprise-grade search.",
    points: [
      "Semantic search using embeddings & vector stores (FAISS)",
      "Hybrid retrieval with Elasticsearch (BM25 + dense vectors)",
      "Enterprise search optimization (indexing, ranking, relevance tuning)",
      "Embedding model evaluation and selection for accuracy vs latency"
    ],
    color: "from-blue-500/20 to-indigo-500/0",
    border: "group-hover:border-blue-500/50"
  },
  {
    title: "LLM Training & Optimization",
    icon: Cpu,
    description: "Fine-tuning and optimizing open-source LLMs for domain-specific performance and efficiency.",
    points: [
      "Fine-tuning using LoRA, QLoRA, and layer freezing techniques",
      "Working with Transformers and Unsloth for efficient training",
      "Automated evaluation pipelines for model benchmarking",
      "Latency, throughput, and cost optimization for production use"
    ],
    color: "from-purple-500/20 to-fuchsia-500/0",
    border: "group-hover:border-purple-500/50"
  },
  {
    title: "LLM Deployment & Inference",
    icon: Server,
    description: "Deploying and scaling LLMs for real-world applications with optimized inference pipelines.",
    points: [
      "Serving open-source LLMs using vLLM for high-throughput inference",
      "Deploying fine-tuned models on AWS Bedrock and EC2",
      "Optimizing inference pipelines for scalability and reliability",
      "Monitoring performance across production workloads"
    ],
    color: "from-orange-500/20 to-amber-500/0",
    border: "group-hover:border-orange-500/50"
  },
  {
    title: "Agentic AI Systems",
    icon: Workflow,
    description: "Building intelligent agent workflows to automate complex business processes.",
    points: [
      "Multi-agent orchestration using CrewAI",
      "Integration with external tools (Slack, Kafka, APIs)",
      "State, memory, and workflow management",
      "Observability and tracing using Langfuse"
    ],
    color: "from-teal-500/20 to-emerald-500/0",
    border: "group-hover:border-teal-500/50"
  }
];

export function AIShowcase() {
  return (
    <section id="showcase" className="py-24 relative overflow-hidden">
      <AnimatedGrid variant="dots" opacity={0.5} />
      <FloatingOrbs />
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="AI Engineering Expertise" 
          subtitle="Specialized capabilities in cutting-edge AI systems and architectures."
          className="text-center mx-auto flex flex-col items-center"
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {EXPERTISE.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative p-8 rounded-3xl bg-card border border-white/5 ${item.border} transition-all duration-500 overflow-hidden shadow-xl`}
            >
              {/* Card Hover Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-background border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                  <item.icon className="w-7 h-7 text-foreground group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-8 text-sm md:text-base">{item.description}</p>
                
                <ul className="space-y-4">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span className="text-foreground/80 font-medium text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
