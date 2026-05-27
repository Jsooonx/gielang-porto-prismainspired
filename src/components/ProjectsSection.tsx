import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Check, Github, ExternalLink, Code, ChevronDown, ChevronUp } from "lucide-react";
import { projectsData } from "../data";
import { ProjectItem } from "../types";
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

function ProjectCard({ project }: { project: ProjectItem; key?: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative w-full h-[450px] perspective-1000 cursor-pointer group"
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-8 backface-hidden bg-[#121212] border border-white/5 group-hover:border-primary/20 hover:shadow-2xl hover:shadow-black transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-mono text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {project.category === 'python'
                ? 'Python'
                : project.category === 'flask-web'
                ? 'Flask / Web'
                : 'C / C++'}
            </span>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-primary transition-colors">
              Click to Flip
            </span>
          </div>

          <div className="flex-1 w-full relative rounded-xl overflow-hidden border border-white/5 bg-zinc-950 flex items-center justify-center">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 pointer-events-none select-none"
              />
            ) : (
              <Code className="w-10 h-10 text-white/5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-normal text-[#E1E0CC] mb-1.5">{project.title}</h3>
            <p className="text-[9px] font-mono text-gray-500 truncate uppercase tracking-wider">
              {project.techStack.join(" • ")}
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 backface-hidden rotate-y-180 bg-[#121212] border border-white/5 flex flex-col justify-between hover:shadow-2xl hover:shadow-black transition-shadow duration-300">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-[9px] font-mono text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Details
              </span>
              <div className="flex items-center gap-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-500 hover:text-primary transition-colors p-1"
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
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-500 hover:text-primary transition-colors p-1"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-xl font-normal text-[#E1E0CC] mb-3">{project.title}</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-5">
              {project.description}
            </p>

            {project.details && (
              <div className="space-y-2.5 mb-5 border-t border-white/5 pt-4 overflow-y-auto max-h-[140px] pr-1">
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
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'python' | 'flask-web' | 'c-cpp'>('all');
  const [showArchived, setShowArchived] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const filterOptions = [
    { label: "All Projects", value: "all" as const },
    { label: "Python & Algorithms", value: "python" as const },
    { label: "Flask & Web", value: "flask-web" as const },
    { label: "C / C++ & Systems", value: "c-cpp" as const },
  ];

  const filteredProjects = projectsData.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );
  
  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const archivedProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative bg-black rounded-t-[8vw] md:rounded-t-[4vw] -mt-[8vw] md:-mt-[4vw] pt-[calc(8vw+4rem)] md:pt-[calc(4vw+6rem)] pb-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div ref={headerRef} className="max-w-4xl mx-auto mb-16 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="bg-[#101010] rounded-2xl border border-white/5 flex flex-col items-center justify-center py-16 sm:py-20 px-8 text-center select-none"
        >
          <TitleStaggerReveal
            text="Featured Projects."
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-primary tracking-wide mb-4"
          />
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full relative z-10"
      >
        {activeFilter === 'all' && (
          <motion.div
            key="decorative-video"
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

        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      <AnimatePresence initial={false}>
        {showArchived && archivedProjects.length > 0 && (
          <motion.div
            key="archived-projects-container"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden w-full relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full mt-6">
              {archivedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {archivedProjects.length > 0 && (
        <div className="flex justify-center mt-12 relative z-20">
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-full border border-white/10 text-primary/70 hover:border-white/30 hover:text-primary bg-zinc-950/40 transition-all duration-200 cursor-pointer"
          >
            {showArchived ? "Show Less" : "Show More Projects"}
            {showArchived ? (
              <ChevronUp className="w-4 h-4 transition-transform duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
