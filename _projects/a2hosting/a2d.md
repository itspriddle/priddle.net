---
title: a2d
company: A2 Hosting, Inc
role: Senior Developer
period: Oct 2019
date: 2019-10-04
tags:
  - Bash
  - PHP
  - CLI
project_type: work
tier: 3
excerpt: >-
  CLI toolkit for A2 Hosting's dev team — reduced environment bootstrap from
  multi-day manual setups to same-day onboarding using a sub/rbenv-inspired
  architecture.
---

a2d is a CLI toolkit for A2 Hosting's software development team, built
primarily in Bash with some PHP utilities. I created this right when I joined
A2 — their local development setup for WHMCS and the marketing site required
cloning another developer's database, hours of manual configuration, and steps
that were different for every machine. Coming from Rails where `script/setup`
automated everything, the situation was painful. So I went on a mission to
automate it all.

Based on [sub][1] and inspired by [rbenv][2]'s architecture, the tool uses a
command dispatcher pattern — `a2d <command> [args]` routes to individual
executable scripts in a `libexec/` directory, with a shared standard library for
error handling, validation, and string utilities. Commands are self-documenting:
the help system extracts usage information directly from structured comments in
each script, so adding a new command requires no changes to any central
registry.

a2d includes around 30 commands spanning environment setup, database
provisioning, configuration generation, and general utilities. Configuration
templates for Nginx, Apache, PHP, and various application-specific settings let
developers spin up local environments that match production. The project
supports both Bash and Zsh with shell completions for all commands.

Design priorities were easy installation (a single `git clone`), minimal
dependencies (pure Bash with no external package managers), and low friction for
contributions (any executable file in `libexec/` becomes a command
automatically). Adoption took time because onboarding happens infrequently, but
it paid off — by 2024, new developers were fully onboarded and working in our
applications within a day.

[1]: https://github.com/qrush/sub
[2]: https://github.com/rbenv/rbenv
