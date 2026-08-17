import { escapeHtml } from '../lib/escape-html.js';
import { routePath, renderCardImage, renderHeroImage, renderSectionHeading, renderWhatsAppLink } from './components.js';
import { renderPackageDirectory } from './catalog.js';

const COPY = Object.freeze({
  id: Object.freeze({
    title: 'Haji & Umrah, dimulai dengan persiapan yang tenang', description: 'Panduan awal untuk keluarga yang ingin menyusun pertanyaan, kebutuhan, dan pemeriksaan penting sebelum memilih program.', overview: 'Jalur persiapan', umrah: 'Paket Umrah', preparation: 'Persiapan Umrah', hajj: 'Informasi Haji', note: 'Halaman ini adalah panduan awal. Jadwal, legalitas penyelenggara, layanan, dan biaya harus diperiksa sebelum keputusan atau pembayaran.', hajjTitle: 'Informasi Haji', hajjText: 'Mulai dengan memahami jalur resmi, dokumen, waktu tunggu, dan pertanyaan yang perlu diajukan. Kami tidak menampilkan kuota atau kredensial yang belum diverifikasi.', preparationTitle: 'Persiapan Umrah', preparationText: 'Susun kebutuhan ibadah, kesehatan, mobilitas, dokumen, dan pertanyaan layanan agar konsultasi lebih terarah.', checklist: 'Yang dapat disiapkan', questions: 'Pertanyaan sebelum mendaftar', family: 'Kebutuhan lintas generasi', familyText: 'Anak, lansia, dan peserta dengan kebutuhan mobilitas memerlukan jeda, kamar, makanan, dan pendampingan yang dibicarakan sejak awal.', consult: 'Mulai percakapan persiapan', verify: 'Pemeriksaan sebelum pembayaran', verifyText: 'Minta penjelasan tertulis tentang izin penyelenggara, program, penerbangan, hotel, visa, komponen harga, dan kebijakan pembatalan.'
  }),
  en: Object.freeze({
    title: 'Hajj & Umrah begins with calm preparation', description: 'Early guidance for families shaping questions, needs, and essential checks before choosing a programme.', overview: 'Preparation paths', umrah: 'Umrah Packages', preparation: 'Umrah Preparation', hajj: 'Hajj Information', note: 'This page is early guidance. Organizer credentials, schedules, services, and costs need checking before a decision or payment.', hajjTitle: 'Hajj Information', hajjText: 'Begin by understanding official pathways, documents, waiting periods, and the questions to ask. We do not present unverified quotas or credentials.', preparationTitle: 'Umrah Preparation', preparationText: 'Organize worship, health, mobility, document, and service questions so a consultation can be more focused.', checklist: 'What to prepare', questions: 'Questions before registration', family: 'Multigenerational needs', familyText: 'Children, older travellers, and people with mobility needs require pauses, rooms, food, and guidance to discuss early.', consult: 'Begin a preparation conversation', verify: 'Checks before payment', verifyText: 'Ask for written information about organizer credentials, programme, flights, hotels, visa, price components, and cancellation policy.'
  })
});

function copy(locale) { return COPY[locale] ?? COPY.id; }

function list(items) {
  return `<ul class="check-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderPreparationNav(locale, text) {
  const entries = [['umrah-packages', text.umrah], ['umrah-preparation', text.preparation], ['hajj-information', text.hajj]];
  return `<nav class="path-links" aria-label="${escapeHtml(text.overview)}">${entries.map(([key, label]) => `<a class="button button--secondary" href="${escapeHtml(routePath(locale, key))}">${escapeHtml(label)}</a>`).join('')}</nav>`;
}

function renderGuidanceCard({ title, body, items }) {
  return `<article class="quiet-card guidance-card"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p>${list(items)}</article>`;
}

export function renderPilgrimageOverview({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<div class="pilgrimage-page"><section class="hero hero--pilgrimage"><div class="container hero__content"><div>${renderSectionHeading({ eyebrow: text.overview, title: text.title, description: text.description, level: 1 })}${renderPreparationNav(locale, text)}${renderWhatsAppLink({ locale, journey: text.title })}</div>${renderHeroImage({ asset: '/assets/generated/hero-umrah-master.png', mobileAsset: '/assets/generated/hero-umrah-mobile.png', alt: locale === 'en' ? 'A multigenerational Indonesian family viewing Makkah at dawn' : 'Keluarga Indonesia lintas generasi memandang Makkah saat fajar' })}</div></section><section class="content-section container calm-section" data-reveal>${renderSectionHeading({ eyebrow: text.checklist, title: text.checklist, description: text.note })}<div class="guidance-grid">${renderGuidanceCard({ title: text.umrah, body: text.preparationText, items: locale === 'en' ? ['Compare programme components before comparing price', 'Ask about rest, transport, meals, and guidance', 'Prepare passports and health questions'] : ['Bandingkan komponen program sebelum membandingkan harga', 'Tanyakan jeda, transportasi, makanan, dan pendampingan', 'Siapkan paspor dan pertanyaan kesehatan'] })}${renderGuidanceCard({ title: text.hajj, body: text.hajjText, items: locale === 'en' ? ['Confirm the official pathway and required documents', 'Do not rely on unverified quota or credential claims', 'Plan around waiting periods and family readiness'] : ['Konfirmasi jalur resmi dan dokumen yang diperlukan', 'Jangan mengandalkan klaim kuota atau kredensial yang belum diperiksa', 'Rencanakan sesuai masa tunggu dan kesiapan keluarga'] })}${renderGuidanceCard({ title: text.family, body: text.familyText, items: locale === 'en' ? ['List mobility and medication needs', 'Choose a pace with realistic walking and rest', 'Ask how support works from departure to return'] : ['Catat kebutuhan mobilitas dan obat', 'Pilih ritme dengan jalan kaki dan jeda yang realistis', 'Tanyakan bentuk pendampingan dari berangkat hingga pulang'] })}</div></section><section class="final-cta"><div class="container"><p>${escapeHtml(text.note)}</p>${renderWhatsAppLink({ locale, journey: text.consult })}</div></section></div>`;
}

