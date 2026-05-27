import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

interface NavigationMenuProps {
  currentView: 'main' | 'archive';
  activeSection: string;
  onNavigate: (target: string) => void;
}

const transition = {
  duration: 0.35,
  ease: [0.76, 0, 0.24, 1],
};

// Text rollover hover transition component
function RolloverText({ text, isHovered }: { text: string; isHovered: boolean }) {
  return (
    <span className="relative inline-flex whitespace-nowrap select-none pointer-events-none py-1">
      {text.split("").map((char, index) => {
        if (char === " ") return <span key={index}>&nbsp;</span>;

        return (
          <span
            key={index}
            className="relative inline-block overflow-hidden px-[0.15em] mx-[-0.15em] py-[0.25em]"
            style={{ verticalAlign: "bottom" }}
          >
            <motion.span
              className="inline-block"
              style={{
                display: "block",
                willChange: "transform",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              animate={{ y: isHovered ? "-150%" : "0%" }}
              transition={{
                ...transition,
                delay: index * 0.015,
              }}
            >
              {char}
            </motion.span>
            
            <motion.span
              className="absolute left-[0.15em] top-[0.25em] inline-block text-primary"
              style={{
                display: "block",
                willChange: "transform",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              animate={{ y: isHovered ? "0%" : "150%" }}
              transition={{
                ...transition,
                delay: index * 0.015,
              }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

// Overlay navigation menu with responsive preview grids
export function NavigationMenu({ currentView, activeSection, onNavigate }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setHoveredSection(null);
  };

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    onNavigate(href);
  };

  const menuItems = [
    { label: "Story", href: "#story" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Inquiries", href: "#inquiries" },
  ];

  const sectionImages: Record<string, { src: string; alt: string }[]> = {
    "#story": [
      { src: "/images/portrait.jpg", alt: "Gielang Portrait" },
      { src: "/images/taste_match.png", alt: "Taste Match Recommendation" },
      { src: "/images/habit_tracker.png", alt: "Habit Tracker" },
      { src: "/images/trace_log.png", alt: "Trace Log Archive" },
    ],
    "#projects": [
      { src: "/images/pulse.png", alt: "Pulse Finance" },
      { src: "/images/f12025-dashboard.png", alt: "F1 2025 Dashboard" },
      { src: "/images/mediapipe.png", alt: "MediaPipe Hand Control" },
      { src: "/images/timetable_solver.png", alt: "Timetable Solver" },
    ],
    "#achievements": [
      { src: "/images/JRC-IX-Awarding-Photo.png", alt: "JRC Robotics Awarding" },
      { src: "/images/Volun-Properti-Dramus.jpeg", alt: "Musical Drama Production" },
      { src: "/images/Volun-Finance-Kopikat.jpeg", alt: "KOPIKAT CSR Initiative" },
      { src: "/images/LKT-2017.png", alt: "LKT Robotics Awarding" },
    ],
    "#inquiries": [
      { src: "/images/portrait.jpg", alt: "Gielang Portrait" },
      { src: "/images/pulse.png", alt: "Pulse Finance" },
      { src: "/images/mediapipe.png", alt: "MediaPipe Hand Control" },
      { src: "/images/f12025-dashboard.png", alt: "F1 2025 Dashboard" },
    ],
  };

  const currentDisplaySection = hoveredSection || activeSection || "#story";

  const menuVariants = {
    initial: {
      y: "-100%",
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const contentVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    closed: { y: 30, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imageCardVariants = {
    closed: { opacity: 0, scale: 0.95, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.06,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        className={`fixed top-6 right-6 sm:top-8 sm:right-8 z-[999] w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center cursor-pointer shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-primary text-black border border-primary"
            : "bg-[#101010]/80 backdrop-blur-md text-primary border border-white/5 hover:border-primary/30"
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: { d: "M 4 7 L 20 7" },
              open: { d: "M 6 18 L 18 6" },
            }}
            transition={{ duration: 0.3 }}
          />
          <Path
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: { d: "M 4 12 L 20 12", opacity: 1 },
              open: { d: "M 12 12 L 12 12", opacity: 0 },
            }}
            transition={{ duration: 0.2 }}
          />
          <Path
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: { d: "M 4 17 L 20 17" },
              open: { d: "M 6 6 L 18 18" },
            }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform",
            }}
            className="fixed inset-0 z-[900] bg-[#0c0d0c] text-[#E1E0CC] flex flex-col md:grid md:grid-cols-[1.1fr_0.9fr] p-8 sm:p-12 md:p-24 overflow-y-auto"
          >
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(222,219,200,0.03)_0%,transparent_60%)] pointer-events-none" />

            <svg
              className="absolute top-full left-0 w-full h-[12vh] fill-[#0c0d0c] pointer-events-none"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
            >
              <path d="M0,0 L1440,0 Q720,100 0,0 Z" />
            </svg>

            <div className="hidden md:grid grid-cols-2 gap-4 h-full items-center justify-center relative pr-8">
              {[0, 1, 2, 3].map((idx) => {
                return (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={imageCardVariants}
                    initial="closed"
                    animate="open"
                    className={`relative rounded-2xl overflow-hidden border border-white/5 aspect-[4/3] bg-zinc-950/40 ${
                      idx === 1
                        ? "translate-y-8"
                        : idx === 2
                        ? "-translate-y-8"
                        : ""
                    }`}
                    style={{
                      willChange: "transform, opacity",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {Object.entries(sectionImages).map(([sectionKey, images]) => {
                      const img = images[idx];
                      if (!img) return null;
                      const isActive = currentDisplaySection === sectionKey;
                      return (
                        <img
                          key={sectionKey}
                          src={img.src}
                          alt={img.alt}
                          style={{
                            opacity: isActive ? 0.6 : 0,
                            transition: "opacity 0.3s ease-in-out",
                          }}
                          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 select-none pointer-events-none"
                        />
                      );
                    })}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col justify-center h-full pl-0 md:pl-16 pt-16 md:pt-0 relative">
              <motion.nav
                variants={contentVariants}
                initial="closed"
                animate="open"
                onMouseLeave={() => setHoveredSection(null)}
                className="flex flex-col gap-6"
              >
                {menuItems.map((item) => {
                  const isActive = activeSection === item.href && currentView === 'main';
                  const isHovered = hoveredSection === item.href;

                  return (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      className="relative group w-fit"
                      onMouseEnter={() => setHoveredSection(item.href)}
                    >
                      <button
                        onClick={() => handleLinkClick(item.href)}
                        className={`font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-left transition-colors cursor-pointer select-none bg-transparent border-none p-0 outline-none ${
                          isActive
                             ? "text-primary"
                             : "text-[#E1E0CC]/70 hover:text-primary"
                        }`}
                      >
                        <RolloverText text={`${item.label}.`} isHovered={isHovered} />
                      </button>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 sm:mt-24 pt-8 border-t border-white/5 flex flex-col gap-4 font-mono text-[10px] tracking-widest text-gray-500 uppercase"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-primary font-bold">Gielang Portfolio</span>
                  <span>Computer Science & Software Development</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                  <span>Inquiries: elangacount15@gmail.com</span>
                  <div className="flex items-center gap-4 text-primary">
                    <a
                      href="https://github.com/Jsooonx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                    <span>•</span>
                    <a
                      href="https://leetcode.com/u/jsooonx/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      LeetCode
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
