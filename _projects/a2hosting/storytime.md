---
title: Storytime
company: A2 Hosting, Inc
role: Director of Development
period: Aug 2024
date: 2024-08-03
tags:
  - Ruby
  - CLI
  - Jira
  - API
project_type: work
tier: 2
excerpt: >-
  Ruby CLI tool to automate JIRA sprint reporting — reduced weekly report
  generation from 15-20 minutes of manual work to seconds.
---

Storytime is a Ruby CLI tool I built to extract, analyze, and report on JIRA
sprint data. It integrates with JIRA's Agile API to fetch board, sprint, and
issue information, then presents data in multiple formats: terminal tables,
Markdown, HTML, and JSON.

## Problem Solved

Weekly sprint reporting was a manual, time-consuming process. Each report
required navigating JIRA's UI, manually calculating velocity, categorizing
issues, and formatting the results for stakeholders. This tool automates the
entire workflow.

## Key Features

- **Sprint Reports** - Generate detailed breakdowns at sprint start, mid-sprint,
  and close — showing how the sprint evolved, not just a final summary. Issues
  are categorized by status (completed, in progress, blocked, punted) with
  per-epic, per-developer, and per-project stat tables
- **Rock Tracking** - Separate tracking for quarterly priority ("rock") stories
  vs regular work, with dedicated commitment, completion, and punt rates. Rocks
  are the backbone of the KPI system — the tool distinguishes rock epics from
  non-rock epics throughout every report section
- **KPI Dashboard** - Three leadership-facing KPIs with traffic-light thresholds
  reported weekly: Rocks Committed (% of sprint devoted to quarterly
  priorities — green at 80%+), Rocks Completed (% of rock points delivered —
  green at 80%+), and Mid-Sprint Damage (% of unplanned non-rock work pulled
  in — green at 0-10%). Each mid-sprint addition requires a justification note
  explaining why it was pulled in
- **Velocity Tracking** - Calculate rolling averages across configurable sprint
  ranges with developer count normalization
- **Visual Reports** - HTML output with embedded Mermaid.js pie charts for rock
  commitment, completion, and mid-sprint damage breakdowns. Also supports
  terminal tables, Markdown, and JSON
- **Board/Sprint Navigation** - List boards, find sprints by ID/name/date, open
  directly in JIRA

## Architecture

The tool follows clean separation of concerns:
- Domain models for JIRA resources (Board, Sprint, Issue, Epic)
- Collection classes with scoping for filtered queries
- Presenter pattern for format-agnostic output rendering
- ERB templates for structured report generation

## Impact

What previously took 15-20 minutes of manual work per sprint now runs in
seconds. The consistent formatting eliminates errors and ensures stakeholders
receive reliable, comparable data week over week. The tool also enabled
backfilling historical sprint data for trend analysis that wasn't previously
feasible.

[View fake reports &rarr;](/vault/storytime/)
