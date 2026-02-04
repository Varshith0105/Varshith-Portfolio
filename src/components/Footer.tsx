import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/30 relative z-10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-display text-xl font-bold"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="gradient-text">VJ</span>
          </motion.a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            © {currentYear} Built By Varshith Julakanti. 
          </p>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
            whileHover={{ y: -2 }}
          >
            Back to top
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
