declare namespace Cloudflare {
  interface Env {
    CMS_BOOTSTRAP_EMAIL?: string;
    CMS_BOOTSTRAP_PASSWORD_HASH?: string;
    CMS_EMAIL_API_KEY?: string;
    CMS_EMAIL_FROM?: string;
    CMS_NOTIFY_EMAIL?: string;
    ASSETS?: Fetcher;
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