export function renderUmrahPackages({ locale = 'id' } = {}) {
  return renderPackageDirectory({ locale, pillar: 'pilgrimage' });
}

export function renderUmrahPreparation({ locale = 'id' } = {}) {
  const text = copy(locale);
  const questions = locale === 'en'
    ? ['Which organizer credentials can be checked?', 'What is included and excluded in the programme?', 'How will children, older travellers, and mobility needs be supported?']
    : ['Legalitas penyelenggara apa yang dapat diperiksa?', 'Apa saja yang termasuk dan tidak termasuk dalam program?', 'Bagaimana anak, lansia, dan kebutuhan mobilitas akan didampingi?'];
  const beforeDeparture = locale === 'en'
    ? ['Passport and document validity', 'Health, medicine, and vaccination questions', 'Room, meal, transfer, and cancellation details']
    : ['Masa berlaku paspor dan dokumen', 'Pertanyaan kesehatan, obat, dan vaksin', 'Detail kamar, makanan, transportasi, dan pembatalan'];
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.preparation, title: text.preparationTitle, description: text.preparationText, level: 1 })}${renderCardImage('/assets/generated/umrah-preparation-flatlay.png', text.preparation)}<div class="guidance-grid"><article class="quiet-card guidance-card"><h2>${escapeHtml(text.questions)}</h2>${list(questions)}</article><article class="quiet-card guidance-card"><h2>${escapeHtml(text.checklist)}</h2>${list(beforeDeparture)}</article></div><div class="quiet-card"><h2>${escapeHtml(text.verify)}</h2><p>${escapeHtml(text.verifyText)}</p></div>${renderWhatsAppLink({ locale, journey: text.preparation })}</section>`;
}

export function renderHajjInformation({ locale = 'id' } = {}) {
  const text = copy(locale);
  const steps = locale === 'en'
    ? ['Learn the official registration and waiting-period pathway', 'Check documents and current health requirements from authoritative sources', 'Ask a licensed provider to explain programme scope, costs, and responsibilities']
    : ['Pahami jalur pendaftaran resmi dan masa tunggu', 'Periksa dokumen serta persyaratan kesehatan dari sumber berwenang', 'Minta penyelenggara resmi menjelaskan cakupan program, biaya, dan tanggung jawab'];
  const questions = locale === 'en'
    ? ['Which parts of the process are handled by the official system?', 'Which costs are fixed, variable, or personal?', 'What support is available for family and health needs?']
    : ['Bagian mana dari proses yang ditangani sistem resmi?', 'Biaya mana yang tetap, berubah, atau menjadi tanggungan pribadi?', 'Pendampingan apa yang tersedia untuk kebutuhan keluarga dan kesehatan?'];
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.hajj, title: text.hajjTitle, description: text.hajjText, level: 1 })}${renderCardImage('/assets/generated/hajj-information.png', text.hajj)}<div class="guidance-grid">${renderGuidanceCard({ title: text.checklist, body: text.note, items: steps })}${renderGuidanceCard({ title: text.questions, body: text.verifyText, items: questions })}</div><div class="quiet-card"><h2>${escapeHtml(text.family)}</h2><p>${escapeHtml(text.familyText)}</p></div>${renderWhatsAppLink({ locale, journey: text.hajj })}</section>`;
}
