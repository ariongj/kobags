import { z } from "zod";

// Use Zod's interpreter in both Workers and browsers. Runtime code generation
// is unnecessary here and would violate the site's nonce-based script policy.
z.config({ jitless: true });

export { z };
