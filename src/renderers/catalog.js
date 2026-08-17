import { ARTICLES, DESTINATIONS, PACKAGES } from '../site-data.js';
import { formatStartingPrice, hasStartingBenchmark } from '../lib/pricing.js';
import { escapeHtml } from '../lib/escape-html.js';
import { renderBreadcrumbs, renderCardImage, renderHeroImage, renderSectionHeading, renderWhatsAppLink, routePath } from './components.js';

const COPY = Object.freeze({
  id: Object.freeze({
    packageEyebrow: 'Paket perjalanan', packagesTitle: 'Pilih arah perjalanan untuk dibicarakan', packagesDescription: 'Setiap paket adalah gambaran awal. Benchmark harga, rute, dan ketersediaan perlu dikonfirmasi berdasarkan tanggal serta kebutuhan Anda.',
    destinationEyebrow: 'Destinasi', destinationsTitle: 'Inspirasi dengan catatan perencanaan', destinationsDescription: 'Gunakan halaman ini untuk menyusun pertanyaan, bukan sebagai jadwal atau inventaris langsung.',
    from: 'Estimasi mulai dari', unit: 'per orang', benchmark: 'Benchmark pasar', priceNote: 'Angka pembanding per orang berdasarkan contoh pasar Agustus 2026; bukan penawaran atau harga final Rasuna Travel.', finalPriceNote: 'Harga final mengikuti tanggal, kurs, peserta, rute, fasilitas, dan konfirmasi terbaru.', consultPrice: 'Konsultasikan harga', guidance: 'Arahan perjalanan', duration: 'Durasi contoh', planning: 'Catatan anggaran', highlights: 'Yang menarik untuk dibahas', itinerary: 'Alur contoh', includes: 'Yang dapat ditinjau', excludes: 'Yang perlu dikonfirmasi', suitable: 'Cocok untuk', preparation: 'Persiapan awal', faq: 'Pertanyaan umum', related: 'Terkait', planningNotes: 'Catatan perencanaan', questions: 'Pertanyaan untuk dibawa', sources: 'Sumber rujukan', viewDestination: 'Lihat destinasi', viewPackage: 'Lihat paket', packageReference: 'Lihat contoh benchmark pasar',
    articleEyebrow: 'Bacaan perjalanan', articleTitle: 'Baca sebelum menyusun rencana', articleDescription: 'Catatan praktis untuk membantu keluarga memilih ritme, menyiapkan pertanyaan, dan membandingkan detail dengan lebih tenang.', metadata: 'Detail bacaan', sourcePending: 'Sumber rujukan tercantum untuk membantu pemeriksaan lanjutan.'
  }),
  en: Object.freeze({
    packageEyebrow: 'Travel packages', packagesTitle: 'Choose a direction to discuss', packagesDescription: 'Each package is an early outline. Price benchmarks, routes, and availability need confirmation around your dates and needs.',
    destinationEyebrow: 'Destinations', destinationsTitle: 'Inspiration with planning notes', destinationsDescription: 'Use this page to shape questions, not as a live schedule or inventory feed.',
    from: 'Estimated from', unit: 'per person', benchmark: 'market benchmark', priceNote: 'A per-person comparison based on August 2026 market examples; not a Rasuna Travel offer or final price.', finalPriceNote: 'The final price follows dates, exchange rates, party size, route, inclusions, and current confirmation.', consultPrice: 'Discuss pricing', guidance: 'Travel guidance', duration: 'Example duration', planning: 'Budget note', highlights: 'Highlights to discuss', itinerary: 'Example flow', includes: 'What can be reviewed', excludes: 'What needs confirmation', suitable: 'Suitable for', preparation: 'Early preparation', faq: 'Frequently asked questions', related: 'Related', planningNotes: 'Planning notes', questions: 'Questions to bring', sources: 'Reference sources', viewDestination: 'View destination', viewPackage: 'View package', packageReference: 'See the market benchmark example',
    articleEyebrow: 'Travel reading', articleTitle: 'Read before you plan', articleDescription: 'Practical notes to help families choose a rhythm, prepare questions, and compare details with more confidence.', metadata: 'Reading details', sourcePending: 'Reference sources are listed to support further checking.'
  })
});

function copy(locale) { return COPY[locale] ?? COPY.id; }
function label(item, locale) { return item?.labels?.[locale] ?? item?.labels?.id ?? ''; }
function localized(item, field, locale) { return item?.[field]?.[locale] ?? item?.[field]?.id ?? ''; }
function packageFor(slug) { return PACKAGES.find((item) => item.slug === slug); }
function destinationFor(slug) { return DESTINATIONS.find((item) => item.slug === slug); }
function articleFor(slug) { return ARTICLES.find((item) => item.slug === slug); }

