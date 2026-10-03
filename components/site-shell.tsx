"use client";
import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, ReactNode } from "react";
import { ArrowUpRight, Menu, Globe2, X } from "lucide-react";
import { useKobags } from "./kobags-context";
import { contentPath, languageHref } from "@/lib/site-locale";
export function Header() {
  const { t, lang, setLang, storageStatus } = useKobags();
  const [open, setOpen] = useState(false);
  const path = contentPath(usePathname());
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => navigation.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true }));
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("keydown", close); };
  }, [open]);
  return (
    <>
      <header className="header">
        <Link href="/" className="brand" aria-label={t("Kobags Group home", "Ballina e Kobags Group")}>
          <span className="brand-wordmark">
            <img
              src="/assets/logo-web.png"
              alt="Kobags Group"
              width="344"
              height="95"
            />
          </span>
        </Link>
        <nav
          ref={navigation}
          id="site-navigation"
          className={open ? "nav open" : "nav"}
          aria-label={t("Main navigation", "Navigimi kryesor")}
          onBlur={(event) => { if (open && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node) && event.relatedTarget !== menuButton.current) setOpen(false); }}
        >
          {[
            ["/", "Home", "Ballina"],
            ["/products", "Our bags", "Çantat tona"],
            ["/design", "Design studio", "Studioja"],
            ["/manufacturing", "Manufacturing", "Prodhimi"],
            ["/sustainability", "Our responsibility", "Përgjegjësia jonë"],
            ["/partners", "Partners", "Partnerët"],
          ].map(([href, en, sq]) => (
            <Link
              key={href}
              href={href}
              className={
                path === href || (href !== "/" && path.startsWith(href + "/"))
                  ? "active"
                  : ""
              }
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t(en, sq)}
            </Link>
          ))}
          <Link
            href="/quote"
            className="nav-quote"
            onClick={() => setOpen(false)}
          >
            {t("Request a quote", "Kërko ofertë")} <ArrowUpRight size={16} />
          </Link>
        </nav>
        <div className="header-actions">
          <a
            className="language"
            href={languageHref(path, lang === "en" ? "sq" : "en")}
            hrefLang={lang === "en" ? "sq" : "en"}
            onClick={(event) => { event.preventDefault(); setLang(lang === "en" ? "sq" : "en"); }}
            aria-label={
              lang === "en" ? "EN: Switch to Albanian" : "SQ: Kalo në anglisht"
            }
          >
            <Globe2 size={16} />
            {lang.toUpperCase()}
          </a>
          <Link href="/quote" className="button small navy">
            {t("Request a quote", "Kërko ofertë")} <ArrowUpRight size={16} />
          </Link>
          <button
            className="mobile-toggle icon-button"
            ref={menuButton}
            aria-controls="site-navigation"
            aria-label={t("Toggle menu", "Hap ose mbyll menynë")}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {storageStatus !== "persistent" && (
        <p className="draft-storage-notice" role="status">{storageStatus === "session"
          ? t("Your design is saved for this tab only. Keep this tab open until you send your request.", "Dizajni ruhet vetëm në këtë skedë. Mbajeni të hapur derisa ta dërgoni kërkesën.")
          : t("Your browser cannot save this design. Download a preview before leaving, or allow browser storage to continue safely.", "Shfletuesi nuk mund ta ruajë dizajnin. Shkarkoni parapamjen para se të largoheni, ose lejoni ruajtjen në shfletues.")}</p>
      )}
    </>
  );
}
export function Footer() {
  const { t } = useKobags();
  return (
    <footer className="footer footer-v5">
      <div className="footer-invitation">
        <div>
          <p className="eyebrow">
            {t(
              "START WITH YOUR DESIGN",
              "FILLONI ME DIZAJNIN TUAJ",
            )}
          </p>
          <h2>
            {t("Put your brand", "Vendosni markën tuaj")}
            <br />
            <em>{t("on the bag.", "mbi çantë.")}</em>
          </h2>
        </div>
        <Link
          href="/design"
          className="footer-design-link"
          aria-label={t(
            "Design your next bag",
            "Dizajnoni çantën tuaj të ardhshme",
          )}
        >
          <ArrowUpRight size={38} />
        </Link>
      </div>
      <div className="footer-top">
        <div>
          <img
            src="/assets/logo-web.png"
            width="344"
            height="95"
            alt="Kobags Group"
            loading="lazy"
          />
          <p>
            {t("Non-woven bag manufacturing.", "Prodhimi i çantave jo të endura.")}
            <br />
            Kosova
          </p>
        </div>
        <div>
          <h3>{t("Explore", "Eksploro")}</h3>
          <Link href="/products">{t("Our bags", "Çantat tona")}</Link>
          <Link href="/design">{t("Design studio", "Studioja")}</Link>
          <Link href="/industries">{t("Industries", "Industritë")}</Link>
          <Link href="/manufacturing">{t("Manufacturing", "Prodhimi")}</Link>
        </div>
        <div>
          <h3>{t("Good to know", "Informacione")}</h3>
          <Link href="/resources">{t("Buyer resources", "Burime për blerësit")}</Link>
          <Link href="/blog">{t("Journal & guides", "Artikuj dhe udhëzues")}</Link>
          <Link href="/certifications">{t("Certifications", "Certifikimet")}</Link>
          <Link href="/samples">{t("Request samples", "Kërkoni mostra")}</Link>
        </div>
        <div>
          <h3>{t("Let’s talk bags", "Le të flasim për çantat")}</h3>
          <a href="mailto:info@kobags-group.com">info@kobags-group.com</a>
          <a href="tel:+38343877753">+383 43 877 753</a>
          <Link href="/contact">
            {t("General inquiries", "Pyetje të përgjithshme")} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Kobags Group</span>
        <div>
          <Link href="/privacy">{t("Privacy", "Privatësia")}</Link>
          <Link href="/terms">{t("Terms", "Kushtet")}</Link>
          <Link href="/cookies">{t("Cookies", "Cookies")}</Link>
        </div>
      </div>
    </footer>
  );
}
export function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <p className="intro">{children}</p>}
    </div>
  );
}
