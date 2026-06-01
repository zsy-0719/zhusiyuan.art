"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
 * 共享计数 + 跨组件事件同步
 * ============================================================ */
function readCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(sessionStorage.getItem("dog-catch-count") || "0", 10);
}
function writeCount(n: number) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("dog-catch-count", String(n));
    setTimeout(() => window.dispatchEvent(new Event("dog-count-changed")), 0);
  }
}

const S = "#1a1a1a";
const F = "#fafaf6";
const B = "#111";

/* ============================================================
 * CuteDog — 可爱滑稽版基础狗
 * ============================================================ */
function CuteDog() {
  return (
    <g>
      <line x1="18" y1="48" x2="12" y2="62" stroke={S} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="18" cy="48" r="2.5" fill={F} stroke={S} strokeWidth="0.9" />
      <line x1="26" y1="48" x2="22" y2="62" stroke={S} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="26" cy="48" r="2.5" fill={F} stroke={S} strokeWidth="0.9" />
      <rect x="10" y="34" width="36" height="16" rx="8" fill={F} stroke={S} strokeWidth="1.3" />
      <path d="M16,38 Q28,44 40,38" fill="none" stroke={S} strokeWidth="0.4" opacity="0.2" />
      <path d="M10,40 Q2,32 6,24" fill="none" stroke={S} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="6" cy="24" r="2.5" fill={F} stroke={S} strokeWidth="0.8" />
      <line x1="36" y1="48" x2="40" y2="62" stroke={S} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="36" cy="48" r="2.5" fill={F} stroke={S} strokeWidth="0.9" />
      <line x1="42" y1="48" x2="47" y2="62" stroke={S} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="42" cy="48" r="2.5" fill={F} stroke={S} strokeWidth="0.9" />
      <rect x="38" y="30" width="10" height="6" rx="2" fill={F} stroke={S} strokeWidth="1.1" />
      <circle cx="43" cy="33" r="2.2" fill={F} stroke={S} strokeWidth="0.9" />
      <circle cx="41" cy="31.5" r="0.7" fill={S} />
      <circle cx="41" cy="35.5" r="0.7" fill={S} />
      <polygon points="42,32 44,22 54,18 56,24" fill={F} stroke={S} strokeWidth="0.8" />
      <ellipse cx="54" cy="18" rx="18" ry="14" fill={F} stroke={S} strokeWidth="1.3" />
      <ellipse cx="44" cy="6" rx="5" ry="9" fill={F} stroke={S} strokeWidth="0.9" transform="rotate(-15,44,6)" />
      <ellipse cx="62" cy="4" rx="5" ry="9" fill={F} stroke={S} strokeWidth="0.9" transform="rotate(10,62,4)" />
      <ellipse cx="48" cy="14" rx="6" ry="6.5" fill="#fff" stroke={S} strokeWidth="0.9" />
      <ellipse cx="49" cy="13" rx="3.2" ry="3.5" fill={B} />
      <circle cx="50.5" cy="11.5" r="1.5" fill="#fff" />
      <circle cx="47" cy="15.5" r="0.7" fill="#fff" />
      <ellipse cx="62" cy="14" rx="6" ry="6.5" fill="#fff" stroke={S} strokeWidth="0.9" />
      <ellipse cx="63" cy="13" rx="3.2" ry="3.5" fill={B} />
      <circle cx="64.5" cy="11.5" r="1.5" fill="#fff" />
      <circle cx="61" cy="15.5" r="0.7" fill="#fff" />
      <ellipse cx="68" cy="20" rx="5" ry="4" fill={B} />
      <ellipse cx="66.5" cy="18.5" rx="2.5" ry="1.3" fill="rgba(255,255,255,0.3)" />
      <path d="M48,28 Q56,36 64,28" fill={B} stroke={S} strokeWidth="0.8" strokeLinecap="round" />
      <ellipse cx="56" cy="31" rx="4" ry="3" fill="#ff6b6b" stroke={S} strokeWidth="0.5" />
      <line x1="56" y1="28" x2="56" y2="34" stroke={S} strokeWidth="0.35" opacity="0.5" />
      <path d="M46,26 Q44,24 48,25" fill="none" stroke={S} strokeWidth="0.6" strokeLinecap="round" />
      <path d="M66,26 Q68,24 64,25" fill="none" stroke={S} strokeWidth="0.6" strokeLinecap="round" />
    </g>
  );
}

