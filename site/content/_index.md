---
title: "AuthProbe"
description: "authprobe pinpoints MCP OAuth failures. Scan any MCP endpoint and get deterministic findings mapped to RFCs."
---

# Pinpoint MCP OAuth failures

MCP + OAuth breaks for mundane reasons: missing headers, wrong content types, malformed metadata. `authprobe scan <url>` walks the discovery flow and reports exactly where it diverges from spec.

[Get started](/docs/) · [View on GitHub](https://github.com/authprobe/authprobe)

## The scan funnel

AuthProbe runs a six-step staged probe against your MCP endpoint:

```text
[1] Discovery ──► [2] MCP Init ──► [3] PRM ──► [4] Auth Server ──► [5] Token ──► [6] DCR
      │                │              │              │                │              │
      ▼                ▼              ▼              ▼                ▼              ▼
   401 + WWW-     initialize +    Fetch PRM     Fetch issuer       POST           DCR
   Authenticate   tools/list      metadata      metadata          probe          probe
```

Each step maps to specific RFCs: [MCP 2025-11-25](https://modelcontextprotocol.io/specification), [RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728), [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414), [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591), [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636), and more.

## Who this is for

- **MCP server authors** validating OAuth discovery and protected-resource metadata.
- **MCP client implementers** debugging where auth flows diverge from RFC 9728 / RFC 8414.
- **Platform and security teams** triaging auth regressions in CI before rollout.
- **API teams** that need reproducible evidence bundles for handoff across org boundaries.

## Quick demo

```bash
# Install (no sudo, installs into ~/.local/bin)
curl -fsSL https://raw.githubusercontent.com/authprobe/authprobe/main/scripts/install.sh | sh

# Scan an MCP endpoint
authprobe scan https://mcp.example.com/mcp
```

## What you get

**Funnel view** — see exactly which protocol step broke and why:

```text
Funnel
 [1] MCP probe (401 + WWW-Authenticate)      [✓] PASS
 [2] MCP initialize + tools/list             [X] FAIL
 [3] PRM fetch matrix                        [✓] PASS
```

**RFC rationale** — understand what the spec requires at each step:

```bash
authprobe scan https://mcp.example.com/mcp --explain
```

**LLM-powered analysis** — get a detailed compliance explanation:

```bash
authprobe scan https://mcp.example.com/mcp --explain --trace-failure --openai-api-key $OPENAI_API_KEY
```

**CI-ready outputs** — Markdown reports, JSON reports, and evidence bundles:

```bash
authprobe scan https://mcp.example.com/mcp \
  --md report.md --json report.json --bundle evidence.zip
```

## Used in the wild

- **Sentry MCP** used AuthProbe to identify and fix RFC 9728 PRM compliance gaps for `mcp.sentry.dev` ([PR #799](https://github.com/getsentry/sentry-mcp/pull/799)).
- **Kiro** used AuthProbe to pinpoint an MCP server metadata/authorization detection issue ([details](https://github.com/kirodotdev/Kiro/issues/5452#issuecomment-3899076021)).
- **Yargi MCP** used AuthProbe to surface a protocol-compliance bug with JSON-RPC request IDs ([details](https://github.com/saidsurucu/yargi-mcp/issues/18)).
- **RivalSearchMCP** used AuthProbe to identify and fix `MCP_JSONRPC_ID_NULL_ACCEPTED` by rejecting JSON-RPC requests with a null request ID ([issue #5](https://github.com/damionrashford/RivalSearchMCP/issues/5)).
