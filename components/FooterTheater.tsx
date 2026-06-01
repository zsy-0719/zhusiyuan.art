"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { readCount } from "@/components/EasterEggDog";

const S = "#1a1a1a";
const F = "#fafaf6";
const B = "#111";

/* ============================================================
 * 迷你 CrazyDog（奔跑态）—— 匹配入场动画设计
 * ============================================================ */
function MiniDog({ x, caught }: { x: number; caught?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 26,
        left: `calc(50% + ${x}px)`,
        transform: "translateX(-50%)",
        zIndex: caught ? 1 : 3,
      }}
    >
      <svg width="52" height="38" viewBox="0 0 52 38" fill="none">
        {/* 后腿 */}
        <g style={{ transformOrigin: "12px 30px", animation: caught ? "none" : "ft-sprint-b 0.12s linear infinite" }}>
          <line x1="12" y1="28" x2="6" y2="38" stroke={S} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="28" r="1.5" fill={F} stroke={S} strokeWidth="0.6" />
        </g>
        <g style={{ transformOrigin: "18px 30px", animation: caught ? "none" : "ft-sprint-b 0.12s 0.06s linear infinite" }}>
          <line x1="18" y1="28" x2="12" y2="38" stroke={S} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="18" cy="28" r="1.5" fill={F} stroke={S} strokeWidth="0.6" />
        </g>
        {/* 身体 */}
        <rect x="6" y="17" width="28" height="13" rx="3" fill={F} stroke={S} strokeWidth="1" />
        <line x1="12" y1="18" x2="12" y2="29" stroke={S} strokeWidth="0.35" opacity="0.25" />
        <line x1="20" y1="18" x2="20" y2="29" stroke={S} strokeWidth="0.35" opacity="0.25" />
        <line x1="28" y1="18" x2="28" y2="29" stroke={S} strokeWidth="0.35" opacity="0.25" />
        {/* 前腿 */}
        <g style={{ transformOrigin: "33px 30px", animation: caught ? "none" : "ft-sprint-a 0.12s linear infinite" }}>
          <line x1="33" y1="28" x2="39" y2="38" stroke={S} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="33" cy="28" r="1.5" fill={F} stroke={S} strokeWidth="0.6" />
        </g>
        <g style={{ transformOrigin: "36px 30px", animation: caught ? "none" : "ft-sprint-a 0.12s 0.06s linear infinite" }}>
          <line x1="36" y1="28" x2="41" y2="38" stroke={S} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="36" cy="28" r="1.5" fill={F} stroke={S} strokeWidth="0.6" />
        </g>
        {/* 尾巴 */}
        <line
          x1="6" y1="22" x2="0" y2="12" stroke={S} strokeWidth="1.3" strokeLinecap="round"
          style={{ transformOrigin: "6px 22px", animation: caught ? "none" : "ft-tail 0.15s linear infinite alternate" }}
        />
        <circle cx="0" cy="12" r="1.5" fill={F} stroke={S} strokeWidth="0.6" />
        {/* 项圈 */}
        <rect x="30" y="14" width="7" height="5" rx="1.2" fill={F} stroke={S} strokeWidth="0.9" />
        <circle cx="33.5" cy="15" r="0.7" fill={S} />
        <circle cx="33.5" cy="17" r="0.7" fill={S} />
        {/* 脖子+头 */}
        <polygon points="32,15 34,10 42,8 44,12" fill={F} stroke={S} strokeWidth="0.6" />
        <ellipse cx="44" cy="8" rx="9" ry="7" fill={F} stroke={S} strokeWidth="1" />
        {/* 耳 */}
        <polygon points="39,2 35,-3 41,1" fill={F} stroke={S} strokeWidth="0.5" />
        <polygon points="47,1 51,-3 48,3" fill={F} stroke={S} strokeWidth="0.5" />
        {/* 大黑鼻 */}
        <path d="M51,4 C55,3 56,7 55,10 C54,13 51,14 49,12 C46,14 44,12 45,9 C46,6 48,5 51,4 Z" fill={B} stroke={S} strokeWidth="0.5" />
        <ellipse cx="49.5" cy="7" rx="1.5" ry="0.7" fill="rgba(255,255,255,0.25)" />
        {/* 眼 */}
        <ellipse cx="40" cy="6" rx="2.8" ry="0.9" fill="#fff" stroke={S} strokeWidth="0.5" />
        <ellipse cx="40" cy="6.1" rx="1.5" ry="0.4" fill={B} />
        <circle cx="41" cy="5.7" r="0.4" fill="#fff" />
        <ellipse cx="49" cy="6" rx="2.8" ry="0.9" fill="#fff" stroke={S} strokeWidth="0.5" />
        <ellipse cx="49" cy="6.1" rx="1.5" ry="0.4" fill={B} />
        <circle cx="50" cy="5.7" r="0.4" fill="#fff" />
        {/* 咧嘴 + 牙 */}
        <rect x="39" y="12" width="16" height="6" rx="1.2" fill="#fff" stroke={S} strokeWidth="0.7" />
        <line x1="43" y1="12" x2="43" y2="18" stroke={S} strokeWidth="0.35" opacity="0.4" />
        <line x1="47" y1="12" x2="47" y2="18" stroke={S} strokeWidth="0.35" opacity="0.4" />
        <line x1="51" y1="12" x2="51" y2="18" stroke={S} strokeWidth="0.35" opacity="0.4" />
        <line x1="39" y1="15" x2="55" y2="15" stroke={S} strokeWidth="0.4" opacity="0.3" />
      </svg>
    </div>
  );
}

