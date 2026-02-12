---
title: ViaTalk Voicemail Player
company: ViaTalk, LLC
role: Solo Developer
period: 2009 - 2010
date: 2009-06-01
tags:
  - Ruby
  - PHP
  - CodeIgniter
  - MySQL
  - Asterisk
  - jQuery
  - VoIP
project_type: work
tier: 2
excerpt: >-
  Three-component system for web-based voicemail playback — Ruby daemon for
  WAV-to-MP3 conversion, PHP API for file serving, and jQuery audio player.
---

The ViaTalk Voicemail Player was a set of services I built to enable web-based
voicemail playback in the ViaTalk Control Panel. Asterisk stored voicemail as
WAV files, but streaming large WAV files over the web in 2009 was impractical.
The system consisted of three components: a Ruby daemon that converted WAV files
to MP3 using LAME, a PHP API that served the converted files, and a jQuery-based
audio player integrated into the control panel.

## Components

### mp3processor (Ruby Daemon)

A background daemon built with DaemonKit and ActiveRecord that polled a MySQL
queue for pending conversions. When a customer accessed their voicemail, the
system queued the WAV file for conversion. The daemon encoded files using LAME
at 64kbps/44.1kHz (optimized for voice), extracted duration metadata with
Mp3Info, and generated XML descriptors for the API. It handled Asterisk quirks
like ghost messages (metadata files without corresponding audio) and maintained
the `.mp3/` directory structure mirroring Asterisk's voicemail spool.

### mp3server (PHP API)

A lightweight CodeIgniter application that served as the API layer between the
control panel and Asterisk's voicemail spool (`/var/spool/asterisk/voicemail/`).
Endpoints authenticated via API key, validated file freshness by comparing
timestamps, and served files using Apache's X-Sendfile for efficient delivery.
The API returned XML metadata including conversion status, duration, and file
size, allowing the player to poll until encoding completed.

### Control Panel Player

Integrated jPlayer (a jQuery/Flash audio plugin) into the control panel with a
custom jQuery plugin I wrote to handle the async conversion workflow. The player
polled the API for conversion status, displayed loading states, and initialized
playback once the MP3 was ready. In 2009, HTML5 audio didn't exist and Flash was
the only reliable cross-browser solution for audio playback - getting this to
work smoothly required handling Flash embedding, progress bars, volume controls,
and playback state across browsers.

## Deployment

All three components deployed via Capistrano to voicemail servers in the
ViaTalk NOC. The daemon ran as a background process under root, while the API
ran on Apache with mod_rewrite and X-Sendfile enabled.
