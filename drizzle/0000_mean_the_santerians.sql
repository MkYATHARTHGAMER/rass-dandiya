CREATE TABLE `event` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`date` text NOT NULL,
	`venue` text NOT NULL,
	`price` integer NOT NULL,
	`gate_key` text NOT NULL,
	`gate_open` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members` (
	`email` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`token` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`method` text NOT NULL,
	`amount` integer NOT NULL,
	`issued_by` text NOT NULL,
	`created_at` text NOT NULL,
	`request_id` text NOT NULL,
	`cancelled` integer DEFAULT 0 NOT NULL,
	`entered_at` text,
	`receipt` text,
	`checked_by` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tickets_request_id_unique` ON `tickets` (`request_id`);