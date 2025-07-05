---
title: Quark
company: BuiltFast, LLC
period: 2025
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
---

Quark is a comprehensive hosting business management platform built on Laravel
12 that handles everything customer-facing for our hosting company. I was the
lead architect on the project which serves as the frontend for our hosting
business, managing customers, billing, provisioning, and support.

## What it does

Quark handles all the business-side operations for running a hosting company:

- Customer registration and account management
- Product catalog with hosting plans and VPS configurations
- Subscription billing through Recurly integration
- Domain registration and DNS management
- Hosting service provisioning orchestration
- Customer support ticket system
- Staff administration and customer impersonation
- Real-time notifications and health monitoring
- Two-factor authentication and security features

The system provides both a Vue.js frontend for customers and a comprehensive
API for external integrations.

## Architecture

The codebase follows Laravel best practices with clear separation of concerns:

**Service Layer** handles all business logic, from checkout processing to
provisioning orchestration. Services coordinate between multiple systems
(billing, DNS, server provisioning) to complete complex workflows.

**State Machines** manage the lifecycle of services and domains through
defined states like pending, active, suspended, and terminated. This ensures
consistent state transitions and makes troubleshooting easier.

**Queue-based Processing** handles all long-running operations like
provisioning new hosting accounts or processing billing events. This keeps the
frontend responsive while complex operations happen in the background.

**Policy-based Authorization** ensures customers can only access their own
data and staff have appropriate permissions for administrative functions.

## Technical stack

- **Laravel 12** with PHP 8.3+
- **MySQL** for primary data storage
- **Redis** for caching, sessions, and queue management
- **Vue.js** frontend with TypeScript
- **PestPHP** for testing
- **PHPStan** for static analysis
- **Recurly** for subscription billing
- **PowerDNS** for DNS management

## Key features

**Comprehensive Billing**: Full subscription lifecycle management with Recurly
integration, including checkout, renewals, upgrades, and dunning management.

**Service Orchestration**: Coordinates hosting account creation across
multiple systems - creates DNS records, allocates servers, provisions accounts
via Genesis API, and handles callbacks.

**Domain Management**: Complete domain registration and management through
registrar APIs, with automatic DNS configuration and health monitoring.

**Staff Tools**: Administrative interface for managing customers, processing
support requests, and handling billing issues. Includes secure customer
impersonation for troubleshooting.

**API-First Design**: RESTful API with comprehensive documentation, HMAC
authentication for server communication, and webhook processing for external
integrations.

**Health Monitoring**: Built-in health checks for all critical services
including DNS resolution, SSL certificates, and external API connectivity.

## Development approach

I built this with a focus on reliability and maintainability:

- **Strict typing** throughout (`declare(strict_types=1)`)
- **Final classes** to prevent inheritance issues
- **Comprehensive testing** with unit, integration, and feature tests
- **Interface-based architecture** for all external integrations
- **State machines** for managing complex business workflows

The application includes intelligent mocking for external services (Recurly,
DNS providers) so tests run fast and don't depend on external APIs.

## Integration with Genesis

Quark orchestrates the entire customer experience while Genesis handles the
actual server provisioning:

**Customer Signup Flow**: When customers sign up, Quark processes payment,
creates their account, allocates an appropriate server, then calls the Genesis
API to provision their hosting account.

**HMAC Communication**: Secure API communication between Quark and Genesis
using rotating HMAC secrets to ensure only authorized provisioning requests
are processed.

**Asynchronous Processing**: Provisioning happens in background jobs with
callback handling to update status when operations complete.

## Personal role

As a founding team member, I designed and built the core architecture:

- Created the service layer architecture and billing integration
- Implemented the checkout flow and subscription management
- Built the staff administration tools and customer impersonation system
- Designed the API structure and external integrations
- Established testing patterns and deployment processes

Quark serves as the customer-facing foundation of our hosting business and
demonstrates building complex SaaS applications that integrate billing,
provisioning, and support systems while maintaining security and reliability.
