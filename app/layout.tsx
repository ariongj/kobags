import type { Metadata } from "next";
import "./globals.css";
import "./brand-refresh.css";
import "./compact.css";
import { KobagsProvider } from "@/components/kobags-context";
import { LocalizedCopy } from "@/components/localized-copy";
import { Header, Footer } from "@/components/site-shell";
import { requestLanguage } from "@/lib/seo";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/seo-config";
import StructuredData from "@/components/structured-data";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Kobags Group | Manufacturing bags. Building brands.",
    template: "%s | Kobags Group",
  },
  description:
    "Non-woven bag manufacturing in Kosova. Explore the factory, customize a bag in the interactive 3D studio and plan your next wholesale order.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/favicon.png" },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await requestLanguage();
  return (
    <html lang={lang}>
      <body className="kobags-v5">
        <KobagsProvider initialLanguage={lang}>
          <StructuredData data={{ "@context": "https://schema.org", "@graph": [
            { "@type": "Organization", "@id": SITE_ORIGIN + "/#organization", name: SITE_NAME, url: SITE_ORIGIN + "/", logo: SITE_ORIGIN + "/assets/logo.png", email: "info@kobags-group.com", telephone: "+38343877753" },
            { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website", name: SITE_NAME, url: SITE_ORIGIN + "/", publisher: { "@id": SITE_ORIGIN + "/#organization" }, inLanguage: ["en", "sq"] },
          ] }} />
          <a href="#main-content" className="skip-link">
            <LocalizedCopy en="Skip to content" sq="Kalo te përmbajtja" />
          </a>
          <Header />
          <div id="main-content">{children}</div>
          <Footer />
        </KobagsProvider>
      </body>
    </html>
  );
}
