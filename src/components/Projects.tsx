import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Brain Tumor Detection",
    description: "Deep learning model for automated brain tumor detection and classification from MRI scans using CNN architecture with 96% accuracy.",
    tech: ["Python", "TensorFlow", "CNN", "OpenCV", "Medical Imaging"],
    color: "from-cyan-500/20 to-blue-500/20",
    featured: true,
  },
  {
    title: "Skin Disease Detection",
    description: "HAM10000 dataset-based classifier for identifying seven types of skin lesions using transfer learning with EfficientNet.",
    tech: ["PyTorch", "Transfer Learning", "EfficientNet", "Data Augmentation"],
    color: "from-purple-500/20 to-pink-500/20",
    featured: true,
  },
  {
    title: "Financial Health Assistant",
    description: "AI-powered financial advisor for students featuring budget tracking, expense prediction, and personalized savings recommendations.",
    tech: ["Python", "NLP", "Flask", "Machine Learning", "React"],
    color: "from-green-500/20 to-emerald-500/20",
    featured: true,
  },
  {
    title: "Real-time Object Detection",
    description: "YOLO-based object detection system optimized for edge devices with custom training pipeline and inference optimization.",
    tech: ["YOLOv8", "OpenCV", "ONNX", "Edge Computing"],
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    title: "Sentiment Analysis API",
    description: "Production-ready NLP API for sentiment analysis with multi-language support and real-time processing capabilities.",
    tech: ["Transformers", "FastAPI", "Docker", "Kubernetes"],
    color: "from-red-500/20 to-rose-500/20",
  },
  {
    title: "MLOps Pipeline",
    description: "End-to-end ML pipeline with automated training, evaluation, versioning, and deployment using modern MLOps practices.",
    tech: ["MLflow", "DVC", "Airflow", "Terraform"],
    color: "from-indigo-500/20 to-violet-500/20",
  },
];

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Animate project cards with stagger
      gsap.fromTo(
        ".project-card-item",
        { y: 80, opacity: 0, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 65%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary font-medium mb-4 tracking-[0.3em] text-xs uppercase">
            Featured Work
          </p>
          <h2 className="text-headline">
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            A collection of AI/ML projects showcasing my expertise in deep learning, 
            computer vision, and building production-ready intelligent systems.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {projects.filter(p => p.featured).map((project, index) => (
            <div
              key={project.title}
              className="project-card-item project-card group relative perspective-1000"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full transition-all duration-500 group-hover:border-primary/30">
                {/* Project gradient header */}
                <div className={`h-52 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-2xl bg-background/20 backdrop-blur-xl flex items-center justify-center border border-white/10">
                      <span className="text-4xl font-display font-bold text-foreground">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-5"
                  >
                    <motion.button
                      className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={22} />
                    </motion.button>
                    <motion.button
                      className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={22} />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-display font-semibold text-xl mb-4 flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full bg-muted/50 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <div
              key={project.title}
              className="project-card-item project-card group"
            >
              <div className="glass-card rounded-xl p-8 h-full hover:border-primary/30 transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <span className="text-lg font-display font-bold text-foreground">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Github size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    <ExternalLink size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="px-10 py-4 rounded-full border border-border/50 text-foreground font-medium text-sm transition-all hover:border-primary/40 hover:text-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
            <ArrowUpRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
