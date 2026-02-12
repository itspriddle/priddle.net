---
title: Pressed Bundles
company: Pressed, LLC
role: Lead Developer
period: Jul 2015
date: 2015-07-01
tags:
  - Ruby
  - Rails
  - PHP
  - WordPress
  - WP-CLI
  - Capybara
  - Sidekiq
project_type: work
tier: 3
excerpt: >-
  Automated WordPress theme bundling system — the original version of what
  became Bender Builds and Author Managed Designs after the Envato acquisition.
---

Pressed Bundles let customers order managed WordPress hosting with a
pre-installed, pre-configured theme — a fully functional website ready to
customize instead of a blank WordPress installation. I was the lead developer
responsible for automating the installation of several dozen WordPress themes,
which required building custom WP-CLI plugins for themes that didn't support
standard installation flows.

The bundling process used Capybara to drive a headless browser through the
WordPress installation, simulating the manual steps a user would take:
activating the theme, installing required plugins, importing demo content, and
configuring settings. Each theme had its own quirks — some needed specific
plugin activation order, others required demo content imports that only worked
through the WordPress admin UI. I wrote custom WP-CLI commands to handle the
cases that couldn't be automated through the browser.

I also led the integration into the Rails billing system ([Helix](/work/wwwh/helix/)),
including the customer order UI where users selected themes, the backend
provisioning pipeline that triggered bundle installation after payment, and
the record-keeping that tracked which bundle was installed on which site.

This concept — pre-built WordPress site packages — carried through the
entire WWWH→Pressed→Envato arc. It evolved into
[Bender Builds](/work/envato/bender-builds/) (more automated, CI-driven) and then
[Author Managed Designs](/work/envato/author-managed-designs/) (self-service for theme
authors).
