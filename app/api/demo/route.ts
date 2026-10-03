import { env } from "cloudflare:workers";
import { products } from "@/lib/catalog";
import { seed, applyAction, DemoState } from "@/lib/demo-domain";
import { demoSession } from "@/lib/demo-session";
export const dynamic = "force-dynamic";
function json(body: unknown, status = 200, cookie?: string) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...(cookie ? { "Set-Cookie": cookie } : {}),
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
async function read(owner: string, create = false) {
  if (!env.DB) throw Error("STORAGE_UNAVAILABLE");
  let row = await env.DB.prepare(
    "SELECT revision,data FROM demo_workspaces WHERE owner = ?",
  )
    .bind(owner)
    .first<{ revision: number; data: string }>();
  if (!row && !create) return seed();
  if (!row) {
    const d = seed();
    await env.DB.prepare(
      "INSERT OR IGNORE INTO demo_workspaces (owner, revision, data, updated_at) VALUES (?, 0, ?, ?)",
    )
      .bind(owner, JSON.stringify(d), new Date().toISOString())
      .run();
    row = await env.DB.prepare(
      "SELECT revision,data FROM demo_workspaces WHERE owner = ?",
    )
      .bind(owner)
      .first<{ revision: number; data: string }>();
  }
  if (!row) throw Error("STORAGE_UNAVAILABLE");
  const d = JSON.parse(row.data) as DemoState;
  d.revision = row.revision;
  // Product imagery and variants are source-owned; CMS descriptions and historic RFQ snapshots stay intact.
  d.catalog = d.catalog.map((product) => ({
    ...product,
    image: products.find((p) => p.slug === product.slug)?.image ?? product.image,
    variants:
      products.find((p) => p.slug === product.slug)?.variants ??
      product.variants,
  }));
  return d;
}
export async function GET(req: Request) {
  let cookie: string | undefined;
  try {
    const session = await demoSession(req);
    cookie = session.cookie;
    return json({ state: await read(session.owner) }, 200, cookie);
  } catch (e) {
    const message = e instanceof Error ? e.message : "STORAGE_UNAVAILABLE";
    return json(
      { error: message === "AUTH_REQUIRED" ? message : "STORAGE_UNAVAILABLE" },
      message === "AUTH_REQUIRED" ? 401 : 503,
      cookie,
    );
  }
}
export async function POST(req: Request) {
  let cookie: string | undefined;
  try {
    const session = await demoSession(req);
    const owner = session.owner;
    cookie = session.cookie;
    if (cookie) return json({ error: "DEMO_SESSION_REQUIRED" }, 400, cookie);
    if (req.headers.get("content-type")?.split(";")[0] !== "application/json")
      return json({ error: "INVALID_REQUEST" }, 415);
    const origin = req.headers.get("origin");
    if (origin && origin !== new URL(req.url).origin)
      return json({ error: "ORIGIN" }, 403);
    const body = await req.text();
    if (body.length > 350000) return json({ error: "FILE_TOO_LARGE" }, 413);
    const action = JSON.parse(body);
    for (let attempt = 0; attempt < 3; attempt++) {
      const old = await read(owner, true);
      const result = applyAction(old, action);
      if (result.state === old) return json(result, 200, cookie);
      const rev = old.revision + 1;
      result.state.revision = rev;
      const saved = await env
        .DB!.prepare(
          "UPDATE demo_workspaces SET data = ?, revision = ?, updated_at = ? WHERE owner = ? AND revision = ?",
        )
        .bind(
          JSON.stringify(result.state),
          rev,
          new Date().toISOString(),
          owner,
          old.revision,
        )
        .run();
      if (saved.meta.changes) return json(result, 200, cookie);
    }
    return json({ error: "CONFLICT" }, 409);
  } catch (e) {
    const raw = e instanceof Error ? e.message : "SAVE_FAILED";
    const known = [
      "AUTH_REQUIRED",
      "MINIMUM",
      "DATE",
      "INVALID_VARIANT",
      "INVALID_COLOR",
      "INVALID_IMAGE",
      "PARTNER_MODEL",
      "NOT_FOUND",
      "NO_DRAFT",
      "APPROVAL_REQUIRED",
      "QUOTE_REQUIRED",
      "STALE_QUOTE",
      "STALE_ARTWORK",
      "RELEASE_GATES",
      "ORDER_LOCKED",
      "EVIDENCE_REVIEW",
      "DEMO_LIMIT",
      "INVALID_REORDER",
      "REQUEST_KEY_CONFLICT",
      "STATUS_SEQUENCE",
    ];
    return json(
      { error: known.includes(raw) ? raw : "SAVE_FAILED" },
      raw === "AUTH_REQUIRED" ? 401 : 400,
      cookie,
    );
  }
}
