---
title: SOS Bot
company: A2 Hosting, Inc
role: Director of Development
period: Jul 2022
date: 2022-07-15
tags:
  - Ruby
  - Automation
  - PagerDuty
  - Slack
  - Docker
project_type: work
tier: 3
excerpt: >-
  Ruby automation that syncs PagerDuty on-call schedules to Slack user groups,
  so @-mentioning the on-call team always reaches the right people.
---

SOS Bot is a Ruby automation I built to keep PagerDuty on-call schedules in
sync with Slack user groups. Each team at A2 Hosting had a `@sos-team` style
Slack handle used for escalations, but keeping those groups updated as on-call
rotations changed was a manual process that people forgot to do. When someone
@-mentioned the SOS group, the wrong person would get paged.

The bot runs on cron via Docker on an internal server. Each run iterates
through a YAML config that maps PagerDuty schedule names to Slack user group
IDs, with fallback contacts per group (typically managers). For each group, it
queries PagerDuty's API for current on-callers, resolves their email addresses
to Slack user IDs, merges in the fallbacks, and updates the Slack user group
membership. The whole thing is a small Ruby gem with clean separation between
PagerDuty, Slack, and settings modules.

Teams could onboard by adding their PagerDuty schedule and Slack group ID to the
config file — no code changes needed. A small tool, but it solved a real
operational pain point: on-call escalations reliably reach the right person
without anyone having to remember to update a Slack group.
