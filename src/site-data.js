const asset = (filename) => `/assets/generated/${filename}`;

const localized = (id, en) => Object.freeze({ id, en });
const localizedList = (id, en) => Object.freeze({ id: Object.freeze(id), en: Object.freeze(en) });
const localizedFaqs = (id, en) => Object.freeze({
  id: Object.freeze(id.map((item) => Object.freeze(item))),
  en: Object.freeze(en.map((item) => Object.freeze(item)))
});
const localizedSections = (id, en) => Object.freeze({
  id: Object.freeze(id.map((section) => Object.freeze({ ...section, paragraphs: Object.freeze(section.paragraphs) }))),
  en: Object.freeze(en.map((section) => Object.freeze({ ...section, paragraphs: Object.freeze(section.paragraphs) })))
});

export const GENERATED_ASSETS = Object.freeze([
  'article-family-travel-planning.png',
  'consultation-scene.png',
  'destination-bali.png',
  'destination-japan.png',
  'destination-turkiye.png',
  'family-group-travel.png',
  'hajj-information.png',
  'hero-dual-journey-master.png',
  'hero-umrah-master.png',
  'hero-umrah-mobile.png',
  'hero-worldwide-master.png',
  'hero-worldwide-mobile.png',
  'local-bandung.png',
  'local-jakarta.png',
  'og-home-background.png',
  'package-detail-family-hero.png',
  'passport-stamp-texture.png',
  'referral-airport-transfer.png',
  'referral-category-illustrations.png',
  'route-map-texture.png',
  'traveler-couple.png',
  'traveler-solo.png',
  'umrah-preparation-flatlay.png'
]);

export const LANGUAGES = Object.freeze({
  id: Object.freeze({ code: 'id', label: 'Bahasa Indonesia', pathPrefix: 'id' }),
  en: Object.freeze({ code: 'en', label: 'English', pathPrefix: 'en' })
});

export const SITE_CONFIG = Object.freeze({
  SITE_ORIGIN: 'SITE_ORIGIN',
  PRIMARY_WHATSAPP_NUMBER: '081224426102',
  GTM_CONTAINER_ID: 'GTM_CONTAINER_ID',
  GA4_MEASUREMENT_ID: 'GA4_MEASUREMENT_ID',
  GOOGLE_ADS_CONVERSION_ID: 'GOOGLE_ADS_CONVERSION_ID',
  META_PIXEL_ID: 'META_PIXEL_ID',
  UMRAH_CERTIFICATION_NAME: 'UMRAH_CERTIFICATION_NAME',
  UMRAH_CERTIFICATION_NUMBER: 'UMRAH_CERTIFICATION_NUMBER',
  UMRAH_CERTIFICATION_ISSUER: 'UMRAH_CERTIFICATION_ISSUER',
  UMRAH_CERTIFICATION_VERIFY_URL: 'UMRAH_CERTIFICATION_VERIFY_URL',
  JAKARTA_VERIFIED_SERVICE_DETAILS: 'JAKARTA_VERIFIED_SERVICE_DETAILS',
  BANDUNG_VERIFIED_SERVICE_DETAILS: 'BANDUNG_VERIFIED_SERVICE_DETAILS',
  VERIFIED_TESTIMONIALS: 'VERIFIED_TESTIMONIALS',
  PACKAGE_FAMILY_LAKE_ESCAPE_STARTING_PRICE: 'PACKAGE_FAMILY_LAKE_ESCAPE_STARTING_PRICE',
  ARTICLE_FAMILY_TRAVEL_PLANNING_AUTHOR: 'ARTICLE_FAMILY_TRAVEL_PLANNING_AUTHOR',
  ARTICLE_FAMILY_TRAVEL_PLANNING_REVIEWER: 'ARTICLE_FAMILY_TRAVEL_PLANNING_REVIEWER',
  ARTICLE_FAMILY_TRAVEL_PLANNING_PUBLISHED_DATE: 'ARTICLE_FAMILY_TRAVEL_PLANNING_PUBLISHED_DATE',
  ARTICLE_FAMILY_TRAVEL_PLANNING_REVIEW_DATE: 'ARTICLE_FAMILY_TRAVEL_PLANNING_REVIEW_DATE',
  ARTICLE_FAMILY_TRAVEL_PLANNING_READING_TIME: 'ARTICLE_FAMILY_TRAVEL_PLANNING_READING_TIME',
  ARTICLE_FAMILY_TRAVEL_PLANNING_SOURCE_LINKS: 'ARTICLE_FAMILY_TRAVEL_PLANNING_SOURCE_LINKS',
  WELCOME_PICKUPS_PROVIDER: 'Welcome Pickups',
  TRAVELPAYOUTS_MARKER: '641087',
  TRAVELPAYOUTS_CAMPAIGN_ID: '627',
  TRAVELPAYOUTS_PROMO_ID: '8951'
});

