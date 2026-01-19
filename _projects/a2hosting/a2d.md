---
title:   a2d
company: A2 Hosting, Inc
period:  Oct 2019
date:    2019-10-04
tags:
  - Bash
  - PHP
  - CLI
project_type: work
---

a2d is a CLI toolkit for A2 Hosting's software development team, built
primarily in Bash with some PHP utilities. Based on [sub][1] and inspired by
[rbenv][2]'s architecture, a2d allows new developers to bootstrap their
application environments in hours compared to multi-day manual setups. I
created the initial project, designed the architecture, and wrote several of
the core commands.

The tool uses a command dispatcher pattern --- `a2d <command> [args]` routes to
individual executable scripts in a `libexec/` directory, with a shared standard
library providing common functions like error handling, validation, and string
utilities. Commands are self-documenting: the help system extracts usage
information directly from structured comments in each script, so adding a new
command requires no changes to any central registry.

a2d includes around 30 commands spanning environment setup, database
provisioning, configuration generation, and general utilities. Configuration
templates for Nginx, Apache, PHP, and various application-specific settings
allow developers to spin up local environments that match production. The
project supports both Bash and Zsh with shell completions for all commands.

Design priorities were easy installation (a single `git clone`), minimal
dependencies (pure Bash with no external package managers), and low friction for
contributions (any executable file in `libexec/` becomes a command
automatically).

[1]: https://github.com/qrush/sub
[2]: https://github.com/rbenv/rbenv
