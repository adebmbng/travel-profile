import { REFERRAL_PROVIDERS } from '../site-data.js';
import { escapeHtml } from '../lib/escape-html.js';
import { buildReferralLink } from '../lib/referrals.js';
import { renderCardImage, renderSectionHeading, renderWhatsAppLink, routePath } from './components.js';

const COPY = Object.freeze({
  id: Object.freeze({
    eyebrow: 'Travel Tools', title: 'Alat perjalanan yang dipilih dengan jelas', description: 'Gunakan panduan dan layanan pihak ketiga setelah meninjau syaratnya. Rasuna Travel tidak mengoperasikan layanan eksternal ini.', transfer: 'Antar-jemput bandara', affiliate: 'Tautan ini adalah tautan affiliate melalui Travelpayouts. Rasuna Travel dapat menerima komisi tanpa biaya tambahan bagi Anda.', external: 'Anda akan membuka situs eksternal untuk memeriksa dan menyelesaikan pemesanan. Syarat, harga, dan layanan ditentukan oleh penyedia eksternal.', open: 'Buka Welcome Pickups', fallback: 'Ingin membahas pilihan terlebih dahulu?', disclosure: 'Baca pengungkapan afiliasi', categoryTitle: 'Checklist sebelum menggunakan alat', categoryNote: 'Kategori berikut berisi panduan netral. Tidak ada hubungan penyedia yang tersirat.', consult: 'Tanyakan kebutuhan perjalanan Anda', categories: [
      { title: 'Penerbangan', body: 'Bandingkan tanggal fleksibel, bagasi, transit, dan aturan perubahan.', checks: ['Periksa tanggal fleksibel, jam kedatangan, dan transfer', 'Hitung bagasi serta kebutuhan anak'] },
      { title: 'Hotel', body: 'Nilai lokasi, akses, sarapan, pembatalan, dan jarak ke aktivitas.', checks: ['Tanyakan tipe kamar dan tempat tidur', 'Cek akses lift, toilet, dan transportasi'] },
      { title: 'Aktivitas', body: 'Pastikan durasi, usia minimum, cuaca, titik temu, dan apa yang termasuk.', checks: ['Simpan konfirmasi operator', 'Jangan paksakan aktivitas di luar stamina'] },
      { title: 'Asuransi', body: 'Baca cakupan, pengecualian, kondisi kesehatan, dan prosedur klaim.', checks: ['Catat nomor bantuan', 'Simpan dokumen polis secara offline'] },
      { title: 'Visa', body: 'Mulai dari situs resmi dan periksa masa berlaku paspor serta dokumen pendukung.', checks: ['Jangan mengandalkan blog sebagai satu-satunya sumber', 'Sisakan waktu untuk proses dan perubahan aturan'] },
      { title: 'Transportasi', body: 'Rencanakan perpindahan berdasarkan bagasi, anak, lansia, dan waktu istirahat.', checks: ['Pastikan titik jemput tertulis', 'Sediakan rencana cadangan'] },
      { title: 'Konektivitas', body: 'Bandingkan eSIM, roaming, Wi-Fi, cakupan, masa aktif, dan dukungan.', checks: ['Simpan peta offline', 'Lindungi akun dan data pribadi'] },
      { title: 'Kebutuhan perjalanan', body: 'Buat daftar obat, dokumen, adaptor, pembayaran, dan kontak darurat.', checks: ['Pisahkan barang penting di tas kabin', 'Bagikan itinerary kepada orang tepercaya'] }
    ]
  }),
  en: Object.freeze({
    eyebrow: 'Travel Tools', title: 'Travel tools selected transparently', description: 'Use guides and third-party services after reviewing their terms. Rasuna Travel does not operate these external services.', transfer: 'Airport transfer', affiliate: 'This is an affiliate link through Travelpayouts. Rasuna Travel may earn a commission at no additional cost to you.', external: 'You will open an external site to check and complete a booking. Terms, pricing, and service are set by the external provider.', open: 'Open Welcome Pickups', fallback: 'Would you like to discuss options first?', disclosure: 'Read affiliate disclosure', categoryTitle: 'Checklist before using a tool', categoryNote: 'The categories below provide neutral guidance. No provider relationship is implied.', consult: 'Ask about your travel needs', categories: [
      { title: 'Flights', body: 'Compare flexible dates, baggage, transfers, and change rules.', checks: ['Check arrival times and onward transfers', 'Budget for baggage and children’s needs'] },
      { title: 'Hotels', body: 'Review location, access, breakfast, cancellation, and distance to activities.', checks: ['Ask about room and bed types', 'Check lifts, bathrooms, and transport access'] },
      { title: 'Activities', body: 'Confirm duration, age limits, weather, meeting point, and inclusions.', checks: ['Keep the operator confirmation', 'Do not push beyond the group’s stamina'] },
      { title: 'Insurance', body: 'Read coverage, exclusions, health conditions, and the claims process.', checks: ['Save the assistance number', 'Keep policy documents offline'] },
      { title: 'Visa', body: 'Start with official sources and check passport validity and supporting documents.', checks: ['Do not rely on a blog as the only source', 'Leave time for processing and rule changes'] },
      { title: 'Transport', body: 'Plan transfers around luggage, children, older travellers, and rest time.', checks: ['Keep the pickup point in writing', 'Prepare a backup plan'] },
      { title: 'Connectivity', body: 'Compare eSIM, roaming, Wi-Fi, coverage, validity, and support.', checks: ['Save offline maps', 'Protect accounts and personal data'] },
      { title: 'Travel essentials', body: 'List medicine, documents, adapters, payment methods, and emergency contacts.', checks: ['Keep essentials in cabin baggage', 'Share the itinerary with someone you trust'] }
    ]
  })
});

