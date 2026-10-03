CREATE TABLE `cms_redirects` (
	`path` text PRIMARY KEY NOT NULL,
	`destination` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_cmsartwork_version` ON `cms_artwork` (`inquiry_id`,`version`);--> statement-breakpoint
CREATE INDEX `idx_cmsevents` ON `cms_events` (`entity_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_cmsinquiries` ON `cms_inquiries` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_cmsmedia` ON `cms_media` (`inquiry_id`);--> statement-breakpoint
CREATE INDEX `idx_cmsoutbox` ON `cms_outbox` (`status`,`created_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_cmsquotes_version` ON `cms_quotes` (`inquiry_id`,`version`);--> statement-breakpoint
CREATE INDEX `idx_cmsrecords` ON `cms_records` (`kind`,`archived`);--> statement-breakpoint
CREATE INDEX `idx_cmsversions` ON `cms_versions` (`record_id`,`revision`);