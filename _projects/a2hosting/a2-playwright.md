---
title:   A2 Playwright
company: A2 Hosting, Inc
period:  Aug - Oct 2024
date:    2024-08-21
tags:
  - CI/CD
  - End-to-End Testing
  - GitHub Actions
  - JavaScript
  - Node.js
  - Playwright
  - Slack
project_type: work
---

A2 Playwright is an end-to-end browser testing framework I built for A2
Hosting's critical customer-facing web applications. It covers GoCart (the
shopping cart and order form), WHMCS (client management), and TurboHub (the
WordPress management platform). I designed the full system --- test
architecture, CI/CD pipeline, Slack alerting, and documentation --- then
handed it off to a QA engineer on my team to maintain and expand.

As Director of Development, I built this myself to solve a real operational
problem: our marketing team deployed changes to the GoCart shopping cart
regularly, and bad deploys were silently breaking the order form. We had no
automated way to know until customers reported issues or revenue dipped. I
got hands-on because the problem was urgent and the solution needed to be
built fast, correctly, and in a way that the team could sustain without me.

## Problem Solved

GoCart is the entry point for every A2 Hosting sale. Marketing frequently
pushed updates --- new promotions, layout changes, copy updates --- and
occasionally those deploys broke the order flow. A customer hitting a broken
checkout page means lost revenue with zero visibility. There was no
automated regression testing, no deploy-time validation, and no alerting.
The team only found out when something was obviously wrong or a customer
complained.

I needed a system that would automatically run tests against the live cart
after every deploy, alert the team immediately on failure with enough
context to act on it, and be simple enough for a QA engineer (not a
framework expert) to maintain and extend.

## Architecture

The project is structured around Playwright's multi-project configuration,
with each A2 application treated as a separate project with its own test
directory, fixtures, and page objects.

**Test Organization:**

- `tests/gocart/` --- 7 spec files covering order submission, billing
  cycles, domain lookup, password validation, dedicated IP flows, UI
  checks, and URL routing
- `tests/whmcs/` --- Domain availability checks and API integration tests
  for GoCart and pricing endpoints
- `tests/turbohub/` --- Access control and My Sites page navigation, built
  on WHMCS authentication

**Library Layer:**

- **Page objects** (`lib/pages/`) --- Encapsulate UI interactions for each
  application. The GoCart page object handles the full order form: name,
  email, password, address, payment method, domain selection, and
  submission. WHMCS handles login with session caching. TurboHub navigates
  authenticated dashboard pages.
- **Fixtures** (`lib/fixtures/`) --- Extend Playwright's base test fixtures
  with application-specific setup. WHMCS fixtures handle authentication
  state via a cached `.whmcs-auth.json` file. TurboHub extends WHMCS (it
  requires an authenticated WHMCS session). GoCart fixtures inject random
  product IDs and page object instances.
- **Utilities** (`lib/utils/`) --- Environment variable handling with
  required/optional semantics, a logger supporting console and GitHub
  Actions output formats, and a faker wrapper for generating realistic test
  data (names, addresses, emails, passwords).
- **Product mappings** (`lib/product.js`) --- Maps A2's full product catalog
  (shared, managed WordPress, reseller, VPS, dedicated) to their internal
  IDs for randomized test coverage across product types.

## CI/CD Pipeline

The CI setup was the most interesting part of this project, and the piece I
designed specifically for the GoCart deploy problem.

**Workflow Design:**

The main `ci.yml` workflow supports four trigger modes: push to master, pull
requests, manual dispatch via the GitHub UI or `gh` CLI, and --- critically
--- calls from other repositories. This last mode is what made it useful for
GoCart. When the marketing team deployed changes to the cart, their
repository's deploy workflow would trigger A2 Playwright's CI to run the
GoCart test suite against the live site.

**Workflow Dispatch Inputs:**

- `project` --- run all suites or target a specific app (gocart, turbohub,
  whmcs)
- `grep` --- filter tests by pattern or tag
- `notify_slack` --- enable Slack failure notifications
- `live_orders` --- submit real orders to test the complete purchase flow
  end-to-end

Each application also has its own wrapper workflow (`gocart.yml`,
`turbohub.yml`, `whmcs.yml`) for convenient one-click runs.

**Scheduled Runs:**

A daily schedule runs tests tagged with `@scheduled/daily` at 8:13 AM
Eastern. Tests opt in to scheduling via Playwright's tag system, so critical
flows like live order submission run every morning as a canary.

**Execution Details:**

- Runs on `ubuntu-latest` with Node LTS and Chromium
- Playwright browser binaries are cached to speed up runs
- Single worker on CI (parallel locally) with 2 retries for flake tolerance
- 1920x1080 viewport with a custom user agent to bypass CloudFlare blocking
- Full-page screenshots captured on failure, traces recorded on first retry
- Blob reports uploaded as artifacts, then merged in a second job

## Slack Alerting

The Slack integration was key to making this operationally useful. A custom
Playwright reporter (`lib/slack_reporter/`) fires on test failures and sends
structured messages to project-specific Slack channels.

**How it works:**

- The reporter collects up to 5 failures per run, skipping retry attempts
  to avoid noise
- Messages are organized by project and sent to configurable channels ---
  GoCart failures go to `#cart-alerts`, other projects to
  `#playwright-alerts`
- Each failure message includes the test name, error details, and pointers
  to the relevant test files on GitHub so the team can jump straight to the
  code
- Channel-specific `@mention` groups are configurable so the right people
  get pinged --- for GoCart alerts, that was the cart team and me

This meant that when marketing deployed a change that broke the order form,
the team had a Slack notification within minutes pointing to exactly what
failed and where to look in the codebase.

## GoCart Integration

The GoCart use case drove the entire project. The test suite covers the
full order funnel:

- **Order submission** --- fills out the complete form with fake data
  (faker.js), selects a random product from the catalog, skips domain
  registration, chooses bank transfer payment, and submits. Tagged
  `@gocart/live-orders` so it can be toggled for real order testing.
- **Password validation** --- tests the progressive strength meter by
  entering characters sequentially and validating error state at each step
- **Billing cycles** --- verifies pricing display for different billing
  periods
- **Domain lookup** --- tests the domain search and selection flow
- **UI checks** --- validates element visibility and layout
- **URL routing** --- confirms product URLs resolve correctly

The `live_orders` flag was important --- we could run the suite in dry mode
for CI validation, but flip it on for real end-to-end verification that an
order actually makes it through the billing system.

## Handoff

I built the project from August through mid-October 2024. The codebase was
intentionally designed for handoff:
page objects keep UI interactions isolated from test logic, fixtures handle
setup boilerplate, and the CI workflows are parameterized so adding a new
application means adding a test directory, a fixture file, and a wrapper
workflow.

I wrote three internal docs to support the transition: a GitHub Actions
usage guide with examples for every trigger mode, a guide for adding new
test projects, and a GitHub App authentication guide for cross-repository
workflow triggers.

A QA engineer on my team took over active development in mid-October 2024
and picked up ownership easily, continuing to build on the same architecture
and patterns I established.
