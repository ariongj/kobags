import type { ComponentProps } from "react";

/**
 * Native document navigation avoids the installed Vinext production Link
 * chunk's missing dynamic navigation export. Drafts persist before navigation.
 * Keep ordinary anchor behavior (new tab, downloads and fragment links).
 */
export default function SiteLink(props: ComponentProps<"a">) {
  return <a {...props} />;
}
