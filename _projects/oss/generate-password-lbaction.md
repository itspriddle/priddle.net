---
title:  generate-password.lbaction
period: Mar 2018
date:   2018-03-01
github: https://github.com/itspriddle/generate-password.lbaction
tags:
  - LaunchBar
  - macOS
  - Ruby
  - Security
  - Passwords
project_type: oss
category: ruby
excerpt: |
  generate-password.lbaction is a [LaunchBar
  6](https://www.obdev.at/products/launchbar/index.html) Action to generate
  secure passwords and copy them to the system clipboard. It uses the [KeePass
  Password Generator](https://keepass.info/help/base/pwgenerator.html) to allow
  you to specify a character set for the generated password. No external
  dependencies are required.
---

This is a [LaunchBar 6][] Action to generate secure passwords and copy them to
the system clipboard.

It uses the [KeePass Password Generator][] to allow you to specify a character
set for the generated password. This functionality is provided by an included
copy of the [keepass-password-generator RubyGem][] -- no external dependencies
are required.

[LaunchBar 6]: https://www.obdev.at/products/launchbar/index.html
[KeePass Password Generator]: https://keepass.info/help/base/pwgenerator.html
[keepass-password-generator RubyGem]: https://github.com/johnbintz/keepass-password-generator

## Installation

Grab "Generate.Password.zip" from the latest release at
<https://github.com/itspriddle/generate-password.lbaction/releases>. Unzip and
open "Generate Password.lbaction" to install it.

## Usage

To generate a password, invoke LaunchBar and select "Generate Password". After
running the action, the newly generated password is copied to the system
clipboard.

By default, this Action will generate a 20 character password using
`L{9}d{9}s{9}` as the KeePass character set. This will generate a password
with 9 mixes-case letters, 9 digits, and 2 special characters.

To specify a different character set, press `Space` after selecting the Action
from LaunchBar and type in the desired character set, eg: `S{30}`.

## Preferences

If you want to use a different default character set, you can create or edit
`~/Library/Application Support/LaunchBar/Action Support/io.github.itspriddle.LaunchBar.action.GeneratePassword/Preferences.plist`
and set `defaultFormat`.

For example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>defaultFormat</key>
	<string>S{30}</string>
</dict>
</plist>
```

## Contributing

Bug reports and pull requests are welcome on GitHub at
<https://github.com/itspriddle/generate-password.lbaction>

## License

MIT License - see
[`LICENSE`](https://github.com/itspriddle/generate-password.lbaction/blob/master/LICENSE)
in this repository.
