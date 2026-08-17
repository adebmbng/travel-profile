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

const SUPPORT_COPY = Object.freeze({
  id: Object.freeze({
    customEyebrow: 'Perjalanan kustom', customTitle: 'Bentuk rencana yang mengikuti kebutuhan Anda', customDescription: 'Mulai dari waktu, tujuan, ritme kelompok, dan hal-hal yang penting untuk dibicarakan bersama.',
    groupEyebrow: 'Keluarga & grup', groupTitle: 'Perjalanan yang memberi ruang untuk setiap generasi', groupDescription: 'Rencanakan perjalanan bersama dengan perhatian pada jeda, kenyamanan, dan kebutuhan aksesibilitas.',
    aboutEyebrow: 'Tentang Rasuna', aboutTitle: 'Panduan manusiawi untuk dua jalur perjalanan', aboutDescription: 'Rasuna Travel membantu keluarga Indonesia memulai percakapan tentang Haji & Umrah dan Wisata Dunia.',
    whyEyebrow: 'Mengapa Rasuna', whyTitle: 'Mulai dengan pertanyaan yang tepat', whyDescription: 'Kami membantu Anda memahami pilihan sebelum detail akhir dikonfirmasi.',
    faqEyebrow: 'Pertanyaan umum', faqTitle: 'Jawaban awal sebelum percakapan', faqDescription: 'Gunakan jawaban ini sebagai orientasi; detail perjalanan akhir tetap perlu dikonfirmasi.',
    contactEyebrow: 'Kontak', contactTitle: 'Mari mulai dari kebutuhan Anda', contactDescription: 'Kirimkan konteks awal melalui kanal yang tersedia agar percakapan berikutnya lebih terarah.',
    share: 'Hal yang dapat Anda siapkan', next: 'Langkah berikutnya', process: 'Proses yang jelas', questions: ['Kapan kira-kira ingin berangkat?', 'Siapa saja yang akan ikut?', 'Apa kebutuhan kenyamanan atau aksesibilitas yang perlu diperhatikan?'], answers: ['Situs ini memberi arahan statis, bukan ketersediaan langsung.', 'Harga, jadwal, dokumen, dan layanan akan dikonfirmasi bersama sebelum keputusan.', 'Anda dapat memulai dari pertanyaan sederhana melalui WhatsApp atau halaman kontak.'], consult: 'Konsultasi via WhatsApp'
  }),
  en: Object.freeze({
    customEyebrow: 'Custom trip', customTitle: 'Shape a plan around what matters to you', customDescription: 'Begin with timing, destinations, group rhythm, and the details you want to discuss together.',
    groupEyebrow: 'Family & group', groupTitle: 'A journey with room for every generation', groupDescription: 'Plan together with attention to pauses, comfort, and accessibility needs.',
    aboutEyebrow: 'About Rasuna', aboutTitle: 'Human guidance for two travel paths', aboutDescription: 'Rasuna Travel helps Indonesian families begin conversations about Hajj & Umrah and Worldwide Travel.',
    whyEyebrow: 'Why Rasuna', whyTitle: 'Start with the right questions', whyDescription: 'We help you understand the options before final details are confirmed.',
    faqEyebrow: 'Frequently asked questions', faqTitle: 'Early answers before a conversation', faqDescription: 'Use these answers as orientation; final travel details still need confirmation.',
    contactEyebrow: 'Contact', contactTitle: 'Let’s begin with what you need', contactDescription: 'Share initial context through the available channel so the next conversation can be more focused.',
    share: 'What you can prepare', next: 'What happens next', process: 'A clear process', questions: ['When are you approximately hoping to travel?', 'Who will be travelling with you?', 'Which comfort or accessibility needs should we consider?'], answers: ['This site provides static guidance, not live availability.', 'Pricing, schedules, documents, and services are confirmed together before a decision.', 'You can begin with a simple question through WhatsApp or the contact page.'], consult: 'Consult on WhatsApp'
  })
});

function supportCopy(locale) { return SUPPORT_COPY[locale] ?? SUPPORT_COPY.id; }

function renderSupportHero({ locale, eyebrow, title, description, asset, context }) {
  return `<section class="hero hero--catalog"${context ? ` data-journey-context="${escapeHtml(context)}"` : ''}><div class="container hero__content"><div>${renderSectionHeading({ eyebrow, title, description, level: 1 })}${renderWhatsAppLink({ locale, journey: title })}</div>${renderCardImage(asset, locale === 'en' ? `${title}` : title)}</div></section>`;
}

