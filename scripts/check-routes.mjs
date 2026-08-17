import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildMetadata } from '../src/seo.js';
import { resolveRoute } from '../src/lib/route-utils.js';
import { publicRoutePaths } from './prerender.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'dist');

function outputFile(outDir, pathname) {
  return resolve(outDir, ...pathname.split('/').filter(Boolean), 'index.html');
}

function firstMatch(pattern, html) {
  return html.match(pattern)?.[1] ?? '';
}

export function auditAccessibilityDocument(html, pathname = '/') {
  const issues = [];
  if (!/<html\b[^>]*\blang="(?:id|en)"/i.test(html)) issues.push('missing-lang');
  if (!/<a\b[^>]*class="[^"]*skip-link[^"]*"[^>]*href="#main-content"/i.test(html)) issues.push('missing-skip-link');
  if (!/<main\b[^>]*\bid="main-content"/i.test(html)) issues.push('missing-main');
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) issues.push('invalid-h1-count');

  const images = html.match(/<img\b[^>]*>/gi) ?? [];
  if (images.some((image) => !/\balt="[^"]*"/i.test(image))) issues.push('image-missing-alt');

  const buttons = html.match(/<button\b[^>]*>/gi) ?? [];
  if (buttons.some((button) => !/\btype="(?:button|submit|reset)"/i.test(button))) issues.push('button-missing-type');
  if (html.includes('href=""')) issues.push('empty-href');

  const ids = [...html.matchAll(/\bid="([^"]+)"/gi)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) issues.push('duplicate-id');
  return issues;
}

export async function auditRoutes({ outDir = OUT_DIR } = {}) {
  const missing = [];
  const invalidCanonical = [];
  const duplicateCanonical = [];
  const missingAlternates = [];
  const accessibility = [];
  const canonicalOwners = new Map();

  for (const pathname of publicRoutePaths()) {
    const file = outputFile(outDir, pathname);
    let html;
    try {
      html = await readFile(file, 'utf8');
    } catch {
      missing.push(pathname);
      continue;
    }

    const route = resolveRoute(pathname);
    const metadata = buildMetadata(route);
    const canonical = firstMatch(/<link\s+rel="canonical"\s+href="([^"]+)"/i, html);
    if (canonical !== metadata.canonical) invalidCanonical.push(pathname);
    if (canonicalOwners.has(canonical)) duplicateCanonical.push(`${canonicalOwners.get(canonical)} <> ${pathname}`);
    else canonicalOwners.set(canonical, pathname);

    for (const locale of ['id', 'en']) {
      if (!new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${locale}"`, 'i').test(html)) {
        missingAlternates.push(`${pathname}:${locale}`);
      }
    }
    accessibility.push(...auditAccessibilityDocument(html, pathname).map((issue) => `${pathname}:${issue}`));
  }

  const artifacts = ['sitemap.xml', 'robots.txt', 'redirects.json', '_redirects', '.well-known/security.txt'];
  const missingArtifacts = [];
  for (const artifact of artifacts) {
    try {
      const details = await stat(resolve(outDir, artifact));
      if (!details.isFile() || details.size === 0) missingArtifacts.push(artifact);
    } catch {
      missingArtifacts.push(artifact);
    }
  }

  return {
    missing,
    invalidCanonical,
    duplicateCanonical,
    missingAlternates,
    accessibility,
    missingArtifacts,
    ok: !missing.length && !invalidCanonical.length && !duplicateCanonical.length && !missingAlternates.length && !accessibility.length && !missingArtifacts.length
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await auditRoutes();
  if (!result.ok) {
    process.stderr.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write(`Verified ${publicRoutePaths().length} localized route documents and SEO artifacts.\n`);
  }
}
