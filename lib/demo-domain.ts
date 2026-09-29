import { z } from "zod";
import { enableLayers } from "./studio-artwork";
import {
  products,
  initialDesign,
  Design,
  Product,
  getProduct,
  MAX_BRAND_TEXT_LENGTH,
} from "./catalog";
export type Event = { at: string; message: string; actor: string };
export type Quote = {
  version: number;
  unitCents: number;
  setupCents: number;
  currency: "EUR";
  validUntil: string;
  terms: string;
  issuedAt: string;
  acceptedAt?: string;
  change?: string;
  payment: "not-required" | "pending" | "confirmed";
  status: "issued" | "accepted" | "changes-requested";
};
export type Artwork = {
  version: number;
  design: Design;
  issuedAt: string;
  status: "review" | "changes-requested" | "approved";
  comment?: string;
  approvedAt?: string;
  approver?: string;
};
export type Request = {
  id: string;
  key: string;
  createdAt: string;
  stage: string;
  owner: string;
  notes: string[];
  snapshot: Design & {
    productName: string;
    dimensions: string;
    gsm: number;
    description: string;
  };
  quotes: Quote[];
  artworks: Artwork[];
  events: Event[];
  order?: {
    id: string;
    quoteVersion: number;
    artworkVersion: number;
    releasedAt: string;
    status: string;
  };
  source: string;
};
export type Inquiry = {
  id: string;
  kind: string;
  company: string;
  contact: string;
  email: string;
  country: string;
  message: string;
  model: string;
  status: string;
  createdAt: string;
};
export type ContentRecord = {
  id: string;
  type: "claim" | "certificate" | "guide" | "faq";
  title: string;
  body: string;
  source: string;
  owner: string;
  review: string;
  status: "draft" | "published";
  draft?: string;
};
export type DemoState = {
  revision: number;
  requests: Request[];
  inquiries: Inquiry[];
  outbox: {
    id: string;
    requestId: string;
    subject: string;
    body: string;
    createdAt: string;
  }[];
  catalog: Product[];
  drafts: Record<string, string>;
  content: ContentRecord[];
  settings: { moq: number; leadTime: string; responseHours: number };
  audit: Event[];
};
const event = (message: string, actor = "Demo sales"): Event => ({
  at: new Date().toISOString(),
  message,
  actor,
});
export function seed(): DemoState {
  return {
    revision: 0,
    requests: [],
    inquiries: [],
    outbox: [],
    catalog: structuredClone(products),
    drafts: {},
    settings: {
      moq: 5000,
      leadTime:
        "Indicative dispatch 2–4 weeks after artwork approval; subject to production confirmation.",
      responseHours: 48,
    },
    content: [
      {
        id: "iso9001",
        type: "certificate",
        title: "ISO 9001:2015",
        body: "The existing website displays a quality-management certificate scan. Issuer, certified legal entity, scope, dates and verification link require client confirmation.",
        source: "https://kobags-group.com/certifications",
        owner: "Client quality owner — to confirm",
        review: "",
        status: "draft",
      },
      {
        id: "iso14001",
        type: "certificate",
        title: "ISO 14001:2015",
        body: "The existing website displays an environmental-management certificate scan. This is a management-system reference, not a product sustainability certification.",
        source: "https://kobags-group.com/certifications",
        owner: "Client quality owner — to confirm",
        review: "",
        status: "draft",
      },
      {
        id: "material",
        type: "claim",
        title: "Non-woven polypropylene",
        body: "The published product specifications describe non-woven PP. Material composition does not establish recycled content, plastic-free status or local recycling acceptance.",
        source: "https://kobags-group.com/products",
        owner: "Client production owner — to confirm",
        review: "",
        status: "published",
      },
      {
        id: "artwork",
        type: "guide",
        title: "Preparing your artwork",
        body: "Start with a clear logo and your intended colors. The studio accepts PNG, JPG and WebP previews. Production-ready artwork formats, printable dimensions and color matching are agreed during quotation. Approve the latest proof before production.",
        source: "Demo buying guidance; production approval required",
        owner: "Demo content editor",
        review: "",
        status: "published",
      },
      {
        id: "minimum",
        type: "faq",
        title: "What is the minimum order?",
        body: "The website publishes a minimum of 5,000 bags. The scope across designs, colors and sizes needs client confirmation. Request samples separately.",
        source: "https://kobags-group.com/",
        owner: "Client sales owner — to confirm",
        review: "",
        status: "published",
      },
    ],
    audit: [],
  };
}
const image = z
  .string()
  .max(110000)
  .refine(
    (v) => !v || /^data:image\/(png|webp);base64,[A-Za-z0-9+/=]+$/.test(v),
    "INVALID_IMAGE",
  );
