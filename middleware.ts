import { redirectedPath } from "./lib/cms/routes";
import { publicContent } from "./lib/cms/public";
import { NextRequest, NextResponse } from "next/server";
import { contentPath, languageHref } from "./lib/site-locale";
import { indexablePath } from "./lib/seo-config";
import { studioEnabledForHost, isStudioPreviewHost, isStudioPath } from "./lib/studio-availability";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const studioEnabled = studioEnabledForHost(url.hostname);
  const studioPreview = isStudioPreviewHost(url.hostname);
  if (pathname.length > 1 && pathname.endsWith("/")) {
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 308);
  }
  const lang = pathname === "/sq" || pathname.startsWith("/sq/") ? "sq" : "en";
  const path = contentPath(pathname);
  // Only the exact testing subdomain (and local development) opens the editor.
  if (!studioEnabled && isStudioPath(path)) {
    url.pathname = languageHref("/products", lang);
    url.search = "";
    const response = NextResponse.redirect(url, 307);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
  const redirected=await redirectedPath(path);
  if(redirected){url.pathname=languageHref(redirected,lang);return NextResponse.redirect(url,301);}
  // Preserve the chosen language on legacy links from the original website.
  const aliases: Record<string, string> = { "/shop": "/products", "/shop-catalog": "/products", "/blog-home": "/blog", "/privacy-policy": "/privacy", "/terms-conditions": "/terms", "/contact-us": "/contact", "/partner": "/partners", "/become-partner": "/partners/apply", "/thank-you": "/quote" };
  const oldProduct = path.match(/^\/(?:shop-catalog|kobags-bagsdetails)\/([^/]+)$/);
  const destination = aliases[path] || (oldProduct ? "/products/" + oldProduct[1] : undefined);
  if (lang === "sq" && destination) {
    url.pathname = languageHref(destination, lang);
    return NextResponse.redirect(url, path === "/thank-you" ? 307 : 308);
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-kobags-language", lang);
  requestHeaders.set("x-kobags-studio-enabled", studioEnabled ? "1" : "0");
  requestHeaders.set("x-kobags-studio-preview", studioPreview ? "1" : "0");
  const response = lang === "sq" && !/^\/(api|assets|documents|_next)(\/|$)/.test(path)
    ? NextResponse.rewrite(new URL(path + url.search, url), { request: { headers: requestHeaders } })
    : NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Language", lang);
  if (studioPreview) response.headers.set("Cache-Control", "private, no-store");
  if (studioPreview || (!indexablePath(path) && !(await publicContent(path)))) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  if(/^\/(cms|request)(\/|$)/.test(path)){response.headers.set("Cache-Control","private, no-store");response.headers.set("Referrer-Policy","no-referrer");}
  return response;
}

export const config = { matcher: ["/((?!api/|_next/|assets/|documents/|robots\\.txt|sitemap\\.xml|favicon|signin-with-chatgpt|signout-with-chatgpt|callback).*)"] };
