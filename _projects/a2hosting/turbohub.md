---
title:   TurboHub
company: A2 Hosting, Inc
period:  Feb 2023
date:    2023-02-10
tags:
  - Bash
  - CLI
  - Deployer
  - GitHub Actions
  - Inertia.js
  - Laravel
  - Laravel Horizon
  - Laravel Zero
  - MySQL
  - Nginx
  - PHP
  - Pusher
  - RabbitMQ
  - Redis
  - SCSS
  - Supervisord
  - Vite
  - Vue.js
  - WHMCS
  - WP-CLI
  - WordPress
project_type: work
---

TurboHub is a distributed WordPress site management platform built for A2
Hosting. It provides customers with a unified control panel to manage every
aspect of their WordPress sites --- performance optimization, plugin and theme
management, staging environments, security monitoring, and health checks ---
across shared, VPS, and dedicated hosting plans. The system spans three
codebases: a Laravel 10 web application (TurboHub Web), a Laravel Zero agent
distributed as a compiled PHAR binary to hosting servers (TurboHub Agent), and
a suite of WHMCS provisioning modules that tie it all into A2 Hosting's
billing and account infrastructure. I designed the overall system architecture
and led a team of 12 developers from MVP through production, ultimately
servicing over 385,000 WordPress sites for 110,000 customers across 5,000+
servers in four global regions.

## My Role

I served as technical lead and system architect for TurboHub. My
responsibilities included:

- **System Architecture** -- Designed the distributed three-tier architecture:
  WHMCS for billing integration and customer entitlement, the web application
  for the user-facing control panel and business logic, and the server-side
  agent for direct WordPress operations. Chose RabbitMQ as the communication
  backbone between the web tier and thousands of agents, using a synchronous
  RPC pattern with per-server queues for reliable, targeted command execution.

- **Technology Selection** -- Evaluated and selected the core stack: Laravel 10
  with Inertia.js and Vue 3 for a modern single-page experience without a
  separate API layer, Laravel Zero for a lightweight agent framework that
  compiles to a single distributable PHAR binary, Redis for session and cache
  management, Laravel Horizon for queue supervision, and Pusher for real-time
  UI updates.

- **Team Leadership** -- Led 12 developers through the full development
  lifecycle. Established coding standards, review processes, and sprint
  workflows. Broke the project into workstreams (web application, agent,
  WHMCS integration, infrastructure) and coordinated cross-team dependencies.

- **Integration Design** -- Designed the WHMCS integration strategy including
  OAuth-based authentication, client group access levels (internal, beta,
  stable) for phased rollouts, and the provisioning hook chain for Managed
  WordPress products.

- **Deployment Strategy** -- Designed the multi-region deployment pipeline:
  GitHub Actions builds the agent PHAR and distributes it to regional
  repositories (Arizona, Miami, Netherlands, Singapore), while Deployer
  handles zero-downtime web application deployments with automated migration,
  cache management, and frontend builds.

## Problem Solved

A2 Hosting customers with WordPress sites had no centralized way to manage
them. Performance tuning, plugin updates, staging environments, and security
monitoring all required direct server access or third-party tools. There was
no visibility into site health at scale, and no way to offer managed WordPress
features as a product differentiator. TurboHub gave every customer a single
control panel for all their WordPress sites, and gave A2 Hosting a platform to
deliver managed WordPress services across their entire infrastructure.

## System Architecture

TurboHub is a three-component distributed system:

- **TurboHub Web** -- The central Laravel 10 application serving the customer
  control panel. Handles authentication, business logic, and orchestration.
  Communicates with agents via RabbitMQ and with WHMCS via its API.

- **TurboHub Agent** -- A PHP CLI application built on Laravel Zero, compiled
  into a self-contained PHAR binary. Deployed to every hosting server via
  regional package repositories. Runs as a pool of 10 Supervisord-managed
  consumer processes per server, listening to a RabbitMQ queue named after the
  server's hostname for targeted command dispatch.

- **WHMCS Modules** -- Server and provisioning modules within A2 Hosting's
  WHMCS billing system. Handles customer entitlement, Managed WordPress
  product provisioning, and provides the OAuth authentication layer that
  TurboHub Web uses for user sessions.

### Communication Flow

The web application sends commands to agents through RabbitMQ using a
synchronous RPC pattern. Each agent listens on a queue named after its
server's hostname. When a user requests an action (e.g., list plugins, create
a staging site), the web application publishes a message to the target
server's queue with a reply-to callback. The agent processes the command ---
typically by executing WP-CLI operations on the appropriate WordPress
installation --- and publishes the result back. This design allows the web
application to target any specific server among thousands without maintaining
persistent connections.

Real-time UI updates are pushed to the browser via Pusher on private,
per-user channels, so long-running operations like performance optimization or
staging creation provide live progress feedback.

### Authentication and Access Control

Authentication flows through WHMCS OAuth. When a customer accesses TurboHub,
the web application validates their session against WHMCS and maps their
client group membership to an access level: internal (staff), beta (testers),
or stable (production customers). This enabled phased feature rollouts during
development. Agency support allows users managing multiple client accounts to
switch contexts, and admin masquerading supports customer service workflows.

## TurboHub Web

The web application is built on Laravel 10 with a Vue 3 frontend powered by
Inertia.js, providing a single-page application experience with server-side
rendering and no separate API layer.

### Core Features

- **Site Management** -- Central dashboard listing all WordPress sites across a
  customer's hosting accounts. Sites are filterable, taggable, and searchable.
  Each site provides detailed views for plugins, themes, settings, and health
  status.