const placementSchema = z.object({
  x: z.number().min(24).max(76),
  y: z.number().min(33).max(80),
  scale: z.number().min(10).max(55),
  rotation: z.number().min(-45).max(45),
});
export const designSchema = z.object({
  layeredArtwork: z.boolean().optional(),
  textPlacement: placementSchema.optional(),
  backTextPlacement: placementSchema.optional(),
  previewVersion: z.literal("v4").optional(),
  product: z.enum([
    "d-cut-bag",
    "handle-bag",
    "box-bag",
    "t-shirt-bag",
    "string-bag",
  ]),
  size: z.enum(["Small", "Medium", "Large"]),
  color: z.string(),
  printColors: z.number().int().min(1).max(4),
  side: z.enum(["front", "back"]),
  logo: image,
  logoName: z.string().max(150),
  text: z.string().max(MAX_BRAND_TEXT_LENGTH),
  ink: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  x: z.number().min(24).max(76),
  y: z.number().min(33).max(80),
  scale: z.number().min(10).max(55),
  rotation: z.number().min(-45).max(45),
  textFont: z.enum(["sans", "serif", "mono"]).optional(),
  textAlign: z.enum(["left", "center", "right"]).optional(),
  backLogoName: z.string().max(150).optional(),
  backTextFont: z.enum(["sans", "serif", "mono"]).optional(),
  backTextAlign: z.enum(["left", "center", "right"]).optional(),
  backInk: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .optional(),
  backLogo: image,
  backText: z.string().max(MAX_BRAND_TEXT_LENGTH),
  backX: z.number().min(24).max(76),
  backY: z.number().min(33).max(80),
  backScale: z.number().min(10).max(55),
  backRotation: z.number().min(-45).max(45),
  quantity: z.number().int().min(1).max(10000000),
  country: z.string().trim().min(2).max(100),
  city: z.string().trim().min(2).max(100),
  date: z.string().max(10),
  company: z.string().trim().min(2).max(150),
  contact: z.string().trim().min(2).max(100),
  email: z.string().email().max(150),
  phone: z.string().max(40),
  note: z.string().max(3000),
  customDimensions: z.string().max(100),
  purpose: z.string().max(150),
  consent: z.literal(true),
  key: z.string().min(10).max(80),
  reorderOf: z.string().optional(),
});
const common = z
  .object({ type: z.string().max(40), id: z.string().max(80).optional() })
  .passthrough();
function str(v: unknown, max = 2000) {
  return z.string().trim().min(1).max(max).parse(v);
}
const num = (v: unknown, min: number, max: number) =>
  z.number().int().min(min).max(max).parse(v);
