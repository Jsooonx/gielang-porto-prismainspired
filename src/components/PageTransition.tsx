import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface PageTransitionRef {
  trigger: (onMidpoint: () => void) => Promise<void>;
}

export const PageTransition = forwardRef<PageTransitionRef, {}>((_, ref) => {
  const [isActive, setIsActive] = useState(false);
  const midpointTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const completeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (midpointTimeoutRef.current) clearTimeout(midpointTimeoutRef.current);
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    trigger: (onMidpoint: () => void) => {
      // Clear any pending timeouts from rapid clicks
      if (midpointTimeoutRef.current) clearTimeout(midpointTimeoutRef.current);
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);

      return new Promise<void>((resolve) => {
        setIsActive(true);

        // Midpoint scroll callback triggers when screen is fully covered (720ms - 1080ms window)
        midpointTimeoutRef.current = setTimeout(() => {
          onMidpoint();
        }, 720);

        // End transition after animation duration of 1.6s
        completeTimeoutRef.current = setTimeout(() => {
          setIsActive(false);
          resolve();
        }, 1600);
      });
    },
  }));

  // Curved transition using SVG curves for smooth 60/120fps performance
  const slideVariants = {
    initial: {
      y: "-100%",
    },
    animate: {
      y: ["-100%", "0%", "0%", "100%"],
      transition: {
        duration: 1.6,
        times: [0, 0.45, 0.55, 1],
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [20, 0, 0, -20],
      transition: {
        duration: 1.1,
        times: [0, 0.35, 0.65, 1],
        ease: "easeInOut",
        delay: 0.15,
      },
    },
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="wipe-overlay"
          className="fixed top-0 left-0 w-full h-screen bg-primary z-[9999] flex items-center justify-center pointer-events-auto select-none"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          {/* Top curve (visible during exit slide-down) */}
          <svg
            className="absolute bottom-full left-0 w-full h-[12vh] translate-y-[2px] fill-primary pointer-events-none"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path d="M0,100 L1440,100 Q720,0 0,100 Z" />
          </svg>

          {/* Bottom curve (visible during entrance slide-down) */}
          <svg
            className="absolute top-full left-0 w-full h-[12vh] -translate-y-[2px] fill-primary pointer-events-none"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L1440,0 Q720,100 0,0 Z" />
          </svg>

          {/* Noise effect inside the transition overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none mix-blend-overlay" />
          
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center gap-2 text-black select-none"
          >
            <span className="font-serif italic text-6xl tracking-wide">Gielang*</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold opacity-60">
              Loading Experience
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

PageTransition.displayName = "PageTransition";
