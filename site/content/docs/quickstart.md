---
title: "Quickstart"
weight: 30
---

Run your first scan against an MCP endpoint with OAuth enabled:

```bash
authprobe scan --target https://mcp.example.com --auth oauth --verbose
```

Review the findings to identify where the OAuth exchange fails, then run the provided verification commands after remediation.