export const JOURNEY_PILLARS = Object.freeze([
  Object.freeze({
    id: 'pilgrimage',
    labels: Object.freeze({ id: 'Haji & Umrah', en: 'Hajj & Umrah' }),
    routeKey: 'pilgrimage-overview',
    heroAsset: asset('hero-umrah-master.png'),
    mobileHeroAsset: asset('hero-umrah-mobile.png'),
    requiresHumanAccuracyReview: true
  }),
  Object.freeze({
    id: 'worldwide',
    labels: Object.freeze({ id: 'Wisata Dunia', en: 'Worldwide Travel' }),
    routeKey: 'worldwide-overview',
    heroAsset: asset('hero-worldwide-master.png'),
    mobileHeroAsset: asset('hero-worldwide-mobile.png'),
    requiresHumanAccuracyReview: false
  })
]);

export const ROUTE_LABELS = Object.freeze({
  home: Object.freeze({ id: 'Beranda', en: 'Home' }),
  'pilgrimage-overview': Object.freeze({ id: 'Haji & Umrah', en: 'Hajj & Umrah' }),
  'umrah-packages': Object.freeze({ id: 'Paket Umrah', en: 'Umrah Packages' }),
  'umrah-preparation': Object.freeze({ id: 'Persiapan Umrah', en: 'Umrah Preparation' }),
  'hajj-information': Object.freeze({ id: 'Informasi Haji', en: 'Hajj Information' }),
  'worldwide-overview': Object.freeze({ id: 'Wisata Dunia', en: 'Worldwide Travel' }),
  destinations: Object.freeze({ id: 'Destinasi', en: 'Destinations' }),
  'destination-detail': Object.freeze({ id: 'Detail destinasi', en: 'Destination details' }),
  packages: Object.freeze({ id: 'Paket', en: 'Packages' }),
  'package-detail': Object.freeze({ id: 'Detail paket', en: 'Package details' }),
  'custom-trip': Object.freeze({ id: 'Perjalanan Kustom', en: 'Custom Trip' }),
  'family-group': Object.freeze({ id: 'Keluarga & Grup', en: 'Family & Group' }),
  'travel-tools': Object.freeze({ id: 'Travel Tools', en: 'Travel Tools' }),
  about: Object.freeze({ id: 'Tentang Rasuna', en: 'About Rasuna' }),
  'why-rasuna': Object.freeze({ id: 'Mengapa Rasuna', en: 'Why Rasuna' }),
  jakarta: Object.freeze({ id: 'Jakarta', en: 'Jakarta' }),
  bandung: Object.freeze({ id: 'Bandung', en: 'Bandung' }),
  articles: Object.freeze({ id: 'Artikel', en: 'Articles' }),
  'article-detail': Object.freeze({ id: 'Detail artikel', en: 'Article details' }),
  faq: Object.freeze({ id: 'Pertanyaan Umum', en: 'Frequently Asked Questions' }),
  contact: Object.freeze({ id: 'Kontak', en: 'Contact' }),
  privacy: Object.freeze({ id: 'Privasi', en: 'Privacy' }),
  cookies: Object.freeze({ id: 'Cookie', en: 'Cookies' }),
  'affiliate-disclosure': Object.freeze({ id: 'Pengungkapan Afiliasi', en: 'Affiliate Disclosure' }),
  terms: Object.freeze({ id: 'Syarat', en: 'Terms' }),
  accessibility: Object.freeze({ id: 'Aksesibilitas', en: 'Accessibility' }),
  'not-found': Object.freeze({ id: 'Halaman tidak ditemukan', en: 'Page not found' })
});

export const NAVIGATION_GROUPS = Object.freeze([
  Object.freeze({
    id: 'pilgrimage',
    label: Object.freeze({ id: 'Haji & Umrah', en: 'Hajj & Umrah' }),
    routes: Object.freeze(['pilgrimage-overview', 'umrah-packages', 'umrah-preparation', 'hajj-information'])
  }),
  Object.freeze({
    id: 'worldwide',
    label: Object.freeze({ id: 'Wisata Dunia', en: 'Worldwide Travel' }),
    routes: Object.freeze(['worldwide-overview', 'destinations', 'packages', 'custom-trip', 'family-group'])
  })
]);

