import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface AnimatedLetterProps {
  key?: string;
  char: string;
  index: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
}

// Letter opacity reveal on scroll
function AnimatedLetter({ char, index, totalChars, scrollYProgress }: AnimatedLetterProps) {
  const charProgress = index / totalChars;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  const safeEnd = end > start ? end : start + 0.0001;
  const opacity = useTransform(scrollYProgress, [start, safeEnd], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {char}
    </motion.span>
  );
}

interface AboutTextRevealProps {
  text: string;
  className?: string;
}

// Paragraph content reveal on scroll
export function AboutTextReveal({ text, className = "" }: AboutTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p
      ref={containerRef}
      className={`text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed tracking-wide text-center max-w-2xl mx-auto ${className}`}
    >
      {chars.map((char, index) => (
        <AnimatedLetter
          key={`${char}-${index}`}
          char={char}
          index={index}
          totalChars={chars.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}
