"use client";

import { useEffect, useId, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ui } from "@/lib/ui";

const noSubscription = () => () => {};

/**
 * A white dialog over a dimmed layer. It is a plain fixed layer in the body, not a native dialog, because Google's picture challenge
 * opens in the body and a native dialog would sit over it. While it is open the rest of the page is inert, so the keyboard cannot reach
 * what is behind it. Escape or a click on the dimmed layer closes it.
 */
export function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const host = useSyncExternalStore(noSubscription, () => document.body, () => null);
  const titleId = useId();

  useEffect(() => {
    if (!host) return;
    const behind = [...document.querySelectorAll("body > header, body > main, body > footer")];
    for (const element of behind) element.setAttribute("inert", "");
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      for (const element of behind) element.removeAttribute("inert");
      document.documentElement.style.overflow = overflow;
    };
  }, [host, onClose]);

  if (!host) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="w-full max-w-sm rounded-md bg-white p-5 text-[#0B162A]">
        <h2 id={titleId} className={ui.h2}>
          {title}
        </h2>
        {children}
      </div>
    </div>,
    host,
  );
}
