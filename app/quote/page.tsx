import QuoteFlow from "@/components/quote-flow";
import { pageMetadata } from "@/lib/seo";
export const generateMetadata = () => pageMetadata("/quote");
export default function Page() {
  return <QuoteFlow />;
}
