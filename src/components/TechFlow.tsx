import { motion } from "framer-motion";

const technologies = [
  "Python", "TensorFlow", "PyTorch", "React", "TypeScript", "Node.js",
  "AWS", "Azure", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
  "Git", "Linux", "Pandas", "NumPy", "Scikit-learn", "OpenCV",
  "Flask", "FastAPI", "GraphQL", "Redis", "Kafka", "Spark",
  "Tailwind CSS", "Next.js", "Supabase", "Vercel", "Jupyter", "CUDA"
];

const TechFlow = () => {
  return (
    <div className="w-full overflow-hidden py-8 relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* First row - left to right */}
      <div className="flex mb-4">
        <motion.div
          className="flex gap-4"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="flex-shrink-0 px-6 py-3 rounded-full border border-border/50 bg-muted/30 backdrop-blur-sm text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 cursor-default whitespace-nowrap"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second row - right to left */}
      <div className="flex">
        <motion.div
          className="flex gap-4"
          animate={{
            x: [-1920, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {[...technologies.slice().reverse(), ...technologies.slice().reverse(), ...technologies.slice().reverse()].map((tech, index) => (
            <div
              key={`${tech}-rev-${index}`}
              className="flex-shrink-0 px-6 py-3 rounded-full border border-border/50 bg-muted/30 backdrop-blur-sm text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 cursor-default whitespace-nowrap"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechFlow;
