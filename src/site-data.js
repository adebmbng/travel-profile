const asset = (filename) => `/assets/generated/${filename}`;

export const LANGUAGES = Object.freeze({
  id: Object.freeze({ code: 'id', label: 'Bahasa Indonesia', pathPrefix: 'id' }),
  en: Object.freeze({ code: 'en', label: 'English', pathPrefix: 'en' })
});

export const SITE_CONFIG = Object.freeze({
  SITE_ORIGIN: 'SITE_ORIGIN',
  PRIMARY_WHATSAPP_NUMBER: 'PRIMARY_WHATSAPP_NUMBER',
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

export const PACKAGES = Object.freeze([
  Object.freeze({
    slug: 'family-lake-escape',
    pillar: 'worldwide',
    labels: Object.freeze({ id: 'Liburan Danau Keluarga', en: 'Family Lake Escape' }),
    heroAsset: asset('package-detail-family-hero.png'),
    cardAsset: asset('family-group-travel.png'),
    pricing: Object.freeze({
      mode: 'from',
      value: SITE_CONFIG.PACKAGE_FAMILY_LAKE_ESCAPE_STARTING_PRICE,
      currency: 'IDR',
      verified: false
    }),
    availability: 'static-guidance'
  }),
  Object.freeze({
    slug: 'coastal-couple-journey',
    pillar: 'worldwide',
    labels: Object.freeze({ id: 'Perjalanan Pesisir Berdua', en: 'Coastal Couple Journey' }),
    heroAsset: asset('traveler-couple.png'),
    pricing: Object.freeze({ mode: 'consultation' }),
    availability: 'static-guidance'
  }),
  Object.freeze({
    slug: 'mountain-rail-discovery',
    pillar: 'worldwide',
    labels: Object.freeze({ id: 'Jelajah Kereta Pegunungan', en: 'Mountain Rail Discovery' }),
    heroAsset: asset('traveler-solo.png'),
    pricing: Object.freeze({ mode: 'consultation' }),
    availability: 'static-guidance'
  }),
  Object.freeze({
    slug: 'family-umrah-guidance',
    pillar: 'pilgrimage',
    labels: Object.freeze({ id: 'Panduan Umrah Keluarga', en: 'Family Umrah Guidance' }),
    heroAsset: asset('hero-umrah-master.png'),
    pricing: Object.freeze({ mode: 'consultation' }),
    availability: 'static-guidance'
  })
]);

export const DESTINATIONS = Object.freeze([
  Object.freeze({
    slug: 'japan',
    labels: Object.freeze({ id: 'Jepang', en: 'Japan' }),
    image: asset('destination-japan.png')
  }),
  Object.freeze({
    slug: 'turkiye',
    labels: Object.freeze({ id: 'Turkiye', en: 'Türkiye' }),
    image: asset('destination-turkiye.png')
  }),
  Object.freeze({
    slug: 'bali',
    labels: Object.freeze({ id: 'Bali', en: 'Bali' }),
    image: asset('destination-bali.png'),
    requiresCulturalReview: true
  })
]);

export const ARTICLES = Object.freeze([
  Object.freeze({
    slug: 'family-travel-planning',
    labels: Object.freeze({ id: 'Merencanakan Perjalanan Keluarga', en: 'Planning Family Travel' }),
    image: asset('article-family-travel-planning.png')
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
