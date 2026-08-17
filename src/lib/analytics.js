import { canTrack, readConsent } from './consent.js';

export const EVENT_CATEGORIES = Object.freeze({
  page_view: 'analytics',
  cta_click: 'analytics',
  whatsapp_click: 'analytics',
  journey_finder_submit: 'analytics',
  referral_click: 'marketing'
});

const ALLOWED_EVENT_NAMES = new Set(Object.keys(EVENT_CATEGORIES));
const ALLOWED_EVENT_KEYS = new Set([
  'path', 'locale', 'routeKey', 'type', 'journey', 'packageName', 'pillar', 'group',
  'period', 'budget', 'provider', 'category'
]);
const seenPageEvents = new Set();

function safeValue(value) {
  if (typeof value === 'boolean' || typeof value === 'number') return value;
  if (typeof value !== 'string') return undefined;

  const clean = value.replace(/[\u0000-\u001f\u007f]/g, '').trim();
  return clean ? clean.slice(0, 120) : undefined;
}

export function sanitizeEventParams(params = {}) {
  if (!params || typeof params !== 'object' || Array.isArray(params)) return {};

  return Object.entries(params).reduce((result, [key, value]) => {
    if (!ALLOWED_EVENT_KEYS.has(key)) return result;
    const safe = safeValue(value);
    if (safe !== undefined) result[key] = safe;
    return result;
  }, {});
}

function eventTarget(deps = {}) {
  if (deps.dataLayer && typeof deps.dataLayer.push === 'function') return deps.dataLayer;
  if (typeof globalThis !== 'undefined' && globalThis.dataLayer && typeof globalThis.dataLayer.push === 'function') {
    return globalThis.dataLayer;
  }
  return null;
}

export function trackEvent(name, params = {}, deps = {}) {
  if (!ALLOWED_EVENT_NAMES.has(name)) return false;

  const category = deps.category ?? EVENT_CATEGORIES[name];
  const consent = deps.consent ?? readConsent(deps.storage);
  if (!canTrack(category, consent)) return false;

  const cleanParams = sanitizeEventParams(params);
  const pageKey = name === 'page_view'
    ? `${name}:${cleanParams.path ?? deps.pagePath ?? ''}`
    : '';
  const seen = deps.seenEvents ?? seenPageEvents;
  if (pageKey && seen.has(pageKey)) return false;

  const target = eventTarget(deps);
  if (!target && typeof deps.gtag !== 'function') return false;

  const event = { event: name, ...cleanParams };
  if (target) target.push(event);
  if (typeof deps.gtag === 'function') deps.gtag('event', name, cleanParams);
  if (pageKey) seen.add(pageKey);
  return true;
}
