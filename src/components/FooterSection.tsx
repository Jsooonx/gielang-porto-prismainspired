import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface FooterSectionProps {
  onNavigate: (target: string) => void;
}

const techStack = [
  { name: "React", icon: "⚛" },
  { name: "TypeScript", icon: "TS" },
  { name: "JavaScript", icon: "JS" },
  { name: "Python", icon: "🐍" },
  { name: "C++", icon: "C++" },
  { name: "C", icon: "C" },
  { name: "Tailwind CSS", icon: "🌊" },
];

const tickerItems = [...techStack, ...techStack, ...techStack];

function RolloverNavLink({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden text-left bg-transparent border-none p-0 outline-none cursor-pointer w-fit block"
    >
      <span
        className="block font-sans font-black text-xl sm:text-2xl md:text-3xl tracking-tighter text-[#E1E0CC]/70 transition-transform duration-300 ease-out group-hover:-translate-y-full"
        aria-hidden="false"
      >
        {label}
      </span>
      <span
        className="absolute inset-0 block font-sans font-black text-xl sm:text-2xl md:text-3xl tracking-tighter text-primary transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0"
        aria-hidden="true"
      >
        {label}
      </span>
    </button>
  );
}

function useRevealX(
  p: MotionValue<number>,
  fromX: number,
  inStart: number,
  inEnd: number
) {
  const x = useTransform(p, [inStart, inEnd], [`${fromX}px`, "0px"]);
  const opacity = useTransform(p, [inStart, inStart + (inEnd - inStart) * 0.65], [0, 1]);
  return { x, opacity };
}

function useRevealY(
  p: MotionValue<number>,
  fromY: number,
  inStart: number,
  inEnd: number
) {
  const y = useTransform(p, [inStart, inEnd], [`${fromY}px`, "0px"]);
  const opacity = useTransform(p, [inStart, inStart + (inEnd - inStart) * 0.65], [0, 1]);
  return { y, opacity };
}

