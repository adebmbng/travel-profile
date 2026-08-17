import { ARTICLES, DESTINATIONS, LANGUAGES, PACKAGES, SUPPORTED_ROUTES } from '../site-data.js';

const DEFAULT_LOCALE = 'id';
const SAFE_SEGMENT = /^[a-z0-9-]+$/i;

function decodeSafeSegment(segment) {
  if (!segment.includes('%')) return segment;

  try {
    const decoded = decodeURIComponent(segment);
    return SAFE_SEGMENT.test(decoded) ? decoded : segment;
  } catch {
    return segment;
  }
}

function routeSegments(template) {
  return template ? template.split('/') : [];
}

function canonicalPath(locale, template, params = {}) {
  const slug = routeSegments(template)
    .map((segment) => (segment.startsWith(':') ? params[segment.slice(1)] : segment))
    .filter(Boolean)
    .join('/');

  return localizedPath(locale, slug);
}

function hasKnownSlug(routeKey, slug) {
  if (routeKey === 'package-detail') return PACKAGES.some((item) => item.slug === slug);
  if (routeKey === 'destination-detail') return DESTINATIONS.some((item) => item.slug === slug);
  if (routeKey === 'article-detail') return ARTICLES.some((item) => item.slug === slug);
  return true;
}

function notFoundRoute(locale) {
  const notFound = SUPPORTED_ROUTES.find((route) => route.key === 'not-found');

  return {
    locale,
    key: 'not-found',
    params: {},
    canonicalPath: canonicalPath(locale, notFound.paths[locale])
  };
}

export function normalizePath(pathname) {
  const value = String(pathname ?? '/').split(/[?#]/, 1)[0].replace(/\/+/g, '/');
  const segments = value.split('/').filter(Boolean).map(decodeSafeSegment);

  return `/${segments.join('/')}${segments.length ? '/' : ''}`;
}

export function parseLocalePath(pathname) {
  const segments = normalizePath(pathname).split('/').filter(Boolean);
  const locale = LANGUAGES[segments[0]] ? segments.shift() : DEFAULT_LOCALE;

  return { locale, segments };
}

export function resolveRoute(pathname) {
  const { locale, segments } = parseLocalePath(pathname);

  for (const route of SUPPORTED_ROUTES) {
    if (route.key === 'not-found') continue;

    const templateSegments = routeSegments(route.paths[locale]);
    if (templateSegments.length !== segments.length) continue;

    const params = {};
    const matches = templateSegments.every((segment, index) => {
      if (!segment.startsWith(':')) return segment === segments[index];

      const parameter = segment.slice(1);
      const value = segments[index];
      if (!SAFE_SEGMENT.test(value)) return false;
      params[parameter] = value;
      return true;
    });

    if (matches && hasKnownSlug(route.key, params.slug)) {
      return {
        locale,
        key: route.key,
        params,
        canonicalPath: canonicalPath(locale, route.paths[locale], params)
      };
    }
  }

  return notFoundRoute(locale);
}

export function localizedPath(locale, slug = '') {
  const safeLocale = LANGUAGES[locale] ? locale : DEFAULT_LOCALE;
  const path = String(slug).split(/[?#]/, 1)[0];
  const segments = path.split('/').filter(Boolean).map(decodeSafeSegment);

  return `/${safeLocale}/${segments.join('/')}${segments.length ? '/' : ''}`;
}

export function routeExists(pathname) {
  return resolveRoute(pathname).key !== 'not-found';
}
