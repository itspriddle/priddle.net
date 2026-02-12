---
title: Ennouncement
company: ViaTalk, LLC
role: Lead Developer
period: Apr 2010
date: 2010-04-01
tags:
  - Ruby
  - Rails
  - PHP
  - Asterisk
  - JavaScript
  - Appcelerator Titanium
  - MySQL
  - VoIP
project_type: work
tier: 1
excerpt: >-
  Call broadcasting platform — Rails web app, iPhone app, and Asterisk
  telephony. Shipped the originally scoped application in about a week after
  it was 6 months behind schedule.
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

The data model tracks users, contact groups, broadcasts with per-contact call
outcomes (answered, voicemail, no answer), and SIP trunk configurations. A
RESTful JSON API authenticated via HTTP Basic Auth serves the mobile app and
supports third-party integration.

## Asterisk Telephony

The telephony layer handled both inbound and outbound call flows through custom
Asterisk dialplans and PHP processing scripts.

**Inbound**: Users dialed a toll-free number, authenticated via PIN, and
recorded their announcement through an IVR menu with options to review,
re-record, save for later, or send immediately.

**Outbound broadcasting**: When triggered, a PHP processor generated Asterisk
`.call` files for each contact, atomically moving them to the outgoing spool
while enforcing concurrent channel limits. Each outbound call used Asterisk's
`BackgroundDetect()` for answering machine detection — machines got the full
announcement, humans got an interactive menu. Credits were deducted per call.

**SIP trunk management**: Trunk configurations stored in MySQL were dynamically
generated into Asterisk config files by a PHP script, with a cron job handling
the lifecycle of config generation, SIP module reloads, and state cleanup.

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
