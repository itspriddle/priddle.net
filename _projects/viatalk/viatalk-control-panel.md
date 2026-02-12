---
title: ViaTalk Control Panel
company: ViaTalk, LLC
role: Sole Developer (maintenance)
period: 2008 - 2012
date: 2008-12-01
tags:
  - Ruby
  - Rails
  - MySQL
  - Asterisk
  - jQuery
  - Capistrano
  - VoIP
project_type: work
tier: 2
excerpt: >-
  Primary customer and staff interface for ViaTalk's VoIP service — became
  sole developer responsible for maintenance, security, and new features.
---

ViaTalk Control Panel (cp.viatalk.com) was a large Ruby on Rails application
serving as the primary interface for ViaTalk's VoIP phone service. Customers
used it to sign up, manage their accounts, configure call routing, access
voicemail, and view call history. Staff used it to manage customers, handle
support tickets, configure service packages, and run reports. I joined the
project after its initial development and became the sole developer responsible
for ongoing maintenance, security updates, and new feature implementation.

## Key Contributions

### Call Detail Records

Rebuilt the call history interface to query CDR data stored across sharded
MySQL databases (partitioned by area code and exchange). Added search and
filtering by date range, direction, and phone number. Implemented Excel and PDF
export functionality. The system decoded Asterisk's `amaflags` field to display
human-readable call statuses like "Call Forwarded", "Blacklist", "DND", or
"International Call Blocked".

### Voicemail Player

Integrated web-based voicemail playback into the control panel using jPlayer
and a custom jQuery plugin. In 2009, HTML5 audio didn't exist, so this required
Flash-based audio delivery and handling asynchronous WAV-to-MP3 conversion via
polling. See [ViaTalk Voicemail System](/work/viatalk/voicemail-system/) for
details on the backend services I built to support this.

### VT Beta Lab

Created the ViaTalk Beta Lab, a section of the control panel where the team
could roll out new features to opt-in customers for testing. Features were
marked with beta icons throughout the UI. Users could submit bug reports and
feature suggestions directly to the support ticket system. This gave us a
feedback loop for iterating on features like call routing, speed dial, adapter
settings, and voicemail notifications before full release.

### Deployment Optimization

Migrated the codebase from SVN to Git and rewrote the deployment process using
Capistrano. The original SVN-based deploys took 5-10 minutes. By using Git's
remote cache strategy and chaining commands to minimize SSH round-trips, I
reduced deploy times to under 30 seconds across a cluster of application
servers (rails-app-1 through rails-app-3).

### Staff Admin Portal & Shopping Cart

Redesigned the staff administration portal for managing customers, packages,
resellers, and support tickets. Also worked on the multi-step shopping cart and
signup flow that handled service area validation, E911 verification, and
payment processing.
