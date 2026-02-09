import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import TerminalWidget from "./TerminalWidget";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { playSound } = useSoundEffects();

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
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-24">
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
      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <motion.div style={{ x: textX, y: textY }} className="text-left">
            {/* Greeting */}
            <motion.p
              className="text-primary font-medium mb-6 tracking-[0.3em] text-xs uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            >
              AI Engineer
            </motion.p>

            {/* Name with GSAP reveal */}
            <h1 ref={titleRef} className="text-display mb-6 perspective-1000">
              <span className="hero-line block text-foreground/90 overflow-hidden text-4xl md:text-5xl lg:text-6xl font-bold">
                HI, I'M
              </span>
              <span className="hero-line block gradient-text mt-1 overflow-hidden text-5xl md:text-6xl lg:text-7xl font-black uppercase">
                Varshith
              </span>
              <span className="hero-line block gradient-text overflow-hidden text-5xl md:text-6xl lg:text-7xl font-black uppercase">
                Julakanti
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-primary font-medium text-sm tracking-[0.2em] uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Machine Learning & Deep Learning Enthusiast
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
            >
              A passionate AI enthusiast specializing in machine learning, deep learning, and building intelligent solutions that solve real-world problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-start gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton
                onClick={() => {
                  playSound("nav");
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => playSound("hover")}
                className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all hover:shadow-[0_0_50px_hsl(190_100%_50%/0.4)]"
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                onClick={() => {
                  playSound("confirm");
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => playSound("hover")}
                className="px-10 py-4 rounded-full border border-border/50 text-foreground font-medium text-sm transition-all hover:border-primary/50 hover:text-primary"
              >
                Get In Touch
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right side - Terminal */}
          <div className="hidden lg:flex justify-end">
            <TerminalWidget />
          </div>
        </div>
      </div>

      {/* Scroll down button */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll Down</span>
        <motion.div
          className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary/50 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
