---
title: Bender Builds
company: Envato Pty Ltd.
role: Senior Developer
period: Jul 2017 - Apr 2018
date: 2017-09-01
tags:
  - Ruby
  - Rails
  - Capybara
  - CircleCI
  - WordPress
  - WP-CLI
  - Sidekiq
project_type: work
tier: 3
excerpt: >-
  Automated WordPress theme bundling system for Envato Hosted, packaging themes
  and their dependencies into near-instant site setups for new customers.
---

Bender Builds automated the installation of WordPress themes and plugins for
Envato Hosted customers. The system let administrators bundle themes with their
dependencies, providing near-instant website setup instead of a manual
installation process. On the backend, Capybara drove a headless Chrome browser
to simulate a full WordPress installation — installing plugins, configuring
settings, and capturing screenshots — then packaged the result into deployable
archives.

I worked on a large portion of the backend bundling system and integrated it
into the [Hosted billing system (Helix)](/work/wwwh/helix/). This included adding
support for multiple Envato-branded themes (Brooklyn, TheBuilt, Liber, Designr),
implementing the Helix callback system so builds could report status back to the
billing platform, and improving the screenshot pipeline. The build process ran
on CircleCI, with results fed back to Helix for coordination.

Bender was part of the broader [Pressed Bundles](/work/pressed/pressed-bundles/) lineage
— the concept of pre-built WordPress site packages that carried through from
Pressed into the Envato acquisition, where it became a key part of the managed
WordPress hosting offering.
