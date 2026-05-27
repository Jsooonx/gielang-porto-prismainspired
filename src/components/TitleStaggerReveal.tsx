import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface TitleStaggerRevealProps {
  text: string;
  className?: string;
}

export function TitleStaggerReveal({ text, className = "" }: TitleStaggerRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03, // Delays between each character animation
      },
    },
  };

  const charVariants = {
    hidden: {
      y: "110%",
      rotate: 4,
    },
    visible: {
      y: "0%",
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Fluid premium easing curve
      },
    },
  };

  // Split sentence by words first
  const words = text.split(" ");

  return (
    <motion.h2
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center overflow-hidden ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span 
          key={wordIdx} 
          className="inline-flex overflow-hidden pr-[0.15em] mr-[0.1em] py-1 select-none"
        >
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={charVariants}
              className="inline-block origin-bottom-left"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}
