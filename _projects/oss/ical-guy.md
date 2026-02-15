---
title:  ical-guy
period: Feb 2026
date:   2026-02-15
github: https://github.com/itspriddle/ical-guy
tags:
  - CLI
  - EventKit
  - macOS
  - Swift
project_type: oss
category: cli
excerpt: |
  ical-guy is a Swift CLI for querying macOS calendar events. It's a modern
  replacement for the long-unmaintained
  [icalBuddy](https://hasseg.org/icalBuddy/).
---

For years, [icalBuddy](https://hasseg.org/icalBuddy/) was the go-to tool for
accessing macOS calendar data from the command line. The original hasn't been
updated since 2014; [a fork by Ali Rantakari][icalbuddy-fork] kept it alive
for a while, but it too eventually stopped working reliably on modern macOS. I
finally wrote my own replacement.

## Why not just use icalBuddy?

Before building `ical-guy`, I spent a lot of time trying to make icalBuddy
work for automation. At one job I had a pipeline of scripts that generated
weekly Obsidian notes with meeting agendas pulled from Apple Calendar.
icalBuddy only outputs unstructured text, so I wrote a 400+ line bash wrapper
that called it with custom field separators, parsed the output with string
manipulation and jq, and produced JSON. A separate Ruby script consumed that
JSON to build Markdown agendas with free time detection, ERB templates, and
an extensible filter system. There was even an AppleScript bridge to get week
numbers from NSCalendar so they'd match what Calendar.app displayed.

It worked, but it was fragile. Every macOS update risked breaking icalBuddy,
and the whole Rube Goldberg chain existed because there was no way to get
structured calendar data from the command line. That's the problem `ical-guy`
solves.

## Features

`ical-guy` talks directly to macOS via EventKit and supports everything you'd
want from a calendar CLI: flexible date filtering (ISO 8601 or relative dates
like `today+7`), calendar inclusion/exclusion, and both human-readable text
and JSON output. It auto-detects whether you're in a terminal or piping to
another tool and picks the right format.

## Meetings

The feature I use most is the `meeting` subcommand. It detects video
conference URLs in your events --- Google Meet, Zoom, Teams, and WebEx --- by
searching the event URL, location, and notes fields. From there:

- `ical-guy meeting now` shows your current meeting with time remaining
- `ical-guy meeting next` shows the next upcoming meeting
- `ical-guy meeting open` opens the meeting URL directly in your browser
- `ical-guy meeting list` lists today's meetings with their URLs

## Configuration

An optional TOML config file at `~/.config/ical-guy/config.toml` lets you set
defaults for output format, calendar filtering, and display options. CLI flags
override anything in the config.

## Installation

Available via Homebrew:

```
brew install itspriddle/brews/ical-guy
```

[icalbuddy-fork]: https://github.com/ali-rantakari/icalBuddy
