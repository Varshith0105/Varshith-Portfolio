import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink, Download, Cloud, Brain, Code, Database } from "lucide-react";

const certificates = [
  {
    title: "AWS Cloud Architecting",
    issuer: "AWS Academy",
    date: "2025",
    icon: Cloud,
    color: "from-orange-500/20 to-yellow-500/20",
    pdf: "/certificates/varshith_AWS_Archetecting_certificate.pdf",
    driveLink: "https://drive.google.com/file/d/1nDDcvxLKNlLUyBHYObxvF89W9HX3FC6V/view",
  },
  {
    title: "AWS Cloud Foundations",
    issuer: "AWS Academy",
    date: "2025",
    icon: Cloud,
    color: "from-orange-500/20 to-amber-500/20",
    pdf: "/certificates/Varshith_AWS_cloud_foundation_certificate.pdf",
    driveLink: "https://drive.google.com/file/d/1KT5csICx4wKNSAQpaZKJPTSvS6Ijy6kz/view",
  },
  {
    title: "OCI Generative AI Professional",
    issuer: "Oracle",
    date: "2025",
    icon: Brain,
    color: "from-red-500/20 to-rose-500/20",
    pdf: "/certificates/GenAI_Professional_certificate.pdf",
    driveLink: "https://drive.google.com/file/d/1s1ibLtc24FGGwRPJ0Tgf6vl9IrKNQcAk/view",
  },
  {
    title: "OCI AI Foundations Associate",
    issuer: "Oracle",
    date: "2025",
    icon: Database,
    color: "from-red-500/20 to-orange-500/20",
    pdf: "/certificates/Oracle_AI_Foundation_certificate.pdf",
    driveLink: "https://drive.google.com/file/d/1ikoe4LkS7E9uY1ULMOHSNr4zTW3Zic_f/view",
  },
  {
    title: "Software Engineering Simulation",
    issuer: "JPMorgan Chase & Co.",
    date: "2026",
    icon: Code,
    color: "from-blue-500/20 to-cyan-500/20",
    pdf: "/certificates/JPMorgan_Certificate.pdf",
    driveLink: "https://drive.google.com/file/d/11Su1dSbHHdMus2NBPCx7MAm_PTWtq_kD/view",
  },
  {
    title: "GenAI-Powered Data Analytics",
    issuer: "TATA Group",
    date: "2026",
    icon: Brain,
    color: "from-purple-500/20 to-pink-500/20",
    pdf: "/certificates/TCS_Gen_AI.pdf",
    driveLink: "https://drive.google.com/file/d/10KPdzeCluDsXryAj8fhpNT4racYpglMt/view",
  },
];

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary font-medium mb-4 tracking-[0.3em] text-xs uppercase">
            Achievements
          </p>
          <h2 className="text-headline">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            Industry-recognized certifications in cloud computing, artificial intelligence, 
            and software engineering from leading tech organizations.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="glass-card rounded-2xl p-6 h-full transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                {/* Gradient header */}
                <div className={`w-full h-24 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-5 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                  <cert.icon size={40} className="text-foreground relative z-10" />
                  <Award size={20} className="absolute top-3 right-3 text-foreground/50" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-1">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground/70 mb-5">{cert.date}</p>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.a
                    href={cert.pdf}
                    download
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={16} />
                    Download
                  </motion.a>
                  <motion.a
                    href={cert.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
