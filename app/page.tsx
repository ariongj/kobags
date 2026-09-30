import HomePage from "@/components/home-page";
import { pageMetadata } from "@/lib/seo";
export const generateMetadata = () => pageMetadata("/");
export default function Page() {
  return <HomePage />;
}
