/** Browser-owned requests use an opaque cookie, independent of platform identity. */
export async function demoSession(
  req: Request,
): Promise<{ owner: string; cookie?: string }> {
  const secure = new URL(req.url).protocol === "https:";
  const name = secure ? "__Host-kobags-demo" : "kobags-demo";
  const saved = req.headers
    .get("cookie")
    ?.split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(name + "="))
    ?.slice(name.length + 1);
  const valid = !!saved && /^[a-f0-9]{64}$/.test(saved);
  const token = valid
    ? saved!
    : Array.from(crypto.getRandomValues(new Uint8Array(32)), (v) =>
        v.toString(16).padStart(2, "0"),
      ).join("");
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token),
  );
  const owner =
    "guest:" +
    Array.from(new Uint8Array(digest), (v) =>
      v.toString(16).padStart(2, "0"),
    ).join("");
  return {
    owner,
    cookie: valid
      ? undefined
      : `${name}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${secure ? "; Secure" : ""}`,
  };
}
