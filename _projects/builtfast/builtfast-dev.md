---
title: BuiltFast Developer Portal
company: BuiltFast, LLC
period: 2025-Present
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
---

The BuiltFast Developer Portal is a documentation hub, API reference, blog, and
open source showcase built with Jekyll and Tailwind CSS 4. After 28 years of
building websites - starting as a teenager in the Fireworks/Macromedia days -
this is the first one where I look at it and genuinely wonder how it came from
me. Finishing the API docs on my birthday felt like shipping something actually
special for once.

## What it does

The portal serves as the public-facing technical presence for BuiltFast:

- Comprehensive API documentation for Vector Pro (serverless WordPress hosting)
- Technical blog with articles on Laravel, DevOps, and development practices
- Open source project showcase with GitHub integration
- Product documentation with structured navigation
- Team page and company information

The site runs on GitHub Pages with automated deployments, maintaining our
developer-focused brand while keeping operational costs minimal.

## Finally escaping the template look

I started in frontend - Fireworks mockups, slicing images, table layouts - but
struggled with it and gravitated toward backend development in college. Then
came Bootstrap, which was a godsend for people like me. You could finally
deliver *clean* UI without being a designer. But it was always immediately
obvious. Every Bootstrap site had that Bootstrap look, and everyone knew it.

Tailwind changed the game by giving you utility classes without prescribing
components. But the challenge remained: how do you make something that doesn't
scream "I used a CSS framework" to anyone who's seen a few websites?

This project was built entirely with Claude's help, iterating on the design
until it felt distinctive. Tech-savvy insiders might recognize Tailwind under
the hood, but the average person - even technical non-developers - won't look
at it and think "oh, that's the same theme as every other site." That's the bar
I was trying to clear, and I think it clears it.

**Dark-first approach**: The entire design system starts from dark mode, with
light mode as an override. This feels more natural for developer tools and
reduces the jarring experience of theme-switching.

**Terminal aesthetic**: JetBrains Mono as the primary font, subtle dot-grid
backgrounds, terminal-style cards that stay dark regardless of theme, and an
overall feel that belongs in a developer's workflow.

**Restraint over flash**: Two accent colors (cyan and orange), minimal
animations, and letting content breathe. The hero text scramble effect is the
flashiest element - a cycling animation between "Developers.", "Speed.", and
"Service." that uses character-by-character transitions.

## Technical implementation

The CSS architecture uses Tailwind 4's `@theme` layer for design tokens combined
with CSS custom properties for theme-aware colors:

```css
@theme {
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --color-cyan: #1dc9d8;
  --color-orange: #ff6542;
}

:root {
  --bg-base: #0a0f14;
  --text-primary: #f1f5f9;
  --border-subtle: rgba(255, 255, 255, 0.05);
}

.light {
  --bg-base: #fafafa;
  --text-primary: #0f172a;
  --border-subtle: rgba(0, 0, 0, 0.06);
}
```

This pattern allows components like `.text-primary` and `.bg-base` to
automatically adapt to the current theme without conditional classes.

## API documentation done right

We've all suffered through bad API docs. The ones where you spend more time
reverse-engineering the actual behavior than building your integration. The
outdated examples that don't match the current API. The missing error responses.
The "just look at the code" non-documentation. Somehow worse than no docs at
all, because at least with no docs you know you're on your own.

I was determined not to ship that. The API documentation for Vector Pro
represents an obsessive level of attention to both the content and the
presentation.

**Content quality**: Every endpoint has accurate parameter descriptions, proper
typing, realistic examples, and documented error responses. The docs stay
current because they're generated from the actual Laravel codebase using Scribe,
then automatically synced via cross-repository GitHub Actions whenever the API
changes.

**Presentation**: A custom Jekyll plugin transforms Scribe's YAML output into
something actually usable:

- Configurable endpoint group ordering (most important endpoints first)
- Code examples in three formats: curl, PHP SDK, and JavaScript SDK
- Proper URL parameter substitution and query string building
- Syntax-highlighted JSON responses
- Collapsible sections that don't overwhelm

The goal was documentation that developers actually want to use. Where finding
what you need takes seconds, not minutes. Where the examples actually work when
you copy-paste them. Where you trust the docs because they've never been wrong
before.

## Accessibility

Building with Claude pushed me to include accessibility features I might have
overlooked:

- Skip links for keyboard navigation
- Proper focus-visible states with cyan outlines
- ARIA labels on icon-only links
- Reduced motion preferences respected throughout
- Mobile-friendly 44px minimum touch targets
- Semantic HTML structure with proper heading hierarchy

## Key components

**Blog posts** include a reading progress bar, automatic table of contents with
scroll-spy highlighting, author attribution with social links, share buttons for
Twitter/Bluesky/LinkedIn, and previous/next navigation.

**Open source pages** display language badges, GitHub links, tag taxonomies, and
related project suggestions.

**Documentation** uses a collapsible sidebar with category grouping and active
page highlighting.

**Theme toggle** is a compact pill with sun/moon icons that persists preference
to localStorage and respects system preference as the default.

## The easter egg

Hidden behind the Konami code is Vector Overdrive - a full space shooter where
you defend BuiltFast's lambdas from invading space cats.

This started as "wouldn't it be funny if..." and spiraled into 2,100 lines of
JavaScript with:

- Boot sequence with terminal-style initialization messages
- Story intro explaining how someone left the airlock open (again) and now cats
  are "triggering cold starts and batting at environment variables like yarn"
- CRT effects: scanlines, vignette, screen shake on damage
- Chiptune sound effects via Web Audio API - including a Metroid-style
  atmospheric title theme and a deliberately cheesy victory fanfare
- Ten waves of increasingly aggressive space cats with whiskers, ears, and tails
- Powerups, spread shots, shield regeneration between waves
- Mobile touch controls
- Auto-pause when you tab away (because we're not monsters)

The victory screen reads: "Brought to you by BuiltFast. If we care this much
about an easter egg, imagine how much we care about your uptime."

It's completely unnecessary. It adds nothing to the documentation's utility.
And it's my favorite part of the entire site.

## Build system

- **Jekyll 4.4** for static generation
- **Tailwind CSS 4** with the jekyll-tailwind plugin
- **Alpine.js** for interactive components (mobile nav, theme toggle, TOC)
- **GitHub Pages** for hosting with automatic deploys on push
- **Custom plugins** for API doc generation and Obsidian-style callouts

## Personal role

This was a solo project with Claude as a collaborator:

- Established the visual direction and iterated until it felt right
- Built all layouts, components, and custom CSS
- Created the API documentation plugin and automation pipeline
- Wrote the blog content and documentation
- Set up the GitHub Pages deployment and CI/CD

After decades of shipping sites I was merely satisfied with, this one I'm
actually proud of. The design feels like mine, not like a template I
customized. The API docs are the kind I wish every API had. And for the first
time, I'm not embarrassed to show a frontend person what I built.
