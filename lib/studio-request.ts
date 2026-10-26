import { headers } from "next/headers";

// These internal values are overwritten from the request URL by the Worker and
// middleware. Client-supplied headers, forwarded hosts and cookies cannot opt in.
export async function requestStudioEnabled() {
  return (await headers()).get("x-kobags-studio-enabled") === "1";
}

export async function requestStudioPreview() {
  return (await headers()).get("x-kobags-studio-preview") === "1";
}
