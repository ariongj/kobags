// Sites dispatches physical asset paths before the Worker and ignores the
// generated Wrangler run_worker_first setting. Keep public URLs owned by the
// Worker, while ASSETS retains the compiled bytes under unlinked storage keys.
import { mkdir, rename, rm, access, readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const client = resolve("dist/client");
await access(client);
// Keep reusable source and internal operations/audit notes in the owner's
// private handoff, never in either public URL or ASSETS storage namespace.
for (const file of await readdir(resolve(client, "documents"))) {
  if (/\.(?:zip|md)$/i.test(file) || file === "studio-v4-prompts.json") {
    throw new Error(`Internal handoff file must not be published: ${file}`);
  }
}
const stored = resolve(client, "__kobags_static");
await mkdir(stored, { recursive: true });
for (const tree of ["assets", "documents", "_next"]) {
  await rm(resolve(stored, tree), { recursive: true, force: true });
  await rename(resolve(client, tree), resolve(stored, tree));
}
// Historical renderer bundles accumulate in public/ between releases. Keep
// every retained loader's dependencies, but omit orphan bundles from delivery.
// Originals stay in source; the current studio and cached loaders are preserved.
const studio = resolve(stored, "assets/reference-studio");
// Retire the superseded November 8 bootstrap from the delivery archive only.
// Its source and saved release remain available for rollback. Current and recent
// loaders stay intact; HTML is revalidated and points to the current hash. This
// keeps expanded release archives below the upload service's observed truncation.
await rm(resolve(studio, "boot-3ae21f8d446261c6.js"), { force: true });
const studioFiles = await readdir(studio);
const studioReferences = new Set();
const referenceSources = [await readFile(resolve("lib/reference-studio-document.ts"), "utf8")];
for (const name of studioFiles.filter(name => /^boot-[a-f0-9]+\.js$/.test(name))) {
  referenceSources.push(await readFile(resolve(studio, name), "utf8"));
}
for (const source of referenceSources) {
  for (const name of source.match(/studio-[a-f0-9]+\.js/g) ?? []) studioReferences.add(name);
}
for (const name of studioReferences) await access(resolve(studio, name));
for (const name of studioFiles.filter(name => /^studio-[a-f0-9]+\.js$/.test(name))) {
  if (!studioReferences.has(name)) await rm(resolve(studio, name));
}
// The Worker owns response headers; this host does not process this file.
await rm(resolve(client, "_headers"), { force: true });
console.log("Prepared media, downloads and hashed build files for Worker delivery.");
