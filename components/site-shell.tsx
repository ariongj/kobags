"use client";
import { CmsContact, CmsSocialProfiles } from "./cms/public-extras";
import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, ReactNode } from "react";
import { ArrowUpRight, Menu, Globe2, X, MessageCircle } from "lucide-react";
import { useKobags } from "./kobags-context";
import { contentPath, languageHref } from "@/lib/site-locale";
export function Header() {
  const { t, lang, storageStatus, studioEnabled } = useKobags();
  const [open, setOpen] = useState(false);
  const path = contentPath(usePathname());
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const languageLink = useRef<HTMLAnchorElement>(null);
  const syncLanguageLink = useCallback(() => {
    if (languageLink.current)
      languageLink.current.href = languageHref(location.pathname + location.search + location.hash, lang === "en" ? "sq" : "en");
  }, [lang]);
  useEffect(() => {
    syncLanguageLink();
    window.addEventListener("hashchange", syncLanguageLink);
    window.addEventListener("popstate", syncLanguageLink);
    window.addEventListener("pageshow", syncLanguageLink);
    return () => {
      window.removeEventListener("hashchange", syncLanguageLink);
      window.removeEventListener("popstate", syncLanguageLink);
      window.removeEventListener("pageshow", syncLanguageLink);
    };
  }, [path, syncLanguageLink]);
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
        <Link href="/" className="brand" aria-label={t("Kobags home", "Ballina e Kobags")}>
          <span className="brand-wordmark">
            <img
              src="/assets/logo-web.png"
              alt="Kobags"
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
            ["/products", "Choose your bag", "Zgjidhni çantën tuaj"],
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
            ref={languageLink}
            className="language"
            href={languageHref(path, lang === "en" ? "sq" : "en")}
            hrefLang={lang === "en" ? "sq" : "en"}
            onFocus={syncLanguageLink}
            onPointerDown={syncLanguageLink}
            onContextMenu={syncLanguageLink}
            onClick={() => {
              // Receipt URLs can change with replaceState without a navigation event.
              // Keep the native anchor action, including modified clicks and new tabs.
              syncLanguageLink();
              try { localStorage.setItem("kobags-language", lang === "en" ? "sq" : "en"); } catch {}
            }}
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
      {studioEnabled && storageStatus !== "persistent" && (
        <p className="draft-storage-notice" role="status">{storageStatus === "session"
          ? t("Your design is saved for this tab only. Keep this tab open until you send your request.", "Dizajni ruhet vetëm në këtë skedë. Mbajeni të hapur derisa ta dërgoni kërkesën.")
          : t("Your browser cannot save this design. Download a preview before leaving, or allow browser storage to continue safely.", "Shfletuesi nuk mund ta ruajë dizajnin. Shkarkoni parapamjen para se të largoheni, ose lejoni ruajtjen në shfletues.")}</p>
      )}
    </>
  );
}
export function Footer() {
  const { t, studioEnabled } = useKobags();
  return (
    <footer className="footer footer-v5">
      <div className="footer-invitation">
        <div>
          <p className="eyebrow">
            {t(
              "LET’S PLAN YOUR ORDER",
              "LE TË PLANIFIKOJMË POROSINË TUAJ",
            )}
          </p>
          <h2>
            {t("Put your brand", "Vendosni markën tuaj")}
            <br />
            <em>{t("on the bag.", "mbi çantë.")}</em>
          </h2>
        </div>
        <Link
          href={studioEnabled ? "/design" : "/quote"}
          className="footer-design-link"
          aria-label={t(
            "Request a quote for your next bag",
            "Kërkoni ofertë për çantën tuaj të ardhshme",
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
          <Link href="/products">{t("Choose your bag", "Zgjidhni çantën tuaj")}</Link>
          <Link href="/design">{t("Design studio", "Studioja")}</Link>
          <Link href="/industries">{t("Industries", "Industritë")}</Link>
          <Link href="/manufacturing">{t("Manufacturing", "Prodhimi")}</Link>
        </div>
        <div>
          <h3>{t("Good to know", "Informacione")}</h3>
          <Link href="/bags-kosovo">{t("Bags across Kosovo", "Çanta në tërë Kosovën")}</Link>
          <Link href="/resources">{t("Buyer resources", "Burime për blerësit")}</Link>
          <Link href="/blog">{t("Journal & guides", "Artikuj dhe udhëzues")}</Link>
          <Link href="/certifications">{t("Certifications", "Certifikimet")}</Link>
          <Link href="/samples">{t("Request samples", "Kërkoni mostra")}</Link>
        </div>
        <div>
          <h3>{t("Let’s talk bags", "Le të flasim për çantat")}</h3>
          <CmsContact part="email"/>
          <CmsContact part="phone"/>
          <a href="https://wa.me/38343877753" target="_blank" rel="noopener noreferrer">WhatsApp · +383 43 877 753</a>
          <CmsSocialProfiles />
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
export function WhatsAppContact() {
  const { t } = useKobags();
  const path = contentPath(usePathname());
  if (/^\/(?:cms|design|quote|request)(?:\/|$)/.test(path) || path.startsWith("/products/") || ["/contact", "/samples", "/partners/apply"].includes(path)) return null;
  return (
    <aside aria-label={t("Quick contact", "Kontakt i shpejtë")}><a
      className="whatsapp-contact"
      href="https://wa.me/38343877753"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("Contact Kobags on WhatsApp: +383 43 877 753", "Kontaktoni Kobags në WhatsApp: +383 43 877 753")}
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span>WhatsApp</span>
    </a></aside>
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
