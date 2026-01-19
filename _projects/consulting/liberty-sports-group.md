---
title:   Liberty Sports Group Website
company: Liberty Sports Group, LLC
period:  Apr 2011
date:    2011-04-01
tags:
  - Consulting
  - PHP
  - WordPress
  - Capistrano
  - jQuery
project_type: work
---

I worked with [Allusis Productions](http://allusis.net) to build a custom
WordPress 3.1 site for Liberty Sports Group, a local athletic organization.

I developed a custom WordPress theme with multiple page templates for the
homepage, contact form, event archives, registration, and a "Liberty Tour"
section. The theme's `functions.php` used a class-based architecture to pull
posts from specific categories for recent news, featured photos, and upcoming
events. Custom page templates and a view-based partial system kept the
templates organized.

I wrote two custom plugins. The first was an admin customization plugin that
cleaned up the WordPress backend for the client. The second handled the site's
contact and registration forms, processing submissions and sending
notification emails to the site owners.

The frontend was built with jQuery and several plugins including jQuery UI,
LavaLamp for navigation effects, Cycle Lite for image carousels, jCarousel,
and Validation Engine for form validation.

I set up deployment using Capistrano with multistage support for staging and
production environments. The deploy process used Git with remote caching,
symlinked environment-specific `wp-config.php` files and an uploads directory
from a shared path, and supported instant rollbacks. The workflow was: develop
locally, deploy to staging for review, then merge and deploy to production.
