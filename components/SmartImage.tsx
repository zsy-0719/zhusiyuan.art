"use client";

import Image from "next/image";

/**
 * 智能图片组件：
 * - 有 fill 属性 → Next.js Image（需父容器有 relative + 固定尺寸）
 * - 无 fill 属性 → 普通 img 标签（自适应宽高，支持 object-contain）
 * - base64 数据 → 始终使用 img 标签
 */
export default function SmartImage({
  src,
  alt,
  fill,
  className = "",
  sizes,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}) {
  if (!src) return null;

  const isBase64 = src.startsWith("data:");

  // base64 或非 fill 模式 → 普通 img（不用 loading="lazy"，Safari 有 bug 会不加载）
  if (isBase64 || !fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
      />
    );
  }

  // fill 模式 → Next.js Image（父容器需 relative + 确定尺寸）
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
    />
  );
}
