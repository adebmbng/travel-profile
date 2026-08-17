# Cloudflare Worker Deployment Design

**Status:** Approved for implementation on 2026-08-17

## Problem

Cloudflare Wrangler fails before deployment with `Error parsing file: vite.config.js`. The Vite configuration is valid and the local Vite build succeeds, but the repository does not declare a Wrangler configuration. Running `npx wrangler deploy --dry-run` reproduces the same failure because Wrangler's automatic project detection inspects the Vite configuration without a Worker deployment contract.

## Decision

Deploy the existing frontend as a static-assets-only Cloudflare Worker. Add a root `wrangler.jsonc` that explicitly declares the Worker name, compatibility date, and `dist` as the assets directory. No Worker entry script or runtime binding is needed because this project produces only static HTML, CSS, JavaScript, images, redirects, and SEO files.

The supported deployment flow is:

```text
npm ci
npm run build
npx wrangler deploy --config wrangler.jsonc
```

Cloudflare Workers Builds can use `npm run build` as the build command and `npx wrangler deploy --config wrangler.jsonc` as the deploy command.

## Scope

- Add explicit Wrangler configuration for static assets.
- Add a regression test that validates the required configuration shape and package deploy command.
- Document the Worker build and deploy settings.
- Verify the original Wrangler dry-run error is gone, then run the existing test and production verification gates.

## Non-goals

- Add a server-side Worker handler.
- Convert the project to a Cloudflare Vite plugin application.
- Change application routes, content, analytics, or runtime behavior.
- Add live APIs, bindings, or secrets.

## Acceptance Criteria

1. `wrangler.jsonc` exists at the repository root and points `assets.directory` to `./dist`.
2. `npx wrangler deploy --dry-run --config wrangler.jsonc` exits successfully after `npm run build` without parsing `vite.config.js` as a Worker config.
3. The regression test fails before the configuration is added and passes after it is added.
4. The existing 55-test suite and production route, asset, SEO, and accessibility checks remain green.
5. The fix is committed and pushed to `origin/master` over SSH.
