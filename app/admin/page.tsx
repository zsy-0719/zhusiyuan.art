"use client";

import { useState, useEffect, useRef } from "react";
import { useSiteData } from "@/lib/site-data-context";
import { getDefaultData, fileToBase64, getStorageUsage, type AdminData } from "@/lib/admin-store";
import { adminPassword } from "@/data/site-data";

type ProjectSection = AdminData["projects"][number]["sections"][number];
type ProjectData = AdminData["projects"][number];

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

const tabs = [
  { key: "hero" as const, label: "首屏" },
  { key: "about" as const, label: "关于我" },
  { key: "projects" as const, label: "项目" },
  { key: "workflow" as const, label: "流程 & 工具" },
  { key: "futureVision" as const, label: "未来演进" },
  { key: "vibeCoding" as const, label: "Vibe Coding" },
  { key: "gallery" as const, label: "摄影 / 生活" },
  { key: "footer" as const, label: "页脚 & SEO" },
];

/* ============================
 * 图片选择器：点一下上传，再点删除
 * ============================ */
function ImagePicker({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    const base64 = await fileToBase64(file);
    onChange(base64);
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleFile(file);
  };

  return (
    <div
      className={`relative group ${className}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onInputChange}
      />

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/90 text-zinc-800 hover:bg-white"
            >
              更换
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/90 text-white hover:bg-red-500"
            >
              删除
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`w-full aspect-[16/9] flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors ${
            dragOver
              ? "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 text-blue-500"
              : "border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 hover:border-zinc-400 hover:text-zinc-500 bg-zinc-50/50 dark:bg-zinc-950/50"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="text-xs">{dragOver ? "松开上传" : "点击或拖拽上传图片"}</span>
        </button>
      )}
    </div>
  );
}

/* ============================
 * 小图片选择器（角色缩略图用）
 * ============================ */
function SmallImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    const base64 = await fileToBase64(file);
    onChange(base64);
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleFile(file);
  };

  return (
    <div
      className="relative group shrink-0"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />

      {value ? (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="p-1 rounded bg-white/80 text-zinc-700 hover:bg-white"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1 rounded bg-red-400/80 text-white hover:bg-red-500"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`w-20 h-20 flex flex-col items-center justify-center gap-0.5 rounded-lg border-2 border-dashed transition-colors ${
            dragOver
              ? "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 text-blue-500"
              : "border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
          <span className="text-[9px]">{dragOver ? "松开" : "上传"}</span>
        </button>
      )}
    </div>
  );
}

/* ============================
 * 音频上传器
 * ============================ */
