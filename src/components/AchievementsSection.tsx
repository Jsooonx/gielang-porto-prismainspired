import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Trophy, Sparkles, Pin, GraduationCap } from "lucide-react";
import { achievementsData } from "../data";

const containerVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.98, 
    filter: "blur(8px)" 
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15,
    }
  }
};

const childVariants = {
  hidden: { 
    opacity: 0, 
    y: 16 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function AchievementsSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'achievement' | 'activity' | 'education'>('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const filterOptions = [
    { label: "All Timeline", value: "all" as const },
    { label: "Achievements", value: "achievement" as const },
    { label: "Activities", value: "activity" as const },
    { label: "Education", value: "education" as const },
  ];

  return (
    <section id="achievements" className="relative bg-black py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div ref={headerRef} className="max-w-4xl mx-auto mb-16 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="bg-[#101010] rounded-2xl border border-white/5 flex flex-col items-center justify-center py-16 sm:py-20 px-8 text-center select-none"
        >
          <motion.h2
            variants={childVariants}
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-primary tracking-wide mb-4"
          >
            Achievements &amp; Activities.
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-gray-500 font-light text-sm sm:text-base max-w-lg"
          >
            Milestones from robotics championships to education and certifications.
          </motion.p>
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-16 relative z-20 max-w-2xl mx-auto">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
              activeFilter === option.value
                ? "border-primary text-black bg-primary"
                : "border-white/10 text-primary/70 hover:border-white/30 hover:text-primary bg-zinc-950/40"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {achievementsData.map((item) => {
          const isVisible = activeFilter === 'all' || item.category === activeFilter;

          return (
            <div
              key={item.id}
              style={{
                maxHeight: isVisible ? "1000px" : "0px",
                opacity: isVisible ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s ease, opacity 0.3s ease",
              }}
            >
              <div className="relative flex gap-8 sm:gap-12">
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <div className="w-9 h-9 rounded-full bg-[#161616] border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-black/50 shrink-0">
                    {item.category === "achievement" ? (
                      <Trophy className="w-3.5 h-3.5" />
                    ) : item.category === "education" ? (
                      <GraduationCap className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="w-[1px] flex-1 bg-white/[0.08] mt-3" />
                </div>

                <div className="flex-1 pb-14">
                  <p className="font-serif italic text-3xl sm:text-4xl text-primary mb-1 leading-none">
                    {item.year}
                  </p>
                  {item.role && (
                    <p className="text-[10px] font-mono uppercase tracking-widest text-primary/50 mb-4">
                      {item.role}
                    </p>
                  )}
                  <div className="bg-[#101010] rounded-2xl border border-white/5 p-6 sm:p-8 hover:border-primary/20 transition-colors duration-300">
                    <h4 className="text-base sm:text-lg font-normal text-[#E1E0CC] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-5">
                      {item.description}
                    </p>
                    {item.details && (
                      <ul className="space-y-2">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <Pin className="w-3 h-3 text-primary/40 shrink-0 mt-0.5" />
                            <span className="text-[11px] text-gray-500 font-light leading-normal">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
