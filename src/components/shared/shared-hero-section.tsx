import Image from "next/image";
import type { ReactNode } from "react";

type HeroSectionProps = {
  title: string;
  summary: string;
  /** The page's one button, under the summary: a link or a button the page makes. Left out when the page has none. */
  action?: ReactNode;
  /** As on geekatyourspot.com's home hero: the large block shows the image in the five columns beside the text. The phone block has none. */
  image?: string;
  imgAlt?: string;
  /**
   * What the five columns beside the text hold when there is no image, for a page whose first screen is something to fill in. It is a
   * function of the id suffix because both blocks render it: the phone block passes "" and the large block passes "-lg", so no id is
   * on the page twice.
   */
  children?: (idSuffix: string) => ReactNode;
};

/**
 * The one hero every page of this site opens with, written the way geekatyourspot.com writes its hero (src/components/home/hero-section.tsx
 * there): two blocks, a phone block with lg:hidden and a large block with hidden lg:block, each with its own classes and its own navy
 * background, never one responsive block. The large block is twelve columns, the text in seven and the other five beside it.
 */
export default function HeroSection({ title, summary, action, image, imgAlt, children }: HeroSectionProps) {
  return (
    <>
      <header className="min-h-screen w-full bg-[#0B162A] lg:hidden">
        <div className="container">
          <div className="grid min-h-screen grid-cols-1 place-items-center">
            <div className="col-span-1 w-full">
              <h1 className="font-[var(--font-sora)] text-[9vw] font-black leading-[0.95] text-white shadow-text sm:text-6xl md:text-7xl">{title}</h1>
              <p className="pt-3 text-xl text-white shadow-text">{summary}</p>
              {action ? <div className="pt-6">{action}</div> : null}
              {children ? <div className="pt-8 text-white">{children("")}</div> : null}
            </div>
          </div>
        </div>
      </header>

      <header className="hidden min-h-screen bg-[#0B162A] lg:block">
        <div className="container min-h-screen">
          <div className="grid min-h-screen grid-cols-12 place-items-center">
            <div className="col-span-7">
              <h1 className="font-[var(--font-sora)] font-black leading-[0.95] text-white shadow-text lg:text-[4.0rem]">{title}</h1>
              <p className="pt-3 text-2xl text-white shadow-text">{summary}</p>
              {action ? <div className="pt-8">{action}</div> : null}
            </div>
            <div className="col-span-5 flex min-h-screen flex-col items-center justify-center text-center text-white">
              {image ? (
                <Image src={image} width={1024} height={1024} sizes="(min-width: 1024px) 42vw, 1px" priority alt={imgAlt ?? ""} className="h-auto w-full" />
              ) : children ? (
                children("-lg")
              ) : null}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
