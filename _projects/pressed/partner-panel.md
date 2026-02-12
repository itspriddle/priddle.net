---
title: Partner Panel
company: Pressed, LLC
role: Lead Developer
period: Sep 2015
date: 2015-09-01
tags:
  - Ruby
  - Rails
  - JavaScript
  - CoffeeScript
  - Sidekiq
project_type: work
tier: 3
excerpt: >-
  White-label management dashboard for Pressed's hosting partners, with
  role-based access to customer data, reports, and troubleshooting tools.
---

The Partner Panel was the management dashboard for brands reselling Pressed's
managed WordPress hosting. Each partner — hosting companies selling Pressed
under their own brand — needed visibility into their customers, sales data,
and troubleshooting tools without seeing other partners' data or having access
to internal-only features.

I was a lead developer and helped ship the initial version. The core challenge
was a flexible permission system: different partners needed different levels of
access depending on their relationship with Pressed. Some could view customer
billing details, others couldn't. Some had access to provisioning
troubleshooting tools, others only saw reports. The permission model was
role-based and configurable per partner, built within the Rails billing system
([Helix](/work/wwwh/helix/)) alongside customer-facing reporting that pulled from
the same data used by internal operations.
