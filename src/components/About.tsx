import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Sparkles, Brain, Code } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Brain, label: "AI/ML Focus", value: "3+ Years" },
    { icon: Code, label: "Projects Built", value: "20+" },
    { icon: Sparkles, label: "Models Trained", value: "50+" },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-primary font-medium mb-4 tracking-widest text-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              ABOUT ME
            </motion.p>
            
            <motion.h2
              className="text-headline mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Crafting <span className="gradient-text">Intelligence</span> Through Code
            </motion.h2>

            <motion.div
              className="space-y-6 text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p>
                I'm an <span className="text-foreground">AI Engineer</span> passionate about 
                developing intelligent systems that solve real-world problems. My journey into 
                machine learning began with a fascination for how algorithms can learn and 
                evolve—much like the human mind.
              </p>
              <p>
                From building <span className="text-foreground">computer vision models</span> that 
                detect diseases to creating <span className="text-foreground">financial AI assistants</span>, 
                I specialize in turning complex data into actionable insights. I believe in the 
                power of AI to transform industries and improve lives.
              </p>
              <p>
                When I'm not training neural networks, you'll find me exploring the latest 
                research papers, contributing to open-source projects, or experimenting with 
                cutting-edge MLOps practices.
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              className="flex items-center gap-2 mt-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <MapPin size={18} className="text-primary" />
              <span>Amaravati, Andhra Pradesh, India</span>
            </motion.div>
          </motion.div>

          {/* Right side - Stats & Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />

            {/* Stats cards */}
            <div className="grid gap-6 relative">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-6 rounded-2xl flex items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.5)" }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual accent */}
            <motion.div
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
