import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  cursorType: "default" | "link" | "button" | "card";
}

export const useCustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const cursorTrailRef = useRef<HTMLDivElement[]>([]);
  const stateRef = useRef<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    cursorType: "default",
  });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number>();
  const magneticElements = useRef<Set<HTMLElement>>(new Set());

  const TRAIL_COUNT = 5;

  const updateCursor = useCallback(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const trails = cursorTrailRef.current;
    
    if (!dot || !ring) {
      rafRef.current = requestAnimationFrame(updateCursor);
      return;
    }

    const state = stateRef.current;

    // Smoother lerp - higher values = faster following
    const dotLerp = 0.35;
    const ringLerp = 0.18;
    const trailLerp = 0.12;

    // Update dot position
    dotPos.current.x += (state.x - dotPos.current.x) * dotLerp;
    dotPos.current.y += (state.y - dotPos.current.y) * dotLerp;

    // Update ring position
    ringPos.current.x += (state.x - ringPos.current.x) * ringLerp;
    ringPos.current.y += (state.y - ringPos.current.y) * ringLerp;

    // Update trail positions
    for (let i = 0; i < trails.length; i++) {
      const prevPos = i === 0 ? dotPos.current : trailPositions.current[i - 1];
      if (!trailPositions.current[i]) {
        trailPositions.current[i] = { x: state.x, y: state.y };
      }
      trailPositions.current[i].x += (prevPos.x - trailPositions.current[i].x) * (trailLerp - i * 0.02);
      trailPositions.current[i].y += (prevPos.y - trailPositions.current[i].y) * (trailLerp - i * 0.02);
      
      trails[i].style.transform = `translate(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px) translate(-50%, -50%)`;
      trails[i].style.opacity = `${0.5 - i * 0.1}`;
    }

    // Apply transforms
    dot.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;

    rafRef.current = requestAnimationFrame(updateCursor);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    stateRef.current.x = e.clientX;
    stateRef.current.y = e.clientY;

    // Magnetic effect for buttons
    magneticElements.current.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      if (distance < 100) {
        const pull = (100 - distance) / 100;
        gsap.to(element, {
          x: (e.clientX - centerX) * pull * 0.4,
          y: (e.clientY - centerY) * pull * 0.4,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
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
          width: 60,
          height: 60,
          borderWidth: 2,
          borderColor: "hsl(190, 100%, 60%)",
          opacity: 0.9,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0.5,
          backgroundColor: "hsl(190, 100%, 60%)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (cursorType === "card") {
        gsap.to(ring, {
          width: 80,
          height: 80,
          borderWidth: 1,
          borderColor: "hsl(190, 100%, 50%)",
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1.5,
          backgroundColor: "hsl(190, 100%, 50%)",
          duration: 0.3,
          ease: "power2.out",
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
        width: 40,
        height: 40,
        borderWidth: 1.5,
        borderColor: "hsl(190, 100%, 50%)",
        opacity: 0.8,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: "hsl(190, 100%, 50%)",
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (ring && dot) {
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 1.5,
        duration: 0.1,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (ring && dot) {
      gsap.to(ring, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1.2, 0.4)",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1.2, 0.4)",
      });
    }
  }, []);

  useEffect(() => {
    // Check if touch device
    if ("ontouchstart" in window) return;

    // Create cursor dot
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 8px;
      height: 8px;
      background: hsl(190, 100%, 50%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      will-change: transform;
      box-shadow: 0 0 20px hsl(190, 100%, 50%), 0 0 40px hsl(190, 100%, 50% / 0.5);
    `;
    document.body.appendChild(dot);
    cursorDotRef.current = dot;

    // Create cursor ring
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      border: 1.5px solid hsl(190, 100%, 50%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      will-change: transform;
      opacity: 0.8;
    `;
    document.body.appendChild(ring);
    cursorRingRef.current = ring;

    // Create trail elements
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      trail.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: ${6 - i}px;
        height: ${6 - i}px;
        background: hsl(190, 100%, ${60 - i * 5}%);
        border-radius: 50%;
        pointer-events: none;
        z-index: ${99997 - i};
        will-change: transform;
        opacity: ${0.5 - i * 0.1};
      `;
      document.body.appendChild(trail);
      cursorTrailRef.current.push(trail);
    }

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
        magneticElements.current.add(el as HTMLElement);
      });

      // Cards
      document.querySelectorAll(".project-card, .skill-card, .glass-card").forEach((el) => {
        el.addEventListener("mouseenter", () => handleMouseEnter("card"));
        el.addEventListener("mouseleave", handleMouseLeave);
        (el as HTMLElement).style.cursor = "none";
      });

      // Inputs - show normal cursor
      document.querySelectorAll("input, textarea").forEach((el) => {
        (el as HTMLElement).style.cursor = "auto";
        el.addEventListener("mouseenter", () => {
          if (cursorDotRef.current && cursorRingRef.current) {
            gsap.to([cursorDotRef.current, cursorRingRef.current, ...cursorTrailRef.current], {
              opacity: 0,
              duration: 0.2,
            });
          }
        });
        el.addEventListener("mouseleave", () => {
          if (cursorDotRef.current && cursorRingRef.current) {
            gsap.to(cursorDotRef.current, { opacity: 1, duration: 0.2 });
            gsap.to(cursorRingRef.current, { opacity: 0.8, duration: 0.2 });
            cursorTrailRef.current.forEach((trail, i) => {
              gsap.to(trail, { opacity: 0.5 - i * 0.1, duration: 0.2 });
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
      
      cursorDotRef.current?.remove();
      cursorRingRef.current?.remove();
      cursorTrailRef.current.forEach((trail) => trail.remove());
      
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave, updateCursor]);

  return {
    cursorDotRef,
    cursorRingRef,
  };
};
