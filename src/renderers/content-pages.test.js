import { describe, expect, it } from 'vitest';
import {
  renderAbout,
  renderContact,
  renderCustomTrip,
  renderFamilyGroup,
  renderFaq,
  renderWhyRasuna
} from './content-pages.js';

describe('supporting content pages', () => {
  it('renders a custom-trip consultation path with no live-booking claim', () => {
    const html = renderCustomTrip({ locale: 'id' });

    expect(html).toContain('Perjalanan kustom');
    expect(html).toContain('data-journey-context="custom-trip"');
    expect(html).not.toContain('Pesan sekarang');
  });

  it('renders family and group guidance with the approved asset', () => {
    expect(renderFamilyGroup({ locale: 'en' })).toContain('family-group-travel.png');
  });

  it('renders about, why, FAQ, and contact routes as distinct bodies', () => {
    expect(renderAbout({ locale: 'id' })).toContain('Tentang Rasuna');
    expect(renderWhyRasuna({ locale: 'en' })).toContain('Why Rasuna');
    expect(renderFaq({ locale: 'id' })).toContain('<details');
    expect(renderContact({ locale: 'en' })).toContain('Consult on WhatsApp');
  });
});
