import { ARTICLES } from '../site-data.js';
import { escapeHtml } from '../lib/escape-html.js';
import { renderCardImage, renderSectionHeading, renderWhatsAppLink, routePath } from './components.js';

const localized = (id, en) => Object.freeze({ id, en });

const COPY = Object.freeze({
  id: Object.freeze({
    localEyebrow: 'Halaman lokal', localTitle: 'Mulai dari percakapan yang sesuai kebutuhan Anda', localDescription: 'Rasuna Travel membantu memulai pembicaraan perjalanan dari Jakarta atau Bandung secara daring. Pilihan layanan, titik temu, dan waktu dibahas sesuai kebutuhan.', serviceTitle: 'Yang dapat dibicarakan', localNote: 'Halaman ini tidak menyatakan alamat kantor, jam operasional, atau cakupan layanan tetap. Konfirmasi konteks Anda melalui WhatsApp.', localQuestions: ['Kota asal dan waktu perjalanan', 'Jumlah peserta serta kebutuhan mobilitas', 'Preferensi komunikasi dan tindak lanjut'], articleEyebrow: 'Artikel', articleTitle: 'Bacaan sebelum perjalanan', articleDescription: 'Catatan praktis dengan metadata dan sumber rujukan yang dapat diperiksa.', articleCta: 'Butuh bantuan menyusun pertanyaan?'
  }),
  en: Object.freeze({
    localEyebrow: 'Local page', localTitle: 'Begin with a conversation shaped around your needs', localDescription: 'Rasuna Travel can begin a travel conversation from Jakarta or Bandung remotely. Service options, meeting points, and timing are discussed around your needs.', serviceTitle: 'What we can discuss', localNote: 'This page does not claim a fixed office, opening hours, or service coverage. Share your context on WhatsApp for confirmation.', localQuestions: ['Home city and travel timing', 'Party size and mobility needs', 'Communication preference and follow-up'], articleEyebrow: 'Articles', articleTitle: 'Reading before your trip', articleDescription: 'Practical notes with metadata and reference sources available for checking.', articleCta: 'Need help shaping your questions?'
  })
});

const LOCAL_PAGES = Object.freeze({
  jakarta: Object.freeze({ asset: '/assets/generated/local-jakarta.png', details: localized('Mulai dengan konteks perjalanan, jumlah peserta, dan waktu yang Anda pertimbangkan. Percakapan dapat dilanjutkan secara daring setelah kebutuhan awal jelas.', 'Begin with your travel context, party size, and approximate timing. The conversation can continue remotely once the starting needs are clear.'), labels: Object.freeze({ id: 'Jakarta', en: 'Jakarta' }) }),
  bandung: Object.freeze({ asset: '/assets/generated/local-bandung.png', details: localized('Bagikan tujuan, ritme, dan kebutuhan keluarga dari Bandung. Opsi perjalanan dan cara tindak lanjut dibicarakan sebelum detail apa pun dianggap final.', 'Share your destination, pace, and family needs from Bandung. Travel options and follow-up are discussed before any detail is treated as final.'), labels: Object.freeze({ id: 'Bandung', en: 'Bandung' }) })
});

