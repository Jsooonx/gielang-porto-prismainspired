import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextSegment } from "../types";

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className = "" }: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const words = segments.flatMap((segment) => {
    return segment.text.split(" ").map((w) => ({
      text: w,
      className: segment.className || "",
    }));
  });

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
      className={`inline-flex flex-wrap justify-center items-baseline ${className}`}
    >
      {words.map((wordObj, idx) => {
        if (wordObj.text === "") {
          return null;
        }

        return (
          <span key={idx} className="inline-block mr-[0.25em] last:mr-0 pl-1 leading-none">
            <motion.span
              variants={childVariants}
              className={`inline-block ${wordObj.className}`}
            >
              {wordObj.text}
            </motion.span>
          </span>
        );
      })}
    </motion.div>
  );
}
