import type { Metadata } from "next";
import { Sora, Geist } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";
import { cn } from "@/lib/utils";

// Two faces: Sora for headings, Geist as --font-sans for everything else. geekatyourspot.com uses Figtree for the second of
// those; this site does not, and the import that said otherwise was never used.
const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-sora", weight: ["400", "500", "600", "700"] });
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("h-full", "w-full", "antialiased", sora.variable, "font-sans", geist.variable)}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
