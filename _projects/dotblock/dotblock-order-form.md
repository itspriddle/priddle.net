---
title: DotBlock Order Form
company: DotBlock.com, Inc
role: Lead Developer
period: Aug 2010
date: 2010-08-01
tags:
  - Ruby
  - Rails
  - jQuery
  - PHP
  - MySQL
  - WHMCS
  - SolusVM
  - XMPP
project_type: work
tier: 2
excerpt: >-
  Rails-based VPS order form for DotBlock with real-time pricing, WHMCS
  billing integration, and automated PBX callbacks on new sales.
---

DotBlock Order Form is the customer-facing order application for
dotblock.com, a VPS hosting provider. Built with Ruby on Rails 3 and jQuery,
it guided customers through a 3-step process to configure and purchase virtual
servers. The application served as a thin, focused front-end that delegated
all billing and provisioning to the existing WHMCS system through a custom
Ruby API layer, and integrated with the company's PBX and Jabber systems for
real-time sales notifications.

## Architecture

The order form was a Rails 3 application backed by MySQL, designed as a
lightweight wrapper around WHMCS. It maintained minimal local state --- just
user records linking back to WHMCS client IDs --- and delegated all billing,
client management, and order processing to the WHMCS API. The application
connected to three databases: its own Rails database for user records, the
WHMCS database for product catalog and promotional code lookups, and a PBX
database for automated callback scheduling.

The WHMCS integration was handled by a custom `DotBlock::Billing` library
that communicated with the WHMCS API at `billing.dotblock.com`. Because WHMCS
is a PHP application, the API layer handled PHP serialization and base64
encoding for complex data structures like server configuration options. This
library was the precursor to the [whmcs-ruby][] gem, which I later extracted
and open-sourced.

[whmcs-ruby]: https://github.com/dotblock/whmcs-ruby

## Order Flow

The order form walked customers through three steps:

### Step 1: Select Blocks

Customers chose their server size using a jQuery UI slider representing
"blocks" --- each block added a fixed increment of CPU (2.5 GHz), RAM (2 GB),
RAID storage (20 GB), and bandwidth (250 GB) at $34.95/month per block.
The slider supported 1--18 blocks, with all resource values and pricing
updating in real time as the slider moved. Each block count mapped to a
specific WHMCS product ID for billing.

### Step 2: Server Configuration

Customers selected a hostname, operating system (17 options across CentOS,
Debian, Ubuntu, Windows, and FreeBSD), and optional software stacks. The
stack system used a Ruby DSL to define 18 pre-configured software bundles ---
LAMP, Rails, cPanel, WordPress, Minecraft, Asterisk, and others --- each with
descriptions, package lists, and WHMCS add-on IDs. Stack availability was
OS-dependent, and certain operating systems (cPanel, Windows) automatically
attached required paid add-ons.

### Step 3: Checkout

New customers filled out account and payment information with client-side
validation including Luhn algorithm credit card checks. The form supported
credit card and PayPal payment methods. Returning customers were identified by
a cookie and shown a streamlined form that skipped account creation. Promo
codes were validated via AJAX against the WHMCS database.

## Order Submission

On submission, the `DotBlock::Billing::Signup` class orchestrated a two-stage
process: first creating the client in WHMCS, then submitting the order using
the returned client ID. On success, the system triggered three parallel
actions: creating a local user record linked to the WHMCS account, sending a
Jabber/XMPP notification to a broadcast channel for the sales team, and
scheduling an automated callback through the PBX system for customers with
US phone numbers.

## Supporting Infrastructure

The order form was one piece of a larger DotBlock platform that I built and
maintained:

- **DotBlock API** --- A Sinatra-based REST API that gave customers
  programmatic access to their accounts and virtual servers. It bridged WHMCS
  (for account and billing data) and SolusVM (for server power operations
  like boot, reboot, shutdown). This API backed the DotBlock Mobile app and
  the public API clients I released in Ruby, PHP, and Bash.

- **Elmer** --- A PHP integration framework ("The DotBlock Glue Stick") that
  kept WHMCS, SolusVM, and DNS Control in sync. It provided an ORM-like
  abstraction over multiple databases, maintained a mapping table between
  WHMCS and SolusVM client IDs, and implemented WHMCS hooks that
  automatically propagated client creation, password changes, and profile
  updates across all three systems.

- **Gatekeeper** --- A PHP library handling single sign-on and credential
  synchronization between WHMCS and SolusVM. It enabled customers to log in
  once through WHMCS and access the SolusVM control panel seamlessly, with
  password and profile changes propagated automatically.

## Technical Details

- **Access Control** --- The application was restricted to the corporate
  network in production via IP whitelist filtering, as it was embedded within
  the dotblock.com website rather than served as a standalone application.
- **Multi-Database** --- ActiveRecord connections to three MySQL databases
  (local Rails, remote WHMCS, remote PBX) with models targeting specific
  databases for catalog lookups and callback scheduling.
- **Error Tracking** --- Hoptoad (now Airbrake) integration for production
  error monitoring.
- **Deployment** --- Capistrano-based deployment with sensitive configuration
  (WHMCS API credentials, Jabber credentials, database connections) managed
  through environment-specific YAML files.
