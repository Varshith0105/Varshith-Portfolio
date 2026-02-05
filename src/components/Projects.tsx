import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import project images
import drugDiscoveryImg from "@/assets/project-drug-discovery.jpg";
import skinDetectionImg from "@/assets/project-skin-detection.jpg";
import stockAiImg from "@/assets/project-stock-ai.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI-Powered Drug Discovery",
    description: "End-to-end Drug–Target Interaction prediction system using CNN-based deep learning. Features explainable AI with confidence scores and Supabase Edge Functions for serverless inference.",
    tech: ["React", "TypeScript", "TensorFlow", "Supabase", "Vercel"],
    color: "from-cyan-500/20 to-blue-500/20",
    featured: true,
    liveUrl: "https://drug-discovery-ai-cnn-based.vercel.app/",
    github: "https://github.com/Varshith0105",
    image: drugDiscoveryImg,
  },
  {
    title: "Skin Disease Detection",
    description: "Full-stack AI dermatology assistant using TensorFlow. Includes patient data capture, prediction rendering, PDF reports, and WhatsApp integration for sharing results.",
    tech: ["TensorFlow", "Flask", "HTML/CSS/JS", "Netlify", "Render"],
    color: "from-purple-500/20 to-pink-500/20",
    featured: true,
    liveUrl: "https://smartskindisease-predection-ai.netlify.app/",
    github: "https://github.com/Varshith0105",
    image: skinDetectionImg,
  },
  {
    title: "StockAI - Price Prediction",
    description: "AI-based stock price forecasting web app using real-time market data. Implements Linear Regression with interactive dashboards for actual vs predicted prices.",
    tech: ["Python", "Linear Regression", "React", "Real-time Data"],
    color: "from-green-500/20 to-emerald-500/20",
    featured: true,
    liveUrl: "https://stockpredectionai.vercel.app/",
    github: "https://github.com/Varshith0105",
    image: stockAiImg,
  },
];

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
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
          {projects.filter(p => p.featured).map((project) => (
            <div
              key={project.title}
              className="project-card-item project-card group relative perspective-1000"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full transition-all duration-500 group-hover:border-primary/30">
                {/* Project image header */}
                <div className="h-52 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-5"
                  >
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={22} />
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={22} />
                    </motion.a>
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

        {/* View all button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="https://github.com/Varshith0105"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-full border border-border/50 text-foreground font-medium text-sm transition-all hover:border-primary/40 hover:text-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects on GitHub
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
