---
title:  things-cli
period: May 2021
date:   2021-05-01
github: https://github.com/itspriddle/things-cli
tags:
  - Bash
  - Things
  - CLI
  - macOS
project_type: oss
category: ruby
excerpt: |
  I wrote `things-cli` to work with [Things 3](https://culturedcode.com/things/)
  on macOS. This was the first project I've done with Bash testing (via bats)
  and GitHub Actions, and also the first one that I shipped a man page with.
---

CLI for [Things 3][] by Cultured Code.

[Things 3]: https://culturedcode.com/things/

## Usage

- `things add`            - add new todo
- `things update`         - update exiting todo
- `things add-project`    - add new project
- `things update-project` - update exiting project
- `things show`           - show an area, project, tag, or todo in Things
- `things search`         - invoke and show the search screen in Things
- `things help`           - show documentation for the given command

See `things help` and `man things` for full documentation.

## Installation

**Install via make**

```
git clone https://github.com/itspriddle/things-cli
cd things-cli
make install
```

You may see "Permission denied" errors if `/usr/local` does not exist or is
owned by root. If this happens, you can run `sudo make install`.

**Manual install**

```
mkdir -p /usr/local/bin /usr/local/share/man/man1
curl -o /usr/local/bin/things -L https://github.com/itspriddle/things-cli/raw/master/bin/things
curl -o /usr/local/share/man/man1/things.1 https://github.com/itspriddle/things-cli/raw/master/share/man/man1/things.1
chmod +x /usr/local/bin/things
```

## Bug Reports

Issues can be reported on GitHub:

<https://github.com/itspriddle/things-cli/issues>

## License

MIT License - see [`LICENSE`](https://github.com/itspriddle/things-cli/blob/master/LICENSE) in this repo.
