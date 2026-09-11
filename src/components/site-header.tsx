import { MobileNav } from "@/components/mobile-nav";
import { emailHref, navItems, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand-link" href="#top" aria-label={`${siteConfig.name}, back to top`}>
          <span className="brand-mark" aria-hidden="true" />
          <span>{siteConfig.brand}</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="button button-secondary button-small header-cta" href={emailHref}>
            Email me
          </a>
          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  );
}
