---
title: Quark
company: BuiltFast, LLC
role: Lead Architect
period: May 2025 - Present
date: 2025-05-01
tags:
  - Laravel
  - PHP
  - Vue.js
  - Hosting
  - Billing
  - SaaS
  - API
  - MySQL
  - Redis
  - Testing
project_type: work
tier: 2
excerpt: >-
  Hosting business management platform handling customers, billing,
  provisioning, and support — the customer-facing half of BuiltFast's
  infrastructure alongside Genesis.
---

Quark is the customer-facing half of BuiltFast's hosting platform, built on
Laravel 12 with a Vue.js/TypeScript frontend. As lead architect, I designed and
built the core system that handles customer registration, subscription billing
(Recurly), domain registration and DNS management (PowerDNS), hosting
provisioning orchestration, support tickets, staff administration, and
two-factor authentication.

## Architecture

The codebase is organized around four patterns that keep the complexity
manageable:

**Service layer** handles all business logic, from checkout processing to
provisioning orchestration. Services coordinate between billing, DNS, and server
provisioning to complete multi-step workflows.

**State machines** manage hosting services and domains through defined
lifecycle states — pending, active, suspended, terminated. This ensures
consistent transitions and makes troubleshooting straightforward.

**Queue-based processing** moves long-running operations like provisioning and
billing events to background jobs, keeping the frontend responsive.

**Policy-based authorization** ensures customers only access their own data
while staff have appropriate permissions for administrative functions.

### Integration with Genesis

Quark orchestrates the customer experience while [Genesis](/work/builtfast/genesis/)
handles actual server provisioning. When a customer signs up, Quark processes
payment, creates their account, allocates a server, then calls the Genesis API
over HMAC-authenticated channels. Provisioning happens asynchronously with
callback handling to update status when operations complete.

## Key Features

**Billing lifecycle**: Full subscription management through Recurly — checkout,
renewals, upgrades, and dunning. **Domain management**: Registration and DNS
through registrar APIs with automatic configuration and health monitoring.
**Staff tools**: Customer impersonation, support request processing, and billing
administration. **Health monitoring**: Built-in checks for DNS resolution, SSL
certificates, and external API connectivity.

The entire codebase uses strict typing, final classes, interface-based
architecture for all external integrations, and comprehensive test coverage
with intelligent mocking for external services.

## Impact

Quark is the foundation of BuiltFast's customer experience — every signup,
every billing event, every support interaction flows through it. The state
machine architecture has proven especially valuable for debugging production
issues, since every service and domain has a clear, auditable lifecycle.
