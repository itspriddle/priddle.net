---
title:  whmcs-ruby
period: Mar 2011
date:   2011-03-01
github: https://github.com/dotblock/whmcs-ruby
tags:
  - API
  - Git
  - Rspec
  - Ruby
  - RubyGems
  - WHMCS
project_type: oss
category: ruby
excerpt: |
  whmcs-ruby provides Ruby bindings for the [WHMCS
  API](http://docs.whmcs.com/API:Functions). This project was extracted from my
  work with [DotBlock](https://www.dotblock.com/).
---

whmcs-ruby provides Ruby bindings for the [WHMCS API](http://wiki.whmcs.com/API:Functions).

## Usage

    require 'whmcs'

    WHMCS.configure do |config|
      config.api_url      = 'http://example.com/includes/api.php'
      config.api_username = 'someusername'
      config.api_password = 'c4ca4238a0b923820dcc509a6f75849b' # md5 hash
    end

    WHMCS::Client.get_clients_details(:clientid => '1')

See the [documentation](https://dotblock.github.io/whmcs-ruby/) for more
details.

## Installation

    gem install whmcs-ruby

## License

MIT License - see [`LICENSE`](https://github.com/dotblock/whmcs-ruby/blob/master/LICENSE) in this repo.
