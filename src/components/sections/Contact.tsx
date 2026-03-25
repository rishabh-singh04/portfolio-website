import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Mail, Github, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '@/lib/emailjs-config';
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function Contact() {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'subject':
        return value.length < 5 ? 'Subject must be at least 5 characters' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    return Object.values(errors).every(error => !error) &&
           Object.values(formData).every(value => value.trim() !== '') &&
           Object.keys(formData).every(key => touched[key]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    const data = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
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

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
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
    <section ref={ref} id="contact" className="py-24 bg-card/50 border-t border-white/5 relative overflow-hidden">
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
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
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
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-background border border-white/5 shadow-2xl space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      required
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-all ${
                        errors.name && touched.name
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-white/10 focus:border-primary focus:ring-primary'
                      }`}
                    />
                    <AnimatePresence>
                      {touched.name && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {errors.name ? (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          ) : formData.name ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-500"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      placeholder="your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-all ${
                        errors.email && touched.email
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-white/10 focus:border-primary focus:ring-primary'
                      }`}
                    />
                    <AnimatePresence>
                      {touched.email && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {errors.email ? (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          ) : formData.email && !errors.email ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-500"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <div className="relative">
                  <input
                    id="subject"
                    name="subject"
                    required
                    type="text"
                    placeholder="Collaboration Opportunity"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-all ${
                      errors.subject && touched.subject
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-primary focus:ring-primary'
                    }`}
                  />
                  <AnimatePresence>
                    {touched.subject && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {errors.subject ? (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        ) : formData.subject && !errors.subject ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {errors.subject && touched.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-all resize-none ${
                      errors.message && touched.message
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-primary focus:ring-primary'
                    }`}
                  />
                  <AnimatePresence>
                    {touched.message && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-3 top-3"
                      >
                        {errors.message ? (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        ) : formData.message && !errors.message ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {errors.message && touched.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                whileHover={{ scale: isFormValid() && !isSubmitting ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid() && !isSubmitting ? 0.98 : 1 }}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                  isFormValid() && !isSubmitting
                    ? 'bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25'
                    : 'bg-muted cursor-not-allowed'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
