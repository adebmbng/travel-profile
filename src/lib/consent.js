export const CONSENT_STORAGE_KEY = 'rasuna-consent-v1';

const DEFAULT_CONSENT = Object.freeze({ analytics: false, marketing: false });

function resolveStorage(storage) {
  if (storage) return storage;
  return typeof globalThis !== 'undefined' ? globalThis.localStorage : undefined;
}

export function normalizeConsent(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { ...DEFAULT_CONSENT };

  return {
    analytics: value.analytics === true,
    marketing: value.marketing === true
  };
}

export function hasStoredConsent(storage) {
  const target = resolveStorage(storage);
  if (!target || typeof target.getItem !== 'function') return false;

  try {
    return Boolean(target.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return false;
  }
}

export function readConsent(storage) {
  const target = resolveStorage(storage);
  if (!target || typeof target.getItem !== 'function') return { ...DEFAULT_CONSENT };

  try {
    const raw = target.getItem(CONSENT_STORAGE_KEY);
    return raw ? normalizeConsent(JSON.parse(raw)) : { ...DEFAULT_CONSENT };
  } catch {
    return { ...DEFAULT_CONSENT };
  }
}

export function writeConsent(storage, value) {
  const consent = normalizeConsent(value);
  const target = resolveStorage(storage);

  try {
    target?.setItem?.(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage can be unavailable in private browsing or a restricted iframe.
  }

  return consent;
}

export function canTrack(category, consent) {
  if (category !== 'analytics' && category !== 'marketing') return false;
  return normalizeConsent(consent)[category] === true;
}
