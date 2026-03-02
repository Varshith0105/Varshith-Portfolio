import { useEffect, useRef, useCallback } from "react";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  cursorType: "default" | "link" | "button" | "card";
}

export const useCustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<CursorState>({
    x: 0, y: 0, isHovering: false, cursorType: "default",
  });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const velocityRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });

  const updateCursor = useCallback(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) {
      rafRef.current = requestAnimationFrame(updateCursor);
      return;
    }

    const state = stateRef.current;

    // Track velocity for ring stretch
    velocityRef.current.x = state.x - prevMouseRef.current.x;
    velocityRef.current.y = state.y - prevMouseRef.current.y;
    prevMouseRef.current.x = state.x;
    prevMouseRef.current.y = state.y;

    // Smooth lerp
    dotPos.current.x += (state.x - dotPos.current.x) * 0.45;
    dotPos.current.y += (state.y - dotPos.current.y) * 0.45;
    ringPos.current.x += (state.x - ringPos.current.x) * 0.12;
    ringPos.current.y += (state.y - ringPos.current.y) * 0.12;

    // Ring stretch based on velocity
    const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
    const stretch = Math.min(speed * 0.015, 0.3);
    const angle = Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI);

    dot.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) rotate(${angle}deg) scaleX(${1 + stretch}) scaleY(${1 - stretch * 0.5})`;

    rafRef.current = requestAnimationFrame(updateCursor);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    stateRef.current.x = e.clientX;
    stateRef.current.y = e.clientY;
  }, []);

  const handleMouseEnter = useCallback((cursorType: CursorState["cursorType"]) => {
    stateRef.current.isHovering = true;
    stateRef.current.cursorType = cursorType;
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    if (cursorType === "link") {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "hsl(200, 100%, 65%)";
      ring.style.opacity = "0.9";
      ring.style.borderWidth = "2px";
      dot.style.width = "4px";
      dot.style.height = "4px";
      dot.style.background = "hsl(200, 100%, 65%)";
      dot.style.boxShadow = "0 0 16px hsl(200, 100%, 65%), 0 0 40px hsl(200 100% 65% / 0.4)";
    } else if (cursorType === "button") {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "hsl(170, 100%, 55%)";
      ring.style.opacity = "0.85";
      ring.style.borderWidth = "2px";
      ring.style.boxShadow = "0 0 20px hsl(170 100% 55% / 0.3)";
      dot.style.width = "3px";
      dot.style.height = "3px";
      dot.style.background = "hsl(170, 100%, 55%)";
      dot.style.boxShadow = "0 0 14px hsl(170, 100%, 55%), 0 0 35px hsl(170 100% 55% / 0.5)";
    } else if (cursorType === "card") {
      ring.style.width = "64px";
      ring.style.height = "64px";
      ring.style.borderColor = "hsl(220, 100%, 65%)";
      ring.style.opacity = "0.5";
      ring.style.borderWidth = "1.5px";
      ring.style.boxShadow = "0 0 25px hsl(220 100% 65% / 0.2)";
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.background = "hsl(220, 100%, 65%)";
      dot.style.boxShadow = "0 0 20px hsl(220, 100%, 65%), 0 0 50px hsl(220 100% 65% / 0.4)";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    stateRef.current.isHovering = false;
    stateRef.current.cursorType = "default";
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    ring.style.width = "32px";
    ring.style.height = "32px";
    ring.style.borderColor = "hsl(190, 100%, 50%)";
    ring.style.opacity = "0.6";
    ring.style.borderWidth = "1px";
    ring.style.boxShadow = "none";
    dot.style.width = "6px";
    dot.style.height = "6px";
    dot.style.background = "hsl(190, 100%, 50%)";
    dot.style.boxShadow = "0 0 12px hsl(190, 100%, 50%), 0 0 30px hsl(190 100% 50% / 0.4)";
  }, []);

  const handleMouseDown = useCallback(() => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;
    ring.style.transition = "transform 0.1s ease-out";
    dot.style.transition = "transform 0.1s ease-out";
    // Scale handled via inline — we just flash the ring smaller
    ring.style.width = "24px";
    ring.style.height = "24px";
    dot.style.width = "10px";
    dot.style.height = "10px";
  }, []);

  const handleMouseUp = useCallback(() => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;
    ring.style.transition = "width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    dot.style.transition = "width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    ring.style.width = "32px";
    ring.style.height = "32px";
    dot.style.width = "6px";
    dot.style.height = "6px";
    setTimeout(() => {
      if (ring) ring.style.transition = "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease, border-width 0.3s ease";
      if (dot) dot.style.transition = "width 0.3s ease, height 0.3s ease, background 0.3s ease, box-shadow 0.3s ease";
    }, 400);
  }, []);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    // Create dot
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed; top: 0; left: 0; width: 6px; height: 6px;
      background: hsl(190, 100%, 50%); border-radius: 50%;
      pointer-events: none; z-index: 99999; will-change: transform;
      box-shadow: 0 0 12px hsl(190, 100%, 50%), 0 0 30px hsl(190 100% 50% / 0.4);
      mix-blend-mode: screen;
      transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    `;
    document.body.appendChild(dot);
    cursorDotRef.current = dot;

    // Create ring
    const ring = document.createElement("div");
    ring.style.cssText = `
      position: fixed; top: 0; left: 0; width: 32px; height: 32px;
      border: 1px solid hsl(190, 100%, 50%); border-radius: 50%;
      pointer-events: none; z-index: 99998; will-change: transform;
      opacity: 0.6;
      transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease, border-width 0.3s ease;
    `;
    document.body.appendChild(ring);
    cursorRingRef.current = ring;

    document.body.style.cursor = "none";

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const setupHoverListeners = () => {
      document.querySelectorAll("a, .animated-underline").forEach((el) => {
        el.addEventListener("mouseenter", () => handleMouseEnter("link"));
        el.addEventListener("mouseleave", handleMouseLeave);
        (el as HTMLElement).style.cursor = "none";
      });
      document.querySelectorAll("button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", () => handleMouseEnter("button"));
        el.addEventListener("mouseleave", handleMouseLeave);
        (el as HTMLElement).style.cursor = "none";
      });
      document.querySelectorAll(".project-card, .skill-card, .glass-card, .cert-card").forEach((el) => {
        el.addEventListener("mouseenter", () => handleMouseEnter("card"));
        el.addEventListener("mouseleave", handleMouseLeave);
        (el as HTMLElement).style.cursor = "none";
      });
      document.querySelectorAll("input, textarea").forEach((el) => {
        (el as HTMLElement).style.cursor = "auto";
        el.addEventListener("mouseenter", () => {
          if (cursorDotRef.current) cursorDotRef.current.style.opacity = "0";
          if (cursorRingRef.current) cursorRingRef.current.style.opacity = "0";
        });
        el.addEventListener("mouseleave", () => {
          if (cursorDotRef.current) cursorDotRef.current.style.opacity = "1";
          if (cursorRingRef.current) cursorRingRef.current.style.opacity = "0.6";
        });
      });
    };

    setupHoverListeners();
    rafRef.current = requestAnimationFrame(updateCursor);

    const observer = new MutationObserver(() => setupHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cursorDotRef.current?.remove();
      cursorRingRef.current?.remove();
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave, updateCursor]);

  return { cursorDotRef, cursorRingRef };
};