function renderSupportCards(locale, text) {
  return `<section class="content-section container support-page__grid"><article class="quiet-card"><h2>${escapeHtml(text.share)}</h2><ul class="check-list">${text.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join('')}</ul></article><article class="quiet-card"><h2>${escapeHtml(text.next)}</h2><ol class="process-list">${text.answers.map((answer) => `<li>${escapeHtml(answer)}</li>`).join('')}</ol></article></section>`;
}

export function renderCustomTrip({ locale = 'id' } = {}) {
  const text = supportCopy(locale);
  return `<div class="support-page">${renderSupportHero({ locale, eyebrow: text.customEyebrow, title: text.customTitle, description: text.customDescription, asset: '/assets/generated/consultation-scene.png', context: 'custom-trip' })}${renderSupportCards(locale, text)}<section class="final-cta"><div class="container"><p>${escapeHtml(text.customDescription)}</p>${renderWhatsAppLink({ locale, journey: text.customEyebrow })}</div></section></div>`;
}

export function renderFamilyGroup({ locale = 'id' } = {}) {
  const text = supportCopy(locale);
  return `<div class="support-page">${renderSupportHero({ locale, eyebrow: text.groupEyebrow, title: text.groupTitle, description: text.groupDescription, asset: '/assets/generated/family-group-travel.png', context: 'family-group' })}${renderSupportCards(locale, text)}<section class="content-section container"><div class="quiet-card"><h2>${escapeHtml(text.process)}</h2><p>${escapeHtml(text.groupDescription)}</p>${renderWhatsAppLink({ locale, journey: text.groupEyebrow })}</div></section></div>`;
}

export function renderAbout({ locale = 'id' } = {}) {
  const text = supportCopy(locale);
  return `<div class="support-page">${renderSupportHero({ locale, eyebrow: text.aboutEyebrow, title: text.aboutTitle, description: text.aboutDescription, asset: '/assets/generated/consultation-scene.png', context: 'about' })}${renderSupportCards(locale, text)}<section class="content-section container"><div class="quiet-card"><h2>${escapeHtml(text.process)}</h2><p>${escapeHtml(text.aboutDescription)}</p></div></section></div>`;
}

export function renderWhyRasuna({ locale = 'id' } = {}) {
  const text = supportCopy(locale);
  return `<div class="support-page">${renderSupportHero({ locale, eyebrow: text.whyEyebrow, title: text.whyTitle, description: text.whyDescription, asset: '/assets/generated/route-map-texture.png', context: 'why-rasuna' })}${renderSupportCards(locale, text)}<section class="content-section container"><div class="content-grid content-grid--three"><article class="quiet-card"><h2>${escapeHtml(text.questions[0])}</h2><p>${escapeHtml(text.answers[0])}</p></article><article class="quiet-card"><h2>${escapeHtml(text.questions[1])}</h2><p>${escapeHtml(text.answers[1])}</p></article><article class="quiet-card"><h2>${escapeHtml(text.questions[2])}</h2><p>${escapeHtml(text.answers[2])}</p></article></div></section></div>`;
}

export function renderFaq({ locale = 'id' } = {}) {
  const text = supportCopy(locale);
  return `<div class="support-page"><section class="page-intro container">${renderSectionHeading({ eyebrow: text.faqEyebrow, title: text.faqTitle, description: text.faqDescription, level: 1 })}<div class="guidance-grid">${text.questions.map((question, index) => `<details class="quiet-card accordion" data-accordion><summary><span role="heading" aria-level="2">${escapeHtml(question)}</span></summary><p>${escapeHtml(text.answers[index])}</p></details>`).join('')}</div></section></div>`;
}

export function renderContact({ locale = 'id' } = {}) {
  const text = supportCopy(locale);
  return `<div class="support-page">${renderSupportHero({ locale, eyebrow: text.contactEyebrow, title: text.contactTitle, description: text.contactDescription, asset: '/assets/generated/consultation-scene.png', context: 'contact' })}<section class="content-section container"><div class="quiet-card"><h2>${escapeHtml(text.next)}</h2><p>${escapeHtml(text.contactDescription)}</p>${renderWhatsAppLink({ locale, journey: text.contactEyebrow })}</div></section></div>`;
}
