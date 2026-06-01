"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSiteData } from "@/lib/site-data-context";
import HeroIntro from "./HeroIntro";

const sizeClasses = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
] as const;
const colorClasses = [
  "text-zinc-300 dark:text-zinc-700",
  "text-zinc-400 dark:text-zinc-600",
  "text-zinc-400/70 dark:text-zinc-600/70",
  "text-zinc-300/60 dark:text-zinc-700/60",
  "text-zinc-200/50 dark:text-zinc-800/50",
] as const;

function DanmakuLayer({ lines }: { lines: string[] }) {
  const items = useMemo(() => {
    const result: {
      text: string;
      size: string;
      color: string;
      speed: number;
      top: number;
      delay: number;
      id: string;
    }[] = [];
    const totalLanes = lines.length;
    const upperLanes = Math.ceil(totalLanes / 2);
    const lowerLanes = totalLanes - upperLanes;
    const upperStart = 14;
    const upperEnd = 32;
    const lowerStart = 68;
    const lowerEnd = 90;

    for (let lane = 0; lane < totalLanes; lane++) {
      const text = lines[lane];
      const seed = (lane * 137 + text.length * 53) % 100;
      const inUpper = lane < upperLanes;
      const laneInBand = inUpper ? lane : lane - upperLanes;
      const maxIndex = inUpper ? upperLanes - 1 : lowerLanes - 1;
      const top = inUpper
        ? upperStart + (maxIndex > 0 ? laneInBand / maxIndex : 0) * (upperEnd - upperStart)
        : lowerStart + (maxIndex > 0 ? laneInBand / maxIndex : 0) * (lowerEnd - lowerStart);

      result.push({
        text,
        size: sizeClasses[seed % sizeClasses.length],
        color: colorClasses[seed % colorClasses.length],
        speed: 18 + (seed * 7) % 10,
        top,
        delay: -(seed * 1.2),
        id: `dm-${lane}`,
      });
    }
    return result;
  }, [lines]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute whitespace-nowrap font-normal ${item.size} ${item.color}`}
          style={{
            top: `${item.top}%`,
            animation: `danmaku-scroll ${item.speed}s linear ${item.delay}s infinite`,
            willChange: "transform",
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const { data } = useSiteData();
  const { hero } = data;
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const personalLines: string[] = (hero as any).personalLines || [];

  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("hero-intro-done") === "1") {
      setIntroDone(true);
    }
  }, []);

  const handleIntroComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hero-intro-done", "1");
    }
    setIntroDone(true);
  };

  /* 英雄区始终渲染（即使 intro 还在播），避免切场景时的空白闪烁 */
  const heroContent = (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 blur-3xl opacity-60" />
      </motion.div>

      {personalLines.length > 0 && <DanmakuLayer lines={personalLines} />}

      <motion.div style={{ scale, opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-6"
        >
          {hero.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-zinc-900 dark:text-white leading-[0.95]"
        >
          {hero.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-lg sm:text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto"
        >
          {hero.tagline.map((line, i) => (
            <span key={i}>
              {line}
              {i < hero.tagline.length - 1 && <br className="hidden sm:block" />}
            </span>
          ))}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );

  return (
    <>
      {heroContent}
      {!introDone && <HeroIntro onComplete={handleIntroComplete} />}
    </>
  );
}