// Footer section with page routing links, center text reveals, and technology ticker
export function FooterSection({ onNavigate }: FooterSectionProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  const pagesLabel  = useRevealX(scrollYProgress, -140, 0.00, 0.55);
  const navLink0    = useRevealX(scrollYProgress, -200, 0.05, 0.60);
  const navLink1    = useRevealX(scrollYProgress, -260, 0.10, 0.65);
  const navLink2    = useRevealX(scrollYProgress, -320, 0.13, 0.70);
  const navLink3    = useRevealX(scrollYProgress, -380, 0.16, 0.75);
  const navLink4    = useRevealX(scrollYProgress, -380, 0.16, 0.75);

  const word0 = useRevealX(scrollYProgress, -110, 0.05, 0.65);
  const word1 = useRevealX(scrollYProgress,  110, 0.10, 0.70);
  const word2 = useRevealX(scrollYProgress, -110, 0.15, 0.75);
  const word3 = useRevealX(scrollYProgress,  110, 0.20, 0.80);

  const followLabel = useRevealX(scrollYProgress,  140, 0.00, 0.55);
  const social0     = useRevealX(scrollYProgress,  200, 0.05, 0.60);
  const social1     = useRevealX(scrollYProgress,  260, 0.10, 0.65);
  const social2     = useRevealX(scrollYProgress,  320, 0.13, 0.70);
  const social3     = useRevealX(scrollYProgress,  380, 0.16, 0.75);

  const tickerReveal  = useRevealY(scrollYProgress, 60, 0.55, 1.0);
  const bottomReveal  = useRevealY(scrollYProgress, 40, 0.65, 1.0);

  const navLinks = [
    { label: "STORY",        href: "#story" },
    { label: "PROJECTS",     href: "#projects" },
    { label: "ACHIEVEMENTS", href: "#achievements" },
    { label: "INQUIRIES",    href: "#inquiries" },
    { label: "EMAIL",        href: "mailto:elangacount15@gmail.com" },
  ];
  const navReveal = [navLink0, navLink1, navLink2, navLink3, navLink4];

  const socialLinks = [
    { label: "GITHUB",      href: "https://github.com/Jsooonx" },
    { label: "LEETCODE",    href: "https://leetcode.com/u/jsooonx/" },
    { label: "HACKERRANK",  href: "https://www.hackerrank.com/profile/elangacount15" },
    { label: "INSTAGRAM",   href: "https://www.instagram.com/" },
  ];
  const socialReveal = [social0, social1, social2, social3];

  const centerWords = [
    { text: "BUILDING",  className: "font-sans font-black text-[11vw] md:text-[7vw] lg:text-[6vw] leading-[0.85] tracking-[-0.04em] text-[#E1E0CC] uppercase", reveal: word0 },
    { text: "Systems,",  className: "font-serif italic text-[11vw] md:text-[7vw] lg:text-[6vw] leading-[0.85] tracking-[-0.02em] text-primary uppercase",   reveal: word1 },
    { text: "SOLVING",   className: "font-sans font-black text-[11vw] md:text-[7vw] lg:text-[6vw] leading-[0.85] tracking-[-0.04em] text-[#E1E0CC] uppercase", reveal: word2 },
    { text: "Problems.", className: "font-serif italic text-[11vw] md:text-[7vw] lg:text-[6vw] leading-[0.85] tracking-[-0.02em] text-primary uppercase",   reveal: word3 },
  ];

  return (
    <footer
      id="inquiries"
      ref={ref}
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />

      <svg
        className="absolute top-0 left-0 w-full h-[6vw] fill-black pointer-events-none"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
      >
        <path d="M0,0 L1440,0 L1440,60 Q720,0 0,60 Z" />
      </svg>

      <div className="relative z-10 pt-[8vw] pb-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(222,219,200,0.06)_0%,transparent_65%)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-16 md:gap-8 items-start">
          <div className="flex flex-col gap-1 md:pt-24">
            <motion.span
              style={{ ...pagesLabel, willChange: "transform, opacity" }}
              className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/40 mb-4 block"
            >
              Pages
            </motion.span>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                style={{ ...navReveal[i], willChange: "transform, opacity" }}
              >
                <RolloverNavLink
                  label={link.label}
                  onClick={() => {
                    if (link.href.startsWith("mailto:")) {
                      window.location.href = link.href;
                    } else {
                      onNavigate(link.href);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center text-center gap-0 max-w-[520px] mx-auto w-full select-none">
            {centerWords.map(({ text, className, reveal }) => (
              <div key={text} className="overflow-hidden">
                <motion.span
                  style={{ ...reveal, display: "inline-block", willChange: "transform, opacity" }}
                  className={className}
                >
                  {text}
                </motion.span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1 md:pt-24 md:items-end">
            <motion.span
              style={{ ...followLabel, willChange: "transform, opacity" }}
              className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/40 mb-4 md:text-right block"
            >
              Follow On
            </motion.span>

            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...socialReveal[i], willChange: "transform, opacity" }}
                className="group relative overflow-hidden text-left md:text-right block w-fit md:ml-auto"
              >
                <span className="block font-sans font-black text-xl sm:text-2xl md:text-3xl tracking-tighter text-[#E1E0CC]/70 transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  {link.label}
                </span>
                <span className="absolute inset-0 block font-sans font-black text-xl sm:text-2xl md:text-3xl tracking-tighter text-primary transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          style={{ ...tickerReveal, willChange: "transform, opacity" }}
          className="mt-16 sm:mt-20 border-t border-white/5 overflow-hidden py-5 relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-10 items-center w-max"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {tickerItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-primary/30 hover:text-primary/80 transition-colors duration-300 cursor-default shrink-0 group"
              >
                <span className="font-mono text-xs font-bold tracking-widest uppercase whitespace-nowrap group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </span>
                <span className="w-1 h-1 rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors duration-300" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ ...bottomReveal, willChange: "transform, opacity" }}
          className="border-t border-white/5 px-6 sm:px-12 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <span className="font-mono text-[10px] text-gray-600 tracking-wider uppercase">
            © {new Date().getFullYear()} Gielang. All rights reserved.
          </span>
          <div className="flex items-center gap-6 font-mono text-[10px] text-gray-600 tracking-wider uppercase">
            <a href="mailto:elangacount15@gmail.com" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="mailto:elangacount15@gmail.com" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
