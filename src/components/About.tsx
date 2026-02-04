import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { MapPin, Sparkles, Brain, Code } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Brain, label: "AI/ML Focus", value: "2+ Years" },
    { icon: Code, label: "Projects Built", value: "10+" },
    { icon: Sparkles, label: "Certifications", value: "6+" },
  ];

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 60%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-40" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left side - Text content */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="about-text-reveal text-primary font-medium mb-4 tracking-[0.3em] text-xs uppercase">
              About Me
            </p>
            
            <h2 className="about-text-reveal text-headline mb-10">
              Crafting <span className="gradient-text">Intelligence</span> Through Code
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="about-text-reveal">
                I'm a <span className="text-foreground">Computer Science student at VIT-AP</span> and aspiring 
                AI Engineer, specializing in Artificial Intelligence and Machine Learning. My focus is on building 
                and deploying end-to-end AI systems using Python and deep learning frameworks.
              </p>
              <p className="about-text-reveal">
                I have strong expertise in <span className="text-foreground">scalable ML pipelines</span>, 
                cloud-native deployment with <span className="text-foreground">AWS & Azure</span>, model optimization, 
                and responsible AI practices. From drug discovery to stock prediction—I turn complex problems into intelligent solutions.
              </p>
              <p className="about-text-reveal">
                Currently working on LLM applications, prompt engineering, and GenAI-powered analytics while pursuing 
                certifications in cloud architecture and AI foundations.
              </p>
            </div>

            {/* Location */}
            <motion.div
              className="about-text-reveal flex items-center gap-3 mt-10 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <MapPin size={16} className="text-primary" />
              <span className="text-sm tracking-wide">Amaravati, Andhra Pradesh, India</span>
            </motion.div>
          </motion.div>

          {/* Right side - Stats & Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/3 blur-[100px]" />

            {/* Stats cards */}
            <div className="grid gap-6 relative">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-8 rounded-2xl flex items-center gap-8 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.4)" }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                    <stat.icon size={26} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-4xl font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual accent */}
            <motion.div
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-primary/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
