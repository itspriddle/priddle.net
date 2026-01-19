---
title:   Synco
company: World Wide Web Hosting, LLC
period:  May 2011
date:    2011-05-01
tags:
  - Javascript
  - Linux
  - MySQL
  - Ruby
  - RubyGems
  - Rails
project_type: work
---

Synco is a legacy Ruby on Rails billing and customer management system used by
Site5, a brand of World Wide Web Hosting. It served as both the customer-facing
portal (order forms, service management, support tickets) and the staff admin
interface (customer management, provisioning, mass mailing, billing). I joined this project after its initial development and worked on it for 4+
years (2011--2015). I was responsible for performance optimization, security
hardening, VPS provisioning features, and maintaining the application through
end of life as customers were migrated to our new billing system, Helix.

## Architecture

Synco was a monolithic Rails application backed by MySQL. It managed shared
hosting, managed and unmanaged VPS, reseller hosting, dedicated servers, and
domain registration services. The customer-facing side ("Backstage") handled
sign-ups, service management, billing, and support. The staff side handled
provisioning, customer management, mass communications, and reporting. The app
integrated with cPanel, SolusVM, OpenSRS, and Enom APIs for service lifecycle
management.

## Key Contributions

### Performance: VPS Order Form Optimization

The VPS order form page was critically slow, taking roughly 10 minutes to load.
Over a concentrated 3-day effort in January 2015, I identified and eliminated
the root causes through a series of targeted fixes:

- **Added missing database indexes** on `order_forms_plans` and `cart_entries`
  join tables
- **Refactored `OrderForm#valid_plans`** to use a single batch query instead of
  loading all plans and filtering with Ruby
- **Eliminated N+1 queries** by caching `valid_plans` in a local variable
  instead of calling `@order.valid_plans` repeatedly in the view (which
  re-executed the query each time)
- **Replaced object comparisons with ID comparisons** (`server_location_id`
  instead of loading full `ServerLocation` instances)
- **Batch-loaded plan specs** with `all_plan_specs` — a single query for all
  plan values instead of per-plan queries in a loop
- **Cached plan prices and value descriptions** in instance variables to avoid
  redundant lookups
- **Used raw attribute reads** (`read_attribute(:free_memory)`) to skip
  ActiveRecord callbacks on hot paths

These changes brought page load time from ~10 minutes down to under 1 minute.

### Performance: Mass Mail Wizard

The staff mass mail wizard pages were also extremely slow due to ActiveRecord
loading full model graphs (`Service` with `:include => [:customer, :plan]`) for
thousands of records. I replaced these with targeted raw SQL joins that selected
only the columns needed for display, dramatically reducing load times.

### Security Hardening

I led multiple security efforts across the application:

- **XSS prevention**: Systematic HTML escaping across order forms, domain
  management, and admin views to close cross-site scripting vulnerabilities
- **CryptoBismol**: Contributed to the encryption library used to store
  sensitive customer data, adding tests and improving the encryption scheme
  storage format
- **Input sanitization**: Patched `HTML::WhiteListSanitizer`, added security
  question requirements, restricted sensitive pages to master contacts

### VPS Provisioning & APIs

- Built and maintained VPS provisioning and deprovisioning workflows for both
  managed and unmanaged VPS products
- Implemented `VpsApiCache` to store VPS state in the database, eliminating
  redundant API calls to SolusVM
- Added server APIs for integration with internal monitoring and automation tools
- Integrated with the SolusVM and cPanel APIs for service lifecycle management

### Helix Migration Preparation

As the team built Helix (our replacement billing system), I prepared Synco for
the customer migration:

- Added `helix_id` and `helix_imported_at` columns to customers, contacts, and
  services tables
- Built redirect logic so imported customers attempting to log in or reset
  passwords in Synco were directed to the new system
- Displayed banners for imported customers explaining the transition

The Synco-to-Helix migration was in progress but never completed — the company
was acquired before it could be finalized.
