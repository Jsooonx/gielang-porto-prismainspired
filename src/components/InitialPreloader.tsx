import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// SNAPPY preloader animation prior to page rendering
export function InitialPreloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleAnimationComplete = () => {
    document.body.style.overflow = "";
    onComplete();
  };

  const preloaderVariants = {
    initial: {
      y: 0,
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: "150%", rotate: 2 },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          variants={preloaderVariants}
          initial="initial"
          exit="exit"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
          }}
          className="fixed inset-0 bg-[#0c0d0c] z-[99999] flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          <svg
            className="absolute top-full left-0 w-full h-[12vh] fill-[#0c0d0c] pointer-events-none"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L1440,0 Q720,100 0,0 Z" />
          </svg>

          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-1 select-none"
          >
            <h1 className="font-serif italic text-6xl sm:text-7xl tracking-wide text-primary flex pb-4 pt-2">
              {"Gielang".split("").map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block overflow-hidden px-[0.2em] mx-[-0.2em] py-[0.4em] my-[-0.4em]"
                  style={{ verticalAlign: "bottom" }}
                >
                  <motion.span
                    variants={letterVariants}
                    className="inline-block origin-bottom"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </h1>
            
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold text-primary mt-2"
            >
              Loading Experience
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
