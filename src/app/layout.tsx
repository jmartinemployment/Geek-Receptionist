import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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
    <html lang="en">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
