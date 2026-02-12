---
title: A2 Background Jobs
company: A2 Hosting, Inc
role: Senior Developer
period: Jan 2020
date: 2020-01-01
tags:
  - PHP
  - MySQL
  - WHMCS
project_type: work
tier: 2
excerpt: >-
  Custom WHMCS addon module providing a database-backed job queue for
  long-running tasks like reports and bulk operations.
---

A2 Background Jobs is a custom WHMCS addon module I designed and built because I
missed having queues. Coming from Rails where delayed_job and friends made
background processing trivial, WHMCS had nothing comparable — long-running
reports and bulk operations either ran inline during web requests or got hacked
into cron scripts with no retry logic, no error tracking, and no visibility. I
decided a basic FIFO queue like the old delayed_job would cover 90% of the use
cases, and built it for WHMCS 7.9. After proving it out, I migrated several
existing reports and helped other developers adopt it across their own code.

## Architecture

The module implements a lightweight database-backed job queue using WHMCS's
built-in Eloquent ORM. Jobs are stored in a MySQL table with columns tracking
class name, serialized arguments, lock state, error messages, and retry count.
A CLI cron runner processes the queue every 5 minutes in FIFO order.

The system is built around four components: the addon module (handles schema
creation and cleanup), a queue class (manages the full job lifecycle), a cron
runner (CLI script that bootstraps WHMCS and processes jobs), and worker classes
(any class with a `perform()` method). Adding a new background job means writing
a worker class and calling `add_job()` with the class name, retry count, and
arguments.

Job state is derived from column values — queued jobs have no lock or failure
timestamp, processing jobs are locked, and failed jobs have a failure timestamp.
This avoids a separate status column and makes the queue query trivial.

## Key Contributions

**Retry logic with implicit backoff**: Failed jobs are unlocked for the next
cron run, giving automatic 5-minute spacing between attempts. After exhausting
retries, jobs are marked permanently failed with the error message preserved for
debugging.

**Job locking**: The entire batch is locked before processing to prevent
concurrent cron runs from picking up the same jobs.

**PHPUnit test suite**: Tests run against an in-memory SQLite database, covering
job creation, successful processing, and retry/failure behavior — unusual for
WHMCS addon modules, which are notoriously difficult to test.
