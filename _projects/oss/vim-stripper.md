---
title:  vim-stripper
period: Jul 2011
date:   2011-07-14
github: https://github.com/itspriddle/vim-stripper
tags:
  - Bash
  - Git
  - Vim Plugin
project_type: oss
category: vim
excerpt: |
  When I made the switch to Vim, I wanted to strip trailing whitespace when I
  saved a file. I wrote vim-stripper to do just that.
---

## Overview

`stripper.vim` adds the `:Stripper` command, which will strip trailing
whitespace from your files. By default, all files but Markdown and Liquid are
stripped when a buffer is saved. This behavior is configurable. See
`:help stripper` for more info.

While editing a document, you can use the command `:Stripper` to strip
whitespace manually.

Strip all whitespace in the current buffer:

    :Stripper

Strip whitespace on lines 3-5 of the current buffer:

    :3,5Stripper

You can also strip whitespace on selected text in visual mode.

## License

Same as Vim itself, see `:help license`.
