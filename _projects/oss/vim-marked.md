---
title:  vim-marked
period: Feb 2012
date:   2012-02-01
github: https://github.com/itspriddle/vim-marked
tags:
  - AppleScript
  - Git
  - Markdown
  - Vim Plugin
project_type: oss
category: vim
excerpt: |
  vim-marked is a tiny plugin I made to integrate Vim and
  [Marked.app](http://marked2app.com/). It allows you to open the current
  Markdown buffer in Marked from within Vim.
---

Open the current Markdown buffer in [Marked](http://markedapp.com/). Supports
Marked 1 and 2.

**Note**: Since Marked is available only for OS X, this plugin will not be loaded
unless you are on OS X.

## Configuration

By default, this plugin is configured to use Marked 2. If you are still using
Marked version 1, set the following in your `~/.vimrc`:

    let g:marked_app = "Marked"

If you need to enable the plugin for custom Vim FileTypes:

    let g:marked_filetypes = ["markdown", "mkd", "ghmarkdown", "vimwiki"]

## Usage

This plugin adds the following commands to Markdown buffers:

    :MarkedOpen[!]          Open the current Markdown buffer in Marked. Call with
                            a bang to prevent Marked from stealing focus from Vim.
                            Documents opened in Marked are tracked and closed
                            automatically when you quit Vim.

    :MarkedQuit             Close the current Markdown buffer in Marked. Quits
                            Marked if there are no other documents open.

    :MarkedToggle[!]        If the current Markdown buffer is already open in
                            Marked, calls :MarkedQuit. If not, calls
                            :MarkedOpen[!].

## License

Same as Vim itself, see `:help license`.
