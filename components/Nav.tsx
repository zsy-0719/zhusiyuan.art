"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "@/lib/site-data-context";

export default function Nav() {
  const { data } = useSiteData();
  const { nav } = data;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`fixed top-3 inset-x-3 z-50 transition-all duration-500 rounded-2xl ${
          scrolled
            ? "liquid-glass"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 h-16">
          <a href="#" className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
            {nav.brand}
          </a>
          <div className="flex items-center gap-8">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </motion.header>
    </AnimatePresence>
  );
}
