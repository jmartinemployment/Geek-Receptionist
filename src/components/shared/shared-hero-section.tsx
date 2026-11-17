import Image from "next/image";
import Link from "next/link";
import { ui } from "@/lib/ui";

type HeroSectionProps = {
  title: string;
  summary: string;
  /** The page's one button: its label and where it goes. */
  action: { href: string; label: string };
  /** Optional, as on geekatyourspot.com: with an image the five columns beside the text show it, without one they stay empty. */
  image?: string;
  imgAlt?: string;
};

/**
 * The one hero every page of this site opens with, the same as geekatyourspot.com's src/components/shared/shared-hero-section.tsx: a navy
 * screen with the H1, a one-sentence summary and the orange button. Like that site it is written twice on purpose, a phone block and a
 * desktop block, where the desktop text takes seven of twelve columns.
 */
export default function HeroSection({ title, summary, action, image, imgAlt }: HeroSectionProps) {
  return (
    <>
      <section className="min-h-screen bg-[#0B162A] lg:hidden">
        <div className="container min-h-screen">
          <div className="grid min-h-screen grid-cols-1 place-items-center">
            <div className="col-span-full">
              <h1 className="font-black font-(--font-sora) text-[9vw] leading-[0.95] text-white shadow-text sm:text-6xl md:text-7xl">{title}</h1>
              <p className="pt-3 text-xl text-white shadow-text">{summary}</p>
              <div className="pt-6">
                <Link href={action.href} className={ui.button}>
                  {action.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden min-h-screen bg-[#0B162A] lg:block">
        <div className="container min-h-screen">
          <div className="grid min-h-screen grid-cols-12 place-items-center gap-x-4">
            <div className="col-span-7">
              <h1 className="font-black font-(--font-sora) leading-[0.95] text-white shadow-text lg:text-[4.0rem]">{title}</h1>
              <p className="pt-3 text-2xl text-white shadow-text">{summary}</p>
              <div className="pt-6">
                <Link href={action.href} className={ui.button}>
                  {action.label}
                </Link>
              </div>
            </div>
            <div className="col-span-5 flex min-h-screen flex-col items-center justify-center">
              {image ? <Image width={460} height={460} src={image} alt={imgAlt ?? ""} loading="eager" /> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
