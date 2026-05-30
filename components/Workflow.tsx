"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useSiteData } from "@/lib/site-data-context";
import SmartImage from "./SmartImage";
import ProcessFlow from "./ProcessFlow";
import AudioPlayer from "./AudioPlayer";

export default function Workflow() {
  const { data } = useSiteData();
  const { workflow } = data;
  const [active, setActive] = useState(0);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsInView = useInView(toolsRef, { once: true, margin: "-80px" });

  const phase = workflow.phases[active] as typeof workflow.phases[number] & {
    images?: { src: string; label: string }[];
    compare?: { before: string; after: string; label: string };
    audio?: { src: string; label: string }[];
    techNote?: string;
  };

  const hasImages = (phase.images && phase.images.length > 0) ?? false;
  const hasCompare = phase.compare?.before && phase.compare?.after;
  const hasAudio = (phase.audio && phase.audio.length > 0) ?? false;
  const hasTechNote = !!phase.techNote;
  const hasVisuals = hasImages || hasCompare || hasAudio;

  const audioTracks = (phase.audio || []).filter((a) => a.src);

  return (
    <section id="workflow" ref={sectionRef} className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500">
            {workflow.sectionLabel}
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {workflow.sectionTitle}
          </h2>
          {/* 副标题与下方内容左侧对齐 */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12">
            <div className="hidden md:block" />
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(workflow as any).sectionSubtitle}
            </p>
          </div>
        </motion.div>

        {/* 交互式标签 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12">
          {/* 左侧：编号标签 */}
          <div className="flex md:flex-col gap-3 md:gap-4">
            {workflow.phases.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group flex items-center gap-4 text-left"
                >
                  <span
                    className={`text-4xl md:text-5xl font-bold transition-colors duration-300 ${
                      isActive
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-200 dark:text-zinc-800 group-hover:text-zinc-400 dark:group-hover:text-zinc-600"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden md:inline text-lg font-semibold tracking-tight transition-colors duration-300 ${
                      isActive
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 dark:group-hover:text-zinc-500"
                    }`}
                  >
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 右侧：内容区 */}
          <div className="relative min-w-0 min-h-[200px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight md:hidden">
                  {phase.title}
                </h3>
                <p className={`mt-2 md:mt-0 text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed ${hasVisuals ? "max-w-xl" : ""}`}>
                  {phase.description}
                </p>

                {/* 技术注解 */}
                {hasTechNote && (
                  <div className="mt-6 max-w-xl p-4 rounded-xl border border-amber-200/60 dark:border-amber-800/40 bg-amber-50/60 dark:bg-amber-950/20">
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 mt-0.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                        &lt;/&gt;
                      </span>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {phase.techNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* 前后对比 */}
                {hasCompare && (
                  <div className="mt-6 max-w-xl">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900">
                          <SmartImage
                            src={phase.compare!.before}
                            alt="修改前"
                            className="w-full h-auto object-contain"
                          />
                        </div>
                        <p className="mt-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 text-center">
                          修改前
                        </p>
                      </div>
                      <div>
                        <div className="relative overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900">
                          <SmartImage
                            src={phase.compare!.after}
                            alt="修改后"
                            className="w-full h-auto object-contain"
                          />
                        </div>
                        <p className="mt-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 text-center">
                          修改后
                        </p>
                      </div>
                    </div>
                    {phase.compare!.label && (
                      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500 text-center">
                        {phase.compare!.label}
                      </p>
                    )}
                  </div>
                )}

                {/* 音频播放 */}
                {hasAudio && (
                  <div className="mt-6 max-w-xl flex flex-col gap-3">
                    {audioTracks.map((track, i) => {
                      const key = `${active}-${i}`;
                      return (
                        <AudioPlayer
                          key={key}
                          src={track.src}
                          label={track.label || `BGM ${i + 1}`}
                          active={playingKey === key}
                          onPlay={() => setPlayingKey(key)}
                        />
                      );
                    })}
                  </div>
                )}

                {/* 截图流程条 */}
                {hasImages && (
                  <div className="mt-6 max-w-xl">
                    <ProcessFlow images={phase.images!} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 工具标签 */}
        <div ref={toolsRef} className="mt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-8"
          >
            {workflow.toolsLabel}
          </motion.p>

          <div className="flex flex-wrap gap-3">
            {workflow.tools.map((tool: string, i: number) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={toolsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="px-5 py-2.5 text-sm font-medium rounded-xl bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
