/*
 * 管理后台数据存储 —— 基于 IndexedDB
 *
 * 原理：
 * 1. 所有改动保存在浏览器的 IndexedDB 里（无容量限制）
 * 2. 有改动时优先用 IndexedDB 的版本，没有则用 data/site-data.ts 的默认值
 * 3. 图片以 base64 格式存储
 * 4. 点击「恢复默认」可以清空所有改动
 */

import { navData, heroData, projectsData, workflowData, futureVisionData, vibeCodingData, galleryData, aboutData, footerData, seoData } from "@/data/site-data";

const DB_NAME = "zhusiyuan-admin";
const DB_VERSION = 1;
const STORE_NAME = "data";
const KEY = "admin-data";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE_NAME)) {
        req.result.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export type AdminData = {
  nav: typeof navData;
  hero: typeof heroData;
  projects: typeof projectsData;
  workflow: typeof workflowData;
  futureVision: typeof futureVisionData;
  vibeCoding: typeof vibeCodingData;
  gallery: typeof galleryData;
  about: typeof aboutData;
  footer: typeof footerData;
  seo: typeof seoData;
};

export function getDefaultData(): AdminData {
  return {
    nav: JSON.parse(JSON.stringify(navData)),
    hero: JSON.parse(JSON.stringify(heroData)),
    projects: JSON.parse(JSON.stringify(projectsData)),
    workflow: JSON.parse(JSON.stringify(workflowData)),
    futureVision: JSON.parse(JSON.stringify(futureVisionData)),
    vibeCoding: JSON.parse(JSON.stringify(vibeCodingData)),
    gallery: JSON.parse(JSON.stringify(galleryData)),
    about: JSON.parse(JSON.stringify(aboutData)),
    footer: JSON.parse(JSON.stringify(footerData)),
    seo: JSON.parse(JSON.stringify(seoData)),
  };
}

function migrateFromLocalStorage(): AdminData | null {
  try {
    const raw = localStorage.getItem("zhusiyuan-admin-data");
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<AdminData>;
    const defaults = getDefaultData();
    const merged: AdminData = {
      nav: { ...defaults.nav, ...saved.nav },
      hero: { ...defaults.hero, ...saved.hero },
      projects: saved.projects || defaults.projects,
      workflow: { ...defaults.workflow, ...saved.workflow },
      futureVision: { ...defaults.futureVision, ...saved.futureVision },
      vibeCoding: { ...defaults.vibeCoding, ...saved.vibeCoding },
      gallery: { ...defaults.gallery, ...saved.gallery },
      about: { ...defaults.about, ...saved.about },
      footer: { ...defaults.footer, ...saved.footer },
      seo: { ...defaults.seo, ...saved.seo },
    };
    localStorage.removeItem("zhusiyuan-admin-data");
    return merged;
  } catch {
    return null;
  }
}

export async function loadData(): Promise<AdminData> {
  if (typeof window === "undefined") return getDefaultData();
  try {
    const db = await openDB();
    const raw = await new Promise<any>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(KEY);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    db.close();

    // 迁移 legacy localStorage 数据到 IndexedDB
    if (!raw) {
      const legacy = migrateFromLocalStorage();
      if (legacy) {
        await saveData(legacy);
        return legacy;
      }
    }

    if (raw) {
      const saved = raw as Partial<AdminData>;
      const defaults = getDefaultData();
      return {
        nav: defaults.nav,
        hero: { ...defaults.hero, ...saved.hero },
        projects: saved.projects || defaults.projects,
        workflow: { ...defaults.workflow, ...saved.workflow },
        futureVision: { ...defaults.futureVision, ...saved.futureVision },
        vibeCoding: { ...defaults.vibeCoding, ...saved.vibeCoding },
        gallery: { ...defaults.gallery, ...saved.gallery },
        about: { ...defaults.about, ...saved.about },
        footer: { ...defaults.footer, ...saved.footer },
        seo: { ...defaults.seo, ...saved.seo },
      };
    }
  } catch {
    // ignore errors
  }
  return getDefaultData();
}

export async function getStorageUsage(): Promise<{ used: number; total: number; percent: number }> {
  if (typeof window === "undefined") return { used: 0, total: Infinity, percent: 0 };
  try {
    const estimate = await navigator.storage?.estimate?.();
    if (estimate) {
      const used = estimate.usage || 0;
      const total = estimate.quota || 0;
      return { used, total, percent: total > 0 ? Math.round((used / total) * 100) : 0 };
    }
  } catch {
    // ignore
  }
  return { used: 0, total: Infinity, percent: 0 };
}

export async function saveData(data: AdminData): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(data, KEY);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch (e) {
    console.error("IndexedDB 写入失败:", e);
    alert("保存失败，请重试。");
  }
}

export async function resetData(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(KEY);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // ignore
  }
}

export async function hasCustomData(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const db = await openDB();
    const raw = await new Promise<any>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(KEY);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    db.close();
    return raw !== undefined;
  } catch {
    return false;
  }
}

/* ============================================================
 * 图片上传工具
 * ============================================================ */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // 非图片文件（如 PDF）直接读取不压缩
    if (!file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    // 图片文件：先压缩再转 base64
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const maxW = 1600;
      let { width, height } = img;
      if (width > maxW) {
        height = Math.round((height * maxW) / width);
        width = maxW;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      // 降级：直接读取
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    };
    img.src = url;
  });
}
