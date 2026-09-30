export type SiteLanguage = "en" | "sq";

export function contentPath(path: string) {
  return path === "/sq" || path === "/sq/" ? "/" : path.startsWith("/sq/") ? path.slice(3) : path;
}

/** Keep APIs, original files, external links and fragments at their real addresses. */
export function languageHref(href: string, lang: SiteLanguage) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const split = href.search(/[?#]/);
  const pathname = split < 0 ? href : href.slice(0, split);
  const suffix = split < 0 ? "" : href.slice(split);
  const path = contentPath(pathname);
  if (/^\/(api|assets|documents|_next|signin-with-chatgpt|signout-with-chatgpt|callback)(\/|$)/.test(path) || /\.[a-z0-9]+$/i.test(path)) return href;
  return (lang === "sq" ? path === "/" ? "/sq" : "/sq" + path : path) + suffix;
}
