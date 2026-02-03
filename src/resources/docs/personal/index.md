---
title: Personal API's Documentation
description: Documentation for Satyendra's personal APIs and public services.
keywords: API, personal, documentation, REST
---

# Personal API's Documentation

Documentation for my personal APIs and publicly available services.

## Available APIs

### URL Shortener API

A fast, lightweight URL shortening service.

```bash
# Shorten a URL
curl -X POST https://s.devh.in/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/very/long/url"}'
```

### GitHub Graph Proxy

Proxies GitHub contribution graphs with caching.

```javascript
// Fetch contribution data
const response = await fetch('https://api.satyendra.in/github-graph');
const data = await response.json();
```

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| URL Shortener | 100 req/min |
| GitHub Graph | 60 req/min |

## Authentication

Most endpoints are public. For protected endpoints, use Bearer token authentication:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.satyendra.in/protected
```
