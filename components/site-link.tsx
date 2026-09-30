"use client";

import type { ComponentProps } from "react";
import { useKobags } from "./kobags-context";
import { languageHref } from "@/lib/site-locale";

/**
 * Native document navigation avoids the installed Vinext production Link
 * chunk's missing dynamic navigation export. Drafts persist before navigation.
 * Keep ordinary anchor behavior (new tab, downloads and fragment links).
 */
export default function SiteLink(props: ComponentProps<"a">) {
  const { lang } = useKobags();
  return <a {...props} href={props.href ? languageHref(props.href, lang) : undefined} />;
}
