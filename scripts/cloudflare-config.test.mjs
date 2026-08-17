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
