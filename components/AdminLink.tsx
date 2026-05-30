"use client";

export default function AdminLink() {
  return (
    <a
      href="/admin"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg hover:scale-110 transition-transform text-xs font-medium"
      title="管理后台"
    >
      &#9998;
    </a>
  );
}
