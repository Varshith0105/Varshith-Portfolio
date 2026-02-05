import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScrollProvider>
      <div className="relative">
        {/* Animated grain overlay */}
        <div className="grain-overlay" />
        
        {/* Vignette effect */}
        <div className="vignette-overlay" />

        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        <Navigation />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default Index;
