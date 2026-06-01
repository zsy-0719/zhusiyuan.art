"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
 * CrazyDog 设计常量
 * ============================================================ */
const S = "#1a1a1a";
const F = "#fafaf6";
const B = "#111";

/* ============================================================
 * 状态一：侧躺睡觉（rotate 90°）+ Zzz
 * ============================================================ */
function DogSleeping() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <g transform="rotate(15, 26, 30)">
        {/* 身体侧卧 */}
        <ellipse cx="26" cy="32" rx="16" ry="10" fill={F} stroke={S} strokeWidth="0.9" />
        <line x1="16" y1="30" x2="36" y2="30" stroke={S} strokeWidth="0.3" opacity="0.25" />
        {/* 后腿蜷 */}
        <line x1="14" y1="30" x2="10" y2="40" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="30" r="1.5" fill={F} stroke={S} strokeWidth="0.5" />
        {/* 前腿蜷 */}
        <line x1="34" y1="28" x2="40" y2="38" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="34" cy="28" r="1.5" fill={F} stroke={S} strokeWidth="0.5" />
        {/* 卷尾巴 */}
        <path d="M11,32 C5,28 4,22 8,20 C12,18 14,22 12,26" fill="none" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
        {/* 头枕在前爪上 */}
        <ellipse cx="40" cy="24" rx="9" ry="7" fill={F} stroke={S} strokeWidth="0.8" />
        {/* 耷拉耳 */}
        <ellipse cx="44" cy="17" rx="2.5" ry="5" fill={F} stroke={S} strokeWidth="0.5" transform="rotate(25, 44, 17)" />
        {/* 闭眼 */}
        <path d="M36,23 Q40,25 44,23" fill="none" stroke={S} strokeWidth="0.7" strokeLinecap="round" />
        {/* 鼻 */}
        <ellipse cx="48" cy="26" rx="3" ry="2.2" fill={B} />
        <ellipse cx="47.5" cy="25.2" rx="1.3" ry="0.7" fill="rgba(255,255,255,0.25)" />
        {/* 项圈 */}
        <rect x="33" y="27" width="6" height="5" rx="1" fill={F} stroke={S} strokeWidth="0.7" />
      </g>
      {/* Zzz */}
      <text x="34" y="10" fontSize="6" fontWeight="900" fill={S} opacity="0.4" fontFamily="monospace">Z</text>
      <text x="40" y="5" fontSize="4.5" fontWeight="900" fill={S} opacity="0.25" fontFamily="monospace">z</text>
      <text x="44" y="2" fontSize="3.5" fontWeight="900" fill={S} opacity="0.15" fontFamily="monospace">z</text>
    </svg>
  );
}

/* ============================================================
 * 状态二：惊醒仰头（rotate -10°）+ 竖耳 + 摇尾
 * ============================================================ */
