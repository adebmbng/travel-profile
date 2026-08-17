const UTM_KEYS = Object.freeze(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']);

function providerUrl(provider) {
  return provider?.url ?? provider?.externalUrl ?? '';
}

export function getReferralState(provider, now = new Date()) {
  if (!provider || !providerUrl(provider)) return 'missing';
  if (provider.status === 'disabled') return 'disabled';

  if (provider.expiresAt) {
    const expiry = new Date(provider.expiresAt);
    if (Number.isNaN(expiry.getTime())) return 'disabled';
    if (new Date(now).getTime() >= expiry.getTime()) return 'expired';
  }

  if (provider.status && provider.status !== 'active') return 'disabled';
  return 'active';
}

function safeAttributionValue(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const clean = String(value).replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 100);
  if (!clean || clean.includes('@')) return null;
  return clean;
}

export function buildReferralLink(provider, context = {}) {
  if (getReferralState(provider, context.now ?? new Date()) !== 'active') return null;

  let url;
  try {
    url = new URL(providerUrl(provider));
  } catch {
    return null;
  }

  if (url.protocol !== 'https:') return null;

  UTM_KEYS.forEach((key) => {
    const value = safeAttributionValue(context[key]);
    if (value) url.searchParams.set(key, value);
  });

  return url.toString();
}
