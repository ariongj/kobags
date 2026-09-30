import JournalIndex from "@/components/journal-index";
import { pageMetadata } from "@/lib/seo";
export const generateMetadata = () => pageMetadata("/blog");

export default function Journal() {
  return <JournalIndex />;
}
