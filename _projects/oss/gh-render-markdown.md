---
title:  gh-render-markdown
period: Mar 2022
date:   2022-03-16
github: https://github.com/itspriddle/gh-render-markdown
tags:
  - API
  - Bash
  - Git
  - CLI
project_type: oss
category: github
excerpt: |
  I wanted to learn about extensions in the new [GitHub
  CLI](https://cli.github.com), so I extracted an old script of mine into
  `gh-render-markdown`. It sends Markdown files or STDIN to the GitHub API to
  render into the same HTML you'd see on GitHub.
---

[gh][1] extension to render Markdown files as HTML.

[1]: https://cli.github.com/

## Usage

Specify one or more Markdown files to generate as arguments to `gh
render-markdown`:

```sh
gh render-markdown README.md CONTRIBUTING.md
```

Alternatively, STDIN can be used which allows for a few different usage
patterns. For example, you can redirect input:

```sh
gh render-markdown < README.md
```

Or pipe a command that outputs Markdown:

```sh
echo '# markdown' | gh render-markdown
```

Or pass raw Markdown directly via input:

```sh
gh render-markdown <<< '# markdown'
```

Or manually type a blob of Markdown yourself by opening STDIN (press Ctrl-D
when done):

```sh
gh render-markdown
# markdown
^D
```

## Installation

```sh
gh extension install itspriddle/gh-render-markdown
```

## Bug Reports

Issues can be reported on GitHub:

<https://github.com/itspriddle/gh-render-markdown/issues>

## License

MIT License - see
[`LICENSE`](https://github.com/itspriddle/gh-render-markdown/blob/master/LICENSE)
in this repository.
