import { expect, it } from 'vitest';
import { legacyRedirects, renderRedirects } from './generate-redirect-map.mjs';

it('renders recoverable permanent redirects for old public paths', () => {
  const redirects = renderRedirects(legacyRedirects());

  expect(redirects).toContain('/tentang-kami/ /id/tentang/ 301');
  expect(redirects).toContain('/affiliates/ /id/travel-tools/ 301');
});
