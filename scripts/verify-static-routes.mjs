import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveRoute } from '../src/lib/route-utils.js';
import { renderRoute } from '../src/renderers/layout.js';
import { publicRoutePaths } from './prerender.mjs';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT_DIR = resolve(ROOT, 'dist');

function outputFile(pathname) {
  return resolve(OUT_DIR, ...pathname.split('/').filter(Boolean), 'index.html');
}

for (const pathname of publicRoutePaths()) {
  const route = resolveRoute(pathname);
  const html = await readFile(outputFile(pathname), 'utf8');

  if (!html.includes(`<html lang="${route.locale}">`)) throw new Error(`Incorrect language document for ${pathname}`);
  if (!html.includes(`<link rel="canonical" href="${route.canonicalPath}">`)) throw new Error(`Incorrect canonical for ${pathname}`);
  if (!html.includes(`<div id="app">${renderRoute(route)}</div>`)) throw new Error(`Missing route body for ${pathname}`);
  if (html.includes('/src/')) throw new Error(`Untransformed source asset reference in ${pathname}`);
}

process.stdout.write(`Verified ${publicRoutePaths().length} prerendered route documents.\n`);
