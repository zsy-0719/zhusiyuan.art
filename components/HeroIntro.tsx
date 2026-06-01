"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
 * CSS Keyframes —— 物理引擎 + 上下大开幕
 * ============================================================ */
const STYLES = `
/* ---- 狗腿 ---- */
@keyframes leg-sprint-a {
  0%, 100% { transform: rotate(-30deg); }
  50% { transform: rotate(25deg); }
}
@keyframes leg-sprint-b {
  0%, 100% { transform: rotate(25deg); }
  50% { transform: rotate(-30deg); }
}
@keyframes tail-flick {
  0%, 100% { transform: rotate(-15deg); }
  40% { transform: rotate(18deg); }
  70% { transform: rotate(-4deg); }
}
@keyframes body-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1.5px); }
}
@keyframes ear-flop {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-8deg); }
}

/* ---- 绳子抖动 ---- */
@keyframes rope-vibrate {
  0%, 100% { transform: translateY(0); }
  20% { transform: translateY(1.5px); }
  40% { transform: translateY(-1px); }
  60% { transform: translateY(1.2px); }
  80% { transform: translateY(-0.6px); }
}

/* ---- 人微颤 ---- */
@keyframes owner-tremble {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(0.5px, 0.3px); }
  50% { transform: translate(-0.3px, 0.7px); }
  75% { transform: translate(-0.6px, -0.2px); }
}
@keyframes hair-wild {
  0%, 100% { transform: translate(0, 0); }
  30% { transform: translate(0.3px, -0.5px); }
  60% { transform: translate(-0.2px, 0.3px); }
}

/* ---- 拉扯橡皮筋：人被狗反复猛拽 + 向后蹬地抵抗 ---- */
@keyframes tension-jerk {
  0%, 100% { transform: translateX(0); }
  18% { transform: translateX(10px); }
  40% { transform: translateX(-5px); }
  62% { transform: translateX(6px); }
  80% { transform: translateX(-3px); }
}

/* ---- 0.4s 斜线大回旋滑倒 —— Y轴坠落 + 360°旋转 ---- */
@keyframes inertia-slingshot {
  0%   { transform: translateY(0) rotate(-30deg); }
  25%  { transform: translateY(-6px) rotate(-80deg); }
  50%  { transform: translateY(30px) rotate(120deg); }
  75%  { transform: translateY(58px) rotate(230deg); }
  88%  { transform: translateY(74px) rotate(300deg); }
  100% { transform: translateY(80px) rotate(330deg); }
}

/* ---- 人从右侧(75%)滑行横移到正中央(50%) ---- */
@keyframes owner-slide-in {
  0%   { left: 75%; }
  100% { left: 50%; }
}

/* ---- 狗全速向右冲出屏幕 ---- */
@keyframes dog-dash-out {
  0%   { left: 90%; }
  100% { left: 115%; }
}

/* ---- 字幕爆开 ---- */
@keyframes text-thump {
  0%   { transform: scale(0.6); opacity: 0; }
  45%  { transform: scale(1.08); opacity: 1; }
  65%  { transform: scale(0.95); }
  100% { transform: scale(1); opacity: 1; }
}

/* ---- 发力拉扯大幕：极高频张力微颤 ---- */
@keyframes heavy-pull {
  0%, 100% { transform: translate(0, 0); }
  8%  { transform: translate(0.8px, -0.5px); }
  16% { transform: translate(-1px, 0.7px); }
  25% { transform: translate(0.6px, -1.1px); }
  33% { transform: translate(-0.8px, 0.6px); }
  41% { transform: translate(1.2px, -0.3px); }
  50% { transform: translate(-0.5px, 1px); }
  58% { transform: translate(0.9px, -0.7px); }
  66% { transform: translate(-1.2px, 0.4px); }
  75% { transform: translate(0.4px, -0.9px); }
  83% { transform: translate(-0.7px, 0.5px); }
  91% { transform: translate(1px, -0.6px); }
}

/* ---- 上半幕抓幕蓄力：向下微压 + 高频挤压微颤 ---- */
@keyframes top-curtain-grab {
  0%   { transform: translateY(0); }
  12%  { transform: translateY(3px); }
  22%  { transform: translateY(1.5px); }
  32%  { transform: translateY(6px); }
  42%  { transform: translateY(4px); }
  52%  { transform: translateY(8px); }
  62%  { transform: translateY(5.5px); }
  72%  { transform: translateY(9px); }
  82%  { transform: translateY(7px); }
  90%  { transform: translateY(10px); }
  100% { transform: translateY(8px); }
}

/* ---- 下半幕抓幕蓄力：向上微抬 + 高频挤压微颤 ---- */
@keyframes bottom-curtain-grab {
  0%   { transform: translateY(0); }
  12%  { transform: translateY(-3px); }
  22%  { transform: translateY(-1.5px); }
  32%  { transform: translateY(-6px); }
  42%  { transform: translateY(-4px); }
  52%  { transform: translateY(-8px); }
  62%  { transform: translateY(-5.5px); }
  72%  { transform: translateY(-9px); }
  82%  { transform: translateY(-7px); }
  90%  { transform: translateY(-10px); }
  100% { transform: translateY(-8px); }
}

/* ---- 上半幕撕裂爆开：蓄力挤压 → 摩擦临界(skewY) → 极速弹飞 ----
   cubic-bezier(0.86, 0, 0.07, 1) 超重载阻尼：前30%极慢撕裂，后70%瞬间爆开 */
@keyframes top-curtain-open {
  0%   { transform: translateY(8px); }
  20%  { transform: translateY(8px) skewY(1deg); }
  100% { transform: translateY(-100%); }
}

/* ---- 下半幕撕裂爆开：蓄力挤压 → 摩擦临界(skewY) → 极速弹飞 ---- */
@keyframes bottom-curtain-open {
  0%   { transform: translateY(-8px); }
  20%  { transform: translateY(-8px) skewY(-1deg); }
  100% { transform: translateY(100%); }
}

/* ---- 人被幕布撕裂带动的弹性形变（拉长→压扁→回弹） ---- */
@keyframes human-pull-stretch {
  0%   { transform: scaleY(1); }
  22%  { transform: scaleY(1.2); }
  48%  { transform: scaleY(0.82); }
  68%  { transform: scaleY(1.05); }
  84%  { transform: scaleY(0.95); }
  100% { transform: scaleY(1); }
}
`;

