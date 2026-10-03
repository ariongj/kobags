import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core";
export const demoWorkspaces = sqliteTable("demo_workspaces", {
  owner: text("owner").primaryKey(),
  revision: integer("revision").notNull().default(0),
  data: text("data").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// Production CMS records are separate from visitor-isolated demonstration workspaces.
export const cmsStaff = sqliteTable("cms_staff", {
  id: text("id").primaryKey(), userId: text("user_id").unique(), email: text("email").notNull(),
  name: text("name").notNull(), role: text("role").notNull(), active: integer("active").notNull().default(1),
  inviteHash: text("invite_hash"), expiresAt: text("expires_at"), createdAt: text("created_at").notNull(),
});
export const cmsRecords = sqliteTable("cms_records", {
  id: text("id").primaryKey(), kind: text("kind").notNull(), slug: text("slug").notNull().unique(),
  draft: text("draft").notNull(), published: text("published"), revision: integer("revision").notNull().default(1),
  archived: integer("archived").notNull().default(0), mutation: text("mutation").notNull(), updatedAt: text("updated_at").notNull(),
}, (t) => [index("idx_cmsrecords").on(t.kind,t.archived)]);
export const cmsVersions = sqliteTable("cms_versions", {
  id: text("id").primaryKey(), recordId: text("record_id").notNull(), revision: integer("revision").notNull(),
  data: text("data").notNull(), actor: text("actor").notNull(), action: text("action").notNull(), createdAt: text("created_at").notNull(),
}, (t) => [index("idx_cmsversions").on(t.recordId,t.revision)]);
export const cmsInquiries = sqliteTable("cms_inquiries", {
  id: text("id").primaryKey(), owner: text("owner").notNull(), requestKey: text("request_key").notNull().unique(),
  payloadHash: text("payload_hash").notNull(), kind: text("kind").notNull(), companyId: text("company_id").notNull(),
  data: text("data").notNull(), status: text("status").notNull().default("new"), assignee: text("assignee"),
  priority: text("priority").notNull().default("normal"), dueAt: text("due_at"), revision: integer("revision").notNull().default(1),
  portalHash: text("portal_hash"), portalExpires: text("portal_expires"), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
}, (t) => [index("idx_cmsinquiries").on(t.status,t.createdAt)]);
export const cmsCompanies = sqliteTable("cms_companies", {
  id: text("id").primaryKey(), name: text("name").notNull(), contact: text("contact").notNull(), email: text("email").notNull(), phone: text("phone"), createdAt: text("created_at").notNull(),
});
export const cmsQuotes = sqliteTable("cms_quotes", {
  id: text("id").primaryKey(), inquiryId: text("inquiry_id").notNull(), version: integer("version").notNull(),
  data: text("data").notNull(), hash: text("hash").notNull(), status: text("status").notNull().default("draft"),
  createdBy: text("created_by").notNull(), createdAt: text("created_at").notNull(),
}, (t) => [uniqueIndex("idx_cmsquotes_version").on(t.inquiryId,t.version)]);
export const cmsArtwork = sqliteTable("cms_artwork", {
  id: text("id").primaryKey(), inquiryId: text("inquiry_id").notNull(), version: integer("version").notNull(),
  mediaId: text("media_id").notNull(), hash: text("hash").notNull(), note: text("note").notNull(),
  status: text("status").notNull().default("review"), createdBy: text("created_by").notNull(), createdAt: text("created_at").notNull(),
}, (t) => [uniqueIndex("idx_cmsartwork_version").on(t.inquiryId,t.version)]);
export const cmsApprovals = sqliteTable("cms_approvals", {
  id: text("id").primaryKey(), inquiryId: text("inquiry_id").notNull(), targetId: text("target_id").notNull(), targetHash: text("target_hash").notNull(),
  kind: text("kind").notNull(), decision: text("decision").notNull(), actor: text("actor").notNull(), evidence: text("evidence").notNull(), createdAt: text("created_at").notNull(),
});
export const cmsOrders = sqliteTable("cms_orders", {
  id: text("id").primaryKey(), inquiryId: text("inquiry_id").notNull().unique(), quoteId: text("quote_id").notNull(), artworkId: text("artwork_id").notNull(),
  status: text("status").notNull(), paymentEvidence: text("payment_evidence").notNull(), note: text("note").notNull(), revision: integer("revision").notNull().default(1), createdAt: text("created_at").notNull(),
});
export const cmsMedia = sqliteTable("cms_media", {
  id: text("id").primaryKey(), objectKey: text("object_key").notNull().unique(), filename: text("filename").notNull(),
  type: text("type").notNull(), size: integer("size").notNull(), hash: text("hash").notNull(), visibility: text("visibility").notNull(),
  altEn: text("alt_en").notNull(), altSq: text("alt_sq").notNull(), inquiryId: text("inquiry_id"), createdBy: text("created_by").notNull(), createdAt: text("created_at").notNull(),
}, (t) => [index("idx_cmsmedia").on(t.inquiryId)]);
export const cmsEvents = sqliteTable("cms_events", {
  id: text("id").primaryKey(), entityId: text("entity_id").notNull(), actor: text("actor").notNull(), action: text("action").notNull(), detail: text("detail").notNull(), createdAt: text("created_at").notNull(),
}, (t) => [index("idx_cmsevents").on(t.entityId,t.createdAt)]);
export const cmsOutbox = sqliteTable("cms_outbox", {
  id: text("id").primaryKey(), inquiryId: text("inquiry_id").notNull(), recipient: text("recipient").notNull(), subject: text("subject").notNull(),
  body: text("body").notNull(), status: text("status").notNull().default("pending"), attempts: integer("attempts").notNull().default(0), error: text("error"), createdAt: text("created_at").notNull(),
}, (t) => [index("idx_cmsoutbox").on(t.status,t.createdAt)]);
export const cmsRateLimits = sqliteTable("cms_rate_limits", {
  id: text("id").primaryKey(), count: integer("count").notNull().default(0), expiresAt: integer("expires_at").notNull(),
});

export const cmsRedirects = sqliteTable("cms_redirects", {path:text("path").primaryKey(),destination:text("destination").notNull()});
