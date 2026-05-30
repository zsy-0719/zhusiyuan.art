"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessImage {
  src: string;
  label: string;
}

export default function ProcessFlow({ images }: { images: ProcessImage[] }) {
  const valid = images.filter((img) => img.src && img.src.length > 0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* ========== 灯箱键盘导航 ========== */
  const goNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev < valid.length - 1 ? prev + 1 : 0;
    });
  }, [valid.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : valid.length - 1;
    });
  }, [valid.length]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  if (valid.length === 0) return null;

  return (
    <>
      {/* ======== 两列流程网格 ======== */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {valid.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group text-left"
          >
            {/* 缩略图 */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
              />
            </div>
            {img.label && (
              <p className="mt-1 text-[9px] text-zinc-400 dark:text-zinc-500 leading-tight line-clamp-1">
                {img.label}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* ======== 多图灯箱 ======== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div className="fixed inset-0 bg-black/95" />

            {/* 关闭 */}
            <button
              onClick={closeLightbox}
              aria-label="关闭灯箱"
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* 计数 */}
            <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-white/50 font-mono z-10">
              {lightboxIndex + 1} / {valid.length}
            </span>

            {/* 左箭头 */}
            {valid.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="上一张"
                className="absolute left-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* 图片 */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-full max-h-full px-16"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={valid[lightboxIndex].src}
                alt={valid[lightboxIndex].label}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
              {valid[lightboxIndex].label && (
                <p className="text-center text-sm text-white/60 mt-3">
                  {valid[lightboxIndex].label}
                </p>
              )}
            </motion.div>

            {/* 右箭头 */}
            {valid.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="下一张"
                className="absolute right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
