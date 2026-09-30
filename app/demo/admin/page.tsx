import DemoWorkspace from "@/components/demo-workspace";
import { pageMetadata } from "@/lib/seo";
export const generateMetadata = () => pageMetadata("/demo/admin");
export default function Page() {
  return <DemoWorkspace role="admin" />;
}
