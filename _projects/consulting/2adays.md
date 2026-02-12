---
title: 2adays.com
company: 2aDays, LLC
role: Contract Developer
period: Dec 2016
date: 2016-12-01
tags:
  - Ruby
  - Rails
  - MySQL
  - Redis
  - Recurly
  - Sidekiq
project_type: work
tier: 2
excerpt: >-
  Coach rating platform for college recruiting — built and shipped a full
  Rails application in 6 weeks working nights and weekends, designed for
  clean handoff.
---

I developed the Rails application for 2adays.com, a website that helps student
athletes through the college recruiting process. My work involved replacing an
existing coach and school search directory with a fully custom one. The Rails
application is responsible for pulling information from a third party API for
coaches and schools, and formatting the date for use in student searches and
ratings. Recently, I implemented a new recurring subscription service.

## Background

> 2adays.com is a website that helps student athletes through the
> college recruiting process. Current college-level athletes are able to rate
> their coaches through a survey-based system. These surveys are tabulated and
> ratings are generated for each coach. High school athletes and their parents
> are able to search these coaches and surveys so that they can make better
> choices as they enter the college athletic world.

2aDays approached me in late 2016 to build a replacement for their directory
service using Rails. This application would be handed off to another developer
for long term maintenance. [Best practices][12factor] were a deliverable.

This application best represents the work I do. My contact at 2aDays gave me
loose guidelines and expectations and left me to do my best work. A little of
everything I do with Rails went into this one:

- Front end design with Bootstrap, SCSS, a splash of CoffeeScript, and good
  old `.html.erb`.
- A healthy dose of ActiveRecord.
- I18n. Totally worth it, even for just one language.
- Mirroring data from an (often quirky) "REST" API.
- Thorough testing. But not too much, you know?
- Server setup with Vagrant.
- Documentation. I made sure the next developer would know how to get around.
- I was able to ship the app in 6 weeks working nights and weekends. The
  2aDays team was very happy with the final result, and the developer that
  took over maintenance has done so with ease.

## Technical Overview

### Architecture

The app is a coach and school rating platform for 2adays.com. Athletes rate
college coaches through SurveyGizmo surveys,
and the results are displayed alongside coach/school profiles imported from the
Collegiate Directories API.

**Data pipeline:**

1. Rake tasks import sports, coaches, schools, conferences, and divisions from
   the Collegiate Directories API using a base importer class with a template
   pattern. Each import logs structured status (skip/update/create) and runs
   transactionally.
2. SurveyGizmo posts completed rating surveys to a webhook endpoint
   (`POST /ratings`). Each rating includes 7 trait scores (Accessible, Cool,
   Direct, Honest, Intense, Knowledgable, Motivational) on a 0-5 scale plus
   free-text comments, stored as serialized JSON.
3. A blog feed is scraped from a WordPress site via Nokogiri and cached hourly.

**Key models and relationships:**

- `Coach` → has many `Profile` records (one per sport/school combination)
- `Profile` → belongs to `Coach`, `School`, `Sport`, `Conference`, `Division`;
  has many `Rating` records
- `Rating` → stores serialized JSON data with trait scores and comments;
  calculates an overall score on save via `before_validation` callback
- `Profile` uses a status state machine (enabled → pending → disabled) to
  handle coaches that appear/disappear between API imports

**Search:** Custom SQL implementation using `UNION ALL` across coaches and
schools tables, with MySQL `SOUNDS LIKE` for phonetic matching and `LIKE` for
fuzzy matching. Pagination handled with Kaminari against raw
`connection.select_all` results. An "I'm Feeling Lucky" feature auto-redirects
when a search returns a single result.

**Caching strategy:** Redis-backed in production with layered TTLs — API
responses cached indefinitely, blog feed cached for 1 hour, view fragments
cached for coach profiles and the "Best Coaches" homepage widget (top 5 coaches
with a minimum of 5 ratings).

**Avatar system:** Paperclip with model-specific default images, multiple sizes
(64x64 thumb, 300x300 medium), local filesystem storage in development and S3
in production.

**I18n:** Full internationalization support for a single language — used for
sport names, profile titles ("Men's/Women's/Coed {Sport} Coach"), and UI
strings. Worth it for consistent string management and easy future localization.

### Deployment

12-factor app configuration via dotenv. Environment variables for database
(`DATABASE_URL`), Redis (`REDIS_URI`), Collegiate Directories API token, S3
credentials, and SurveyGizmo survey link template. Logs to STDOUT. Scheduled
imports and blog scraping via cron. Vagrant provisioning scripts and thorough
documentation ensured a smooth handoff to the maintenance developer.

[2aDays]: https://www.2adays.com
[12factor]: https://12factor.net/
