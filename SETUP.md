# Dandiya Night ticketing

Implementation prepared for a five-person organising team. Not published yet.

## What is included

- Event name, date, venue and ticket price settings.
- Owner access using the configured ChatGPT email, with four additional teammates.
- Tickets issued only after the organiser confirms payment received by cash, UPI/personal transfer or another method.
- Unique, random ticket links; copy and WhatsApp sharing (the organiser sends the message).
- A printable master QR scanned within the guest's ticket page.
- Explicit gate open/close controls, one-time entry, live guest list and receipt codes.
- Volunteer entry by ticket link when a guest's camera is unavailable.
- Cancellation of unused tickets. Refunds are handled separately.

## Before use

1. Publish the app and configure OWNER_EMAIL as the owner's ChatGPT account email in the hosting environment.
2. Sign in as the owner, save event details and add four teammates' ChatGPT email addresses.
3. Enable public visitor access at the hosting level before sharing tickets externally. Management remains protected by server-side account checks. The registered Site currently remains private.
4. Print the master QR and keep entry closed until the event starts.
5. Test with a real Android phone and iPhone, including camera denial, poor connectivity, a repeat scan, cancelled ticket and volunteer check-in.

Guests do not need an account once the site is public. Managers need ChatGPT accounts. Internet is required; there is no offline admission mode. A fixed printed QR can be shared, so a volunteer must observe the scan and compare the receipt/name with the live management list. Screenshots alone must not be accepted.

## Technical setup

The app uses the Sites Vinext starter and Cloudflare D1. The existing `.openai/hosting.json` identifies the already registered Site; reuse it, do not create a replacement. Production secrets are not included in this archive.

Use Node 22.13 or newer, npm and Git. Install using `npm ci`, then `npm run build`. Schema migrations are in `drizzle/`. For local D1, follow the starter README's migration instructions. Production Sites publication applies the migrations. The local preview has a simulated ChatGPT account documented in README; use an ignored `.env` with OWNER_EMAIL=seedy@sites.test only for local development.

## Verification status

TypeScript check passed. Actual admission logic was exercised against an in-memory SQLite database: closed gate, wrong master QR, concurrent duplicate entry, previously used ticket, cancelled ticket, missing ticket, volunteer check-in, and maximum four teammates passed.

Local Cloudflare preview failed to start on this Windows environment. The publishing build then failed on Windows native file-path access, and the source upload was rejected by automatic approval review even after additional permissions were granted. No production deployment has been completed. Browser, WebMCP, camera and full hosted authentication checks remain unverified.
