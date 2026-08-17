import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GENERATED_ASSETS } from '../src/site-data.js';
import { publicRoutePaths } from './prerender.mjs';
import { renderInitialDocument } from '../src/renderers/document.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function filesIn(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? filesIn(path) : [path];
    }));
    return nested.flat();
  } catch {
    return [];
  }
}

async function referenceText() {
  const rendered = publicRoutePaths().map((pathname) => renderInitialDocument(pathname)).join('\n');
  const sourceFiles = (await Promise.all(['src', 'scripts', 'public', 'docs'].map((directory) => filesIn(join(ROOT, directory))))).flat();
  const source = await Promise.all(sourceFiles.filter((file) => !file.endsWith('.png')).map((file) => readFile(file, 'utf8').catch(() => '')));
  return `${rendered}\n${source.join('\n')}`;
}

export async function auditAssets({ root = ROOT } = {}) {
  const assetRoot = join(root, 'public', 'assets', 'generated');
  const references = await referenceText();
  const missing = [];
  const zeroByte = [];

  for (const asset of GENERATED_ASSETS) {
    const file = join(assetRoot, asset);
    try {
      const details = await stat(file);
      if (!details.isFile()) missing.push(asset);
      else if (details.size === 0) zeroByte.push(asset);
    } catch {
      missing.push(asset);
    }
  }

  const unreferenced = GENERATED_ASSETS.filter((asset) => !references.includes(asset));
  return { missing, zeroByte, unreferenced, ok: !missing.length && !zeroByte.length && !unreferenced.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await auditAssets();
  if (!result.ok) {
    process.stderr.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write(`Verified ${GENERATED_ASSETS.length} generated assets.\n`);
  }
}
