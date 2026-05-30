"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "./SmartImage";

interface ContactModalProps {
  email: string;
  phone: string;
  wechatQr: string;
  onClose: () => void;
}

export default function ContactModal({ email, phone, wechatQr, onClose }: ContactModalProps) {
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
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        <div className="fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm mx-4 bg-white dark:bg-black rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden shadow-2xl"
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            aria-label="关闭联系弹窗"
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="p-8">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white text-center">联系方式</h2>

            <div className="mt-8 space-y-5">
              {/* 邮箱 */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-blue-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">邮箱</p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-500 transition-colors">{email}</p>
                </div>
              </a>

              {/* 电话 */}
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">电话</p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors">{phone}</p>
                </div>
              </a>

              {/* 微信二维码 */}
              {wechatQr && (
                <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-950 text-green-500 mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.08 2.457c-2.41 0-4.47 1.74-4.47 3.99 0 2.25 1.993 3.99 4.47 3.99.57 0 1.137-.098 1.668-.284a.55.55 0 0 1 .456.062l1.23.717a.21.21 0 0 0 .107.035.19.19 0 0 0 .188-.19c0-.047-.019-.092-.031-.138l-.255-.946a.38.38 0 0 1 .137-.428c1.173-.868 1.864-2.05 1.864-3.376 0-2.109-1.962-3.432-4.496-3.432zm-2.048 2.012c.413 0 .75.34.75.761a.755.755 0 0 1-.75.76.755.755 0 0 1-.75-.76c0-.42.336-.761.75-.761zm4.17 0c.414 0 .75.34.75.761a.755.755 0 0 1-.75.76.755.755 0 0 1-.75-.76c0-.42.337-.761.75-.761z" />
                    </svg>
                  </div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-3">微信</p>
                  <div className="w-40 h-40 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white">
                    <SmartImage
                      src={wechatQr}
                      alt="微信二维码"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">扫码添加微信</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
