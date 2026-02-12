---
title: On-Call Holiday Notifier
company: Envato Pty Ltd.
role: Solo Developer
period: Oct 2018 - Jun 2019
date: 2018-10-01
tags:
  - Ruby
  - AWS Lambda
  - PagerDuty
  - Slack
  - BambooHR
project_type: work
tier: 3
excerpt: >-
  AWS Lambda function that alerts on-call teams when scheduled responders have
  PTO or company holidays, preventing coverage gaps.
---

The On-Call Holiday Notifier is a Ruby AWS Lambda function I built from scratch
to prevent a simple but costly problem: on-call engineers getting paged during
their paid time off, or worse, nobody realizing the on-call schedule had a gap
during a holiday.

The function runs on a schedule and cross-references three data sources:
PagerDuty for the current on-call roster, BambooHR for employee PTO and
location data, and iCalendar feeds for region-specific company holidays (Envato
has offices across multiple countries). When a conflict is detected — an
on-caller scheduled during their PTO or a regional holiday — it sends a
structured alert to the `#customer-on-call` Slack channel so the team can
arrange coverage.

I built the entire project: gem scaffolding, all API integrations (PagerDuty,
BambooHR, Slack, iCalendar parsing), the Lambda handler, comprehensive test
coverage with Timecop for time-dependent behavior, and the Buildkite CI
pipeline. A similar concept to [SOS Bot](/work/a2hosting/sos-bot/) at A2 Hosting years
later — small automation that prevents real operational gaps.
