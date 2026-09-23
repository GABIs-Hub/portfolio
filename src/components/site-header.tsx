import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { cv, navItems, siteConfig } from "@/lib/site";

/** Renders the responsive site header, navigation, and CV action. */
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
          <a
            className="button button-secondary button-small header-cta"
            href={cv.href}
            download={cv.fileName}
            type="application/pdf"
          >
            {cv.label}
          </a>
          <ThemeToggle />
          <MobileNav items={navItems} cv={cv} />
        </div>
      </div>
    </header>
  );
}
