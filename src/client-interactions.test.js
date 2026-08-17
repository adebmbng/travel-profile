import { describe, expect, it } from 'vitest';
import { renderConsentPanel } from './client-interactions.js';

describe('consent interface', () => {
  it('renders a localized first-visit panel with explicit choices', () => {
    const html = renderConsentPanel({ locale: 'id', preferencesOpen: false });

    expect(html).toContain('role="dialog"');
    expect(html).toContain('data-consent-action="accept"');
    expect(html).toContain('data-consent-action="reject"');
    expect(html).toContain('data-consent-action="customize"');
    expect(html).toContain('Persetujuan');
  });

  it('renders independently controllable analytics and marketing preferences', () => {
    const html = renderConsentPanel({ locale: 'en', preferencesOpen: true });

    expect(html).toContain('name="analytics"');
    expect(html).toContain('name="marketing"');
    expect(html).toContain('data-consent-action="save"');
    expect(html).toContain('Consent settings');
  });
});