const SUPPORT_COPY = Object.freeze({
  id: Object.freeze({
    custom: Object.freeze({ eyebrow: 'Perjalanan kustom', title: 'Bentuk rencana yang mengikuti kebutuhan Anda', description: 'Mulai dari waktu, tujuan, ritme kelompok, dan hal-hal yang penting untuk dibicarakan bersama.', promptsTitle: 'Konteks yang membantu', prompts: ['Kapan kira-kira ingin berangkat?', 'Siapa saja yang akan ikut dan apa kebutuhan mereka?', 'Apa yang ingin dibuat fleksibel?'], nextTitle: 'Alur percakapan', next: ['Kirim konteks awal melalui WhatsApp.', 'Bandingkan arah perjalanan dan asumsi anggaran.', 'Konfirmasi detail sebelum mengambil keputusan.'], asset: '/assets/generated/consultation-scene.png' }),
    group: Object.freeze({ eyebrow: 'Keluarga & grup', title: 'Perjalanan yang memberi ruang untuk setiap generasi', description: 'Rencanakan perjalanan bersama dengan perhatian pada jeda, kenyamanan, dan kebutuhan aksesibilitas.', promptsTitle: 'Yang perlu disepakati', prompts: ['Batas berjalan dan jumlah perpindahan yang nyaman', 'Kamar, makanan, obat, dan kebutuhan anak atau lansia', 'Waktu bebas dan cara mengambil keputusan dalam grup'], nextTitle: 'Cara membuatnya ringan', next: ['Tentukan prioritas bersama.', 'Sisakan buffer untuk istirahat dan perubahan.', 'Minta penjelasan layanan yang tertulis.'], asset: '/assets/generated/family-group-travel.png' }),
    about: Object.freeze({ eyebrow: 'Tentang Rasuna', title: 'Panduan manusiawi untuk dua jalur perjalanan', description: 'Rasuna Travel membantu keluarga Indonesia memulai percakapan tentang Haji & Umrah dan Wisata Dunia.', promptsTitle: 'Prinsip pendampingan', prompts: ['Mulai dari kebutuhan manusia, bukan daftar paket.', 'Pisahkan benchmark, fakta terverifikasi, dan hal yang masih perlu dicek.', 'Berikan ruang untuk bertanya sebelum keputusan.'], nextTitle: 'Dua jalur, satu cara kerja', next: ['Pahami tujuan dan peserta.', 'Susun pilihan yang dapat dibandingkan.', 'Konfirmasi batasan, biaya, dan langkah berikutnya.'], asset: '/assets/generated/consultation-scene.png' }),
    why: Object.freeze({ eyebrow: 'Mengapa Rasuna', title: 'Mulai dengan pertanyaan yang tepat', description: 'Kami membantu Anda memahami pilihan sebelum detail akhir dikonfirmasi.', promptsTitle: 'Yang kami jaga', prompts: ['Bahasa yang mudah dipahami keluarga.', 'Kejelasan tentang asumsi dan hal yang belum pasti.', 'Jalur konsultasi yang bisa dimulai dari pertanyaan sederhana.'], nextTitle: 'Sebelum memilih', next: ['Tetapkan kebutuhan yang tidak bisa ditawar.', 'Bandingkan ritme dan komponen, bukan angka saja.', 'Simpan konfirmasi tertulis untuk rujukan.'], asset: '/assets/generated/route-map-texture.png' }),
    faq: Object.freeze({ eyebrow: 'Pertanyaan umum', title: 'Jawaban awal sebelum percakapan', description: 'Gunakan jawaban ini sebagai orientasi; detail perjalanan akhir tetap perlu dikonfirmasi.', questions: [Object.freeze({ question: 'Apakah harga di situs adalah harga final?', answer: 'Tidak. Angka paket adalah benchmark pasar yang membantu menyusun anggaran. Harga final mengikuti tanggal, peserta, kurs, rute, dan konfirmasi layanan.' }), Object.freeze({ question: 'Apakah Rasuna menjual tiket atau menjamin ketersediaan?', answer: 'Halaman ini tidak menampilkan inventaris langsung. Tanyakan kebutuhan Anda melalui konsultasi agar layanan dan langkah berikutnya dapat dijelaskan.' }), Object.freeze({ question: 'Apa yang perlu disiapkan sebelum menghubungi?', answer: 'Rentang waktu, jumlah peserta, tujuan, kebutuhan kenyamanan, dan batas anggaran sudah cukup untuk memulai percakapan.' }), Object.freeze({ question: 'Bagaimana memeriksa program Umrah?', answer: 'Minta identitas dan izin penyelenggara, rincian tertulis program, komponen harga, serta kebijakan pembatalan sebelum membayar.' })] }),
    contact: Object.freeze({ eyebrow: 'Kontak', title: 'Mari mulai dari kebutuhan Anda', description: 'Kirimkan konteks awal melalui WhatsApp agar percakapan berikutnya lebih terarah.', promptsTitle: 'Pesan awal yang berguna', prompts: ['Tujuan atau jenis perjalanan', 'Perkiraan tanggal dan jumlah peserta', 'Pertanyaan utama atau batasan kenyamanan'], nextTitle: 'Setelah Anda menghubungi', next: ['Kami membaca konteks yang Anda bagikan.', 'Arah dan pertanyaan lanjutan disusun.', 'Detail final dikonfirmasi sebelum ada keputusan.'], asset: '/assets/generated/consultation-scene.png' })
  }),
  en: Object.freeze({
    custom: Object.freeze({ eyebrow: 'Custom trip', title: 'Shape a plan around what matters to you', description: 'Begin with timing, destinations, group rhythm, and the details you want to discuss together.', promptsTitle: 'Useful starting context', prompts: ['When are you approximately hoping to travel?', 'Who is travelling and what do they need?', 'What would you like to keep flexible?'], nextTitle: 'Conversation flow', next: ['Share initial context on WhatsApp.', 'Compare directions and budget assumptions.', 'Confirm details before deciding.'], asset: '/assets/generated/consultation-scene.png' }),
    group: Object.freeze({ eyebrow: 'Family & group', title: 'A journey with room for every generation', description: 'Plan together with attention to pauses, comfort, and accessibility needs.', promptsTitle: 'What to agree on', prompts: ['Walking limits and a comfortable number of transfers', 'Rooms, food, medicine, and child or older-traveller needs', 'Free time and how the group will make decisions'], nextTitle: 'How to make it lighter', next: ['Choose shared priorities.', 'Leave a buffer for rest and change.', 'Ask for service details in writing.'], asset: '/assets/generated/family-group-travel.png' }),
    about: Object.freeze({ eyebrow: 'About Rasuna', title: 'Human guidance for two travel paths', description: 'Rasuna Travel helps Indonesian families begin conversations about Hajj & Umrah and Worldwide Travel.', promptsTitle: 'Our guiding principles', prompts: ['Start with people’s needs, not a package list.', 'Separate benchmarks, verified facts, and items still needing checks.', 'Make room for questions before a decision.'], nextTitle: 'Two paths, one way of working', next: ['Understand the purpose and travellers.', 'Shape options that can be compared.', 'Confirm constraints, costs, and next steps.'], asset: '/assets/generated/consultation-scene.png' }),
    why: Object.freeze({ eyebrow: 'Why Rasuna', title: 'Start with the right questions', description: 'We help you understand the options before final details are confirmed.', promptsTitle: 'What we protect', prompts: ['Language families can understand.', 'Clarity about assumptions and unknowns.', 'A consultation path that starts with a simple question.'], nextTitle: 'Before you choose', next: ['Set your non-negotiable needs.', 'Compare rhythm and components, not just numbers.', 'Keep written confirmations for reference.'], asset: '/assets/generated/route-map-texture.png' }),
    faq: Object.freeze({ eyebrow: 'Frequently asked questions', title: 'Early answers before a conversation', description: 'Use these answers as orientation; final travel details still need confirmation.', questions: [Object.freeze({ question: 'Are the prices on the site final?', answer: 'No. Package numbers are market benchmarks to help with budgeting. Final pricing follows dates, party size, exchange rates, route, and confirmed services.' }), Object.freeze({ question: 'Does Rasuna sell tickets or guarantee availability?', answer: 'These pages do not show live inventory. Share your needs in a consultation so services and next steps can be explained.' }), Object.freeze({ question: 'What should I prepare before contacting you?', answer: 'An approximate period, party size, destination, comfort needs, and budget boundary are enough to begin.' }), Object.freeze({ question: 'How should an Umrah programme be checked?', answer: 'Ask for organizer identity and credentials, written programme details, price components, and cancellation policy before payment.' })] }),
    contact: Object.freeze({ eyebrow: 'Contact', title: 'Let’s begin with what you need', description: 'Share initial context on WhatsApp so the next conversation can be more focused.', promptsTitle: 'A useful first message', prompts: ['Destination or journey type', 'Approximate dates and party size', 'Your main question or comfort boundary'], nextTitle: 'After you reach out', next: ['We read the context you share.', 'We shape a direction and follow-up questions.', 'Final details are confirmed before a decision.'], asset: '/assets/generated/consultation-scene.png' })
  })
});

