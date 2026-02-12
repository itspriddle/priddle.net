---
title: MWP Lazy Upgrader
company: Pressed, LLC
role: Senior Developer
period: Dec 2016
date: 2016-12-19
tags:
  - PHP
  - WordPress
  - Bash
  - WP-CLI
project_type: work
tier: 2
excerpt: >-
  WordPress plugin that cut plugin upgrade times on network filesystems from
  over 2 minutes to 30 seconds using symlinks and deferred background writes.
---

MWP Lazy Upgrader is a custom WordPress plugin that improves performance for
theme and plugin upgrades on a network filesystem. On network filesystems,
these operations are slow and can timeout for users in WP Admin. Lazy Upgrader
works around these limitations by deferring filesystem writes to a background
job and using symbolic links to install themes and plugins instantly once
source files are available over the network.

## Background

At Pressed I was approached with a unique and challenging problem: speeding up
WordPress plugin upgrades on a new version of our hosting platform.

This turned out to be one of the most challenging features I've shipped in my
career. Before I started, I knew virtually nothing about how WordPress
upgrades plugins. I had no idea _how_ I would go about fixing things, or if I
even could.  It took _a lot_ of trial an error, but I was eventually able to
identify the slow parts of the process and significantly improve overall
upgrade speed. It took approximately 8 weeks, on and off, from the time I was
asked to look into this until it was shipped.

WordPress stores all user files (plugins, themes, image uploads) under a
publicly accessible directory named `wp-content/`. Some plugins include
thousands of files. Upgrading a plugin involves a lot of reading and writing
to disk, and the number of operations increases with each file. This isn't
normally much of an issue and upgrades still happen reasonably fast.

On our new platform, the `wp-content/` directory is on a network filesystem.
This offers a lot of flexibility for scaling and redundancy, but it comes at a
cost. Reading and writing files can be especially slow compared to traditional
hardware. The hosting platform has extensive caching, so performance isn't
lost in most cases. Except one: the disk intensive task of upgrading a plugin.

LazyUpgrader is a Must-Use plugin that alters the behavior of the WordPress
upgrader to work more efficiently on a network filesystem.

It works by hooking into the way WordPress loads its filesystem class,
`WP_Filesystem_Direct`. Any file operations (like PHP's `rename()`, `copy()`,
and friends) performed by WordPress core uses this class. LazyUpgrader
overwrites some methods on this class to change their behavior for usage on
our platform.

The normal upgrade process looks something like this:

- WordPress clears any content in `wp-content/upgrade/` so it has a totally
  clean slate.
- WordPress downloads the new plugin and unzips it to
  `wp-content/upgrade/pluginname-XXXXX` (XXXXX are random characters).
- For each file and directory in the unzipped plugin, WordPress checks if the
  destination path can be written to. Eg:
  `wp-content/upgrade/pluginname-XXXXX/functions.php` checks for the presence
  of a writable `wp-content/plugins/pluginname/` directory, and the presence
  of a writable `wp-content/plugins/pluginname/functions.php` file.
- If all checks pass, WordPress deletes the currently installed plugin at
  `wp-content/plugins/pluginname/`.
- WordPress copies each file from the unzipped plugin creating any directories
  necessary along the way. Eg: `mkdir wp-content/plugins/pluginname/lib; cp
  wp-content/upgrade/pluginname-XXXXX/lib/plugin.php
  wp-content/plugins/pluginname/lib/plugin.php`.
- The plugin upgrade is finished. If the user is using the bulk upgrader, the
  next plugin is upgraded.

Most of these actions are disk intensive and slow on a network filesystem.
LazyUpgrader optimizes these in two main ways:

1. The use of additional directories that reside on the local filesystem and
   the network filesystem. Files are moved or symlinked here to short circuit
   parts of the normal upgrade process.
    - `wp-content/upgrade/` is a symlink to something like `/tmp/user/.upgrade`
    - `wp-content/.upgrade-moving` is a symlink to `/tmp/user/.upgrade-moving`
    - `wp-content/plugins/.trash` is a symlink to `/tmp/user/.trash`
    - `wp-content/plugins/.moving` is a regular directory on the network filesystem
2. After the user thinks the upgrade process is complete, cleanup happens in
   the background that replaces symlinks with their real versions and deletes
   old files

The new "lazy" upgrade process with LazyUpragder looks like this:

- WordPress clears any content in `wp-content/upgrade/` so it has a totally
  clean slate. **LazyUpgrader makes sure this directory is empty by the time
  WordPress tries to clean it, so it is essentially a no-op.**
- WordPress downloads the new plugin and unzips it to
  `wp-content/upgrade/pluginname-XXXXX`. **This is already as fast as it can
  be without resorting to hacking WordPress core or PHP itself.**
- When WordPress attempts to check that each file/directory in the unzipped
  plugin can be written to the destination path, LazyUpgrader interrupts the
  process before any checks are performed. **LazyUpgrader instead moves the
  unzipped plugin from `wp-content/upgrade/pluginname-XXXXX` to
  `wp-content/.upgrade-moving/`.**
- When WordPress tries to delete the currently installed plugin, LazyUpgrader
  intercepts the process. **LazyUpgrader instead moves the plugin to
  `wp-content/plugins/.trash` to be deleted later**
- When WordPress tries to copy each file from the unzipped plugin,
  LazyUpgrader intercepts the process. **LazyUpgrader instead symlinks the
  files from `wp-content/.upgrade-moving/pluginname-XXXXX` to their
  destination at `wp-content/plugins/pluginname/`.**
- The _user_ thinks the plugin upgrade is finished and sees a success message
  inside WP Admin. **LazyUpgrader kicks off a background job via WP AJAX that
  replaces the symlinked files with real files and deletes all files that are
  no longer necessary.**

In benchmarks I ran on popular plugins with 1000+ files, a normal upgrade on
the network filesystem took over 2 minutes to finish. With LazyUpgrader the,
the user perceives that upgrade as finishing in 30 seconds.

LazyUpgrader is definitely a hack. Like the best hacks though, it solved the
problem as quickly as possible. It is currently in production and working
reliably for thousands of WordPress sites and will serve as a nice stop gap
until a more robust solution is necessary.