export const PACKAGES = Object.freeze([
  Object.freeze({
    slug: 'family-lake-escape',
    pillar: 'worldwide',
    labels: Object.freeze({ id: 'Liburan Danau Keluarga', en: 'Family Lake Escape' }),
    heroAsset: asset('package-detail-family-hero.png'),
    cardAsset: asset('family-group-travel.png'),
    description: localized(
      'Inspirasi perjalanan keluarga ke Jepang dengan perpaduan kota, jeda alam, dan waktu istirahat yang tidak terlalu padat.',
      'A family-travel idea for Japan that balances city time, nature pauses, and a schedule that does not feel overpacked.'
    ),
    duration: localized('Contoh 7 hari / 6 malam', 'Example 7 days / 6 nights'),
    planning: localized(
      'Benchmark pasar untuk paket grup Jepang. Musim, kota keberangkatan, tipe kamar, visa, dan jumlah peserta mengubah harga akhir.',
      'A market benchmark for a Japan group package. Season, departure city, room type, visa, and party size change the final quote.'
    ),
    highlights: localizedList(
      ['Ritme kota dan alam yang seimbang', 'Jeda yang lebih mudah diikuti anak dan orang tua', 'Ruang untuk makanan, ibadah, dan waktu bebas'],
      ['A balanced city-and-nature rhythm', 'Pauses that are easier for children and older travellers', 'Room for meals, prayer, and independent time']
    ),
    itinerary: localizedList(
      ['Mulai dari kota utama dengan hari pertama yang ringan', 'Sisihkan satu jeda alam atau danau sebelum berpindah kota', 'Tutup perjalanan dengan waktu bebas dan pengecekan pulang'],
      ['Begin in a main city with a light first day', 'Place a nature or lake pause before changing cities', 'End with free time and a calm departure check']
    ),
    includes: localizedList(
      ['Rute dan tempo perjalanan untuk dibahas', 'Pilihan penerbangan, hotel, transportasi, dan bagasi', 'Opsi kebutuhan anak, lansia, dan aksesibilitas'],
      ['A route and pace to discuss', 'Flight, hotel, transport, and baggage options', 'Options for children, older travellers, and accessibility needs']
    ),
    excludes: localizedList(
      ['Visa, tipping, pengeluaran pribadi, dan perubahan kurs perlu dihitung terpisah', 'Tiket atraksi dan pilihan makan mengikuti rencana final', 'Jadwal serta ketersediaan tidak dijamin oleh halaman ini'],
      ['Visa, tipping, personal spending, and exchange-rate changes need separate planning', 'Attraction tickets and meal choices follow the final plan', 'This page does not guarantee schedules or availability']
    ),
    suitableFor: localizedList(
      ['Keluarga yang ingin perjalanan luar negeri pertama terasa teratur', 'Kelompok kecil dengan kebutuhan jeda dan kenyamanan yang berbeda', 'Orang tua yang ingin ikut tanpa mengejar terlalu banyak tempat'],
      ['Families who want a structured first overseas trip', 'Small groups with different pause and comfort needs', 'Parents or older relatives who prefer fewer rushed stops']
    ),
    preparation: localizedList(
      ['Tentukan rentang tanggal dan usia peserta', 'Catat kebutuhan kamar, makanan, obat, dan mobilitas', 'Siapkan paspor serta pertanyaan tentang visa sebelum meminta penawaran'],
      ['Choose an approximate date range and list traveller ages', 'Note room, food, medicine, and mobility needs', 'Prepare passports and visa questions before requesting a quote']
    ),
    faqs: localizedFaqs(
      [
        { question: 'Apakah harga ini sudah pasti?', answer: 'Belum. Ini benchmark pasar per orang untuk membantu menyusun anggaran; harga final mengikuti rencana dan konfirmasi terbaru.' },
        { question: 'Kapan waktu yang nyaman untuk keluarga?', answer: 'Tentukan berdasarkan cuaca, kalender sekolah, usia peserta, dan toleransi terhadap perpindahan kota; kami dapat membandingkan beberapa ritme.' }
      ],
      [
        { question: 'Is this a confirmed price?', answer: 'No. It is a per-person market benchmark to help with planning; the final quote follows the confirmed plan and current checks.' },
        { question: 'When is a comfortable time for a family?', answer: 'Consider weather, school calendars, traveller ages, and tolerance for city changes; we can compare different rhythms.' }
      ]
    ),
    pricing: Object.freeze({
      mode: 'from',
      value: 19990000,
      currency: 'IDR',
      unit: 'person',
      basis: 'market-benchmark',
      benchmarkDate: '2026-08',
      references: Object.freeze([{ label: 'Japan tour market reference', url: 'https://www.ascentatour.com/destinations/paket-tour-jepang' }])
    }),
    availability: 'static-guidance'
  }),
  Object.freeze({
    slug: 'coastal-couple-journey',
    pillar: 'worldwide',
    labels: Object.freeze({ id: 'Perjalanan Pesisir Berdua', en: 'Coastal Couple Journey' }),
    heroAsset: asset('traveler-couple.png'),
    description: localized(
      'Inspirasi liburan pesisir berdua dengan hari yang longgar, pilihan makan yang fleksibel, dan waktu untuk menikmati suasana setempat.',
      'A coastal couple-trip idea with unhurried days, flexible meal choices, and time to enjoy the local atmosphere.'
    ),
    duration: localized('Contoh 4 hari / 3 malam', 'Example 4 days / 3 nights'),
    planning: localized(
      'Benchmark land-package domestik untuk perjalanan pesisir. Tiket menuju kota tujuan, musim ramai, hotel, dan aktivitas tambahan dapat mengubah total.',
      'A domestic land-package benchmark for a coastal trip. Flights to the destination, peak periods, hotels, and add-on activities can change the total.'
    ),
    highlights: localizedList(
      ['Hari pertama tanpa agenda yang terburu-buru', 'Pilihan pantai, kuliner, dan waktu bebas', 'Ruang untuk mengubah tempo sesuai minat berdua'],
      ['An unhurried first day', 'A mix of coast, food, and free time', 'Room to change the pace around both travellers’ interests']
    ),
    itinerary: localizedList(
      ['Kedatangan dan orientasi lingkungan sekitar', 'Satu hari eksplorasi pesisir dengan pilihan aktivitas', 'Penutup yang ringan sebelum perjalanan pulang'],
      ['Arrival and orientation around the neighbourhood', 'A coastal exploration day with activity choices', 'A light final day before travelling home']
    ),
    includes: localizedList(
      ['Pilihan hotel dan transportasi lokal untuk dibandingkan', 'Aktivitas yang dapat dipilih sesuai energi dan cuaca', 'Rekomendasi jeda dan tempat makan yang mudah dijangkau'],
      ['Hotel and local-transport options to compare', 'Activities chosen around energy and weather', 'Pause and dining ideas that are easy to reach']
    ),
    excludes: localizedList(
      ['Tiket pesawat, pengeluaran pribadi, dan aktivitas opsional belum otomatis termasuk', 'Cuaca dapat mengubah urutan aktivitas', 'Harga akhir mengikuti jumlah peserta dan tipe kamar'],
      ['Flights, personal spending, and optional activities are not automatically included', 'Weather can change the order of activities', 'The final price follows party size and room type']
    ),
    suitableFor: localizedList(
      ['Pasangan yang ingin merayakan momen tanpa jadwal padat', 'Perjalanan singkat dengan kombinasi istirahat dan pengalaman lokal', 'Kebutuhan makanan atau aksesibilitas yang ingin dibicarakan sejak awal'],
      ['Couples who want a celebration without a packed schedule', 'A short trip combining rest and local experiences', 'Food or accessibility needs to discuss from the start']
    ),
    preparation: localizedList(
      ['Pilih suasana: tenang, kuliner, alam, atau aktivitas', 'Tentukan batas anggaran untuk hotel dan pengalaman', 'Bagikan preferensi privasi, mobilitas, dan waktu bebas'],
      ['Choose the mood: quiet, food, nature, or activities', 'Set a budget boundary for hotels and experiences', 'Share privacy, mobility, and free-time preferences']
    ),
    faqs: localizedFaqs(
      [
        { question: 'Apakah benchmark ini termasuk penerbangan?', answer: 'Benchmark ini mengacu pada contoh paket darat domestik; penerbangan dan tambahan lain perlu dikonfirmasi sesuai kota asal.' },
        { question: 'Bisakah perjalanan dibuat lebih privat?', answer: 'Bisa dibahas. Jumlah peserta, kendaraan, hotel, dan aktivitas akan memengaruhi rencana serta harga.' }
      ],
      [
        { question: 'Does the benchmark include flights?', answer: 'It refers to a domestic land-package example; flights and other additions need confirmation from your departure city.' },
        { question: 'Can the trip be more private?', answer: 'That can be discussed. Party size, vehicle, hotel, and activities affect the plan and price.' }
      ]
    ),
    pricing: Object.freeze({
      mode: 'from',
      value: 2350000,
      currency: 'IDR',
      unit: 'person',
      basis: 'market-benchmark',
      benchmarkDate: '2026-08',
      references: Object.freeze([{ label: 'Domestic coastal package reference', url: 'https://www.traveloka.com/id-id/activities/indonesia/product/holiday-package-to-bali-4-days-3-nights-unique-4424849498033' }])
    }),
    availability: 'static-guidance'
  }),
  Object.freeze({
    slug: 'mountain-rail-discovery',
    pillar: 'worldwide',
    labels: Object.freeze({ id: 'Jelajah Kereta Pegunungan', en: 'Mountain Rail Discovery' }),
    heroAsset: asset('traveler-solo.png'),
    description: localized(
      'Inspirasi perjalanan lanskap pegunungan dengan kereta, kota kecil, dan waktu berjalan yang dapat disusun sesuai stamina.',
      'A mountain-and-rail travel idea with scenic trains, smaller towns, and walking time shaped around your stamina.'
    ),
    duration: localized('Contoh 9–11 hari', 'Example 9–11 days'),
    planning: localized(
      'Benchmark pasar untuk perjalanan grup Eropa. Visa, kurs, musim, rute kereta, dan pilihan hotel sangat memengaruhi penawaran akhir.',
      'A market benchmark for a Europe group trip. Visa, exchange rates, season, rail routes, and hotel choices strongly affect the final quote.'
    ),
    highlights: localizedList(
      ['Perpindahan dengan pemandangan sebagai bagian dari pengalaman', 'Kota kecil dan waktu jeda di antara destinasi utama', 'Pilihan ritme untuk traveler mandiri atau kelompok kecil'],
      ['Scenic transfers as part of the experience', 'Smaller towns and pauses between main destinations', 'Pace options for solo travellers or small groups']
    ),
    itinerary: localizedList(
      ['Mulai dari kota hub untuk orientasi dan penyesuaian waktu', 'Susun satu segmen kereta dengan pemandangan sebagai pengalaman utama', 'Sisakan buffer untuk cuaca, koneksi, dan hari pulang'],
      ['Begin in a hub city for orientation and time-zone adjustment', 'Make one scenic rail segment a centrepiece', 'Leave buffer for weather, connections, and the return day']
    ),
    includes: localizedList(
      ['Perbandingan rute kereta, hotel, dan kendaraan penghubung', 'Pilihan bantuan visa dan asuransi untuk dibicarakan', 'Rencana cadangan jika cuaca atau koneksi berubah'],
      ['Comparison of rail routes, hotels, and connecting transport', 'Visa and insurance support options to discuss', 'A backup plan if weather or connections change']
    ),
    excludes: localizedList(
      ['Visa, asuransi, tipping, makan, dan pengeluaran pribadi mengikuti paket final', 'Jadwal kereta dan tiket dapat berubah sebelum diterbitkan', 'Harga benchmark bukan penawaran untuk tanggal tertentu'],
      ['Visa, insurance, tipping, meals, and personal spending follow the final package', 'Rail schedules and tickets can change before issue', 'The benchmark is not a quote for a specific date']
    ),
    suitableFor: localizedList(
      ['Traveler yang menikmati perjalanan sebagai bagian dari tujuan', 'Kelompok yang dapat mengikuti perpindahan dan berjalan ringan', 'Peserta yang ingin membandingkan rute sebelum memilih'],
      ['Travellers who enjoy the journey as part of the destination', 'Groups comfortable with transfers and light walking', 'People who want to compare routes before choosing']
    ),
    preparation: localizedList(
      ['Tentukan toleransi berjalan dan jumlah bagasi', 'Periksa masa berlaku paspor serta kebutuhan visa', 'Siapkan preferensi kursi, makanan, dan waktu bebas'],
      ['Set a walking and luggage tolerance', 'Check passport validity and visa needs', 'Prepare seating, meal, and free-time preferences']
    ),
    faqs: localizedFaqs(
      [
        { question: 'Mengapa benchmark Eropa cukup lebar?', answer: 'Penerbangan, visa, musim, kurs, jarak antar kota, dan kelas hotel membuat biaya dapat berubah cukup besar.' },
        { question: 'Apakah kereta selalu menjadi transportasi utama?', answer: 'Tidak selalu. Rute dapat menggabungkan kereta, kendaraan lokal, dan waktu bebas sesuai tujuan dan kebutuhan kelompok.' }
      ],
      [
        { question: 'Why is the Europe benchmark relatively high?', answer: 'Flights, visas, season, exchange rates, intercity distance, and hotel class can move the cost significantly.' },
        { question: 'Will rail always be the main transport?', answer: 'Not always. The route may combine rail, local vehicles, and free time around the destination and group needs.' }
      ]
    ),
    pricing: Object.freeze({
      mode: 'from',
      value: 28900000,
      currency: 'IDR',
      unit: 'person',
      basis: 'market-benchmark',
      benchmarkDate: '2026-08',
      references: Object.freeze([{ label: 'Europe tour market reference', url: 'https://www.avenirtravel.co.id/article/biaya-tour-eropa-10-hari-dari-indonesia' }])
    }),
    availability: 'static-guidance'
  }),
  Object.freeze({
    slug: 'family-umrah-guidance',
    pillar: 'pilgrimage',
    labels: Object.freeze({ id: 'Panduan Umrah Keluarga', en: 'Family Umrah Guidance' }),
    heroAsset: asset('hero-umrah-master.png'),
    description: localized(
      'Arahan awal untuk keluarga yang ingin menyiapkan Umrah dengan ritme ibadah, kenyamanan, dan kebutuhan lintas generasi.',
      'Early guidance for families preparing for Umrah with attention to worship, comfort, and multigenerational needs.'
    ),
    duration: localized('Contoh 12–14 hari', 'Example 12–14 days'),
    planning: localized(
      'Benchmark pasar untuk paket Umrah reguler dengan okupansi quad. Periode, maskapai, hotel, kurs, izin, dan kebutuhan peserta harus diverifikasi sebelum mendaftar.',
      'A market benchmark for a regular Umrah package with quad occupancy. Period, airline, hotel, exchange rate, licensing, and traveller needs must be verified before registration.'
    ),
    highlights: localizedList(
      ['Persiapan manasik dan dokumen secara bertahap', 'Ritme yang mempertimbangkan lansia dan anak', 'Ruang untuk membahas hotel, transportasi, makanan, dan pendampingan'],
      ['Step-by-step preparation for rituals and documents', 'A rhythm that considers older travellers and children', 'Room to discuss hotels, transport, meals, and guidance']
    ),
    itinerary: localizedList(
      ['Mulai dari konsultasi kebutuhan dan pemeriksaan legalitas penyelenggara', 'Susun urutan Madinah–Makkah atau sebaliknya setelah program terverifikasi', 'Tutup dengan daftar dokumen, kesehatan, dan kepulangan'],
      ['Begin with needs and organizer-verification questions', 'Set the Madinah–Makkah order after the program is verified', 'Finish with document, health, and return checklists']
    ),
    includes: localizedList(
      ['Penjelasan komponen paket untuk dibandingkan', 'Daftar pertanyaan tentang visa, hotel, transportasi, makan, dan pendamping', 'Panduan komunikasi kebutuhan keluarga'],
      ['An explanation of package components to compare', 'Questions about visas, hotels, transport, meals, and guidance', 'A way to communicate family needs clearly']
    ),
    excludes: localizedList(
      ['Benchmark bukan jadwal keberangkatan atau penawaran resmi', 'Paspor, vaksin, pengeluaran pribadi, dan kebutuhan daerah asal perlu dikonfirmasi', 'Legalitas penyelenggara dan detail layanan wajib diperiksa sebelum pembayaran'],
      ['The benchmark is not a departure schedule or official offer', 'Passports, vaccines, personal spending, and travel from your home city need confirmation', 'Organizer credentials and service details must be checked before payment']
    ),
    suitableFor: localizedList(
      ['Keluarga yang baru pertama kali menyiapkan Umrah', 'Rombongan dengan anak, lansia, atau kebutuhan aksesibilitas', 'Calon jamaah yang ingin membandingkan komponen paket dengan tenang'],
      ['Families preparing for Umrah for the first time', 'Groups with children, older travellers, or accessibility needs', 'Travellers who want to compare package components calmly']
    ),
    preparation: localizedList(
      ['Catat usia, kondisi kesehatan, dan kebutuhan mobilitas peserta', 'Siapkan paspor dan pertanyaan tentang vaksin atau dokumen', 'Minta penjelasan tertulis tentang izin, hotel, penerbangan, dan kebijakan pembatalan'],
      ['List traveller ages, health considerations, and mobility needs', 'Prepare passports and vaccine or document questions', 'Ask for written details on licensing, hotels, flights, and cancellation rules']
    ),
    faqs: localizedFaqs(
      [
        { question: 'Apakah benchmark Umrah ini adalah harga pendaftaran Rasuna?', answer: 'Bukan. Ini angka pembanding pasar per orang untuk membantu menyusun anggaran; program resmi dan harga final perlu diverifikasi langsung.' },
        { question: 'Apa yang harus dicek sebelum membayar?', answer: 'Periksa izin penyelenggara, kontrak, jadwal, hotel, maskapai, visa, komponen termasuk/tidak termasuk, serta kebijakan pembatalan.' }
      ],
      [
        { question: 'Is this Rasuna’s registration price?', answer: 'No. It is a per-person market comparison to help plan a budget; the official program and final price need direct verification.' },
        { question: 'What should be checked before payment?', answer: 'Check the organizer’s credentials, contract, schedule, hotels, airline, visa, inclusions/exclusions, and cancellation policy.' }
      ]
    ),
    pricing: Object.freeze({
      mode: 'from',
      value: 28750000,
      currency: 'IDR',
      unit: 'person',
      basis: 'market-benchmark',
      benchmarkDate: '2026-08',
      references: Object.freeze([{ label: 'Regular Umrah market reference', url: 'https://www.embunnabawiwisata.id/home/paket' }])
    }),
    availability: 'static-guidance'
  })
]);

