---
title:   A2 Background Jobs
company: A2 Hosting, Inc
period:  Jan 2020
date:    2020-01-01
tags:
  - MySQL
  - PHP
  - WHMCS
  - Background Jobs
project_type: work
---

A2 Background Jobs is a custom WHMCS addon module that allows developers to
queue and execute long-running tasks via cron --- great for reports, bulk
operations, and anything too slow for a web request. I designed and built the
module for WHMCS 7.9, migrated multiple existing reports to use it, and helped
other developers adopt it in their own code.

## Architecture

The module implements a lightweight database-backed job queue using WHMCS's
built-in Eloquent ORM. Jobs are stored in a MySQL table and processed by a CLI
cron runner every 5 minutes. The system supports automatic retries with
configurable attempt counts, job locking to prevent duplicate processing, and
error tracking for failed jobs.

**Components:**

- **Addon module** --- handles installation (schema creation) and
  deactivation (cleanup)
- **Queue class** --- manages job lifecycle: enqueue, lock, process, retry,
  and cleanup
- **Cron runner** --- CLI script invoked by cron that processes the queue
- **Worker classes** --- user-defined classes with a `perform()` method

## Database Schema

The addon creates an `a2_background_jobs` table on activation using Eloquent's
schema builder:

```php
Capsule::schema()->create('a2_background_jobs', function ($table) {
    $table->bigIncrements('id');
    $table->string('class_name', 255);
    $table->text('arguments')->nullable();
    $table->text('error')->nullable();
    $table->dateTime('failed_at')->nullable();
    $table->dateTime('locked_at')->nullable();
    $table->unsignedInteger('retries')->nullable()->default(0);
    $table->timestamp('created_at')->useCurrent();
    $table->index('locked_at');
});
```

Job state is derived from column values:

| State | Condition |
|---|---|
| Queued | `locked_at IS NULL` and `failed_at IS NULL` |
| Processing | `locked_at IS NOT NULL` and `failed_at IS NULL` |
| Failed | `failed_at IS NOT NULL` |

## Creating a Worker

Worker classes need a parameterless constructor and a public `perform()` method.
Arguments passed when enqueuing the job are forwarded to `perform()`:

```php
class MonthlyRevenueReport
{
    public function __construct()
    {
        // setup logging, etc.
    }

    public function perform($start_date, $end_date)
    {
        // Long-running work: query data, generate report, send email, etc.
    }
}
```

## Enqueuing Jobs

Use the `A2BackgroundJobsQueue` class to add a job. Arguments after the retry
count are serialized and passed to the worker's `perform()` method:

```php
$queue = new A2BackgroundJobsQueue;
$queue->add_job(MonthlyRevenueReport::class, 3, '2020-01-01', '2020-01-31');
//                ^-- class name               ^-- retries  ^-- perform() args
```

## Queue Processing

The cron runner is a CLI-only script that bootstraps the WHMCS environment and
processes all queued jobs:

```php
if (php_sapi_name() != 'cli') {
    die("Please run from the command line.\n");
}

$queue = new A2BackgroundJobsQueue;
$queue->process_queue();
```

Processing follows this flow:

1. Fetch all unlocked, non-failed jobs ordered by `created_at ASC` (FIFO)
2. Lock the batch by setting `locked_at` to prevent concurrent processing
3. For each job: instantiate the worker class, unserialize arguments, call
   `perform()`
4. On success: delete the job from the queue
5. On failure: pass to the retry handler

## Error Handling and Retries

The module catches both `\Exception` and `\Error` during job execution. Failed
jobs follow this retry logic:

1. **First failure** --- error message is stored, job is unlocked for the next
   cron run
2. **Subsequent failures** --- retry count is decremented, job is unlocked
   again
3. **Retries exhausted** --- `failed_at` is set, marking the job as
   permanently failed

This gives jobs a configurable number of retry attempts with implicit backoff
via the 5-minute cron interval.

## Testing

The module includes PHPUnit tests that run against an in-memory SQLite
database, covering job creation, successful processing, and retry/failure
behavior.
