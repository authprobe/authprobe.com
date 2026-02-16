---
title: "Quickstart"
weight: 20
---

## Run your first scan

Point AuthProbe at any MCP endpoint:

```bash
authprobe scan https://mcp.example.com/mcp
```

The output shows a funnel view of six protocol steps. Each step is marked PASS, FAIL, or SKIP:

```text
Funnel
 [1] MCP probe (401 + WWW-Authenticate)      [✓] PASS
 [2] MCP initialize + tools/list             [X] FAIL
 [3] PRM fetch matrix                        [✓] PASS
 [4] Auth server metadata                    [✓] PASS
 [5] Token endpoint readiness                [-] SKIP
 [6] Dynamic client registration             [-] SKIP
```

Below the funnel, AuthProbe reports a **primary finding** with severity, evidence, and next steps.

## Get RFC rationale

Add `--explain` to see what each spec requires at every step:

```bash
authprobe scan https://mcp.example.com/mcp --explain
```

## Trace failures

Add `--trace-failure` to see the full HTTP request/response for failed steps:

```bash
authprobe scan https://mcp.example.com/mcp --explain --trace-failure
```

## LLM-powered explanation

Provide an API key to get a detailed compliance analysis from an LLM:

```bash
export OPENAI_API_KEY=<key>
authprobe scan https://mcp.example.com/mcp --explain --trace-failure
```

Anthropic is also supported:

```bash
export ANTHROPIC_API_KEY=<key>
authprobe scan https://mcp.example.com/mcp --explain --trace-failure
```

## Strict conformance checks

Enable strict RFC and MCP conformance checking:

```bash
authprobe scan https://mcp.example.com/mcp --rfc strict --mcp strict
```

## Generate reports

Produce Markdown, JSON, or evidence-bundle outputs for sharing or CI:

```bash
authprobe scan https://mcp.example.com/mcp \
  --md report.md --json report.json --bundle evidence.zip
```

Stream JSON to `jq`:

```bash
authprobe scan https://mcp.example.com/mcp --json - | jq '.findings'
```

## List MCP tools

Enumerate tools exposed by the server:

```bash
authprobe scan https://mcp.example.com/mcp --tool-list
authprobe scan https://mcp.example.com/mcp --tool-detail "my_tool_name"
```

## Common flags

| Flag | Description |
|------|-------------|
| `-H "Header: value"` | Add a request header (repeatable) |
| `--timeout <seconds>` | Request timeout (default: 8) |
| `--rfc <level>` | RFC conformance: off, best-effort, strict |
| `--mcp <level>` | MCP conformance: off, best-effort, strict |
| `--insecure` | Skip TLS verification (self-signed certs) |
| `--no-follow-redirects` | Stop at first response |
| `--fail-on <severity>` | Exit code 2 if findings at/above: none, low, medium, high |
| `-v` / `--verbose` | Print request/response headers and bodies |
| `--trace-failure` | Include verbose output for failed steps |
| `-e` / `--explain` | Print RFC rationale for each step |
| `--output-dir <dir>` | Write all outputs into a directory |