- **Performance Optimization** -- An automated multi-phase optimization system.
  The analysis phase benchmarks baseline performance and checks for plugin
  conflicts, cache availability, PHP OPcache status, and disk space. The
  optimization phase applies changes in two phases with rollback capability,
  using presets ranging from essentials to extreme. Long-running optimization
  jobs are processed through a dedicated Redis queue supervised by Laravel
  Horizon with 15-minute timeouts.

- **Staging Environments** -- One-click staging site creation with
  bidirectional sync between live and staging. Includes advanced staging via
  InstaWP integration and shareable preview URLs for client review.

- **Plugin and Theme Management** -- Bulk plugin operations across multiple
  sites, auto-update configuration, plugin collections (favorites), and
  activation/deactivation controls. Theme management with status filtering and
  cleanup.

- **Health Monitoring** -- Aggregated health checks including DNS validation,
  SSL certificate verification, domain expiration tracking, and Google
  PageSpeed scoring. Security monitoring through Patchstack vulnerability
  database integration.

- **Security** -- Integration with the A2 Optimized WordPress plugin for
  server-level security settings. Vulnerability scanning against the Patchstack
  database with alerting for affected plugins.

### Technical Stack

- **Backend** -- Laravel 10, PHP 8.1+, MySQL, Redis (sessions, cache, queues)
- **Frontend** -- Vue 3, Inertia.js, Vite, ApexCharts, Ziggy (Laravel route
  generation for JavaScript)
- **Queues** -- Redis with Laravel Horizon managing two supervisor pools:
  a default queue for general jobs and an optimizations queue with extended
  timeouts for long-running performance analysis
- **Real-time** -- Pusher for WebSocket broadcasts on private per-user channels
- **Integrations** -- RabbitMQ (agent communication), WHMCS API (auth and
  data), Google PageSpeed API, Patchstack API, Mixpanel (analytics), Sentry
  (error tracking), Slack (operational notifications), Grafana (metrics)
- **Deployment** -- Deployer 7.3+ with zero-downtime releases, environment
  encryption, automated migrations, and frontend builds

## TurboHub Agent

The agent is a Laravel Zero CLI application compiled into a single PHAR binary
for distribution. It runs on every hosting server as a pool of
Supervisord-managed processes consuming messages from RabbitMQ.

### Architecture

The agent uses a configuration-driven routing system. Incoming RabbitMQ
messages contain a dot-notation function name (e.g.,
`wordpress.plugins.list`) that is resolved through a route configuration map
to a specific service class and method. This allows new operations to be added
by registering a route and implementing the handler, without modifying the
message processing infrastructure.

The agent supports 75+ operations organized across service classes for
WordPress core management, plugin and theme operations, performance
optimization, staging environments, site discovery, cPanel integration, and
server health checks.

### WordPress Integration

The agent wraps WP-CLI for all WordPress operations, executing commands as the
appropriate cPanel user via sudo with configurable memory limits and timeouts.
A plugin blacklist mechanism handles problematic plugins that cause WP-CLI
errors --- when a plugin error is detected, the agent automatically retries
with that plugin skipped, and sends a Slack notification for investigation.

Site discovery uses WP-CLI's find command to enumerate all WordPress
installations under `/home/`, validating each against cPanel user records and
PHP/WordPress version compatibility requirements.

### Deployment and Distribution

GitHub Actions builds the PHAR binary on each release and distributes it to
four regional package repositories (Arizona, Miami, Netherlands, Singapore).
Servers pull updates through an update script managed by the existing
configuration management system. Supervisord automatically restarts consumer
processes after updates.

### Security

The agent authenticates to RabbitMQ using per-server tokens stored outside the
application directory. All RabbitMQ connections use TLS 1.2+ with certificate
verification. Privilege escalation for WP-CLI and cPanel operations is managed
through tightly scoped sudoers rules that restrict the `rmq` service user to
specific binaries and path patterns.

## WHMCS Integration

TurboHub integrates with WHMCS through several modules within A2 Hosting's
customized WHMCS installation:

- **Server Module (a2_omni)** -- Handles provisioning for the Omni
  infrastructure that backs TurboHub's hosting. Manages the full lifecycle:
  creation, suspension, unsuspension, and termination. Provides client area
  controls for server operations and communicates with Omni infrastructure via
  a REST API with callback-based status updates during provisioning.

- **Provisioning Addon (a2_provision)** -- Orchestrates post-creation setup
  for Managed WordPress products, including Jetpack provisioning, cPanel
  configuration, DNS setup, and monitoring integration. Uses a modular
  architecture with dedicated provision classes for each service type.

- **Hooks** -- Pre-creation hooks generate randomized WordPress admin URL
  paths for security and synchronize credentials from custom fields to service
  records. A client group hook (disabled in production) supports automatic
  TurboHub access assignment at checkout.

- **Server Detection** -- Utility classes identify TurboHub servers by
  hostname pattern matching and enumerate all TurboHub-capable servers for
  routing and reporting.

## Impact

- Delivered a unified WordPress management experience to 110,000+ customers
  across 385,000+ sites
- Distributed the agent binary to 5,000+ servers across four global regions
  with automated updates
- Automated performance optimization reduced manual tuning from hours of
  server access to a single-click workflow with rollback safety
- Staging environment creation went from a multi-step manual process to a
  one-click operation with live/staging sync
- Enabled A2 Hosting to offer Managed WordPress as a differentiated product
  tier backed by real tooling
- Centralized security monitoring with vulnerability scanning across the
  entire WordPress install base
