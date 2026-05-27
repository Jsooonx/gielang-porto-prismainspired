import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, Instagram } from "lucide-react";

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  bgClass: string;
  icon: React.ReactNode;
  isImage?: boolean;
  imageSrc?: string;
}

export function SocialsFanOut() {
  const [isDeckHovered, setIsDeckHovered] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const getCardOffsets = (index: number, isHovered: boolean) => {
    let baseOffset = 0;
    let hoverOffset = 0;

    if (isMobile) {
      baseOffset = 22;
      hoverOffset = 48;
    } else if (isTablet) {
      baseOffset = 48;
      hoverOffset = 100;
    } else {
      baseOffset = 80;
      hoverOffset = 190;
    }

    const multiplier = index - 2;
    const defaultX = multiplier * baseOffset;
    const expandedX = multiplier * hoverOffset;

    return isHovered ? expandedX : defaultX;
  };

  const getCardRotation = (index: number, isHovered: boolean) => {
    const baseRotation = (index - 2) * 5; // Center is 0, left is negative, right is positive
    return isHovered ? baseRotation * 0.4 : baseRotation;
  };

  const cards: CardData[] = [
    {
      id: "github",
      title: "GitHub",
      subtitle: "@Jsooonx",
      url: "https://github.com/Jsooonx",
      bgClass: "from-zinc-900 via-zinc-950 to-black",
      icon: <Github className="w-16 h-16 sm:w-20 sm:h-20 text-white/90" />,
    },
    {
      id: "leetcode",
      title: "LeetCode",
      subtitle: "@jsooonx",
      url: "https://leetcode.com/u/jsooonx/",
      bgClass: "from-[#242424] via-[#1A1A1A] to-[#0D0D0D]",
      icon: (
        <img 
          src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/1200/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.jpg" 
          alt="LeetCode" 
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl"
        />
      ),
    },
    {
      id: "portrait",
      title: "Gielang*",
      subtitle: "CS Builder",
      url: "#story",
      bgClass: "bg-black",
      icon: null,
      isImage: true,
      imageSrc: "/images/portrait.jpg",
    },
    {
      id: "hackerrank",
      title: "HackerRank",
      subtitle: "@elangacount15",
      url: "https://www.hackerrank.com/profile/elangacount15",
      bgClass: "from-[#1E2E26] via-[#101D17] to-[#0A120E]",
      icon: (
        <img 
          src="https://cdn.iconscout.com/icon/free/png-256/free-hackerrank-logo-icon-svg-download-png-3030100.png" 
          alt="HackerRank" 
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
      ),
    },
    {
      id: "instagram",
      title: "Instagram",
      subtitle: "@instagram",
      url: "https://www.instagram.com/",
      bgClass: "from-[#833AB4] via-[#FD1D1D] to-[#F56040]",
      icon: <Instagram className="w-16 h-16 sm:w-20 sm:h-20 text-white" />,
    },
  ];

  return (
    <section className="relative bg-black rounded-t-[8vw] md:rounded-t-[4vw] -mt-[8vw] md:-mt-[4vw] pt-[calc(8vw+5rem)] md:pt-[calc(4vw+6rem)] pb-32 px-4 overflow-hidden z-40 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
      {/* Background Decorative Blur */}
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(222,219,200,0.05)_0%,transparent_70%)] pointer-events-none select-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 select-none flex flex-col items-center gap-2">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-primary uppercase font-medium tracking-wide">
            What's Up On Socials
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light tracking-wide">
            Follow Gielang and explore active repositories, algorithmic puzzles, and social highlights.
          </p>
        </div>

        {/* 3D Fanned-Out Cards Container */}
        <div 
          className="relative w-full h-[260px] xs:h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px] flex items-center justify-center cursor-pointer mt-4"
          onMouseEnter={() => setIsDeckHovered(true)}
          onMouseLeave={() => {
            setIsDeckHovered(false);
            setHoveredCardIndex(null);
          }}
        >
          {cards.map((card, index) => {
            const isCardHovered = hoveredCardIndex === index;
            const xOffset = getCardOffsets(index, isDeckHovered);
            const rotation = getCardRotation(index, isDeckHovered);

            // Compute depth: hovered card gets top priority, otherwise center-focused Z-index mapping
            let zIndex = 10;
            if (isCardHovered) {
              zIndex = 50;
            } else {
              zIndex = 30 - Math.abs(index - 2) * 5;
            }

            return (
              <motion.a
                key={card.id}
                href={card.url}
                target={card.id === "portrait" ? "_self" : "_blank"}
                rel={card.id === "portrait" ? "" : "noopener noreferrer"}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className="group/card absolute rounded-[1.5rem] overflow-hidden p-5 flex flex-col justify-between shadow-2xl shadow-black/80"
                style={{
                  width: isMobile ? "130px" : isTablet ? "190px" : "230px",
                  height: isMobile ? "190px" : isTablet ? "270px" : "330px",
                  outline: "1px solid transparent",       // Crucial for subpixel anti-aliasing on rotated elements
                  backfaceVisibility: "hidden",           // Forces GPU rasterization for smooth edges
                  WebkitBackfaceVisibility: "hidden",
                }}
                animate={{
                  x: xOffset,
                  rotate: isCardHovered ? 0 : rotation,
                  y: isCardHovered ? (isMobile ? -20 : -35) : 0,
                  scale: isCardHovered ? 1.08 : 1,
                  zIndex: zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                  mass: 0.8,
                }}
              >
                {/* Visual Glass Glow background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgClass} z-0 transition-all duration-300 group-hover/card:brightness-110`} />

                {/* Diagonal highlight glint on individual hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:animate-shimmer pointer-events-none z-10" />

                {/* Crisp Anti-Aliased Border Overlay (inset by 0.5px to prevent clipping aliasing) */}
                <div 
                  className={`absolute inset-[0.5px] rounded-[1.45rem] pointer-events-none z-30 transition-colors duration-300 border ${
                    card.id === "portrait" 
                      ? "border-primary/25" 
                      : card.id === "leetcode"
                        ? "border-yellow-500/10 group-hover/card:border-yellow-500/30"
                        : card.id === "hackerrank"
                          ? "border-emerald-500/15 group-hover/card:border-emerald-500/35"
                          : card.id === "instagram"
                            ? "border-pink-500/25 group-hover/card:border-pink-500/45"
                            : "border-white/10 group-hover/card:border-white/25"
                  }`} 
                />

                {card.isImage ? (
                  /* Portrait Image Card */
                  <>
                    <img 
                      src={card.imageSrc} 
                      alt="Portrait" 
                      className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
                    <div className="relative z-20 flex flex-col justify-end h-full">
                      <span className="font-serif italic text-xl sm:text-2xl text-primary font-bold leading-none">{card.title}</span>
                      <span className="font-mono text-[9px] text-gray-400 tracking-wider mt-1 uppercase">{card.subtitle}</span>
                    </div>
                  </>
                ) : (
                  /* Logo Centered Card */
                  <div className="relative z-20 flex flex-col justify-between h-full w-full">
                    {/* Top small watermark */}
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Connect</span>
                      <ExternalLink className="w-2.5 h-2.5 text-gray-600 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                    </div>

                    {/* Centered Large Logo */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="transition-transform duration-300 group-hover/card:scale-110">
                        {card.icon}
                      </div>
                    </div>

                    {/* Bottom Label */}
                    <div className="flex flex-col border-t border-white/5 pt-3">
                      <span className="text-white text-xs sm:text-sm font-semibold tracking-wide leading-none">{card.title}</span>
                      <span className="text-[9px] text-gray-500 font-mono tracking-wider mt-1.5 uppercase">{card.subtitle}</span>
                    </div>
                  </div>
                )}
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
