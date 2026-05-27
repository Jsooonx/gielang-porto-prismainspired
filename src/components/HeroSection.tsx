import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import { WordsPullUp } from "./WordsPullUp";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Story", href: "#story" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Inquiries", href: "#inquiries" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Jsooonx",
    icon: <Github className="w-3.5 h-3.5" />,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/jsooonx/",
    icon: (
      <img 
        src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/1200/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.jpg" 
        alt="LeetCode" 
        className="w-3.5 h-3.5 object-contain rounded-sm"
      />
    ),
  },
  {
    label: "HackerRank",
    href: "https://www.hackerrank.com/profile/elangacount15",
    icon: (
      <img 
        src="https://cdn.iconscout.com/icon/free/png-256/free-hackerrank-logo-icon-svg-download-png-3030100.png" 
        alt="HackerRank" 
        className="w-3.5 h-3.5 object-contain"
      />
    ),
  },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    const updateFade = () => {
      const video = videoRef.current;
      const overlay = overlayRef.current;
      if (video && overlay) {
        if (video.playbackRate !== 0.5) {
          video.playbackRate = 0.75;
        }
        const dur = video.duration;
        const cur = video.currentTime;
        if (dur > 0) {
          const fadeWindow = 0.9;  // Total transition window
          const holdWindow = 0.25; // Hold solid black at loop point
          
          if (cur < holdWindow) {
            overlay.style.opacity = "1";
          } else if (cur < fadeWindow) {
            // Fade out from black
            const progress = (cur - holdWindow) / (fadeWindow - holdWindow);
            const easeOutProgress = Math.sin((progress * Math.PI) / 2);
            overlay.style.opacity = String(1 - easeOutProgress);
          } else if (dur - cur < holdWindow) {
            overlay.style.opacity = "1";
          } else if (dur - cur < fadeWindow) {
            // Fade in to black
            const progress = ((dur - cur) - holdWindow) / (fadeWindow - holdWindow);
            const easeInProgress = Math.sin((progress * Math.PI) / 2);
            overlay.style.opacity = String(1 - easeInProgress);
          } else {
            overlay.style.opacity = "0";
          }
        }
      }
      animationFrameId = requestAnimationFrame(updateFade);
    };

    animationFrameId = requestAnimationFrame(updateFade);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.1, 1], [1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.1, 1], ["0vh", "0vh", "15vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.9], [1, 1, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.15, 0.85], [0, 0, 16]);
  const filter = useTransform(blurValue, (v) => v === 0 ? "none" : `blur(${v}px)`);
  const borderRadius = useTransform(scrollYProgress, [0, 0.1, 1], ["2rem", "2rem", "4rem"]);

  const descVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        delay: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const socialVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        delay: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full p-4 md:p-6 bg-black flex flex-col justify-between">
      <motion.div 
        style={{ 
          scale, 
          y, 
          opacity, 
          borderRadius, 
          filter,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform, filter",
        }} 
        className="relative w-full h-full overflow-hidden bg-zinc-950 flex flex-col justify-between origin-center"
      >
        
        <video
          ref={videoRef}
          src="/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: "translate3d(0, 0, 0)",
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Video loop transition overlay */}
        <div 
          ref={overlayRef}
          id="video-fade-overlay" 
          className="absolute inset-0 bg-black pointer-events-none z-10" 
          style={{ opacity: 1 }}
        />

        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none select-none z-10" />

        {/* Localized gradients to prevent excessive black wash on the content */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />

        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-black/95 rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 sm:px-6 md:px-12 sm:py-3 flex items-center justify-center gap-3.5 sm:gap-6 md:gap-10 lg:gap-12 border-x border-b border-white/5 shadow-2xl w-auto max-w-[95vw] sm:max-w-none">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{ color: "rgba(225, 224, 204, 0.8)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
              className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold transition-colors shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div />

        <div className="relative z-20 w-full px-6 sm:px-8 md:px-10 lg:px-12 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-16 sm:pb-20 md:pb-24 lg:pb-28 flex flex-col justify-end items-center">
          <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-5 sm:gap-6 text-center">
            
            <div className="w-full flex justify-center select-none mb-1">
              <WordsPullUp
                text="Gielang"
                showAsterisk
                className="font-medium text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[13vw] 2xl:text-[12vw] leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] uppercase"
              />
            </div>

            <div className="flex flex-col items-center gap-5 sm:gap-6 max-w-xl sm:max-w-2xl">
              
              <motion.p
                variants={descVariants}
                initial="hidden"
                animate="visible"
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.4] text-center font-light px-2"
              >
                Gielang is an aspiring computer science student and full-stack developer. Combining software engineering with hands-on robotics, he builds intelligent systems and interactive web applications.
              </motion.p>

              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                className="w-full flex flex-col items-center gap-4"
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-4 bg-primary text-black rounded-full pl-6 pr-2 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:gap-6 cursor-pointer shadow-lg shadow-black/50"
                >
                  <span className="tracking-widest">Explore Projects</span>
                  <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </a>

                {/* Mobile & Tablet Social Links (Inline in the content flow) */}
                <motion.div
                  variants={socialVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex lg:hidden items-center justify-center gap-2.5 flex-wrap mt-2 w-full"
                >
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-black/60 text-primary hover:border-primary/40 hover:text-white transition-all duration-300 font-mono text-[9px] tracking-widest font-semibold uppercase"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </motion.div>
              </motion.div>

            </div>

          </div>
        </div>

        {/* Desktop Profile Links (Absolute positioned bottom-left) */}
        <motion.div
          variants={socialVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex absolute bottom-16 left-16 z-30 items-center gap-3"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/60 text-primary hover:border-primary/40 hover:text-white transition-all duration-300 hover:-translate-y-0.5 font-mono text-[9px] tracking-widest font-semibold uppercase"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
