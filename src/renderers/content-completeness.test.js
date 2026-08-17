import { expect, it } from 'vitest';
import { publicRoutePaths } from '../../scripts/prerender.mjs';
import { renderInitialDocument } from './document.js';

it('renders substantive, placeholder-free content for every public localized route', () => {
  for (const pathname of publicRoutePaths()) {
    const html = renderInitialDocument(pathname);
    const isEnglish = pathname.startsWith('/en/');
    expect(html, pathname).toMatch(/<h1\b/);
    expect(html, pathname).toContain(isEnglish ? 'Consult on WhatsApp' : 'Konsultasi via WhatsApp');
    expect(html, pathname).not.toMatch(/(?:SITE_CONFIG|JAKARTA_VERIFIED|BANDUNG_VERIFIED|TODO|TBD|Segera hadir|will be updated|akan diperbarui)/i);
  }
});
