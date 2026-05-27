import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Code } from "lucide-react";
import { projectsData } from "../data";
import { ProjectCard } from "./ProjectsSection";
import { TitleStaggerReveal } from "./TitleStaggerReveal";

interface ProjectsArchiveProps {
  onViewMain: () => void;
}

// Complete archive view of all projects
export function ProjectsArchive({ onViewMain }: ProjectsArchiveProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'python' | 'flask-web' | 'c-cpp'>('all');

  const filterOptions = [
    { label: "All Projects", value: "all" as const },
    { label: "Python & Algorithms", value: "python" as const },
    { label: "Flask & Web", value: "flask-web" as const },
    { label: "C / C++ & Systems", value: "c-cpp" as const },
  ];

  const filteredProjects = projectsData.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <div className="relative min-h-screen bg-black pt-16 pb-32 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto mb-12 relative z-20">
        <button
          onClick={onViewMain}
          className="group inline-flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-primary/70 hover:text-primary transition-colors cursor-pointer"
        >
          <div className="bg-zinc-950/80 rounded-full w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:scale-105 transition-all">
            <ArrowLeft className="w-4 h-4 text-primary" />
          </div>
          <span>Back to Home</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto mb-16 relative z-10 w-full text-center select-none">
        <TitleStaggerReveal
          text="Projects Archive."
          className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-primary tracking-wide mb-4"
        />
        <p className="text-gray-500 font-light text-sm sm:text-base max-w-lg mx-auto">
          A complete index of my algorithms, web applications, and system development.
        </p>
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

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full relative z-10"
      >
        {activeFilter === 'all' && (
          <motion.div
            key="decorative-video-archive"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[450px] rounded-2xl overflow-hidden group/video border border-white/5 bg-zinc-950"
          >
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 noise-overlay opacity-[0.5] mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/35 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <Code className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-xl font-serif italic text-primary mb-2">Code in Motion.</h3>
              <p className="text-gray-400 font-light text-xs leading-relaxed max-w-[200px]">
                Writing high-performance logic to build applications, optimize searches, and coordinate automated systems.
              </p>
            </div>
          </motion.div>
        )}

        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  );
}
