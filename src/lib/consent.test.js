import { describe, expect, it } from 'vitest';
import {
  CONSENT_STORAGE_KEY,
  canTrack,
  hasStoredConsent,
  readConsent,
  writeConsent
} from './consent.js';

function createStorage(value = '') {
  return {
    value,
    getItem() { return this.value; },
    setItem(_key, nextValue) { this.value = nextValue; }
  };
}

describe('consent state', () => {
  it('defaults to no tracking and distinguishes an undecided visitor', () => {
    const storage = createStorage();

    expect(readConsent(storage)).toEqual({ analytics: false, marketing: false });
    expect(hasStoredConsent(storage)).toBe(false);
    expect(canTrack('analytics', readConsent(storage))).toBe(false);
    expect(canTrack('marketing', readConsent(storage))).toBe(false);
  });

  it('persists only the supported consent booleans', () => {
    const storage = createStorage();

    writeConsent(storage, { analytics: true, marketing: false, email: 'private@example.com' });

    expect(storage.getItem(CONSENT_STORAGE_KEY)).toBe('{"analytics":true,"marketing":false}');
    expect(readConsent(storage)).toEqual({ analytics: true, marketing: false });
    expect(hasStoredConsent(storage)).toBe(true);
  });

  it('rejects malformed or truthy non-boolean stored values', () => {
    const storage = createStorage('{"analytics":"yes","marketing":1}');

    expect(readConsent(storage)).toEqual({ analytics: false, marketing: false });
  });
});
