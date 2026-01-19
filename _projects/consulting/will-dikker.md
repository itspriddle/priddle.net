---
title:   Will Dikker
company: Will Dikker, LLC
period:  Jan 2009
date:    2009-01-01
tags:
  - ActiveMerchant
  - Air2Web
  - Authorize.net
  - Blueprint CSS
  - Capistrano
  - Ferret
  - Geokit
  - jQuery
  - Linux
  - MySQL
  - Passenger
  - Rails
  - Ruby
  - SMS
  - Startup
project_type: work
---

Will Dikker was a local startup providing a classifieds marketplace for
vehicles and equipment --- automobiles, motorcycles, boats, RVs, and utility
trailers. The core concept combined a web listing platform with physical
marketing: sellers received free "Will Dikker Stikkers" bearing a unique
alphanumeric code and an SMS short code (78501). Potential buyers could text
the code to get listing details on their phone, bridging offline discovery
with the online marketplace.

I handled all backend development on the Rails 2.2.2 application, including
the multi-step listing wizard, SMS gateway integration, payment processing,
full-text search, geolocation features, email systems, and the admin panel.
Tony Montemorano of Allusis Design, LLC handled all design work. I was also
responsible for server setup, deployment configuration, and DevOps.

## Architecture

The application was a monolithic Rails 2.2.2 app backed by MySQL. It followed
the plugin-heavy architecture typical of the Rails 2 era, with 15 vendor
plugins providing core functionality including authentication, state
management, file uploads, payment processing, and full-text search.

### Core Models

The data model centered on a `Listing` entity with polymorphic
category-specific detail models:

- **Listing** -- The core classifieds record with title, description, asking
  price, ZIP code, and geolocation coordinates. Managed by an AASM state
  machine with transitions through unactivated, pending, active, suspended,
  expired, sold, and deleted states.
- **Automobile** -- Year, make, model, mileage, VIN, and numerous feature
  flags (power steering, cruise control, sunroof, etc.)
- **Motorcycle** -- Make, model, engine size, VIN, year
- **Boat** -- Class, manufacturer, hull material, engine specs, length
- **Rv** -- Manufacturer, model, sleeping capacity, AC units, slide-outs
- **UtilityTrailer** -- Subcategory, construction type, hitch type

Supporting models included `ListingPhoto` for image attachments,
`ListingItemNumber` for the unique sticker codes, `ListingMessage` for
buyer-seller communication, and `Order`/`OrderTransaction` for payment
tracking.

### Multi-Step Listing Wizard

Listing creation used a session-based multi-step wizard in the `SellController`
that walked sellers through: package selection, category selection, listing
details entry, photo uploads, review, and checkout. SSL was enforced on the
checkout and payment steps.

### Authentication

User authentication was built on the `restful_authentication` plugin with
email-based accounts, SHA1 password hashing with a site key and 10 rounds of
digest stretching, activation via email codes, remember-me cookie tokens, and
an AASM state machine (passive, pending, active). Admin access was gated by an
`is_super` flag on the user record.

## SMS Integration

The standout feature was SMS text-in via Air2Web. Each listing was assigned a
unique alphanumeric code generated from a consonant-heavy character set
(`BCDFGHJKLNPQRSTVXYZ`) to avoid ambiguous characters. Buyers texted these
codes to short code 78501, which hit an Air2Web webhook routed to an API
controller. The app looked up the listing and replied with vehicle details
via the Air2Web XML API (`http://mrr.air2web.com/a2w_preRouter/xmlApiRouter`).
An `SmsMessage` model logged all inbound and outbound messages, and an
`SmsBlacklist` model handled opt-outs.

## Payment Processing

Billing was handled through ActiveMerchant with Authorize.net as the payment
gateway. The `Order` model tracked purchases with shipping addresses (for
physical sticker delivery), amounts, and package references. `OrderTransaction`
logged each gateway interaction (purchase, authorize, capture) with success
status, reference codes, and response messages. Promotional codes supported
tiered discounts with flags for free listings, free shipping, and
never-expires options.

## Search and Geolocation

Full-text search was powered by Acts as Ferret, indexing listings across title,
description, category, ZIP code, asking price, and category-specific fields
(make, model, year, etc.). A dedicated Ferret server ran alongside the
application.

Geokit provided distance-based search, geocoding listing ZIP codes to
latitude/longitude and enabling "within X miles" queries.

## Email System

ActionMailer handled 17 transactional email templates covering the full user
and listing lifecycle: account creation, activation, and password reset;
listing creation, activation, sticker shipment, and inquiry notifications;
order success and failure confirmations; and admin alerts for new listings
and orders.

The app also supported inbound email via Gmail IMAP polling --- replies to
listing inquiry emails were parsed by subject line to route responses back
to the correct listing conversation.

An email campaign system supported marketing outreach with tiered delivery,
batch sending (50 per run), and success tracking.

## File Uploads

Listing photos used the `attachment_fu` plugin with filesystem storage under
`/public/system/listings/`. Images were capped at 1 MB and auto-resized to
640x480, with three thumbnail sizes generated on upload: 230x230 (avatar),
100x100 (medium), and 70x70 (thumb).

## Admin Panel

A staff admin area at `/admin/` provided management interfaces for users,
listings (moderation), orders, packages (Basic/Enhanced/Ultimate tiers with
configurable SMS credits, photo limits, sticker counts, and durations),
package add-ons, email campaigns, site settings, and cell provider lookups.

## Frontend

The frontend used Blueprint CSS for the grid layout, jQuery via the jRails
plugin, jQuery UI for datepickers and tabs, and FancyBox for image lightboxes.
Category-specific JavaScript handled dynamic form fields for each vehicle
type.

## Deployment

Capistrano managed deployments to the production server running Phusion
Passenger (mod_rails). The deploy process disabled the site with a maintenance
page, updated code via git remote cache, symlinked shared config files
(`database.yml`, `mailer.yml`, `billing.yml`), ran migrations, built a
combined CSS file, and restarted Passenger via `tmp/restart.txt`. The deploy
recipe also included iptables firewall configuration for server hardening.

Error tracking was handled by Hoptoad (now Airbrake), and reCAPTCHA protected
public-facing forms.

## Technical Stack

- **Framework** -- Rails 2.2.2, Ruby 1.8
- **Database** -- MySQL with ActiveRecord and database-backed sessions
- **App Server** -- Phusion Passenger (mod_rails)
- **Deployment** -- Capistrano, Git
- **Authentication** -- restful_authentication with SSL enforcement
- **State Management** -- AASM (listings and users)
- **Payments** -- ActiveMerchant with Authorize.net
- **SMS** -- Air2Web XML API, short code 78501
- **Search** -- Acts as Ferret (full-text indexing)
- **Geolocation** -- Geokit with Google geocoding
- **File Uploads** -- attachment_fu (filesystem storage)
- **Background Jobs** -- delayed_job
- **Frontend** -- jQuery, jQuery UI, FancyBox, Blueprint CSS
- **Error Tracking** -- Hoptoad (Airbrake)
- **CAPTCHA** -- reCAPTCHA
- **Soft Deletes** -- acts_as_paranoid
- **Observers** -- ActiveRecord observers for user, listing, order, and SMS
  lifecycle events
