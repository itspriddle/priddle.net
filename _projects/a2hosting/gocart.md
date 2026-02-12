---
title: GoCart
company: A2 Hosting, Inc
role: Lead Architect
period: Apr 2023 - Apr 2025
date: 2023-04-01
tags:
  - Laravel
  - PHP
  - Stripe
  - WHMCS
  - Playwright
  - GitHub Actions
  - Deployer
  - Sentry
project_type: work
tier: 2
excerpt: >-
  Custom Laravel checkout application at cart.a2hosting.com, replacing WHMCS's
  built-in order flow with a modern storefront for all hosting products.
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

- **Playwright Integration** -- Built the [end-to-end test pipeline](/work/a2hosting/a2-playwright/)
  using Playwright, triggered on deploys through GitHub Actions (8+ PRs iterating
  on the CI configuration).

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

GoCart is a stateless Laravel 10 application with no application-specific
database tables — all persistent data lives in WHMCS. The application fetches
product information, submits orders, and authenticates users by calling endpoints
on a custom WHMCS addon module (`go_cart`).

The core of the codebase is a PHP library that abstracts all WHMCS API
interaction behind a clean interface: a fluent order builder for constructing
orders with user data, products, promotions, and payment methods; a product
fetcher with caching; an authenticator with proxy IP forwarding for fraud
detection behind Cloudflare; and a URL builder for WHMCS endpoint routing.

The WHMCS addon module exposes a REST API covering product data and pricing,
order validation and placement (Stripe, PayPal, bank transfer), token-based
authentication, domain availability and TLD pricing, and locale data. A custom
WHMCS report tracks all orders placed through GoCart.

The frontend uses Blade templates with Bootstrap 5, Stripe.js for payment
processing, and integrations for analytics tracking, affiliate attribution
(Post Affiliate Pro), and live chat.

