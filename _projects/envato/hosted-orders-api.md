---
title: Hosted Orders API
company: Envato Pty Ltd.
role: Senior Developer
period: Jun 2018
date: 2018-06-01
tags:
  - Ruby
  - Rails
  - React
  - API
  - Billing
  - Braintree
project_type: work
tier: 3
excerpt: >-
  Rails checkout application with a React frontend, replacing the monolith's
  order flow for Envato Hosted with Braintree payment processing.
---

The Hosted Orders API is a Rails 5.2 application with a React frontend that
provides the checkout experience for Envato Hosted, extracted from the
[Helix](/work/wwwh/helix/) monolith into a standalone service. It handles the
complete order flow — product selection, coupon validation, Braintree payment
processing, and order status tracking — deployed to Heroku.

I designed the API layer and oversaw its release. The main technical work
involved building the API proxy endpoints that communicated with Helix for
order data (orderables, coupons, order submission, status), managing the
helix-api-client gem that abstracted that communication, and refactoring the
API payload structure as the system evolved. The extraction gave the checkout
flow its own deployment lifecycle, separating it from the larger billing
system's release cadence.