/* ============================================================
 * 迷你主人 + 抄网（靠近中心位置）
 * ============================================================ */
function MiniOwner({ x, swingNet, netOnDog }: { x: number; swingNet?: boolean; netOnDog?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 22,
        left: `calc(50% + ${x}px)`,
        transform: "translateX(-50%)",
        zIndex: 4,
      }}
    >
      <svg width="62" height="54" viewBox="0 0 62 54" fill="none">
        {/* 抄网杆 */}
        <line
          x1="18" y1="10" x2="6" y2="28" stroke={S} strokeWidth="1.6" strokeLinecap="round"
          style={{
            transformOrigin: "18px 10px",
            transform: swingNet ? "rotate(70deg)" : "rotate(12deg)",
            transition: "transform 0.3s ease-in",
          }}
        />
        {/* 网圈 */}
        <g
          style={{
            transformOrigin: "6px 28px",
            transform: netOnDog ? "translate(-22px, 14px)" : swingNet ? "translate(-6px, 4px)" : "translate(0,0) scale(0.3)",
            opacity: swingNet ? 1 : 0.3,
            transition: "all 0.3s ease-in",
          }}
        >
          <ellipse cx="0" cy="4" rx="16" ry="10" fill="none" stroke={S} strokeWidth="1.6" transform="rotate(-20)" />
          <path d="M-6,4 C-12,14 -8,26 2,28 C12,30 18,22 12,14" fill="none" stroke={S} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
          <line x1="-8" y1="14" x2="12" y2="2" stroke={S} strokeWidth="0.3" opacity="0.3" />
          <line x1="-10" y1="10" x2="8" y2="0" stroke={S} strokeWidth="0.3" opacity="0.3" />
        </g>

        {/* 腿 */}
        <line x1="24" y1="38" x2="22" y2="52" stroke={S} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="30" y1="38" x2="34" y2="52" stroke={S} strokeWidth="1.6" strokeLinecap="round" />
        {/* 躯干 */}
        <polygon points="24,10 34,10 32,38 26,38" fill={F} stroke={S} strokeWidth="1" />
        <circle cx="26" cy="16" r="0.8" fill={S} />
        <circle cx="26" cy="20" r="0.8" fill={S} />
        <circle cx="26" cy="24" r="0.8" fill={S} />
        {/* 右臂（握杆） */}
        <line x1="32" y1="14" x2="18" y2="10" stroke={S} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="18" cy="10" r="1.6" fill={F} stroke={S} strokeWidth="0.6" />
        {/* 左臂 */}
        <line x1="26" y1="16" x2="16" y2="28" stroke={S} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="16" cy="28" r="1.6" fill={F} stroke={S} strokeWidth="0.6" />
        {/* 头 */}
        <circle cx="28" cy="6" r="7" fill={F} stroke={S} strokeWidth="1" />
        {/* 头发 */}
        <path d="M22,2 L20,-4 L24,-5 L28,0 L32,-5 L36,-4 L34,2" fill={F} stroke={S} strokeWidth="1" strokeLinejoin="round" />
        {/* 眼镜 */}
        <circle cx="25" cy="6" r="3.5" fill="none" stroke={S} strokeWidth="0.8" />
        <circle cx="32" cy="6" r="3.5" fill="none" stroke={S} strokeWidth="0.8" />
        <line x1="28.5" y1="6" x2="28.5" y2="6" stroke={S} strokeWidth="0.8" />
        <circle cx="25" cy="6" r="0.8" fill={S} />
        <circle cx="32" cy="6" r="0.8" fill={S} />
        {/* 喊叫嘴 */}
        <ellipse cx="28" cy="13" rx="2.5" ry="1.8" fill={S} />
      </svg>
    </div>
  );
}

/* ============================================================
 * 主组件 —— 追到页面中间才被抓到
 * ============================================================ */
type Phase = "idle" | "runIn" | "chase" | "swing" | "caught" | "gotcha";

