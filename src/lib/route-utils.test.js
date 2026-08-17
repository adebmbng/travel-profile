import { describe, expect, it } from 'vitest';
import { localizedPath, normalizePath, parseLocalePath, resolveRoute, routeExists } from './route-utils.js';

describe('parseLocalePath', () => {
  it('defaults root and unknown locale paths to Indonesian', () => {
    expect(parseLocalePath('/')).toEqual({ locale: 'id', segments: [] });
    expect(parseLocalePath('/fr/tours')).toEqual({ locale: 'id', segments: ['fr', 'tours'] });
  });
});

describe('resolveRoute', () => {
  it('resolves an English package detail route with a slug parameter', () => {
    expect(resolveRoute('/en/worldwide/paket/family-lake-escape/')).toMatchObject({
      locale: 'en', key: 'package-detail', params: { slug: 'family-lake-escape' }
    });
  });

  it('returns not-found for an unknown route', () => {
    expect(resolveRoute('/id/missing-page/').key).toBe('not-found');
  });
});

it('creates localized paths without duplicate slashes', () => {
  expect(localizedPath('en', 'worldwide/paket/family-lake-escape')).toBe('/en/worldwide/paket/family-lake-escape/');
});

it('normalizes redundant slashes without bringing query strings into route matching', () => {
  expect(normalizePath('/en//worldwide/paket/family-lake-escape?utm_source=newsletter')).toBe('/en/worldwide/paket/family-lake-escape/');
});

it('accepts only known dynamic route slugs', () => {
  expect(routeExists('/en/worldwide/paket/family-lake-escape/')).toBe(true);
  expect(routeExists('/en/worldwide/paket/not-a-real-package/')).toBe(false);
});
