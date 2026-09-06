---
title: "50k RPS on 1 GB RAM"
date: September 06, 2026
slug: 50k-rps-on-1gb
status: Published
wip: true
tags: Telemetry, Performance, DevSecOps, HTTP/3, Linux
type: Post
ogDescription: "A telemetry stack that holds ~50,000 requests per second on a 1 GB machine. The write-up is in progress."
summary: "Placeholder. How a production telemetry stack holds ~50k RPS on a 1 GB box — the math says it shouldn't, the graphs say it does."
---

# 50k RPS on 1 GB RAM

**Write-up in progress.** This is a stub so the URL exists.

I built a telemetry stack that sits in front of production traffic and holds **~50,000 requests per second on a machine with 1 GB of RAM**.

On paper that is the wrong shape: heap, GC, buffers, TLS, cardinality — pick one and you are already over budget. In production it holds. The trick is not a bigger instance.

What the full note will cover:

- Where the bytes actually go (and where they must not)
- Why a 1 GB box is the constraint, not a flex
- Hot path: no alloc if we can help it, ring buffers, drop policy that doesn't lie
- HTTP/3 / QUIC on the edge when it is cheaper than another TLS 1.2 worker
- What breaks first when you try this the obvious way

If you need the numbers before the essay ships, [mail me](mailto:hello@satyendra.in).
