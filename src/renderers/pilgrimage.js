import { SITE_CONFIG } from '../site-data.js';
import { escapeHtml } from '../lib/escape-html.js';
import { routePath, renderCardImage, renderHeroImage, renderSectionHeading, renderWhatsAppLink } from './components.js';
import { renderPackageDirectory } from './catalog.js';

const COPY = Object.freeze({
  id: Object.freeze({ title: 'Haji & Umrah, dimulai dengan persiapan yang tenang', description: 'Panduan awal untuk keluarga yang ingin memahami langkah persiapan dan detail yang perlu dikonfirmasi.', overview: 'Jalur persiapan', umrah: 'Paket Umrah', preparation: 'Persiapan Umrah', hajj: 'Informasi Haji', note: 'Informasi dan layanan akan diperbarui setelah detail yang relevan terverifikasi.', hajjTitle: 'Informasi Haji', hajjText: 'Ruang informasi untuk memahami persiapan Haji dengan tenang. Kami tidak menampilkan kredensial atau kuota yang belum terverifikasi.', preparationTitle: 'Persiapan Umrah', preparationText: 'Susun pertanyaan, kebutuhan keluarga, dan detail yang ingin Anda konfirmasi sebelum perjalanan.' }),
  en: Object.freeze({ title: 'Hajj & Umrah begins with calm preparation', description: 'Starting guidance for families who want to understand preparation and the details that need confirmation.', overview: 'Preparation paths', umrah: 'Umrah Packages', preparation: 'Umrah Preparation', hajj: 'Hajj Information', note: 'Information and services will be updated when relevant details have been verified.', hajjTitle: 'Hajj Information', hajjText: 'A place to understand Hajj preparation calmly. We do not present unverified credentials or quotas.', preparationTitle: 'Umrah Preparation', preparationText: 'Gather questions, family needs, and details you would like to confirm before travelling.' })
});
function copy(locale) { return COPY[locale] ?? COPY.id; }

function renderPreparationNav(locale, text) {
  const entries = [['umrah-packages', text.umrah], ['umrah-preparation', text.preparation], ['hajj-information', text.hajj]];
  return `<nav class="path-links" aria-label="${escapeHtml(text.overview)}">${entries.map(([key, label]) => `<a class="button button--secondary" href="${escapeHtml(routePath(locale, key))}">${escapeHtml(label)}</a>`).join('')}</nav>`;
}

export function renderPilgrimageOverview({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<div class="pilgrimage-page"><section class="hero hero--pilgrimage"><div class="container hero__content"><div>${renderSectionHeading({ eyebrow: text.overview, title: text.title, description: text.description, level: 1 })}${renderPreparationNav(locale, text)}${renderWhatsAppLink({ locale, journey: text.title })}</div>${renderHeroImage({ asset: '/assets/generated/hero-umrah-master.png', mobileAsset: '/assets/generated/hero-umrah-mobile.png', alt: locale === 'en' ? 'A multigenerational Indonesian family viewing Makkah at dawn' : 'Keluarga Indonesia lintas generasi memandang Makkah saat fajar' })}</div></section><section class="content-section container calm-section" data-reveal><div>${renderSectionHeading({ title: text.umrah, description: text.note })}${renderCardImage('/assets/generated/umrah-preparation-flatlay.png', text.preparation)}</div><div>${renderSectionHeading({ title: text.hajj, description: text.note })}${renderCardImage('/assets/generated/hajj-information.png', text.hajj)}</div></section><section class="final-cta"><div class="container"><p>${escapeHtml(text.note)}</p>${renderWhatsAppLink({ locale, journey: text.title })}</div></section></div>`;
}

export function renderUmrahPackages({ locale = 'id' } = {}) {
  return renderPackageDirectory({ locale, pillar: 'pilgrimage' });
}

export function renderUmrahPreparation({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.preparation, title: text.preparationTitle, description: text.preparationText, level: 1 })}${renderCardImage('/assets/generated/umrah-preparation-flatlay.png', text.preparation)}<p class="configuration-note">${escapeHtml(SITE_CONFIG.UMRAH_CERTIFICATION_VERIFY_URL)}</p>${renderWhatsAppLink({ locale, journey: text.preparation })}</section>`;
}

export function renderHajjInformation({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.hajj, title: text.hajjTitle, description: text.hajjText, level: 1 })}${renderCardImage('/assets/generated/hajj-information.png', text.hajj)}${renderWhatsAppLink({ locale, journey: text.hajj })}</section>`;
}
