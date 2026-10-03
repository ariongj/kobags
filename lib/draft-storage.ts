import type { Design } from "./catalog";

export const draftStorageKey = "kobags-design-v1";
const temporaryDraftKey = "kobags-design-session-v1";
export type DraftStorageStatus = "persistent" | "session" | "unavailable";

export function readStoredDraft(): Partial<Design> | null {
  for (const read of [
    () => sessionStorage.getItem(temporaryDraftKey),
    () => localStorage.getItem(draftStorageKey),
  ]) {
    try {
      const value = JSON.parse(read() || "null");
      if (value && typeof value === "object" && !Array.isArray(value)) return value;
    } catch {}
  }
  return null;
}

export function writeStoredDraft(design: Design): DraftStorageStatus {
  const serialized = JSON.stringify(design);
  try {
    localStorage.setItem(draftStorageKey, serialized);
    try { sessionStorage.removeItem(temporaryDraftKey); } catch {}
    return "persistent";
  } catch {}
  try {
    sessionStorage.setItem(temporaryDraftKey, serialized);
    return "session";
  } catch {}
  return "unavailable";
}

export function clearStoredDraft() {
  try { localStorage.removeItem(draftStorageKey); } catch {}
  try { sessionStorage.removeItem(temporaryDraftKey); } catch {}
}
