"use client";

import { useSiteData } from "@/lib/site-data-context";
import FooterTheater from "./FooterTheater";

export default function Footer() {
  const { data } = useSiteData();
  const { footer } = data;

  return (
    <footer className="bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900">
      <FooterTheater />
      <div className="py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} {footer.copyright}
          </p>
          <div className="flex gap-6 text-sm text-zinc-400 dark:text-zinc-500">
            <a href={`mailto:${footer.email}`} className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              邮箱
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">{footer.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