/* ============================================================
 * 疯狂机械狗
 * ============================================================ */
function CrazyDog({ flipped }: { flipped?: boolean }) {
  const s = "#1a1a1a";
  const f = "#fafaf6";
  const scaleX = flipped ? -1 : 1;

  return (
    <g style={{ transformOrigin: "210px 52px" }}>
      <g style={{ transform: `scaleX(${scaleX})`, transformOrigin: "210px 52px" }}>
        {/* 后腿 */}
        <g style={{ transformOrigin: "178px 62px", animation: "leg-sprint-b 0.1s linear infinite" }}>
          <line x1="178" y1="60" x2="172" y2="82" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <circle cx="178" cy="62" r="1.8" fill={f} stroke={s} strokeWidth="0.7" />
          <circle cx="174" cy="73" r="1.2" fill={f} stroke={s} strokeWidth="0.5" />
        </g>
        <g style={{ transformOrigin: "188px 62px", animation: "leg-sprint-b 0.1s 0.05s linear infinite" }}>
          <line x1="188" y1="60" x2="182" y2="82" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <circle cx="188" cy="62" r="1.8" fill={f} stroke={s} strokeWidth="0.7" />
          <circle cx="184" cy="73" r="1.2" fill={f} stroke={s} strokeWidth="0.5" />
        </g>

        {/* 身子 */}
        <g style={{ transformOrigin: "192px 52px", animation: "body-bob 0.14s linear infinite" }}>
          <rect x="172" y="44" width="36" height="18" rx="3" fill={f} stroke={s} strokeWidth="1.2" />
          <line x1="178" y1="46" x2="178" y2="60" stroke={s} strokeWidth="0.5" opacity="0.35" />
          <line x1="184" y1="46" x2="184" y2="60" stroke={s} strokeWidth="0.5" opacity="0.35" />
          <line x1="202" y1="46" x2="202" y2="60" stroke={s} strokeWidth="0.5" opacity="0.35" />
          <circle cx="178" cy="54" r="0.9" fill={f} stroke={s} strokeWidth="0.5" />
          <circle cx="202" cy="54" r="0.9" fill={f} stroke={s} strokeWidth="0.5" />
        </g>

        {/* 前腿 */}
        <g style={{ transformOrigin: "200px 62px", animation: "leg-sprint-a 0.1s linear infinite" }}>
          <line x1="200" y1="60" x2="207" y2="82" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <circle cx="200" cy="62" r="1.8" fill={f} stroke={s} strokeWidth="0.7" />
          <circle cx="204" cy="73" r="1.2" fill={f} stroke={s} strokeWidth="0.5" />
        </g>
        <g style={{ transformOrigin: "206px 62px", animation: "leg-sprint-a 0.1s 0.05s linear infinite" }}>
          <line x1="206" y1="60" x2="212" y2="82" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <circle cx="206" cy="62" r="1.8" fill={f} stroke={s} strokeWidth="0.7" />
          <circle cx="210" cy="73" r="1.2" fill={f} stroke={s} strokeWidth="0.5" />
        </g>

        {/* 尾巴 */}
        <g style={{ transformOrigin: "172px 52px", animation: "tail-flick 0.12s linear infinite" }}>
          <line x1="172" y1="52" x2="158" y2="42" stroke={s} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="158" cy="42" r="1.6" fill={f} stroke={s} strokeWidth="0.6" />
        </g>

        {/* 项圈 */}
        <rect x="204" y="40" width="7" height="14" rx="1.5" fill={f} stroke={s} strokeWidth="0.9" />
        <circle cx="211" cy="47" r="1.6" fill={f} stroke={s} strokeWidth="0.7" />
        <circle cx="207" cy="43" r="0.6" fill={s} />
        <circle cx="207" cy="51" r="0.6" fill={s} />

        {/* 短脖子 */}
        <polygon points="206,46 209,52 224,32 221,26" fill={f} stroke={s} strokeWidth="0.8" />

        {/* 头部 */}
        <ellipse cx="228" cy="24" rx="14" ry="10" fill={f} stroke={s} strokeWidth="1" />

        {/* 耳朵 */}
        <g style={{ transformOrigin: "218px 17px", animation: "ear-flop 0.18s linear infinite" }}>
          <polygon points="220,18 214,8 223,15" fill={f} stroke={s} strokeWidth="0.7" />
        </g>
        <g style={{ transformOrigin: "234px 15px", animation: "ear-flop 0.18s 0.09s linear infinite" }}>
          <polygon points="234,14 238,6 240,16" fill={f} stroke={s} strokeWidth="0.7" />
        </g>

        {/* 巨大黑色水滴鼻子 */}
        <path d="M240,18 C245,17 247,21 246,26 C245,31 241,33 238,31 C234,33 231,29 232,25 C233,21 236,18 240,18 Z" fill="#111" stroke={s} strokeWidth="0.5" />
        <ellipse cx="239" cy="23" rx="2.2" ry="1.2" fill="rgba(255,255,255,0.25)" />

        {/* 嘲讽眼 */}
        <ellipse cx="222" cy="19" rx="3.8" ry="1.1" fill="#fff" stroke={s} strokeWidth="0.6" transform="rotate(-7 222 19)" />
        <ellipse cx="222" cy="19.2" rx="2" ry="0.5" fill="#111" transform="rotate(-7 222 19)" />
        <circle cx="223.5" cy="18.8" r="0.5" fill="#fff" />
        <ellipse cx="234" cy="18" rx="3.8" ry="1.1" fill="#fff" stroke={s} strokeWidth="0.6" transform="rotate(-10 234 18)" />
        <ellipse cx="234" cy="18.2" rx="2" ry="0.5" fill="#111" transform="rotate(-10 234 18)" />
        <circle cx="235.5" cy="17.8" r="0.5" fill="#fff" />

        {/* 咧嘴大坏笑 + 机械牙 */}
        <rect x="220" y="29" width="24" height="7" rx="1.5" fill="#fff" stroke={s} strokeWidth="0.7" />
        <line x1="224" y1="29" x2="224" y2="36" stroke={s} strokeWidth="0.4" opacity="0.45" />
        <line x1="228" y1="29" x2="228" y2="36" stroke={s} strokeWidth="0.4" opacity="0.45" />
        <line x1="232" y1="29" x2="232" y2="36" stroke={s} strokeWidth="0.4" opacity="0.45" />
        <line x1="236" y1="29" x2="236" y2="36" stroke={s} strokeWidth="0.4" opacity="0.45" />
        <line x1="240" y1="29" x2="240" y2="36" stroke={s} strokeWidth="0.4" opacity="0.45" />
        <line x1="220" y1="32.5" x2="244" y2="32.5" stroke={s} strokeWidth="0.35" opacity="0.35" />
        <line x1="220" y1="36" x2="244" y2="36" stroke={s} strokeWidth="0.5" />
      </g>
    </g>
  );
}

