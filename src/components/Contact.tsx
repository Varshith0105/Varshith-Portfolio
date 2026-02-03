import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Linkedin, Github, Twitter, ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Varshith0105" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/_.varshith_.7/?hl=en" },
  { icon: LinkedIn, label: "LinkedIn", href: "https://www.linkedin.com/in/varshith-j-6b2446300/" },
  { icon: Mail, label: "Email", href: "varshithjulakanti@gmail.com" },
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary font-medium mb-4 tracking-[0.3em] text-xs uppercase">
            Get In Touch
          </p>
          <h2 className="text-headline mb-6">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate on AI/ML solutions? 
            I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h3 className="font-display font-semibold text-2xl mb-6">
                Let's Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a question, a project idea, or just want to say hi, 
                my inbox is always open. I'll try my best to get back to you!
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-5">
              <motion.a
                href="mailto:varshithjulakanti@gmail.com"
                className="flex items-center gap-5 p-6 glass-card rounded-2xl group hover:border-primary/40 transition-all duration-500"
                whileHover={{ x: 6 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                  <Mail size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300">
                    varshithjulakanti@gmail.com
                  </p>
                </div>
                <ArrowUpRight size={18} className="ml-auto text-muted-foreground group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>

              <motion.div
                className="flex items-center gap-5 p-6 glass-card rounded-2xl"
                whileHover={{ x: 6 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">Hyderabad,Telangana,India</p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-muted-foreground mb-5 tracking-wide">Find me on</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-14 h-14 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-10"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-7">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-3 text-muted-foreground">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-3 text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-3 text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-300 resize-none text-foreground placeholder:text-muted-foreground/50"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <MagneticButton
                onClick={() => {}}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_50px_hsl(190_100%_50%/0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
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
              </MagneticButton>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
