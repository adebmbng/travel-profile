import { ARTICLES, DESTINATIONS, PACKAGES, SITE_CONFIG } from '../site-data.js';
import { escapeHtml } from '../lib/escape-html.js';
import { renderBreadcrumbs, renderCardImage, renderHeroImage, renderSectionHeading, renderWhatsAppLink, routePath } from './components.js';

const COPY = Object.freeze({
  id: Object.freeze({
    packageEyebrow: 'Paket perjalanan', packagesTitle: 'Mulai dari rencana yang sesuai', packagesDescription: 'Pilihan ini adalah arahan statis. Detail perjalanan, harga, dan ketersediaan dikonfirmasi dalam konsultasi.',
    destinationEyebrow: 'Destinasi', destinationsTitle: 'Ide perjalanan untuk dibicarakan bersama', destinationsDescription: 'Gunakan halaman ini sebagai titik awal, bukan jadwal atau ketersediaan langsung.',
    from: 'Mulai dari Rp', consultPrice: 'Konsultasikan harga', guidance: 'Arahan perjalanan statis', itinerary: 'Alur perjalanan yang dapat dibahas', includes: 'Hal yang dapat dikonfirmasi', excludes: 'Hal yang perlu dibicarakan', suitable: 'Cocok untuk', preparation: 'Persiapan awal', faq: 'Pertanyaan umum', related: 'Terkait',
    itineraryText: 'Ceritakan ritme perjalanan keluarga Anda, lalu tinjau pilihan rute dan jeda yang sesuai bersama kami.', includesText: 'Pilihan transportasi, penginapan, dan kebutuhan keluarga dapat ditinjau saat konsultasi.', excludesText: 'Dokumen, persyaratan setempat, dan pengeluaran pribadi perlu dikonfirmasi sesuai rencana akhir.', suitableText: 'Keluarga atau kelompok yang ingin merencanakan perjalanan dengan percakapan yang tenang.', preparationText: 'Siapkan perkiraan waktu perjalanan, jumlah peserta, kebutuhan aksesibilitas, dan pertanyaan utama Anda.', faqText: 'Detail akhir tidak ditampilkan sebagai inventaris langsung; tanyakan melalui WhatsApp untuk membahasnya.',
    articleEyebrow: 'Bacaan perjalanan', articleTitle: 'Baca sebelum merencanakan', articleDescription: 'Catatan praktis yang akan dilengkapi dengan sumber dan peninjauan terverifikasi.', metadataPending: 'Metadata penulis, peninjau, tanggal, waktu baca, dan sumber akan diperbarui setelah terverifikasi.', sourcePending: 'Tautan sumber akan diperbarui setelah diverifikasi.', destinations: 'Lihat destinasi', packages: 'Lihat paket'
  }),
  en: Object.freeze({
    packageEyebrow: 'Travel packages', packagesTitle: 'Start with a suitable direction', packagesDescription: 'These are static guides. Trip details, price, and availability are confirmed in a consultation.',
    destinationEyebrow: 'Destinations', destinationsTitle: 'Travel ideas to discuss together', destinationsDescription: 'Use this page as a starting point, not as a live schedule or availability feed.',
    from: 'Starting from IDR', consultPrice: 'Discuss pricing', guidance: 'Static travel guidance', itinerary: 'A journey flow to discuss', includes: 'What can be confirmed', excludes: 'What to discuss', suitable: 'Suitable for', preparation: 'Early preparation', faq: 'Common questions', related: 'Related',
    itineraryText: 'Tell us your family’s travel rhythm, then review route options and suitable pauses together.', includesText: 'Transport, accommodation, and family needs can be reviewed in a consultation.', excludesText: 'Documents, local requirements, and personal spending need confirmation for the final plan.', suitableText: 'Families or groups who want to plan their trip through a calm conversation.', preparationText: 'Bring an approximate travel period, party size, accessibility needs, and your key questions.', faqText: 'Final details are not presented as live inventory; ask on WhatsApp to discuss them.',
    articleEyebrow: 'Travel reading', articleTitle: 'Read before you plan', articleDescription: 'Practical notes that will be completed with verified sources and review information.', metadataPending: 'Author, reviewer, date, reading-time, and source metadata will be updated after verification.', sourcePending: 'Source links will be added after verification.', destinations: 'View destinations', packages: 'View packages'
  })
});

