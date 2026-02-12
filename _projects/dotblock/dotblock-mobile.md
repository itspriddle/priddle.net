---
title: DotBlock Mobile
company: DotBlock.com, Inc
role: Lead Developer
period: Oct 2010
date: 2010-10-01
tags:
  - JavaScript
  - Appcelerator Titanium
  - Ruby
  - Sinatra
  - SolusVM
  - WHMCS
project_type: work
tier: 3
excerpt: >-
  iPhone app for DotBlock VPS customers, backed by a Sinatra REST API bridging
  WHMCS billing and SolusVM hypervisors.
---

DotBlock Mobile is an iPhone application that lets VPS customers manage their
accounts and virtual servers — viewing server status, rebooting, shutting
down, and managing account details — all from their phone. The app was built
with Appcelerator Titanium (cross-platform JavaScript to native).

I built both the app and its supporting infrastructure. The backend is a Sinatra
REST API (the [DotBlock API](/work/dotblock/dotblock-order-form/#supporting-infrastructure))
that bridges WHMCS for account and billing data with SolusVM for server power
operations. The API uses HTTP Basic authentication against WHMCS credentials and
exposes endpoints for server listing, power actions (boot, reboot, shutdown,
suspend, resume), account info management, invoices, and support tickets.

I also wrote the public API documentation and released client libraries in Ruby,
PHP, and Bash so DotBlock customers could build their own tooling. The Ruby
client was extracted as the [whmcs-ruby](https://github.com/dotblock/whmcs-ruby)
open source gem.
