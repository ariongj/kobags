import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {source:"/shop",destination:"/products",permanent:true},
      {source:"/shop-catalog/:slug",destination:"/products/:slug",permanent:true},
      {source:"/blog-home",destination:"/blog",permanent:true},
      {source:"/privacy-policy",destination:"/privacy",permanent:true},
      {source:"/terms-conditions",destination:"/terms",permanent:true},
      {source:"/thank-you",destination:"/quote",permanent:false},
      { source: "/shop-catalog", destination: "/products", permanent: true },
      {
        source: "/kobags-bagsdetails/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/partner", destination: "/partners", permanent: true },
      {
        source: "/become-partner",
        destination: "/partners/apply",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};
export default nextConfig;
