import { useEffect } from "react";
import Lenis from "lenis";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { AchievementsSection } from "./components/AchievementsSection";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      syncTouch: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth anchor scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      const anchor = targetEl.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href) as HTMLElement | null;
          if (target) {
            lenis.scrollTo(target, {
              offset: 0,
              duration: 2.0,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div className="bg-black text-[#E1E0CC] selection:bg-primary selection:text-black min-h-screen font-sans">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AchievementsSection />

      <footer id="inquiries" className="bg-black py-16 px-6 sm:px-12 md:px-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <span className="font-serif italic text-2xl text-primary tracking-wide">Gielang*</span>
            <p className="text-xs text-gray-500 font-light max-w-xs sm:max-w-sm">
              Aspiring Computer Science student and full-stack software programmer preparing for higher education abroad.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <div className="flex items-center gap-6 text-xs text-gray-400 font-medium">
              <a href="#story" className="hover:text-primary transition-colors">Story</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#achievements" className="hover:text-primary transition-colors">Achievements</a>
              <a href="mailto:hello@gielang.dev" className="hover:text-primary transition-colors">hello@gielang.dev</a>
            </div>
            <span className="text-[10px] font-mono text-gray-600 tracking-wider">
              © {new Date().getFullYear()} GIELANG. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
