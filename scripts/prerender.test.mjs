import { describe, expect, it } from 'vitest';
import { buildStaticDocument, publicRoutePaths } from './prerender.mjs';

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
    expect(html).toContain('<div id="app"><section class="page-intro');
    expect(html).toContain('/assets/index-abc.css');
    expect(html).toContain('/assets/index-abc.js');
    expect(html).not.toContain('/src/');
  });
});