export default function FooterTheater() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [dogX, setDogX] = useState(-200);
  const [ownerX, setOwnerX] = useState(200);
  const [triggered, setTriggered] = useState(false);
  const [localCount, setLocalCount] = useState(0);
  const localCountRef = useRef(0);
  const animRef = useRef(false);

  /* 监听跨组件计数变化 */
  useEffect(() => {
    const n = readCount();
    setLocalCount(n);
    localCountRef.current = n;
    const onCountChange = () => {
      const v = readCount();
      setLocalCount(v);
      localCountRef.current = v;
    };
    window.addEventListener("dog-count-changed", onCountChange);
    return () => window.removeEventListener("dog-count-changed", onCountChange);
  }, []);

  const runPlay = useCallback(() => {
    if (animRef.current) return;
    animRef.current = true;

    /* 1. 狗从左边跑向中间 */
    setPhase("runIn");
    setDogX(-30);

    /* 2. 主人从右边追向中间 + 狗跑到中间偏左 */
    setTimeout(() => {
      setPhase("chase");
      setOwnerX(30);
      setDogX(-15);
    }, 500);

    /* 3. 在中间相遇，挥网 */
    setTimeout(() => {
      setPhase("swing");
      setDogX(-8);
      setOwnerX(15);
    }, 1000);

    /* 4. 网盖住狗 */
    setTimeout(() => {
      setPhase("caught");
    }, 1400);

    /* 5. GOTCHA! */
    setTimeout(() => {
      setPhase("gotcha");
    }, 2000);
  }, []);

  const reset = useCallback(() => {
    animRef.current = false;
    setPhase("idle");
    setDogX(-200);
    setOwnerX(200);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (triggered || animRef.current) return;
      const scrollBottom = window.innerHeight + window.scrollY;
      const docBottom = document.documentElement.scrollHeight;
      if (docBottom - scrollBottom < 160 && localCountRef.current >= 4) {
        setTriggered(true);
        runPlay();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [triggered, runPlay]);

  const showChars = phase !== "idle" || triggered;

  return (
    <div
      className="footer-animation-stage relative w-full overflow-hidden"
      style={{ height: 160 }}
    >
      {/* 地面线 */}
      <div className="absolute bottom-[38px] inset-x-0 h-px bg-zinc-200 dark:bg-zinc-800" />

      {/* 中间捕捞区标记（虚线） */}
      {(phase === "runIn" || phase === "chase") && (
        <div
          className="absolute bottom-[38px] left-1/2 -translate-x-1/2"
          style={{
            width: 80,
            height: 80,
            border: "1px dashed rgba(0,0,0,0.06)",
            borderRadius: "50%",
            animation: "ft-zone-pulse 1s ease-in-out infinite",
          }}
        />
      )}

      {/* 角色 */}
      <div style={{ opacity: showChars ? 1 : 0, transition: "opacity 0.5s" }}>
        <MiniDog x={dogX} caught={phase === "caught"} />
        <MiniOwner x={ownerX} swingNet={phase === "swing" || phase === "caught"} netOnDog={phase === "caught"} />
      </div>

      {/* GOTCHA! 在中间弹出 */}
      {phase === "gotcha" && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ animation: "gotcha-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
        >
          <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-sm font-black tracking-[0.12em] px-6 py-2 rounded-lg shadow-lg whitespace-nowrap">
            GOTCHA!
          </div>
        </div>
      )}

      {/* 提示 */}
      {!triggered && (
        <div className="flex items-center justify-center h-full">
          <span className="text-[11px] font-mono text-zinc-300 dark:text-zinc-600 tracking-wider">
            {localCount < 4
              ? `已捕获 ${localCount}/4 · 再抓 ${4 - localCount} 只即可解锁页脚剧场`
              : "已满足解锁条件 · 继续向下滚动"}
          </span>
        </div>
      )}

      {/* 重播 */}
      {triggered && phase === "gotcha" && (
        <button
          onClick={() => { setTriggered(false); reset(); }}
          className="absolute bottom-2 right-3 text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-mono transition-colors"
        >
          [ 再看一次 ]
        </button>
      )}

      <style>{`
        @keyframes ft-sprint-a {
          0%, 100% { transform: rotate(-25deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes ft-sprint-b {
          0%, 100% { transform: rotate(20deg); }
          50% { transform: rotate(-25deg); }
        }
        @keyframes ft-tail {
          0% { transform: rotate(-15deg); }
          100% { transform: rotate(18deg); }
        }
        @keyframes gotcha-pop {
          0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes ft-zone-pulse {
          0%, 100% { opacity: 0.25; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.55; transform: translateX(-50%) scale(1.15); }
        }
      `}</style>
    </div>
  );
}
