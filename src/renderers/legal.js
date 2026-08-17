import { escapeHtml } from '../lib/escape-html.js';
import { renderSectionHeading, renderWhatsAppLink, routePath } from './components.js';

const page = (eyebrow, title, description, sections) => Object.freeze({ eyebrow, title, description, sections: Object.freeze(sections.map((section) => Object.freeze({ heading: section.heading, paragraphs: Object.freeze(section.paragraphs) }))) });

const COPY = Object.freeze({
  id: Object.freeze({
    privacy: page('Privasi', 'Privasi dalam percakapan perjalanan', 'Bagikan hanya informasi yang dibutuhkan untuk memahami pertanyaan dan kebutuhan perjalanan Anda.', [
      { heading: 'Informasi yang Anda bagikan', paragraphs: ['Ketika Anda memilih WhatsApp, Anda menentukan sendiri informasi yang ingin dikirim. Hindari membagikan nomor paspor, data kesehatan lengkap, atau dokumen sensitif sebelum benar-benar diperlukan.', 'Gunakan data minimum untuk menjelaskan tujuan, waktu, jumlah peserta, dan kebutuhan layanan.'] },
      { heading: 'Penggunaan informasi', paragraphs: ['Informasi digunakan untuk merespons percakapan, memberi arahan, dan menindaklanjuti pertanyaan yang Anda minta. Situs ini tidak menyediakan akun pengguna atau formulir pemesanan online.', 'Tautan pihak ketiga memiliki kebijakan privasi sendiri. Baca kebijakan mereka sebelum meneruskan data atau melakukan pemesanan.'] },
      { heading: 'Pilihan Anda', paragraphs: ['Anda dapat meminta percakapan dihentikan atau menanyakan konteks penggunaan informasi yang telah dibagikan. Jangan kirim informasi yang tidak diperlukan untuk konsultasi.'] }
    ]),
    cookies: page('Cookie', 'Cookie dan pilihan Anda', 'Situs statis ini menggunakan penyimpanan dan pengukuran hanya sesuai konfigurasi persetujuan yang tersedia.', [
      { heading: 'Yang diperlukan untuk situs', paragraphs: ['Halaman utama, navigasi, preferensi bahasa, dan perilaku aksesibilitas dapat berjalan tanpa cookie pemasaran. JavaScript hanya meningkatkan menu, pencarian arahan, dan interaksi yang tidak wajib.'] },
      { heading: 'Pengukuran dan persetujuan', paragraphs: ['Teknologi analitik atau pemasaran harus menunggu pilihan persetujuan yang sesuai. Jika Anda menolak, konten dan tautan konsultasi tetap dapat digunakan.', 'Parameter kampanye yang tersimpan tidak boleh memuat data pribadi.'] },
      { heading: 'Mengubah pilihan', paragraphs: ['Hapus penyimpanan situs dari pengaturan browser atau gunakan kontrol persetujuan yang tersedia saat konfigurasi pengukuran diaktifkan.'] }
    ]),
    'affiliate-disclosure': page('Pengungkapan afiliasi', 'Tentang tautan affiliate', 'Rasuna Travel menggunakan tautan affiliate Welcome Pickups melalui Travelpayouts untuk kategori antar-jemput bandara.', [
      { heading: 'Cara kerja tautan', paragraphs: ['Jika Anda membuka tautan dan melakukan pemesanan di situs Welcome Pickups, Rasuna Travel dapat menerima komisi tanpa biaya tambahan bagi Anda. Pemesanan, pembayaran, syarat, harga, dan layanan berlangsung di situs penyedia.'] },
      { heading: 'Yang bukan bagian dari layanan Rasuna', paragraphs: ['Rasuna Travel tidak mengoperasikan kendaraan, menetapkan harga penyedia, atau menjamin ketersediaan. Periksa ulang titik jemput, kebijakan perubahan, bagasi, dan dukungan sebelum membayar.'] },
      { heading: 'Alternatif konsultasi', paragraphs: ['Anda dapat bertanya melalui WhatsApp sebelum membuka tautan. Kategori lain di Travel Tools berisi panduan netral dan tidak menyatakan hubungan affiliate.'] }
    ]),
    terms: page('Syarat', 'Syarat penggunaan', 'Gunakan konten Rasuna Travel sebagai arahan awal, lalu konfirmasikan detail sebelum mengambil keputusan perjalanan.', [
      { heading: 'Sifat informasi', paragraphs: ['Konten, rute contoh, dan harga benchmark bukan inventaris langsung, penawaran final, jadwal, jaminan ketersediaan, atau konfirmasi pemesanan.', 'Angka paket adalah pembanding pasar per orang dan dapat berubah karena tanggal, kurs, peserta, fasilitas, dan kondisi penyedia.'] },
      { heading: 'Tanggung jawab pemeriksaan', paragraphs: ['Periksa paspor, visa, kesehatan, izin penyelenggara, kontrak, komponen layanan, kebijakan pembatalan, dan sumber resmi yang relevan. Jangan melakukan pembayaran hanya berdasarkan halaman ini.'] },
      { heading: 'Tautan eksternal', paragraphs: ['Tautan pihak ketiga membawa Anda ke layanan yang memiliki syarat dan kebijakan sendiri. Rasuna Travel tidak bertanggung jawab atas perubahan, gangguan, atau keputusan di luar situs ini.'] }
    ]),
    accessibility: page('Aksesibilitas', 'Aksesibilitas situs', 'Kami berupaya membuat panduan perjalanan dapat digunakan dengan keyboard, pembaca layar, ukuran layar berbeda, dan pilihan gerak yang lebih rendah.', [
      { heading: 'Yang tersedia', paragraphs: ['Situs memakai struktur heading, landmark semantik, skip link, teks alternatif, fokus yang terlihat, native details/summary, dan tombol dengan nama yang jelas.', 'Konten penting tersedia di HTML statis sehingga tetap dapat dibaca ketika JavaScript tidak aktif.'] },
      { heading: 'Gerak dan tampilan', paragraphs: ['Efek reveal mengikuti preferensi reduced motion. Layout gambar memiliki ukuran yang stabil untuk mengurangi pergeseran saat halaman dimuat.'] },
      { heading: 'Laporkan hambatan', paragraphs: ['Jika Anda menemukan tautan, kontras, bahasa, atau interaksi yang menghambat, kirimkan contoh halaman dan kebutuhan Anda melalui WhatsApp agar dapat ditinjau.'] }
    ]),
    back: 'Kembali ke beranda', tools: 'Lihat Travel Tools'
  }),
  en: Object.freeze({
    privacy: page('Privacy', 'Privacy in travel conversations', 'Share only the information needed to understand your travel question and needs.', [
      { heading: 'Information you share', paragraphs: ['When you choose WhatsApp, you decide what to send. Avoid sharing passport numbers, full health records, or sensitive documents until they are genuinely needed.', 'Use the minimum information needed to explain destination, timing, party size, and service needs.'] },
      { heading: 'How information is used', paragraphs: ['Information is used to respond to the conversation, provide guidance, and follow up on questions you ask. This site does not provide user accounts or an online booking form.', 'Third-party links have their own privacy policies. Read them before passing on data or making a booking.'] },
      { heading: 'Your choices', paragraphs: ['You can ask for a conversation to stop or ask how information you shared is being used. Do not send information that is unnecessary for consultation.'] }
    ]),
    cookies: page('Cookies', 'Cookies and your choices', 'This static site uses storage and measurement only according to the consent configuration available to you.', [
      { heading: 'What the site needs', paragraphs: ['Home content, navigation, language preferences, and accessibility behaviour can work without marketing cookies. JavaScript only enhances the menu, journey guidance, and non-essential interaction.', 'Campaign parameters stored in the browser must not contain personal data.'] },
      { heading: 'Measurement and consent', paragraphs: ['Analytics or marketing technology should wait for the appropriate consent choice. If you decline, content and consultation links remain usable.'] },
      { heading: 'Changing your choice', paragraphs: ['Clear site storage in your browser settings or use the consent controls available when measurement configuration is enabled.'] }
    ]),
    'affiliate-disclosure': page('Affiliate disclosure', 'About affiliate links', 'Rasuna Travel uses a Welcome Pickups affiliate link through Travelpayouts for airport-transfer guidance.', [
      { heading: 'How the link works', paragraphs: ['If you open the link and book on the Welcome Pickups site, Rasuna Travel may receive a commission at no added cost to you. Booking, payment, terms, pricing, and service take place on the provider’s site.'] },
      { heading: 'What Rasuna does not operate', paragraphs: ['Rasuna Travel does not operate the vehicles, set provider prices, or guarantee availability. Recheck pickup points, change policy, baggage, and support before paying.'] },
      { heading: 'Consultation alternative', paragraphs: ['You can ask a question on WhatsApp before opening the link. Other Travel Tools categories provide neutral guidance and do not imply an affiliate relationship.'] }
    ]),
    terms: page('Terms', 'Terms of use', 'Use Rasuna Travel content as early guidance, then confirm details before making a travel decision.', [
      { heading: 'What the information means', paragraphs: ['Content, example routes, and benchmark prices are not live inventory, final offers, schedules, availability guarantees, or booking confirmations.', 'Package figures are per-person market comparisons and can change with dates, exchange rates, party size, inclusions, and provider conditions.'] },
      { heading: 'Your checks', paragraphs: ['Check passports, visas, health requirements, organizer credentials, contracts, service components, cancellation rules, and relevant official sources. Do not pay based only on this page.'] },
      { heading: 'External links', paragraphs: ['Third-party links take you to services with their own terms and policies. Rasuna Travel is not responsible for changes, outages, or decisions outside this site.'] }
    ]),
    accessibility: page('Accessibility', 'Website accessibility', 'We aim to make travel guidance usable with keyboards, screen readers, different screen sizes, and reduced-motion preferences.', [
      { heading: 'What is available', paragraphs: ['The site uses heading structure, semantic landmarks, a skip link, alternative text, visible focus, native details/summary, and clearly named buttons.', 'Important content is available in static HTML so it remains readable when JavaScript is disabled.'] },
      { heading: 'Motion and layout', paragraphs: ['Reveal effects follow reduced-motion preferences. Images have stable dimensions to reduce layout shift while pages load.'] },
      { heading: 'Report a barrier', paragraphs: ['If a link, contrast choice, language, or interaction creates a barrier, send the page example and your need on WhatsApp so it can be reviewed.'] }
    ]),
    back: 'Return home', tools: 'See Travel Tools'
  })
});

export function renderLegalPage({ locale = 'id', key } = {}) {
  const text = COPY[locale] ?? COPY.id;
  const selected = text[key] ?? text.privacy;
  return `<article class="legal-page page-intro container">${renderSectionHeading({ eyebrow: selected.eyebrow, title: selected.title, description: selected.description, level: 1 })}<div class="legal-sections">${selected.sections.map((section) => `<section class="quiet-card"><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</section>`).join('')}</div><div class="page-intro__actions">${key === 'affiliate-disclosure' ? `<a class="button button--secondary" href="${escapeHtml(routePath(locale, 'travel-tools'))}">${escapeHtml(text.tools)}</a>` : ''}${renderWhatsAppLink({ locale, journey: selected.title })}<a href="${escapeHtml(routePath(locale, 'home'))}">${escapeHtml(text.back)}</a></div></article>`;
}
