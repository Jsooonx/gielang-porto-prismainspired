import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Trophy, Sparkles, Pin, GraduationCap, ArrowLeft, ArrowRight } from "lucide-react";
import { achievementsData } from "../data";
import { TitleStaggerReveal } from "./TitleStaggerReveal";

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
    <section 
      id="achievements" 
      className="relative bg-[#161616] rounded-t-[8vw] md:rounded-t-[4vw] -mt-[8vw] md:-mt-[4vw] pt-[calc(8vw+4rem)] md:pt-[calc(4vw+6rem)] pb-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
    >
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(222,219,200,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(222,219,200,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div ref={headerRef} className="max-w-4xl mx-auto mb-16 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="bg-[#101010] rounded-2xl border border-white/5 flex flex-col items-center justify-center py-16 sm:py-20 px-8 text-center select-none"
        >
          <TitleStaggerReveal
            text="Achievements & Activities."
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-primary tracking-wide mb-4"
          />
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
                  <div className="relative flex flex-col lg:grid lg:grid-cols-[150px_80px_1fr] xl:grid-cols-[200px_100px_1fr] 2xl:grid-cols-[240px_120px_1fr] gap-0 group/item">
                    {/* Row 1 (Header) - Desktop only */}
                    <div className="hidden lg:block lg:col-start-3 lg:row-start-1 pb-4">
                      <p className="font-serif italic text-3xl sm:text-4xl text-primary mb-1 leading-none">{item.year}</p>
                      {item.role && (
                        <p className="text-[10px] font-mono uppercase tracking-widest text-primary/50 mb-0">{item.role}</p>
                      )}
                    </div>

                    {/* Row 1, Column 2 - Desktop vertical line upper half */}
                    <div className="hidden lg:flex lg:col-start-2 lg:row-start-1 justify-center relative w-full h-full">
                      <div className="w-[1px] h-full bg-white/[0.08]" />
                    </div>

                    {/* Left Side Column - Desktop only (Image on Left in Pola 2) - Row 2, Column 1 */}
                    <div className="hidden lg:flex lg:col-start-1 lg:row-start-2 justify-end items-center relative">
                      {isImageLeft && (
                        <motion.div
                          initial={{ opacity: 0, scale: 1.05 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="lg:w-[150px] xl:w-[200px] 2xl:w-[240px] lg:h-[100px] xl:h-[133px] 2xl:h-[160px] shrink-0 rounded-2xl border border-white/5 overflow-hidden relative bg-zinc-950 group-hover/item:border-primary/20 transition-all duration-300"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-102 pointer-events-none select-none"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Desktop Middle Column - Row 2, Column 2 */}
                    <div className="hidden lg:flex lg:col-start-2 lg:row-start-2 items-center justify-center relative h-full w-full min-h-[120px]">
                      {/* Continuous Vertical Line for Desktop */}
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/[0.08] z-0" />
                      
                      {/* Circle Icon */}
                      <div className="w-9 h-9 rounded-full bg-[#161616] border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-black/50 shrink-0 z-10 relative">
                        {item.category === "achievement" ? (
                          <Trophy className="w-3.5 h-3.5" />
                        ) : item.category === "education" ? (
                          <GraduationCap className="w-3.5 h-3.5" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Left Connector (Pola 2 only) */}
                      {isImageLeft && (
                        <div className="absolute left-0 lg:w-[22px] xl:w-[32px] 2xl:w-[42px] top-1/2 -translate-y-1/2 flex items-center justify-start text-primary/40 pointer-events-none z-10">
                          <motion.div
                            initial={{ opacity: 0, x: 5 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="shrink-0 -mr-1 flex items-center z-10"
                          >
                            <ArrowLeft className="w-3 h-3" />
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

                      {/* Right Connector (All items) */}
                      <div className="absolute right-0 lg:w-[22px] xl:w-[32px] 2xl:w-[42px] top-1/2 -translate-y-1/2 flex items-center justify-end text-primary/40 pointer-events-none z-10">
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
                          className="shrink-0 -ml-1 flex items-center z-10"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Mobile Middle Column - Shown only on Mobile */}
                    <div className="flex flex-col items-center shrink-0 w-9 pt-1 relative lg:hidden">
                      <div className="w-9 h-9 rounded-full bg-[#161616] border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-black/50 shrink-0 z-10">
                        {item.category === "achievement" ? (
                          <Trophy className="w-3.5 h-3.5" />
                        ) : item.category === "education" ? (
                          <GraduationCap className="w-3.5 h-3.5" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="w-[1px] flex-grow bg-white/[0.08] mt-3" />
                    </div>

                    {/* Right Column - Content (Card & optional Image on Right in Pola 1) - Row 2, Column 3 */}
                    <div className="flex-grow pb-14 lg:col-start-3 lg:row-start-2 lg:flex lg:items-center">
                      <div className="w-full">
                        {/* Mobile header (hidden on desktop) */}
                        <div className="lg:hidden mt-1">
                          <p className="font-serif italic text-2xl text-primary leading-none">{item.year}</p>
                          {item.role && (
                            <p className="text-[9px] font-mono uppercase tracking-widest text-primary/50 mt-1 mb-4">{item.role}</p>
                          )}
                        </div>

                        {/* Card & Image Container */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3 xl:gap-4 2xl:gap-6 w-full mt-2 lg:mt-0">
                          {/* Card */}
                          <div className="bg-[#101010] rounded-2xl border border-white/5 p-6 sm:p-8 hover:border-primary/20 transition-colors duration-300 w-full lg:w-[320px] xl:w-[380px] 2xl:w-[420px] lg:shrink-0 relative z-10">
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
                              <div className="hidden lg:flex items-center justify-center flex-grow min-w-[24px] lg:max-w-[20px] xl:max-w-[40px] 2xl:max-w-[60px] text-primary/40">
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
                                className="hidden lg:flex lg:w-[150px] xl:w-[200px] 2xl:w-[240px] lg:h-[100px] xl:h-[133px] 2xl:h-[160px] shrink-0 rounded-2xl border border-white/5 overflow-hidden relative bg-zinc-950 group-hover/item:border-primary/20 transition-all duration-300"
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
