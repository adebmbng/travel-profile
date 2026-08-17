import { escapeHtml } from '../lib/escape-html.js';
import { renderSectionHeading, routePath } from './components.js';

const COPY = Object.freeze({
  id: Object.freeze({
    privacy: ['Privasi', 'Privasi dalam percakapan perjalanan', 'Jika Anda memilih menghubungi kami melalui WhatsApp, bagikan hanya informasi yang diperlukan untuk percakapan. Kebijakan operasional lengkap akan diperbarui setelah detail pengelolaan data terverifikasi.'],
    cookies: ['Cookie', 'Cookie dan pilihan Anda', 'Situs statis ini menjelaskan bahwa teknologi pengukuran atau cookie hanya boleh digunakan sesuai pilihan persetujuan dan konfigurasi yang berlaku.'],
    'affiliate-disclosure': ['Pengungkapan afiliasi', 'Tentang tautan affiliate', 'Rasuna Travel menggunakan tautan affiliate Welcome Pickups melalui Travelpayouts. Tautan dapat menghasilkan komisi tanpa menambah biaya Anda. Pemesanan berlangsung di situs penyedia eksternal.'],
    terms: ['Syarat', 'Syarat penggunaan', 'Konten ini adalah panduan awal, bukan inventaris, penawaran harga final, jadwal, atau konfirmasi pemesanan. Detail perlu dikonfirmasi dalam konsultasi dan dengan penyedia terkait.'],
    accessibility: ['Aksesibilitas', 'Aksesibilitas situs', 'Kami berupaya menyediakan navigasi keyboard, fokus yang terlihat, struktur semantik, dan pilihan gerak yang lebih rendah. Beri tahu kami melalui WhatsApp bila Anda memerlukan bantuan aksesibilitas.'],
    back: 'Kembali ke beranda'
  }),
  en: Object.freeze({
    privacy: ['Privacy', 'Privacy in travel conversations', 'If you choose to contact us through WhatsApp, share only information needed for that conversation. A complete operational policy will be updated once data-handling details are verified.'],
    cookies: ['Cookies', 'Cookies and your choices', 'This static site explains that measurement technology or cookies may be used only according to applicable consent choices and configuration.'],
    'affiliate-disclosure': ['Affiliate disclosure', 'About affiliate links', 'Rasuna Travel uses a Welcome Pickups affiliate link through Travelpayouts. The link may generate a commission at no added cost to you. Booking takes place on the external provider’s site.'],
    terms: ['Terms', 'Terms of use', 'This content is early guidance, not live inventory, a final price offer, a schedule, or a booking confirmation. Details need confirmation in a consultation and with the relevant provider.'],
    accessibility: ['Accessibility', 'Website accessibility', 'We aim to provide keyboard navigation, visible focus, semantic structure, and reduced-motion choices. Please contact us on WhatsApp if you need accessibility help.'],
    back: 'Return home'
  })
});

export function renderLegalPage({ locale = 'id', key } = {}) {
  const text = COPY[locale] ?? COPY.id;
  const page = text[key] ?? text.privacy;
  return `<article class="legal-page page-intro container">${renderSectionHeading({ eyebrow: page[0], title: page[1], description: page[2], level: 1 })}<div class="quiet-card"><p>${escapeHtml(page[2])}</p>${key === 'affiliate-disclosure' ? `<p><a href="${escapeHtml(routePath(locale, 'travel-tools'))}">${locale === 'en' ? 'See Travel Tools' : 'Lihat Travel Tools'}</a></p>` : ''}<p><a href="${escapeHtml(routePath(locale, 'home'))}">${escapeHtml(text.back)}</a></p></div></article>`;
}
