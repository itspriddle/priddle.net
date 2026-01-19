---
title:  DotBlock API Clients
period: Feb 2011
date:   2011-02-01
github: https://github.com/dotblock
tags:
  - API
  - Bash
  - Git
  - PHP
  - Ruby
  - RubyGems
project_type: oss
category: cli
---

As part of my work on DotBlock Mobile, I created API clients in [Bash][],
[PHP][], and [Ruby][] for customers to access the DotBlock API.

[Bash]: https://github.com/dotblock/dotblock-api-bash
[PHP]: https://github.com/dotblock/dotblock-api-php
[Ruby]: https://github.com/dotblock/dotblock-api-ruby

## DotBlock API Bash Client

This is a bash client for <http://api.dotblock.com/>.

### Usage

    Usage:

      dotblock-api [command]

    Commands:

      server-list                : List virtual server ids for this account
      server-info <serverid>     : Show info for <serverid>
      server-boot <serverid>     : Boot <serverid>
      server-reboot <serverid>   : Reboot <serverid>
      server-suspend <serverid>  : Suspend <serverid>
      server-resume <serverid>   : Resume <serverid>
      server-shutdown <serverid> : Shutdown <serverid>

### Install

    wget https://github.com/dotblock/dotblock-api-bash/raw/master/bin/dotblock-api
    chmod +x dotblock-api
    sudo mv dotblock-api /usr/local/bin

### License

MIT License - see [`MIT-LICENSE`](https://github.com/dotblock/dotblock-api-bash/blob/master/MIT-LICENSE) in this repo.

---

## DotBlock API Ruby Client

This is a Ruby client for <http://api.dotblock.com/>.

### Installation

    gem install dotblock-api

### Usage

See [`examples/example.rb`](https://github.com/dotblock/dotblock-api-ruby/blob/master/examples/example.rb).

### License

MIT License - see [`MIT-LICENSE`](https://github.com/dotblock/dotblock-api-ruby/blob/master/MIT-LICENSE) in this repo.

---

## DotBlock API PHP5 Client

This is a PHP5 client for <http://api.dotblock.com/>.

### Prerequisites

PHP must be compiled with cURL support.

PHP must have JSON support. You can install it with pear:

    pecl channel-update pear.php.net
    pecl install json

### Usage

See [`examples/example.php`](https://github.com/dotblock/dotblock-api-php/blob/master/examples/example.php).

### License

MIT License - see [`MIT-LICENSE`](https://github.com/dotblock/dotblock-api-php/blob/master/MIT-LICENSE) in this repo.