function renderList(items = [], className = 'check-list') {
  if (!items.length) return '';
  return `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

export function renderPackagePrice(item, locale = 'id') {
  const text = copy(locale);
  if (!hasStartingBenchmark(item)) return `<p class="price-label">${escapeHtml(text.consultPrice)}</p>`;
  const price = formatStartingPrice(item.pricing.value, locale);
  return `<div class="price-block"><p class="price-label"><span>${escapeHtml(text.from)}</span> <strong>${escapeHtml(price)}</strong> <span>/${escapeHtml(text.unit)}</span></p><p class="price-note">${escapeHtml(text.priceNote)}</p><p class="configuration-note">${escapeHtml(text.benchmark)} · ${escapeHtml(item.pricing.benchmarkDate)} · ${escapeHtml(text.finalPriceNote)}</p></div>`;
}

function packageCard(item, locale) {
  const text = copy(locale);
  const name = label(item, locale);
  return `<article class="content-card catalog-card">${renderCardImage(item.cardAsset ?? item.heroAsset, name)}<div><p class="eyebrow">${escapeHtml(text.guidance)}</p><h2><a href="${escapeHtml(routePath(locale, 'package-detail', { slug: item.slug }))}">${escapeHtml(name)}</a></h2><p class="catalog-card__meta">${escapeHtml(localized(item, 'duration', locale))}</p><p>${escapeHtml(localized(item, 'description', locale))}</p>${renderPackagePrice(item, locale)}${renderWhatsAppLink({ locale, packageName: name })}</div></article>`;
}

function relatedLinks(locale, destination) {
  const text = copy(locale);
  const packages = (destination.relatedPackageSlugs ?? []).map(packageFor).filter(Boolean)
    .map((item) => `<li><a href="${escapeHtml(routePath(locale, 'package-detail', { slug: item.slug }))}">${escapeHtml(label(item, locale))}</a></li>`).join('');
  const articles = (destination.relatedArticleSlugs ?? []).map(articleFor).filter(Boolean)
    .map((item) => `<li><a href="${escapeHtml(routePath(locale, 'article-detail', { slug: item.slug }))}">${escapeHtml(label(item, locale))}</a></li>`).join('');
  return `<section class="related-content"><h2>${escapeHtml(text.related)}</h2><div><h3>${escapeHtml(text.viewPackage)}</h3><ul>${packages || `<li>${escapeHtml(text.consultPrice)}</li>`}</ul></div><div><h3>${escapeHtml(text.articleEyebrow)}</h3><ul>${articles || `<li>${escapeHtml(text.articleDescription)}</li>`}</ul></div></section>`;
}

function renderPackageSections(locale, item) {
  const text = copy(locale);
  const sections = [
    [text.highlights, localized(item, 'highlights', locale)],
    [text.itinerary, localized(item, 'itinerary', locale)],
    [text.includes, localized(item, 'includes', locale)],
    [text.excludes, localized(item, 'excludes', locale)],
    [text.suitable, localized(item, 'suitableFor', locale)],
    [text.preparation, localized(item, 'preparation', locale)]
  ];
  const cards = sections.map(([heading, items]) => `<article class="quiet-card guidance-card"><h2>${escapeHtml(heading)}</h2>${renderList(items)}</article>`).join('');
  const faqs = (item.faqs?.[locale] ?? item.faqs?.id ?? []).map((faq) => `<details class="quiet-card accordion" data-accordion><summary><span role="heading" aria-level="2">${escapeHtml(faq.question)}</span></summary><p>${escapeHtml(faq.answer)}</p></details>`).join('');
  return `<div class="catalog-overview quiet-card"><p class="eyebrow">${escapeHtml(text.duration)}</p><p>${escapeHtml(localized(item, 'duration', locale))}</p><h2>${escapeHtml(text.planning)}</h2><p>${escapeHtml(localized(item, 'planning', locale))}</p></div><div class="guidance-grid">${cards}</div><section class="guidance-faq"><h2>${escapeHtml(text.faq)}</h2><div class="guidance-grid">${faqs}</div></section>`;
}

function renderReferenceLinks(item, locale) {
  const text = copy(locale);
  const references = item?.pricing?.references ?? [];
  if (!references.length) return '';
  return `<section class="reference-links"><h2>${escapeHtml(text.sources)}</h2><ul>${references.map((reference) => `<li><a href="${escapeHtml(reference.url)}" target="_blank" rel="nofollow noopener noreferrer">${escapeHtml(reference.label)}</a> <span class="configuration-note">(${escapeHtml(text.packageReference)})</span></li>`).join('')}</ul></section>`;
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
  return `<div class="catalog-detail"><section class="hero hero--catalog"><div class="container hero__content"><div>${renderBreadcrumbs([{ label: text.viewPackage, href: routePath(locale, 'packages') }, { label: name }])}${renderSectionHeading({ eyebrow: text.packageEyebrow, title: name, description: localized(item, 'description', locale), level: 1 })}${renderPackagePrice(item, locale)}${renderWhatsAppLink({ locale, packageName: name })}</div>${renderHeroImage({ asset: item.heroAsset, alt: name })}</div></section><section class="content-section container">${renderPackageSections(locale, item)}${renderReferenceLinks(item, locale)}</section><aside class="sticky-consultation container" aria-label="${locale === 'en' ? 'WhatsApp consultation' : 'Konsultasi WhatsApp'}">${renderWhatsAppLink({ locale, packageName: name })}</aside></div>`;
}

export function renderDestinationDirectory({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.destinationEyebrow, title: text.destinationsTitle, description: text.destinationsDescription, level: 1 })}<div class="content-grid content-grid--three">${DESTINATIONS.map((item) => `<article class="content-card catalog-card">${renderCardImage(item.image, label(item, locale))}<div><p class="eyebrow">${escapeHtml(text.destinationEyebrow)}</p><h2><a href="${escapeHtml(routePath(locale, 'destination-detail', { slug: item.slug }))}">${escapeHtml(label(item, locale))}</a></h2><p>${escapeHtml(localized(item, 'description', locale))}</p>${renderList((localized(item, 'highlights', locale) ?? []).slice(0, 2))}</div></article>`).join('')}</div></section>`;
}

