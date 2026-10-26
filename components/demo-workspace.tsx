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
import { Choice } from "./choice";
import { BagPreview } from "./bag-preview";
import { DemoJourney } from "./demo-journey";
import { initialDesign } from "@/lib/catalog";
import { workspaceLabel, workspaceEvent } from "@/lib/workspace-copy";
import { languageHref } from "@/lib/site-locale";
const formatMoney = (n: number, lang: "en" | "sq") =>
  new Intl.NumberFormat(lang === "sq" ? "sq-AL" : "en", { style: "currency", currency: "EUR" }).format(
    n / 100,
  );
const albanianMonths = ["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor"];
const formatDate = (s: string, lang: "en" | "sq") => {
  const value = new Date(s);
  // Some browsers ship no Albanian locale data. Keep dates Albanian there too.
  if (lang === "sq") {
    const time = `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
    return `${value.getDate()} ${albanianMonths[value.getMonth()]} ${value.getFullYear()}, ${time}`;
  }
  return value.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
};
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
  const { t, lang, replace, studioEnabled } = useKobags();
  const money = (n: number) => formatMoney(n, lang);
  const date = (value: string) => formatDate(value, lang);
  const label = (value: string) => workspaceLabel(value, lang);
  const { state, error, busy, act, refresh } = useDemo();
  const [selected, setSelected] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("requests");
  const [detailTab, setDetailTab] = useState("overview");
  const [proofSide, setProofSide] = useState<"front" | "back">("front");
  const [note, setNote] = useState("");
  const [owner, setOwner] = useState("Demo sales team");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [artOpen, setArtOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [unit, setUnit] = useState("45");
  const [setup, setSetup] = useState("12000");
  const [valid, setValid] = useState(
    () => new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
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
  const [descriptionEdit, setDescriptionEdit] = useState<{ product: string; value: string } | null>(null);
  const description = descriptionEdit?.product === product ? descriptionEdit.value : state?.drafts[product] ?? state?.catalog.find((entry) => entry.slug === product)?.description ?? "";
  const setDescription = (value: string) => setDescriptionEdit({ product, value });
  const [moqEdit, setMoq] = useState<string | null>(null);
  const [leadEdit, setLead] = useState<string | null>(null);
  const [responseHoursEdit, setResponseHours] = useState<string | null>(null);
  const moq = moqEdit ?? String(state?.settings.moq ?? 5000);
  const lead = leadEdit ?? state?.settings.leadTime ?? "";
  const responseHours = responseHoursEdit ?? String(state?.settings.responseHours ?? 48);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = new URLSearchParams(location.search).get("id");
      if (id) setSelected(id);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const run = async (
    a: Record<string, unknown>,
    message = t("Saved in the demo.", "U ruajt në demonstrim."),
  ) => {
    try {
      const id = await act(a);
      setFeedback(message);
      return id;
    } catch {
      return undefined;
    }
  };
  const r = selected ? state?.requests.find((r) => r.id === selected) : state?.requests[0];
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
    const orderedArtwork = r.artworks.find((artwork) => artwork.version === r.order!.artworkVersion);
    replace({
      ...d,
      ...orderedArtwork?.design,
      key: crypto.randomUUID(),
      reorderOf: r.id,
      date: "",
      consent: false,
    });
    try {
      localStorage.setItem("kobags-quote-step", "2");
    } catch {}
    window.location.assign(languageHref("/quote", lang));
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
      t("Fictional example created.", "Shembulli fiktiv u krijua."),
    );
    if (id) setSelected(id);
  };
  return (
    <main
      className={
        role === "customer" && (state?.requests.length || 0) < 2
          ? "workspace customer-demo-single"
          : "workspace"
      }
    >
      <div className="demo-banner">
        <LockKeyhole size={15} />
        <span>
          {t(
            "TRY THE DEMO · Your own test workspace. No payments or real orders.",
            "PROVONI DEMON · Hapësira juaj e testimit. Pa pagesa ose porosi reale.",
          )}
        </span>
        <Link
          href={
            (role === "admin" ? "/demo/customer" : "/demo/admin") +
            (r ? "?id=" + r.id : "")
          }
        >
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
              ? t("KOBAGS SALES & CONTENT", "KOBAGS / SHITJET DHE PËRMBAJTJA")
              : t("YOUR KOBAGS WORKSPACE", "HAPËSIRA JUAJ KOBAGS")}
          </p>
          <h1>
            {role === "admin"
              ? t("From inquiry to approved.", "Nga kërkesa te miratimi.")
              : t("Your bags. Every detail.", "Çantat tuaja. Çdo detaj.")}
          </h1>
          <p>
            {role === "admin"
              ? t("The same design. A clear next step.", "I njëjti dizajn. Hapi i radhës, i qartë.")
              : t("Review quotations, approve artwork and start your next order.", "Shqyrtoni ofertat, miratoni dizajnin dhe vazhdoni me porosinë tuaj.")}
          </p>
        </div>
        <div className="actions">
          <button className="button secondary small" onClick={() => refresh()}>
            {t("Refresh", "Rifresko")}
          </button>
          <Link className="button small" href={studioEnabled ? "/design" : "/products"}>
            {studioEnabled ? t("Open bag studio", "Hap studion e çantave") : t("Choose your bag", "Zgjidhni çantën tuaj")} <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      {error && (
        <div className="error" role="alert">
          {(errors[error] || errors.SAVE_FAILED)[lang === "sq" ? 1 : 0]}{" "}
          <button className="text-button" onClick={() => refresh()}>
            {t("Retry", "Provo përsëri")}
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
        <div className="loading">{t("Loading your demonstration…", "Po hapet demonstrimi juaj…")}</div>
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
                  aria-label={t("Search requests", "Kërko kërkesat")}
                  placeholder={t("Search company or request…", "Kërko kompaninë ose kërkesën…")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Choice
                id="inbox-filter"
                label={t("Status", "Statusi")}
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
                      ? t("All requests", "Të gjitha kërkesat")
                      : s === "overdue"
                        ? t("Overdue (business hours)", "Me vonesë (orë pune)")
                        : label(s),
                }))}
              />
            </div>
            {!state.requests.length ? (
              <div className="empty">
                <Inbox size={32} />
                <h3>{t("Your first design starts here.", "Dizajni juaj i parë fillon këtu.")}</h3>
                <p>
                  {t("Prepare a bag quotation request, or create a fictional example to explore the approval journey.", "Përgatitni një kërkesë për ofertë ose krijoni një shembull fiktiv për të provuar procesin e miratimit.")}
                </p>
                <div className="actions">
                  <Link href={studioEnabled ? "/design" : "/products"} className="button">
                    {t("Choose a bag", "Zgjidhni një çantë")}
                  </Link>
                  <button
                    className="button secondary"
                    disabled={busy}
                    onClick={example}
                  >
                    {t("Create fictional example", "Krijo shembull fiktiv")}
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
                          <span className="status">{label(item.stage)}</span>
                        </div>
                        <strong>{item.snapshot.company}</strong>
                        <span>
                          {item.snapshot.productName} ·{" "}
                          {item.snapshot.quantity.toLocaleString()} {t("bags", "çanta")}
                        </span>
                        <small>{date(item.createdAt)}</small>
                      </button>
                    ))
                  ) : (
                    <div className="empty">
                      <p>{t("No requests match this filter.", "Asnjë kërkesë nuk përputhet me këtë filtër.")}</p>
                      <button
                        className="text-button"
                        onClick={() => {
                          setSearch("");
                          setFilter("all");
                        }}
                      >
                        {t("Clear filters", "Pastro filtrat")}
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
                        aria-label={t("Download request specification", "Shkarko specifikimet e kërkesës")}
                        onClick={() => download(r.id + "-specification.txt", r)}
                      >
                        <Download size={18} />
                      </button>
                    </div>
                    {role === "customer" && (
                      <DemoJourney
                        request={r}
                        busy={busy}
                        prepare={async () => {
                          const id = await run(
                            { type: "prepare-demo", id: r.id },
                            t(
                              "Demo quote and artwork are ready for your review.",
                              "Oferta dhe dizajni demo janë gati për shqyrtim.",
                            ),
                          );
                          if (id) setDetailTab("quotation");
                        }}
                        review={(value) => {
                          setDetailTab(value);
                          requestAnimationFrame(() =>
                            document
                              .querySelector(".detail-tabs")
                              ?.scrollIntoView({
                                block: "start",
                                behavior: "smooth",
                              }),
                          );
                        }}
                        payment={() =>
                          run(
                            { type: "payment", id: r.id },
                            t(
                              "Demo payment confirmed. No money was collected.",
                              "Pagesa demo u konfirmua. Nuk u mor asnjë pagesë.",
                            ),
                          )
                        }
                      />
                    )}
                    <Tabs value={detailTab} onValueChange={setDetailTab}>
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
                              [t("Bag", "Çanta"), r.snapshot.productName],
                              [
                                t("Size", "Madhësia"),
                                label(r.snapshot.size) + " · " + r.snapshot.dimensions,
                              ],
                              [
                                t("Material", "Materiali"),
                                t("Non-woven PP", "PP jo i endur") + " · " + r.snapshot.gsm + " GSM",
                              ],
                              [t("Color", "Ngjyra"), label(r.snapshot.color)],
                              [
                                t("Print", "Shtypi"),
                                r.snapshot.printColors + t(" color(s), flexographic", " ngjyrë(a), fleksografik"),
                              ],
                              [
                                t("Quantity", "Sasia"),
                                r.snapshot.quantity.toLocaleString(),
                              ],
                              [
                                t("Destination", "Destinacioni"),
                                r.snapshot.city + ", " + r.snapshot.country,
                              ],
                              [
                                t("Requested date", "Data e kërkuar"),
                                r.snapshot.date || t("To discuss", "Për diskutim"),
                              ],
                              [
                                t("Artwork", "Dizajni"),
                                r.snapshot.logoName ||
                                  r.snapshot.text ||
                                  t("Not provided", "Nuk është dhënë"),
                              ],
                              [t("Source", "Burimi"), workspaceEvent(label(r.source), lang)],
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
                            {t("Buyer note", "Shënimi i blerësit")}: {r.snapshot.note}
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
                            {t("Every amount below is fictional demo data, not a Kobags offer.", "Çdo shumë më poshtë është fiktive për demonstrim, jo ofertë e Kobags.")}
                          </p>
                        </div>
                        {q ? (
                          <div className="quote-document">
                            <div className="document-top">
                              <strong>{t("DEMO QUOTATION", "OFERTË DEMO")} · V{q.version}</strong>
                              <span className="status">{label(q.status)}</span>
                            </div>
                            <p>{t("Valid through", "E vlefshme deri më")} {q.validUntil} · {t("Currency", "Valuta")} EUR</p>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>{t("Item", "Artikulli")}</TableHead>
                                  <TableHead className="text-right">
                                    {t("Demo amount", "Shuma demo")}
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>
                                    {r.snapshot.quantity.toLocaleString()} ×{" "}
                                    {r.snapshot.productName}
                                    <small className="block">
                                      {money(q.unitCents)} {t("per bag", "për çantë")}
                                    </small>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {money(q.unitCents * r.snapshot.quantity)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>{t("Fictional setup", "Përgatitje fiktive")}</TableCell>
                                  <TableCell className="text-right">
                                    {money(q.setupCents)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <strong>{t("Demo subtotal", "Nëntotali demo")}</strong>
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
                            <p className="document-terms">{label(q.terms)}</p>
                            <p>{t("Demo payment condition", "Kushti i pagesës demo")}: {label(q.payment)}</p>
                            {q.change && (
                              <div className="notice">
                                {t("Requested change", "Ndryshimi i kërkuar")}: {q.change}
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
                                {t("Download demo quote", "Shkarko ofertën demo")}
                              </button>
                              {role === "customer" && !r.order && (
                                <>
                                  <button
                                    className="button small"
                                    disabled={busy || q.status !== "issued" || q.validUntil < new Date().toISOString().slice(0, 10)}
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
                                      : q.status === "changes-requested" ? t("Awaiting revised quote", "Në pritje të ofertës së rishikuar") : t(
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
                                <summary>{t("Previous quotation versions", "Versionet e mëparshme të ofertës")}</summary>
                                {r.quotes.slice(0, -1).map((old) => (
                                  <p key={old.version}>
                                    v{old.version} ·{" "}
                                    {money(
                                      old.unitCents * r.snapshot.quantity +
                                        old.setupCents,
                                    )}{" "}
                                    · {label(old.status)} ·{" "}
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
                                      {t("Download", "Shkarko")}
                                    </button>
                                  </p>
                                ))}
                              </details>
                            )}
                          </div>
                        ) : (
                          <div className="empty">
                            <FileText size={28} />
                            <p>{t("No quotation has been issued yet.", "Ende nuk është lëshuar ofertë.")}</p>
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
                            {t("Approve a specific revision. A new proof requires a new approval.", "Miratoni një version të caktuar. Prova e re kërkon miratim të ri.")}
                          </p>
                        </div>
                        {art ? (
                          <>
                            <div className="proof-preview">
                              <div className="document-top">
                                <strong>{t("ARTWORK PROOF", "PROVA E DIZAJNIT")} · V{art.version}</strong>
                                <span className="status">{label(art.status)}</span>
                              </div>
                              <div className="proof-side-controls" role="group" aria-label={t("Artwork proof side", "Ana e provës së dizajnit")}>
                                {(["front", "back"] as const).map((side) => (
                                  <button type="button" key={side} className="button secondary small" aria-pressed={proofSide === side} onClick={() => setProofSide(side)}>
                                    {t(side === "front" ? "Front" : "Back", side === "front" ? "Përpara" : "Prapa")}
                                  </button>
                                ))}
                              </div>
                              <BagPreview design={{ ...art.design, side: proofSide }} />
                              <p className="micro">{t("Review both sides before approving this revision.", "Shqyrtoni të dyja anët para se të miratoni këtë version.")}</p>
                              <p className="micro">
                                {t("Illustrative demo proof. Production dielines, print area and final colors require client approval.", "Provë ilustruese demo. Modelet teknike, zona e shtypit dhe ngjyrat përfundimtare kërkojnë miratim nga klienti.")}
                              </p>
                            </div>
                            {art.comment && (
                              <p className="notice">
                                {t("Correction requested", "Korrigjimi i kërkuar")}: {art.comment}
                              </p>
                            )}
                            {art.approvedAt && (
                              <p className="approval-note">
                                <CheckCircle2 size={16} />
                                {t("Approved by", "Miratuar nga")} {art.approver} ·{" "}
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
                                <summary>{t("Artwork revision history", "Historiku i versioneve të dizajnit")}</summary>
                                {r.artworks.map((a) => (
                                  <p key={a.version}>
                                    v{a.version} · {t("issued", "lëshuar")} {date(a.issuedAt)} ·{" "}
                                    {label(a.status)}
                                    {a.approvedAt
                                      ? t(" · approval recorded ", " · miratimi u regjistrua ") +
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
                              {t("Your artwork proof will appear here when the sales team issues it.", "Prova e dizajnit shfaqet këtu kur ekipi i shitjeve e lëshon.")}
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
                            {role === "customer"
                              ? r.order
                                ? t("Your demo order", "Porosia juaj demo")
                                : t(
                                    "Place your demo order",
                                    "Vendosni porosinë demo",
                                  )
                              : r.order
                                ? "Demo production handoff"
                                : "Ready for production?"}
                          </h3>
                          <ul className="gate-list">
                            {[
                              [
                                q?.status === "accepted",
                                t("Latest quotation accepted", "Oferta e fundit u pranua"),
                              ],
                              [
                                art?.status === "approved",
                                t("Latest artwork revision approved", "Versioni i fundit i dizajnit u miratua"),
                              ],
                              [
                                q && q.payment !== "pending",
                                t("Payment condition satisfied or not required", "Kushti i pagesës u plotësua ose nuk kërkohet"),
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
                                {t("Quote", "Oferta")} v{r.order.quoteVersion} · {t("Artwork", "Dizajni")} v
                                {r.order.artworkVersion}
                                <br />
                                {t("Status", "Statusi")}: {label(r.order.status)} · {t("Demonstration only", "Vetëm për demonstrim")}
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
                            <div className="demo-order-confirm">
                              <p>
                                {t(
                                  "This confirms a simulated order using your approved quote and artwork. No payment is collected and nothing is sent to production.",
                                  "Kjo konfirmon një porosi të simuluar me ofertën dhe dizajnin e miratuar. Nuk merret pagesë dhe nuk nis prodhimi.",
                                )}
                              </p>
                              <button
                                className="button"
                                disabled={busy || !releaseReady}
                                onClick={() =>
                                  run(
                                    { type: "release", id: r.id },
                                    t(
                                      "Your demo order is placed. No real order was sent.",
                                      "Porosia demo u vendos. Nuk u dërgua porosi reale.",
                                    ),
                                  )
                                }
                              >
                                {t("Place demo order", "Vendos porosinë demo")}{" "}
                                <ArrowRight size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                        <ol className="timeline">
                          {[...r.events].reverse().map((e, i) => (
                            <li key={i}>
                              <span />
                              <div>
                                <p>{workspaceEvent(e.message, lang)}</p>
                                <small>
                                  {label(e.actor)} · {date(e.at)}
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
                      descriptions publish to this website demonstration only.
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
                          <p>{workspaceEvent(e.message, lang)}</p>
                          <small>
                            {label(e.actor)} · {date(e.at)}
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
            This removes this demo workspace’s requests, quotations, approvals,
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
                  setDescriptionEdit(null);
                  setMoq(null);
                  setLead(null);
                  setResponseHours(null);
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
