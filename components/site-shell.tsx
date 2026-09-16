"use client";
import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, ReactNode } from "react";
import { ArrowUpRight, Menu, Globe2, X } from "lucide-react";
import { useKobags } from "./kobags-context";
export function Header() {
  const { t, lang, setLang } = useKobags();
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <div className="utility">
        <span>
          {t(
            "Made in Kosovo. Made for your brand.",
            "Prodhuar në Kosovë. Për markën tuaj.",
          )}
        </span>
        <Link href="/demo/customer">
          {t("Customer demo", "Demo për klientin")} <ArrowUpRight size={13} />
        </Link>
      </div>
      <header className="header">
        <Link href="/" className="brand" aria-label="Kobags Group home">
          <span className="brand-wordmark">
            <img
              src="/assets/logo.png"
              alt="Kobags Group"
              width="172"
              height="52"
            />
          </span>
        </Link>
        <nav
          id="site-navigation"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
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
          <button
            className="language"
            onClick={() => setLang(lang === "en" ? "sq" : "en")}
            aria-label={
              lang === "en" ? "Switch to Albanian" : "Kalo në anglisht"
            }
          >
            <Globe2 size={16} />
            {lang.toUpperCase()}
          </button>
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
              "MADE HERE. CARRIED EVERYWHERE.",
              "PRODHUAR KËTU. MBAJTUR KUDO.",
            )}
          </p>
          <h2>
            {t("Let’s make your", "Le ta krijojmë")}
            <br />
            <em>{t("next brand moment.", "momentin tuaj të ardhshëm.")}</em>
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
            src="/assets/logo.png"
            width="164"
            height="50"
            alt="Kobags Group"
          />
          <p>
            {t("Your brand, carried further.", "Marka juaj, më larg.")}
            <br />
            Lipjan, Kosovo
          </p>
        </div>
        <div>
          <h3>{t("Explore", "Eksploro")}</h3>
          <Link href="/products">Our bags</Link>
          <Link href="/design">Design studio</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/manufacturing">Manufacturing</Link>
        </div>
        <div>
          <h3>{t("Good to know", "Informacione")}</h3>
          <Link href="/resources">Buyer resources</Link>
          <Link href="/blog">Journal & guides</Link>
          <Link href="/certifications">Certifications</Link>
          <Link href="/samples">Request samples</Link>
        </div>
        <div>
          <h3>{t("Let’s talk bags", "Le të flasim për çantat")}</h3>
          <span>info@kobags-group.com</span>
          <span>+383 43 877 753</span>
          <Link href="/contact">
            General inquiries <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Kobags Group · Interactive concept demo</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/demo/admin">Sales demo ↗</Link>
          <Link href="/handoff">Site outline & handoff ↗</Link>
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
