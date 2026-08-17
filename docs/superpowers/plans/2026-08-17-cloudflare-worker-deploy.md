# Cloudflare Worker Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the static Rasuna Travel build deployable through Cloudflare Workers without Wrangler mis-parsing `vite.config.js`.

**Architecture:** Keep Vite responsible for building the static site into `dist/`. Add an explicit root Wrangler JSONC configuration with no Worker entry script and an assets directory pointing at `dist/`. Validate the configuration shape in Vitest and document the Cloudflare Workers Builds commands.

**Tech Stack:** Node.js, Vite, Vitest, Wrangler 4, Cloudflare Workers Static Assets.

## Global Constraints

- The project remains frontend-only; no Worker runtime script or binding is added.
- The Worker assets directory is exactly `./dist`.
- The existing `npm run build` command remains the production build and verification gate.
- Deployment uses SSH-configured GitHub remote `origin` and branch `master`.

---

### Task 1: Add the failing Wrangler configuration regression test

**Files:**
- Create: `scripts/cloudflare-config.test.mjs`

**Interfaces:**
- Consumes: repository root, `wrangler.jsonc`, and `package.json`.
- Produces: a test that requires explicit Worker assets configuration and a deploy command naming the Wrangler config.

- [x] **Step 1: Write the failing test**

```js
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

describe('Cloudflare Worker deployment configuration', () => {
  it('declares an assets-only Worker rooted at dist', async () => {
    const config = JSON.parse(await readFile(resolve(root, 'wrangler.jsonc'), 'utf8'));
    const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));

    expect(config.name).toBe('rasuna-travel');
    expect(config.compatibility_date).toMatch(/^2026-/);
    expect(config.assets).toEqual({ directory: './dist' });
    expect(config.main).toBeUndefined();
    expect(packageJson.scripts['deploy:worker']).toContain('--config wrangler.jsonc');
  });
});
```

- [x] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run scripts/cloudflare-config.test.mjs`

Expected: FAIL because `wrangler.jsonc` and `deploy:worker` do not exist yet.

### Task 2: Implement explicit Worker assets configuration

**Files:**
- Create: `wrangler.jsonc`
- Modify: `package.json`
- Modify: `README.md`

**Interfaces:**
- Consumes: the Vite build output in `dist/`.
- Produces: Wrangler config with `name`, `compatibility_date`, and `assets.directory`; package script `deploy:worker` invoking Wrangler with that config; Cloudflare setup documentation.

- [x] **Step 1: Add the minimal Wrangler configuration**

```json
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "rasuna-travel",
  "compatibility_date": "2026-08-17",
  "assets": {
    "directory": "./dist"
  }
}
```

- [x] **Step 2: Add the explicit deploy command**

Add this package script:

```json
"deploy:worker": "npx wrangler deploy --config wrangler.jsonc"
```

- [x] **Step 3: Document Cloudflare Workers Builds settings**

Document `npm run build` as the build command, `dist` as the asset output, and `npm run deploy:worker` as the deploy command. Include the local sequence `npm run build` followed by `npm run deploy:worker`.

### Task 3: Verify and push the fix

**Files:**
- Modify: `scripts/cloudflare-config.test.mjs`
- Modify: `docs/superpowers/plans/2026-08-17-cloudflare-worker-deploy.md`

**Interfaces:**
- Consumes: the explicit Wrangler config and all existing project verification commands.
- Produces: a committed, pushed deployment fix with fresh evidence.

- [x] **Step 1: Run the focused regression test**

Run: `npm test -- --run scripts/cloudflare-config.test.mjs`

Expected: PASS.

- [x] **Step 2: Run the real Wrangler dry run**

Run: `npm run build` followed by `npx wrangler deploy --dry-run --config wrangler.jsonc`.

Expected: Wrangler accepts `wrangler.jsonc`, uses `dist`, and exits 0 without the `vite.config.js` parse error.

- [x] **Step 3: Run the complete verification suite**

Run: `npm test -- --run`, `npm run build`, `npm run check:assets`, `npm run check:routes`, `npm run test:a11y`, and `git diff --check`.

Expected: all tests and checks exit 0.

- [x] **Step 4: Commit and push**

```bash
git add README.md package.json wrangler.jsonc scripts/cloudflare-config.test.mjs docs/superpowers/specs/2026-08-17-cloudflare-worker-deploy-design.md docs/superpowers/plans/2026-08-17-cloudflare-worker-deploy.md
git commit -m "fix: configure Cloudflare Worker static deployment"
git push origin master
```

- [x] **Step 5: Confirm the pushed tree**

Run: `git status --short --branch` and `git ls-remote --heads origin master`.

Expected: the worktree is clean and `origin/master` points to the new commit.
