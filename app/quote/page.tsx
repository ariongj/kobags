import StockOrder from "@/components/stock-order";
import QuoteFlow from "@/components/quote-flow";
import { pageMetadata } from "@/lib/seo";
export const generateMetadata = () => pageMetadata("/quote");
export default async function Page({searchParams}:{searchParams:Promise<{collection?:string}>}) {
  const {collection}=await searchParams;
  return collection ? <StockOrder key={collection} slug={collection}/> : <QuoteFlow />;
}
