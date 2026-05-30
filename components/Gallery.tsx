"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SmartImage from "./SmartImage";
import ImageLightbox from "./ImageLightbox";
import { useSiteData } from "@/lib/site-data-context";

export default function Gallery() {
  const { data } = useSiteData();
  const { gallery } = data;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  // 过滤掉空图片
  const images = (gallery.images || []).filter((img) => img.src);

  if (images.length === 0) return null;

  return (
    <>
      <section
        id="gallery"
        ref={ref}
        className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-950"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500">
              生活
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {gallery.title}
            </h2>
            {gallery.description && (
              <p className="mt-4 text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl">
                {gallery.description}
              </p>
            )}
          </motion.div>

          <div className="mt-14 columns-2 md:columns-3 gap-4 space-y-4">
            {images.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setLightbox({ src: img.src, alt: img.label || "" })}
                className="block w-full cursor-pointer group"
              >
                <div className="overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900">
                  <SmartImage
                    src={img.src}
                    alt={img.label || ""}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {img.label && (
                  <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500 text-center">
                    {img.label}
                  </p>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

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
