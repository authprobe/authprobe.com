---
title: "Install"
weight: 10
---

## Install script (recommended)

Downloads the latest release binary into `~/.local/bin`. No sudo required.

```bash
curl -fsSL https://raw.githubusercontent.com/authprobe/authprobe/main/scripts/install.sh | sh
```

## Go toolchain

```bash
go install github.com/authprobe/authprobe/cmd/authprobe@latest
```

## Docker

```bash
docker pull ghcr.io/authprobe/authprobe:latest

docker run --rm ghcr.io/authprobe/authprobe:latest scan https://mcp.example.com/mcp
```

## Release binary

Download the latest release from [GitHub Releases](https://github.com/authprobe/authprobe/releases) and place it on your `PATH`.

## Clone and build

```bash
git clone https://github.com/authprobe/authprobe.git
cd authprobe
go run cmd/authprobe/main.go scan https://mcp.example.com/mcp
```

## Verify

```bash
authprobe --version
```
