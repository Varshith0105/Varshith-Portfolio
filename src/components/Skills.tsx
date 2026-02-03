import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Brain, 
  Eye, 
  Cpu, 
  Database, 
  Code2, 
  GitBranch,
  BarChart3,
  Layers
} from "lucide-react";

const skills = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    items: [
      { name: "Machine Learning", level: 95 },
      { name: "Deep Learning", level: 90 },
      { name: "Neural Networks", level: 88 },
      { name: "NLP", level: 85 },
    ],
  },
  {
    category: "Computer Vision",
    icon: Eye,
    items: [
      { name: "Image Classification", level: 92 },
      { name: "Object Detection", level: 88 },
      { name: "Medical Imaging", level: 85 },
      { name: "OpenCV", level: 90 },
    ],
  },
  {
    category: "Frameworks & Tools",
    icon: Layers,
    items: [
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 88 },
      { name: "Scikit-learn", level: 92 },
      { name: "Keras", level: 90 },
    ],
  },
  {
    category: "Programming",
    icon: Code2,
    items: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 85 },
      { name: "JavaScript", level: 75 },
      { name: "C++", level: 70 },
    ],
  },
  {
    category: "MLOps & Cloud",
    icon: Cpu,
    items: [
      { name: "Docker", level: 82 },
      { name: "MLflow", level: 85 },
      { name: "AWS/GCP", level: 78 },
      { name: "CI/CD", level: 80 },
    ],
  },
  {
    category: "Data & Analytics",
    icon: BarChart3,
    items: [
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 95 },
      { name: "Data Viz", level: 88 },
      { name: "Feature Engineering", level: 90 },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-primary font-medium mb-4 tracking-widest text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            MY EXPERTISE
          </motion.p>
          <h2 className="text-headline">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <skill.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">{skill.category}</h3>
              </div>

              {/* Skills list */}
              <div className="space-y-4">
                {skill.items.map((item, i) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="text-sm text-primary">{item.level}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.level}%` } : {}}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech logos/badges */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {["Python", "TensorFlow", "PyTorch", "Keras", "OpenCV", "Docker", "MLflow", "AWS"].map((tech, index) => (
            <motion.span
              key={tech}
              className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
