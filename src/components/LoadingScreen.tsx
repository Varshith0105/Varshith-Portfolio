import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingLines = [
  { text: "Initializing system...", delay: 400 },
  { text: "Loading neural networks...", delay: 500 },
  { text: "Compiling portfolio data...", delay: 600 },
  { text: "Status: ONLINE", delay: 400, highlight: true },
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [progress, setProgress] = useState(0);
  const [allDone, setAllDone] = useState(false);

  // Typing effect
  useEffect(() => {
    if (visibleLines >= loadingLines.length) {
      setAllDone(true);
      return;
    }

    const line = loadingLines[visibleLines];
    if (typingIndex < line.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + line.text[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        setTypingIndex(0);
        setCurrentText("");
      }, line.delay);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, typingIndex]);

  // Progress bar
  useEffect(() => {
    if (progress >= 100) return;
    const total = loadingLines.length;
    const target = allDone ? 100 : Math.min((visibleLines / total) * 90, 90);
    const timeout = setTimeout(() => {
      setProgress((prev) => Math.min(prev + 2, target));
    }, 30);
    return () => clearTimeout(timeout);
  }, [progress, visibleLines, allDone]);

  // Exit after done
  useEffect(() => {
    if (!allDone) return;
    const fillTimeout = setTimeout(() => setProgress(100), 200);
    return () => clearTimeout(fillTimeout);
  }, [allDone]);

  useEffect(() => {
    if (progress < 100) return;
    const exitTimeout = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete,
      });
    }, 500);
    return () => clearTimeout(exitTimeout);
  }, [progress, onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative flex flex-col items-start max-w-lg w-full px-8">
        {/* PC / Circuit Icon */}
        <motion.div
          className="mb-10 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative"
            animate={{ filter: ["drop-shadow(0 0 8px hsl(var(--primary) / 0.6))", "drop-shadow(0 0 16px hsl(var(--primary) / 0.3))", "drop-shadow(0 0 8px hsl(var(--primary) / 0.6))"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Monitor */}
              <rect x="8" y="6" width="32" height="24" rx="3" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
              {/* Screen content - code lines */}
              <line x1="13" y1="13" x2="25" y2="13" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <line x1="13" y1="18" x2="20" y2="18" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
              <line x1="22" y1="18" x2="30" y2="18" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
              <line x1="13" y1="23" x2="18" y2="23" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              {/* Cursor blink */}
              <rect x="20" y="22" width="2" height="3" fill="hsl(var(--primary))" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0;0.8" dur="1s" repeatCount="indefinite" />
              </rect>
              {/* Stand */}
              <line x1="20" y1="30" x2="28" y2="30" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="30" x2="24" y2="35" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="18" y1="35" x2="30" y2="35" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
              {/* Neural network dots */}
              <circle cx="36" cy="10" r="1.5" fill="hsl(var(--primary))" opacity="0.6" />
              <circle cx="40" cy="14" r="1" fill="hsl(var(--primary))" opacity="0.4" />
              <circle cx="38" cy="18" r="1.5" fill="hsl(var(--primary))" opacity="0.5" />
              <line x1="36" y1="10" x2="40" y2="14" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
              <line x1="40" y1="14" x2="38" y2="18" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </motion.div>
          <div className="absolute inset-0 bg-primary/15 blur-xl rounded-full" />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="font-display text-2xl md:text-3xl tracking-[0.35em] text-primary font-bold mb-10 uppercase"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Varshith Julakanti
        </motion.h1>

        {/* Terminal lines */}
        <div className="font-mono text-sm space-y-3 mb-10 min-h-[140px]">
          {loadingLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-primary/60 select-none">›</span>
              <span className={line.highlight ? "text-primary font-semibold" : "text-foreground/70"}>
                {line.text}
              </span>
            </motion.div>
          ))}
          {visibleLines < loadingLines.length && (
            <div className="flex items-start gap-3">
              <span className="text-primary/60 select-none">›</span>
              <span className="text-foreground/70">
                {currentText}
                <motion.span
                  className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="w-full h-[2px] bg-border/30 overflow-hidden mb-2">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground">{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
