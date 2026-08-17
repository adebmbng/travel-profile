import { describe, expect, it } from 'vitest';
import { buildMetadata, buildStructuredData } from './seo.js';

describe('technical SEO', () => {
  it('builds bilingual canonical and alternate metadata', () => {
    const metadata = buildMetadata({ locale: 'id', key: 'home', params: {}, canonicalPath: '/id/' });

    expect(metadata.canonical).toBe('/id/');
    expect(metadata.alternates).toEqual(expect.arrayContaining([
      { hreflang: 'id', href: '/id/' },
      { hreflang: 'en', href: '/en/' }
    ]));
    expect(metadata.robots).toBe('index,follow');
  });

  it('keeps not-found documents out of the index', () => {
    expect(buildMetadata({ locale: 'en', key: 'not-found', params: {}, canonicalPath: '/en/404/' }).robots)
      .toBe('noindex,follow');
  });

  it('never emits unverified review or certification schema', () => {
    const json = JSON.stringify(buildStructuredData({ locale: 'id', key: 'home', params: {}, canonicalPath: '/id/' }));

    expect(json).toContain('Organization');
    expect(json).not.toContain('AggregateRating');
    expect(json).not.toContain('UMRAH_CERTIFICATION_NUMBER');
    expect(json).not.toContain('PACKAGE_FAMILY_LAKE_ESCAPE_STARTING_PRICE');
  });
});
