/** Request-scoped policy: framework hydration needs nonces; artwork needs local blobs. */
export function scriptNonce() {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(24))));
}

export function contentSecurityPolicy(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "script-src-attr 'none'",
    // React positioning, artwork transforms and the approved animations use inline styles.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' blob:",
    "media-src 'self' blob:",
    "worker-src 'self' blob:",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "form-action 'self'",
  ].join('; ');
}

// Host-only HSTS: no claim about unverified subdomains; not a preload request.
export const hstsPolicy = 'max-age=15552000';
export const permissionsPolicy = 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()';
