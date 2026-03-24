import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Briefcase } from "lucide-react";
import { AnimatedGrid, FloatingOrbs } from "@/components/ui/AnimatedGrid";

const EXPERIENCES = [
  {
    company: "Simpplr",
    role: "Software Engineer",
    period: "August 2025 - Present",
    points: [
      "Worked on optimizing enterprise-grade search systems using Elasticsearch, improving search relevance and reducing latency across large-scale SaaS data pipelines.",
      "Fine-tuned domain-specific open-source LLMs using Unsloth, reducing dependency on proprietary models and cutting cost and latency by over 50+%.",
      "Developed scalable backend services using FastAPI and Python, supporting AWS Bedrock and EC2-based workflows for model training, deployment, and inference.",
      "Designed AI-driven workflows using CrewAI agents, integrating Slack and Kafka for event-driven automation.",
      "Implemented observability and tracing using Langfuse, ensuring reliability and transparency in AI pipelines."
    ]
  },
  {
    company: "EPAM Systems",
    role: "Jr. Software Engineer",
    period: "Jan 2025 - June 2025",
    points: [
      "Developed backend microservices using Flask and FastAPI, improving system modularity and reliability.",
      "Designed and implemented RESTful and GraphQL APIs for efficient data handling and seamless integration.",
      "Built GenAI-powered features using RAG pipelines and prompt optimization techniques.",
      "Used Docker to create consistent, production-ready environments for deployment."
    ]
  },
  {
    company: "NVIDIA",
    role: "Research Trainee",
    period: "Jan 2021 - May 2021",
    points: [
      "Trained on building and optimizing machine learning models using NVIDIA DGX A100 GPUs.",
      "Improved model training efficiency by up to 50% through optimized GPU utilization.",
      "Worked on end-to-end ML pipelines, from preprocessing to deployment on GPU-based systems.",
      "Gained exposure to Agile workflows and real-world ML system design."
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <AnimatedGrid variant="dots" opacity={0.35} />
      <FloatingOrbs />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="Work Experience" className="text-center md:text-left" />

        <div className="relative mt-12">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-2 md:left-6 -translate-x-1/2 top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(120,119,198,0.5)] z-10" />

                <div className="bg-card border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        {exp.role}
                      </h3>
                      <p className="text-primary font-medium mt-1 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-sm text-muted-foreground font-medium w-max">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mt-4">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
