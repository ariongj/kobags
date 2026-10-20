"use client";

import type { ComponentProps } from "react";
import { useKobags } from "./kobags-context";
import { languageHref } from "@/lib/site-locale";
import { studioEnabled, isStudioPath } from "@/lib/studio-availability";

/**
 * Native document navigation avoids the installed Vinext production Link
 * chunk's missing dynamic navigation export. Drafts persist before navigation.
 * Keep ordinary anchor behavior (new tab, downloads and fragment links).
 */
export default function SiteLink(props: ComponentProps<"a">) {
  const { lang } = useKobags();
  // Also suppress any older studio links supplied by managed page content.
  if (!studioEnabled && props.href && isStudioPath(props.href)) return null;
  return <a {...props} href={props.href ? languageHref(props.href, lang) : undefined} />;
}
