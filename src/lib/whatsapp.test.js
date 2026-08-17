import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl } from './whatsapp.js';

describe('WhatsApp links', () => {
  it('builds a contextual URL without including private form data', () => {
    const url = buildWhatsAppUrl({
      number: '628000000000',
      locale: 'id',
      journey: 'umrah',
      packageName: 'Paket Keluarga',
      pagePath: '/id/haji-umrah/'
    });

    expect(url).toContain('https://wa.me/628000000000');
    expect(url).toContain('Paket%20Keluarga');
    expect(url).not.toContain('email');
  });

  it('returns no outbound URL for an unconfigured or invalid number', () => {
    expect(buildWhatsAppUrl({ number: 'PRIMARY_WHATSAPP_NUMBER', locale: 'id' })).toBeNull();
    expect(buildWhatsAppUrl({ number: '+1 555 123', locale: 'id' })).toBeNull();
  });
});
