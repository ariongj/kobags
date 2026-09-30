import DemoWorkspace from "@/components/demo-workspace";
import { pageMetadata } from "@/lib/seo";
export const generateMetadata = () => pageMetadata("/demo/customer");
export default function Page() {
  return <DemoWorkspace role="customer" />;
}
