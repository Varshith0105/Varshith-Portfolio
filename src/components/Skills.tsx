import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { 
  Brain, 
  Eye, 
  Cpu, 
  Code2, 
  BarChart3,
  Layers
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechFlow from "./TechFlow";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    items: [
      { name: "Machine Learning", level: 90 },
      { name: "Deep Learning", level: 88 },
      { name: "Computer Vision", level: 85 },
      { name: "Transfer Learning", level: 85 },
      { name: "Model Evaluation", level: 82 },
      { name: "LLMs & Prompt Eng.", level: 85 },
      { name: "Generative AI", level: 82 },
    ],
  },
  {
    category: "Programming & Scripting",
    icon: Code2,
    items: [
      { name: "Python", level: 92 },
      { name: "SQL", level: 85 },
      { name: "Java", level: 75 },
      { name: "C / C++", level: 75 },
      { name: "JavaScript/TypeScript", level: 80 },
      { name: "React", level: 78 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    icon: Layers,
    items: [
      { name: "TensorFlow", level: 88 },
      { name: "Keras", level: 85 },
      { name: "PyTorch", level: 85 },
      { name: "Scikit-learn", level: 90 },
      { name: "OpenCV", level: 85 },
      { name: "NumPy / Pandas", level: 92 },
      { name: "Matplotlib / Seaborn", level: 85 },
    ],
  },
  {
    category: "MLOps & Deployment",
    icon: Cpu,
    items: [
      { name: "Flask", level: 85 },
      { name: "FastAPI", level: 85 },
      { name: "Streamlit", level: 80 },
      { name: "Docker", level: 80 },
      { name: "CI/CD Pipelines", level: 78 },
      { name: "Model Deployment", level: 82 },
    ],
  },
  {
    category: "Cloud & Platforms",
    icon: Eye,
    items: [
      { name: "AWS", level: 82 },
      { name: "Google Cloud (GCP)", level: 80 },
      { name: "Google Colab", level: 90 },
      { name: "Jupyter Notebook", level: 92 },
    ],
  },
  {
    category: "Dev & Workflow Tools",
    icon: Code2,
    items: [
      { name: "Git / GitHub", level: 90 },
      { name: "Linux / Unix CLI", level: 85 },
      { name: "VS Code", level: 92 },
      { name: "Agile / Scrum", level: 80 },
    ],
  },
];

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Animate skill cards on scroll
      gsap.fromTo(
        ".skill-card-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary font-medium mb-4 tracking-[0.3em] text-xs uppercase">
            My Expertise
          </p>
          <h2 className="text-headline">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              className="skill-card-item skill-card group hover:shadow-[0_0_40px_hsl(190_100%_50%/0.12)]"
              initial={{ opacity: 0, y: 60, rotateX: -8 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, y: -8 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(190_100%_50%/0.2)] transition-all duration-500">
                  <skill.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors duration-300">{skill.category}</h3>
              </div>

              {/* Skills list */}
              <div className="space-y-5">
                {skill.items.map((item, i) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="text-sm text-primary font-medium">{item.level}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full relative"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.level}%` } : {}}
                        transition={{ delay: 0.5 + i * 0.08, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{ boxShadow: "0 0 8px hsl(190 100% 50% / 0.4)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Tech Flow */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-center text-sm text-muted-foreground mb-6 tracking-wide">
            Technologies I work with
          </p>
          <TechFlow />
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
