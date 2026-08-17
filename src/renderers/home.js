import { ARTICLES, DESTINATIONS, PACKAGES, SITE_CONFIG } from '../site-data.js';
import { escapeHtml } from '../lib/escape-html.js';
import { routePath, renderCardImage, renderHeroImage, renderSectionHeading, renderWhatsAppLink } from './components.js';
import { renderJourneyFinder } from './journey-finder.js';

const COPY = Object.freeze({
  id: Object.freeze({
    trustTitle: 'Kepercayaan dimulai dari detail yang dapat diverifikasi', trustText: 'Detail sertifikasi Umrah akan ditampilkan setelah diverifikasi sebelum peluncuran.',
    eyebrow: 'Dua perjalanan, satu panduan tepercaya', title: 'Rencanakan perjalanan yang terasa jelas sejak percakapan pertama.',
    intro: 'Rasuna Travel mendampingi keluarga Indonesia memulai Haji & Umrah dan Wisata Dunia dengan arahan yang tenang, jelas, dan ramah keluarga.',
    pilgrimage: 'Haji & Umrah', worldwide: 'Wisata Dunia', explore: 'Jelajahi',
    featured: 'Pilihan perjalanan', featuredText: 'Contoh kurasi untuk memulai percakapan—bukan ketersediaan langsung.',
    stories: 'Dua cara untuk memulai', pilgrimageStory: 'Persiapan ibadah yang menghormati ritme, kebutuhan keluarga, dan detail yang perlu dikonfirmasi.', worldwideStory: 'Jelajah dunia yang dibangun dari rasa ingin tahu, kenyamanan keluarga, dan rencana yang fleksibel.',
    why: 'Mengapa Rasuna', whyText: 'Kami memulai dari pertanyaan yang tepat, lalu membantu Anda memahami detail sebelum mengambil keputusan.',
    process: 'Proses konsultasi', processText: 'Ceritakan kebutuhan, terima arahan, lalu konfirmasi detail bersama.',
    destinations: 'Inspirasi destinasi', testimonials: 'Cerita perjalanan', testimonialText: 'Cerita pelanggan terverifikasi akan ditampilkan setelah tersedia.',
    tools: 'Travel Tools', toolsText: 'Alat perjalanan dan layanan mitra akan hadir dengan pengungkapan yang jelas.',
    articles: 'Bacaan untuk merencanakan', local: 'Mulai dari Jakarta atau Bandung', localText: 'Pilih percakapan yang paling nyaman untuk keluarga Anda. Detail layanan lokal akan diperbarui setelah terverifikasi.',
    final: 'Siap memulai dengan percakapan yang tenang?', finalText: 'Kirimkan kebutuhan awal Anda melalui WhatsApp; kami akan membantu mengarahkan langkah berikutnya.'
  }),
  en: Object.freeze({
    trustTitle: 'Trust starts with verifiable details', trustText: 'Umrah certification details will be shown after verification before launch.',
    eyebrow: 'Two journeys, one trusted guide', title: 'Plan a journey that feels clear from the first conversation.',
    intro: 'Rasuna Travel helps Indonesian families begin Hajj & Umrah and Worldwide Travel with calm, clear, family-friendly guidance.',
    pilgrimage: 'Hajj & Umrah', worldwide: 'Worldwide Travel', explore: 'Explore',
    featured: 'Journey ideas', featuredText: 'Curated examples to begin a conversation—not live availability.',
    stories: 'Two ways to begin', pilgrimageStory: 'Pilgrimage preparation that respects your pace, family needs, and the details that need confirmation.', worldwideStory: 'World discovery shaped by curiosity, family comfort, and a flexible plan.',
    why: 'Why Rasuna', whyText: 'We start with the right questions, then help you understand details before you decide.',
    process: 'Consultation process', processText: 'Share your needs, receive guidance, then confirm details together.',
    destinations: 'Destination inspiration', testimonials: 'Travel stories', testimonialText: 'Verified customer stories will appear once they are available.',
    tools: 'Travel Tools', toolsText: 'Travel tools and partner services will arrive with clear disclosures.',
    articles: 'Reading for planning', local: 'Begin in Jakarta or Bandung', localText: 'Choose the conversation that feels most convenient for your family. Local service details will be updated once verified.',
    final: 'Ready to begin with a calm conversation?', finalText: 'Send your starting needs on WhatsApp and we will help guide the next step.'
  })
});

function copy(locale) { return COPY[locale] ?? COPY.id; }
function label(item, locale) { return item.labels?.[locale] ?? item.labels?.id ?? ''; }

function renderPackageCards(locale) {
  return PACKAGES.map((item) => `<article class="content-card">${renderCardImage(item.cardAsset ?? item.heroAsset, label(item, locale))}<div><h3>${escapeHtml(label(item, locale))}</h3><p>${locale === 'en' ? 'Static journey guidance; details are confirmed in consultation.' : 'Arahan perjalanan statis; detail dikonfirmasi dalam konsultasi.'}</p>${renderWhatsAppLink({ locale, packageName: label(item, locale) })}</div></article>`).join('');
}

function bilingualPillarLabel(id, text) {
  if (id === 'pilgrimage') return `${escapeHtml(text.pilgrimage)}<span class="visually-hidden" lang="en">Hajj &amp; Umrah</span>`;
  return `${escapeHtml(text.worldwide)}<span class="visually-hidden" lang="en">Worldwide Travel</span>`;
}