/* ============================================================
 * 无奈的主人（-30° 后倾，双手后拽）—— 拉扯阶段
 * ============================================================ */
function HelplessOwner() {
  const s = "#1a1a1a";
  const f = "#fafaf6";

  return (
    <g>
      <g style={{ transformOrigin: "62px 60px", transform: "rotate(-30deg)" }}>
        <g style={{ animation: "owner-tremble 0.08s linear infinite" }}>
          <line x1="58" y1="84" x2="66" y2="84" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="52" y1="86" x2="60" y2="86" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="44" y1="86" x2="52" y2="86" stroke={s} strokeWidth="0.5" opacity="0.3" />
          <line x1="56" y1="84" x2="50" y2="84" stroke={s} strokeWidth="0.5" opacity="0.2" />
        </g>

        <g style={{ animation: "owner-tremble 0.08s linear infinite" }}>
          <line x1="62" y1="68" x2="62" y2="84" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="56" y1="70" x2="56" y2="86" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
        </g>

        <g style={{ animation: "owner-tremble 0.08s linear infinite" }}>
          <polygon points="58,42 74,41 67,72 52,74" fill={f} stroke={s} strokeWidth="1.1" />
          <line x1="60" y1="46" x2="72" y2="45" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="65" cy="52" r="0.8" fill={s} />
          <circle cx="64" cy="58" r="0.8" fill={s} />
          <circle cx="62" cy="64" r="0.8" fill={s} />
        </g>

        <g style={{ animation: "owner-tremble 0.08s linear infinite" }}>
          <g style={{ animation: "hair-wild 0.12s linear infinite" }}>
            <path d="M52,36 L47,20 L54,12 L60,22 L66,9 L73,18 L79,11 L81,22 L80,34" fill={f} stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M53,16 L57,10" stroke={s} strokeWidth="0.7" strokeLinecap="round" opacity="0.55" />
            <path d="M63,12 L66,6" stroke={s} strokeWidth="0.7" strokeLinecap="round" opacity="0.55" />
            <path d="M73,14 L77,8" stroke={s} strokeWidth="0.7" strokeLinecap="round" opacity="0.55" />
          </g>

          <circle cx="66" cy="36" r="11" fill={f} stroke={s} strokeWidth="1" />

          {/* 眼镜 */}
          <circle cx="60" cy="35" r="5" fill="transparent" stroke={s} strokeWidth="1.1" />
          <circle cx="72" cy="35" r="5" fill="transparent" stroke={s} strokeWidth="1.1" />
          <line x1="65" y1="35" x2="67" y2="35" stroke={s} strokeWidth="1.1" />
          <path d="M56,32 Q58,30 59,31" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
          <path d="M68,32 Q70,30 71,31" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" />

          <circle cx="59" cy="35" r="1" fill={s} />
          <circle cx="71" cy="35" r="1" fill={s} />
          <path d="M63,42 Q66,40 69,42" fill="none" stroke={s} strokeWidth="0.7" strokeLinecap="round" />
        </g>

        <g style={{ animation: "owner-tremble 0.08s linear infinite" }}>
          <line x1="70" y1="48" x2="80" y2="44" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="44" x2="88" y2="45" stroke={s} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="88" cy="45" r="2.8" fill={f} stroke={s} strokeWidth="0.8" />
        </g>
      </g>
    </g>
  );
}

