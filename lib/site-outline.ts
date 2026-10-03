import { articles } from "./journal";
import { products } from "./catalog";
export const siteSections = [
  {
    title: "01 / Discover the brand",
    description: "The full homepage and original business story.",
    pages: [
      ["/", "Brand homepage"],
      ["/manufacturing", "Manufacturing & factory"],
      ["/sustainability", "Materials & responsibility"],
      ["/certifications", "Certificate references"],
      ["/industries", "Industry overview"],
      ["/industries/retail", "Retail buying page"],
    ],
  },
  {
    title: "02 / Find and design a bag",
    description: "The original collection, with the new design experience.",
    pages: [
      ["/products", "Collection & comparison"],
      ...products.map((p) => ["/products/" + p.slug, p.name]),
      ["/design", "Your brand. Your bag. / Design studio"],
      ["/quote", "Four-step quote request"],
      ["/samples", "Sample inquiry"],
    ],
  },
  {
    title: "03 / Connect and learn",
    description: "Partners, general inquiries and useful buying guidance.",
    pages: [
      ["/partners", "Partner models"],
      ["/partners/apply", "Partner application"],
      ["/contact", "Contact & general inquiry"],
      ["/bags-kosovo", "Bags across Kosovo / all municipalities"],
      ["/resources", "Buyer resources"],
      ["/blog", "Journal index"],
      ...articles.map((a) => ["/blog/" + a.slug, a.title]),
    ],
  },
  {
    title: "04 / Review the whole journey",
    description: "A separate visitor demo with customer and sales views, through simulated ordering.",
    pages: [
      ["/demo/customer", "Customer workspace"],
      ["/demo/admin", "Sales & content workspace"],
      ["/privacy", "Demo privacy notice"],
      ["/terms", "Demo terms"],
      ["/cookies", "Browser storage controls"],
      ["/handoff", "Site outline & handoff"],
    ],
  },
];