export const DESTINATIONS = Object.freeze([
  Object.freeze({
    slug: 'japan-family',
    labels: Object.freeze({ id: 'Jepang', en: 'Japan' }),
    image: asset('destination-japan.png'),
    description: localized(
      'Jepang cocok untuk keluarga yang ingin menggabungkan kota modern, budaya, transportasi teratur, dan jeda alam. Ritme perlu disusun agar perpindahan tidak mengalahkan pengalaman.',
      'Japan suits families who want modern cities, culture, orderly transport, and nature pauses. The rhythm should be planned so transfers do not overwhelm the experience.'
    ),
    highlights: localizedList(
      ['Kota besar dan lingkungan tradisional', 'Jeda alam atau danau untuk mengurangi kepadatan agenda', 'Pilihan transportasi yang perlu dipahami sejak awal'],
      ['Large cities and traditional neighbourhoods', 'Nature or lake pauses to soften a busy itinerary', 'Transport options worth understanding early']
    ),
    planningNotes: localizedList(
      ['Bandingkan musim, kalender sekolah, dan jam terbang', 'Hitung bagasi saat berpindah kota', 'Tentukan kapan keluarga membutuhkan hari bebas'],
      ['Compare seasons, school calendars, and flight times', 'Plan luggage for city changes', 'Decide where the family needs a free day']
    ),
    questions: localizedList(
      ['Berapa banyak perpindahan kota yang nyaman?', 'Apakah anak atau lansia memerlukan kamar dan transportasi khusus?', 'Apakah visa, internet, dan pembayaran sudah masuk daftar persiapan?'],
      ['How many city changes feel comfortable?', 'Do children or older travellers need specific rooms or transport?', 'Are visas, connectivity, and payments on the preparation list?']
    ),
    relatedPackageSlugs: Object.freeze(['family-lake-escape']),
    relatedArticleSlugs: Object.freeze(['family-travel-planning'])
  }),
  Object.freeze({
    slug: 'turkiye',
    labels: Object.freeze({ id: 'Turkiye', en: 'Türkiye' }),
    image: asset('destination-turkiye.png'),
    description: localized(
      'Türkiye menawarkan perpaduan sejarah, kuliner, lanskap, dan pengalaman lintas kota. Rencana yang baik memberi ruang untuk jarak antarkota, cuaca, dan kebutuhan makanan.',
      'Türkiye combines history, food, landscapes, and experiences across cities. A good plan leaves room for intercity distances, weather, and food needs.'
    ),
    highlights: localizedList(
      ['Sejarah dan budaya dalam satu perjalanan', 'Lanskap yang berbeda antara kota dan daerah alam', 'Pilihan perjalanan yang dapat dibuat santai atau padat'],
      ['History and culture in one trip', 'Different landscapes between cities and nature areas', 'A route that can be relaxed or more active']
    ),
    planningNotes: localizedList(
      ['Periksa kebutuhan visa dan masa berlaku paspor', 'Sediakan buffer untuk penerbangan domestik atau perpindahan darat', 'Tanyakan opsi makanan serta waktu ibadah sebelum menyusun jadwal'],
      ['Check visa needs and passport validity', 'Leave buffer for domestic flights or overland transfers', 'Ask about food options and prayer time before finalising the route']
    ),
    questions: localizedList(
      ['Apakah kelompok nyaman dengan beberapa kota?', 'Berapa banyak waktu yang ingin dihabiskan untuk budaya dibanding alam?', 'Apakah koper dan mobilitas memengaruhi pilihan hotel?'],
      ['Is the group comfortable with several cities?', 'How much time should go to culture versus nature?', 'Do luggage and mobility affect hotel choices?']
    ),
    relatedPackageSlugs: Object.freeze(['mountain-rail-discovery'])
  }),
  Object.freeze({
    slug: 'bali',
    labels: Object.freeze({ id: 'Bali', en: 'Bali' }),
    image: asset('destination-bali.png'),
    description: localized(
      'Bali dapat menjadi perjalanan singkat maupun jeda keluarga yang lebih lambat. Pilihan kawasan, musim, lalu lintas, dan cara berkunjung perlu disesuaikan dengan komunitas setempat.',
      'Bali can work as a short escape or a slower family break. Area choice, season, traffic, and respectful visits should be planned around local communities.'
    ),
    highlights: localizedList(
      ['Pantai, alam, seni, dan kuliner dengan karakter berbeda', 'Pilihan tempo dari istirahat hingga aktivitas ringan', 'Ruang untuk menghormati adat dan lingkungan setempat'],
      ['Coast, nature, arts, and food with different character', 'A pace ranging from rest to light activity', 'Room to respect local customs and the environment']
    ),
    planningNotes: localizedList(
      ['Pilih kawasan berdasarkan jarak, bukan hanya daftar objek', 'Perhitungkan lalu lintas dan waktu transfer', 'Tanyakan aturan berpakaian, upacara, dan etika kunjungan'],
      ['Choose areas by distance, not only by a list of sights', 'Allow for traffic and transfer time', 'Ask about dress, ceremonies, and visiting etiquette']
    ),
    questions: localizedList(
      ['Apakah keluarga lebih membutuhkan pantai, alam, atau budaya?', 'Berapa lama waktu yang nyaman di jalan setiap hari?', 'Apa kebutuhan kamar, makanan, atau aksesibilitas yang penting?'],
      ['Does the family need more coast, nature, or culture?', 'How much daily road time feels comfortable?', 'Which room, food, or accessibility needs matter most?']
    ),
    relatedPackageSlugs: Object.freeze(['coastal-couple-journey']),
    requiresCulturalReview: true
  })
]);

