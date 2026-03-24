import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Mail, Github, Linkedin, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '@/lib/emailjs-config';

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      to_email: 'rishabh.singh11219@gmail.com'
    };

    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
      console.warn('EmailJS not configured. Please set up your EmailJS credentials in src/lib/emailjs-config.ts');
      toast({
        title: "Email Not Configured",
        description: "Email sending is not set up yet. Please check the README for EmailJS setup instructions.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        data,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      form.reset();
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I've received your message and will get back to you soon.",
      });
    } catch (error) {
      console.error('Email send failed:', error);
      toast({
        title: "Message Failed",
        description: "Sorry, there was an error sending your message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-card/50 border-t border-white/5 relative overflow-hidden">
      <AnimatedGrid variant="lines" opacity={0.3} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 100% 0%, rgba(56,189,248,0.06), transparent)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Open to AI/ML roles, collaborations, and interesting conversations."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start mt-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="prose prose-invert text-muted-foreground mb-10">
              <p className="text-lg">
                I'm currently looking for new opportunities in AI Engineering and Backend Development. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a href="mailto:rishabh.singh11219@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all group">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg font-bold text-foreground">rishabh.singh11219@gmail.com</p>
                </div>
              </a>

              <a href="https://linkedin.com/in/rishabhsingh0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all group">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                  <p className="text-lg font-bold text-foreground">Rishabh Singh</p>
                </div>
              </a>

              <a href="https://github.com/rishabh-singh04" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all group">
                <div className="p-3 rounded-xl bg-white/10 text-white group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GitHub</p>
                  <p className="text-lg font-bold text-foreground">rishabh-singh04</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-background border border-white/5 shadow-2xl space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <input 
                    id="name"
                    name="name" 
                    required 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input 
                    id="email" 
                    name="email"
                    required 
                    type="email" 
                    placeholder="your email"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <input 
                  id="subject" 
                  name="subject"
                  required 
                  type="text" 
                  placeholder="Collaboration Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  required 
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