function DogAwake() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      {/* 身体坐姿 */}
      <rect x="12" y="22" width="28" height="14" rx="3" fill={F} stroke={S} strokeWidth="0.9" />
      <line x1="20" y1="22" x2="20" y2="36" stroke={S} strokeWidth="0.3" opacity="0.25" />
      <line x1="32" y1="22" x2="32" y2="36" stroke={S} strokeWidth="0.3" opacity="0.25" />
      {/* 前腿撑地 */}
      <line x1="18" y1="34" x2="14" y2="48" stroke={S} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="34" r="1.5" fill={F} stroke={S} strokeWidth="0.5" />
      <line x1="34" y1="34" x2="37" y2="48" stroke={S} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="34" cy="34" r="1.5" fill={F} stroke={S} strokeWidth="0.5" />
      {/* 尾巴 */}
      <line
        x1="40" y1="28" x2="46" y2="18" stroke={S} strokeWidth="1.3" strokeLinecap="round"
        style={{ transformOrigin: "40px 28px", animation: "bt-tail-wag 0.22s ease-in-out infinite alternate" }}
      />
      <circle cx="46" cy="18" r="1.6" fill={F} stroke={S} strokeWidth="0.5" />
      {/* 项圈 */}
      <rect x="34" y="20" width="7" height="5" rx="1.2" fill={F} stroke={S} strokeWidth="0.8" />
      <circle cx="37.5" cy="20.5" r="0.6" fill={S} />
      <circle cx="37.5" cy="23.5" r="0.6" fill={S} />
      {/* 脖子 */}
      <polygon points="36,22 37,14 40,10 42,12" fill={F} stroke={S} strokeWidth="0.5" />
      {/* 头 */}
      <ellipse cx="38" cy="10" rx="10" ry="7.5" fill={F} stroke={S} strokeWidth="0.9" />
      {/* 竖耳 + 微动 */}
      <polygon
        points="33,4 30,-6 37,1" fill={F} stroke={S} strokeWidth="0.6"
        style={{ transformOrigin: "33px 4px", animation: "bt-ear-twitch 0.3s ease-in-out infinite alternate" }}
      />
      <polygon
        points="42,4 46,-6 43,2" fill={F} stroke={S} strokeWidth="0.6"
        style={{ transformOrigin: "42px 4px", animation: "bt-ear-twitch 0.3s 0.15s ease-in-out infinite alternate" }}
      />
      {/* 鼻 */}
      <path d="M48,6 C53,5 55,9 54,12 C53,15 49,16 46,14 C42,16 38,14 39,11 C40,8 43,7 48,6 Z" fill={B} stroke={S} strokeWidth="0.5" />
      <ellipse cx="46.5" cy="9" rx="2" ry="1" fill="rgba(255,255,255,0.25)" />
      {/* 圆睁眼 */}
      <ellipse cx="34" cy="8" rx="3.5" ry="1" fill="#fff" stroke={S} strokeWidth="0.6" transform="rotate(-5,34,8)" />
      <ellipse cx="34" cy="8.1" rx="1.8" ry="0.5" fill={B} transform="rotate(-5,34,8)" />
      <circle cx="35" cy="7.7" r="0.5" fill="#fff" />
      <ellipse cx="43" cy="8" rx="3.5" ry="1" fill="#fff" stroke={S} strokeWidth="0.6" transform="rotate(-5,43,8)" />
      <ellipse cx="43" cy="8.1" rx="1.8" ry="0.5" fill={B} transform="rotate(-5,43,8)" />
      <circle cx="44" cy="7.7" r="0.5" fill="#fff" />
    </svg>
  );
}

/* ============================================================
 * 状态三：垂直爬墙奔跑 —— 轮子腿旋转
 * ============================================================ */
