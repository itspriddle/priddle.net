---
title: Wormhole
company: World Wide Web Hosting, LLC
role: Lead Developer
period: Jan 2013
date: 2013-01-01
tags:
  - Ruby
  - Rails
  - MySQL
  - PostgreSQL
  - WHMCS
  - GPG
project_type: work
tier: 2
excerpt: >-
  CLI utility and Ruby library for migrating ~10,000 customers from legacy
  WHMCS billing systems into Helix, with encrypted transfer of sensitive data.
---

Wormhole is a custom built CLI utility and Ruby library used to securely
transfer customer billing records from legacy billing systems into Helix, our
in-house replacement. I was the lead developer, created the initial
implementation, and oversaw the successful migration of approximately 10,000
customers from multiple WHMCS instances (across 3 brands) into Helix. The tool
was also extended to support exporting from Synco (Site5's legacy system),
though that migration was never completed due to the company's acquisition.

## How It Worked

Wormhole operated as a multi-step export, encrypt, transfer, and import
pipeline bridging legacy MySQL databases and the Helix PostgreSQL database.

**Export**: The export phase ran on the legacy billing servers (WHMCS or Synco),
where Wormhole connected directly to the MySQL database and serialized each
record to an individual JSON file (one file per record ID). Records were
exported per model type — customers, contacts, services, products, servers,
domains, invoices, payments, billing records, affiliates, and more. Exports
were resumable: the `--continue` flag skipped records already present in the
output directory.

**Encrypt**: Sensitive data such as credit card information was encrypted using
GPG symmetric encryption before leaving the legacy server. WHMCS stored credit
card data with its own encryption scheme, so Wormhole decrypted it from the
WHMCS format and re-encrypted it with GPG for secure transfer.

**Transfer**: The encrypted JSON files were transferred from the legacy servers
to the Helix server.

**Import**: On the Helix server, Wormhole read the JSON files and created
corresponding records in the PostgreSQL database via the HelixCore Rails engine.
Import order was critical — dependent records (e.g., services) had to be
imported after their parents (e.g., customers, products, servers). Each record
was imported within a database transaction, and successfully imported files were
moved to an `imported/` subdirectory. Wormhole tracked all imported records via
`WormholeLog` entries to prevent duplicates and provide an audit trail mapping
legacy IDs to Helix IDs.

Each legacy brand had its own YAML configuration mapping product types,
currencies, locations, and other domain-specific values to their Helix
equivalents.
