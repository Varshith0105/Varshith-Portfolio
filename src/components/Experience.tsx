import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const experiences = [
  {
    period: "2023 - Present",
    title: "AI/ML Engineer",
    company: "Self-Employed / Freelance",
    location: "Remote",
    description: "Developing custom AI solutions for clients including computer vision systems, NLP applications, and predictive analytics platforms.",
    highlights: [
      "Built 10+ production ML models",
      "Implemented MLOps best practices",
      "Reduced inference time by 40%",
    ],
  },
  {
    period: "2022 - 2023",
    title: "Machine Learning Intern",
    company: "AI Research Lab",
    location: "Amaravati, India",
    description: "Worked on medical imaging projects focusing on disease detection using deep learning techniques.",
    highlights: [
      "Achieved 96% accuracy on tumor detection",
      "Published research findings",
      "Mentored junior interns",
    ],
  },
  {
    period: "2021 - 2022",
    title: "Data Science Enthusiast",
    company: "Academic Projects",
    location: "University",
    description: "Started journey into AI/ML through academic projects, online courses, and personal research initiatives.",
    highlights: [
      "Completed 15+ online certifications",
      "Built portfolio of ML projects",
      "Won hackathon competitions",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-30" />

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
            MY JOURNEY
          </motion.p>
          <h2 className="text-headline">
            Experience & <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "top" }}
          />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.period}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                />

                {/* Content */}
                <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <motion.div
                    className="glass-card p-6 rounded-2xl"
                    whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Period badge */}
                    <div className={`flex items-center gap-2 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Calendar size={14} className="text-primary" />
                      <span className="text-sm text-primary font-medium">{exp.period}</span>
                    </div>

                    <h3 className="font-display font-semibold text-xl mb-1">{exp.title}</h3>
                    <p className="text-muted-foreground mb-2">{exp.company}</p>
                    
                    <div className={`flex items-center gap-2 mb-4 text-sm text-muted-foreground ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>

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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
