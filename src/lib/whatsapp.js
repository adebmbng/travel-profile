function cleanContext(value, fallback = '') {
  if (value === null || value === undefined) return fallback;
  return String(value).replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 100);
}

export function normalizeWhatsAppNumber(number) {
  if (number === null || number === undefined) return null;
  const raw = String(number).trim();
  if (!raw || /[a-z]/i.test(raw)) return null;

  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

export function buildWhatsAppUrl({ number, locale = 'id', journey, packageName, pagePath } = {}) {
  const digits = normalizeWhatsAppNumber(number);
  if (!digits) return null;

  const safeLocale = locale === 'en' ? 'en' : 'id';
  const subject = cleanContext(packageName) || cleanContext(journey) || (safeLocale === 'en' ? 'a travel plan' : 'rencana perjalanan');
  const path = cleanContext(pagePath);
  const message = safeLocale === 'en'
    ? `Hello Rasuna Travel, I would like to discuss ${subject}.${path ? ` I am viewing ${path}.` : ''}`
    : `Halo Rasuna Travel, saya ingin berdiskusi tentang ${subject}.${path ? ` Saya sedang melihat ${path}.` : ''}`;

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
