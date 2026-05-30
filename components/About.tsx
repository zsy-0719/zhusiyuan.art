"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SmartImage from "./SmartImage";
import ContactModal from "./ContactModal";
import { useSiteData } from "@/lib/site-data-context";

export default function About() {
  const { data } = useSiteData();
  const { about } = data;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showContact, setShowContact] = useState(false);

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 px-6 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500">
            关于我
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-10 items-start">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="relative w-56 h-56 rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {about.avatarPath ? (
                <SmartImage
                  src={about.avatarPath}
                  alt="个人照片"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-300 dark:text-zinc-700">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                  <span className="text-xs">添加照片</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              {about.highlights.map((h) => (
                <div key={h.label} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{h.value}</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{h.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight mb-8"
            >
              {about.introTitle.map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < about.introTitle.length - 1 && <br />}
                </span>
              ))}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-5 text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed"
            >
              {about.introParagraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="w-6 h-px bg-zinc-300 dark:bg-zinc-700" />
            <h3 className="text-sm font-semibold tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400">
              {about.experienceLabel}
            </h3>
          </div>

          <div className="flex flex-col gap-8">
            {about.experiences.map((exp, i) => (
              <div key={i} className="pl-6 border-l-2 border-zinc-100 dark:border-zinc-900">
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">{exp.period}</span>
                <h4 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-1">{exp.role}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 mb-3">{exp.company}</p>
                <ul className="space-y-1.5">
                  {exp.details.map((d: string, j: number) => (
                    <li key={j} className="text-sm text-zinc-500 dark:text-zinc-400 flex gap-2">
                      <span className="text-zinc-300 dark:text-zinc-700 shrink-0 mt-1.5">&#x2022;</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60"
        >
          {about.education.map((item, i) => (
            <div key={i}>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-1">{item.label}</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <button
            onClick={() => setShowContact(true)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-80 transition-opacity"
          >
            {about.ctaPrimary}
          </button>
          {about.resumeLink && about.resumeLink !== "#" ? (
            <a
              href={about.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              download={about.resumeLink.startsWith("data:") ? "简历.pdf" : undefined}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              {about.ctaSecondary}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed">
              暂未上传简历
            </span>
          )}
        </motion.div>
      </div>

      {showContact && (
        <ContactModal
          email={about.contactEmail}
          phone={about.phone}
          wechatQr={about.wechatQr}
          onClose={() => setShowContact(false)}
        />
      )}
    </section>
  );
}
