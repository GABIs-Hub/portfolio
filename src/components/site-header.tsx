import Link from "next/link";
import { Menu } from "lucide-react";

import { navItems, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-link" href="#top" aria-label={`${siteConfig.name} home`}>
        <span>{siteConfig.brand}</span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <details className="mobile-nav">
        <summary aria-label="Open navigation">
          <Menu aria-hidden="true" size={20} />
        </summary>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