/* ============================================================
 * 抓幕主人 —— 双手向上死死抓住两扇大幕的交界线
 * ============================================================ */
function GrabbingOwner() {
  const s = "#1a1a1a";
  const f = "#fafaf6";

  return (
    <svg width="120" height="200" viewBox="0 0 120 200" fill="none" className="overflow-visible">
      {/* 左臂上举抓幕 */}
      <line x1="48" y1="78" x2="20" y2="6" stroke={s} strokeWidth="2.6" strokeLinecap="round" />
      {/* 右臂上举抓幕 */}
      <line x1="72" y1="78" x2="100" y2="6" stroke={s} strokeWidth="2.6" strokeLinecap="round" />
      {/* 双手死死攥住幕布边缘 */}
      <circle cx="20" cy="4" r="4" fill={f} stroke={s} strokeWidth="1.2" />
      <circle cx="100" cy="4" r="4" fill={f} stroke={s} strokeWidth="1.2" />
      {/* 手指缝线 */}
      <line x1="17" y1="2" x2="23" y2="6" stroke={s} strokeWidth="0.5" opacity="0.5" />
      <line x1="97" y1="2" x2="103" y2="6" stroke={s} strokeWidth="0.5" opacity="0.5" />

      {/* 身体（后仰悬挂） */}
      <polygon points="50,82 70,82 74,130 46,130" fill={f} stroke={s} strokeWidth="1.2" />
      <line x1="52" y1="88" x2="68" y2="87" stroke={s} strokeWidth="1.2" strokeLinecap="round" />

      {/* 头部 */}
      <circle cx="60" cy="64" r="12" fill={f} stroke={s} strokeWidth="1.2" />

      {/* 狂乱头发 */}
      <path d="M50,56 L44,34 L54,26 L60,40 L66,24 L74,32 L82,26 L78,52" fill={f} stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M52,30 L56,20" stroke={s} strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      <path d="M64,26 L67,16" stroke={s} strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />

      {/* 眼镜（歪了） */}
      <circle cx="54" cy="63" r="5.5" fill="none" stroke={s} strokeWidth="1.1" />
      <circle cx="67" cy="62" r="5.5" fill="none" stroke={s} strokeWidth="1.1" />
      <line x1="59" y1="63" x2="62" y2="62" stroke={s} strokeWidth="1.1" />
      {/* 眼镜高光 */}
      <path d="M51,60 Q53,58 55,59" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      <path d="M64,59 Q66,57 68,58" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" />

      {/* 眼珠（向上看幕布） */}
      <circle cx="53" cy="62" r="1.3" fill={s} />
      <circle cx="66" cy="61" r="1.3" fill={s} />

      {/* 咬牙使劲的嘴 */}
      <path d="M56,76 Q60,72 64,76" fill="none" stroke={s} strokeWidth="1" strokeLinecap="round" />
      <line x1="57" y1="77" x2="63" y2="77" stroke={s} strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />

      {/* 悬垂的腿 */}
      <line x1="55" y1="129" x2="46" y2="168" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="65" y1="129" x2="74" y2="168" stroke={s} strokeWidth="2.2" strokeLinecap="round" />
      {/* 鞋子 */}
      <ellipse cx="46" cy="170" rx="4" ry="2" fill={f} stroke={s} strokeWidth="0.8" />
      <ellipse cx="74" cy="170" rx="4" ry="2" fill={f} stroke={s} strokeWidth="0.8" />
    </svg>
  );
}