function DogRunning() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      {/* 身体前倾 */}
      <rect x="10" y="18" width="26" height="12" rx="3" fill={F} stroke={S} strokeWidth="0.9" transform="rotate(-12, 23, 24)" />
      <line x1="16" y1="20" x2="16" y2="28" stroke={S} strokeWidth="0.3" opacity="0.25" transform="rotate(-12, 23, 24)" />
      <line x1="23" y1="20" x2="23" y2="28" stroke={S} strokeWidth="0.3" opacity="0.25" transform="rotate(-12, 23, 24)" />
      <line x1="30" y1="20" x2="30" y2="28" stroke={S} strokeWidth="0.3" opacity="0.25" transform="rotate(-12, 23, 24)" />
      {/* 轮子腿（旋转） */}
      <g style={{ transformOrigin: "18px 32px", animation: "bt-wheel 0.28s linear infinite" }}>
        <line x1="18" y1="30" x2="22" y2="42" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="18" y1="30" x2="14" y2="42" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="18" y1="30" x2="18" y2="44" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="18" y1="30" x2="8" y2="38" stroke={S} strokeWidth="1" strokeLinecap="round" />
        <line x1="18" y1="30" x2="28" y2="37" stroke={S} strokeWidth="1" strokeLinecap="round" />
        <circle cx="18" cy="30" r="2" fill={F} stroke={S} strokeWidth="0.6" />
      </g>
      <g style={{ transformOrigin: "30px 32px", animation: "bt-wheel 0.28s 0.14s linear infinite" }}>
        <line x1="30" y1="30" x2="34" y2="42" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="30" y1="30" x2="26" y2="42" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="30" y1="30" x2="30" y2="44" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="30" y1="30" x2="20" y2="39" stroke={S} strokeWidth="1" strokeLinecap="round" />
        <line x1="30" y1="30" x2="40" y2="36" stroke={S} strokeWidth="1" strokeLinecap="round" />
        <circle cx="30" cy="30" r="2" fill={F} stroke={S} strokeWidth="0.6" />
      </g>
      {/* 尾巴 */}
      <line x1="8" y1="22" x2="0" y2="14" stroke={S} strokeWidth="1.2" strokeLinecap="round"
        style={{ transformOrigin: "8px 22px", animation: "bt-tail-wag 0.18s linear infinite alternate" }}
      />
      {/* 项圈 */}
      <rect x="32" y="14" width="7" height="5" rx="1.2" fill={F} stroke={S} strokeWidth="0.8" transform="rotate(-12, 35, 16)" />
      <circle cx="35.5" cy="14.5" r="0.6" fill={S} />
      <circle cx="35.5" cy="17.5" r="0.6" fill={S} />
      {/* 脖子 + 头前伸 */}
      <polygon points="35,14 38,6 44,4 42,10" fill={F} stroke={S} strokeWidth="0.5" />
      <ellipse cx="43" cy="5" rx="9" ry="6.5" fill={F} stroke={S} strokeWidth="0.9" />
      {/* 耳后压 */}
      <polygon points="39,1 36,-6 42,-1" fill={F} stroke={S} strokeWidth="0.5" />
      <polygon points="46,0 50,-6 47,2" fill={F} stroke={S} strokeWidth="0.5" />
      {/* 鼻 */}
      <path d="M52,1 C56,0 57,4 56,7 C55,10 52,11 50,9 C47,11 44,9 45,6 C46,3 48,2 52,1 Z" fill={B} stroke={S} strokeWidth="0.5" />
      <ellipse cx="50.5" cy="4" rx="1.8" ry="0.9" fill="rgba(255,255,255,0.25)" />
      {/* 眼 */}
      <ellipse cx="40" cy="3" rx="3" ry="0.9" fill="#fff" stroke={S} strokeWidth="0.5" transform="rotate(-5,40,3)" />
      <ellipse cx="40" cy="3.1" rx="1.6" ry="0.4" fill={B} transform="rotate(-5,40,3)" />
      <circle cx="41" cy="2.8" r="0.4" fill="#fff" />
      <ellipse cx="48" cy="3" rx="3" ry="0.9" fill="#fff" stroke={S} strokeWidth="0.5" transform="rotate(-5,48,3)" />
      <ellipse cx="48" cy="3.1" rx="1.6" ry="0.4" fill={B} transform="rotate(-5,48,3)" />
      <circle cx="49" cy="2.8" r="0.4" fill="#fff" />
      {/* 咧嘴 */}
      <rect x="38" y="10" width="14" height="5" rx="1.2" fill="#fff" stroke={S} strokeWidth="0.6" />
      <line x1="42" y1="10" x2="42" y2="15" stroke={S} strokeWidth="0.3" opacity="0.4" />
      <line x1="46" y1="10" x2="46" y2="15" stroke={S} strokeWidth="0.3" opacity="0.4" />
      <line x1="50" y1="10" x2="50" y2="15" stroke={S} strokeWidth="0.3" opacity="0.4" />
    </svg>
  );
}

/* ============================================================
 * 主组件
 * ============================================================ */
export default function BackToTopDog() {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<"sleep" | "awake" | "run">("sleep");
  const [atTop, setAtTop] = useState(true);
  const animRef = useRef<number | null>(null);

  const scrollToTop = useCallback(() => {
    setState("run");
    const startY = window.scrollY;
    const startTime = performance.now();
    const duration = 650;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY * (1 - eased));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, 0);
        setState("sleep");
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 100);
      setVisible(y > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      className="fixed z-[999] pointer-events-auto"
      style={{
        right: 40,
        bottom: 40,
        width: 60,
        height: 60,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s, transform 0.3s",
        transform: atTop ? "scale(0.8)" : "scale(1)",
        cursor: state === "run" ? "default" : "pointer",
      }}
      onMouseEnter={() => { if (state === "sleep") setState("awake"); }}
      onMouseLeave={() => { if (state === "awake") setState("sleep"); }}
      onClick={() => { if (state !== "run" && !atTop) scrollToTop(); }}
    >
      <div
        style={{
          transform:
            state === "sleep"
              ? "rotate(90deg)"
              : state === "awake"
                ? "rotate(-10deg)"
                : "rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {state === "run" ? <DogRunning /> : state === "awake" ? <DogAwake /> : <DogSleeping />}
      </div>

      <style>{`
        @keyframes bt-tail-wag {
          0%   { transform: rotate(-15deg); }
          100% { transform: rotate(20deg); }
        }
        @keyframes bt-ear-twitch {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(8deg); }
        }
        @keyframes bt-wheel {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
