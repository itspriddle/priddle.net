---
title:   GoCart
company: A2 Hosting, Inc
period:  Apr 2023
date:    2023-04-01
tags:
  - Blade
  - Bootstrap
  - Deployer
  - GitHub Actions
  - Guzzle
  - JavaScript
  - jQuery
  - Laravel
  - MySQL
  - Nginx
  - PHP
  - Playwright
  - Sentry
  - Stripe
project_type: work
---

GoCart is a custom Laravel 10 checkout application for A2 Hosting, serving as
the order form at `cart.a2hosting.com`. It replaced portions of WHMCS's
built-in order flow with a modern, standalone storefront that communicates with
WHMCS through a custom addon module (`go_cart`) for product data, pricing,
authentication, domain operations, and order submission. The application handles
shared, VPS, and dedicated hosting product orders with support for multiple
currencies, configurable product options, domain registration and transfer,
Stripe and PayPal payment processing, and affiliate tracking.

I was the lead architect for GoCart. I worked with a third-party agency
(Objectbrewery) who built the initial WHMCS addon module and a proof-of-concept
Laravel application. I then did significant work to get the application
production-ready and operational, including infrastructure, deployment, backend
architecture, monitoring, and ongoing maintenance. Frontend work was handled
primarily by A2 Hosting's marketing team.

## My Role

- **Lead Architect** -- Defined the system architecture: a stateless Laravel
  frontend communicating with WHMCS through a custom addon module API. All
  persistent state (products, orders, users) lives in WHMCS; GoCart handles
  presentation, form logic, and payment orchestration.

- **Project Initialization** -- Created the initial Laravel project and
  established the codebase structure, development environment (direnv, encrypted
  env files), and dependency management.

- **GoCart Library** -- Built and maintained the core PHP library
  (`app/libraries/GoCart/`) that abstracts all WHMCS API communication. This
  includes the `Builder` class for fluent order construction, `ProductFetcher`
  and `ProductSubmitter` for API calls, `Authenticator` for user login, and the
  `Paths` URL builder for WHMCS endpoint routing.

- **Authentication System** -- Implemented the authentication flow including
  proxy IP forwarding (CF-Connecting-IP, X-Real-IP, X-Client-IP, X-Forwarded-For)
  for accurate fraud detection behind Cloudflare and load balancers.

- **Deployment Pipeline** -- Built the GitHub Actions CI/CD pipeline including
  production deployment workflows, Deployer configuration with encrypted
  environment variables, Slack deploy announcements, and rollback via release
  deletion.

- **Playwright Integration** -- Built the end-to-end test pipeline using
  Playwright, triggered on deploys through GitHub Actions (8+ PRs iterating on
  the CI configuration).

- **Monitoring and Observability** -- Configured Sentry for error tracking and
  performance profiling, including JS SDK integration, sample rate tuning, and
  heartbeat monitoring.

- **Affiliate and Analytics Tracking** -- Implemented Post Affiliate Pro (PAP)
  cookie tracking for order attribution, and cookie forwarding for Google Ads
  (`gclid`), Microsoft Ads (`msclkid`), Facebook (`fbclid`), and analytics
  platforms (GA, Matomo) from GoCart to WHMCS.

- **Currency Support** -- Added multi-currency support across the product
  fetching pipeline.

- **Code Review** -- Reviewed and merged contributions from the agency team and
  other developers.

- **Ongoing Maintenance** -- Bug fixes (CSRF token expiration, blocked domain
  handling, SSL verification, Facebook cookie handling), dependency management,
  and operational tuning across nearly two years.

## Architecture

GoCart is a stateless Laravel 10 application. It has no application-specific
database tables --- all persistent data lives in WHMCS. The application fetches
product information, submits orders, and authenticates users by calling endpoints
on the WHMCS `go_cart` addon module.

### GoCart Library (`app/libraries/GoCart/`)

A standalone PHP library encapsulating all WHMCS API interaction:

- **GoCart.php** -- Static facade providing entry points: `getProductData()`,
  `OrderBuilder()`, `getCountries()`, `getStates()`
- **Builder.php** -- Fluent interface for constructing orders with user data,
  products, promotions, payment methods, affiliate tracking, and metadata
- **Paths.php** -- URL builder targeting WHMCS endpoints via
  `index.php?m=go_cart&a=<action>` (actions: `get_product`, `order`, `pricing`,
  `domain`, `get_locale`, `authenticate`)
- **ProductFetcher.php** -- Reads product data and locale information from WHMCS
  with caching
- **ProductSubmitter.php** -- Submits orders and pricing requests, forwards
  marketing/affiliate cookies to WHMCS
- **Authenticator.php** -- Validates user credentials against WHMCS with IP
  forwarding for fraud prevention

### WHMCS Addon Module (`go_cart`)

The WHMCS side exposes a REST API for GoCart to consume:

- **Product API** -- Returns product details, pricing across billing cycles and
  currencies, configuration options, custom fields, promotions, and upsells
- **Order API** -- Validates and places orders including user
  registration/login, domain handling, payment processing (Stripe charges,
  PayPal redirects, bank transfer), fraud checks, and metadata storage
- **Pricing API** -- Calculates totals with tax, promotions, config options, and
  domain fees based on user location
- **Authentication API** -- Token-based session management supporting
  multi-account users with permission checks
- **Domain API** -- Availability checking, TLD pricing, addon pricing (DNS
  management, ID protection, email forwarding)
- **Locale API** -- Country and state lists for address forms
- **Reports** -- Custom WHMCS report (`a2_gocart_orders`) listing all orders
  placed through GoCart

### Controllers

- **ProductController** -- Main checkout logic: displays product pages with
  upsells and config options, processes order submission (user validation,
  domain selection, payment collection), handles dynamic pricing calculations
  and domain availability checks
- **AuthenticateController** -- User login returning authentication tokens

### Frontend

- **Blade templates** with Bootstrap 5 and jQuery
- Stripe.js for payment processing
- Google Tag Manager for conversion tracking
- Chatwoot for live chat
- PAP scripts for affiliate tracking

### Supported Products

The routing configuration maps URL paths to specific WHMCS product IDs,
covering A2 Hosting's shared, VPS, and dedicated hosting tiers.

