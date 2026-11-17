import Image from "next/image";
import Link from "next/link";
import { gtmLinkIdFromHref } from "@/lib/gtm/link-id";

/** geekatyourspot.com's top bar (src/components/layout/navbar.tsx there): sticky, 4rem tall, white, the logo on the left. It has no menu. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-[60] h-16 border-b border-black/10 bg-white shadow-sm">
      <div className="container h-full">
        <div className="flex h-full w-full items-center">
          <Link href="/" id={gtmLinkIdFromHref("/", "logo")} className="flex items-center">
            <Image src="/images/GeekAtYourSpot.svg" alt="Geek @ Your Spot LLC logo" width={116} height={48} priority />
          </Link>
        </div>
      </div>
    </header>
  );
}
