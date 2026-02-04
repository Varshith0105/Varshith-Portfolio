import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "Sep 2023 - May 2027",
    title: "B.Tech in Computer Science",
    company: "Vellore Institute of Technology – AP",
    location: "Amaravati, India",
    description: "Pursuing Computer Science with specialization in AI/ML. Building end-to-end AI projects and gaining hands-on experience with deep learning frameworks.",
    highlights: [
      "Focus on AI & Machine Learning",
      "Building production-ready ML systems",
      "Active in hackathons & competitions",
    ],
  },
  {
    period: "January 2026",
    title: "GenAI-Powered Data Analytics",
    company: "TATA Group Simulation",
    location: "Virtual",
    description: "Performed exploratory data analysis and risk profiling. Designed AI-assisted collection strategies using GenAI and applied ethical AI principles.",
    highlights: [
      "Built analytical workflows for BI",
      "Applied explainability principles",
      "Predictive modeling & risk analysis",
    ],
  },
  {
    period: "January 2026",
    title: "Software Engineering Simulation",
    company: "JPMorgan Chase & Co.",
    location: "Virtual",
    description: "Developed backend logic and RESTful APIs. Implemented Kafka-based event streaming following enterprise-grade software engineering practices.",
    highlights: [
      "Backend API development",
      "Kafka event streaming",
      "Enterprise coding standards",
    ],
  },
  {
    period: "2024 - Present",
    title: "AI Engineer",
    company: "Projects & Research",
    location: "India",
    description: "Designing and executing AI & ML experiments including preprocessing, training, evaluation, and optimization. Working with LLMs and prompt engineering.",
    highlights: [
      "End-to-end ML workflows",
      "AWS & Azure cloud deployment",
      "LLM & GenAI applications",
    ],
  },
];

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Animate timeline items
      gsap.fromTo(
        ".timeline-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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
    <section id="experience" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary font-medium mb-4 tracking-[0.3em] text-xs uppercase">
            My Journey
          </p>
          <h2 className="text-headline">
            Experience & <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
          />

          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.period}
                className={`timeline-item relative flex flex-col md:flex-row gap-10 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                />

                {/* Content */}
                <div className={`md:w-1/2 pl-10 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <motion.div
                    className="glass-card p-8 rounded-2xl group"
                    whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.4)" }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Period badge */}
                    <div className={`flex items-center gap-2 mb-6 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Calendar size={14} className="text-primary" />
                      <span className="text-sm text-primary font-medium tracking-wide">{exp.period}</span>
                    </div>

                    <h3 className="font-display font-semibold text-xl mb-2">{exp.title}</h3>
                    <p className="text-muted-foreground mb-3">{exp.company}</p>
                    
                    <div className={`flex items-center gap-2 mb-6 text-sm text-muted-foreground ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{exp.description}</p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {exp.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className={`flex items-center gap-2 text-sm ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                          <ArrowRight size={14} className="text-primary flex-shrink-0" />
                          <span className="text-foreground/80">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for timeline layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
