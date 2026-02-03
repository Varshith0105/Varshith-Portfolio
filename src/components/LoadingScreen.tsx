import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      onAnimationComplete={onComplete}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated rings */}
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-primary/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-primary"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
          >
            <div className="w-4 h-4 rounded-full bg-primary glow" />
          </motion.div>

          {/* Spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin-slow"
            style={{ animationDuration: '2s' }}
          />
        </div>

        {/* Name reveal */}
        <motion.div
          className="mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            className="text-lg font-display tracking-widest text-muted-foreground"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            VARSHITH JULAKANTI
          </motion.p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="mt-6 w-48 h-[2px] bg-muted overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
