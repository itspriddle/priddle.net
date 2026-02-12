---
title: BuiltFast Developer Portal
company: BuiltFast, LLC
role: Solo Developer / Designer
period: Jun 2025 - Present
date: 2025-06-01
tags:
  - Jekyll
  - Tailwind CSS
  - Alpine.js
  - GitHub Actions
  - API Documentation
  - Static Site
  - Design
project_type: work
tier: 1
excerpt: >-
  Documentation hub, API reference, blog, and open source showcase for BuiltFast
  — the first site I've built in 28 years where the design actually feels like mine.
---

The BuiltFast Developer Portal is a documentation hub, API reference, blog, and
open source showcase built with Jekyll and Tailwind CSS 4. After 28 years of
building websites — starting as a teenager in the Fireworks/Macromedia days —
this is the first one where I look at it and genuinely wonder how it came from
me. Finishing the API docs on my birthday felt like shipping something actually
special for once.

The portal serves as the public-facing technical presence for BuiltFast:
comprehensive API documentation for Vector Pro (serverless WordPress hosting), a
technical blog, an open source project showcase with GitHub integration, product
documentation, and team information. It runs on GitHub Pages with automated
deployments.

## Problem Solved

I started in frontend — Fireworks mockups, slicing images, table layouts — but
struggled with it and gravitated toward backend development in college. Then
came Bootstrap, which was a godsend for people like me. You could finally
deliver *clean* UI without being a designer. But it was always immediately
obvious. Every Bootstrap site had that Bootstrap look, and everyone knew it.

Tailwind changed the game by giving you utility classes without prescribing
components. But the challenge remained: how do you make something that doesn't
scream "I used a CSS framework" to anyone who's seen a few websites?

This project was built entirely with Claude's help, iterating on the design
until it felt distinctive. Tech-savvy insiders might recognize Tailwind under
the hood, but the average person — even technical non-developers — won't look
at it and think "oh, that's the same theme as every other site." That's the bar
I was trying to clear, and I think it clears it.

## Architecture

**Dark-first design system**: The entire visual language starts from dark mode,
with light mode as an override. The CSS architecture uses Tailwind 4's `@theme`
layer for design tokens combined with CSS custom properties for theme-aware
colors, so components automatically adapt without conditional classes.

**Terminal aesthetic**: JetBrains Mono as the primary font, subtle dot-grid
backgrounds, terminal-style cards that stay dark regardless of theme, and an
overall feel that belongs in a developer's workflow. Two accent colors (cyan and
orange), minimal animations, and letting content breathe.

### API Documentation Pipeline

The API docs were the most technically demanding piece. They're generated from
the actual Laravel codebase using Scribe, then automatically synced via
cross-repository GitHub Actions whenever the API changes. A custom Jekyll plugin
transforms Scribe's YAML output into a usable reference with configurable
endpoint group ordering, code examples in curl/PHP SDK/JavaScript SDK formats,
proper URL parameter substitution, syntax-highlighted JSON responses, and
collapsible sections.

Every endpoint has accurate parameter descriptions, proper typing, realistic
examples, and documented error responses. The goal was documentation that
developers actually want to use — where the examples actually work when you
copy-paste them.

### Key Components

**Blog posts** include a reading progress bar, automatic table of contents with
scroll-spy highlighting, author attribution, share buttons, and
previous/next navigation.

**Documentation** uses a collapsible sidebar with category grouping and active
page highlighting.

**Accessibility**: Skip links, proper focus-visible states, ARIA labels on
icon-only links, reduced motion support, 44px minimum touch targets, and
semantic heading hierarchy.

### The Easter Egg

Hidden behind the Konami code is Vector Overdrive — a full space shooter where
you defend BuiltFast's lambdas from invading space cats. This started as
"wouldn't it be funny if..." and spiraled into 2,100 lines of JavaScript with
CRT effects, chiptune sound via Web Audio API, ten waves of increasingly
aggressive space cats, powerups, and mobile touch controls.

The victory screen reads: "Brought to you by BuiltFast. If we care this much
about an easter egg, imagine how much we care about your uptime."

It's completely unnecessary. It adds nothing to the documentation's utility.
And it's my favorite part of the entire site.

## Impact

After decades of shipping sites I was merely satisfied with, this one I'm
actually proud of. The design feels like mine, not like a template I
customized. The API docs are the kind I wish every API had. And for the first
time, I'm not embarrassed to show a frontend person what I built.
