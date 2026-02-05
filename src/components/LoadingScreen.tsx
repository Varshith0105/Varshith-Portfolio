import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onComplete,
          });
        },
      });

      // Animate progress bar
      tl.to(progressRef.current, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      });

      // Fade in text
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.3
      );

      // Hold for a moment
      tl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      
      <div className="relative flex flex-col items-center">
        {/* Minimal loading indicator */}
        <div className="relative mb-12">
          {/* Outer ring */}
          <motion.div
            className="w-20 h-20 rounded-full border border-border/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          
          {/* Inner spinning ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-t border-primary"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
          </motion.div>
        </div>

        {/* Name */}
        <p
          ref={textRef}
          className="text-sm font-display tracking-[0.4em] text-muted-foreground uppercase opacity-0"
        >
          Varshith Julakanti
        </p>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-[1px] bg-border/30 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-primary w-0"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
