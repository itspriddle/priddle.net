---
title: Genesis
company: BuiltFast, LLC
role: Lead Architect
period: Jan 2025 - Present
date: 2025-01-01
tags:
  - Laravel
  - PHP
  - Hosting
  - API
  - DevOps
  - Automation
  - MySQL
  - Redis
  - Testing
project_type: work
tier: 2
excerpt: >-
  Hosting provisioning API built on Laravel 12 that handles the complete
  lifecycle of web hosting accounts and VPS instances for BuiltFast.
---

Genesis is the core provisioning system for BuiltFast, built on Laravel 12. As
lead architect and founding team member, I designed the system from scratch to
handle the complete lifecycle of web hosting accounts and VPS instances —
from initial account creation through suspension, configuration changes, and
termination.

The system exposes a REST API secured with HMAC authentication that
[Quark](/work/builtfast/quark/) (our billing platform) calls to orchestrate provisioning.
A single API call can create a complete hosting account: Linux user with proper
permissions, Apache virtual host with SSL, MySQL database, Redis instance, and a
WordPress installation with specified themes and plugins.

## Architecture

The codebase is organized around two core patterns:

**Commands** handle complete workflows like provisioning a new account or
terminating an existing one. Each command coordinates multiple system operations
and includes rollback capabilities if something fails partway through.

**Managers** handle specific infrastructure components — Apache, MySQL, DNS,
Redis, IP allocation. Each manager knows how to configure and interact with its
particular service.

Everything is wired together through Laravel's service container using
interfaces. This makes it straightforward to mock all external system calls so
tests run fast and don't require actual infrastructure, giving us confidence to
deploy across all servers.

## Key Features

**IP pool management** automatically assigns shared IPs with load balancing or
dedicated IPs for premium accounts. **VPS provisioning** handles full virtual
machine creation and configuration. **Queue-based processing** moves
long-running operations to background jobs so API responses stay fast.

The entire codebase uses strict typing, final classes, and comprehensive test
coverage across unit, integration, and feature tests. PHPStan provides static
analysis as an additional safety net.

## Impact

Genesis is the backbone of BuiltFast's hosting infrastructure. Every account
provisioned, every server configured, every suspension and termination flows
through this system. The interface-based architecture has made it
straightforward to add new hosting products and infrastructure providers as
the business grows.
