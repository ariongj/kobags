import type { Metadata } from "next";
import "./globals.css";
import "./brand-refresh.css";
import "./compact.css";
import { KobagsProvider } from "@/components/kobags-context";
import { LocalizedCopy } from "@/components/localized-copy";
import { Header, Footer } from "@/components/site-shell";
export const metadata: Metadata = {
  title: {
    default: "Kobags Group | Manufacturing bags. Building brands.",
    template: "%s | Kobags Group",
  },
  description:
    "Non-woven bag manufacturing in Kosova. Explore the factory, customize a bag in the interactive 3D studio and plan your next wholesale order.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/favicon.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="kobags-v5">
        <KobagsProvider>
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
