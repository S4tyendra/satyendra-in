---
title: Architecture - IIIT Kota
description: System architecture and infrastructure design for IIIT Kota web services.
keywords: architecture, infrastructure, microservices, kubernetes
---

# Architecture

## System Overview

The IIIT Kota infrastructure follows a microservices architecture deployed on Kubernetes.

## Tech Stack

- **Runtime**: Bun / Node.js
- **Framework**: Hono.js, Elysia
- **Database**: PostgreSQL, Redis
- **Container Orchestration**: Kubernetes (K3s)
- **CI/CD**: GitHub Actions

## High-Level Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Cloudflare CDN                    │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                 Nginx Ingress                       │
└─────────────────────┬───────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
   │ Web App │   │   API   │   │  Admin  │
   └─────────┘   └─────────┘   └─────────┘
```

## Security Considerations

1. **Zero Trust Network** - All internal services require mTLS
2. **Secret Management** - HashiCorp Vault for secrets
3. **RBAC** - Kubernetes native RBAC policies
