import type { Metadata } from "next";
import { Figtree, Sora } from "next/font/google";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import "./globals.css";

// The two faces of geekatyourspot.com: Sora for headings, Figtree for everything else.
const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-sora", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: "Geek-Receptionist",
  description: "Sign in to manage your AI receptionist.",
  robots: { index: false, follow: false },
  // geekatyourspot.com's own icons, set the same way as its layout.tsx.
  icons: {
    icon: { url: "/favicon.gif", type: "image/gif" },
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${figtree.variable}`}>
      <body className="min-h-dvh">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
