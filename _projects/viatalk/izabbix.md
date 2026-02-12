---
title: iZabbix
company: ViaTalk, LLC
role: Solo Developer
period: Oct 2010
date: 2010-10-01
tags:
  - JavaScript
  - Appcelerator Titanium
  - Ruby
  - Rails
  - XMPP
  - Apple Push Notifications
project_type: work
tier: 2
excerpt: >-
  iPhone app for VoIP engineers to receive real-time Zabbix monitoring alerts,
  backed by a Rails API with XMPP bot and Apple Push Notifications.
---

iZabbix is an iPhone application used internally by VoIP engineers to receive
real-time alerts from Zabbix monitoring. The system consisted of two components:
a Rails API backend and an Appcelerator Titanium mobile application.

## Architecture

### Rails API Backend

The backend was built on Rails 3.0.5 with MySQL and served as the bridge between
Zabbix and iOS devices. Key components included:

**XMPP Bot**: A background daemon using `xmpp4r-simple` that connected to a
Jabber server and listened for messages from authorized Zabbix servers. When
alerts arrived, the bot parsed the message to extract the server hostname and
alert text, then persisted the alert to the database.

**Push Notification Service**: Integrated the `apnd` gem to communicate with
Apple's Push Notification Service. An `after_create` callback on the Alert model
automatically dispatched push notifications to all registered devices whenever
a new alert was created, including the server name, message, and updated badge
count.

**RESTful JSON API**: Device authentication via SHA1-generated API keys tied to
push tokens. Endpoints supported listing active alerts, dismissing individual
alerts, and bulk dismissal. When alerts were dismissed, the API updated badge
counts across all registered devices.

### Titanium Mobile Application

The iOS app was built with Appcelerator Titanium and featured:

- Push notification registration on launch with automatic device enrollment
- TableView display of active alerts with server name, message, and relative
  timestamps ("5 minutes ago")
- Pull-to-refresh and manual refresh button
- "Dismiss All" action with confirmation dialog
- Automatic refresh on app resume from background
- Real-time badge count management synchronized across devices

The app included a custom JavaScript utility library providing AJAX helpers,
local storage via `Ti.App.Properties`, date formatting with `strftime` and
relative time calculation, and platform detection utilities.
