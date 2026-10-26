import { headers } from "next/headers";
export default async function StructuredData({ data }: { data: Record<string, unknown> }) {
  const nonce = (await headers()).get("x-kobags-nonce") || undefined;
  return <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
