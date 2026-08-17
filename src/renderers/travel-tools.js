import { REFERRAL_PROVIDERS } from '../site-data.js';
import { escapeHtml } from '../lib/escape-html.js';
import { buildReferralLink } from '../lib/referrals.js';
import { renderCardImage, renderSectionHeading, renderWhatsAppLink, routePath } from './components.js';

const COPY = Object.freeze({
  id: Object.freeze({ eyebrow: 'Travel Tools', title: 'Alat perjalanan yang dipilih dengan jelas', description: 'Gunakan layanan pihak ketiga hanya setelah meninjau syaratnya. Rasuna Travel tidak mengoperasikan layanan eksternal ini.', transfer: 'Antar-jemput bandara', affiliate: 'Tautan ini adalah tautan affiliate melalui Travelpayouts. Rasuna Travel dapat menerima komisi tanpa biaya tambahan bagi Anda.', external: 'Anda akan membuka situs eksternal untuk memeriksa dan menyelesaikan pemesanan. Syarat, harga, dan layanan ditentukan oleh penyedia eksternal.', open: 'Buka Welcome Pickups', fallback: 'Ingin membahas pilihan terlebih dahulu?', soon: 'Segera hadir', categories: ['Penerbangan', 'Hotel', 'Aktivitas', 'Asuransi', 'Visa', 'Transportasi', 'Konektivitas', 'Kebutuhan perjalanan'] }),
  en: Object.freeze({ eyebrow: 'Travel Tools', title: 'Travel tools selected transparently', description: 'Use third-party services only after reviewing their terms. Rasuna Travel does not operate these external services.', transfer: 'Airport transfer', affiliate: 'This is an affiliate link through Travelpayouts. Rasuna Travel may earn a commission at no additional cost to you.', external: 'You will open an external site to check and complete a booking. Terms, pricing, and service are set by the external provider.', open: 'Open Welcome Pickups', fallback: 'Would you like to discuss options first?', soon: 'Coming soon', categories: ['Flights', 'Hotels', 'Activities', 'Insurance', 'Visa', 'Transport', 'Connectivity', 'Travel essentials'] })
});

function copy(locale) { return COPY[locale] ?? COPY.id; }

export function renderTravelTools({ locale = 'id' } = {}) {
  const text = copy(locale);
  const provider = REFERRAL_PROVIDERS[0];
  const referralUrl = buildReferralLink(provider, {});
  const referralAction = referralUrl
    ? `<a class="button button--secondary" href="${escapeHtml(referralUrl)}" target="_blank" rel="sponsored nofollow noopener noreferrer" data-referral-provider="welcome-pickups">${escapeHtml(text.open)} <span class="visually-hidden">(${locale === 'en' ? 'opens external website' : 'membuka situs eksternal'})</span></a>`
    : `<span class="configuration-note">${escapeHtml(text.soon)}</span>`;

  return `<div class="travel-tools"><section class="page-intro container">${renderSectionHeading({ eyebrow: text.eyebrow, title: text.title, description: text.description, level: 1 })}<div class="travel-tools__grid"><article class="content-card referral-card">${renderCardImage('/assets/generated/referral-airport-transfer.png', text.transfer)}<div><p class="eyebrow">${escapeHtml(text.transfer)}</p><h2>${escapeHtml(provider.name)}</h2><p>${escapeHtml(text.affiliate)}</p><p class="external-warning">${escapeHtml(text.external)}</p>${referralAction}<p class="configuration-note">Travelpayouts · marker ${escapeHtml(provider.marker)} · campaign ${escapeHtml(provider.campaignId)} · promo ${escapeHtml(provider.promoId)}</p></div></article><section class="quiet-card travel-tools__fallback"><h2>${escapeHtml(text.fallback)}</h2>${renderWhatsAppLink({ locale, journey: text.eyebrow })}<a href="${escapeHtml(routePath(locale, 'affiliate-disclosure'))}">${locale === 'en' ? 'Read affiliate disclosure' : 'Baca pengungkapan afiliasi'}</a></section></div></section><section class="content-section container"><h2>${locale === 'en' ? 'More categories' : 'Kategori lainnya'}</h2><div class="content-grid content-grid--four">${text.categories.map((category) => `<article class="future-tool" aria-label="${escapeHtml(category)}: ${escapeHtml(text.soon)}"><h3>${escapeHtml(category)}</h3><span>${escapeHtml(text.soon)}</span><button type="button" disabled aria-disabled="true">${escapeHtml(text.soon)}</button></article>`).join('')}</div></section></div>`;
}
