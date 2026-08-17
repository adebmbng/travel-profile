import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES, DESTINATIONS, LANGUAGES, PACKAGES, SUPPORTED_ROUTES } from '../src/site-data.js';
import { INITIAL_SCRIPT_TAG, INITIAL_STYLE_TAGS, renderInitialDocument } from '../src/renderers/document.js';
import { localizedPath } from '../src/lib/route-utils.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DYNAMIC_ROUTE_ITEMS = Object.freeze({
  'package-detail': PACKAGES,
  'destination-detail': DESTINATIONS,
  'article-detail': ARTICLES
});

function routePath(locale, route, params = {}) {
  const slug = route.paths[locale].split('/').map((segment) => {
    if (!segment.startsWith(':')) return segment;
    return encodeURIComponent(String(params[segment.slice(1)] ?? ''));
  }).filter(Boolean).join('/');

  return localizedPath(locale, slug);
}

export function publicRoutePaths() {
  const paths = new Set();

  for (const locale of Object.keys(LANGUAGES)) {
    for (const route of SUPPORTED_ROUTES) {
      const items = DYNAMIC_ROUTE_ITEMS[route.key];
      if (!items) {
        paths.add(routePath(locale, route));
        continue;
      }

      for (const item of items) paths.add(routePath(locale, route, { slug: item.slug }));
    }
  }

  return [...paths].sort();
}

export function extractAssetTags(sourceHtml) {
  const styles = [...sourceHtml.matchAll(/<link\b(?=[^>]*\brel="stylesheet")[^>]*>/g)].map((match) => match[0]).join('');
  const scripts = [...sourceHtml.matchAll(/<script\b(?=[^>]*\bsrc="\/assets\/)[^>]*><\/script>/g)].map((match) => match[0]).join('');

  if (!styles || !scripts) throw new Error('Built index.html is missing transformed CSS or JavaScript asset tags.');
  return { styles, scripts };
}

export function buildStaticDocument(pathname, assets) {
  if (!assets?.styles || !assets?.scripts) throw new Error('Transformed CSS and JavaScript asset tags are required.');

  return renderInitialDocument(pathname)
    .replace(INITIAL_STYLE_TAGS, assets.styles)
    .replace(INITIAL_SCRIPT_TAG, assets.scripts);
}

function outputFile(outDir, pathname) {
  const segments = pathname.split('/').filter(Boolean);
  return resolve(outDir, ...segments, 'index.html');
}

export async function prerenderRoutes({ outDir = resolve(ROOT, 'dist'), sourceHtml } = {}) {
  const builtHtml = sourceHtml ?? await readFile(resolve(outDir, 'index.html'), 'utf8');
  const assets = extractAssetTags(builtHtml);
  const paths = publicRoutePaths();

  await Promise.all(paths.map(async (pathname) => {
    const file = outputFile(outDir, pathname);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, buildStaticDocument(pathname, assets));
  }));

  return paths;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const paths = await prerenderRoutes();
  process.stdout.write(`Prerendered ${paths.length} route documents.\n`);
}
