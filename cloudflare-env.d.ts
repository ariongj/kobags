declare namespace Cloudflare {
  interface Env {
    PUBLIC_SITE_ORIGIN?: string;
    CMS_BOOTSTRAP_EMAIL?: string;
    CMS_ACTIVATE_INQUIRIES?: string;
    CMS_BOOTSTRAP_PASSWORD_HASH?: string;
    CMS_EMAIL_API_KEY?: string;
    CMS_EMAIL_FROM?: string;
    CMS_NOTIFY_EMAIL?: string;
    ASSETS?: Fetcher;
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
