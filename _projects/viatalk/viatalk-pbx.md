---
title: ViaTalk PBX
company: ViaTalk, LLC
role: Solo Developer
period: Aug 2008
date: 2008-08-01
tags:
  - PHP
  - CodeIgniter
  - Asterisk
  - MySQL
  - Linux
  - JavaScript
  - VoIP
project_type: work
tier: 2
excerpt: >-
  Multi-tenant VoIP call center handling 500-1000 daily support calls across
  three companies — full-stack ownership from Linux hardening to Asterisk
  dialplans to the web dashboard.
---

ViaTalk PBX was a multi-tenant VoIP call center management system serving
ViaTalk, HostRocket, and DotBlock. The system handled 500-1000 daily support
calls with near-perfect uptime. I was solely responsible for the entire
stack: server provisioning, Asterisk configuration, dialplan development,
and the CodeIgniter web application.

## Architecture

The system consisted of two main components: an Asterisk PBX server handling
call routing and a CodeIgniter web application providing real-time queue
monitoring and administration.

### Asterisk Configuration

The dialplan supported multiple companies with isolated contexts and queues:

- **Queue routing** with round-robin memory strategy, configurable wrap-up
  times, and automatic retry logic
- **Priority support** via database lookups - incoming calls checked against
  a priority table and routed to shorter queues
- **Callback system** - customers could request callbacks during high-volume
  periods; a daemon automatically initiated outbound calls when agents became
  available
- **Call blocking** via database-driven blacklist checked in the dialplan
- **Dynamic agent management** - agents logged in/out of queues via web
  interface, with changes processed asynchronously

Direct MySQL queries from the dialplan enabled real-time routing decisions
based on customer status, temporary priority flags, and queue conditions.

### Web Application

The CodeIgniter application provided:

- **Real-time queue dashboard** showing callers, callbacks, and agent status
  for each company/department
- **Asterisk Manager API integration** via a custom library handling agent
  login/logout, queue membership, channel monitoring, and call control
- **Background daemon** polling Asterisk every 20 seconds, updating cached
  queue state, processing pending agent actions, and triggering callbacks
- **CDR reporting** with agent-level call history, hold/talk time
  calculations, and department filtering
- **Quality assurance tools** - supervisors could flag calls during
  conversations for later review with notes
- **Multi-interface support** - standard web, mobile (iUI), XML-RPC, and
  SOAP endpoints for integration

The daemon architecture solved the problem of bridging real-time Asterisk
state with web-based management - it maintained cached representations of
queue members, agent status, and SIP peer availability, invalidating web
caches when state changed.

## Technical Challenges

**Full-stack ownership** - I handled everything from Linux server hardening
and Asterisk compilation to PHP development and production deployment, years
before infrastructure automation was common.

**Real-time state synchronization** - bridging Asterisk's event-driven model
with a web interface required careful daemon design, caching strategies, and
cache invalidation logic.

**Multi-tenant isolation** - the same Asterisk instance served three
companies with separate queues, agents, SIP endpoints, and branded web
interfaces while sharing common infrastructure.