function copy(locale) { return COPY[locale] ?? COPY.id; }
function supportCopy(locale, key) { return SUPPORT_COPY[locale]?.[key] ?? SUPPORT_COPY.id[key]; }
function label(item, locale) { return item.labels?.[locale] ?? item.labels?.id ?? ''; }
function list(items, className = 'check-list') { return `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`; }

export function renderLocalPage({ locale = 'id', city } = {}) {
  const text = copy(locale);
  const entry = LOCAL_PAGES[city] ?? LOCAL_PAGES.jakarta;
  const cityName = label(entry, locale);
  return `<div class="local-page"><section class="page-intro container">${renderSectionHeading({ eyebrow: text.localEyebrow, title: `${text.localTitle}: ${cityName}`, description: text.localDescription, level: 1 })}<div class="local-page__grid"><div>${renderCardImage(entry.asset, locale === 'en' ? `A family planning a trip in ${cityName}` : `Keluarga merencanakan perjalanan di ${cityName}`)}</div><div class="quiet-card"><h2>${escapeHtml(text.serviceTitle)}</h2><p>${escapeHtml(entry.details[locale] ?? entry.details.id)}</p>${list(text.localQuestions)}<p>${escapeHtml(text.localNote)}</p>${renderWhatsAppLink({ locale, journey: cityName })}</div></div></section></div>`;
}

