import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check, Github, ExternalLink, Code } from "lucide-react";
import { projectsData } from "../data";

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

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'python' | 'flask-web' | 'c-cpp'>('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const filterOptions = [
    { label: "All Projects", value: "all" as const },
    { label: "Python & Algorithms", value: "python" as const },
    { label: "Flask & Web", value: "flask-web" as const },
    { label: "C / C++ & Systems", value: "c-cpp" as const },
  ];

  return (
    <section
      id="projects"
      className="relative bg-black py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

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
            Featured Projects.
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-gray-500 font-light text-sm sm:text-base max-w-lg"
          >
            Solving algorithmic problems and building robust systems.
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

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full relative z-10"
      >
        {activeFilter === 'all' && (
          <motion.div
            key="decorative-video"
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative min-h-[320px] rounded-2xl overflow-hidden group/video border border-white/5 bg-zinc-950"
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

        {projectsData
          .filter((project) => activeFilter === 'all' || project.category === activeFilter)
          .map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                opacity: { duration: 0.25 },
                layout: { type: "spring", stiffness: 450, damping: 38 }
              }}
              className="bg-[#121212] rounded-2xl border border-white/5 flex flex-col justify-between p-6 sm:p-8 hover:border-primary/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-black h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] font-mono text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {project.category === 'python'
                      ? 'Python'
                      : project.category === 'flask-web'
                      ? 'Flask / Web'
                      : 'C / C++'}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-normal text-[#E1E0CC] mb-3">{project.title}</h3>

                <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                  {project.description}
                </p>

                {project.details && (
                  <div className="space-y-2.5 mb-6 border-t border-white/5 pt-4">
                    {project.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-gray-400 font-light leading-normal">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono text-gray-500 bg-zinc-950 px-2 py-0.5 rounded border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
