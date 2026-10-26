import BagStudio from "@/components/bag-studio";
import { pageMetadata } from "@/lib/seo";
import { requestStudioEnabled } from "@/lib/studio-request";
import { redirect } from "next/navigation";
import { requestLanguage } from "@/lib/seo";
import { languageHref } from "@/lib/site-locale";
export const generateMetadata = () => pageMetadata("/design");
export default async function DesignPage() {
  if (!(await requestStudioEnabled())) redirect(languageHref("/products", await requestLanguage()));
  return (
    <main>
      <BagStudio />
    </main>
  );
}
