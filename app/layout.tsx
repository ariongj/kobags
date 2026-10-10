import type { Metadata } from "next";
import "./globals.css";
import "./brand-refresh.css";
import "./compact.css";
import "./cms.css";
import "./responsibility.css";
import { KobagsProvider } from "@/components/kobags-context";
import { LocalizedCopy } from "@/components/localized-copy";
import { Header, Footer } from "@/components/site-shell";
import { requestLanguage } from "@/lib/seo";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/seo-config";
import { company } from "@/lib/company";
import { publishedRecords } from "@/lib/cms/records";
import { CmsCampaigns } from "@/components/cms/public-extras";
import { CmsPublicProvider } from "@/components/cms/public-context";
import StructuredData from "@/components/structured-data";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Kobags Group | Manufacturing bags. Helping Brands.",
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
  const cms = (await publishedRecords()).map(r=>({id:r.id,kind:r.kind,slug:r.slug,revision:r.revision,content:r.published!}));
  const settings=cms.find(r=>r.kind==='settings')?.content.settings;
  return (
    <html lang={lang}>
      <body className="kobags-v5">
        <CmsPublicProvider records={cms}><KobagsProvider initialLanguage={lang}>
          <StructuredData data={{ "@context": "https://schema.org", "@graph": [
            { "@type": "Organization", "@id": SITE_ORIGIN + "/#organization", name: SITE_NAME, url: SITE_ORIGIN + "/", logo: SITE_ORIGIN + "/assets/logo.png", email: settings?.email||company.email, telephone: settings?.phone||company.telephone, address: { "@type": "PostalAddress", streetAddress: settings?.address||company.streetAddress, addressCountry: company.country }, areaServed: { "@type": "Country", name: company.country } },
            { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website", name: SITE_NAME, url: SITE_ORIGIN + "/", publisher: { "@id": SITE_ORIGIN + "/#organization" }, inLanguage: ["en", "sq"] },
          ] }} />
          <a href="#main-content" className="skip-link">
            <LocalizedCopy en="Skip to content" sq="Kalo te përmbajtja" />
          </a>
          <Header />
          <CmsCampaigns />
          <div id="main-content">{children}</div>
          <Footer />
        </KobagsProvider></CmsPublicProvider>
      </body>
    </html>
  );
}
