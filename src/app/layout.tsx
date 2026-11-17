import type { Metadata } from "next";
import { Figtree, Sora } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

// The two faces of geekatyourspot.com, loaded the way its layout.tsx loads them: Sora for headings, Figtree as --font-sans for everything else.
const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-sora", weight: ["400", "500", "600", "700"] });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" className={`h-full w-full antialiased font-sans ${figtree.variable} ${sora.variable}`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
