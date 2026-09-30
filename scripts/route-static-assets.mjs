// Sites dispatches physical asset paths before the Worker and ignores the
// generated Wrangler run_worker_first setting. Keep public URLs owned by the
// Worker, while ASSETS retains the compiled bytes under unlinked storage keys.
import { mkdir, rename, rm, access } from "node:fs/promises";
import { resolve } from "node:path";

const client = resolve("dist/client");
await access(client);
const stored = resolve(client, "__kobags_static");
await mkdir(stored, { recursive: true });
for (const tree of ["assets", "documents", "_next"]) {
  await rm(resolve(stored, tree), { recursive: true, force: true });
  await rename(resolve(client, tree), resolve(stored, tree));
}
// The Worker owns response headers; this host does not process this file.
await rm(resolve(client, "_headers"), { force: true });
console.log("Prepared media, downloads and hashed build files for Worker delivery.");
