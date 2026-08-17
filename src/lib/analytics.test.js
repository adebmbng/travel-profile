import { describe, expect, it } from 'vitest';
import { captureAttribution, readAttribution, trackEvent } from './analytics.js';

describe('analytics events', () => {
  it('persists only approved UTM attribution after marketing consent', () => {
    const storage = {
      value: '',
      getItem() { return this.value; },
      setItem(_key, value) { this.value = value; }
    };

    expect(captureAttribution('?utm_source=rasuna&utm_medium=referral&email=private@example.com', storage, { marketing: false }))
      .toEqual({});
    expect(captureAttribution('?utm_source=rasuna&utm_medium=referral&email=private@example.com', storage, { marketing: true }))
      .toEqual({ utm_source: 'rasuna', utm_medium: 'referral' });
    expect(readAttribution(storage)).toEqual({ utm_source: 'rasuna', utm_medium: 'referral' });
  });

  it('does not send an event before the matching consent is granted', () => {
    const dataLayer = [];

    expect(trackEvent('page_view', { path: '/id/' }, {
      consent: { analytics: false, marketing: false },
      dataLayer
    })).toBe(false);
    expect(dataLayer).toEqual([]);
  });

  it('sends allowlisted values and deduplicates the same page event', () => {
    const dataLayer = [];
    const deps = {
      consent: { analytics: true, marketing: false },
      dataLayer,
      pagePath: '/id/'
    };

    expect(trackEvent('page_view', {
      path: '/id/',
      locale: 'id',
      email: 'private@example.com',
      message: 'private form text'
    }, deps)).toBe(true);
    expect(trackEvent('page_view', { path: '/id/' }, deps)).toBe(false);
    expect(dataLayer).toEqual([{ event: 'page_view', path: '/id/', locale: 'id' }]);
  });

  it('requires marketing consent for outbound referral events', () => {
    const dataLayer = [];

    expect(trackEvent('referral_click', { provider: 'welcome-pickups' }, {
      consent: { analytics: true, marketing: false },
      dataLayer
    })).toBe(false);
    expect(trackEvent('referral_click', { provider: 'welcome-pickups' }, {
      consent: { analytics: true, marketing: true },
      dataLayer
    })).toBe(true);
    expect(dataLayer).toEqual([{ event: 'referral_click', provider: 'welcome-pickups' }]);
  });
});
