import { describe, expect, it } from 'vitest';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildStaticDocument, prerenderRoutes, publicRoutePaths } from './prerender.mjs';
import { legacyRedirects } from './generate-redirect-map.mjs';

describe('production route documents', () => {
  it('enumerates localized static and known dynamic routes', () => {
    const paths = publicRoutePaths();

    expect(paths).toContain('/id/');
    expect(paths).toContain('/en/worldwide/');
    expect(paths).toContain('/id/haji-umrah/');
    expect(paths).toContain('/en/worldwide/paket/family-lake-escape/');
  });

  it('creates a localized document with transformed asset references', () => {
    const html = buildStaticDocument('/en/worldwide/', {
      styles: '<link rel="stylesheet" href="/assets/index-abc.css">',
      scripts: '<script type="module" src="/assets/index-abc.js"></script>'
    });

    expect(html).toContain('<html lang="en">');
    expect(html).toContain('<link rel="canonical" href="/en/worldwide/">');
    expect(html).toContain('<div id="app"><div class="worldwide-page">');
    expect(html).toContain('hero-worldwide-master.png');
    expect(html).toContain('/assets/index-abc.css');
    expect(html).toContain('/assets/index-abc.js');
    expect(html).not.toContain('/src/');
  });

  it('adds the approved social card only to localized home documents', () => {
    const assets = {
      styles: '<link rel="stylesheet" href="/assets/index-abc.css">',
      scripts: '<script type="module" src="/assets/index-abc.js"></script>'
    };

    const indonesianHome = buildStaticDocument('/id/', assets);
    const englishHome = buildStaticDocument('/en/', assets);
    const worldwide = buildStaticDocument('/id/wisata-dunia/', assets);

    expect(indonesianHome).toContain('property="og:image" content="/assets/generated/og-home-background.png"');
    expect(indonesianHome).toContain('name="twitter:card" content="summary_large_image"');
    expect(englishHome).toContain('/assets/generated/og-home-background.png');
    expect(worldwide).not.toContain('/assets/generated/og-home-background.png');
  });

  it('writes sitemap, robots, and redirect artifacts with static routes', async () => {
    const outDir = await mkdtemp(join(tmpdir(), 'rasuna-prerender-'));

    try {
      await prerenderRoutes({
        outDir,
        sourceHtml: '<link rel="stylesheet" href="/assets/index-abc.css"><script type="module" src="/assets/index-abc.js"></script>'
      });

      expect(await readFile(join(outDir, 'sitemap.xml'), 'utf8')).toContain('<urlset');
      expect(await readFile(join(outDir, 'robots.txt'), 'utf8')).toContain('Sitemap: /sitemap.xml');
      expect(await readFile(join(outDir, 'redirects.json'), 'utf8')).toContain('/tentang-kami/');
      expect(await readFile(join(outDir, '_redirects'), 'utf8')).toContain('/tentang-kami/');
    } finally {
      await rm(outDir, { recursive: true, force: true });
    }
  });

  it('maps legacy WordPress routes to the localized equivalents', () => {
    expect(legacyRedirects()).toMatchObject({
      '/tentang-kami/': '/id/tentang/',
      '/travel-tools/': '/id/travel-tools/',
      '/affiliates/': '/id/travel-tools/'
    });
  });
});
