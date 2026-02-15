---
title: Helix
company: World Wide Web Hosting, LLC / Pressed, LLC / Envato Pty Ltd.
role: Lead Developer
period: Sep 2011 - Jun 2019
date: 2011-09-01
tags:
  - Ruby
  - Rails
  - Rails Engines
  - PostgreSQL
  - Redis
  - Sidekiq
  - CoffeeScript
  - jQuery
  - SCSS
  - AWS
  - Let's Encrypt
  - Braintree
project_type: work
tier: 1
excerpt: >-
  Multi-app Rails billing and hosting platform spanning three companies over
  eight years — a ground-up rewrite of Synco built for maintainability, and
  the core system behind WWWH, Pressed, and Envato Hosted.
---

Helix was the billing and hosting management platform behind World Wide Web
Hosting (WWWH), Pressed, and Envato Hosted. It was a ground-up rewrite of
[Synco](/work/wwwh/synco/), WWWH's legacy billing system — built for feature
parity but with modern patterns and long-term maintainability. Helix managed
the complete lifecycle of web hosting services — customer signups, billing,
domain registration, WordPress provisioning, SSL certificates, support, and
partner management — across dozens of white-label brands. I was a lead
developer from the project's inception in 2011 through the Envato era in 2019,
spanning three companies and the full evolution from shared hosting to managed
WordPress.

## Architecture

Helix was a suite of three Rails applications sharing a common Rails engine:

**HelixCore** was the shared engine — all domain models (94 model files),
business logic, background workers, payment gateways, and third-party
integrations lived here. Every application depended on it via a path-based gem
reference. This was the heart of the system: the `Brand` model that powered
white-labeling, the `Service` state machine that tracked hosting lifecycles,
the `Order` pipeline, the `Invoice` and `Payment` models, and 66 Sidekiq Pro
workers handling everything from WordPress provisioning to DNS management to
payment processing.

**Helix** (the admin app) was the staff-facing interface — 80 controllers
covering customer management, order review, fraud detection, service
provisioning and troubleshooting, financial reporting, partner brand
configuration, and the Sidekiq dashboard. This is where staff reviewed
flagged orders, issued refunds, suspended sites for abuse, and managed the
product catalog.

**Build** (originally Backstage) was the customer-facing app — 42
controllers for the white-labeled experience. Each partner brand got its own
Build instance on their domain (`build.acme.com`). Customers ordered hosting,
managed WordPress sites, handled domains and DNS, updated billing, and
contacted support — all scoped to their partner's brand with that brand's
logo, colors, and product catalog.

**PartnerPanel** was the partner-facing app — 22 controllers for hosting
resellers to manage their clients, review revenue reports, configure their
brand, and handle payouts.

All three apps shared a single PostgreSQL database and Redis instance. The
product type system used a class hierarchy (`ProductTypes::Cloud::ManagedWordpress`,
`ProductTypes::Domain::OpenSRS`, `ProductTypes::Ssl::Positive`, etc.) to
encapsulate product-specific business logic while sharing common billing and
lifecycle patterns.

### The Architecture Mistake

HelixCore was structured as a Rails engine that got included in each
application. It should have been the other way around — one core Rails
application with each "app" as its own engine providing routes, controllers,
and views. By the time we realized this, it was too late to restructure. The
consequence was that every change to shared code required deploying all three
(later four) applications. Fixing a typo in an i18n key meant three separate
deploys. This is my biggest architectural regret on an otherwise proud project.

### EventHorizon

Early on, the customer order form was a separate fourth application called
EventHorizon that also consumed HelixCore. This compounded the deploy problem.
When Pressed was formed, we folded EventHorizon into Build to start reducing
the number of applications. We also renamed Backstage to Build during this
period — which was its own adventure, since Rails uses `build` extensively as
a method name internally.

## The WWWH → Pressed → Envato Arc

**WWWH (2011–2015):** Helix started as a ground-up replacement for
[Synco](/work/wwwh/synco/), WWWH's legacy billing system. The goal was full
feature parity with modern Rails patterns and a maintainable architecture that
could evolve with the business. WWWH was a traditional shared web host supporting
multiple brands (including Site5).
The original system managed shared hosting, VPS, dedicated servers, and domain
registrations across these brands. The multi-brand architecture — where a
single `Brand` record controlled theming, products, pricing, payment
credentials, DNS, and SSL — was baked in from day one.

**Pressed (2015–2017):** When WWWH was acquired, a small group of us split
off to form Pressed, taking Helix with us. The platform pivoted from
general-purpose hosting to white-labeled managed WordPress. This meant
adapting every layer: new product types for WordPress hosting, a provisioning
pipeline (Cloudburst) for automated WordPress installation and management, and
the PartnerPanel app for hosting resellers. The white-label system that had
served WWWH's internal brands now powered dozens of external partners selling
WordPress hosting under their own identity.

