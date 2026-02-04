import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  cursorType: "default" | "link" | "button" | "card";
}

export const useCustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    cursorType: "default",
  });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const magneticElements = useRef<Set<HTMLElement>>(new Set());

  const updateCursor = useCallback(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    
    if (!dot || !ring) {
      rafRef.current = requestAnimationFrame(updateCursor);
      return;
    }

    const state = stateRef.current;

    // Smoother lerp with higher factor for dot, lower for ring
    const dotLerp = 0.25;
    const ringLerp = 0.12;

    dotPos.current.x += (state.x - dotPos.current.x) * dotLerp;
    dotPos.current.y += (state.y - dotPos.current.y) * dotLerp;
    ringPos.current.x += (state.x - ringPos.current.x) * ringLerp;
    ringPos.current.y += (state.y - ringPos.current.y) * ringLerp;

    // Use transform for better performance
    dot.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;

    rafRef.current = requestAnimationFrame(updateCursor);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    stateRef.current.x = e.clientX;
    stateRef.current.y = e.clientY;

    // Check for magnetic elements
    magneticElements.current.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      if (distance < 80) {
        const pull = (80 - distance) / 80;
        gsap.to(element, {
          x: (e.clientX - centerX) * pull * 0.3,
          y: (e.clientY - centerY) * pull * 0.3,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    });
  }, []);

  const handleMouseEnter = useCallback((cursorType: CursorState["cursorType"]) => {
    stateRef.current.isHovering = true;
    stateRef.current.cursorType = cursorType;

    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;

    if (ring && dot) {
      if (cursorType === "link" || cursorType === "button") {
        gsap.to(ring, {
          width: 50,
          height: 50,
          borderColor: "hsl(190, 100%, 50%)",
          opacity: 0.8,
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dot, {
          scale: 0.6,
          backgroundColor: "hsl(190, 100%, 50%)",
          duration: 0.4,
          ease: "power3.out",
        });
      } else if (cursorType === "card") {
        gsap.to(ring, {
          width: 70,
          height: 70,
          borderColor: "hsl(190, 100%, 50%)",
          opacity: 0.4,
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dot, {
          scale: 1.2,
          backgroundColor: "hsl(190, 100%, 50%)",
          duration: 0.4,
          ease: "power3.out",
        });
      }
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    stateRef.current.isHovering = false;
    stateRef.current.cursorType = "default";

    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;

    if (ring && dot) {
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderColor: "hsl(190, 100%, 50%)",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: "hsl(190, 100%, 50%)",
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    stateRef.current.isClicking = true;
    const ring = cursorRingRef.current;
    if (ring) {
      gsap.to(ring, {
        scale: 0.85,
        duration: 0.15,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    stateRef.current.isClicking = false;
    const ring = cursorRingRef.current;
    if (ring) {
      gsap.to(ring, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.4)",
      });
    }
  }, []);

  useEffect(() => {
    // Check if touch device
    if ("ontouchstart" in window) return;

    // Create cursor elements
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 6px;
      height: 6px;
      background: hsl(190, 100%, 50%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      mix-blend-mode: difference;
      will-change: transform;
    `;
    document.body.appendChild(dot);
    cursorDotRef.current = dot;

    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      border: 1.5px solid hsl(190, 100%, 50%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      mix-blend-mode: difference;
      will-change: transform;
    `;
    document.body.appendChild(ring);
    cursorRingRef.current = ring;

    // Hide default cursor
    document.body.style.cursor = "none";

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Set up hover listeners for interactive elements
    const setupHoverListeners = () => {
      // Links
      document.querySelectorAll("a, .animated-underline").forEach((el) => {
        el.addEventListener("mouseenter", () => handleMouseEnter("link"));
        el.addEventListener("mouseleave", handleMouseLeave);
        (el as HTMLElement).style.cursor = "none";
      });

      // Buttons
      document.querySelectorAll("button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", () => handleMouseEnter("button"));
        el.addEventListener("mouseleave", handleMouseLeave);
        (el as HTMLElement).style.cursor = "none";

        // Add magnetic effect
        if (el.classList.contains("magnetic")) {
          magneticElements.current.add(el as HTMLElement);
        }
      });

      // Cards
      document.querySelectorAll(".project-card, .skill-card, .glass-card").forEach((el) => {
        el.addEventListener("mouseenter", () => handleMouseEnter("card"));
        el.addEventListener("mouseleave", handleMouseLeave);
        (el as HTMLElement).style.cursor = "none";
      });

      // Inputs
      document.querySelectorAll("input, textarea").forEach((el) => {
        (el as HTMLElement).style.cursor = "auto";
        el.addEventListener("mouseenter", () => {
          if (cursorDotRef.current && cursorRingRef.current) {
            gsap.to([cursorDotRef.current, cursorRingRef.current], {
              opacity: 0,
              duration: 0.2,
            });
          }
        });
        el.addEventListener("mouseleave", () => {
          if (cursorDotRef.current && cursorRingRef.current) {
            gsap.to([cursorDotRef.current, cursorRingRef.current], {
              opacity: 1,
              duration: 0.2,
            });
          }
        });
      });
    };

    setupHoverListeners();

    // Start animation loop
    rafRef.current = requestAnimationFrame(updateCursor);

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      setupHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      if (cursorDotRef.current) {
        cursorDotRef.current.remove();
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.remove();
      }
      
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave, updateCursor]);

  return {
    cursorDotRef,
    cursorRingRef,
  };
};
