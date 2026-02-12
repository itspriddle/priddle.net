---
title: Website.me
company: World Wide Web Hosting, LLC
role: Project Lead
period: 2014
date: 2014-04-01
tags:
  - Ruby
  - Rails
  - Rack
  - PostgreSQL
  - CoffeeScript
  - jQuery
  - SCSS
project_type: work
tier: 3
excerpt: >-
  Consumer-facing hosting brand built as a white-label instance of Helix,
  providing single sign-on access to cPanel and WordPress through a custom
  Rack proxy middleware.
---

Website.me was a free consumer-facing hosting brand from World Wide Web
Hosting. Rather than a standalone application, it was built as a white-label
brand within [Helix](/work/wwwh/helix/) --- WWWH's internal billing and
hosting platform. Customers signed up through Website.me's order form and
managed their cPanel and WordPress sites through a single sign-on dashboard
without ever leaving the Website.me interface.

The core technology was a Rack proxy middleware in Helix that gave customers
transparent access to their backend services. We had a prior implementation
in [Synco](/work/wwwh/synco/) that served as a starting point, but
rebuilding it as general-purpose Rack middleware for Helix was a different
problem. The middleware intercepted requests on specially-formatted subdomains
(`proxy-<resource><id>-<type>.website.me`), authenticated the user via
session, resolved the target service, and forwarded the HTTP request to the
actual cPanel or WordPress backend server.

The real challenge was making the proxied experience seamless. Response bodies
had to be rewritten on the fly --- URLs, cookies, JavaScript, and navigation
all needed to resolve within the proxy domain rather than the origin server.
WordPress was especially painful: its URLs are deeply embedded in page
content, admin JavaScript, and AJAX responses, and getting all of that to
work reliably through a rewriting proxy took significant iteration. The
middleware also handled SSL termination, gzip/deflate decompression, chunked
streaming, and cookie forwarding.

I was the project lead and worked closely with Justin Mazzi on the early
implementation. The brand was eventually retired, and the proxy code was
later removed from Helix entirely as the platform shifted toward managed
WordPress hosting.