export function renderHome({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<div class="home-page"><section class="trust-ribbon"><div class="container"><strong>${escapeHtml(text.trustTitle)}</strong><span>${escapeHtml(SITE_CONFIG.UMRAH_CERTIFICATION_NAME)} · ${escapeHtml(SITE_CONFIG.UMRAH_CERTIFICATION_NUMBER)} · ${escapeHtml(SITE_CONFIG.UMRAH_CERTIFICATION_ISSUER)}</span><p>${escapeHtml(text.trustText)}</p></div></section><section class="hero hero--home"><div class="container hero__content"><div>${renderSectionHeading({ eyebrow: text.eyebrow, title: text.title, description: text.intro, level: 1 })}<div class="hero__actions"><a class="button button--secondary" href="${escapeHtml(routePath(locale, 'pilgrimage-overview'))}">${bilingualPillarLabel('pilgrimage', text)}</a><a class="button button--secondary" href="${escapeHtml(routePath(locale, 'worldwide-overview'))}">${bilingualPillarLabel('worldwide', text)}</a>${renderWhatsAppLink({ locale })}</div></div>${renderHeroImage({ asset: '/assets/generated/hero-dual-journey-master.png', alt: locale === 'en' ? 'Two travel paths: a respectful pilgrimage setting and a family coastal journey' : 'Dua jalur perjalanan: suasana ziarah yang khidmat dan perjalanan keluarga di pesisir' })}</div></section>${renderJourneyFinder({ locale })}<section class="content-section container" data-reveal>${renderSectionHeading({ eyebrow: text.featured, title: text.featured, description: text.featuredText })}<div class="content-grid content-grid--four">${renderPackageCards(locale)}</div></section><section class="story-panels" data-reveal><div class="container">${renderSectionHeading({ eyebrow: text.stories, title: text.stories })}<div class="story-panels__grid"><article class="story-panel story-panel--pilgrimage"><h3>${bilingualPillarLabel('pilgrimage', text)}</h3><p>${escapeHtml(text.pilgrimageStory)}</p><a href="${escapeHtml(routePath(locale, 'pilgrimage-overview'))}">${escapeHtml(text.explore)}</a></article><article class="story-panel story-panel--worldwide"><h3>${bilingualPillarLabel('worldwide', text)}</h3><p>${escapeHtml(text.worldwideStory)}</p><a href="${escapeHtml(routePath(locale, 'worldwide-overview'))}">${escapeHtml(text.explore)}</a></article></div></div></section><section class="content-section container home-split" data-reveal><div>${renderSectionHeading({ eyebrow: text.why, title: text.why, description: text.whyText })}<ul class="check-list"><li>${locale === 'en' ? 'Family-friendly questions first' : 'Pertanyaan ramah keluarga lebih dulu'}</li><li>${locale === 'en' ? 'Clear confirmation before decisions' : 'Konfirmasi yang jelas sebelum mengambil keputusan'}</li><li>${locale === 'en' ? 'WhatsApp guidance when you need it' : 'Arahan melalui WhatsApp saat Anda membutuhkannya'}</li></ul></div><div>${renderSectionHeading({ eyebrow: text.process, title: text.process, description: text.processText })}<ol class="process-list"><li>${locale === 'en' ? 'Tell us what matters.' : 'Ceritakan hal yang penting bagi Anda.'}</li><li>${locale === 'en' ? 'Review a suitable direction.' : 'Tinjau arahan yang sesuai.'}</li><li>${locale === 'en' ? 'Confirm details before proceeding.' : 'Konfirmasi detail sebelum melanjutkan.'}</li></ol></div></section><section class="content-section container" data-reveal>${renderSectionHeading({ eyebrow: text.destinations, title: text.destinations })}<div class="content-grid content-grid--three">${DESTINATIONS.map((item) => `<article class="content-card">${renderCardImage(item.image, label(item, locale))}<h3>${escapeHtml(label(item, locale))}</h3></article>`).join('')}</div></section><section class="content-section container home-split" data-reveal><article class="quiet-card"><h2>${escapeHtml(text.testimonials)}</h2><p>${escapeHtml(text.testimonialText)}</p><p class="configuration-note">${escapeHtml(SITE_CONFIG.VERIFIED_TESTIMONIALS)}</p></article><article class="quiet-card"><h2>${escapeHtml(text.tools)}</h2><p>${escapeHtml(text.toolsText)}</p><a href="${escapeHtml(routePath(locale, 'travel-tools'))}">${escapeHtml(text.explore)}</a></article></section><section class="content-section container" data-reveal>${renderSectionHeading({ eyebrow: text.articles, title: text.articles })}<div class="content-grid">${ARTICLES.map((item) => `<article class="content-card">${renderCardImage(item.image, label(item, locale))}<h3>${escapeHtml(label(item, locale))}</h3></article>`).join('')}</div></section><section class="local-block" data-reveal><div class="container"><div>${renderSectionHeading({ eyebrow: text.local, title: text.local, description: text.localText })}</div><div class="local-block__links"><a class="button button--secondary" href="${escapeHtml(routePath(locale, 'jakarta'))}">Jakarta</a><a class="button button--secondary" href="${escapeHtml(routePath(locale, 'bandung'))}">Bandung</a></div></div></section><section class="final-cta" data-reveal><div class="container"><div><h2>${escapeHtml(text.final)}</h2><p>${escapeHtml(text.finalText)}</p></div>${renderWhatsAppLink({ locale })}</div></section></div>`;
}
