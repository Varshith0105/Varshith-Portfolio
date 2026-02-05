import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronDown, Download } from "lucide-react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms
  const backgroundX = useTransform(mouseX, [-500, 500], [30, -30]);
  const backgroundY = useTransform(mouseY, [-500, 500], [30, -30]);
  const textX = useTransform(mouseX, [-500, 500], [15, -15]);
  const textY = useTransform(mouseY, [-500, 500], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // GSAP text reveal animation
  useEffect(() => {
    if (!titleRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { 
          y: 100, 
          opacity: 0,
          rotateX: -40,
        },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          delay: 2.3,
          ease: "power4.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.4) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </motion.div>

      {/* Floating orbs with smoother animation */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: backgroundX, y: backgroundY }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: backgroundX, y: backgroundY }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <motion.div style={{ x: textX, y: textY }}>
          {/* Greeting */}
          <motion.p
            className="text-primary font-medium mb-8 tracking-[0.3em] text-xs uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Welcome to my portfolio
          </motion.p>

          {/* Name with GSAP reveal */}
          <h1 ref={titleRef} className="text-display mb-8 perspective-1000">
            <span className="hero-line block text-foreground/90 overflow-hidden">
              Hi, I'm
            </span>
            <span className="hero-line block gradient-text mt-2 overflow-hidden">
              Varshith Julakanti
            </span>
          </h1>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-foreground font-medium">AI Engineer</span> specializing in Machine Learning, 
            Deep Learning, Computer Vision & MLOps. Building scalable AI systems that solve real-world problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all hover:shadow-[0_0_50px_hsl(190_100%_50%/0.4)]"
            >
              View My Work
            </MagneticButton>
            <a
              href="/resume/Varshith_Julakanti_Resume.pdf"
              download="Varshith_Julakanti_Resume.pdf"
              className="inline-block"
            >
              <MagneticButton
                onClick={() => {}}
                className="px-10 py-4 rounded-full border border-border/50 text-foreground font-medium text-sm transition-all hover:border-primary/50 hover:text-primary flex items-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </MagneticButton>
            </a>
            <MagneticButton
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 rounded-full border border-border/50 text-foreground font-medium text-sm transition-all hover:border-primary/50 hover:text-primary"
            >
              Get In Touch
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
