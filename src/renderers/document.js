import { escapeHtml } from '../lib/escape-html.js';
import { resolveRoute } from '../lib/route-utils.js';
import { buildMetadata, buildStructuredData } from '../seo.js';
import { renderRoute, renderShell } from './layout.js';

function renderStructuredData(data) {
  if (!data) return '';
  const json = typeof data === 'string' ? data : JSON.stringify(data);
  return `<script type="application/ld+json">${json.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')}</script>`;
}

function renderSocialMetadata(route, metadata) {
  if (!metadata?.ogImage) return '';
  const locale = route?.locale === 'en' ? 'en' : 'id';
  const alt = locale === 'en' ? 'Rasuna Travel journey image' : 'Gambar perjalanan Rasuna Travel';

  return `<meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(metadata.title)}"><meta property="og:description" content="${escapeHtml(metadata.description)}"><meta property="og:url" content="${escapeHtml(metadata.canonical)}"><meta property="og:image" content="${escapeHtml(metadata.ogImage)}"><meta property="og:image:alt" content="${escapeHtml(alt)}"><meta property="og:locale" content="${locale === 'en' ? 'en_US' : 'id_ID'}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(metadata.title)}"><meta name="twitter:description" content="${escapeHtml(metadata.description)}"><meta name="twitter:image" content="${escapeHtml(metadata.ogImage)}"><meta name="twitter:image:alt" content="${escapeHtml(alt)}">`;
}

export function renderDocument(route, options = {}) {
  const locale = route?.locale === 'en' ? 'en' : 'id';
  const generatedMetadata = buildMetadata(route);
  const metadata = {
    ...generatedMetadata,
    ...(options.title ? { title: options.title } : {}),
    ...(options.description ? { description: options.description } : {}),
    ...(options.canonical ? { canonical: options.canonical } : {})
  };
  const canonical = metadata.canonical ?? `/${locale}/`;
  const body = options.body ?? '';
  const noScript = options.noScript ?? (locale === 'en'
    ? 'This page remains available without JavaScript. Use the links above to continue.'
    : 'Halaman ini tetap tersedia tanpa JavaScript. Gunakan tautan di atas untuk melanjutkan.');
  const styles = options.styles ?? '';
  const scripts = options.scripts ?? '';
  const alternates = (metadata.alternates ?? []).map((alternate) => `<link rel="alternate" hreflang="${escapeHtml(alternate.hreflang)}" href="${escapeHtml(alternate.href)}">`).join('');
  const structuredData = options.structuredData ?? buildStructuredData(route);

  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escapeHtml(metadata.description)}"><meta name="robots" content="${escapeHtml(metadata.robots)}"><title>${escapeHtml(metadata.title)}</title><link rel="canonical" href="${escapeHtml(canonical)}">${alternates}${renderSocialMetadata(route, { ...metadata, canonical })}${styles}${renderStructuredData(structuredData)}</head><body>${renderShell(route, { body })}<noscript><p class="noscript-message">${escapeHtml(noScript)}</p></noscript>${scripts}</body></html>`;
}

export function renderInitialDocument(pathname = '/id/') {
  const route = resolveRoute(pathname);
  const styles = INITIAL_STYLE_TAGS;
  const scripts = INITIAL_SCRIPT_TAG;

  return renderDocument(route, { body: renderRoute(route), styles, scripts });
}

export const INITIAL_STYLE_TAGS = '<link rel="stylesheet" href="/src/styles/tokens.css"><link rel="stylesheet" href="/src/styles/base.css"><link rel="stylesheet" href="/src/styles/components.css">';
export const INITIAL_SCRIPT_TAG = '<script type="module" src="/src/main.js"></script>';
