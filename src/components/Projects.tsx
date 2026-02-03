import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Brain Tumor Detection",
    description: "Deep learning model for automated brain tumor detection and classification from MRI scans using CNN architecture with 96% accuracy.",
    tech: ["Python", "TensorFlow", "CNN", "OpenCV", "Medical Imaging"],
    image: "/placeholder.svg",
    color: "from-cyan-500/20 to-blue-500/20",
    featured: true,
  },
  {
    title: "Skin Disease Detection",
    description: "HAM10000 dataset-based classifier for identifying seven types of skin lesions using transfer learning with EfficientNet.",
    tech: ["PyTorch", "Transfer Learning", "EfficientNet", "Data Augmentation"],
    image: "/placeholder.svg",
    color: "from-purple-500/20 to-pink-500/20",
    featured: true,
  },
  {
    title: "Financial Health Assistant",
    description: "AI-powered financial advisor for students featuring budget tracking, expense prediction, and personalized savings recommendations.",
    tech: ["Python", "NLP", "Flask", "Machine Learning", "React"],
    image: "/placeholder.svg",
    color: "from-green-500/20 to-emerald-500/20",
    featured: true,
  },
  {
    title: "Real-time Object Detection",
    description: "YOLO-based object detection system optimized for edge devices with custom training pipeline and inference optimization.",
    tech: ["YOLOv8", "OpenCV", "ONNX", "Edge Computing"],
    image: "/placeholder.svg",
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    title: "Sentiment Analysis API",
    description: "Production-ready NLP API for sentiment analysis with multi-language support and real-time processing capabilities.",
    tech: ["Transformers", "FastAPI", "Docker", "Kubernetes"],
    image: "/placeholder.svg",
    color: "from-red-500/20 to-rose-500/20",
  },
  {
    title: "MLOps Pipeline",
    description: "End-to-end ML pipeline with automated training, evaluation, versioning, and deployment using modern MLOps practices.",
    tech: ["MLflow", "DVC", "Airflow", "Terraform"],
    image: "/placeholder.svg",
    color: "from-indigo-500/20 to-violet-500/20",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

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
            FEATURED WORK
          </motion.p>
          <h2 className="text-headline">
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            A collection of AI/ML projects showcasing my expertise in deep learning, 
            computer vision, and building production-ready intelligent systems.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            >
              <div className={`glass-card rounded-2xl overflow-hidden h-full`}>
                {/* Project image/gradient */}
                <div className={`h-48 bg-gradient-to-br ${project.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-background/20 backdrop-blur-xl flex items-center justify-center">
                      <span className="text-3xl font-display font-bold text-foreground">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                  >
                    <motion.button
                      className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} />
                    </motion.button>
                    <motion.button
                      className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={20} />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
                    {project.title}
                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <div className="glass-card rounded-xl p-6 h-full hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <span className="text-lg font-display font-bold text-foreground">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Github size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    <ExternalLink size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  </div>
                </div>
                <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
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
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full border border-border text-foreground font-medium text-sm transition-all hover:border-primary/50 hover:text-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
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