function copy(locale) { return COPY[locale] ?? COPY.id; }
function label(item, locale) { return item?.labels?.[locale] ?? item?.labels?.id ?? ''; }
function packageFor(slug) { return PACKAGES.find((item) => item.slug === slug); }
function destinationFor(slug) { return DESTINATIONS.find((item) => item.slug === slug); }
function articleFor(slug) { return ARTICLES.find((item) => item.slug === slug); }

function priceLabel(item, text) {
  return item?.pricing?.mode === 'from'
    ? `${text.from} ${escapeHtml(item.pricing.value)}`
    : text.consultPrice;
}

function packageCard(item, locale) {
  const text = copy(locale);
  const name = label(item, locale);
  return `<article class="content-card catalog-card">${renderCardImage(item.cardAsset ?? item.heroAsset, name)}<div><p class="eyebrow">${escapeHtml(text.guidance)}</p><h2><a href="${escapeHtml(routePath(locale, 'package-detail', { slug: item.slug }))}">${escapeHtml(name)}</a></h2><p class="price-label">${priceLabel(item, text)}</p><p class="configuration-note">${escapeHtml(text.packagesDescription)}</p>${renderWhatsAppLink({ locale, packageName: name })}</div></article>`;
}

function relatedLinks(locale, destination) {
  const text = copy(locale);
  const packages = (destination.relatedPackageSlugs ?? []).map(packageFor).filter(Boolean)
    .map((item) => `<li><a href="${escapeHtml(routePath(locale, 'package-detail', { slug: item.slug }))}">${escapeHtml(label(item, locale))}</a></li>`).join('');
  const articles = (destination.relatedArticleSlugs ?? []).map(articleFor).filter(Boolean)
    .map((item) => `<li><a href="${escapeHtml(routePath(locale, 'article-detail', { slug: item.slug }))}">${escapeHtml(label(item, locale))}</a></li>`).join('');
  return `<section class="related-content"><h2>${escapeHtml(text.related)}</h2><div><h3>${escapeHtml(text.packages)}</h3><ul>${packages}</ul></div><div><h3>${escapeHtml(text.articleEyebrow)}</h3><ul>${articles}</ul></div></section>`;
}

function guidanceSections(locale) {
  const text = copy(locale);
  const sections = [[text.itinerary, text.itineraryText], [text.includes, text.includesText], [text.excludes, text.excludesText], [text.suitable, text.suitableText], [text.preparation, text.preparationText], [text.faq, text.faqText]];
  return `<div class="guidance-grid">${sections.map(([heading, body]) => `<section class="quiet-card"><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`).join('')}</div>`;
}

export function renderPackageDirectory({ locale = 'id', pillar } = {}) {
  const text = copy(locale);
  const items = pillar ? PACKAGES.filter((item) => item.pillar === pillar) : PACKAGES;
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.packageEyebrow, title: text.packagesTitle, description: text.packagesDescription, level: 1 })}<div class="content-grid content-grid--three">${items.map((item) => packageCard(item, locale)).join('')}</div></section>`;
}

export function renderPackageDetail({ locale = 'id', slug } = {}) {
  const item = packageFor(slug);
  const text = copy(locale);
  if (!item) return renderPackageDirectory({ locale });
  const name = label(item, locale);
  return `<div class="catalog-detail"><section class="hero hero--catalog"><div class="container hero__content"><div>${renderBreadcrumbs([{ label: text.packages, href: routePath(locale, 'packages') }, { label: name }])}${renderSectionHeading({ eyebrow: text.packageEyebrow, title: name, description: text.packagesDescription, level: 1 })}<p class="price-label price-label--hero">${priceLabel(item, text)}</p>${renderWhatsAppLink({ locale, packageName: name })}</div>${renderHeroImage({ asset: item.heroAsset, alt: name })}</div></section><section class="content-section container">${guidanceSections(locale)}</section><aside class="sticky-consultation container" aria-label="WhatsApp consultation">${renderWhatsAppLink({ locale, packageName: name })}</aside></div>`;
}

export function renderDestinationDirectory({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.destinationEyebrow, title: text.destinationsTitle, description: text.destinationsDescription, level: 1 })}<div class="content-grid content-grid--three">${DESTINATIONS.map((item) => `<article class="content-card catalog-card">${renderCardImage(item.image, label(item, locale))}<div><h2><a href="${escapeHtml(routePath(locale, 'destination-detail', { slug: item.slug }))}">${escapeHtml(label(item, locale))}</a></h2><p>${escapeHtml(text.destinationsDescription)}</p></div></article>`).join('')}</div></section>`;
}