/* ============================================================
 * 主组件
 * ============================================================ */
export default function HeroIntro({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"pull" | "curtain" | "done">("pull");
  const [curtainElapsed, setCurtainElapsed] = useState(0);
  const startTime = useRef(Date.now());
  const curtainStartRef = useRef(0);
  const doneStartRef = useRef(0);
  const animRef = useRef<number>(0);

  const animate = useCallback(() => {
    const now = Date.now();

    if (phase === "pull") {
      const elapsed = now - startTime.current;
      const pct = Math.min(100, (elapsed / 2000) * 100);
      setProgress(pct);
      if (pct >= 100) {
        setPhase("curtain");
        curtainStartRef.current = now;
      }
    } else if (phase === "curtain") {
      const fe = now - curtainStartRef.current;
      setCurtainElapsed(fe);
      if (fe > 3000) {
        setPhase("done");
        doneStartRef.current = now;
      }
    } else if (phase === "done") {
      if (doneStartRef.current > 0 && now - doneStartRef.current > 300) {
        onComplete();
        return;
      }
    }

    animRef.current = requestAnimationFrame(animate);
  }, [phase, onComplete]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  const pct = progress;
  const openedUpTo = pct / 100;
  const comboLeft = -12 + openedUpTo * 102;

  /* ---- 幕布阶段子时序 ---- */
  const fe = curtainElapsed;
  const ropeSnapped = fe > 50;
  const dogVisible = fe < 600;
  const ownerSpinVisible = fe >= 400 && fe < 800;
  const textVisible = fe > 400;
  const grabActive = fe > 800 && fe < 1800;
  const splitActive = fe > 1800;

  const overlayCls = [
    phase === "curtain" && grabActive ? "state-screen-grab" : "",
    phase === "curtain" && splitActive ? "state-screen-split" : "",
  ].filter(Boolean).join(" ");

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className={`fixed inset-0 z-[200] ${overlayCls}`}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <style>{STYLES}</style>

          {/* ================================================================ */}
          {/* 阶段一：拉扯狂奔 (0% – 99%)                                      */}
          {/* ================================================================ */}
          {phase === "pull" && (
            <div className="absolute inset-0" style={{ background: "#fafaf6" }}>
              {/* 地面滑轨 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-[88%] max-w-[700px] h-[110px]">
                  <div className="absolute left-0 right-0 top-[90px] h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
                </div>
              </div>

              {/* 组合体：人+绳+狗 */}
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <motion.div className="relative" style={{ left: `${comboLeft}%` }}>
                  <svg width="320" height="110" viewBox="0 0 320 110" fill="none" className="overflow-visible" style={{ minWidth: 320 }}>
                    {/* 人 + 绳：拉扯橡皮筋 */}
                    <g style={{ animation: "tension-jerk 0.3s ease-in-out infinite" }}>
                      <g style={{ animation: "rope-vibrate 0.05s linear infinite" }}>
                        <line x1="88" y1="45" x2="207" y2="47" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="88" y1="45" x2="207" y2="47" stroke="#1a1a1a" strokeWidth="0.4" strokeLinecap="round" strokeDasharray="2 4" opacity="0.45" />
                        <circle cx="88" cy="45" r="2" fill="#fafaf6" stroke="#1a1a1a" strokeWidth="0.7" />
                        <circle cx="207" cy="47" r="2" fill="#fafaf6" stroke="#1a1a1a" strokeWidth="0.7" />
                      </g>
                      <HelplessOwner />
                    </g>

                    {/* 狗：平滑前进 */}
                    <CrazyDog />
                  </svg>
                </motion.div>
              </div>

              {/* 百分比 */}
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
                <span className="text-black/35 font-mono text-sm tabular-nums tracking-widest">
                  {Math.round(pct)}%
                </span>
              </div>

              {/* 纸纹理 */}
              <div className="absolute inset-0 pointer-events-none" style={{
                opacity: 0.025,
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundRepeat: "repeat", backgroundSize: "256px 256px",
              }} />
            </div>
          )}

          {/* ================================================================ */}
          {/* 阶段二：大幕剧场 (0 – 1800ms)                                    */}
          {/* ================================================================ */}
          {phase === "curtain" && (
            <>
              {/* ---- 上半边大幕 ---- */}
              <div
                className="fixed inset-x-0 top-0 z-[202]"
                style={{
                  height: "50vh",
                  background: "#fafaf6",
                  ...(grabActive ? { animation: "top-curtain-grab 0.55s ease-out forwards" } : {}),
                  ...(splitActive ? { animation: "top-curtain-open 0.9s cubic-bezier(0.86, 0, 0.07, 1) forwards" } : {}),
                }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{
                  opacity: 0.025,
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "repeat", backgroundSize: "256px 256px",
                }} />
                {/* 幕布底部厚重边缘 */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#1a1a1a]/8" />
              </div>

              {/* ---- 下半边大幕 ---- */}
              <div
                className="fixed inset-x-0 bottom-0 z-[202]"
                style={{
                  height: "50vh",
                  background: "#fafaf6",
                  ...(grabActive ? { animation: "bottom-curtain-grab 0.55s ease-out forwards" } : {}),
                  ...(splitActive ? { animation: "bottom-curtain-open 0.9s cubic-bezier(0.86, 0, 0.07, 1) forwards" } : {}),
                }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{
                  opacity: 0.025,
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "repeat", backgroundSize: "256px 256px",
                }} />
                {/* 幕布顶部厚重边缘 */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[#1a1a1a]/8" />
              </div>

              {/* ---- 角色层（两扇大幕上方） ---- */}
              <motion.div
                className="fixed inset-0 z-[203] pointer-events-none"
                animate={{ opacity: splitActive ? 0 : 1 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
              >
                {/* ---- 绳断瞬间（0 – 50ms） ---- */}
                {!ropeSnapped && (
                  <div className="absolute inset-0 flex items-center pointer-events-none" style={{ left: `${comboLeft}%` }}>
                    <svg width="320" height="110" viewBox="0 0 320 110" fill="none" className="overflow-visible" style={{ minWidth: 320 }}>
                      <g style={{ animation: "tension-jerk 0.3s ease-in-out infinite" }}>
                        <line x1="88" y1="45" x2="207" y2="47" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" />
                        <circle cx="88" cy="45" r="2" fill="#fafaf6" stroke="#1a1a1a" strokeWidth="0.7" />
                        <circle cx="207" cy="47" r="2" fill="#fafaf6" stroke="#1a1a1a" strokeWidth="0.7" />
                        <HelplessOwner />
                      </g>
                      <CrazyDog />
                    </svg>
                  </div>
                )}

                {ropeSnapped && fe < 400 && (
                  <div className="absolute inset-0 flex items-center pointer-events-none" style={{ left: `${comboLeft}%` }}>
                    <svg width="320" height="110" viewBox="0 0 320 110" fill="none" className="overflow-visible" style={{ minWidth: 320 }}>
                      <motion.line
                        x1={88} y1={45} x2={88} y2={45}
                        initial={{ x2: 147, y2: 46 }}
                        animate={{ x2: 88, y2: 45 }}
                        transition={{ duration: 0.15, ease: "easeIn" }}
                        stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round"
                      />
                      <motion.line
                        x1={207} y1={47} x2={207} y2={47}
                        initial={{ x1: 148, y1: 46 }}
                        animate={{ x1: 207, y1: 47 }}
                        transition={{ duration: 0.15, ease: "easeIn" }}
                        stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round"
                      />
                      <circle cx="88" cy="45" r="2" fill="#fafaf6" stroke="#1a1a1a" strokeWidth="0.7" />
                      <circle cx="207" cy="47" r="2" fill="#fafaf6" stroke="#1a1a1a" strokeWidth="0.7" />
                    </svg>
                  </div>
                )}

                {/* ---- 人：0.4s 从右侧(75%)斜线大回旋滑倒到正中央(50%) + 坠落轨道下方 ---- */}
                {ownerSpinVisible && (
                  <div
                    className="absolute flex items-center justify-center pointer-events-none"
                    style={{
                      top: "calc(50% + 30px)",
                      transform: "translate(-50%, -50%)",
                      animation: "owner-slide-in 0.4s cubic-bezier(0.25, 1.3, 0.3, 1) forwards",
                    }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 180,
                        transformOrigin: "50px 55px",
                        animation: "inertia-slingshot 0.4s cubic-bezier(0.25, 1.3, 0.3, 1) forwards",
                      }}
                    >
                      <svg width="100" height="180" viewBox="0 0 100 180" fill="none" className="overflow-visible">
                        <line x1="0" y1="90" x2="100" y2="90" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
                        <g transform="translate(-10, 0)">
                          <HelplessOwner />
                        </g>
                      </svg>
                    </div>
                  </div>
                )}

                {/* ---- 人：抓幕求生 pose（800ms – fade out） ---- */}
                {(grabActive || splitActive) && (
                  <div
                    className="absolute flex items-center justify-center pointer-events-none"
                    style={{
                      left: "50%",
                      top: "50vh",
                      transform: "translate(-50%, 0)",
                      ...(grabActive ? { animation: "heavy-pull 0.07s linear infinite" } : {}),
                      ...(splitActive ? { animation: "human-pull-stretch 0.35s ease-out" } : {}),
                    }}
                  >
                    <GrabbingOwner />
                  </div>
                )}

                {/* ---- 字幕大字（人摔后空降，随 grab 震颤） ---- */}
                {textVisible && (
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none z-20"
                    style={{
                      top: "calc(50% - 100px)",
                      animation: grabActive ? "heavy-pull 0.07s linear infinite" : undefined,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div style={{ animation: "text-thump 0.45s ease-out" }}>
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[#1a1a1a] leading-tight whitespace-nowrap">
                        超级个体已就位，
                        <br className="sm:hidden" />
                        随时准备打硬仗
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ---- 狗：全速向右冲出屏幕 (0 – 450ms) ---- */}
                {dogVisible && (
                  <motion.div
                    className="absolute inset-0 flex items-center pointer-events-none"
                    style={{
                      animation: "dog-dash-out 0.4s cubic-bezier(0.4, 0, 0.7, 0.3) forwards",
                    }}
                  >
                    <svg width="320" height="110" viewBox="0 0 320 110" fill="none" className="overflow-visible" style={{ minWidth: 320 }}>
                      <g transform="translate(-50, 0)">
                        <CrazyDog flipped={false} />
                      </g>
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
