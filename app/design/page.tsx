import BagStudio from "@/components/bag-studio";
import { pageMetadata } from "@/lib/seo";
export const generateMetadata = () => pageMetadata("/design");
export default function DesignPage() {
  return (
    <main>
      <BagStudio />
    </main>
  );
}
