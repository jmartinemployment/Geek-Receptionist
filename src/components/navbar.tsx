import Image from "next/image";
import Link from "next/link";

type MenuLink = { label: string; href: string };
type MenuItem = { label: string; href?: string; links?: MenuLink[] };

/** The top bar's menu (Jeff, 2026-11-18). A group opens on hover or keyboard focus; a plain item is a link. */
const MENU: MenuItem[] = [
  {
    label: "Solutions",
    links: [
      { label: "Customer Service", href: "/solutions/customer-service" },
      { label: "Marketing", href: "/solutions/marketing" },
    ],
  },
  { label: "Platform", links: [{ label: "Dashboard", href: "/dashboard" }] },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const itemClass = "px-3 py-2 text-sm font-bold text-[#0B162A] hover:text-[#c83803] transition-colors";

/** geekatyourspot.com's top bar (src/components/layout/navbar.tsx there): sticky, 4rem tall, white, the logo on the left, the menu on the right. */
export function Navbar() {
  return (
    <header className="z-[60] h-16 border-b border-black/10 bg-white shadow-sm">
      <div className="container h-full">
        <div className="flex h-full w-full items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/GeekAtYourSpot.svg" alt="Geek @ Your Spot LLC logo" width={116} height={48} priority />
          </Link>
          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              {MENU.map((item) =>
                item.links ? (
                  <li key={item.label} className="group relative">
                    <button type="button" className={itemClass} aria-haspopup="true">
                      {item.label}
                    </button>
                    <ul className="invisible absolute right-0 top-full z-[70] min-w-48 rounded-md border border-black/10 bg-white py-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className={`block ${itemClass}`}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link href={item.href!} className={itemClass}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
