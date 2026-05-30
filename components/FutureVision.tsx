"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSiteData } from "@/lib/site-data-context";

function InsightRow({
  number,
  title,
  description,
  index,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 py-8 border-t border-zinc-200/60 dark:border-zinc-800/60 first:border-t-0"
    >
      <span className="text-4xl md:text-5xl font-bold text-zinc-200 dark:text-zinc-800 leading-none">
        {number}
      </span>
      <div className="min-w-0">
        <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="mt-3 text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FutureVision() {
  const { data } = useSiteData();
  const { futureVision } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="future-vision"
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
            {futureVision.sectionLabel}
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {futureVision.sectionTitle}
          </h2>
          <p className="mt-4 mb-12 text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {futureVision.sectionIntro}
          </p>
        </motion.div>

        <div>
          {futureVision.insights.map((insight, i) => (
            <InsightRow
              key={insight.number}
              number={insight.number}
              title={insight.title}
              description={insight.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
