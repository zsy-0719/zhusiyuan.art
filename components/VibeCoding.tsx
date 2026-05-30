"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSiteData } from "@/lib/site-data-context";

function ProjectRow({
  project,
  index,
}: {
  project: {
    name: string;
    tools: string[];
    description: string;
    highlights: string[];
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-10 py-8 border-t border-zinc-200/60 dark:border-zinc-800/60 first:border-t-0"
    >
      {/* 左侧：项目名 + 工具标签 */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
          {project.name}
        </h3>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* 右侧：描述 + 亮点 */}
      <div>
        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {project.description}
        </p>
        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-zinc-400 dark:bg-zinc-600" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function VibeCoding() {
  const { data } = useSiteData();
  const { vibeCoding } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="vibecoding"
      ref={sectionRef}
      className="py-20 md:py-28 px-6 bg-white dark:bg-black"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500">
            {vibeCoding.sectionLabel}
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {vibeCoding.sectionTitle}
          </h2>
          <p className="mt-5 text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {vibeCoding.sectionSubtitle}
          </p>
        </motion.div>

        <div className="mt-14">
          {vibeCoding.projects.map((project, i) => (
            <ProjectRow key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
