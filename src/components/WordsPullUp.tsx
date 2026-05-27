import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface WordsPullUpProps {
  text: string;
  className?: string;
}

// Staggered text pull-up animation
export function WordsPullUp({ text, className = "" }: WordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const words = text.split(" ").filter(w => w !== "");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em] last:mr-0 pl-1">
          <motion.span
            variants={childVariants}
            className="inline-block relative"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
