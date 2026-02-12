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

- **Sprint Reports** - Generate detailed breakdowns with issue categorization
  (completed, punted, mid-sprint additions, blocked work)
- **Velocity Tracking** - Calculate rolling averages across configurable sprint
  ranges with developer count normalization
- **KPI Metrics** - Points committed vs completed, work days remaining, team
  capacity analysis
- **Multi-Format Output** - Table (terminal), Markdown, HTML, and JSON for
  different audiences and integrations
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
