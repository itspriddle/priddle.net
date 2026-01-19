---
title:   Ennouncement
company: ViaTalk, LLC
period:  Apr 2010
date:    2010-04-01
tags:
  - Asterisk
  - Apache
  - CSS
  - Javascript
  - jQuery
  - Linux
  - MySQL
  - PHP
  - Ruby
  - Rails
  - Titanium Mobile
  - VoIP
project_type: work
---

Ennouncement is a call broadcasting platform that allows users to record and
send voice messages to groups of contacts. I built the full-stack system: a
Ruby on Rails web application, an iPhone app using Titanium Mobile, Asterisk
dialplans and PHP scripts for telephony, and the integration that brought call
broadcasting to ViaTalk's customer base. The project was 6 months behind
schedule when I took over development --- I shipped the originally scoped
application in about a week.

## System Architecture

Ennouncement is a multi-component system spanning a web application, mobile
app, Asterisk PBX, and supporting scripts:

- **Web Application** -- A Rails 2.3 app handling user accounts, contact
  management, broadcast creation, and payments. Serves both the browser UI and
  a JSON API consumed by the mobile app.

- **Asterisk Telephony** -- Custom dialplans and AGI-style PHP scripts that
  handle inbound IVR access, announcement recording, answering machine
  detection, and outbound call origination via SIP trunks.

- **Mobile Application** -- An iPhone app built with Titanium Mobile providing
  full access to contact and broadcast management. My first iOS app ---
  patterns I developed were extracted into
  [TiFighter](https://github.com/itspriddle/ti-fighter), a Titanium helper
  library.

- **Processing Scripts** -- PHP scripts and cron jobs that orchestrate the
  broadcast pipeline: generating Asterisk call files, managing SIP trunk
  configuration, enforcing channel limits, and tracking call state.

- **ViaTalk Integration** -- Controller and model code within the ViaTalk
  Control Panel that provisions Ennouncement accounts, migrates contacts, and
  provides SSO for ViaTalk customers.

## Web Application

Built on Ruby on Rails 2.3.9 with MySQL and jQuery.

### Core Features

- **Contact Management** -- Users organize contacts into groups. Contacts can
  be added manually or bulk-imported via vCard file upload (parsed with the
  vpim gem). Groups support a public subscription URL so contacts can opt in
  directly.

- **Call Broadcasting** -- Users create a broadcast targeting a contact group.
  The system validates credit balance, enforces a one-active-broadcast-at-a-time
  limit, and queues the broadcast for Asterisk processing.

- **Phone Number Authorization** -- Before broadcasting, users must verify
  ownership of their phone numbers. The system generates a 4-digit PIN,
  originates an Asterisk call to the number, and the user enters the PIN to
  confirm.

- **Setup Wizard** -- A 3-step onboarding flow: verify a phone number,
  configure a SIP provider (or use the built-in Ennouncement trunk), and
  create a first contact group.

- **Credit System and Payments** -- Per-call credit model (1 credit = 1
  contact called). New accounts receive 1,000 free credits. Credit packages
  ($2 for 100 up to $20 for 1,000) purchasable via direct credit card or
  PayPal Express Checkout through ActiveMerchant.

### Data Model

- **Users** own Groups, AuthorizedNumbers, Providers, and Payments
- **Groups** contain Contacts and Ennouncements (broadcasts)
- **Ennouncements** (outboxes table) track broadcast state: Pending, In
  Progress, Completed
- **EnnouncementDetails** track per-contact call outcomes (No Answer,
  Voicemail, Answered)
- **Providers** (sip_conf table) store SIP trunk configuration with
  credentials, host, codec, NAT, and concurrent call limits

### JSON API

RESTful endpoints for groups, contacts, ennouncements, providers, and account
info. Authenticated via HTTP Basic Auth. Used by the mobile app and available
for third-party integration.

## Asterisk Telephony

### Inbound Call Flow

Users dial in to +1-866-681-5599. The dialplan:

1. Looks up the caller's phone number in the `user_numbers` table
2. Authenticates via a 6-digit PIN
3. Checks for pending/saved announcements and offers resume/restart/delete
4. Presents the recording IVR:
   - Record an announcement name and message body (stored as GSM files)
   - Review, re-record, save for later, or send immediately
5. On send, triggers the PHP broadcast processor via `System()`

Non-customers who receive a broadcast call and dial back can replay their most
recent announcement.

### Outbound Broadcasting

When a broadcast is triggered, the PHP processor:

1. Retrieves verified contacts for the target group
2. Filters out international numbers (Caribbean area codes)
3. Creates Asterisk `.call` files for each contact, writing to `/tmp/` then
   atomically moving to `/var/spool/asterisk/outgoing/`
4. Enforces concurrent channel limits by polling active calls and sleeping
   when at capacity
5. Deducts credits per call (purchased credits first, then ViaTalk credits)

Each outbound call routes to a `detect` context using `BackgroundDetect()` for
answering machine detection:

- **Machine detected** -- Plays the full announcement (delivery greeting,
  name, powered-by attribution, message body) and hangs up. State recorded as
  "Voicemail".
- **Human detected** -- Plays the announcement with an interactive menu
  (replay or hang up). State recorded as "Answered".

### SIP Trunk Management

Trunk configurations are stored in MySQL and dynamically generated into
Asterisk's `sip_ennouncement.conf` by a PHP script. A cron job handles the
lifecycle: generates configs for newly activated trunks, reloads the SIP
module via `asterisk -rx 'sip reload'`, and resets state after each cycle.

## Mobile Application

An iPhone app built with Titanium Mobile (JavaScript). Communicates with the
Rails JSON API over HTTPS using HTTP Basic Auth.

### Features

- Login with persistent credential storage
- Group and contact CRUD with native address book import
- Phone number validation (North American Numbering Plan)
- Broadcast creation with credit balance validation and conflict handling
  (HTTP 402 for insufficient credits, 409 for pending broadcasts)
- Offline detection with graceful degradation

## ViaTalk Control Panel Integration

I integrated Ennouncement into the ViaTalk Control Panel so existing ViaTalk
customers could use call broadcasting without a separate account.

### Provisioning

On first access from the Control Panel, the system automatically:

1. Creates an Ennouncement user account (syncing email, name, and password
   from the ViaTalk account)
2. Creates a default contact group
3. Migrates existing broadcast contacts from the ViaTalk Master database
4. Registers all account phone numbers as pre-verified authorized numbers
5. Initializes the account with 1,000 ViaTalk credits

Subsequent access uses hash-based SSO --- a SHA1 of the client email and ID
--- with IP whitelist validation against the ViaTalk network.

### Billing Integration

ViaTalk customers had a separate `viatalk_credits` pool managed independently
from purchased credits. Broadcast tiers were available at the account level:
30 contacts (free), 50 ($1/month), 75 ($2/month), or 100 ($3/month).

### Admin Operations

The admin interface supported unlinking Ennouncement accounts when ViaTalk
customers were cancelled or suspended, clearing the `viatalk_client_id`
foreign key and resetting the activation flag.
