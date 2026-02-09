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
        {/* Glowing dot */}
        <motion.div
          className="mb-10 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-primary" />
          </div>
          <div className="absolute inset-0 w-10 h-10 rounded-full bg-primary/20 blur-lg" />
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
