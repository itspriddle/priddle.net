---
title: Genesis
company: BuiltFast, LLC
period: 2025-Present
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
---

Genesis is a hosting provisioning API built on Laravel 12 that handles the
complete lifecycle of web hosting accounts and VPS instances. I was the lead
architect on the project which serves as the core provisioning system for
BuiltFast, handling everything from initial account creation to
termination.

## What it does

Genesis automates all the server-side work needed to provision hosting accounts:

- Creating Linux user accounts with proper permissions and home directories
- Setting up Apache virtual hosts with SSL configuration
- Provisioning MySQL databases and users
- Managing Redis instances for caching
- Installing applications like WordPress with plugins and themes
- Managing IP address pools (shared vs dedicated IPs)
- Handling VPS provisioning through virtualization platforms

The system exposes a REST API that our billing system calls to provision new
accounts, suspend accounts for non-payment, terminate accounts, and make
configuration changes.

## Architecture

The codebase is organized around two main patterns:

**Commands** handle complete workflows like provisioning a new account or
terminating an existing one. Each command coordinates multiple system
operations and includes rollback capabilities if something fails partway
through.

**Managers** handle specific infrastructure components like Apache, MySQL,
DNS, etc. Each manager knows how to configure and interact with its particular
service.

Everything is wired together through Laravel's service container using
interfaces, which makes it easier to have a comprehensive test suite that
allows us to deploy to all of our servers with confidence.

## Technical stack

- **Laravel 12** with PHP 8.3+
- **SQLite** for primary data storage
- **Redis** for caching and session management
- **PestPHP** for testing
- **PHPStan** for static analysis
- **HMAC authentication** for API security

## Key features

**Automated provisioning**: The API can create a complete hosting account
(user, database, web server config, etc) in a single call.

**IP pool management**: Automatically assigns shared IPs with load balancing
or dedicated IPs for premium accounts.

**Application installation**: Can automatically install WordPress or other
applications with specified themes, plugins, and demo content.

**VPS provisioning**: Full virtual machine creation and configuration for VPS
products.

**Queue-based processing**: Long-running operations happen in background jobs
so API responses stay fast.

## Development approach

I built this with a focus on reliability and testability:

- **Strict typing** throughout (`declare(strict_types=1)`)
- **Final classes** to prevent inheritance issues
- **Comprehensive testing** with unit, integration, and feature tests
- **Interface-based architecture** for easy testing and separation of concerns
- **SOLID principles** with clean separation of concerns

The test suite mocks all external system calls so tests run fast and don't
require actual infrastructure.

## Personal role

As a founding team member, I designed and built the core architecture:

- Created the command/manager pattern structure
- Implemented the REST API and HMAC authentication
- Established testing patterns and code quality standards
- Set up CI/CD pipelines and deployment processes

Genesis is the backbone of our hosting infrastructure and handles all our
provisioning operations. It demonstrates building production-grade Laravel
applications that integrate with complex server infrastructure while
maintaining high code quality and comprehensive test coverage.
