import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Trophy, Sparkles, Pin, GraduationCap, ArrowLeft, ArrowRight } from "lucide-react";
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

  const visibleItems = achievementsData.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );
  const visibleItemsWithImages = visibleItems.filter((item) => item.image);

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

      <div className="max-w-2xl lg:max-w-[860px] xl:max-w-[1060px] 2xl:max-w-6xl mx-auto relative z-10 px-0 lg:px-8">
        <motion.div layout className="space-y-0">
          <AnimatePresence initial={false}>
            {visibleItems.map((item) => {
              const hasImage = !!item.image;
              const imageIndex = hasImage ? visibleItemsWithImages.findIndex(x => x.id === item.id) : -1;
              const isImageRight = hasImage && imageIndex % 2 === 0;
              const isImageLeft = hasImage && imageIndex % 2 === 1;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="relative flex flex-col lg:flex-row gap-0 group/item">
                    {/* Left Side Column - Desktop only (Image on Left in Pola 2) */}
                    <div className="hidden lg:flex lg:w-[180px] xl:w-[240px] 2xl:w-[280px] lg:shrink-0 justify-end pt-[54px] relative">
                      {isImageLeft && (
                        <motion.div
                          initial={{ opacity: 0, scale: 1.05 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="lg:w-[180px] xl:w-[240px] 2xl:w-[280px] lg:h-[120px] xl:h-[160px] 2xl:h-[180px] shrink-0 rounded-2xl border border-white/5 overflow-hidden relative bg-zinc-950 group-hover/item:border-primary/20 transition-all duration-300"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-102 pointer-events-none select-none"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Middle Column - Line & Icon (responsive width) */}
                    <div className="flex flex-col items-center shrink-0 w-9 lg:w-[50px] xl:w-[70px] 2xl:w-[80px] pt-1 relative">
                      <div className="w-9 h-9 rounded-full bg-[#161616] border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-black/50 shrink-0 z-10">
                        {item.category === "achievement" ? (
                          <Trophy className="w-3.5 h-3.5" />
                        ) : item.category === "education" ? (
                          <GraduationCap className="w-3.5 h-3.5" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="w-[1px] flex-1 bg-white/[0.08] mt-3" />
                      
                      {/* Left-pointing dashed connector (Desktop only, Pola 2) */}
                      {isImageLeft && (
                        <div className="hidden lg:flex absolute left-0 right-0 h-4 lg:top-[106px] xl:top-[126px] 2xl:top-[136px] z-0 items-center justify-start text-primary/40 pointer-events-none">
                          <motion.div
                            initial={{ opacity: 0, x: 5 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="shrink-0 -mr-1 flex items-center z-10"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </motion.div>
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{ originX: 1 }}
                            className="h-[1px] border-t border-dashed border-primary/30 flex-grow"
                          />
                        </div>
                      )}
                    </div>

                    {/* Right Column - Content (Card & optional Image on Right in Pola 1) */}
                    <div className="flex-grow pb-14">
                      {/* Mobile header (hidden on desktop) */}
                      <div className="lg:hidden mt-1">
                        <p className="font-serif italic text-2xl text-primary leading-none">{item.year}</p>
                        {item.role && (
                          <p className="text-[9px] font-mono uppercase tracking-widest text-primary/50 mt-1 mb-4">{item.role}</p>
                        )}
                      </div>

                      {/* Desktop header (hidden on mobile) */}
                      <div className="hidden lg:block">
                        <p className="font-serif italic text-3xl sm:text-4xl text-primary mb-1 leading-none">{item.year}</p>
                        {item.role && (
                          <p className="text-[10px] font-mono uppercase tracking-widest text-primary/50 mb-4">{item.role}</p>
                        )}
                      </div>

                      {/* Card & Image Container */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 xl:gap-6 2xl:gap-8 w-full mt-2 lg:mt-0">
                        {/* Card */}
                        <div className="bg-[#101010] rounded-2xl border border-white/5 p-6 sm:p-8 hover:border-primary/20 transition-colors duration-300 w-full lg:w-[360px] xl:w-[440px] 2xl:w-[480px] lg:shrink-0 relative z-10">
                          <h4 className="text-base sm:text-lg font-normal text-[#E1E0CC] mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-400 font-light leading-relaxed mb-5">{item.description}</p>
                          
                          {item.details && (
                            <ul className="space-y-2">
                              {item.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2.5">
                                  <Pin className="w-3.5 h-3.5 text-primary/40 shrink-0 mt-0.5" />
                                  <span className="text-[11px] text-gray-500 font-light leading-normal">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Mobile-only Image (embedded at bottom of Card) */}
                          {hasImage && (
                            <div className="lg:hidden mt-5 w-full rounded-xl border border-white/5 overflow-hidden bg-zinc-950">
                              <img src={item.image} alt={item.title} className="w-full h-auto object-cover max-h-[220px]" />
                            </div>
                          )}
                        </div>

                        {/* Right-pointing connector and Right Image - Desktop only (Pola 1) */}
                        {isImageRight && (
                          <>
                            <div className="hidden lg:flex items-center justify-center flex-grow min-w-[24px] lg:max-w-[30px] xl:max-w-[60px] 2xl:max-w-[80px] text-primary/40">
                              <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                style={{ originX: 0 }}
                                className="h-[1px] border-t border-dashed border-primary/30 flex-grow"
                              />
                              <motion.div
                                initial={{ opacity: 0, x: -5 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                                className="shrink-0 -ml-1 flex items-center"
                              >
                                <ArrowRight className="w-3.5 h-3.5" />
                              </motion.div>
                            </div>

                            <motion.div
                              initial={{ opacity: 0, scale: 1.05 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              className="hidden lg:flex lg:w-[180px] xl:w-[240px] 2xl:w-[280px] lg:h-[120px] xl:h-[160px] 2xl:h-[180px] shrink-0 rounded-2xl border border-white/5 overflow-hidden relative bg-zinc-950 group-hover/item:border-primary/20 transition-all duration-300"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-102 pointer-events-none select-none"
                              />
                            </motion.div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