**Envato (2017–2019):** Pressed was acquired by Envato, and Helix became the
platform behind Envato Hosted — powering WordPress theme demos for
ThemeForest authors and hosted sites for Envato customers. This era brought
the [Bender Builds](/work/envato/bender-builds/) automated theme bundling
system, [Author Managed Designs](/work/envato/author-managed-designs/) for
self-service theme demos, and the
[Hosted Orders API](/work/envato/hosted-orders-api/) extraction. I also
worked on the [ThemeForest marketplace](/work/envato/themeforest-marketplace/)
codebase during this period.

## Key Features I Built or Led

### White-Label Brand System

The `Brand` model was one of the most complex in the system — each brand
carried its own domain, SSL certificates, payment gateway credentials
(Vantiv, Braintree, PayPal), DNS nameservers, support configuration, email
templates, product catalog, and visual theming. Creating a new brand
automatically provisioned DNS, requested Let's Encrypt certificates, set up
email, and configured the payment pipeline. The system supported multiple
partner types (full A-Z, hybrid, custom) with configurable billing
relationships and per-brand revenue tracking.

### Cloudburst Provisioning

The provisioning system handled the full lifecycle of WordPress sites:
creation (Linux user, Apache vhost, SSL, MySQL, WordPress installation with
themes and plugins), suspension, resumption, domain changes, backups, and
termination. Operations were coordinated through Sidekiq workers and an
AWS SQS-based job processor, with the actual server work handled by a
collection of shell scripts and APIs on the hosting infrastructure.

### Rack Proxy Middleware

A Rack-based proxy system that gave customers transparent access to their
cPanel and WordPress admin panels through the Helix interface. This powered
the [Website.me](/work/wwwh/websiteme/) brand and was used across other
brands for service management. The hardest part was URL rewriting — making
WordPress admin, with its deeply embedded URLs in page content, JavaScript,
and AJAX responses, work seamlessly through a rewriting proxy. See the
[Website.me](/work/wwwh/websiteme/) doc for the full story.

### Payment Gateway Migration

Migrated the payment processing pipeline from Vantiv to Braintree across all
brands. This involved dual-gateway support during the transition period,
per-brand payment currency options with configurable merchant accounts, and
careful coordination to avoid disrupting active billing for thousands of
customers.

### Let's Encrypt Integration

Automated SSL certificate provisioning via Let's Encrypt for customer
WordPress sites and partner brand domains. The system handled certificate
requests, domain validation, expiration tracking, and automatic renewal
through Sidekiq workers. This was early days for Let's Encrypt (2016), and
automated SSL was a meaningful differentiator at a time when most hosts still
charged for certificates.

### WordPress Admin Impersonation

Token-based authentication that let staff and customers sign in to WordPress
Admin directly from Build — no WordPress password required. A time-limited
token generated in Rails was validated by a WordPress must-use plugin, which
created a WordPress session for the appropriate user. This pattern carried
forward into [TurboHub](/work/a2hosting/turbohub/) at A2 Hosting years later.

### Order Form and Checkout

The customer checkout experience went through several iterations — from the
standalone EventHorizon app to the integrated Build order form to the eventual
[Hosted Orders API](/work/envato/hosted-orders-api/) extraction. Each version
was white-labeled per brand with its own product catalog, pricing, and payment
configuration. I was a lead developer across multiple iterations, working on
both the frontend (CoffeeScript, jQuery) and the backend provisioning
pipeline.

## Related Projects

- [MWP Lazy Upgrader](/work/pressed/mwp-lazy-upgrader/) — Network filesystem
  optimization for WordPress upgrades at scale
- [Pressed Bundles](/work/pressed/pressed-bundles/) — Automated WordPress
  theme bundling (the original version)
- [Bender Builds](/work/envato/bender-builds/) — CI-driven theme bundling
  for Envato
- [Author Managed Designs](/work/envato/author-managed-designs/) — Self-service
  theme demos for ThemeForest authors
- [Hosted Orders API](/work/envato/hosted-orders-api/) — React/Rails checkout
  extracted from Helix
- [Partner Panel](/work/pressed/partner-panel/) — The partner management app
- [Website.me](/work/wwwh/websiteme/) — Consumer hosting brand powered by
  Helix's proxy middleware
- [Wormhole](/work/wwwh/wormhole/) — Server migration tool for the WWWH era
- [Synco](/work/wwwh/synco/) — Server synchronization system with Helix's
  predecessor proxy code