function outbox(s: DemoState, r: Request, subject: string, body: string) {
  s.outbox.unshift({
    id: crypto.randomUUID(),
    requestId: r.id,
    subject,
    body,
    createdAt: new Date().toISOString(),
  });
}
function immutable<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}
export function applyAction(
  original: DemoState,
  input: unknown,
): { state: DemoState; id?: string } {
  const a = common.parse(input) as Record<string, unknown> & {
    type: string;
    id?: string;
  };
  const s = immutable(original);
  let id: string | undefined;
  const now = new Date().toISOString();
  if (a.type === "reset") return { state: seed() };
  if (a.type === "submit") {
    const d = designSchema.parse(a.design);
    const duplicate = s.requests.find((r) => r.key === d.key);
    if (duplicate) return { state: original, id: duplicate.id };
    if (s.requests.length >= 12) throw Error("DEMO_LIMIT");
    const p = s.catalog.find((p) => p.slug === d.product)!;
    const v = p.variants.find((v) => v.name === d.size);
    if (!v) throw Error("INVALID_VARIANT");
    if (
      ![
        "Forest green",
        "Navy blue",
        "Natural",
        "White",
        "Black",
        "Red",
        "Royal blue",
      ].includes(d.color)
    )
      throw Error("INVALID_COLOR");
    if (d.quantity < s.settings.moq) throw Error("MINIMUM");
    if (
      d.date &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(d.date) || d.date < now.slice(0, 10))
    )
      throw Error("DATE");
    for (const image of [d.logo, d.backLogo]) {
      if (image) {
        const bytes = atob(image.split(",")[1]);
        if (!(
          bytes.startsWith("\x89PNG\r\n\x1a\n") ||
          (bytes.startsWith("RIFF") && bytes.slice(8, 12) === "WEBP")
        ))
          throw Error("INVALID_IMAGE");
      }
    }
    if (d.reorderOf && !s.requests.some((r) => r.id === d.reorderOf && r.order))
      throw Error("INVALID_REORDER");
    id = "KBG-" + crypto.randomUUID().slice(0, 8).toUpperCase();
    const r: Request = {
      id,
      key: d.key,
      createdAt: now,
      stage: "new",
      owner: "Unassigned",
      notes: [],
      snapshot: {
        ...d,
        productName: p.name,
        dimensions: v.dimensions,
        gsm: v.gsm,
        description: p.description,
      },
      quotes: [],
      artworks: [],
      events: [
        event("Request received. Configuration preserved.", "Demo buyer"),
      ],
      source: d.reorderOf ? "Repeat request from " + d.reorderOf : "Bag Studio",
    };
    s.requests.unshift(r);
    outbox(
      s,
      r,
      "Your design request " + id,
      "Preview only — no email sent. We have captured your bag, branding, quantity and destination for review.",
    );
    s.audit.unshift(event("New request " + id, "Demo buyer"));
  } else if (a.type === "inquiry") {
    const d = z
      .object({
        kind: z.enum(["sample", "partner", "contact"]),
        company: z.string().min(2).max(150),
        contact: z.string().min(2).max(100),
        email: z.string().email().max(150),
        country: z.string().min(2).max(100),
        message: z.string().min(5).max(3000),
        model: z.string().max(100),
        key: z.string().min(10).max(80),
        consent: z.literal(true),
      })
      .parse(a.data);
    if (
      d.kind === "partner" &&
      !["Country representative", "Sales partner", "Affiliate"].includes(
        d.model,
      )
    )
      throw Error("PARTNER_MODEL");
    const existing = s.inquiries.find((i) => i.id === d.key);
    if (existing) return { state: original, id: existing.id };
    if (s.inquiries.length >= 30) throw Error("DEMO_LIMIT");
    id = d.key;
    s.inquiries.unshift({
      id,
      kind: d.kind,
      company: d.company,
      contact: d.contact,
      email: d.email,
      country: d.country,
      message: d.message,
      model: d.model,
      status: "new",
      createdAt: now,
    });
    s.audit.unshift(event("Received " + d.kind + " inquiry", "Demo buyer"));
  } else if (a.type === "save-product") {
    const slug = str(a.slug, 60);
    if (!s.catalog.some((p) => p.slug === slug)) throw Error("NOT_FOUND");
    s.drafts[slug] = str(a.description, 800);
    s.audit.unshift(event("Saved product draft: " + slug, "Demo editor"));
  } else if (a.type === "publish-product") {
    const slug = str(a.slug, 60);
    const p = s.catalog.find((p) => p.slug === slug);
    if (!p || !s.drafts[slug]) throw Error("NO_DRAFT");
    p.description = s.drafts[slug];
    delete s.drafts[slug];
    s.audit.unshift(
      event(
        "Published product: " + slug + ". Existing request snapshots retained.",
        "Demo editor",
      ),
    );
  } else if (a.type === "settings") {
    s.settings = {
      moq: num(a.moq, 1, 1000000),
      leadTime: str(a.leadTime, 500),
      responseHours: num(a.responseHours, 1, 720),
    };
    s.audit.unshift(
      event("Updated demonstration commercial rules", "Demo editor"),
    );
  } else if (a.type === "content-save") {
    const c = s.content.find((c) => c.id === a.id);
    if (!c) throw Error("NOT_FOUND");
    c.draft = str(a.body, 3000);
    c.owner = str(a.owner, 150);
    c.review = z.string().max(10).parse(a.review);
    s.audit.unshift(event("Saved content draft: " + c.title, "Demo editor"));
  } else if (a.type === "content-publish") {
    const c = s.content.find((c) => c.id === a.id);
    if (!c || !c.draft) throw Error("NO_DRAFT");
    if (
      ["claim", "certificate"].includes(c.type) &&
      (!c.review || c.owner.includes("to confirm"))
    )
      throw Error("EVIDENCE_REVIEW");
    c.body = c.draft;
    c.draft = undefined;
    c.status = "published";
    s.audit.unshift(event("Published demo content: " + c.title, "Demo editor"));
  } else if (a.type === "inquiry-stage") {
    const i = s.inquiries.find((i) => i.id === a.id);
    if (!i) throw Error("NOT_FOUND");
    i.status = z
      .enum(["new", "reviewing", "accepted", "declined"])
      .parse(a.status);
    s.audit.unshift(event("Updated inquiry " + i.id));
  } else {
    const r = s.requests.find((r) => r.id === a.id);
    if (!r) throw Error("NOT_FOUND");
    const q = r.quotes.at(-1);
    const art = r.artworks.at(-1);
    id = r.id;
    if (a.type === "prepare-demo") {
      if (r.order || (q && art)) return { state: original, id: r.id };
      let prepared = original;
      if (!q)
        prepared = applyAction(prepared, {
          type: "issue-quote",
          id: r.id,
          unitCents: 45,
          setupCents: 12000,
          validUntil: new Date(Date.now() + 14 * 86400000)
            .toISOString()
            .slice(0, 10),
          terms:
            "Fictional demonstration prices only. Shipping and tax excluded. This is not a Kobags offer. No payment is collected and no real order is sent.",
          payment: "not-required",
        }).state;
      if (!art)
        prepared = applyAction(prepared, {
          type: "issue-artwork",
          id: r.id,
          caption: "",
        }).state;
      return { state: prepared, id: r.id };
    } else if (a.type === "assign") {
      r.owner = str(a.owner, 100);
      r.events.push(event("Assigned to " + r.owner));
    } else if (a.type === "note") {
      const note = str(a.note);
      r.notes.push(note);
      r.events.push(event("Note: " + note));
    } else if (a.type === "stage") {
      const stage = z
        .enum([
          "new",
          "needs information",
          "qualified",
          "quoted",
          "won",
          "lost",
        ])
        .parse(a.stage);
      if (stage === "quoted" && !q) throw Error("QUOTE_REQUIRED");
      if (stage === "won" && q?.status !== "accepted")
        throw Error("APPROVAL_REQUIRED");
      r.stage = stage;
      r.events.push(event("Stage changed to " + stage));
    } else if (a.type === "issue-quote") {
      if (r.order) throw Error("ORDER_LOCKED");
      const quote: Quote = {
        version: r.quotes.length + 1,
        unitCents: num(a.unitCents, 1, 100000),
        setupCents: num(a.setupCents, 0, 10000000),
        currency: "EUR",
        validUntil: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .parse(a.validUntil),
        terms: str(a.terms),
        issuedAt: now,
        payment: z.enum(["not-required", "pending"]).parse(a.payment),
        status: "issued",
      };
      if (quote.validUntil < now.slice(0, 10)) throw Error("DATE");
      r.quotes.push(quote);
      r.stage = "quoted";
      r.events.push(event("Issued fictional quotation v" + quote.version));
      outbox(
        s,
        r,
        "Demo quotation v" + quote.version,
        "Fictional prices for demonstration. Not a Kobags offer. Review in the customer demo.",
      );
    } else if (a.type === "accept-quote") {
      if (!q || q.version !== a.version || q.validUntil < now.slice(0, 10))
        throw Error("STALE_QUOTE");
      q.status = "accepted";
      q.acceptedAt = now;
      r.stage = "won";
      r.events.push(event("Accepted quotation v" + q.version, "Demo buyer"));
    } else if (a.type === "quote-change") {
      if (!q || r.order || q.version !== a.version) throw Error("STALE_QUOTE");
      q.status = "changes-requested";
      q.acceptedAt = undefined;
      q.change = str(a.comment);
      r.stage = "needs information";
      r.events.push(
        event("Requested quotation change: " + q.change, "Demo buyer"),
      );
    } else if (a.type === "issue-artwork") {
      if (r.order) throw Error("ORDER_LOCKED");
      const proof = immutable(art?.design || r.snapshot);
      const caption = z.string().max(60).parse(a.caption);
      if (caption.trim()) {
        if (proof.layeredArtwork && proof.logo) Object.assign(proof, enableLayers({ ...proof, side: "front" }));
        proof.text = caption;
        if (!proof.layeredArtwork) proof.logo = "";
      }
      r.artworks.push({
        version: r.artworks.length + 1,
        design: proof,
        issuedAt: now,
        status: "review",
      });
      r.events.push(event("Issued artwork revision " + r.artworks.length));
      outbox(
        s,
        r,
        "Artwork proof v" + r.artworks.length,
        "Preview only. Review the specific artwork revision in the customer demo.",
      );
    } else if (a.type === "approve-artwork") {
      if (
        !art ||
        art.version !== a.version ||
        art.status === "changes-requested" ||
        r.order
      )
        throw Error("STALE_ARTWORK");
      art.status = "approved";
      art.approvedAt = now;
      art.approver = r.snapshot.contact;
      r.events.push(event("Approved artwork v" + art.version, "Demo buyer"));
    } else if (a.type === "artwork-change") {
      if (!art || art.version !== a.version || r.order)
        throw Error("STALE_ARTWORK");
      art.status = "changes-requested";
      art.approvedAt = undefined;
      art.approver = undefined;
      art.comment = str(a.comment);
      r.events.push(
        event("Requested artwork correction: " + art.comment, "Demo buyer"),
      );
    } else if (a.type === "payment") {
      if (!q || q.status !== "accepted") throw Error("APPROVAL_REQUIRED");
      q.payment = "confirmed";
      r.events.push(
        event(
          "Marked fictional payment condition satisfied — no payment processed",
        ),
      );
    } else if (a.type === "release") {
      if (r.order) return { state: original, id: r.id };
      if (
        !q ||
        q.status !== "accepted" ||
        !art ||
        art.status !== "approved" ||
        q.payment === "pending"
      )
        throw Error("RELEASE_GATES");
      r.order = {
        id: "DEMO-ORDER-" + crypto.randomUUID().slice(0, 6).toUpperCase(),
        quoteVersion: q.version,
        artworkVersion: art.version,
        releasedAt: now,
        status: "Production scheduled",
      };
      r.events.push(
        event(
          "Released DEMO production handoff using quote v" +
            q.version +
            " and artwork v" +
            art.version,
        ),
      );
    } else if (a.type === "order-stage") {
      if (!r.order) throw Error("RELEASE_GATES");
      const statuses = [
        "Production scheduled",
        "In production",
        "Quality review",
        "Ready for dispatch",
        "Dispatched",
      ];
      const current = statuses.indexOf(r.order.status);
      if (a.status !== statuses[current + 1]) throw Error("STATUS_SEQUENCE");
      r.order.status = String(a.status);
      r.events.push(event("Demo order: " + r.order.status));
    } else throw Error("UNKNOWN_ACTION");
    s.audit.unshift(event(a.type + " · " + r.id));
  }
  s.revision = original.revision + 1;
  if (JSON.stringify(s).length > 1800000) throw Error("DEMO_LIMIT");
  return { state: s, id };
}