export function renderDestinationDetail({ locale = 'id', slug } = {}) {
  const item = destinationFor(slug);
  const text = copy(locale);
  if (!item) return renderDestinationDirectory({ locale });
  const name = label(item, locale);
  return `<div class="catalog-detail"><section class="hero hero--catalog"><div class="container hero__content"><div>${renderBreadcrumbs([{ label: text.destinations, href: routePath(locale, 'destinations') }, { label: name }])}${renderSectionHeading({ eyebrow: text.destinationEyebrow, title: name, description: text.destinationsDescription, level: 1 })}${renderWhatsAppLink({ locale, journey: name })}</div>${renderHeroImage({ asset: item.image, alt: name })}</div></section><section class="content-section container"><div class="quiet-card"><h2>${escapeHtml(text.guidance)}</h2><p>${escapeHtml(text.preparationText)}</p></div>${relatedLinks(locale, item)}</section></div>`;
}

export function renderArticleDirectory({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.articleEyebrow, title: text.articleTitle, description: text.articleDescription, level: 1 })}<div class="content-grid content-grid--three">${ARTICLES.map((item) => `<article class="content-card catalog-card">${renderCardImage(item.image, label(item, locale))}<div><h2><a href="${escapeHtml(routePath(locale, 'article-detail', { slug: item.slug }))}">${escapeHtml(label(item, locale))}</a></h2><p class="configuration-note">${escapeHtml(text.metadataPending)}</p></div></article>`).join('')}</div></section>`;
}

export function renderArticleDetail({ locale = 'id', slug } = {}) {
  const item = articleFor(slug);
  const text = copy(locale);
  if (!item) return renderArticleDirectory({ locale });
  const name = label(item, locale);
  const relatedPackages = (item.relatedPackageSlugs ?? []).map(packageFor).filter(Boolean).map((entry) => `<li><a href="${escapeHtml(routePath(locale, 'package-detail', { slug: entry.slug }))}">${escapeHtml(label(entry, locale))}</a></li>`).join('');
  const metadata = item.metadata;
  return `<article class="article-page"><section class="hero hero--catalog"><div class="container hero__content"><div>${renderBreadcrumbs([{ label: text.articleEyebrow, href: routePath(locale, 'articles') }, { label: name }])}${renderSectionHeading({ eyebrow: text.articleEyebrow, title: name, description: text.articleDescription, level: 1 })}<p class="configuration-note">${escapeHtml(text.metadataPending)}</p></div>${renderHeroImage({ asset: item.image, alt: name })}</div></section><div class="content-section container article-page__body"><section><p>${escapeHtml(text.preparationText)}</p><p>${escapeHtml(text.itineraryText)}</p></section><aside class="quiet-card"><h2>${escapeHtml(text.related)}</h2><dl class="metadata-list"><dt>Author</dt><dd>${escapeHtml(metadata.author)}</dd><dt>Reviewer</dt><dd>${escapeHtml(metadata.reviewer)}</dd><dt>Published</dt><dd>${escapeHtml(metadata.publishedDate)}</dd><dt>Review date</dt><dd>${escapeHtml(metadata.reviewDate)}</dd><dt>Reading time</dt><dd>${escapeHtml(metadata.readingTime)}</dd><dt>Sources</dt><dd>${escapeHtml(metadata.sourceLinks)}</dd></dl><p>${escapeHtml(text.sourcePending)}</p><h3>${escapeHtml(text.packages)}</h3><ul>${relatedPackages}</ul></aside></div></article>`;
}
