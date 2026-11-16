"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Grecaptcha = {
  ready(callback: () => void): void;
  render(container: HTMLElement, options: { sitekey: string }): number;
  reset(widget?: number): void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

/**
 * The "I'm not a robot" checkbox inside a form. Google puts its answer in the form as g-recaptcha-response, which the Server Action
 * checks. An answer counts once, so the box is cleared whenever `answered` changes, that is after each try the form sends back.
 */
export function Captcha({ siteKey, answered }: { siteKey: string; answered: unknown }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const grecaptcha = window.grecaptcha;
    if (!loaded || !grecaptcha) return;
    grecaptcha.ready(() => {
      if (box.current && widget.current === null) widget.current = grecaptcha.render(box.current, { sitekey: siteKey });
    });
  }, [loaded, siteKey]);

  useEffect(() => {
    if (widget.current !== null) window.grecaptcha?.reset(widget.current);
  }, [answered]);

  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js?render=explicit" strategy="afterInteractive" onReady={() => setLoaded(true)} />
      <div ref={box} className="my-2 min-h-[78px]" />
    </>
  );
}
