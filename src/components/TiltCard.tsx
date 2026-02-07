import { useRef, ReactNode, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

const TiltCard = ({ children, className = "", glowColor }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [isMobile, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      whileHover={{
        scale: 1.04,
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {/* Glow overlay that follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, hsl(190 100% 50% / 0.12), transparent 60%)`
          ),
        }}
      />

      {/* Card content */}
      <div className="relative z-10 h-full glass-card rounded-2xl border border-border/50 group-hover:border-primary/40 group-hover:shadow-[0_0_40px_hsl(190_100%_50%/0.12)] transition-all duration-500">
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