/* ============================================================
 * Pose 1：倒挂 + 墨镜
 * ============================================================ */
function PoseHang() {
  return (
    <div className="relative" style={{ width: 110, height: 90 }}>
      <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
        <g transform="translate(55, 45) rotate(180) translate(-50, -38)">
          <circle cx="16" cy="56" r="4.5" fill={F} stroke={S} strokeWidth="1.2" />
          <circle cx="82" cy="56" r="4.5" fill={F} stroke={S} strokeWidth="1.2" />
          <g transform="translate(8, 8)"><CuteDog /></g>
          <rect x="38" y="20" width="20" height="10" rx="3" fill="#111" />
          <rect x="60" y="20" width="20" height="10" rx="3" fill="#111" />
          <line x1="58" y1="25" x2="60" y2="25" stroke="#111" strokeWidth="2" />
          <rect x="41" y="20" width="13" height="10" rx="2" fill="rgba(255,255,255,0.12)" />
          <rect x="63" y="20" width="13" height="10" rx="2" fill="rgba(255,255,255,0.12)" />
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
 * Pose 2：头卡缝里，屁股 + 腿乱蹬
 * ============================================================ */
function PoseStuck() {
  return (
    <div className="relative" style={{ width: 90, height: 96 }}>
      <svg width="90" height="96" viewBox="0 0 90 96" fill="none">
        <line x1="6" y1="28" x2="14" y2="22" stroke={S} strokeWidth="0.6" opacity="0.3" />
        <line x1="74" y1="30" x2="84" y2="26" stroke={S} strokeWidth="0.6" opacity="0.3" />
        <rect x="16" y="24" width="56" height="22" rx="10" fill={F} stroke={S} strokeWidth="1.3" />
        <line x1="44" y1="26" x2="44" y2="44" stroke={S} strokeWidth="0.5" opacity="0.25" />
        <line x1="20" y1="32" x2="4" y2="16" stroke={S} strokeWidth="2" strokeLinecap="round"
          style={{ transformOrigin: "20px 32px", animation: "leg-kick 0.18s infinite alternate" }} />
        <circle cx="4" cy="16" r="2.8" fill={F} stroke={S} strokeWidth="0.9" />
        <g style={{ transformOrigin: "26px 46px", animation: "leg-kick 0.13s infinite alternate" }}>
          <line x1="26" y1="46" x2="14" y2="88" stroke={S} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="26" cy="46" r="3" fill={F} stroke={S} strokeWidth="1" />
          <circle cx="20" cy="66" r="2" fill={F} stroke={S} strokeWidth="0.7" />
        </g>
        <g style={{ transformOrigin: "60px 46px", animation: "leg-kick 0.13s 0.06s infinite alternate" }}>
          <line x1="60" y1="46" x2="72" y2="88" stroke={S} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="60" cy="46" r="3" fill={F} stroke={S} strokeWidth="1" />
          <circle cx="66" cy="66" r="2" fill={F} stroke={S} strokeWidth="0.7" />
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
 * Pose 3：趴着露大牙
 * ============================================================ */
function PoseText() {
  return (
    <div className="relative" style={{ width: 100, height: 68 }}>
      <svg width="100" height="68" viewBox="0 0 100 68" fill="none">
        <g transform="translate(6, 16) scale(1.1)">
          <rect x="10" y="36" width="36" height="12" rx="6" fill={F} stroke={S} strokeWidth="1.1" />
          <path d="M10,44 Q2,34 4,28" fill="none" stroke={S} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="4" cy="28" r="2.2" fill={F} stroke={S} strokeWidth="0.7" />
          <ellipse cx="50" cy="24" rx="18" ry="14" fill={F} stroke={S} strokeWidth="1.2" />
          <ellipse cx="40" cy="12" rx="5" ry="8" fill={F} stroke={S} strokeWidth="0.8" transform="rotate(-20,40,12)" />
          <ellipse cx="58" cy="10" rx="5" ry="8" fill={F} stroke={S} strokeWidth="0.8" transform="rotate(5,58,10)" />
          <path d="M42,18 Q46,20 50,18" fill="none" stroke={S} strokeWidth="1" strokeLinecap="round" />
          <path d="M56,18 Q60,20 64,18" fill="none" stroke={S} strokeWidth="1" strokeLinecap="round" />
          <ellipse cx="64" cy="24" rx="4.5" ry="3.5" fill={B} />
          <ellipse cx="63" cy="23" rx="2" ry="1" fill="rgba(255,255,255,0.3)" />
          <rect x="48" y="32" width="5" height="8" rx="1.2" fill="#fff" stroke={S} strokeWidth="0.5" />
          <rect x="54" y="32" width="5" height="8" rx="1.2" fill="#fff" stroke={S} strokeWidth="0.5" />
          <line x1="48" y1="30" x2="59" y2="30" stroke={S} strokeWidth="0.6" />
          <rect x="36" y="22" width="9" height="5" rx="1.5" fill={F} stroke={S} strokeWidth="0.9" />
          <circle cx="40.5" cy="24.5" r="1.8" fill={F} stroke={S} strokeWidth="0.7" />
          <circle cx="20" cy="48" r="3.5" fill={F} stroke={S} strokeWidth="0.9" />
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
 * Pose 4：举牌 "NOT A DOG" + 坏笑
 * ============================================================ */
function PoseSign() {
  return (
    <div className="relative flex flex-col items-center" style={{ width: 120, height: 130 }}>
      <div className="bg-yellow-300 border-2 border-[#1a1a1a] rounded-lg px-3.5 py-1.5 mb-1.5 shadow-md" style={{ transform: "rotate(-3deg)" }}>
        <span className="text-[12px] font-black text-[#1a1a1a] tracking-tight font-mono whitespace-nowrap">NOT A DOG</span>
      </div>
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
        <g transform="translate(4, 4) scale(1.05)"><CuteDog /></g>
        <line x1="56" y1="24" x2="36" y2="6" stroke={S} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="36" cy="6" r="3.5" fill={F} stroke={S} strokeWidth="1.1" />
        <line x1="68" y1="22" x2="54" y2="8" stroke={S} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="54" cy="8" r="3.5" fill={F} stroke={S} strokeWidth="1.1" />
      </svg>
    </div>
  );
}

/* ============================================================
 * 逃跑冲刺狗 —— 四肢狂奔 + 残影线 + 汗水
 * ============================================================ */
function SprintingDog() {
  return (
    <div style={{ animation: "sprint-gait 0.06s linear infinite", width: 100, height: 70 }}>
      <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
        {/* 速度线 */}
        <line x1="0" y1="22" x2="14" y2="22" stroke={S} strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
        <line x1="2" y1="30" x2="12" y2="30" stroke={S} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
        <line x1="4" y1="38" x2="16" y2="38" stroke={S} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
        <line x1="1" y1="46" x2="10" y2="46" stroke={S} strokeWidth="0.6" opacity="0.2" strokeLinecap="round" />

        {/* 身体前倾 */}
        <rect x="22" y="26" width="38" height="15" rx="5" fill={F} stroke={S} strokeWidth="1.1" transform="rotate(-8, 41, 33)" />

        {/* 前腿组 —— 交替摆动 */}
        <g style={{ transformOrigin: "48px 41px", animation: "sprint-leg-a 0.07s steps(2) infinite" }}>
          <line x1="48" y1="41" x2="56" y2="58" stroke={S} strokeWidth="2" strokeLinecap="round" />
          <circle cx="48" cy="41" r="2" fill={F} stroke={S} strokeWidth="0.7" />
        </g>
        <g style={{ transformOrigin: "54px 41px", animation: "sprint-leg-b 0.07s steps(2) infinite" }}>
          <line x1="54" y1="41" x2="62" y2="58" stroke={S} strokeWidth="2" strokeLinecap="round" />
          <circle cx="54" cy="41" r="2" fill={F} stroke={S} strokeWidth="0.7" />
        </g>

        {/* 后腿组 —— 反相 */}
        <g style={{ transformOrigin: "32px 41px", animation: "sprint-leg-b 0.07s steps(2) infinite" }}>
          <line x1="32" y1="41" x2="26" y2="58" stroke={S} strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="41" r="2" fill={F} stroke={S} strokeWidth="0.7" />
        </g>
        <g style={{ transformOrigin: "38px 41px", animation: "sprint-leg-a 0.07s steps(2) infinite" }}>
          <line x1="38" y1="41" x2="32" y2="58" stroke={S} strokeWidth="2" strokeLinecap="round" />
          <circle cx="38" cy="41" r="2" fill={F} stroke={S} strokeWidth="0.7" />
        </g>

        {/* 尾巴翘起 */}
        <line x1="22" y1="28" x2="8" y2="14" stroke={S} strokeWidth="1.5" strokeLinecap="round"
          style={{ transformOrigin: "22px 28px", animation: "sprint-tail 0.1s linear infinite alternate" }} />
        <circle cx="8" cy="14" r="2" fill={F} stroke={S} strokeWidth="0.7" />

        {/* 项圈 */}
        <rect x="54" y="18" width="9" height="6" rx="1.5" fill={F} stroke={S} strokeWidth="0.9" transform="rotate(-8, 58, 21)" />

        {/* 脖子 */}
        <polygon points="56,22 60,12 68,10 66,18" fill={F} stroke={S} strokeWidth="0.7" />

        {/* 头 */}
        <ellipse cx="70" cy="8" rx="14" ry="11" fill={F} stroke={S} strokeWidth="1.1" />

        {/* 耳朵后压 */}
        <polygon points="62,1 58,-6 66,0" fill={F} stroke={S} strokeWidth="0.6" />
        <polygon points="74,-1 78,-7 76,2" fill={F} stroke={S} strokeWidth="0.6" />

        {/* 惊慌大眼 */}
        <ellipse cx="64" cy="6" rx="4.5" ry="5" fill="#fff" stroke={S} strokeWidth="0.8" />
        <ellipse cx="65" cy="5.5" rx="2.5" ry="3" fill={B} />
        <circle cx="66" cy="4" r="1.2" fill="#fff" />
        <ellipse cx="78" cy="6" rx="4.5" ry="5" fill="#fff" stroke={S} strokeWidth="0.8" />
        <ellipse cx="79" cy="5.5" rx="2.5" ry="3" fill={B} />
        <circle cx="80" cy="4" r="1.2" fill="#fff" />

        {/* 大黑鼻 */}
        <ellipse cx="84" cy="11" rx="4.5" ry="3.5" fill={B} />
        <ellipse cx="83" cy="10" rx="2" ry="1" fill="rgba(255,255,255,0.3)" />

        {/* 慌张张嘴 */}
        <ellipse cx="70" cy="18" rx="6" ry="4" fill={B} />

        {/* 汗滴 */}
        <path d="M60,-2 Q62,-6 64,-2" fill="none" stroke={S} strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
        <path d="M80,-4 Q82,-9 84,-4" fill="none" stroke={S} strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
      </svg>
    </div>
  );
}
const CARD_SELECTORS = [
  "#about",
  "#projects",
  "#workflow",
  "#future-vision",
  "#vibecoding",
  "#gallery",
  "#project-modal",
];

function pickRandomTarget() {
  const valid: HTMLElement[] = [];
  for (const sel of CARD_SELECTORS) {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (el) valid.push(el);
  }
  return valid[Math.floor(Math.random() * valid.length)] || null;
}

const POSES = [PoseHang, PoseStuck, PoseText, PoseSign];

/* ============================================================
 * 单只狗的数据
 * ============================================================ */
interface DogState {
  id: number;
  poseIdx: number;
  position: { top: number; left: number };
  zIndex: number;
  nervous: boolean;
  fleeing: boolean;
  surprised: boolean;
  caught: boolean;
  fleeAngle: number;        // 逃跑方向角 (rad)
  placement: {
    selector: string;
    side: 0 | 1 | 2;
    offsetFrac: number;
    heightFrac: number;
  };
  escapesNeeded: number;
  escapeCount: number;
}

let nextId = 0;

const NAV_BAR_BOTTOM = 90; // 导航栏 fixed top-3 + h-16 ≈ 76px，留余量到 90

function clampTop(t: number) {
  return Math.max(t, NAV_BAR_BOTTOM);
}

function calcPosition(el: HTMLElement, side: 0 | 1 | 2, ofs: number, hf: number) {
  const rect = el.getBoundingClientRect();
  if (el.id === "project-modal") {
    if (side === 0) return { top: clampTop(rect.top + 10), left: rect.right - 70 - ofs * 40 };
    return { top: clampTop(rect.top + 60 + hf * Math.max(rect.height - 160, 40)), left: rect.right - 50 };
  }
  if (side === 0) return { top: clampTop(rect.top - 55), left: rect.left + 50 + ofs * Math.max(rect.width - 180, 60) };
  if (side === 1) return { top: clampTop(rect.bottom - 75), left: rect.left + 50 + ofs * Math.max(rect.width - 180, 60) };
  return { top: clampTop(rect.top + 50 + hf * Math.max(rect.height - 140, 40)), left: rect.right - 55 };
}

function randomPlacement(el: HTMLElement) {
  const sideRoll = Math.random();
  const offsetFrac = Math.random();
  const heightFrac = Math.random();
  let side: 0 | 1 | 2;
  if (el.id === "project-modal") {
    side = sideRoll < 0.5 ? 0 : 2;
  } else if (sideRoll < 0.33) {
    side = 0;
  } else if (sideRoll < 0.66) {
    side = 1;
  } else {
    side = 2;
  }
  return {
    selector: `#${el.id}`,
    side,
    offsetFrac,
    heightFrac,
    position: calcPosition(el, side, offsetFrac, heightFrac),
  };
}

/* 第一只狗：在 "高频迭代，深度思考" 那行文字正下方，绝对不在首屏/导航栏 */
function centerPlacement(): { top: number; left: number } {
  const line = document.querySelector("#about-last-line") as HTMLElement | null;
  if (line) {
    const rect = line.getBoundingClientRect();
    return {
      top: clampTop(Math.round(rect.bottom + 32)),
      left: Math.round(rect.left + rect.width * 0.55),
    };
  }
  // 兜底：about 区域中段
  const about = document.querySelector("#about") as HTMLElement | null;
  if (about) {
    const r = about.getBoundingClientRect();
    return { top: clampTop(Math.round(r.top + r.height * 0.55)), left: Math.round(r.left + r.width * 0.5 - 55) };
  }
  return { top: clampTop(Math.round(window.innerHeight * 1.2)), left: Math.round(window.innerWidth * 0.5 - 55) };
}

function createDog(existing?: DogState, isFirst = false): DogState {
  const id = existing ? existing.id : nextId++;

  // 第一只狗 —— 画面中央显眼位置
  if (isFirst && !existing) {
    const pos = centerPlacement();
    return {
      id,
      poseIdx: Math.floor(Math.random() * POSES.length),
      position: pos,
      zIndex: 100,
      nervous: false, fleeing: false, surprised: false, caught: false,
      fleeAngle: 0,
      placement: { selector: "#about", side: 1, offsetFrac: 0.5, heightFrac: 0.5 },
      escapesNeeded: Math.floor(Math.random() * 3) + 1,
      escapeCount: 0,
    };
  }

  const el = pickRandomTarget();
  if (!el) {
    const fallback = document.querySelector("#about") as HTMLElement;
    const rect = fallback?.getBoundingClientRect();
    return {
      id,
      poseIdx: Math.floor(Math.random() * POSES.length),
      position: rect ? { top: clampTop(rect.top + rect.height * 0.5), left: rect.left + rect.width * 0.5 - 55 } : { top: 200, left: 100 },
      zIndex: 100,
      nervous: false, fleeing: false, surprised: false, caught: false,
      fleeAngle: 0,
      placement: { selector: "#about", side: 1, offsetFrac: 0.5, heightFrac: 0.5 },
      escapesNeeded: existing ? existing.escapesNeeded : Math.floor(Math.random() * 3) + 1,
      escapeCount: existing ? existing.escapeCount : 0,
    };
  }

  const pl = randomPlacement(el);
  return {
    id,
    poseIdx: Math.floor(Math.random() * POSES.length),
    position: pl.position,
    zIndex: el.id === "project-modal" ? 110 : 100,
    nervous: false, fleeing: false, surprised: false, caught: false,
    fleeAngle: 0,
    placement: { selector: pl.selector, side: pl.side, offsetFrac: pl.offsetFrac, heightFrac: pl.heightFrac },
    escapesNeeded: existing ? existing.escapesNeeded : Math.floor(Math.random() * 3) + 1,
    escapeCount: existing ? existing.escapeCount : 0,
  };
}

function recalcDog(dog: DogState): DogState {
  const el = document.querySelector(dog.placement.selector) as HTMLElement | null;
  if (!el) return dog;
  return { ...dog, position: calcPosition(el, dog.placement.side, dog.placement.offsetFrac, dog.placement.heightFrac) };
}

/* ============================================================
 * 主组件
 * ============================================================ */
const UNLOCK_COUNT = 4;

export default function EasterEggDog() {
  const [dogs, setDogs] = useState<DogState[]>([]);
  const initialRef = useRef(false);
  /* 第一只狗标记 */
  const isFirstDog = useRef(true);

  /* 页面加载：如果还没解锁，放第一只狗在画面中间 */
  useEffect(() => {
    if (initialRef.current) return;
    initialRef.current = true;

    const t = setTimeout(() => {
      if (readCount() >= UNLOCK_COUNT) return;
      setDogs([createDog(undefined, true)]);
      isFirstDog.current = false;
    }, 800);

    return () => clearTimeout(t);
  }, []);

  /* 狗被抓走后补充 */
  useEffect(() => {
    if (dogs.length > 0) return;
    if (readCount() >= UNLOCK_COUNT) return;

    const t = setTimeout(() => {
      setDogs((prev) => {
        if (prev.length > 0) return prev;
        if (readCount() >= UNLOCK_COUNT) return prev;
        return [createDog()];
      });
    }, 1500);

    return () => clearTimeout(t);
  }, [dogs.length]);

  /* scroll 时重新计算位置 */
  useEffect(() => {
    if (dogs.length === 0) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setDogs((prev) => prev.map(recalcDog));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dogs.length]);

  /* 弹窗检测 */
  useEffect(() => {
    let lastModal = false;
    const check = () => {
      const hasModal = !!document.querySelector("#project-modal");
      if (hasModal && !lastModal) {
        if (readCount() >= UNLOCK_COUNT) { lastModal = true; return; }
        setDogs((prev) => {
          if (prev.length > 0) return prev;
          if (readCount() >= UNLOCK_COUNT) return prev;
          return [createDog()];
        });
      }
      lastModal = hasModal;
    };
    const mo = new MutationObserver(check);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    check();
    return () => mo.disconnect();
  }, []);

  /* 点击抓捕 */
  const handleCatch = useCallback((dogId: number) => {
    setDogs((prev) => {
      const dog = prev.find((d) => d.id === dogId);
      if (!dog || dog.surprised || dog.fleeing) return prev;

      if (dog.escapeCount < dog.escapesNeeded) {
        // 逃跑 —— 随机方向角
        const angle = Math.random() * Math.PI * 2;
        return prev.map((d) =>
          d.id === dogId ? { ...d, fleeing: true, fleeAngle: angle, escapeCount: d.escapeCount + 1 } : d,
        );
      }

      // 抓住！
      const next = readCount() + 1;
      writeCount(next);
      return prev.map((d) =>
        d.id === dogId ? { ...d, surprised: true, caught: true } : d,
      );
    });

    /* 逃跑结束 → 重新定位，保留 escape 计数 */
    setTimeout(() => {
      setDogs((prev) => {
        const dog = prev.find((d) => d.id === dogId);
        if (!dog || !dog.fleeing) return prev;
        const repositioned = createDog(dog);
        return prev.map((d) =>
          d.id === dogId ? { ...repositioned, id: dog.id, fleeing: false } : d,
        );
      });
    }, 650);

    /* 被抓住后移除 */
    setTimeout(() => {
      setDogs((prev) => {
        const dog = prev.find((d) => d.id === dogId);
        if (dog?.caught) return prev.filter((d) => d.id !== dogId);
        return prev;
      });
    }, 1300);
  }, []);

  const handleMouseEnter = useCallback((dogId: number) => {
    setDogs((prev) => prev.map((d) => (d.id === dogId ? { ...d, nervous: true } : d)));
  }, []);

  const handleMouseLeave = useCallback((dogId: number) => {
    setDogs((prev) => prev.map((d) => (d.id === dogId ? { ...d, nervous: false } : d)));
  }, []);

  if (dogs.length === 0) return null;

  return (
    <>
      {dogs.map((dog) => {
        const PoseComponent = POSES[dog.poseIdx];
        const fleeDist = 180;
        const fleeX = Math.cos(dog.fleeAngle) * fleeDist;
        const fleeY = Math.sin(dog.fleeAngle) * fleeDist;

        return (
          <div
            key={dog.id}
            className="fixed pointer-events-auto"
            style={{
              top: dog.position.top,
              left: dog.position.left,
              zIndex: dog.zIndex,
              cursor: dog.caught || dog.fleeing ? "default" : "pointer",
              transition: dog.fleeing
                ? "opacity 0.5s ease-in, transform 0.4s cubic-bezier(0.4, 0, 1, 1)"
                : dog.caught
                  ? "opacity 0.3s"
                  : "opacity 0.25s, transform 0.15s ease",
              /* ======== 逃跑轨迹：沿随机方向飞走 + 旋转 + 缩小 ======== */
              transform: dog.fleeing
                ? `translate(${fleeX}px, ${fleeY}px) rotate(${dog.fleeAngle * 40}deg) scale(0.15)`
                : dog.nervous && !dog.caught
                  ? "scale(1.05)"
                  : "scale(1)",
              opacity: dog.fleeing ? 0 : dog.caught ? 0 : 1,
              animation: dog.nervous && !dog.fleeing && !dog.caught
                ? "ee-shake 0.15s ease-in-out infinite"
                : dog.fleeing
                  ? "ee-dash 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                  : dog.caught
                    ? "ee-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
                    : "none",
            }}
            onClick={() => handleCatch(dog.id)}
            onMouseEnter={() => handleMouseEnter(dog.id)}
            onMouseLeave={() => handleMouseLeave(dog.id)}
          >
            {/* 逃跑时显示冲刺的狗，正常时显示随机 pose */}
            {dog.fleeing ? <SprintingDog /> : <PoseComponent />}

            {/* ======== 逃跑烟尘（原位置） ======== */}
            {dog.fleeing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-zinc-300/60"
                    style={{
                      width: 8 + i * 5,
                      height: 8 + i * 5,
                      animation: `dust-puff 0.4s ${i * 0.06}s ease-out forwards`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* ======== 抓住成功特效：金色星爆 + 计数浮现 ======== */}
            {dog.caught && (
              <div className="absolute left-1/2 top-1/2 pointer-events-none" style={{ width: 0, height: 0 }}>
                {(() => {
                  const stars = [];
                  for (let i = 0; i < 6; i++) {
                    const a = (i / 6) * Math.PI * 2 + Math.random() * 0.3;
                    const dist = 25 + Math.random() * 40;
                    const sx = Math.cos(a) * dist;
                    const sy = Math.sin(a) * dist;
                    stars.push(
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          left: sx,
                          top: sy,
                          width: 6,
                          height: 6,
                          background: i % 2 === 0 ? "#fbbf24" : "#f59e0b",
                          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                          animation: `star-burst 0.7s ${i * 0.06}s ease-out forwards`,
                        }}
                      />
                    );
                  }
                  return stars;
                })()}
                <div
                  className="absolute font-mono text-sm font-black text-amber-500 whitespace-nowrap"
                  style={{ left: -12, top: -8, animation: "count-float 0.8s ease-out forwards" }}
                >
                  +1
                </div>
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes leg-kick {
          0%   { transform: rotate(-20deg); }
          100% { transform: rotate(25deg); }
        }
        @keyframes ee-shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25%       { transform: translateX(-3px) rotate(-3deg); }
          75%       { transform: translateX(3px) rotate(3deg); }
        }
        /* 逃跑：沿轨迹冲刺 + 残影模糊 */
        @keyframes ee-dash {
          0%   { filter: blur(0); }
          20%  { filter: blur(0.5px); }
          70%  { filter: blur(1.5px); }
          100% { filter: blur(3px); }
        }
        /* 抓住：弹跳 → 消失 */
        @keyframes ee-pop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.35); }
          60%  { transform: scale(0.6); }
          100% { transform: scale(0); }
        }
        /* 逃跑烟尘 */
        @keyframes dust-puff {
          0%   { transform: scale(0.5); opacity: 0.7; }
          100% { transform: scale(2.5) translateY(-15px); opacity: 0; }
        }
        /* 金色星爆 —— 方向由 left/top 控制，此处只管缩放 + 透明度 */
        @keyframes star-burst {
          0%   { transform: scale(0); opacity: 0; }
          30%  { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(0.2); opacity: 0; }
        }
        /* 计数浮现 */
        @keyframes count-float {
          0%   { transform: translateY(0) scale(0.5); opacity: 1; }
          100% { transform: translateY(-40px) scale(1.3); opacity: 0; }
        }
        /* ---- 冲刺四肢 ---- */
        @keyframes sprint-leg-a {
          0%   { transform: rotate(-30deg); }
          100% { transform: rotate(25deg); }
        }
        @keyframes sprint-leg-b {
          0%   { transform: rotate(25deg); }
          100% { transform: rotate(-30deg); }
        }
        @keyframes sprint-tail {
          0%   { transform: rotate(-10deg); }
          100% { transform: rotate(15deg); }
        }
        /* 奔跑上下颠簸 */
        @keyframes sprint-gait {
          0%, 100% { transform: translateY(0); }
          30%  { transform: translateY(-3px); }
          70%  { transform: translateY(2px); }
        }
      `}</style>
    </>
  );
}

export { readCount, writeCount };
