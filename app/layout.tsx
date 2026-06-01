import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteDataProvider } from "@/lib/site-data-context";
import { seoData } from "@/data/site-data";
import ViewfinderHUD from "@/components/ViewfinderHUD";
import EasterEggDog from "@/components/EasterEggDog";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-white">
        <SiteDataProvider>{children}</SiteDataProvider>
        <ViewfinderHUD />
        <EasterEggDog />
      </body>
    </html>
  );
}
