import Image from "next/image";
import type { ReactNode } from "react";

type HeroSectionProps = {
  title: string;
  summary: string;
  /** The page's one button, under the summary: a link or a button the page makes. Left out when the page has none. */
  action?: ReactNode;
  /** Optional, as on geekatyourspot.com's home hero: with an image the five columns beside the text show it; on a phone it sits above the heading, small. */
  image?: string;
  imgAlt?: string;
  /** What the five columns beside the text hold when there is no image, for a page whose first screen is something to fill in. */
  children?: ReactNode;
};

/**
 * The one hero every page of this site opens with, after geekatyourspot.com's src/components/shared/shared-hero-section.tsx: a navy
 * screen with the H1, a one-sentence summary and the orange button, the text in seven of twelve columns and the other five beside it.
 * That site writes the hero twice, a phone block and a desktop block. This one is a single block that stacks on a phone, because the
 * five columns can hold a form, and a form written twice would be in the page twice with the same ids.
 */
export default function HeroSection({ title, summary, action, image, imgAlt, children }: HeroSectionProps) {
  return (
    <main className="bg-[#0B162A] lg:min-h-screen">
      <div className="container lg:min-h-screen">
        <div className="grid grid-cols-1 place-items-center gap-x-4 gap-y-8 py-10 lg:min-h-screen lg:grid-cols-12">
          <div className="w-full lg:col-span-7">
            <h1 className="font-black font-(--font-sora) text-[9vw] leading-[0.95] text-white shadow-text sm:text-6xl md:text-7xl lg:text-[4.0rem]">
              {title}
            </h1>
            <p className="pt-3 text-xl text-white shadow-text lg:text-2xl">{summary}</p>
            {action ? <div className="pt-6">{action}</div> : null}
          </div>
          <div className="flex flex-col items-center justify-center min-h-screen lg:col-span-5">
            {image ? (
              <Image src={image} width={1024} height={1024} sizes="(min-width: 1024px) 42vw, 16rem" priority alt={imgAlt ?? ""} className="h-auto w-full" />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
