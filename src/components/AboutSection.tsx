import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";
import { AboutTextReveal } from "./AboutTextReveal";
import { TitleStaggerReveal } from "./TitleStaggerReveal";

export function AboutSection() {
  const aboutSegments = [
    { text: "I am Gielang, ", className: "font-normal text-[#E1E0CC]" },
    { text: "an aspiring computer scientist. ", className: "font-serif italic text-primary" },
    { text: "I design software solutions, analyze algorithms, and program autonomous robotics.", className: "font-normal text-[#E1E0CC]" },
  ];

  const bodyText = "Driven by an early passion for technology, I spent my school years competing in national robotics competitions and learning programming independently. I am a high school graduate now looking to pursue a Bachelor's degree in Computer Science abroad with a scholarship, aiming to build systems that bridge physical electronics and digital intelligence.";

  return (
    <section 
      id="story" 
      className="relative bg-black rounded-t-[8vw] md:rounded-t-[4vw] -mt-[8vw] md:-mt-[4vw] pt-[calc(8vw+5rem)] md:pt-[calc(4vw+8rem)] pb-32 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 flex items-center justify-center overflow-hidden w-full z-10 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(222,219,200,0.05)_0%,transparent_70%)] pointer-events-none select-none" />

      {/* CENTER Content Card */}
      <div className="w-full max-w-6xl bg-[#101010] rounded-3xl p-8 sm:p-14 md:p-20 lg:p-24 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden text-center shadow-3xl shadow-black z-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

        <TitleStaggerReveal 
          text="My Story" 
          className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mb-8 sm:mb-10 block select-none"
        />

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
