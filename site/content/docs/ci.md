---
title: "CI Integration"
description: "Add AuthProbe to GitHub Actions as a regression gate."
date: 2026-02-16
weight: 30
---

AuthProbe is designed as a regression gate in CI. Run `authprobe scan` against staging on every PR, fail the build if severity reaches your threshold, and upload reports as artifacts.

## GitHub Action

Use the bundled action:

```yaml
jobs:
  authprobe:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: authprobe/authprobe@v0.5.0
        with:
          mcp_url: https://mcp.example.com/mcp
          args: --fail-on medium --rfc strict
```

### Action inputs

| Input | Default | Description |
|-------|---------|-------------|
| `version` | `latest` | Release version (e.g., `v0.5.0` or `latest`) |
| `command` | `scan` | AuthProbe command to run |
| `mcp_url` | — | MCP endpoint URL (required for `scan`) |
| `args` | `""` | Additional CLI flags |
| `report_md` | `authprobe-report.md` | Markdown report path (empty to skip) |
| `report_json` | `authprobe-report.json` | JSON report path (empty to skip) |
| `bundle` | `authprobe-evidence.zip` | Evidence bundle path (empty to skip) |
| `upload_artifacts` | `true` | Upload reports as workflow artifacts |

## Manual CI setup

If you prefer to install AuthProbe directly in your pipeline:

```yaml
jobs:
  authprobe:
    runs-on: ubuntu-latest
    steps:
      - name: Install AuthProbe
        run: curl -fsSL https://raw.githubusercontent.com/authprobe/authprobe/main/scripts/install.sh | sh

      - name: Scan
        run: |
          authprobe scan https://mcp.example.com/mcp \
            --fail-on medium \
            --md report.md --json report.json

      - name: Upload reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: authprobe-reports
          path: |
            report.md
            report.json
```

## Fail threshold

Use `--fail-on <severity>` to control when the build breaks:

- `--fail-on high` — fail only on high-severity findings (default).
- `--fail-on medium` — fail on medium or above.
- `--fail-on low` — fail on any finding.
- `--fail-on none` — always fail if any finding exists.

AuthProbe exits with code 2 when findings meet or exceed the threshold, which causes the CI step to fail.
