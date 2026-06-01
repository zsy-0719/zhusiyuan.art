"use client";

import { useState, useEffect, useRef } from "react";

/* ============================================================
 * SMPTE 时间码 —— 24fps 自动跳动
 * ============================================================ */
function Timecode() {
  const [tc, setTc] = useState("00:04:12:08");
  const frameRef = useRef(10752); // 起始帧: 4*3600*24 + 12*60*24 + 8

  useEffect(() => {
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const delta = now - last;
      const fps24 = 1000 / 24;
      const elapsed = Math.floor(delta / fps24);
      if (elapsed > 0) {
        frameRef.current += elapsed;
        last = now;

        const totalFrames = frameRef.current;
        const h = Math.floor(totalFrames / (3600 * 24)) % 24;
        const m = Math.floor((totalFrames % (3600 * 24)) / (60 * 24));
        const s = Math.floor((totalFrames % (60 * 24)) / 24);
        const f = totalFrames % 24;

        setTc(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`,
        );
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[11px] tracking-wider text-white/25 tabular-nums">
        TC {tc}
      </span>
    </div>
  );
}

/* ============================================================
 * 取景框角标 —— 4 个 L 形
 * ============================================================ */
function CornerBrackets() {
  const arm = 24;
  const gap = 12;
  const w = 1;

  return (
    <>
      {/* 左上 */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[35]"
        style={{ padding: gap }}
      >
        <svg width={arm} height={arm} className="opacity-20">
          <path
            d={`M0,${arm} L0,0 L${arm},0`}
            fill="none"
            stroke="white"
            strokeWidth={w}
          />
        </svg>
      </div>

      {/* 右上 */}
      <div
        className="fixed top-0 right-0 pointer-events-none z-[35]"
        style={{ padding: gap }}
      >
        <svg width={arm} height={arm} className="opacity-20">
          <path
            d={`M0,0 L${arm},0 L${arm},${arm}`}
            fill="none"
            stroke="white"
            strokeWidth={w}
          />
        </svg>
      </div>

      {/* 左下 */}
      <div
        className="fixed bottom-0 left-0 pointer-events-none z-[35]"
        style={{ padding: gap }}
      >
        <svg width={arm} height={arm} className="opacity-20">
          <path
            d={`M0,0 L0,${arm} L${arm},${arm}`}
            fill="none"
            stroke="white"
            strokeWidth={w}
          />
        </svg>
      </div>

      {/* 右下 */}
      <div
        className="fixed bottom-0 right-0 pointer-events-none z-[35]"
        style={{ padding: gap }}
      >
        <svg width={arm} height={arm} className="opacity-20">
          <path
            d={`M${arm},0 L${arm},${arm} L0,${arm}`}
            fill="none"
            stroke="white"
            strokeWidth={w}
          />
        </svg>
      </div>
    </>
  );
}

/* ============================================================
 * 中心十字
 * ============================================================ */
function CenterCrosshair() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[35] flex items-center justify-center">
      <div className="relative w-4 h-4 opacity-[0.12]">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white -translate-y-px" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white -translate-x-px" />
      </div>
    </div>
  );
}

/* ============================================================
 * 安全框标记 —— 4:3 内框
 * ============================================================ */
function SafeArea() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[34] flex items-center justify-center">
      <div
        className="border border-white/[0.04]"
        style={{ width: "min(90vw, 90vh * 4/3)", height: "min(90vh, 90vw * 3/4)" }}
      />
    </div>
  );
}

/* ============================================================
 * 主组件
 * ============================================================ */
export default function ViewfinderHUD() {
  return (
    <>
      <CornerBrackets />
      <CenterCrosshair />
      <SafeArea />

      {/* 底部信息栏 */}
      <div className="fixed bottom-[16px] inset-x-0 z-[36] pointer-events-none flex items-end justify-between px-[24px]">
        {/* 左下：伪参数 */}
        <div className="font-mono text-[10px] tracking-wider text-white/12 leading-relaxed">
          <div>ISO 800</div>
          <div>F/2.8</div>
          <div>ND 0.6</div>
        </div>

        {/* 右下：时间码 */}
        <Timecode />
      </div>

      {/* 顶部左标识 */}
      <div className="fixed top-[18px] left-[18px] z-[36] pointer-events-none font-mono text-[10px] tracking-[0.15em] text-white/12">
        A7S III &nbsp;·&nbsp; 24p &nbsp;·&nbsp; S-Log3
      </div>
    </>
  );
}
