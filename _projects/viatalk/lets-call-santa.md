---
title: Let's Call Santa
company: ViaTalk, LLC
role: Co-Developer
period: Dec 2008
date: 2008-12-01
tags:
  - PHP
  - CodeIgniter
  - Ruby
  - Rails
  - Asterisk
  - jQuery
  - VoIP
project_type: work
tier: 2
excerpt: >-
  Holiday phone line where kids called Santa and left voicemails — built
  without asking anyone, shipped as an official ViaTalk promotion.
---

letscallsanta.com was a free holiday service that let children call Santa's
personal phone line and leave a voicemail telling him what they wanted for
Christmas. Parents would receive the recording via email and could share it on
Facebook and Twitter or opt-in to have it featured on the public "Nice List"
leaderboard where visitors could vote for their favorites.

A coworker and I built the initial version without asking anyone, fully
expecting it would never see the light of day. To our surprise, it got
approved and became an official ViaTalk holiday promotion. This remains one of
my favorite projects---the recordings that parents chose to share publicly had
everyone in the office laughing.

## How It Worked

1. Parents registered with their phone number and email address
2. They received Santa's toll-free number (1-866-674-7411) to call
3. Kids called the number and left their message for Santa
4. Asterisk recorded the call and linked it to their account via caller ID
5. Parents received an email with a link to listen to the recording
6. Optionally, parents could opt-in to share it on the public Nice List

## Technical Implementation

**CodeIgniter Version (2008):** The original was built in about a week using
CodeIgniter, MySQL, and jQuery. It connected directly to ViaTalk's Asterisk
PBX database (`pbx_core`) to associate incoming calls with registered users.
Recordings were stored as MP3s identified by MD5 hashes, and a Flash-based
player handled playback. The Nice List featured IP-based vote tracking to
prevent stuffing the ballot.

**Rails Rewrite (2009):** The following year I rewrote it in Rails 3. The new
version added a proper message processing pipeline---a cron job would find new
recordings, encode the WAV files to MP3 using LAME, generate secure URL tokens
for sharing, and send notification emails. It also added counter caching for
votes, better token-based URLs, Hoptoad exception tracking, and cleaner
separation between the main app database and the Asterisk SIP configuration.

Both versions integrated with AddThis for social sharing, and the Rails
version added native Facebook Like and Twitter Tweet buttons.

[View archive of the site &rarr;](/vault/lets-call-santa/)
