import type { Product } from "@/lib/catalog";
export const roles = ["administrator", "editor", "sales", "designer", "manager", "production"] as const;
export type Role = typeof roles[number];
export type Staff = { id: string; user_id: string | null; email: string; name: string; role: Role; active: number };
export const permissions: Record<Role, string[]> = {
  administrator: ["content", "publish", "inquiries", "quotes", "artwork", "approve", "production", "staff", "export", "media", "settings"],
  editor: ["content", "publish", "media"], sales: ["inquiries", "quotes"], designer: ["inquiries", "artwork", "media"],
  manager: ["inquiries", "quotes", "approve", "production", "export"], production: ["production"],
};
export type Copy = { en: string; sq: string };
export type Section = { id: string; title: Copy; body: Copy; image: string; alt: Copy; link: string; linkLabel: Copy; visible: boolean; original?: Copy };
export type Content = {
  preserveLayout?: boolean;
  title: Copy; description: Copy; image: string; sections: Section[];
  seoTitle: Copy; seoDescription: Copy; path: string;
  product?: Product; productSq?: { name: string; description: string; use: string; handle: string };
  colors?: string[]; activeSizes?: string[]; moq?: number; printColors?: number;
  source?: string; registration?: string; issued?: string; expires?: string;
  start?: string; end?: string; settings?: { moq: number; leadTime: string; phone: string; email: string; address: string; liveInquiries: boolean };
};
export type CmsRecord = { id: string; kind: string; slug: string; draft: Content; published: Content | null; revision: number; archived: number; updated_at: string };
export const recordKinds = ["product", "page", "article", "faq", "certificate", "guide", "municipality", "campaign", "copy", "settings"] as const;
export type Inquiry = { id: string; kind: string; data: Record<string, unknown>; status: string; assignee: string | null; priority: string; due_at: string | null; revision: number; created_at: string; updated_at: string; company_id: string };
export const inquiryStatuses = ["new", "assigned", "review", "awaiting-customer", "resolved", "closed"] as const;
export const orderStatuses = ["ready", "production", "quality", "dispatch-ready", "dispatched", "closed"] as const;
export type QuoteData = { quantity: number; unitCents: number; setupCents: number; shippingCents: number; taxCents: number; discountCents: number; totalCents: number; currency: "EUR"; validUntil: string; terms: string; delivery: string };
