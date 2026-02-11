import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const terminalLines = [
  { text: "Initializing system...", delay: 300 },
  { text: "Loading portfolio data...", delay: 500 },
  { text: "Welcome to my digital space!", delay: 400 },
  { text: "Status: ONLINE", delay: 400, highlight: true },
  { text: "Ready to create amazing things.", delay: 500 },
];

const TerminalWidget = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;

    const line = terminalLines[visibleLines];
    if (typingIndex < line.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + line.text[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 30);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* WIDTH UPDATED HERE ONLY */}
      <TiltCard className="w-full max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.15),0_0_80px_hsl(var(--primary)/0.05)]">
          
          {/* Title bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-muted/60 border-b border-primary/20">
            <div className="flex gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-sm text-primary/80 font-mono tracking-wider">
              varshith@portfolio:~
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-background/95 backdrop-blur-md p-8 font-mono text-base min-h-[280px] space-y-4">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-primary/60 select-none">›</span>
                <span
                  className={
                    line.highlight
                      ? "text-primary font-semibold"
                      : "text-foreground/80"
                  }
                >
                  {line.text}
                </span>
              </div>
            ))}

            {visibleLines < terminalLines.length && (
              <div className="flex items-start gap-3">
                <span className="text-primary/60 select-none">›</span>
                <span className="text-foreground/80">
                  {currentText}
                  <motion.span
                    className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                </span>
              </div>
            )}

            {visibleLines >= terminalLines.length && (
              <div className="flex items-start gap-3">
                <span className="text-primary/60 select-none">›</span>
                <motion.span
                  className="inline-block w-2 h-4 bg-primary align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default TerminalWidget;