function AudioUploader({
  value,
  onChange,
  label,
}: {
  value: { src: string; label: string };
  onChange: (v: { src: string; label: string }) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    const base64 = await fileToBase64(file);
    onChange({ ...value, src: base64 });
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleFile(file);
  };

  const hasFile = value.src && value.src.startsWith("data:");

  return (
    <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      <input ref={inputRef} type="file" accept="audio/mp3,audio/wav,audio/ogg,audio/mpeg,.mp3,.wav,.ogg" className="hidden" onChange={onInputChange} />

      {hasFile ? (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500 shrink-0">
            <polygon points="8,5 19,12 8,19" fill="currentColor" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 truncate">音频已上传</p>
            <input
              type="text"
              value={value.label}
              onChange={(e) => onChange({ ...value, label: e.target.value })}
              placeholder="音频标题（如：Suno BGM - 主题配乐）"
              className="w-full text-[11px] mt-1 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
            />
          </div>
          <button type="button" onClick={() => inputRef.current?.click()} className="text-[10px] text-blue-500 hover:text-blue-600 shrink-0">更换</button>
          <button type="button" onClick={() => onChange({ src: "", label: "" })} className="text-[10px] text-red-400 hover:text-red-500 shrink-0">删除</button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`w-full py-3 flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed transition-colors ${
            dragOver
              ? "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 text-blue-500"
              : "border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <span className="text-xs">{dragOver ? "松开上传" : label || "上传音频 (MP3/WAV)"}</span>
        </button>
      )}
    </div>
  );
}

/* ============================
 * 文本输入
 * ============================ */
function T({ label, value, onChange, area = false }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-500 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={area ? 4 : 2}
        className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 resize-y"
      />
    </div>
  );
}

/* ============================
 * 可添加/删除的列表
 * ============================ */
function TagList({ label, values, onChange, block = false }: { label: string; values: string[]; onChange: (v: string[]) => void; block?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-500 mb-1.5">{label}</label>
      {block ? (
        <div className="space-y-2">
          {values.map((v, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={v}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                rows={3}
                className="flex-1 text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 resize-y"
              />
              <button type="button" onClick={() => onChange(values.filter((_, j) => j !== i))} className="text-xs text-red-400 hover:text-red-500 shrink-0 mt-2">&times;</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...values, ""])}
            className="w-full py-2.5 text-xs rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400 transition-colors"
          >
            + 添加
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {values.map((v, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
              <input
                type="text"
                value={v}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                className="w-20 bg-transparent outline-none"
              />
              <button type="button" onClick={() => onChange(values.filter((_, j) => j !== i))} className="text-zinc-400 hover:text-red-500">&times;</button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => onChange([...values, ""])}
            className="px-2.5 py-1 text-xs rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400 transition-colors"
          >
            + 添加
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================
 * 项目详情编辑器（可视化，不用写 JSON）
 * ============================ */
function ProjectDetailEditor({
  project,
  onChange,
}: {
  project: ProjectData;
  onChange: (p: ProjectData) => void;
}) {
  const sections = (project.sections || []) as ProjectSection[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateSection = (i: number, s: any) => {
    const next = [...sections];
    next[i] = s;
    onChange({ ...project, sections: next } as ProjectData);
  };
  const addSection = () => {
    const newSection = { title: "新分类", intro: "", images: [] };
    onChange({ ...project, sections: [...sections, newSection] } as ProjectData);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setImages = (si: number, imgs: any[]) => {
    updateSection(si, { ...sections[si], images: imgs });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setChars = (si: number, chars: any[]) => {
    updateSection(si, { ...sections[si], characters: chars });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setVideos = (si: number, videos: any[]) => {
    updateSection(si, { ...sections[si], videos });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setHighlights = (si: number, highlights: any[]) => {
    updateSection(si, { ...sections[si], highlights });
  };
  const removeSection = (i: number) => {
    onChange({ ...project, sections: sections.filter((_, j) => j !== i) } as ProjectData);
  };
  const moveSection = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    onChange({ ...project, sections: next } as ProjectData);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">详情分类</h4>
        <button type="button" onClick={addSection} className="text-xs text-blue-500 hover:text-blue-600 font-medium">+ 添加分类</button>
      </div>

      {sections.map((sec, si) => (
        <div key={si} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <T label="分类名称" value={sec.title} onChange={(v) => updateSection(si, { ...sec, title: v })} />
            <div className="flex items-center gap-1 shrink-0 mt-4">
              <button type="button" onClick={() => moveSection(si, -1)} disabled={si === 0} className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
              </button>
              <button type="button" onClick={() => moveSection(si, 1)} disabled={si === sections.length - 1} className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <button type="button" onClick={() => removeSection(si)} className="text-xs text-red-400 hover:text-red-500 ml-1">删除</button>
            </div>
          </div>

          <T label="简介文字（可选）" value={sec.intro || ""} area onChange={(v) => updateSection(si, { ...sec, intro: v })} />

          {/* 图片列表 */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">图片</label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {("images" in sec ? sec.images : [])?.map?.((img: { src: string; label?: string; link?: string }, ii: number) => (
                <div key={ii} className="space-y-1">
                  <ImagePicker
                    value={img.src}
                    onChange={(v) => {
                      const imgs: any[] = [...(sec.images || [])];
                      imgs[ii] = { ...imgs[ii], src: v };
                      setImages(si, imgs);
                    }}
                  />
                  <input
                    type="text"
                    value={img.label || ""}
                    onChange={(e) => {
                      const imgs: any[] = [...(sec.images || [])];
                      imgs[ii] = { ...imgs[ii], label: e.target.value };
                      setImages(si, imgs);
                    }}
                    placeholder="图片说明"
                    className="w-full text-[10px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500"
                  />
                  <input
                    type="url"
                    value={(img as any).link || ""}
                    onChange={(e) => {
                      const imgs: any[] = [...(sec.images || [])];
                      imgs[ii] = { ...imgs[ii], link: e.target.value };
                      setImages(si, imgs);
                    }}
                    placeholder="百度网盘链接（可选）"
                    className="w-full text-[10px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500"
                  />
                  <button type="button" onClick={() => setImages(si, (sec.images || []).filter((_, j) => j !== ii))} className="text-[10px] text-red-400 hover:text-red-500">
                    删除
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setImages(si, [...(sec.images || []), { src: "", label: "" }])}
                className="aspect-[4/3] flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                <span className="text-[10px]">添加图片</span>
              </button>
            </div>
          </div>

          {/* 视频列表 */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">视频（封面图 + 百度网盘链接）</label>
            <div className="space-y-3">
              {((sec as any).videos || [])?.map?.((v: { cover: string; label: string; link: string }, vi: number) => (
                <div key={vi} className="flex gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
                  <div className="w-28 shrink-0">
                    <ImagePicker
                      value={v.cover}
                      onChange={(val) => {
                        const videos: any[] = [...((sec as any).videos || [])];
                        videos[vi] = { ...videos[vi], cover: val };
                        setVideos(si, videos);
                      }}
                      className="aspect-video"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={v.label}
                      onChange={(e) => {
                        const videos: any[] = [...((sec as any).videos || [])];
                        videos[vi] = { ...videos[vi], label: e.target.value };
                        setVideos(si, videos);
                      }}
                      placeholder="视频标题"
                      className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
                    />
                    <input
                      type="url"
                      value={v.link}
                      onChange={(e) => {
                        const videos: any[] = [...((sec as any).videos || [])];
                        videos[vi] = { ...videos[vi], link: e.target.value };
                        setVideos(si, videos);
                      }}
                      placeholder="百度网盘链接"
                      className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
                    />
                    <button
                      type="button"
                      onClick={() => setVideos(si, ((sec as any).videos || []).filter((_: any, j: number) => j !== vi))}
                      className="text-[10px] text-red-400 hover:text-red-500"
                    >
                      删除此视频
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setVideos(si, [...((sec as any).videos || []), { cover: "", label: "", link: "" }])}
                className="w-full py-2.5 text-xs font-medium rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-500 transition-colors"
              >
                + 添加视频
              </button>
            </div>
          </div>

          {/* 创作思路（文字 + 关键帧 + 成品片段） */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-zinc-500">创作思路</label>
              <button
                type="button"
                onClick={() => setHighlights(si, [...((sec as any).highlights || []), { title: "", description: "", images: [], video: { cover: "", link: "" } }])}
                className="text-xs text-blue-500 hover:text-blue-600 font-medium"
              >
                + 添加镜头拆解
              </button>
            </div>
            <div className="space-y-4">
              {((sec as any).highlights || [])?.map?.((hl: { title: string; description: string; images: { src: string; label?: string }[]; video?: { cover: string; link: string } }, hi: number) => (
                <div key={hi} className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <T label="镜头标题" value={hl.title} onChange={(v) => {
                      const hlList: any[] = [...((sec as any).highlights || [])];
                      hlList[hi] = { ...hlList[hi], title: v };
                      setHighlights(si, hlList);
                    }} />
                    <button
                      type="button"
                      onClick={() => setHighlights(si, ((sec as any).highlights || []).filter((_: any, j: number) => j !== hi))}
                      className="text-xs text-red-400 hover:text-red-500 shrink-0 ml-2"
                    >
                      删除此镜头
                    </button>
                  </div>
                  <T label="创作思路文字" area value={hl.description} onChange={(v) => {
                    const hlList: any[] = [...((sec as any).highlights || [])];
                    hlList[hi] = { ...hlList[hi], description: v };
                    setHighlights(si, hlList);
                  }} />

                  {/* 关键帧图片 */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-zinc-500">关键帧</label>
                      <button
                        type="button"
                        onClick={() => {
                          const hlList: any[] = [...((sec as any).highlights || [])];
                          hlList[hi] = { ...hlList[hi], images: [...(hlList[hi].images || []), { src: "", label: "" }] };
                          setHighlights(si, hlList);
                        }}
                        className="text-[10px] text-blue-500 hover:text-blue-600"
                      >
                        + 添加关键帧
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(hl.images || []).map((img: { src: string; label?: string }, ii: number) => (
                        <div key={ii} className="space-y-1">
                          <ImagePicker
                            value={img.src}
                            onChange={(v) => {
                              const hlList: any[] = [...((sec as any).highlights || [])];
                              const imgs = [...(hlList[hi].images || [])];
                              imgs[ii] = { ...imgs[ii], src: v };
                              hlList[hi] = { ...hlList[hi], images: imgs };
                              setHighlights(si, hlList);
                            }}
                          />
                          <input
                            type="text"
                            value={img.label || ""}
                            onChange={(e) => {
                              const hlList: any[] = [...((sec as any).highlights || [])];
                              const imgs = [...(hlList[hi].images || [])];
                              imgs[ii] = { ...imgs[ii], label: e.target.value };
                              hlList[hi] = { ...hlList[hi], images: imgs };
                              setHighlights(si, hlList);
                            }}
                            placeholder="关键帧说明"
                            className="w-full text-[10px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const hlList: any[] = [...((sec as any).highlights || [])];
                              const imgs = (hlList[hi].images || []).filter((_: any, j: number) => j !== ii);
                              hlList[hi] = { ...hlList[hi], images: imgs };
                              setHighlights(si, hlList);
                            }}
                            className="text-[10px] text-red-400 hover:text-red-500"
                          >
                            删除
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 成品片段 */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5">成品片段（封面 + 链接）</label>
                    <div className="flex gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                      <div className="w-28 shrink-0">
                        <ImagePicker
                          value={hl.video?.cover || ""}
                          onChange={(v) => {
                            const hlList: any[] = [...((sec as any).highlights || [])];
                            hlList[hi] = { ...hlList[hi], video: { ...hlList[hi].video, cover: v } };
                            setHighlights(si, hlList);
                          }}
                          className="aspect-video"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="url"
                          value={hl.video?.link || ""}
                          onChange={(e) => {
                            const hlList: any[] = [...((sec as any).highlights || [])];
                            hlList[hi] = { ...hlList[hi], video: { ...hlList[hi].video, link: e.target.value } };
                            setHighlights(si, hlList);
                          }}
                          placeholder="百度网盘链接"
                          className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const hlList: any[] = [...((sec as any).highlights || [])];
                            hlList[hi] = { ...hlList[hi], video: undefined };
                            setHighlights(si, hlList);
                          }}
                          className="text-[10px] text-red-400 hover:text-red-500"
                        >
                          删除成品片段
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 角色列表 */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">角色</label>
            <div className="space-y-3">
              {(sec.characters || [])?.map?.((char: { name: string; desc: string; images: string[] }, ci: number) => (
                <div key={ci} className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <T label="角色名" value={char.name} onChange={(v) => {
                        const chars = [...(sec.characters || [])];
                        chars[ci] = { ...chars[ci], name: v };
                        setChars(si, chars);
                      }} />
                      <T label="角色描述" value={char.desc} area onChange={(v) => {
                        const chars = [...(sec.characters || [])];
                        chars[ci] = { ...chars[ci], desc: v };
                        setChars(si, chars);
                      }} />
                    </div>
                    <button type="button" onClick={() => setChars(si, (sec.characters || []).filter((_, j) => j !== ci))} className="text-xs text-red-400 hover:text-red-500 shrink-0 ml-2">
                      删除角色
                    </button>
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-400 mb-1">角色图片</label>
                    <div className="flex gap-2 flex-wrap">
                      {char.images.map((img: string, ii: number) => (
                        <SmallImagePicker key={ii} value={img} onChange={(v) => {
                          const chars = [...(sec.characters || [])];
                          const imgs = [...chars[ci].images];
                          imgs[ii] = v;
                          chars[ci] = { ...chars[ci], images: imgs };
                          setChars(si, chars);
                        }} />
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const chars = [...(sec.characters || [])];
                          chars[ci] = { ...chars[ci], images: [...chars[ci].images, ""] };
                          setChars(si, chars);
                        }}
                        className="w-20 h-20 flex flex-col items-center justify-center gap-0.5 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                        <span className="text-[9px]">添加</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setChars(si, [...(sec.characters || []), { name: "", desc: "", images: [""] }])}
                className="text-xs text-blue-500 hover:text-blue-600 font-medium"
              >
                + 添加角色
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================
 * PDF 上传器
 * ============================ */
function PdfUploader({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      alert("请上传 PDF 文件");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("PDF 文件不能超过 5MB");
      return;
    }
    const base64 = await fileToBase64(file);
    onChange(base64);
  };

  const isPdfBase64 = value.startsWith("data:application/pdf");

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) await handleFile(file);
        }}
      />

      {isPdfBase64 ? (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">简历已上传</span>
          <button type="button" onClick={() => inputRef.current?.click()} className="text-xs text-blue-500 hover:text-blue-600 ml-auto">更换</button>
          <button type="button" onClick={() => onChange("")} className="text-xs text-red-400 hover:text-red-500">删除</button>
        </div>
      ) : value && value !== "#" ? (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span className="text-sm text-blue-700 dark:text-blue-300 truncate max-w-[200px]">{value}</span>
          <button type="button" onClick={() => onChange("")} className="text-xs text-red-400 hover:text-red-500 ml-auto shrink-0">清除链接</button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={async (e) => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) await handleFile(file); }}
        className={`mt-2 w-full py-4 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors ${
          dragOver
            ? "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 text-blue-500"
            : "border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400 hover:text-zinc-500"
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span className="text-xs font-medium">点击上传 PDF 简历</span>
        <span className="text-[10px] text-zinc-400">或拖拽 PDF 到此处 · 最大 5MB</span>
      </button>

      {!isPdfBase64 && (
        <div className="mt-2">
          <label className="text-[10px] text-zinc-400">或输入简历链接</label>
          <input
            type="url"
            value={value === "#" ? "" : (value.startsWith("data:") ? "" : value)}
            onChange={(e) => onChange(e.target.value || "#")}
            placeholder="https://example.com/resume.pdf"
            className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 mt-1"
          />
        </div>
      )}
    </div>
  );
}

/* ============================
 * 主页面
 * ============================ */
export default function AdminPage() {
  const { data, update, reset } = useSiteData();
  const [draft, setDraft] = useState<AdminData>(deepClone(data));
  const [tab, setTab] = useState<string>("hero");
  const [saved, setSaved] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [storageInfo, setStorageInfo] = useState({ used: 0, total: Infinity as number, percent: 0 });

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin-auth") === "1") {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    getStorageUsage().then(setStorageInfo);
  }, [saved]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === adminPassword) {
      sessionStorage.setItem("admin-auth", "1");
      setAuthed(true);
      setPwErr(false);
    } else {
      setPwErr(true);
    }
  };

  useEffect(() => {
    setDraft(deepClone(data));
  }, [data]);

  const handleSave = () => {
    update(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("确定要恢复所有默认内容吗？所有修改将会丢失。")) {
      reset();
    }
  };

  const set = <K extends keyof AdminData>(key: K, val: AdminData[K]) => {
    setDraft((prev) => ({ ...prev, [key]: val }));
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white text-center">后台管理</h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwErr(false); }}
            placeholder="请输入管理密码"
            autoFocus
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
          />
          {pwErr && <p className="text-xs text-red-500 text-center">密码错误</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-opacity"
          >
            进入后台
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* 顶栏 */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold text-zinc-900 dark:text-white">管理后台</h1>
            <span className="text-xs text-zinc-400 hidden sm:inline">所有修改保存在浏览器中，上传即生效</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">查看网站 &rarr;</a>
            <button onClick={handleReset} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">恢复默认</button>
            <button onClick={handleSave} className={`text-xs px-5 py-1.5 rounded-lg font-medium transition-all ${saved ? "bg-emerald-500 text-white" : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-80"}`}>
              {saved ? "已保存 ✓" : "保存"}
            </button>
          </div>
        </div>
      </div>

      {/* 主体 */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-6">
        {/* 侧边 tabs */}
        <nav className="md:w-36 shrink-0 flex md:flex-col gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${tab === t.key ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium shadow-sm border border-zinc-200/60 dark:border-zinc-800/60" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* 编辑区 */}
        <div className="flex-1 min-w-0 bg-white dark:bg-black rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 md:p-8">

          {/* ========== HERO ========== */}
          {tab === "hero" && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Hero 首屏</h2>
              <T label="头上小字" value={draft.hero.subtitle} onChange={(v) => set("hero", { ...draft.hero, subtitle: v })} />
              <T label="姓名" value={draft.hero.name} onChange={(v) => set("hero", { ...draft.hero, name: v })} />
              <TagList label="标语（支持多行）" values={draft.hero.tagline} onChange={(v) => set("hero", { ...draft.hero, tagline: v })} />
              <TagList label="弹幕内容（首屏滚动文字）" values={(draft.hero as any).personalLines || []} onChange={(v) => set("hero", { ...draft.hero, personalLines: v })} />
            </div>
          )}

          {/* ========== ABOUT ========== */}
          {tab === "about" && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">关于我</h2>

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">个人照片</label>
                <div className="w-40">
                  <ImagePicker value={draft.about.avatarPath} onChange={(v) => set("about", { ...draft.about, avatarPath: v })} className="aspect-square" />
                </div>
              </div>

              <TagList block label="左侧标题" values={draft.about.introTitle} onChange={(v) => set("about", { ...draft.about, introTitle: v })} />
              <TagList block label="个人简介段落" values={draft.about.introParagraphs} onChange={(v) => set("about", { ...draft.about, introParagraphs: v })} />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {draft.about.highlights.map((h, i) => (
                  <div key={i} className="space-y-1">
                    <T label="标签" value={h.label} onChange={(v) => { const next = { ...draft.about }; next.highlights[i] = { ...next.highlights[i], label: v }; set("about", next); }} />
                    <T label="数值" value={h.value} onChange={(v) => { const next = { ...draft.about }; next.highlights[i] = { ...next.highlights[i], value: v }; set("about", next); }} />
                  </div>
                ))}
              </div>

              <T label="经历区标签" value={draft.about.experienceLabel} onChange={(v) => set("about", { ...draft.about, experienceLabel: v })} />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-500">工作经历</label>
                  <button type="button" onClick={() => { const next = { ...draft.about }; next.experiences.push({ period: "", role: "", company: "", details: [] }); set("about", next); }} className="text-xs text-blue-500 hover:text-blue-600 font-medium">+ 添加</button>
                </div>
                {draft.about.experiences.map((exp, i) => (
                  <div key={i} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <T label="时间段" value={exp.period} onChange={(v) => { const next = { ...draft.about }; next.experiences[i] = { ...next.experiences[i], period: v }; set("about", next); }} />
                      <T label="职位" value={exp.role} onChange={(v) => { const next = { ...draft.about }; next.experiences[i] = { ...next.experiences[i], role: v }; set("about", next); }} />
                      <T label="公司" value={exp.company} onChange={(v) => { const next = { ...draft.about }; next.experiences[i] = { ...next.experiences[i], company: v }; set("about", next); }} />
                    </div>
                    <TagList label="工作详情" values={exp.details} onChange={(v) => { const next = { ...draft.about }; next.experiences[i] = { ...next.experiences[i], details: v }; set("about", next); }} />
                    <button type="button" onClick={() => { const next = { ...draft.about }; next.experiences = next.experiences.filter((_, j) => j !== i); set("about", next); }} className="text-xs text-red-400 hover:text-red-500">删除此经历</button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {draft.about.education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <T label="标签" value={edu.label} onChange={(v) => { const next = { ...draft.about }; next.education[i] = { ...next.education[i], label: v }; set("about", next); }} />
                    <T label="内容" value={edu.content} area onChange={(v) => { const next = { ...draft.about }; next.education[i] = { ...next.education[i], content: v }; set("about", next); }} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <T label="联系邮箱" value={draft.about.contactEmail} onChange={(v) => set("about", { ...draft.about, contactEmail: v })} />
                <T label="电话" value={(draft.about as any).phone || ""} onChange={(v) => set("about", { ...draft.about, phone: v } as any)} />
                <T label="主按钮文字" value={draft.about.ctaPrimary} onChange={(v) => set("about", { ...draft.about, ctaPrimary: v })} />
                <T label="次按钮文字" value={draft.about.ctaSecondary} onChange={(v) => set("about", { ...draft.about, ctaSecondary: v })} />
              </div>

              {/* 简历 PDF 上传 */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <label className="block text-xs font-medium text-zinc-500 mb-2">简历 PDF</label>
                <PdfUploader
                  value={draft.about.resumeLink}
                  onChange={(v) => set("about", { ...draft.about, resumeLink: v })}
                />
              </div>

              {/* 微信二维码 */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <label className="block text-xs font-medium text-zinc-500 mb-2">微信二维码</label>
                <div className="w-40">
                  <ImagePicker
                    value={(draft.about as any).wechatQr || ""}
                    onChange={(v) => set("about", { ...draft.about, wechatQr: v } as any)}
                    className="aspect-square"
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">上传微信二维码图片，前端点击"联系我"时会显示</p>
              </div>
            </div>
          )}

          {/* ========== PROJECTS ========== */}
          {tab === "projects" && (
            <div className="space-y-8">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">项目</h2>

              {draft.projects.map((proj, pi) => (
                <div key={pi} className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-zinc-800 dark:text-zinc-200">项目 {pi + 1}：{proj.title || "未命名"}</h3>
                    <button type="button" onClick={() => { const next = [...draft.projects]; next.splice(pi, 1); set("projects", next); }} className="text-xs text-red-400 hover:text-red-500">删除项目</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <T label="标题" value={proj.title} onChange={(v) => { const next = [...draft.projects]; next[pi] = { ...next[pi], title: v }; set("projects", next); }} />
                    <T label="分类" value={proj.category} onChange={(v) => { const next = [...draft.projects]; next[pi] = { ...next[pi], category: v }; set("projects", next); }} />
                  </div>
                  <T label="简介" area value={proj.description} onChange={(v) => { const next = [...draft.projects]; next[pi] = { ...next[pi], description: v }; set("projects", next); }} />
                  <TagList label="标签" values={proj.tags || []} onChange={(v) => { const next = [...draft.projects]; next[pi] = { ...next[pi], tags: v }; set("projects", next); }} />

                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5">封面图</label>
                    <div className="w-full max-w-md">
                      <ImagePicker value={proj.image} onChange={(v) => { const next = [...draft.projects]; next[pi] = { ...next[pi], image: v }; set("projects", next); }} />
                    </div>
                  </div>

                  {/* 项目详情编辑 */}
                  <div className="border-t border-zinc-100 dark:border-zinc-900 pt-4 mt-4">
                    <ProjectDetailEditor
                      project={proj}
                      onChange={(p) => { const next = [...draft.projects]; next[pi] = p; set("projects", next); }}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => { const next = [...draft.projects]; next.push({ title: "新项目", category: "分类", description: "", tags: [], image: "", color: "from-zinc-500/10 to-zinc-500/5", sections: [] }); set("projects", next); }}
                className="w-full py-3 text-sm font-medium rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-500 transition-colors"
              >
                + 添加项目
              </button>
            </div>
          )}

          {/* ========== WORKFLOW ========== */}
          {tab === "workflow" && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">流程 & 工具</h2>

              <T label="区块标签" value={draft.workflow.sectionLabel} onChange={(v) => set("workflow", { ...draft.workflow, sectionLabel: v })} />
              <T label="区块标题" value={draft.workflow.sectionTitle} onChange={(v) => set("workflow", { ...draft.workflow, sectionTitle: v })} />
              <T label="区块副标题" area value={(draft.workflow as any).sectionSubtitle || ""} onChange={(v) => set("workflow", { ...draft.workflow, sectionSubtitle: v })} />

              <div className="space-y-4">
                <label className="text-xs font-medium text-zinc-500">流程步骤（图文结合）</label>
                {draft.workflow.phases.map((phase, i) => {
                  const p = phase as typeof phase & {
                    images?: { src: string; label: string }[];
                    compare?: { before: string; after: string; label: string };
                    techNote?: string;
                  };
                  return (
                  <div key={i} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-bold text-zinc-300 dark:text-zinc-700 shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1 space-y-2">
                        <T label="标题" value={p.title} onChange={(v) => { const next = { ...draft.workflow }; next.phases[i] = { ...next.phases[i], title: v }; set("workflow", next); }} />
                        <T label="描述" area value={p.description} onChange={(v) => { const next = { ...draft.workflow }; next.phases[i] = { ...next.phases[i], description: v }; set("workflow", next); }} />
                      </div>
                    </div>

                    {/* 技术注解 */}
                    <T label="技术细节标注（可选）" area value={p.techNote || ""} onChange={(v) => { const next = { ...draft.workflow }; next.phases[i] = { ...next.phases[i], techNote: v }; set("workflow", next); }} />

                    {/* 截图 */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5">截图 / 工作流节点图（可选）</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(p.images || []).map((img: { src: string; label: string }, ii: number) => (
                          <div key={ii} className="space-y-1">
                            <ImagePicker
                              value={img.src}
                              onChange={(v) => {
                                const next = { ...draft.workflow };
                                const imgs = [...(p.images || [])];
                                imgs[ii] = { ...imgs[ii], src: v };
                                next.phases[i] = { ...next.phases[i], images: imgs };
                                set("workflow", next);
                              }}
                            />
                            <input
                              type="text"
                              value={img.label || ""}
                              onChange={(e) => {
                                const next = { ...draft.workflow };
                                const imgs = [...(p.images || [])];
                                imgs[ii] = { ...imgs[ii], label: e.target.value };
                                next.phases[i] = { ...next.phases[i], images: imgs };
                                set("workflow", next);
                              }}
                              placeholder="截图说明"
                              className="w-full text-[10px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = { ...draft.workflow };
                                next.phases[i] = { ...next.phases[i], images: (p.images || []).filter((_, j) => j !== ii) };
                                set("workflow", next);
                              }}
                              className="text-[10px] text-red-400 hover:text-red-500"
                            >删除</button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const next = { ...draft.workflow };
                            const imgs = [...(p.images || []), { src: "", label: "" }];
                            next.phases[i] = { ...next.phases[i], images: imgs };
                            set("workflow", next);
                          }}
                          className="aspect-[4/3] flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                          <span className="text-[10px]">添加截图</span>
                        </button>
                      </div>
                    </div>

                    {/* 前后对比 */}
                    <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-2">
                      <label className="block text-xs font-medium text-zinc-500">前后对比（可选）</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-zinc-400 mb-1">修改前</label>
                          <ImagePicker
                            value={p.compare?.before || ""}
                            onChange={(v) => {
                              const next = { ...draft.workflow };
                              const cmp = { ...(p.compare || { before: "", after: "", label: "" }), before: v };
                              next.phases[i] = { ...next.phases[i], compare: cmp };
                              set("workflow", next);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-400 mb-1">修改后</label>
                          <ImagePicker
                            value={p.compare?.after || ""}
                            onChange={(v) => {
                              const next = { ...draft.workflow };
                              const cmp = { ...(p.compare || { before: "", after: "", label: "" }), after: v };
                              next.phases[i] = { ...next.phases[i], compare: cmp };
                              set("workflow", next);
                            }}
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        value={p.compare?.label || ""}
                        onChange={(e) => {
                          const next = { ...draft.workflow };
                          const cmp = { ...(p.compare || { before: "", after: "", label: "" }), label: e.target.value };
                          next.phases[i] = { ...next.phases[i], compare: cmp };
                          set("workflow", next);
                        }}
                        placeholder="对比说明（如：左：原始生成 → 右：精修后）"
                        className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 mt-2"
                      />
                    </div>

                    {/* 音频上传 */}
                    <div className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-zinc-500">音频 BGM（可选，支持多条）</label>
                        <button
                          type="button"
                          onClick={() => {
                            const next = { ...draft.workflow };
                            const raw = p.audio;
                            const existing: { src: string; label: string }[] = Array.isArray(raw) ? raw : (raw ? [raw] : []);
                            const tracks = [...existing, { src: "", label: "" }];
                            next.phases[i] = { ...next.phases[i], audio: tracks };
                            set("workflow", next);
                          }}
                          className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                        >
                          + 添加音频
                        </button>
                      </div>
                      {(() => {
                        const raw = p.audio;
                        const tracks: { src: string; label: string }[] = Array.isArray(raw) ? raw : (raw ? [raw] : []);
                        return tracks.map((track, ti) => (
                        <div key={ti}>
                          <AudioUploader
                            value={track}
                            onChange={(v) => {
                              const next = { ...draft.workflow };
                              const updated = [...tracks];
                              updated[ti] = v;
                              next.phases[i] = { ...next.phases[i], audio: updated };
                              set("workflow", next);
                            }}
                            label="上传 Suno BGM (MP3/WAV)"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = { ...draft.workflow };
                              const updated = tracks.filter((_, j) => j !== ti);
                              next.phases[i] = { ...next.phases[i], audio: updated };
                              set("workflow", next);
                            }}
                            className="text-[10px] text-red-400 hover:text-red-500 mt-1"
                          >
                            删除此音频
                          </button>
                        </div>
                      ));
                      })()}
                    </div>
                  </div>
                );
                })}
              </div>

              <T label="工具区标签" value={draft.workflow.toolsLabel} onChange={(v) => set("workflow", { ...draft.workflow, toolsLabel: v })} />
              <TagList label="工具列表" values={draft.workflow.tools} onChange={(v) => set("workflow", { ...draft.workflow, tools: v })} />
            </div>
          )}

          {/* ========== FUTURE VISION ========== */}
          {tab === "futureVision" && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">未来演进 / Future Vision</h2>
              <T label="板块小标" value={draft.futureVision.sectionLabel} onChange={(v) => set("futureVision", { ...draft.futureVision, sectionLabel: v })} />
              <T label="主标题" value={draft.futureVision.sectionTitle} onChange={(v) => set("futureVision", { ...draft.futureVision, sectionTitle: v })} />
              <T label="引言段落" area value={draft.futureVision.sectionIntro} onChange={(v) => set("futureVision", { ...draft.futureVision, sectionIntro: v })} />

              <div className="space-y-4">
                <label className="text-xs font-medium text-zinc-500">核心观点（01 / 02 / 03）</label>
                {draft.futureVision.insights.map((insight, i) => (
                  <div key={i} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <T label="编号（如 01）" value={insight.number} onChange={(v) => {
                      const next = { ...draft.futureVision };
                      next.insights[i] = { ...next.insights[i], number: v };
                      set("futureVision", next);
                    }} />
                    <T label="标题" value={insight.title} onChange={(v) => {
                      const next = { ...draft.futureVision };
                      next.insights[i] = { ...next.insights[i], title: v };
                      set("futureVision", next);
                    }} />
                    <T label="正文" area value={insight.description} onChange={(v) => {
                      const next = { ...draft.futureVision };
                      next.insights[i] = { ...next.insights[i], description: v };
                      set("futureVision", next);
                    }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== VIBE CODING ========== */}
          {tab === "vibeCoding" && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Vibe Coding 项目</h2>
              <T label="区块标签" value={(draft.vibeCoding as any).sectionLabel || ""} onChange={(v) => set("vibeCoding", { ...draft.vibeCoding, sectionLabel: v })} />
              <T label="区块标题" value={(draft.vibeCoding as any).sectionTitle || ""} onChange={(v) => set("vibeCoding", { ...draft.vibeCoding, sectionTitle: v })} />
              <T label="区块副标题" area value={(draft.vibeCoding as any).sectionSubtitle || ""} onChange={(v) => set("vibeCoding", { ...draft.vibeCoding, sectionSubtitle: v })} />

              <div className="space-y-4">
                <label className="text-xs font-medium text-zinc-500">项目列表</label>
                {((draft.vibeCoding as any).projects || []).map((proj: any, pi: number) => (
                  <div key={pi} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <T label="项目名称" value={proj.name} onChange={(v) => {
                        const next = { ...draft.vibeCoding } as any;
                        next.projects[pi] = { ...next.projects[pi], name: v };
                        set("vibeCoding", next);
                      }} />
                      <button
                        type="button"
                        onClick={() => {
                          const next = { ...draft.vibeCoding } as any;
                          next.projects = next.projects.filter((_: any, j: number) => j !== pi);
                          set("vibeCoding", next);
                        }}
                        className="text-xs text-red-400 hover:text-red-500 shrink-0 ml-2"
                      >删除</button>
                    </div>
                    <T label="描述" area value={proj.description} onChange={(v) => {
                      const next = { ...draft.vibeCoding } as any;
                      next.projects[pi] = { ...next.projects[pi], description: v };
                      set("vibeCoding", next);
                    }} />
                    <TagList label="工具标签" values={proj.tools} onChange={(v) => {
                      const next = { ...draft.vibeCoding } as any;
                      next.projects[pi] = { ...next.projects[pi], tools: v };
                      set("vibeCoding", next);
                    }} />
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">亮点列表</label>
                      {(proj.highlights || []).map((h: string, hi: number) => (
                        <div key={hi} className="flex gap-2 mb-1">
                          <input
                            type="text"
                            value={h}
                            onChange={(e) => {
                              const next = { ...draft.vibeCoding } as any;
                              const hl = [...next.projects[pi].highlights];
                              hl[hi] = e.target.value;
                              next.projects[pi] = { ...next.projects[pi], highlights: hl };
                              set("vibeCoding", next);
                            }}
                            className="flex-1 text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const next = { ...draft.vibeCoding } as any;
                              const hl = next.projects[pi].highlights.filter((_: any, j: number) => j !== hi);
                              next.projects[pi] = { ...next.projects[pi], highlights: hl };
                              set("vibeCoding", next);
                            }}
                            className="text-xs text-red-400 hover:text-red-500"
                          >删除</button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const next = { ...draft.vibeCoding } as any;
                          const hl = [...next.projects[pi].highlights, ""];
                          next.projects[pi] = { ...next.projects[pi], highlights: hl };
                          set("vibeCoding", next);
                        }}
                        className="text-xs text-blue-500 hover:text-blue-600 mt-1"
                      >+ 添加亮点</button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const next = { ...draft.vibeCoding } as any;
                    next.projects = [...(next.projects || []), { name: "新项目", tools: [], description: "", highlights: [] }];
                    set("vibeCoding", next);
                  }}
                  className="w-full py-2.5 text-xs font-medium rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-500 transition-colors"
                >
                  + 添加项目
                </button>
              </div>
            </div>
          )}

          {/* ========== GALLERY ========== */}
          {tab === "gallery" && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">摄影 / 生活照片</h2>
              <T label="区块标题" value={draft.gallery.title} onChange={(v) => set("gallery", { ...draft.gallery, title: v })} />
              <T label="区块简介" area value={draft.gallery.description} onChange={(v) => set("gallery", { ...draft.gallery, description: v })} />

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-2">照片（上传后自动保留，删除即移除槽位）</label>
                {draft.gallery.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    {draft.gallery.images.map((img, i) => (
                      <div key={i} className="space-y-1">
                        <ImagePicker
                          value={img.src}
                          onChange={(v) => {
                            const imgs = [...draft.gallery.images];
                            imgs[i] = { ...imgs[i], src: v };
                            set("gallery", { ...draft.gallery, images: imgs });
                          }}
                        />
                        <input
                          type="text"
                          value={img.label}
                          onChange={(e) => {
                            const imgs = [...draft.gallery.images];
                            imgs[i] = { ...imgs[i], label: e.target.value };
                            set("gallery", { ...draft.gallery, images: imgs });
                          }}
                          placeholder="照片说明（如：黄山日出）"
                          className="w-full text-[10px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500"
                        />
                        <button
                          type="button"
                          onClick={() => set("gallery", { ...draft.gallery, images: draft.gallery.images.filter((_, j) => j !== i) })}
                          className="text-[10px] text-red-400 hover:text-red-500"
                        >
                          删除此照片
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => set("gallery", { ...draft.gallery, images: [...draft.gallery.images, { src: "", label: "" }] })}
                  className="w-full py-3 text-sm font-medium rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-500 transition-colors"
                >
                  + 添加照片
                </button>
              </div>
            </div>
          )}

          {/* ========== FOOTER & SEO ========== */}
          {tab === "footer" && (
            <div className="space-y-8">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">页脚 & SEO</h2>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">页脚</h3>
                <T label="版权文字" value={draft.footer.copyright} onChange={(v) => set("footer", { ...draft.footer, copyright: v })} />
                <T label="邮箱" value={draft.footer.email} onChange={(v) => set("footer", { ...draft.footer, email: v })} />
                <T label="电话" value={draft.footer.phone} onChange={(v) => set("footer", { ...draft.footer, phone: v })} />
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-900 pt-6 space-y-4">
                <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">导航栏</h3>
                <T label="品牌名" value={draft.nav.brand} onChange={(v) => set("nav", { ...draft.nav, brand: v })} />
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-900 pt-6 space-y-4">
                <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">SEO</h3>
                <T label="网站标题" value={draft.seo.title} onChange={(v) => set("seo", { ...draft.seo, title: v })} />
                <T label="网站描述" area value={draft.seo.description} onChange={(v) => set("seo", { ...draft.seo, description: v })} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部保存栏 */}
      <div className="fixed bottom-0 inset-x-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-zinc-200/60 dark:border-zinc-800/60 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400 hidden sm:block">保存在浏览器 IndexedDB 中。容量几乎无限。</span>
          {(() => {
            const { used, percent } = storageInfo;
            const displaySize = used < 1024 * 1024
              ? `${(used / 1024).toFixed(0)}KB`
              : `${(used / 1024 / 1024).toFixed(1)}MB`;
            return (
              <span className={`text-[10px] font-medium ${percent > 80 ? "text-red-500" : percent > 50 ? "text-amber-500" : "text-zinc-400"}`}>
                已用 {displaySize} ({percent}%)
              </span>
            );
          })()}
        </div>
        <div className="flex gap-3 ml-auto">
          <button onClick={handleReset} className="text-xs px-4 py-2 rounded-lg border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">恢复默认</button>
          <button onClick={handleSave} className={`text-xs px-6 py-2 rounded-lg font-medium transition-all ${saved ? "bg-emerald-500 text-white" : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-80"}`}>
            {saved ? "已保存 ✓" : "保存所有修改"}
          </button>
        </div>
      </div>
    </div>
  );
}
