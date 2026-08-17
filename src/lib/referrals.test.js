import { describe, expect, it } from 'vitest';
import { buildReferralLink, getReferralState } from './referrals.js';

describe('referral safety', () => {
  it('rejects unsafe protocols and expired providers', () => {
    expect(buildReferralLink({ url: 'javascript:alert(1)', status: 'active' }, {})).toBeNull();
    expect(getReferralState({ url: 'https://example.com', status: 'active', expiresAt: '2020-01-01' }, new Date('2026-08-17'))).toBe('expired');
  });

  it('preserves only approved attribution parameters on an active HTTPS link', () => {
    const url = buildReferralLink({ url: 'https://example.com/transfer?marker=641087', status: 'active' }, {
      utm_source: 'rasuna',
      utm_medium: 'referral',
      utm_campaign: 'travel-tools',
      email: 'private@example.com'
    });

    expect(url).toContain('marker=641087');
    expect(url).toContain('utm_source=rasuna');
    expect(url).toContain('utm_medium=referral');
    expect(url).toContain('utm_campaign=travel-tools');
    expect(url).not.toContain('email');
  });

  it('reports missing and disabled providers without creating a link', () => {
    expect(getReferralState(null, new Date('2026-08-17'))).toBe('missing');
    expect(getReferralState({ status: 'disabled', url: 'https://example.com' }, new Date('2026-08-17'))).toBe('disabled');
    expect(buildReferralLink({ status: 'disabled', url: 'https://example.com' }, {})).toBeNull();
  });
});
