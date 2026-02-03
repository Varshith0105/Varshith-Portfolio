import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Linkedin, Github, Twitter, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@varshith.dev" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-primary font-medium mb-4 tracking-widest text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            GET IN TOUCH
          </motion.p>
          <h2 className="text-headline mb-4">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate on AI/ML solutions? 
            I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div>
              <h3 className="font-display font-semibold text-2xl mb-6">
                Let's Connect
              </h3>
              <p className="text-muted-foreground mb-8">
                Whether you have a question, a project idea, or just want to say hi, 
                my inbox is always open. I'll try my best to get back to you!
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <motion.a
                href="mailto:hello@varshith.dev"
                className="flex items-center gap-4 p-4 glass-card rounded-xl group hover:border-primary/50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    hello@varshith.dev
                  </p>
                </div>
                <ArrowUpRight size={18} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>

              <motion.div
                className="flex items-center gap-4 p-4 glass-card rounded-xl"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Amaravati, Andhra Pradesh, India</p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Find me on</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_40px_hsl(190_100%_50%/0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