export function renderArticleIndex({ locale = 'id' } = {}) {
  const text = copy(locale);
  return `<section class="page-intro container">${renderSectionHeading({ eyebrow: text.articleEyebrow, title: text.articleTitle, description: text.articleDescription, level: 1 })}<div class="content-grid content-grid--three">${ARTICLES.map((article) => `<article class="content-card catalog-card">${renderCardImage(article.image, label(article, locale))}<div><h2><a href="${escapeHtml(routePath(locale, 'article-detail', { slug: article.slug }))}">${escapeHtml(label(article, locale))}</a></h2><p>${escapeHtml(text.articleDescription)}</p><p class="catalog-card__meta">${escapeHtml(article.metadata.readingTime)}</p></div></article>`).join('')}</div><div class="final-cta"><div class="container"><p>${escapeHtml(text.articleCta)}</p>${renderWhatsAppLink({ locale, journey: text.articleEyebrow })}</div></div></section>`;
}

function renderSupportHero({ locale, page, context }) {
  return `<section class="hero hero--catalog" data-journey-context="${escapeHtml(context)}"><div class="container hero__content"><div>${renderSectionHeading({ eyebrow: page.eyebrow, title: page.title, description: page.description, level: 1 })}${renderWhatsAppLink({ locale, journey: page.title })}</div>${renderCardImage(page.asset, page.title)}</div></section>`;
}

function renderSupportCards(locale, page) {
  return `<section class="content-section container support-page__grid"><article class="quiet-card"><h2>${escapeHtml(page.promptsTitle)}</h2>${list(page.prompts)}</article><article class="quiet-card"><h2>${escapeHtml(page.nextTitle)}</h2>${list(page.next, 'process-list')}</article></section>`;
}

function renderSupportPage({ locale, key, context }) {
  const page = supportCopy(locale, key);
  return `<div class="support-page">${renderSupportHero({ locale, page, context })}${renderSupportCards(locale, page)}<section class="content-section container"><div class="quiet-card"><h2>${escapeHtml(page.nextTitle)}</h2><p>${escapeHtml(page.description)}</p>${renderWhatsAppLink({ locale, journey: page.eyebrow })}</div></section></div>`;
}

export function renderCustomTrip({ locale = 'id' } = {}) {
  return renderSupportPage({ locale, key: 'custom', context: 'custom-trip' });
}

export function renderFamilyGroup({ locale = 'id' } = {}) {
  return renderSupportPage({ locale, key: 'group', context: 'family-group' });
}

export function renderAbout({ locale = 'id' } = {}) {
  return renderSupportPage({ locale, key: 'about', context: 'about' });
}

export function renderWhyRasuna({ locale = 'id' } = {}) {
  return renderSupportPage({ locale, key: 'why', context: 'why-rasuna' });
}

export function renderFaq({ locale = 'id' } = {}) {
  const page = supportCopy(locale, 'faq');
  return `<div class="support-page"><section class="page-intro container">${renderSectionHeading({ eyebrow: page.eyebrow, title: page.title, description: page.description, level: 1 })}<div class="guidance-grid">${page.questions.map((item) => `<details class="quiet-card accordion" data-accordion><summary><span role="heading" aria-level="2">${escapeHtml(item.question)}</span></summary><p>${escapeHtml(item.answer)}</p></details>`).join('')}</div>${renderWhatsAppLink({ locale, journey: page.eyebrow })}</section></div>`;
}

export function renderContact({ locale = 'id' } = {}) {
  return renderSupportPage({ locale, key: 'contact', context: 'contact' });
}
