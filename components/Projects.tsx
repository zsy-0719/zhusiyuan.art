"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectModal from "./ProjectModal";
import SmartImage from "./SmartImage";
import { useSiteData } from "@/lib/site-data-context";

type Project = ReturnType<typeof useSiteData>["data"]["projects"][number];

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <button
        onClick={onClick}
        className="w-full text-left rounded-3xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:-translate-y-1 cursor-pointer"
      >
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-50 dark:bg-zinc-950">
          <SmartImage
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        <div className="p-8 md:p-12 bg-white dark:bg-black">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500">
              {project.category}
            </span>
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
              点击查看详情 &rarr;
            </span>
          </div>

          <h3 className="mt-4 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {project.title}
          </h3>

          <p className="mt-4 text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(project.tags || []).map((tag: string) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-xs font-medium rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function Projects() {
  const { data } = useSiteData();
  const projects = data.projects;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" ref={ref} className="py-20 md:py-28 px-6 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500">
              核心作品
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
              从文本到成片，全流程创作。
            </h2>
          </motion.div>

          <div className="mt-14 flex flex-col gap-8">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeProject && (
        <ProjectModal
          title={activeProject.title}
          category={activeProject.category}
          description={activeProject.description}
          sections={activeProject.sections || []}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
