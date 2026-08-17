import { ARTICLES, SITE_CONFIG } from '../site-data.js';
import { escapeHtml } from '../lib/escape-html.js';
import { renderCardImage, renderSectionHeading, renderWhatsAppLink, routePath } from './components.js';

const COPY = Object.freeze({
  id: Object.freeze({
    localEyebrow: 'Halaman lokal', localTitle: 'Mulai dari percakapan yang sesuai kebutuhan Anda', localDescription: 'Rasuna Travel dapat membantu memulai pembicaraan perjalanan. Detail layanan setempat ditampilkan setelah terverifikasi.', verifiedDetails: 'Detail layanan terverifikasi', localNote: 'Kami tidak menampilkan alamat kantor, jam operasional, atau cakupan layanan sebelum detailnya dikonfirmasi.', articleEyebrow: 'Artikel', articleTitle: 'Bacaan sebelum perjalanan', articleDescription: 'Materi ini bersifat panduan awal dan sumbernya akan diperbarui setelah terverifikasi.'
  }),
  en: Object.freeze({
    localEyebrow: 'Local page', localTitle: 'Begin with a conversation about what you need', localDescription: 'Rasuna Travel can help begin a travel conversation. Local service details appear after verification.', verifiedDetails: 'Verified service details', localNote: 'We do not show an office address, opening hours, or service coverage before those details are confirmed.', articleEyebrow: 'Articles', articleTitle: 'Reading before your trip', articleDescription: 'This is early guidance; its sources will be updated after verification.'
  })
});

const LOCAL_PAGES = Object.freeze({
  jakarta: Object.freeze({ asset: '/assets/generated/local-jakarta.png', details: SITE_CONFIG.JAKARTA_VERIFIED_SERVICE_DETAILS, labels: Object.freeze({ id: 'Jakarta', en: 'Jakarta' }) }),
  bandung: Object.freeze({ asset: '/assets/generated/local-bandung.png', details: SITE_CONFIG.BANDUNG_VERIFIED_SERVICE_DETAILS, labels: Object.freeze({ id: 'Bandung', en: 'Bandung' }) })
});

function copy(locale) { return COPY[locale] ?? COPY.id; }
function label(item, locale) { return item.labels?.[locale] ?? item.labels?.id ?? ''; }

export function renderLocalPage({ locale = 'id', city } = {}) {
  const text = copy(locale);
  const entry = LOCAL_PAGES[city] ?? LOCAL_PAGES.jakarta;
  const cityName = label(entry, locale);
  return `<div class="local-page"><section class="page-intro container">${renderSectionHeading({ eyebrow: text.localEyebrow, title: `${text.localTitle}: ${cityName}`, description: text.localDescription, level: 1 })}<div class="local-page__grid"><div>${renderCardImage(entry.asset, locale === 'en' ? `A family planning a trip in ${cityName}` : `Keluarga merencanakan perjalanan di ${cityName}`)}</div><div class="quiet-card"><h2>${escapeHtml(text.verifiedDetails)}</h2><p class="configuration-note">${escapeHtml(entry.details)}</p><p>${escapeHtml(text.localNote)}</p>${renderWhatsAppLink({ locale, journey: cityName })}</div></div></section></div>`;
}

export function renderArticleIndex({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.articleEyebrow, title: text.articleTitle, description: text.articleDescription, level: 1 })}<div class="content-grid content-grid--three">${ARTICLES.map((article) => `<article class="content-card">${renderCardImage(article.image, label(article, locale))}<div><h2><a href="${escapeHtml(routePath(locale, 'article-detail', { slug: article.slug }))}">${escapeHtml(label(article, locale))}</a></h2><p class="configuration-note">${escapeHtml(text.articleDescription)}</p></div></article>`).join('')}</div></section>`;
}
