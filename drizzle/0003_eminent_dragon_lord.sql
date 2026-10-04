CREATE TABLE `cms_credentials` (
	`staff_id` text PRIMARY KEY NOT NULL,
	`password_hash` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cms_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`staff_id` text NOT NULL,
	`credential_tag` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_cmssessions_staff` ON `cms_sessions` (`staff_id`);--> statement-breakpoint
CREATE INDEX `idx_cmssessions_expiry` ON `cms_sessions` (`expires_at`);