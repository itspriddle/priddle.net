---
title:  FannyPack
period: May 2011
date:   2011-05-01
github: https://github.com/itspriddle/fanny_pack
tags:
  - API
  - Fantastico
  - Git
  - Rspec
  - Ruby
  - RubyGems
project_type: oss
category: ruby
excerpt: |
  FannyPack is a RubyGem that interfaces with the
  [Fantastico](https://www.netenberg.com/fantastico.php) API. I created the
  initial implementation and helped manage the open source project on GitHub.
---

FannyPack is a Ruby library for working with the [Fantastico API][].

FannyPack has been tested on MRI 1.9.3, 2.0.0, 2.1.2, and 1.9-compatible JRuby.

[Fantastico API]: https://netenberg.com/api/

## Installation

    gem install fanny_pack

## Usage

Set your Fantastico `accountHASH`

    FannyPack.account_hash = '0mgpwn13s'

Add an IP

    FannyPack::IP.add '127.0.0.1'

Add a VPS IP

    FannyPack::IP.add '127.0.0.1', :vps

Edit an IP (`127.0.0.1` is the current IP, `127.0.0.2` is the new IP)

    FannyPack::IP.edit '127.0.0.1', '127.0.0.2'

Deactivate an IP

    FannyPack::IP.deactivate '127.0.0.1'

Reactivate an IP

    FannyPack::IP.reactivate '127.0.0.1'

Delete an IP

    FannyPack::IP.delete '127.0.0.1'

List all IPs

    FannyPack::IP.list :all

List only 'normal' IPs

    FannyPack::IP.list :normal

List only VPS IPs

    FannyPack::IP.list :vps

Include details when listing IPs:

    FannyPack::IP.list :all, true

Get an IP's details

    FannyPack::IP.details '127.0.0.1'

## Note on Patches/Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a future version
  unintentionally.
* Commit, do not mess with rakefile, version, or history. (If you want to have
  your own version, that is fine but bump version in a commit by itself I can
  ignore when I pull)
* Send me a pull request. Bonus points for topic branches.

## License

MIT License - see [`LICENSE`](https://github.com/itspriddle/snuggie/blob/master/LICENSE) in this repo.