export const ARTICLES = Object.freeze([
  Object.freeze({
    slug: 'family-travel-planning',
    labels: Object.freeze({ id: 'Merencanakan Perjalanan Keluarga', en: 'Planning Family Travel' }),
    image: asset('article-family-travel-planning.png'),
    metadata: Object.freeze({
      author: 'Tim Editorial Rasuna Travel',
      reviewer: 'Pemeriksaan internal Rasuna Travel',
      publishedDate: '17 Agustus 2026',
      reviewDate: '17 Agustus 2026',
      readingTime: '6 menit',
      sourceLinks: Object.freeze([
        Object.freeze({ label: 'Indonesia Travel', url: 'https://www.indonesia.travel/' }),
        Object.freeze({ label: 'Direktorat Jenderal Imigrasi', url: 'https://www.imigrasi.go.id/' })
      ])
    }),
    sections: localizedSections(
      [
        { heading: 'Mulai dari ritme, bukan daftar tempat', paragraphs: ['Perjalanan keluarga terasa lebih ringan ketika jumlah perpindahan, waktu makan, dan jeda istirahat dibicarakan sejak awal. Daftar objek yang panjang belum tentu cocok untuk semua anggota keluarga.', 'Pilih dua atau tiga pengalaman utama, lalu sisakan ruang untuk cuaca, energi anak, dan kebutuhan spontan.'] },
        { heading: 'Buat hari yang mudah diikuti', paragraphs: ['Kelompokkan tempat yang berdekatan dan hindari menaruh perjalanan jauh setelah hari kedatangan. Satu hari bebas dapat menjadi pengaman saat tubuh perlu beradaptasi.', 'Tuliskan waktu tempuh, akses toilet, pilihan makanan, dan tempat duduk sebagai bagian dari rencana—bukan detail tambahan.'] },
        { heading: 'Siapkan pertanyaan sebelum meminta harga', paragraphs: ['Tanyakan apa yang termasuk, apa yang perlu dibayar terpisah, aturan perubahan, serta cara kebutuhan anak atau lansia ditangani.', 'Gunakan benchmark pada halaman paket sebagai titik awal anggaran. Harga akhir baru dapat dibandingkan setelah tanggal, peserta, rute, dan komponen layanan jelas.'] }
      ],
      [
        { heading: 'Plan the rhythm before the checklist', paragraphs: ['Family travel feels lighter when city changes, meal times, and rest breaks are discussed early. A long list of sights may not suit every traveller.', 'Choose two or three anchor experiences and leave room for weather, children’s energy, and spontaneous needs.'] },
        { heading: 'Make each day easy to follow', paragraphs: ['Group nearby places together and avoid a long transfer immediately after arrival. A free day can protect the plan when bodies need time to adjust.', 'Write down transfer times, toilet access, food options, and seating as part of the plan—not as afterthoughts.'] },
        { heading: 'Prepare questions before asking for a price', paragraphs: ['Ask what is included, what is paid separately, how changes work, and how children’s or older travellers’ needs are handled.', 'Use package benchmarks as a starting budget only. A final comparison needs clear dates, travellers, route, and service components.'] }
      ]
    ),
    relatedPackageSlugs: Object.freeze(['family-lake-escape'])
  })
]);

