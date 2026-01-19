---
title:  LaunchBar Actions
period: May 2010
date:   2010-05-02
github: https://github.com/itspriddle/launchbar-actions
tags:
  - LaunchBar
  - AppleScript
  - Ruby
  - Bash
project_type: oss
category: cli
---

Just a few [LaunchBar][] Actions I use. See [the repo]({{ page.github }}) for
more info.

## Installation

```sh
git clone git://github.com/itspriddle/launcbar-actions
cd launchbar-actions
sh install.sh
mv build/* ~/Library/Application\ Support/LaunchBar/Actions/
```

### Adium

These AppleScripts change your away/online status. With the action selected in LaunchBar,
press spacebar to input a custom status.

**[Adium - Away](https://github.com/itspriddle/launchbar-actions/raw/master/scripts/Adium%20-%20Away.scpt)**

**[Adium - Available](https://github.com/itspriddle/launchbar-actions/raw/master/scripts/Adium%20-%20Available.scpt)**

**[Adium - iTunes Track](https://github.com/itspriddle/launchbar-actions/raw/master/scripts/Adium%20-%20iTunes%20Track.scpt)**

### The Hit List

**[Create new task in The Hit List](https://github.com/itspriddle/launchbar-actions/raw/master/scripts/Create%20new%20task%20in%20The%20Hit%20List.scpt)**

### General

**[Copy SSH public key to clipboard](https://github.com/itspriddle/launchbar-actions/raw/master/scripts/Copy%20SSH%20public%20key%20to%20clipboard.scpt)**

**[Tweet current iTunes track](https://github.com/itspriddle/launchbar-actions/raw/master/scripts/Tweet%20current%20iTunes%20track.scpt)**

Note: You need to setup [~/.netrc](https://gist.github.com/raw/387548/ed8694aaf1034d8b2251a69273bdf7fe6a231329/netrc) with twitter credentials.

[LaunchBar]: https://www.obdev.at/products/launchbar/index.html
