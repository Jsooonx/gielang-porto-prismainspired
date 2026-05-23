import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";
import { AboutTextReveal } from "./AboutTextReveal";

export function AboutSection() {
  const aboutSegments = [
    { text: "I am Gielang, ", className: "font-normal text-[#E1E0CC]" },
    { text: "an aspiring computer scientist. ", className: "font-serif italic text-primary" },
    { text: "I design software solutions, analyze algorithms, and program autonomous robotics.", className: "font-normal text-[#E1E0CC]" },
  ];

  const bodyText = "Driven by an early passion for technology, I spent my school years competing in national robotics competitions and learning programming independently. I am a high school graduate now looking to pursue a Bachelor's degree in Computer Science abroad with a scholarship, aiming to build systems that bridge physical electronics and digital intelligence.";

  return (
    <section id="story" className="relative bg-black py-24 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none select-none" />

      <div className="w-full max-w-6xl bg-[#101010] rounded-3xl p-8 sm:p-14 md:p-20 lg:p-24 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden text-center shadow-3xl shadow-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

        <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mb-8 sm:mb-10 block select-none">
          My Story
        </span>

        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[1.05] sm:leading-[0.95] tracking-tight mb-12 sm:mb-16">
          <WordsPullUpMultiStyle segments={aboutSegments} />
        </div>

        <div className="max-w-2xl mx-auto border-t border-white/10 pt-10 sm:pt-12 w-full">
          <AboutTextReveal text={bodyText} className="text-primary/90 leading-relaxed font-light" />
        </div>

      </div>
    </section>
  );
}