function copy(locale) { return COPY[locale] ?? COPY.id; }
function list(items) { return `<ul class="check-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`; }

export function renderTravelTools({ locale = 'id' } = {}) {
  const text = copy(locale);
  const provider = REFERRAL_PROVIDERS[0];
  const referralUrl = buildReferralLink(provider, {});
  const referralAction = referralUrl
    ? `<a class="button button--secondary" href="${escapeHtml(referralUrl)}" target="_blank" rel="sponsored nofollow noopener noreferrer" data-referral-provider="welcome-pickups">${escapeHtml(text.open)} <span class="visually-hidden">(${locale === 'en' ? 'opens external website' : 'membuka situs eksternal'})</span></a>`
    : renderWhatsAppLink({ locale, journey: text.transfer });
  return `<div class="travel-tools"><section class="page-intro container">${renderSectionHeading({ eyebrow: text.eyebrow, title: text.title, description: text.description, level: 1 })}<div class="travel-tools__grid"><article class="content-card referral-card">${renderCardImage('/assets/generated/referral-airport-transfer.png', text.transfer)}<div><p class="eyebrow">${escapeHtml(text.transfer)}</p><h2>${escapeHtml(provider.name)}</h2><p>${escapeHtml(text.affiliate)}</p><p class="external-warning">${escapeHtml(text.external)}</p>${referralAction}<p class="configuration-note">Travelpayouts · marker ${escapeHtml(provider.marker)} · campaign ${escapeHtml(provider.campaignId)} · promo ${escapeHtml(provider.promoId)}</p></div></article><section class="quiet-card travel-tools__fallback"><h2>${escapeHtml(text.fallback)}</h2>${renderWhatsAppLink({ locale, journey: text.eyebrow })}<a href="${escapeHtml(routePath(locale, 'affiliate-disclosure'))}">${escapeHtml(text.disclosure)}</a></section></div></section><section class="content-section container"><h2>${escapeHtml(text.categoryTitle)}</h2><p>${escapeHtml(text.categoryNote)}</p><div class="content-grid content-grid--four">${text.categories.map((category) => `<article class="future-tool" aria-label="${escapeHtml(category.title)}"><h3>${escapeHtml(category.title)}</h3><p>${escapeHtml(category.body)}</p>${list(category.checks)}</article>`).join('')}</div></section><section class="final-cta"><div class="container"><p>${escapeHtml(text.consult)}</p>${renderWhatsAppLink({ locale, journey: text.eyebrow })}</div></section></div>`;
}
