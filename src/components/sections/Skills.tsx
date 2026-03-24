import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Brain, Server, Database, Container, Code, Cpu, Wrench } from "lucide-react";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";

const SKILL_GROUPS = [
  {
    title: "AI / Machine Learning",
    icon: Brain,
    skills: [
      "LLM Fine-tuning",
      "Retrieval-Augmented Generation (RAG)",
      "Agentic Workflows",
      "Natural Language Processing (NLP)",
      "Prompt Engineering",
      "Semantic Search",
      "Transformers",
      "Hugging Face"
    ]
  },
  {
    title: "Backend & API Development",
    icon: Server,
    skills: [
      "FastAPI",
      "Flask",
      "RESTful APIs",
      "GraphQL",
      "Streamlit"
    ]
  },
  {
    title: "AI Frameworks & Tooling",
    icon: Cpu,
    skills: [
      "CrewAI",
      "Unsloth",
      "Langfuse",
      "FAISS",
      "Whisper"
    ]
  },
  {
    title: "Databases & Search Systems",
    icon: Database,
    skills: [
      "PostgreSQL",
      "MySQL",
      "Elasticsearch",
      "Redis",
      "Vector Databases",
      "Indexing & Retrieval Pipelines"
    ]
  },
  {
    title: "Infrastructure & Distributed Systems",
    icon: Container,
    skills: [
      "Docker",
      "Kafka",
      "RabbitMQ",
      "AWS (EC2, Bedrock, S3)"
    ]
  },
  {
    title: "Developer Tools & Practices",
    icon: Wrench,
    skills: [
      "Git & GitHub",
      "CI/CD",
      "Swagger / API Documentation",
      "Pytest",
      "Label Studio"
    ]
  },
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      "Python",
      "C/C++",
      "JavaScript",
      "SQL"
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-card/30 relative overflow-hidden">
      <AnimatedGrid variant="cross" opacity={0.5} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 90% 50%, rgba(56,189,248,0.05), transparent)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Technical Skills" 
          subtitle="A comprehensive toolkit for building intelligent, scalable applications."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, groupIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-white/10 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <group.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{group.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium rounded-md bg-white/5 border border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

