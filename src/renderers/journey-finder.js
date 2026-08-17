import { PACKAGES } from '../site-data.js';
import { escapeHtml } from '../lib/escape-html.js';
import { renderWhatsAppLink } from './components.js';
import { renderPackagePrice } from './catalog.js';

const COPY = Object.freeze({
  id: Object.freeze({
    eyebrow: 'Pencari perjalanan',
    title: 'Mulai dari kebutuhan keluarga Anda',
    description: 'Jawab beberapa pilihan sederhana untuk melihat arahan dari konten statis kami.',
    pillar: 'Jenis perjalanan', pilgrimage: 'Haji & Umrah', worldwide: 'Wisata Dunia',
    group: 'Siapa yang bepergian?', family: 'Keluarga', couple: 'Berdua', solo: 'Sendiri', groupTravel: 'Grup',
    period: 'Periode perkiraan', anytime: 'Masih fleksibel', near: 'Dalam beberapa bulan', later: 'Tahun ini atau berikutnya',
    budget: 'Kisaran anggaran', mid: 'Menengah', flexible: 'Fleksibel', consultation: 'Perlu dibicarakan',
    submit: 'Lihat arahan perjalanan', guidance: 'Hasil ini adalah arahan dari konten statis, bukan ketersediaan, jadwal, atau harga langsung.',
    recommendation: 'Arahan untuk Anda', noMatch: 'Mari bicarakan kebutuhan perjalanan Anda agar detail yang tepat dapat dikonfirmasi.',
    staticPackage: 'Pilihan ini adalah contoh kurasi statis; detail dan harga perlu dikonfirmasi dalam konsultasi.'
  }),
  en: Object.freeze({
    eyebrow: 'Journey finder', title: 'Start with your family’s needs',
    description: 'Answer a few simple choices for guidance based on our static content.',
    pillar: 'Journey type', pilgrimage: 'Hajj & Umrah', worldwide: 'Worldwide Travel',
    group: 'Who is travelling?', family: 'Family', couple: 'Couple', solo: 'Solo', groupTravel: 'Group',
    period: 'Approximate period', anytime: 'Still flexible', near: 'Within a few months', later: 'This year or next',
    budget: 'Budget range', mid: 'Mid-range', flexible: 'Flexible', consultation: 'Need to discuss',
    submit: 'See journey guidance', guidance: 'These results are guidance from static content, not live availability, schedules, or pricing.',
    recommendation: 'A direction for you', noMatch: 'Let’s discuss your travel needs so the right details can be confirmed.',
    staticPackage: 'This is a curated static example; details and pricing need to be confirmed in a consultation.'
  })
});

function copy(locale) {
  return COPY[locale] ?? COPY.id;
}

function packageFor(input, packages) {
  const pillar = input?.pillar;
  const group = input?.group;
  if (pillar === 'worldwide' && group === 'family') return packages.find((item) => item.slug === 'family-lake-escape');
  if (pillar === 'worldwide' && group === 'couple') return packages.find((item) => item.slug === 'coastal-couple-journey');
  if (pillar === 'worldwide' && group === 'solo') return packages.find((item) => item.slug === 'mountain-rail-discovery');
  if (pillar === 'pilgrimage' && group !== 'group') return packages.find((item) => item.slug === 'family-umrah-guidance');
  return undefined;
}

export function recommendJourney(input = {}, data = {}) {
  const packages = Array.isArray(data.packages) ? data.packages : PACKAGES;
  const selected = packageFor(input, packages);
  const context = input?.pillar === 'pilgrimage' ? 'Hajj & Umrah guidance' : 'worldwide travel guidance';

  if (!selected) return { type: 'consultation', whatsappContext: context };
  return { type: 'package', slug: selected.slug, whatsappContext: selected.labels?.id ?? context };
}

export function renderJourneyRecommendation({ locale = 'id', result } = {}) {
  const text = copy(locale);
  if (!result || result.type === 'consultation') {
    return `<section class="journey-result" aria-live="polite"><h3>${escapeHtml(text.recommendation)}</h3><p>${escapeHtml(text.noMatch)}</p>${renderWhatsAppLink({ locale, journey: result?.whatsappContext })}</section>`;
  }

  const selected = PACKAGES.find((item) => item.slug === result.slug);
  const name = selected?.labels?.[locale] ?? selected?.labels?.id ?? result.slug;
  return `<section class="journey-result" aria-live="polite"><h3>${escapeHtml(text.recommendation)}</h3><p><strong>${escapeHtml(name)}</strong></p>${selected ? renderPackagePrice(selected, locale) : ''}<p>${escapeHtml(text.staticPackage)}</p>${renderWhatsAppLink({ locale, packageName: name })}</section>`;
}

export function renderJourneyFinder({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<section class="journey-finder container" aria-labelledby="journey-finder-title" data-reveal><div class="journey-finder__intro"><p class="eyebrow">${escapeHtml(text.eyebrow)}</p><h2 id="journey-finder-title">${escapeHtml(text.title)}</h2><p>${escapeHtml(text.description)}</p></div><form class="journey-finder__form" data-journey-finder novalidate><fieldset><legend>${escapeHtml(text.pillar)}</legend><label><input type="radio" name="pillar" value="pilgrimage" required> ${escapeHtml(text.pilgrimage)}</label><label><input type="radio" name="pillar" value="worldwide" checked> ${escapeHtml(text.worldwide)}</label></fieldset><label>${escapeHtml(text.group)}<select name="group"><option value="family">${escapeHtml(text.family)}</option><option value="couple">${escapeHtml(text.couple)}</option><option value="solo">${escapeHtml(text.solo)}</option><option value="group">${escapeHtml(text.groupTravel)}</option></select></label><label>${escapeHtml(text.period)}<select name="period"><option value="anytime">${escapeHtml(text.anytime)}</option><option value="near">${escapeHtml(text.near)}</option><option value="later">${escapeHtml(text.later)}</option></select></label><label>${escapeHtml(text.budget)}<select name="budget"><option value="mid">${escapeHtml(text.mid)}</option><option value="flexible">${escapeHtml(text.flexible)}</option><option value="consultation">${escapeHtml(text.consultation)}</option></select></label><button class="button button--primary" type="submit">${escapeHtml(text.submit)}</button></form><p class="journey-finder__notice">${escapeHtml(text.guidance)}</p><div data-journey-result></div></section>`;
}
