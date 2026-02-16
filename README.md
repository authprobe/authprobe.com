# authprobe.com

Marketing/documentation site for AuthProbe, built with Hugo and deployed to GitHub Pages.

## Local development

- `make dev` — runs `npm ci` automatically when the theme is not installed, then starts Hugo with drafts.
- `make build` — runs `npm ci` automatically when needed, then builds to `site/public`.
- `make clean` — remove generated output.

You can also install/update dependencies manually:

```bash
cd site
npm ci
```

## CI/CD

GitHub Actions builds from `site/` and uploads `site/public` as the Pages artifact.
Pull requests are build-only checks; pushes to `main` trigger deploy.

## Theme updates

This site uses the official NPM integration for `@filipecarneiro/hugo-bootstrap-theme`.
To update the theme:

1. `cd site`
2. `npm install @filipecarneiro/hugo-bootstrap-theme@<version> --save-exact`
3. Commit both `package.json` and `package-lock.json`
