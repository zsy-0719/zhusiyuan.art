"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "./SmartImage";
import ImageLightbox from "./ImageLightbox";

export interface ProjectSection {
  title: string;
  intro?: string;
  images?: { src: string; label?: string; link?: string }[];
  videos?: { cover: string; label: string; link: string }[];
  characters?: {
    name: string;
    desc: string;
    images: string[];
  }[];
}

interface ProjectModalProps {
  title: string;
  category: string;
  description: string;
  sections: ProjectSection[];
  onClose: () => void;
}

/* ============================================================
 * 自适应图片格子 —— 保持原始比例，不裁切
 * ============================================================ */
function ImageGrid({
  images,
}: {
  images: { src: string; label?: string; link?: string }[];
}) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; link?: string } | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((img, ii) => {
          const hasImgLink = img.link && img.link.trim().length > 0;
          const inner = (
            <div className="group cursor-pointer text-left">
              <div className="overflow-hidden rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950">
                <div className="relative w-full">
                  <SmartImage
                    src={img.src}
                    alt={img.label || ""}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  {hasImgLink && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white/90 group-hover:bg-black/70 group-hover:scale-110 transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <polygon points="6,4 18,12 6,20" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {img.label && (
                <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500 text-center truncate px-1">
                  {img.label}
                </p>
              )}
            </div>
          );
          if (hasImgLink) {
            return (
              <a key={ii} href={img.link} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            );
          }
          return (
            <button
              key={ii}
              onClick={() => setLightbox({ src: img.src, alt: img.label || "" })}
              aria-label={`查看大图：${img.label || ""}`}
            >
              {inner}
            </button>
          );
        })}
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          link={lightbox.link}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

/* ============================================================
 * 视频版块 —— 封面图点击直接跳转百度网盘
 * ============================================================ */
function VideoGrid({
  videos,
}: {
  videos: { cover: string; label: string; link: string }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {videos.map((v, vi) => {
        const hasLink = v.link && v.link.trim().length > 0;
        const card = (
          <div className="relative overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950">
            <SmartImage
              src={v.cover}
              alt={v.label}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {hasLink ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black/50 text-white/90 group-hover:bg-black/70 group-hover:scale-110 transition-all">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-zinc-800/70 text-white text-xs whitespace-nowrap">
                视频链接待添加
              </div>
            )}
          </div>
        );

        return (
          <div key={vi} className="group text-left">
            {hasLink ? (
              <a href={v.link} target="_blank" rel="noopener noreferrer" className="block">
                {card}
              </a>
            ) : (
              card
            )}
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 text-center">
              {v.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
 * 角色卡片 —— 竖版图用 object-contain
 * ============================================================ */
function CharacterCards({
  characters,
}: {
  characters: NonNullable<ProjectSection["characters"]>;
}) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {characters.map((char, ci) => (
          <div
            key={ci}
            className="flex gap-4 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/50"
          >
            <div className="flex gap-2 shrink-0">
              {char.images.map((img, ii) => (
                <button
                  key={ii}
                  onClick={() => setLightbox({ src: img, alt: char.name })}
                  aria-label={`查看${char.name}角色图`}
                  className="cursor-pointer shrink-0"
                >
                  <div className="w-20 sm:w-24 rounded-lg overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900">
                    <SmartImage
                      src={img}
                      alt={char.name}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{char.name}</h4>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{char.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

/* ============================================================
 * 主弹窗
 * ============================================================ */
export default function ProjectModal({
  title,
  category,
  description,
  sections,
  onClose,
}: ProjectModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
        onClick={onClose}
      >
        <div className="fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl my-6 mx-3 bg-white dark:bg-black rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden shadow-2xl"
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            aria-label="关闭项目详情"
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* 头部 */}
          <div className="px-6 md:px-8 py-6 border-b border-zinc-100 dark:border-zinc-900">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500">
              {category}
            </span>
            <h2 className="mt-1.5 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>

          {/* 内容区 */}
          <div className="px-6 md:px-8 py-6 flex flex-col gap-8">
            {sections.map((section, si) => (
              <div key={si}>
                {/* 分类标题 */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-700" />
                  <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-zinc-500 dark:text-zinc-400">
                    {section.title}
                  </h3>
                </div>

                {section.intro && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">{section.intro}</p>
                )}

                {section.videos && section.videos.length > 0 && <VideoGrid videos={section.videos} />}
                {section.images && section.images.length > 0 && <ImageGrid images={section.images} />}
                {section.characters && <CharacterCards characters={section.characters} />}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
