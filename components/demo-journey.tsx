"use client";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "./site-link";
import { useKobags } from "./kobags-context";
import type { Request } from "@/lib/demo-domain";

export function DemoJourney({
  request,
  busy,
  prepare,
  review,
  payment,
}: {
  request: Request;
  busy: boolean;
  prepare: () => void;
  review: (tab: string) => void;
  payment: () => void;
}) {
  const { t } = useKobags();
  const q = request.quotes.at(-1),
    art = request.artworks.at(-1);
  const step = request.order
    ? 4
    : q?.status !== "accepted"
      ? 1
      : art?.status !== "approved"
        ? 2
        : 3;
  const revision =
    q?.status === "changes-requested" ||
    art?.status === "changes-requested" ||
    (q && q.validUntil < new Date().toISOString().slice(0, 10));
  return (
    <section
      className="demo-journey"
      aria-label={t("Your demo order journey", "Hapat e porosisë demo")}
    >
      <ol className="demo-journey-steps">
        {[
          t("Request saved", "Kërkesa u ruajt"),
          t("Review quote", "Shqyrto ofertën"),
          t("Approve artwork", "Mirato dizajnin"),
          t("Place demo order", "Vendos porosinë demo"),
        ].map((label, i) => (
          <li
            key={i}
            className={i < step ? "done" : i === step ? "current" : ""}
            aria-current={i === step ? "step" : undefined}
          >
            <span>{i < step ? <CheckCircle2 size={17} /> : `0${i + 1}`}</span>
            {label}
          </li>
        ))}
      </ol>
      <div className="demo-journey-body">
        <div>
          <p className="eyebrow">
            {t("TRY THE COMPLETE JOURNEY", "PROVONI TË GJITHË PROCESIN")}
          </p>
          <h3>
            {request.order
              ? t("Your demo order is placed.", "Porosia juaj demo u vendos.")
              : revision
                ? t(
                    "Your changes are ready for review.",
                    "Ndryshimet tuaja presin shqyrtim.",
                  )
                : !q || !art
                  ? t(
                      "Let’s turn your design into an order.",
                      "Le ta kthejmë dizajnin në porosi.",
                    )
                  : step === 1
                    ? t(
                        "Your demo quotation is ready.",
                        "Oferta juaj demo është gati.",
                      )
                    : step === 2
                      ? t(
                          "Give your artwork a final look.",
                          "Shqyrtoni dizajnin përfundimtar.",
                        )
                      : t(
                          "Ready to place your demo order.",
                          "Gati për porosinë tuaj demo.",
                        )}
          </h3>
          <p>
            {request.order ? (
              <>
                <strong>{request.order.id}</strong> ·{" "}
                {request.snapshot.quantity.toLocaleString()}{" "}
                {t("bags", "çanta")} · {request.snapshot.city},{" "}
                {request.snapshot.country}
              </>
            ) : revision ? (
              t(
                "Open the sales view to issue the updated quotation or artwork, then return here to approve it.",
                "Hapni pamjen e shitjeve për ofertën ose dizajnin e përditësuar, pastaj kthehuni për miratim.",
              )
            ) : !q || !art ? (
              t(
                "Prepare a fictional quotation and a proof of your exact design. Review both, then place a simulated order—all in this demo.",
                "Përgatitni një ofertë fiktive dhe provën e dizajnit tuaj. Shqyrtojini dhe vendosni një porosi të simuluar.",
              )
            ) : step === 1 ? (
              t(
                "Review the example prices and terms before accepting. They are for demonstration only.",
                "Shqyrtoni çmimet dhe kushtet shembull para pranimit. Janë vetëm për demonstrim.",
              )
            ) : step === 2 ? (
              t(
                "Check your bag, color and branding. Your approval applies to this artwork revision.",
                "Kontrolloni çantën, ngjyrën dhe markën. Miratimi vlen për këtë version.",
              )
            ) : (
              t(
                "Your quote and artwork are approved. Confirm the final step to see your demo order number.",
                "Oferta dhe dizajni janë miratuar. Konfirmoni hapin e fundit për numrin e porosisë demo.",
              )
            )}
          </p>
        </div>
        <div className="demo-journey-action">
          {revision && !request.order ? (
            <Link className="button" href={"/demo/admin?id=" + request.id}>
              {t("Review in sales demo", "Shqyrto në demo e shitjeve")}{" "}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <button
              className="button"
              disabled={busy}
              onClick={() => {
                if (request.order) review("timeline");
                else if (!q || !art) prepare();
                else if (step === 1) review("quotation");
                else if (step === 2) review("artwork");
                else if (q.payment === "pending") payment();
                else review("timeline");
              }}
            >
              {busy
                ? t("Saving…", "Duke ruajtur…")
                : request.order
                  ? t("View order details", "Shiko porosinë")
                  : !q || !art
                    ? t("Prepare my demo quote", "Përgatit ofertën demo")
                    : step === 1
                      ? t("Review demo quote", "Shqyrto ofertën demo")
                      : step === 2
                        ? t("Review my artwork", "Shqyrto dizajnin")
                        : q.payment === "pending"
                          ? t(
                              "Simulate payment confirmation",
                              "Simulo konfirmimin e pagesës",
                            )
                          : t(
                              "Review & place demo order",
                              "Shqyrto dhe porosit në demo",
                            )}{" "}
              <ArrowRight size={16} />
            </button>
          )}
          <span>
            {t(
              "Demo only. No charge. No real order sent.",
              "Vetëm demo. Pa pagesë. Pa porosi reale.",
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
