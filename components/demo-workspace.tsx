"use client";
import { useEffect, useState } from "react";
import Link from "@/components/site-link";
import {
  ArrowUpRight,
  ArrowRight,
  Inbox,
  CheckCircle2,
  FileText,
  Download,
  RotateCcw,
  Search,
  LockKeyhole,
  Check,
  Clock3,
  Send,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useKobags } from "./kobags-context";
import { useDemo, errors } from "./demo-store";
import { Choice, BagPreview } from "./bag-studio";
import { Request, DemoState } from "@/lib/demo-domain";
import { initialDesign } from "@/lib/catalog";
const money = (n: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "EUR" }).format(
    n / 100,
  );
const date = (s: string) =>
  new Date(s).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
function download(name: string, data: unknown) {
  const blob = new Blob(
    [typeof data === "string" ? data : JSON.stringify(data, null, 2)],
    { type: "text/plain" },
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function businessAge(created: string) {
  let h = 0;
  const start = new Date(created),
    now = new Date();
  for (
    let d = new Date(start);
    d < now && h < 10000;
    d.setTime(d.getTime() + 3600000)
  ) {
    if (
      d.getUTCDay() > 0 &&
      d.getUTCDay() < 6 &&
      d.getUTCHours() >= 9 &&
      d.getUTCHours() < 17
    )
      h++;
  }
  return h;
}
export default function DemoWorkspace({
  role,
}: {
  role: "admin" | "customer";
}) {
  const { t, lang, update } = useKobags();
  const { state, error, busy, act, refresh } = useDemo();
  const [selected, setSelected] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("requests");
  const [note, setNote] = useState("");
  const [owner, setOwner] = useState("Demo sales team");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [artOpen, setArtOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [unit, setUnit] = useState("45");
  const [setup, setSetup] = useState("12000");
  const [valid, setValid] = useState(
    new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
  );
  const [terms, setTerms] = useState(
    "FICTIONAL DEMO QUOTATION. Shipping and tax excluded; to be confirmed. This is not a Kobags offer. No payment is collected.",
  );
  const [payment, setPayment] = useState("not-required");
  const [caption, setCaption] = useState("");
  const [comment, setComment] = useState("");
  const [changeType, setChangeType] = useState<"quote" | "artwork" | null>(
    null,
  );
  const [feedback, setFeedback] = useState("");
  const [contentId, setContentId] = useState("");
  const [contentBody, setContentBody] = useState("");
  const [contentOwner, setContentOwner] = useState("");
  const [review, setReview] = useState("");
  const [product, setProduct] = useState("handle-bag");
  const [description, setDescription] = useState("");
  const [moq, setMoq] = useState("5000");
  const [lead, setLead] = useState("");
  const [responseHours, setResponseHours] = useState("48");
  useEffect(() => {
    const id = new URLSearchParams(location.search).get("id");
    if (id) setSelected(id);
  }, []);
  useEffect(() => {
    if (state && !selected && state.requests.length)
      setSelected(state.requests[0].id);
  }, [state, selected]);
  useEffect(() => {
    if (state) {
      const p = state.catalog.find((p) => p.slug === product);
      setDescription(state.drafts[product] || p?.description || "");
      setMoq(String(state.settings.moq));
      setLead(state.settings.leadTime);
      setResponseHours(String(state.settings.responseHours));
    }
  }, [state, product]);
  const run = async (
    a: Record<string, unknown>,
    message = "Saved in the demo.",
  ) => {
    try {
      const id = await act(a);
      setFeedback(message);
      return id;
    } catch {
      return undefined;
    }
  };
  const r = state?.requests.find((r) => r.id === selected);
  const q = r?.quotes.at(-1);
  const art = r?.artworks.at(-1);
  const releaseReady = !!(
    q?.status === "accepted" &&
    art?.status === "approved" &&
    q.payment !== "pending"
  );
  const filtered =
    state?.requests.filter(
      (r) =>
        (filter === "all" ||
          (filter === "overdue"
            ? businessAge(r.createdAt) >
                (state?.settings.responseHours || 48) &&
              ["new", "needs information"].includes(r.stage)
            : r.stage === filter)) &&
        (r.id + " " + r.snapshot.company + " " + r.snapshot.email)
          .toLowerCase()
          .includes(search.toLowerCase()),
    ) || [];
  const repeat = () => {
    if (!r?.order) return;
    const { productName, dimensions, gsm, description, ...d } = r.snapshot;
    update({
      ...d,
      key: crypto.randomUUID(),
      reorderOf: r.id,
      date: "",
      consent: false,
    });
    try {
      localStorage.setItem("kobags-quote-step", "2");
    } catch {}
    window.location.assign("/quote");
  };
  const example = async () => {
    const id = await run(
      {
        type: "submit",
        design: {
          ...initialDesign,
          product: "d-cut-bag",
          size: "Large",
          company: "Mira Market — fictional",
          contact: "Arta Demo",
          email: "arta@example.com",
          city: "Prishtina",
          consent: true,
          key: crypto.randomUUID(),
          text: "MIRA\nMARKET",
        },
      },
      "Fictional example created.",
    );
    if (id) setSelected(id);
  };
  return (
    <main className="workspace">
      <div className="demo-banner">
        <LockKeyhole size={15} />
        <span>
          {t(
            "PRIVATE DEMO · Fictional records, preview notifications and simulated production.",
            "DEMO PRIVAT · Të dhëna fiktive, njoftime paraprake dhe prodhim i simuluar.",
          )}
        </span>
        <Link href={role === "admin" ? "/demo/customer" : "/demo/admin"}>
          {role === "admin"
            ? t("Switch to customer demo", "Kalo te demo e klientit")
            : t("Switch to sales demo", "Kalo te demo e shitjeve")}{" "}
          <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">
            {role === "admin"
              ? "KOBAGS SALES & CONTENT"
              : "YOUR KOBAGS WORKSPACE"}
          </p>
          <h1>
            {role === "admin"
              ? t("From inquiry to approved.", "Nga kërkesa te miratimi.")
              : t("Your bags. Every detail.", "Çantat tuaja. Çdo detaj.")}
          </h1>
          <p>
            {role === "admin"
              ? "The same design. A clear next step."
              : "Review quotations, approve artwork and start your next order."}
          </p>
        </div>
        <div className="actions">
          <button className="button secondary small" onClick={() => refresh()}>
            Refresh
          </button>
          <Link className="button small" href="/design">
            Open bag studio <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      {error && (
        <div className="error" role="alert">
          {(errors[error] || errors.SAVE_FAILED)[lang === "sq" ? 1 : 0]}{" "}
          <button className="text-button" onClick={() => refresh()}>
            Retry
          </button>
        </div>
      )}
      {feedback && (
        <div className="saved-feedback" role="status">
          <Check size={15} />
          {feedback}
        </div>
      )}
      {!state && !error && (
        <div className="loading">Loading your demonstration…</div>
      )}
      {state && (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="workspace-tabs">
            <TabsTrigger value="requests">
              {t("Requests", "Kërkesat")} <span>{state.requests.length}</span>
            </TabsTrigger>
            {role === "admin" && (
              <>
                <TabsTrigger value="companies">Companies</TabsTrigger>
                <TabsTrigger value="content">Catalog & content</TabsTrigger>
                <TabsTrigger value="inquiries">Other inquiries</TabsTrigger>
                <TabsTrigger value="outbox">Preview outbox</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </>
            )}
          </TabsList>
          <TabsContent value="requests">
            <div className="inbox-toolbar">
              <div className="search-field">
                <Search size={17} />
                <input
                  aria-label="Search requests"
                  placeholder="Search company or request…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Choice
                id="inbox-filter"
                label="Status"
                value={filter}
                onChange={setFilter}
                options={[
                  "all",
                  "new",
                  "needs information",
                  "qualified",
                  "quoted",
                  "won",
                  "lost",
                  "overdue",
                ].map((s) => ({
                  value: s,
                  label:
                    s === "all"
                      ? "All requests"
                      : s === "overdue"
                        ? "Overdue (business hours)"
                        : s,
                }))}
              />
            </div>
            {!state.requests.length ? (
              <div className="empty">
                <Inbox size={32} />
                <h3>Your first design starts here.</h3>
                <p>
                  Submit a bag from the studio, or create a fictional example to
                  explore the approval journey.
                </p>
                <div className="actions">
                  <Link href="/design" className="button">
                    Design a bag
                  </Link>
                  <button
                    className="button secondary"
                    disabled={busy}
                    onClick={example}
                  >
                    Create fictional example
                  </button>
                </div>
              </div>
            ) : (
              <div className="inbox-grid">
                <aside className="request-list">
                  {filtered.length ? (
                    filtered.map((item) => (
                      <button
                        key={item.id}
                        className={
                          r?.id === item.id
                            ? "request-card active"
                            : "request-card"
                        }
                        onClick={() => {
                          setSelected(item.id);
                          setFeedback("");
                        }}
                      >
                        <div>
                          <span className="request-id">{item.id}</span>
                          <span className="status">{item.stage}</span>
                        </div>
                        <strong>{item.snapshot.company}</strong>
                        <span>
                          {item.snapshot.productName} ·{" "}
                          {item.snapshot.quantity.toLocaleString()} bags
                        </span>
                        <small>{date(item.createdAt)}</small>
                      </button>
                    ))
                  ) : (
                    <div className="empty">
                      <p>No requests match this filter.</p>
                      <button
                        className="text-button"
                        onClick={() => {
                          setSearch("");
                          setFilter("all");
                        }}
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </aside>
                {r && (
                  <section className="request-detail">
                    <div className="detail-heading">
                      <div>
                        <p className="eyebrow">{r.id}</p>
                        <h2>{r.snapshot.company}</h2>
                        <p>
                          {r.snapshot.contact} · {r.snapshot.email}
                        </p>
                      </div>
                      <button
                        className="icon-button"
                        aria-label="Download request specification"
                        onClick={() => download(r.id + "-specification.txt", r)}
                      >
                        <Download size={18} />
                      </button>
                    </div>
                    <Tabs defaultValue="overview">
                      <TabsList className="detail-tabs">
                        <TabsTrigger value="overview">
                          {t("Specification", "Specifikimet")}
                        </TabsTrigger>
                        <TabsTrigger value="quotation">
                          {t("Quotation", "Oferta")} {q ? "v" + q.version : ""}
                        </TabsTrigger>
                        <TabsTrigger value="artwork">
                          {t("Artwork", "Dizajni")}{" "}
                          {art ? "v" + art.version : ""}
                        </TabsTrigger>
                        <TabsTrigger value="timeline">
                          {t("Timeline", "Ecuria")}
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview">
                        <div className="request-overview">
                          <BagPreview design={r.snapshot} compact />
                          <dl>
                            {[
                              ["Bag", r.snapshot.productName],
                              [
                                "Size",
                                r.snapshot.size + " · " + r.snapshot.dimensions,
                              ],
                              [
                                "Material",
                                "Non-woven PP · " + r.snapshot.gsm + " GSM",
                              ],
                              ["Color", r.snapshot.color],
                              [
                                "Print",
                                r.snapshot.printColors +
                                  " color(s), flexographic",
                              ],
                              [
                                "Quantity",
                                r.snapshot.quantity.toLocaleString(),
                              ],
                              [
                                "Destination",
                                r.snapshot.city + ", " + r.snapshot.country,
                              ],
                              [
                                "Requested date",
                                r.snapshot.date || "To discuss",
                              ],
                              [
                                "Artwork",
                                r.snapshot.logoName ||
                                  r.snapshot.text ||
                                  "Not provided",
                              ],
                              ["Source", r.source],
                            ].map(([k, v]) => (
                              <div key={k}>
                                <dt>{k}</dt>
                                <dd>{v}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                        {r.snapshot.note && (
                          <div className="notice">
                            Buyer note: {r.snapshot.note}
                          </div>
                        )}
                        {role === "admin" && (
                          <div className="sales-controls">
                            <Choice
                              id="request-stage"
                              label="Sales stage"
                              value={r.stage}
                              onChange={(stage) =>
                                run({ type: "stage", id: r.id, stage })
                              }
                              options={[
                                "new",
                                "needs information",
                                "qualified",
                                "quoted",
                                "won",
                                "lost",
                              ].map((s) => ({ value: s, label: s }))}
                            />
                            <div className="field">
                              <label htmlFor="owner">
                                Owner · currently {r.owner}
                              </label>
                              <div className="input-action">
                                <input
                                  id="owner"
                                  value={owner}
                                  onChange={(e) => setOwner(e.target.value)}
                                  maxLength={100}
                                />
                                <button
                                  className="button small secondary"
                                  disabled={busy}
                                  onClick={() =>
                                    run({ type: "assign", id: r.id, owner })
                                  }
                                >
                                  Assign
                                </button>
                              </div>
                            </div>
                            <div className="field full">
                              <label htmlFor="sales-note">Internal note</label>
                              <textarea
                                id="sales-note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={2}
                                maxLength={2000}
                              />
                              <button
                                className="text-button"
                                disabled={busy || !note.trim()}
                                onClick={async () => {
                                  const id = await run({
                                    type: "note",
                                    id: r.id,
                                    note,
                                  });
                                  if (id) setNote("");
                                }}
                              >
                                Add note
                              </button>
                            </div>
                            {r.notes.map((n, i) => (
                              <p key={i} className="notice full">
                                {n}
                              </p>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="quotation">
                        <div className="section-intro">
                          <h3>
                            {t("Commercial quotation", "Oferta tregtare")}
                          </h3>
                          <p>
                            Every amount below is fictional demo data, not a
                            Kobags offer.
                          </p>
                        </div>
                        {q ? (
                          <div className="quote-document">
                            <div className="document-top">
                              <strong>DEMO QUOTATION · V{q.version}</strong>
                              <span className="status">{q.status}</span>
                            </div>
                            <p>Valid through {q.validUntil} · Currency EUR</p>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item</TableHead>
                                  <TableHead className="text-right">
                                    Demo amount
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>
                                    {r.snapshot.quantity.toLocaleString()} ×{" "}
                                    {r.snapshot.productName}
                                    <small className="block">
                                      {money(q.unitCents)} per bag
                                    </small>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {money(q.unitCents * r.snapshot.quantity)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Fictional setup</TableCell>
                                  <TableCell className="text-right">
                                    {money(q.setupCents)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <strong>Demo subtotal</strong>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <strong>
                                      {money(
                                        q.unitCents * r.snapshot.quantity +
                                          q.setupCents,
                                      )}
                                    </strong>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                            <p className="document-terms">{q.terms}</p>
                            <p>Demo payment condition: {q.payment}</p>
                            {q.change && (
                              <div className="notice">
                                Requested change: {q.change}
                              </div>
                            )}
                            <div className="actions">
                              <button
                                className="button secondary small"
                                onClick={() =>
                                  download(
                                    r.id + "-quotation-v" + q.version + ".txt",
                                    q,
                                  )
                                }
                              >
                                <Download size={14} />
                                Download demo quote
                              </button>
                              {role === "customer" && !r.order && (
                                <>
                                  <button
                                    className="button small"
                                    disabled={busy || q.status === "accepted"}
                                    onClick={() =>
                                      run(
                                        {
                                          type: "accept-quote",
                                          id: r.id,
                                          version: q.version,
                                        },
                                        t(
                                          "Quotation accepted in the demo.",
                                          "Oferta u pranua në demo.",
                                        ),
                                      )
                                    }
                                  >
                                    {q.status === "accepted"
                                      ? t("Accepted", "Pranuar")
                                      : t(
                                          "Accept demo quotation",
                                          "Prano ofertën demo",
                                        )}
                                  </button>
                                  <button
                                    className="text-button"
                                    onClick={() => {
                                      setChangeType("quote");
                                      setComment("");
                                    }}
                                  >
                                    {t("Request a change", "Kërko ndryshim")}
                                  </button>
                                </>
                              )}
                            </div>
                            {r.quotes.length > 1 && (
                              <details>
                                <summary>Previous quotation versions</summary>
                                {r.quotes.slice(0, -1).map((old) => (
                                  <p key={old.version}>
                                    v{old.version} ·{" "}
                                    {money(
                                      old.unitCents * r.snapshot.quantity +
                                        old.setupCents,
                                    )}{" "}
                                    · {old.status} ·{" "}
                                    <button
                                      className="text-button"
                                      onClick={() =>
                                        download(
                                          r.id +
                                            "-quotation-v" +
                                            old.version +
                                            ".txt",
                                          old,
                                        )
                                      }
                                    >
                                      Download
                                    </button>
                                  </p>
                                ))}
                              </details>
                            )}
                          </div>
                        ) : (
                          <div className="empty">
                            <FileText size={28} />
                            <p>No quotation has been issued yet.</p>
                          </div>
                        )}
                        {role === "admin" && !r.order && (
                          <div className="actions section-actions">
                            <button
                              className="button"
                              onClick={() => setQuoteOpen(true)}
                            >
                              {q
                                ? "Issue a revised demo quote"
                                : "Prepare a demo quotation"}
                            </button>
                            {q?.payment === "pending" && (
                              <button
                                className="button secondary"
                                disabled={busy || q.status !== "accepted"}
                                onClick={() =>
                                  run({ type: "payment", id: r.id })
                                }
                              >
                                Satisfy demo payment condition
                              </button>
                            )}
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="artwork">
                        <div className="section-intro">
                          <h3>
                            {t(
                              "The details make the bag.",
                              "Detajet e bëjnë çantën.",
                            )}
                          </h3>
                          <p>
                            Approve a specific revision. A new proof requires a
                            new approval.
                          </p>
                        </div>
                        {art ? (
                          <>
                            <div className="proof-preview">
                              <div className="document-top">
                                <strong>ARTWORK PROOF · V{art.version}</strong>
                                <span className="status">{art.status}</span>
                              </div>
                              <BagPreview design={art.design} />
                              <p className="micro">
                                Illustrative demo proof. Production dielines,
                                print area and final colors require client
                                approval.
                              </p>
                            </div>
                            {art.comment && (
                              <p className="notice">
                                Correction requested: {art.comment}
                              </p>
                            )}
                            {art.approvedAt && (
                              <p className="approval-note">
                                <CheckCircle2 size={16} />
                                Approved by {art.approver} ·{" "}
                                {date(art.approvedAt)}
                              </p>
                            )}
                            {role === "customer" && !r.order && (
                              <div className="actions section-actions">
                                <button
                                  className="button"
                                  disabled={busy || art.status !== "review"}
                                  onClick={() =>
                                    run(
                                      {
                                        type: "approve-artwork",
                                        id: r.id,
                                        version: art.version,
                                      },
                                      t(
                                        "This artwork revision is approved.",
                                        "Ky version i dizajnit u miratua.",
                                      ),
                                    )
                                  }
                                >
                                  {art.status === "approved"
                                    ? t("Artwork approved", "Dizajni u miratua")
                                    : t(
                                        "Approve this revision",
                                        "Mirato këtë version",
                                      )}
                                </button>
                                <button
                                  className="button secondary"
                                  disabled={busy}
                                  onClick={() => {
                                    setChangeType("artwork");
                                    setComment("");
                                  }}
                                >
                                  {t("Request a correction", "Kërko korrigjim")}
                                </button>
                              </div>
                            )}
                            {r.artworks.length > 1 && (
                              <details>
                                <summary>Artwork revision history</summary>
                                {r.artworks.map((a) => (
                                  <p key={a.version}>
                                    v{a.version} · issued {date(a.issuedAt)} ·{" "}
                                    {a.status}
                                    {a.approvedAt
                                      ? " · approval recorded " +
                                        date(a.approvedAt)
                                      : ""}
                                  </p>
                                ))}
                              </details>
                            )}
                          </>
                        ) : (
                          <div className="empty">
                            <p>
                              Your artwork proof will appear here when the sales
                              team issues it.
                            </p>
                          </div>
                        )}
                        {role === "admin" && !r.order && (
                          <button
                            className="button section-actions"
                            onClick={() => {
                              setCaption("");
                              setArtOpen(true);
                            }}
                          >
                            {art
                              ? "Issue a revised artwork proof"
                              : "Issue artwork proof from buyer design"}
                          </button>
                        )}
                      </TabsContent>
                      <TabsContent value="timeline">
                        <div className="handoff">
                          <h3>
                            {r.order
                              ? "Demo production handoff"
                              : "Ready for production?"}
                          </h3>
                          <ul className="gate-list">
                            {[
                              [
                                q?.status === "accepted",
                                "Latest quotation accepted",
                              ],
                              [
                                art?.status === "approved",
                                "Latest artwork revision approved",
                              ],
                              [
                                q && q.payment !== "pending",
                                "Payment condition satisfied or not required",
                              ],
                            ].map(([ok, label]) => (
                              <li
                                key={String(label)}
                                className={ok ? "complete" : ""}
                              >
                                {ok ? (
                                  <CheckCircle2 size={17} />
                                ) : (
                                  <Clock3 size={17} />
                                )}{" "}
                                {label}
                              </li>
                            ))}
                          </ul>
                          {r.order ? (
                            <>
                              <div className="notice">
                                <strong>{r.order.id}</strong>
                                <br />
                                Quote v{r.order.quoteVersion} · Artwork v
                                {r.order.artworkVersion}
                                <br />
                                Status: {r.order.status} · Demonstration only
                              </div>
                              {role === "customer" && (
                                <button
                                  className="button section-actions"
                                  onClick={repeat}
                                >
                                  <RotateCcw size={16} />{" "}
                                  {t(
                                    "Request these bags again",
                                    "Kërkoni sërish këto çanta",
                                  )}
                                </button>
                              )}
                              {role === "admin" &&
                                r.order.status !== "Dispatched" && (
                                  <button
                                    className="button secondary section-actions"
                                    disabled={busy}
                                    onClick={() => {
                                      const statuses = [
                                        "Production scheduled",
                                        "In production",
                                        "Quality review",
                                        "Ready for dispatch",
                                        "Dispatched",
                                      ];
                                      run({
                                        type: "order-stage",
                                        id: r.id,
                                        status:
                                          statuses[
                                            statuses.indexOf(r.order!.status) +
                                              1
                                          ],
                                      });
                                    }}
                                  >
                                    Advance demo production status{" "}
                                    <ArrowRight size={15} />
                                  </button>
                                )}
                            </>
                          ) : role === "admin" ? (
                            <button
                              className="button"
                              disabled={busy || !releaseReady}
                              onClick={() =>
                                run(
                                  { type: "release", id: r.id },
                                  "Demo production handoff created with the approved versions.",
                                )
                              }
                            >
                              <LockKeyhole size={15} />
                              Create demo production handoff
                            </button>
                          ) : (
                            <p>
                              Once approvals are complete, the sales team can
                              release this demonstration order.
                            </p>
                          )}
                        </div>
                        <ol className="timeline">
                          {[...r.events].reverse().map((e, i) => (
                            <li key={i}>
                              <span />
                              <div>
                                <p>{e.message}</p>
                                <small>
                                  {e.actor} · {date(e.at)}
                                </small>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </TabsContent>
                    </Tabs>
                  </section>
                )}
              </div>
            )}
          </TabsContent>
          {role === "admin" && (
            <>
              <TabsContent value="companies">
                <div className="section-card">
                  <h2>Companies in this demo</h2>
                  <div className="search-field">
                    <Search size={17} />
                    <input
                      aria-label="Search companies"
                      placeholder="Search company or email…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Request history</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {state.requests
                        .filter(
                          (r, i, a) =>
                            a.findIndex(
                              (q) => q.snapshot.email === r.snapshot.email,
                            ) === i,
                        )
                        .filter((r) =>
                          (r.snapshot.company + " " + r.snapshot.email)
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                        )
                        .map((r) => (
                          <TableRow key={r.id}>
                            <TableCell>{r.snapshot.company}</TableCell>
                            <TableCell>
                              {r.snapshot.contact}
                              <small className="block">
                                {r.snapshot.email}
                              </small>
                            </TableCell>
                            <TableCell>
                              {state.requests
                                .filter(
                                  (q) => q.snapshot.email === r.snapshot.email,
                                )
                                .map((q) => (
                                  <button
                                    key={q.id}
                                    className="text-button history-link"
                                    onClick={() => {
                                      setSelected(q.id);
                                      setTab("requests");
                                      setSearch("");
                                    }}
                                  >
                                    {q.id}
                                    {q.order ? " · order released" : ""}
                                  </button>
                                ))}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="content">
                <div className="grid-two">
                  <section className="section-card">
                    <h2>Product catalog</h2>
                    <Choice
                      id="edit-product"
                      label="Product"
                      value={product}
                      onChange={setProduct}
                      options={state.catalog.map((p) => ({
                        value: p.slug,
                        label: p.name,
                      }))}
                    />
                    <div className="field">
                      <label htmlFor="product-description">
                        Description draft
                      </label>
                      <textarea
                        id="product-description"
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={800}
                      />
                    </div>
                    <div className="notice">Preview: {description}</div>
                    <div className="actions section-actions">
                      <button
                        className="button secondary"
                        disabled={busy}
                        onClick={() =>
                          run({
                            type: "save-product",
                            slug: product,
                            description,
                          })
                        }
                      >
                        Save draft
                      </button>
                      <button
                        className="button"
                        disabled={busy || !state.drafts[product]}
                        onClick={() =>
                          run(
                            { type: "publish-product", slug: product },
                            "Published to this demo catalog. Existing requests keep their original specifications.",
                          )
                        }
                      >
                        Publish in demo
                      </button>
                      <Link
                        href={"/products/" + product}
                        className="text-button"
                      >
                        View product ↗
                      </Link>
                    </div>
                    <p className="source-note">
                      Variant specifications remain source-backed. Product
                      descriptions publish to this private demonstration only.
                    </p>
                  </section>
                  <section className="section-card">
                    <h2>Commercial display rules</h2>
                    <div className="form-grid">
                      <div className="field">
                        <label htmlFor="moq">Minimum quantity</label>
                        <input
                          id="moq"
                          type="number"
                          min={1}
                          value={moq}
                          onChange={(e) => setMoq(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="response-hours">
                          Response target (business hours)
                        </label>
                        <input
                          id="response-hours"
                          type="number"
                          min={1}
                          value={responseHours}
                          onChange={(e) => setResponseHours(e.target.value)}
                        />
                      </div>
                      <div className="field full">
                        <label htmlFor="lead-time">Dispatch guidance</label>
                        <textarea
                          id="lead-time"
                          rows={4}
                          value={lead}
                          onChange={(e) => setLead(e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="source-note">
                      Demo business hours: Monday–Friday, 09:00–17:00 UTC.
                      Target is a configurable demo setting, not a Kobags
                      response promise.
                    </p>
                    <button
                      className="button section-actions"
                      disabled={busy}
                      onClick={() =>
                        run({
                          type: "settings",
                          moq: Number(moq),
                          leadTime: lead,
                          responseHours: Number(responseHours),
                        })
                      }
                    >
                      Save rules
                    </button>
                  </section>
                </div>
                <section className="section-card content-register">
                  <h2>Evidence, certificates & buying guides</h2>
                  <p>
                    Public wording stays scoped to the source. Draft changes
                    require an owner before publication.
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {state.content.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell>
                            <strong>{c.title}</strong>
                            <small className="block">{c.type}</small>
                          </TableCell>
                          <TableCell>{c.owner}</TableCell>
                          <TableCell>
                            <span className="status">{c.status}</span>
                          </TableCell>
                          <TableCell>
                            <button
                              className="text-button"
                              onClick={() => {
                                setContentId(c.id);
                                setContentBody(c.draft || c.body);
                                setContentOwner(c.owner);
                                setReview(c.review);
                              }}
                            >
                              Edit / preview
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </section>
              </TabsContent>
              <TabsContent value="inquiries">
                <div className="section-card">
                  <h2>Samples, partners & general questions</h2>
                  {state.inquiries.length ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company / contact</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {state.inquiries.map((i) => (
                          <TableRow key={i.id}>
                            <TableCell>
                              {i.company}
                              <small className="block">{i.email}</small>
                            </TableCell>
                            <TableCell>
                              {i.kind}
                              <small className="block">{i.model}</small>
                            </TableCell>
                            <TableCell>
                              {i.message}
                              <small className="block">{i.country}</small>
                            </TableCell>
                            <TableCell>
                              <Choice
                                id={"i-" + i.id}
                                label="Review status"
                                value={i.status}
                                onChange={(status) =>
                                  run({
                                    type: "inquiry-stage",
                                    id: i.id,
                                    status,
                                  })
                                }
                                options={[
                                  "new",
                                  "reviewing",
                                  "accepted",
                                  "declined",
                                ].map((s) => ({ value: s, label: s }))}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="empty">
                      <p>
                        Sample inquiries and partner applications appear here
                        after submission.
                      </p>
                      <Link href="/partners" className="text-button">
                        View partner routes ↗
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="outbox">
                <div className="section-card">
                  <h2>Notification previews</h2>
                  <p>
                    These messages are stored for demonstration. Nothing has
                    been sent.
                  </p>
                  {state.outbox.length ? (
                    state.outbox.map((item) => (
                      <article className="outbox-item" key={item.id}>
                        <Send size={18} />
                        <div>
                          <strong>{item.subject}</strong>
                          <p>{item.body}</p>
                          <small>
                            {date(item.createdAt)} · {item.requestId} · Preview
                            only
                          </small>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="empty">No notification previews yet.</div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="activity">
                <div className="section-card">
                  <h2>Recorded actions</h2>
                  <ol className="timeline">
                    {state.audit.map((e, i) => (
                      <li key={i}>
                        <span />
                        <div>
                          <p>{e.message}</p>
                          <small>
                            {e.actor} · {date(e.at)}
                          </small>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <button
                    className="button secondary"
                    onClick={() => download("kobags-demo-export.json", state)}
                  >
                    <Download size={16} />
                    Export demo records
                  </button>
                  <button
                    className="text-button reset-button"
                    onClick={() => setResetOpen(true)}
                  >
                    Reset synthetic demo
                  </button>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      )}
      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent>
          <DialogTitle>Issue a fictional demo quotation</DialogTitle>
          <DialogDescription>
            All amounts are demo data. No commercial offer or email is sent.
          </DialogDescription>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="unit-cents">Unit price (EUR cents)</label>
              <input
                id="unit-cents"
                type="number"
                min={1}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="setup-cents">Setup (EUR cents)</label>
              <input
                id="setup-cents"
                type="number"
                min={0}
                value={setup}
                onChange={(e) => setSetup(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="quote-valid">Valid through</label>
              <input
                id="quote-valid"
                type="date"
                value={valid}
                onChange={(e) => setValid(e.target.value)}
              />
            </div>
            <Choice
              id="quote-payment"
              label="Demo payment condition"
              value={payment}
              onChange={setPayment}
              options={[
                { value: "not-required", label: "Not required" },
                { value: "pending", label: "Required before release" },
              ]}
            />
            <div className="field full">
              <label htmlFor="quote-terms">Fictional terms</label>
              <textarea
                id="quote-terms"
                rows={3}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <p className="error">{(errors[error] || errors.SAVE_FAILED)[0]}</p>
          )}
          <button
            className="button"
            disabled={busy}
            onClick={async () => {
              const id = await run(
                {
                  type: "issue-quote",
                  id: r?.id,
                  unitCents: Number(unit),
                  setupCents: Number(setup),
                  validUntil: valid,
                  terms,
                  payment,
                },
                "Demo quotation issued to the customer workspace and preview outbox.",
              );
              if (id) setQuoteOpen(false);
            }}
          >
            Issue demo quotation
          </button>
        </DialogContent>
      </Dialog>
      <Dialog open={artOpen} onOpenChange={setArtOpen}>
        <DialogContent>
          <DialogTitle>
            {art ? "Issue revised artwork" : "Issue buyer artwork proof"}
          </DialogTitle>
          <DialogDescription>
            The first proof preserves the buyer’s uploaded logo and placement.
            Optional replacement text demonstrates a revised design.
          </DialogDescription>
          <div className="field">
            <label htmlFor="proof-caption">
              Replace front artwork with text (optional)
            </label>
            <textarea
              id="proof-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={60}
            />
          </div>
          {art?.comment && (
            <p className="notice">Buyer requested: {art.comment}</p>
          )}
          <button
            className="button"
            disabled={busy}
            onClick={async () => {
              const id = await run(
                { type: "issue-artwork", id: r?.id, caption },
                "New artwork revision issued. This revision requires approval.",
              );
              if (id) setArtOpen(false);
            }}
          >
            Issue artwork revision
          </button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!changeType}
        onOpenChange={(v) => {
          if (!v) setChangeType(null);
        }}
      >
        <DialogContent>
          <DialogTitle>
            {t(
              "What would you like to change?",
              "Çfarë dëshironi të ndryshoni?",
            )}
          </DialogTitle>
          <DialogDescription>
            {t(
              "Your request is attached to this specific revision.",
              "Kërkesa juaj lidhet me këtë version të caktuar.",
            )}
          </DialogDescription>
          <label htmlFor="change-comment">
            {t("Requested change", "Ndryshimi i kërkuar")}
          </label>
          <textarea
            id="change-comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={2000}
          />
          <button
            className="button"
            disabled={busy || !comment.trim()}
            onClick={async () => {
              const id = await run(
                {
                  type:
                    changeType === "quote" ? "quote-change" : "artwork-change",
                  id: r?.id,
                  version: changeType === "quote" ? q?.version : art?.version,
                  comment,
                },
                t("Change request recorded.", "Kërkesa për ndryshim u ruajt."),
              );
              if (id) setChangeType(null);
            }}
          >
            {t("Request change", "Kërko ndryshim")}
          </button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!contentId}
        onOpenChange={(v) => {
          if (!v) setContentId("");
        }}
      >
        <DialogContent>
          <DialogTitle>Edit content evidence</DialogTitle>
          <DialogDescription>
            {state?.content.find((c) => c.id === contentId)?.source}
          </DialogDescription>
          <div className="field">
            <label htmlFor="content-body">Draft wording</label>
            <textarea
              id="content-body"
              rows={5}
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="content-owner">Approval owner</label>
            <input
              id="content-owner"
              value={contentOwner}
              onChange={(e) => setContentOwner(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="content-review">Review date</label>
            <input
              id="content-review"
              type="date"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="notice">Preview: {contentBody}</div>
          {error && (
            <p className="error">{(errors[error] || errors.SAVE_FAILED)[0]}</p>
          )}
          <DialogFooter>
            <button
              className="button secondary"
              disabled={busy}
              onClick={() =>
                run({
                  type: "content-save",
                  id: contentId,
                  body: contentBody,
                  owner: contentOwner,
                  review,
                })
              }
            >
              Save draft
            </button>
            <button
              className="button"
              disabled={
                busy || !state?.content.find((c) => c.id === contentId)?.draft
              }
              onClick={() => run({ type: "content-publish", id: contentId })}
            >
              Publish in demo
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogTitle>Reset the synthetic demonstration?</DialogTitle>
          <DialogDescription>
            This removes this private demo’s requests, quotations, approvals,
            inquiries and content edits. It does not contact or modify Kobags’
            live systems. Download an export first if needed.
          </DialogDescription>
          <DialogFooter>
            <button
              className="button secondary"
              onClick={() => setResetOpen(false)}
            >
              Keep demo
            </button>
            <button
              className="button"
              disabled={busy}
              onClick={async () => {
                try {
                  await act({ type: "reset" });
                  setSelected("");
                  setResetOpen(false);
                  setFeedback("Synthetic demonstration reset.");
                } catch {}
              }}
            >
              Reset demo records
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