export function renderDestinationDetail({ locale = 'id', slug } = {}) {
  const item = destinationFor(slug);
  const text = copy(locale);
  if (!item) return renderDestinationDirectory({ locale });
  const name = label(item, locale);
  const questions = localized(item, 'questions', locale) ?? [];
  return `<div class="catalog-detail"><section class="hero hero--catalog"><div class="container hero__content"><div>${renderBreadcrumbs([{ label: text.destinationEyebrow, href: routePath(locale, 'destinations') }, { label: name }])}${renderSectionHeading({ eyebrow: text.destinationEyebrow, title: name, description: localized(item, 'description', locale), level: 1 })}${renderWhatsAppLink({ locale, journey: name })}</div>${renderHeroImage({ asset: item.image, alt: name })}</div></section><section class="content-section container"><div class="guidance-grid"><article class="quiet-card guidance-card"><h2>${escapeHtml(text.highlights)}</h2>${renderList(localized(item, 'highlights', locale))}</article><article class="quiet-card guidance-card"><h2>${escapeHtml(text.planningNotes)}</h2>${renderList(localized(item, 'planningNotes', locale))}</article><article class="quiet-card guidance-card"><h2>${escapeHtml(text.questions)}</h2>${renderList(questions)}</article></div>${relatedLinks(locale, item)}</section></div>`;
}

export function renderArticleDirectory({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.articleEyebrow, title: text.articleTitle, description: text.articleDescription, level: 1 })}<div class="content-grid content-grid--three">${ARTICLES.map((item) => `<article class="content-card catalog-card">${renderCardImage(item.image, label(item, locale))}<div><p class="eyebrow">${escapeHtml(text.articleEyebrow)}</p><h2><a href="${escapeHtml(routePath(locale, 'article-detail', { slug: item.slug }))}">${escapeHtml(label(item, locale))}</a></h2><p>${escapeHtml(text.articleDescription)}</p><p class="catalog-card__meta">${escapeHtml(item.metadata.readingTime)}</p></div></article>`).join('')}</div></section>`;
}

function renderArticleSources(metadata, locale) {
  const text = copy(locale);
  return `<section class="reference-links"><h2>${escapeHtml(text.sources)}</h2><ul>${(metadata.sourceLinks ?? []).map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="nofollow noopener noreferrer">${escapeHtml(source.label)}</a></li>`).join('')}</ul><p>${escapeHtml(text.sourcePending)}</p></section>`;
}

export function renderArticleDetail({ locale = 'id', slug } = {}) {
  const item = articleFor(slug);
  const text = copy(locale);
  if (!item) return renderArticleDirectory({ locale });
  const name = label(item, locale);
  const relatedPackages = (item.relatedPackageSlugs ?? []).map(packageFor).filter(Boolean).map((entry) => `<li><a href="${escapeHtml(routePath(locale, 'package-detail', { slug: entry.slug }))}">${escapeHtml(label(entry, locale))}</a></li>`).join('');
  const metadata = item.metadata;
  const sections = item.sections?.[locale] ?? item.sections?.id ?? [];
  const body = sections.map((section) => `<section><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</section>`).join('');
  return `<article class="article-page"><section class="hero hero--catalog"><div class="container hero__content"><div>${renderBreadcrumbs([{ label: text.articleEyebrow, href: routePath(locale, 'articles') }, { label: name }])}${renderSectionHeading({ eyebrow: text.articleEyebrow, title: name, description: text.articleDescription, level: 1 })}</div>${renderHeroImage({ asset: item.image, alt: name })}</div></section><div class="content-section container article-page__body"><section>${body}</section><aside class="quiet-card"><h2>${escapeHtml(text.metadata)}</h2><dl class="metadata-list"><dt>Author</dt><dd>${escapeHtml(metadata.author)}</dd><dt>Reviewer</dt><dd>${escapeHtml(metadata.reviewer)}</dd><dt>Published</dt><dd>${escapeHtml(metadata.publishedDate)}</dd><dt>Review date</dt><dd>${escapeHtml(metadata.reviewDate)}</dd><dt>Reading time</dt><dd>${escapeHtml(metadata.readingTime)}</dd></dl>${renderArticleSources(metadata, locale)}<h3>${escapeHtml(text.viewPackage)}</h3><ul>${relatedPackages}</ul></aside></div></article>`;
}
