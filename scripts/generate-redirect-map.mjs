const LEGACY_REDIRECTS = Object.freeze({
  '/tentang-kami/': '/id/tentang/',
  '/layanan/': '/id/haji-umrah/',
  '/travel-tools/': '/id/travel-tools/',
  '/artikel/': '/id/artikel/',
  '/kontak/': '/id/kontak/',
  '/affiliates/': '/id/travel-tools/'
});

export function legacyRedirects() {
  return { ...LEGACY_REDIRECTS };
}

export function renderRedirects(map = legacyRedirects()) {
  return `${Object.entries(map).map(([from, to]) => `${from} ${to} 301`).join('\n')}\n`;
}

export function renderRedirectJson(map = legacyRedirects()) {
  return `${JSON.stringify(map, null, 2)}\n`;
}
