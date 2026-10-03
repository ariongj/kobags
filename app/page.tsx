import { publicContent } from "@/lib/cms/public";
import CmsPublicPage from "@/components/cms/public-page";
import HomePage from "@/components/home-page";
import { pageMetadata } from "@/lib/seo";
export const generateMetadata = () => pageMetadata("/");
export default async function Page() {
  const cms=await publicContent("/");
  return cms ? <CmsPublicPage content={cms}/> : <HomePage />;
}
