---
title: DEVH API Documentation
description: Complete API reference for DEVH API Gateway services.
keywords: DEVH, API, gateway, documentation
---

# DEVH API Documentation

Welcome to the DEVH API Gateway documentation. This gateway provides a unified interface for various microservices.

## Base URL

```
https://api.devh.in/v1
```

## Authentication

All API requests require an API key passed in the header:

```bash
curl -H "X-API-Key: your_api_key" \
  https://api.devh.in/v1/endpoint
```

## Endpoints

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-02-03T19:00:00Z"
}
```

### Image Optimization

```http
POST /images/optimize
Content-Type: multipart/form-data
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | File | Image file to optimize |
| `quality` | Number | Quality (1-100), default: 80 |
| `format` | String | Output format: `webp`, `avif`, `jpeg` |

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 429 | Rate Limited |
| 500 | Server Error |

## SDKs

Coming soon: TypeScript, Python, and Go SDKs.
