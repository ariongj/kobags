import BagStudio from "@/components/bag-studio";
import { pageMetadata } from "@/lib/seo";
import { studioEnabled } from "@/lib/studio-availability";
import { redirect } from "next/navigation";
import { requestLanguage } from "@/lib/seo";
import { languageHref } from "@/lib/site-locale";
export const generateMetadata = () => pageMetadata("/design");
export default async function DesignPage() {
  if (!studioEnabled) redirect(languageHref("/products", await requestLanguage()));
  return (
    <main>
      <BagStudio />
    </main>
  );
}
