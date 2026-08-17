import { escapeHtml } from '../lib/escape-html.js';
import { resolveRoute } from '../lib/route-utils.js';
import { labelFor } from './components.js';
import { renderRoute, renderShell } from './layout.js';

function metadataFor(route, options) {
  const locale = route?.locale === 'en' ? 'en' : 'id';
  const title = options.title ?? (route?.key === 'home' ? 'Rasuna Travel' : `${labelFor(route?.key ?? 'home', locale)} | Rasuna Travel`);
  const description = options.description ?? (locale === 'en'
    ? 'Rasuna Travel helps you begin a travel conversation with verified details as they become available.'
    : 'Rasuna Travel membantu Anda memulai percakapan perjalanan dengan detail yang akan diperbarui setelah terverifikasi.');

  return { title, description };
}

function renderStructuredData(data) {
  if (!data) return '';
  const json = typeof data === 'string' ? data : JSON.stringify(data);
  return `<script type="application/ld+json">${json.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')}</script>`;
}

function renderSocialMetadata(route, metadata) {
  if (route?.key !== 'home') return '';

  const locale = route?.locale === 'en' ? 'en' : 'id';
  const image = '/assets/generated/og-home-background.png';
  const alt = locale === 'en'
    ? 'A respectful pilgrimage setting and a family coastal journey'
    : 'Suasana ziarah yang khidmat dan perjalanan keluarga di pesisir';

  return `<meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(metadata.title)}"><meta property="og:description" content="${escapeHtml(metadata.description)}"><meta property="og:image" content="${image}"><meta property="og:image:alt" content="${escapeHtml(alt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(metadata.title)}"><meta name="twitter:description" content="${escapeHtml(metadata.description)}"><meta name="twitter:image" content="${image}"><meta name="twitter:image:alt" content="${escapeHtml(alt)}">`;
}

export function renderDocument(route, options = {}) {
  const locale = route?.locale === 'en' ? 'en' : 'id';
  const metadata = metadataFor(route, options);
  const canonicalPath = route?.canonicalPath ?? `/${locale}/`;
  const canonical = options.canonical ?? canonicalPath;
  const body = options.body ?? '';
  const noScript = options.noScript ?? (locale === 'en'
    ? 'This page remains available without JavaScript. Use the links above to continue.'
    : 'Halaman ini tetap tersedia tanpa JavaScript. Gunakan tautan di atas untuk melanjutkan.');
  const styles = options.styles ?? '';
  const scripts = options.scripts ?? '';

  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escapeHtml(metadata.description)}"><title>${escapeHtml(metadata.title)}</title><link rel="canonical" href="${escapeHtml(canonical)}">${renderSocialMetadata(route, metadata)}${styles}${renderStructuredData(options.structuredData)}</head><body>${renderShell(route, { body })}<noscript><p class="noscript-message">${escapeHtml(noScript)}</p></noscript>${scripts}</body></html>`;
}

export function renderInitialDocument(pathname = '/id/') {
  const route = resolveRoute(pathname);
  const styles = INITIAL_STYLE_TAGS;
  const scripts = INITIAL_SCRIPT_TAG;

  return renderDocument(route, { body: renderRoute(route), styles, scripts });
}

export const INITIAL_STYLE_TAGS = '<link rel="stylesheet" href="/src/styles/tokens.css"><link rel="stylesheet" href="/src/styles/base.css"><link rel="stylesheet" href="/src/styles/components.css">';
export const INITIAL_SCRIPT_TAG = '<script type="module" src="/src/main.js"></script>';