export const REFERRAL_PROVIDERS = Object.freeze([
  Object.freeze({
    id: 'welcome-pickups',
    name: SITE_CONFIG.WELCOME_PICKUPS_PROVIDER,
    network: 'Travelpayouts',
    category: 'airport-transfer',
    status: 'active',
    expiresAt: null,
    marker: SITE_CONFIG.TRAVELPAYOUTS_MARKER,
    campaignId: SITE_CONFIG.TRAVELPAYOUTS_CAMPAIGN_ID,
    promoId: SITE_CONFIG.TRAVELPAYOUTS_PROMO_ID,
    externalUrl: `https://www.welcomepickups.com/?marker=${SITE_CONFIG.TRAVELPAYOUTS_MARKER}&campaign=${SITE_CONFIG.TRAVELPAYOUTS_CAMPAIGN_ID}&promo=${SITE_CONFIG.TRAVELPAYOUTS_PROMO_ID}`
  })
]);

export const SUPPORTED_ROUTES = Object.freeze([
  Object.freeze({ key: 'home', paths: Object.freeze({ id: '', en: '' }) }),
  Object.freeze({ key: 'pilgrimage-overview', paths: Object.freeze({ id: 'haji-umrah', en: 'hajj-umrah' }) }),
  Object.freeze({ key: 'umrah-packages', paths: Object.freeze({ id: 'haji-umrah/paket-umrah', en: 'hajj-umrah/umrah-packages' }) }),
  Object.freeze({ key: 'umrah-preparation', paths: Object.freeze({ id: 'haji-umrah/persiapan-umrah', en: 'hajj-umrah/umrah-preparation' }) }),
  Object.freeze({ key: 'hajj-information', paths: Object.freeze({ id: 'haji-umrah/informasi-haji', en: 'hajj-umrah/hajj-information' }) }),
  Object.freeze({ key: 'worldwide-overview', paths: Object.freeze({ id: 'wisata-dunia', en: 'worldwide' }) }),
  Object.freeze({ key: 'destinations', paths: Object.freeze({ id: 'wisata-dunia/destinasi', en: 'worldwide/destinations' }) }),
  Object.freeze({ key: 'destination-detail', paths: Object.freeze({ id: 'wisata-dunia/destinasi/:slug', en: 'worldwide/destinations/:slug' }) }),
  Object.freeze({ key: 'packages', paths: Object.freeze({ id: 'paket', en: 'worldwide/paket' }) }),
  Object.freeze({ key: 'package-detail', paths: Object.freeze({ id: 'paket/:slug', en: 'worldwide/paket/:slug' }) }),
  Object.freeze({ key: 'custom-trip', paths: Object.freeze({ id: 'perjalanan-kustom', en: 'custom-trip' }) }),
  Object.freeze({ key: 'family-group', paths: Object.freeze({ id: 'keluarga-grup', en: 'family-group' }) }),
  Object.freeze({ key: 'travel-tools', paths: Object.freeze({ id: 'travel-tools', en: 'travel-tools' }) }),
  Object.freeze({ key: 'about', paths: Object.freeze({ id: 'tentang', en: 'about' }) }),
  Object.freeze({ key: 'why-rasuna', paths: Object.freeze({ id: 'mengapa-rasuna', en: 'why-rasuna' }) }),
  Object.freeze({ key: 'jakarta', paths: Object.freeze({ id: 'jakarta', en: 'jakarta' }) }),
  Object.freeze({ key: 'bandung', paths: Object.freeze({ id: 'bandung', en: 'bandung' }) }),
  Object.freeze({ key: 'articles', paths: Object.freeze({ id: 'artikel', en: 'articles' }) }),
  Object.freeze({ key: 'article-detail', paths: Object.freeze({ id: 'artikel/:slug', en: 'articles/:slug' }) }),
  Object.freeze({ key: 'faq', paths: Object.freeze({ id: 'faq', en: 'faq' }) }),
  Object.freeze({ key: 'contact', paths: Object.freeze({ id: 'kontak', en: 'contact' }) }),
  Object.freeze({ key: 'privacy', paths: Object.freeze({ id: 'privasi', en: 'privacy' }) }),
  Object.freeze({ key: 'cookies', paths: Object.freeze({ id: 'cookie', en: 'cookies' }) }),
  Object.freeze({ key: 'affiliate-disclosure', paths: Object.freeze({ id: 'pengungkapan-afiliasi', en: 'affiliate-disclosure' }) }),
  Object.freeze({ key: 'terms', paths: Object.freeze({ id: 'syarat', en: 'terms' }) }),
  Object.freeze({ key: 'accessibility', paths: Object.freeze({ id: 'aksesibilitas', en: 'accessibility' }) }),
  Object.freeze({ key: 'not-found', paths: Object.freeze({ id: '404', en: '404' }) })
]);
