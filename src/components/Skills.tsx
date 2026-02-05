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
      { name: "LLMs & Prompt Eng.", level: 85 },
      { name: "GenAI", level: 82 },
    ],
  },
  {
    category: "Computer Vision",
    icon: Eye,
    items: [
      { name: "Image Classification", level: 88 },
      { name: "Medical Imaging", level: 85 },
      { name: "Object Detection", level: 82 },
      { name: "OpenCV", level: 85 },
    ],
  },
  {
    category: "Frameworks & Tools",
    icon: Layers,
    items: [
      { name: "TensorFlow", level: 88 },
      { name: "PyTorch", level: 85 },
      { name: "Scikit-learn", level: 90 },
      { name: "Flask/FastAPI", level: 85 },
    ],
  },
  {
    category: "Programming",
    icon: Code2,
    items: [
      { name: "Python", level: 92 },
      { name: "SQL", level: 85 },
      { name: "JavaScript/TypeScript", level: 80 },
      { name: "React", level: 78 },
    ],
  },
  {
    category: "Cloud & MLOps",
    icon: Cpu,
    items: [
      { name: "AWS", level: 82 },
      { name: "Azure", level: 78 },
      { name: "Docker", level: 80 },
      { name: "Supabase", level: 85 },
    ],
  },
  {
    category: "Data & Analytics",
    icon: BarChart3,
    items: [
      { name: "Pandas/NumPy", level: 92 },
      { name: "Data Visualization", level: 88 },
      { name: "Feature Engineering", level: 85 },
      { name: "ETL Pipelines", level: 80 },
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
            <div
              key={skill.category}
              className="skill-card-item skill-card"
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <skill.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">{skill.category}</h3>
              </div>

              {/* Skills list */}
              <div className="space-y-5">
                {skill.items.map((item, i) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="text-sm text-primary font-medium">{item.level}%</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.level}%` } : {}}
                        transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
