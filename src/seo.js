import { ARTICLES, DESTINATIONS, LANGUAGES, PACKAGES, ROUTE_LABELS, SITE_CONFIG, SUPPORTED_ROUTES } from './site-data.js';
import { localizedPath } from './lib/route-utils.js';

const COPY = Object.freeze({
  id: Object.freeze({
    homeTitle: 'Rasuna Travel | Dua perjalanan, satu panduan tepercaya',
    homeDescription: 'Mulai percakapan perjalanan Haji & Umrah atau Wisata Dunia bersama Rasuna Travel dengan arahan yang tenang dan jelas.',
    suffix: ' | Rasuna Travel',
    notFoundTitle: 'Halaman tidak ditemukan | Rasuna Travel',
    notFoundDescription: 'Halaman yang Anda cari tidak tersedia. Gunakan navigasi Rasuna Travel untuk melanjutkan.',
    defaultDescription: 'Rasuna Travel membantu keluarga Indonesia menyusun pertanyaan, membandingkan arah perjalanan, dan mengonfirmasi detail melalui konsultasi.'
  }),
  en: Object.freeze({
    homeTitle: 'Rasuna Travel | Two journeys, one trusted guide',
    homeDescription: 'Begin a Hajj & Umrah or Worldwide Travel conversation with Rasuna Travel through calm, clear guidance.',
    suffix: ' | Rasuna Travel',
    notFoundTitle: 'Page not found | Rasuna Travel',
    notFoundDescription: 'The page you requested is not available. Use Rasuna Travel navigation to continue.',
    defaultDescription: 'Rasuna Travel helps Indonesian families shape questions, compare travel directions, and confirm details through consultation.'
  })
});

const ROUTE_DESCRIPTIONS = Object.freeze({
  id: Object.freeze({
    'pilgrimage-overview': 'Panduan awal Haji & Umrah yang tenang, informatif, dan berfokus pada detail yang perlu dikonfirmasi.',
    'umrah-packages': 'Jelajahi arahan paket Umrah keluarga dan siapkan pertanyaan untuk konsultasi Rasuna Travel.',
    'umrah-preparation': 'Catatan persiapan Umrah untuk membantu keluarga menyusun pertanyaan, dokumen, dan kebutuhan perjalanan.',
    'hajj-information': 'Informasi awal Haji dengan klaim konservatif dan ajakan untuk memeriksa detail melalui konsultasi.',
    'worldwide-overview': 'Temukan inspirasi Wisata Dunia yang ramah keluarga dan dapat dibicarakan sesuai kebutuhan.',
    destinations: 'Jelajahi inspirasi destinasi dan gunakan halaman ini sebagai titik awal perencanaan perjalanan.',
    packages: 'Lihat arahan paket perjalanan statis dan konfirmasikan detail, harga, serta ketersediaan melalui konsultasi.',
    'custom-trip': 'Mulai percakapan perjalanan kustom berdasarkan waktu, kelompok, minat, dan kebutuhan aksesibilitas.',
    'family-group': 'Rencanakan perjalanan keluarga dan grup dengan perhatian pada ritme, kenyamanan, dan kebutuhan lintas generasi.',
    'travel-tools': 'Gunakan Travel Tools pihak ketiga dengan pengungkapan afiliasi dan informasi eksternal yang jelas.',
    about: 'Kenali cara Rasuna Travel membantu keluarga memulai rencana perjalanan dengan percakapan yang jelas.',
    'why-rasuna': 'Pahami proses konsultasi dan prinsip Rasuna Travel dalam mendampingi rencana perjalanan.',
    jakarta: 'Mulai percakapan perjalanan dari Jakarta tanpa klaim kantor atau cakupan layanan yang belum terverifikasi.',
    bandung: 'Mulai percakapan perjalanan dari Bandung tanpa klaim kantor atau cakupan layanan yang belum terverifikasi.',
    articles: 'Baca panduan awal untuk membantu keluarga menyiapkan pertanyaan sebelum perjalanan.',
    faq: 'Temukan pertanyaan umum tentang cara memulai percakapan perjalanan bersama Rasuna Travel.',
    contact: 'Hubungi Rasuna Travel untuk memulai percakapan tentang kebutuhan perjalanan Anda.',
    privacy: 'Baca cara Rasuna Travel menjelaskan privasi dan pengelolaan data di situs ini.',
    cookies: 'Baca informasi tentang cookie dan penyimpanan yang digunakan situs Rasuna Travel.',
    'affiliate-disclosure': 'Baca pengungkapan hubungan afiliasi dan tautan layanan pihak ketiga Rasuna Travel.',
    terms: 'Baca syarat penggunaan informasi dan layanan di situs Rasuna Travel.',
    accessibility: 'Baca komitmen aksesibilitas dan cara melaporkan hambatan di situs Rasuna Travel.'
  }),
  en: Object.freeze({
    'pilgrimage-overview': 'A calm, informative starting point for Hajj & Umrah guidance and details that need confirmation.',
    'umrah-packages': 'Explore family Umrah package guidance and prepare questions for a Rasuna Travel consultation.',
    'umrah-preparation': 'Early Umrah preparation notes to help families organize questions, documents, and travel needs.',
    'hajj-information': 'Early Hajj information with conservative claims and an invitation to confirm details in consultation.',
    'worldwide-overview': 'Find family-friendly Worldwide Travel inspiration and discuss a plan suited to your needs.',
    destinations: 'Explore destination inspiration as a starting point for a considered travel conversation.',
    packages: 'Browse static package guidance and confirm details, pricing, and availability through consultation.',
    'custom-trip': 'Begin a custom-trip conversation shaped by timing, group, interests, and accessibility needs.',
    'family-group': 'Plan family and group travel with attention to pace, comfort, and multigenerational needs.',
    'travel-tools': 'Use third-party Travel Tools with clear affiliate disclosure and external-service information.',
    about: 'Learn how Rasuna Travel helps families begin travel plans through a clear, human conversation.',
    'why-rasuna': 'Understand Rasuna Travel’s consultation process and principles for supporting travel plans.',
    jakarta: 'Begin a travel conversation from Jakarta without unverified office or service-coverage claims.',
    bandung: 'Begin a travel conversation from Bandung without unverified office or service-coverage claims.',
    articles: 'Read early guidance to help families prepare questions before a trip.',
    faq: 'Find common questions about starting a travel conversation with Rasuna Travel.',
    contact: 'Contact Rasuna Travel to begin a conversation about your travel needs.',
    privacy: 'Read how Rasuna Travel explains privacy and data handling on this site.',
    cookies: 'Read information about cookies and storage used by the Rasuna Travel site.',
    'affiliate-disclosure': 'Read about affiliate relationships and third-party service links used by Rasuna Travel.',
    terms: 'Read the terms for using information and services on the Rasuna Travel site.',
    accessibility: 'Read the accessibility commitment and how to report barriers on the Rasuna Travel site.'
  })
});

function copy(locale) {
  return COPY[locale === 'en' ? 'en' : 'id'];
}

function configured(value) {
  if (!value) return false;
  const text = String(value);
  return !/^[A-Z][A-Z0-9_]+$/.test(text) && !text.startsWith('SITE_');
}

function routeFor(key) {
  return SUPPORTED_ROUTES.find((route) => route.key === key);
}

function pathFor(locale, key, params = {}) {
  const route = routeFor(key);
  if (!route) return localizedPath(locale, '404');
  const path = route.paths[locale].split('/').map((segment) => {
    if (!segment.startsWith(':')) return segment;
    return params[segment.slice(1)] ?? '404';
  }).filter(Boolean).join('/');
  return localizedPath(locale, path);
}

function absoluteUrl(path) {
  if (!configured(SITE_CONFIG.SITE_ORIGIN)) return path;
  try {
    return new URL(path, SITE_CONFIG.SITE_ORIGIN).toString();
  } catch {
    return path;
  }
}

function itemFor(route) {
  const slug = route?.params?.slug;
  if (!slug) return null;
  if (route.key === 'package-detail') return PACKAGES.find((item) => item.slug === slug);
  if (route.key === 'destination-detail') return DESTINATIONS.find((item) => item.slug === slug);
  if (route.key === 'article-detail') return ARTICLES.find((item) => item.slug === slug);
  return null;
}

function routeName(route, locale) {
  const item = itemFor(route);
  return item?.labels?.[locale] ?? item?.labels?.id ?? ROUTE_LABELS[route?.key]?.[locale] ?? 'Rasuna Travel';
}

function routeDescription(route, locale) {
  const text = copy(locale);
  if (route?.key === 'home') return text.homeDescription;
  if (route?.key === 'not-found') return text.notFoundDescription;
  const item = itemFor(route);
  if (item) {
    return locale === 'en'
      ? `Explore ${routeName(route, locale)} as static travel guidance and confirm final details in consultation.`
      : `Jelajahi ${routeName(route, locale)} sebagai arahan perjalanan statis dan konfirmasikan detail akhir melalui konsultasi.`;
  }
  return ROUTE_DESCRIPTIONS[locale]?.[route?.key] ?? text.defaultDescription;
}

function imageFor(route) {
  const item = itemFor(route);
  if (item?.heroAsset) return item.heroAsset;
  if (item?.image) return item.image;
  if (route?.key === 'pilgrimage-overview' || route?.key === 'umrah-packages' || route?.key === 'umrah-preparation' || route?.key === 'hajj-information') return '/assets/generated/hero-umrah-master.png';
  if (route?.key === 'worldwide-overview' || route?.key === 'destinations') return '/assets/generated/hero-worldwide-master.png';
  return route?.key === 'home' ? '/assets/generated/og-home-background.png' : null;
}

export function buildMetadata(route = {}) {
  const locale = route.locale === 'en' ? 'en' : 'id';
  const text = copy(locale);
  const name = routeName(route, locale);
  const title = route.key === 'home'
    ? text.homeTitle
    : route.key === 'not-found'
      ? text.notFoundTitle
      : `${name}${text.suffix}`;
  const canonicalPath = route.canonicalPath ?? pathFor(locale, route.key ?? 'home', route.params);
  const alternates = Object.keys(LANGUAGES).map((alternateLocale) => ({
    hreflang: alternateLocale,
    href: absoluteUrl(pathFor(alternateLocale, route.key ?? 'home', route.params))
  }));

  return {
    title,
    description: routeDescription(route, locale),
    canonical: absoluteUrl(canonicalPath),
    alternates,
    ogImage: imageFor(route),
    robots: route.key === 'not-found' ? 'noindex,follow' : 'index,follow'
  };
}

function breadcrumbData(route) {
  const locale = route.locale === 'en' ? 'en' : 'id';
  const item = itemFor(route);
  const entries = [{ name: ROUTE_LABELS.home[locale], item: pathFor(locale, 'home') }];
  if (route.key !== 'home') entries.push({ name: routeName(route, locale), item: route.canonicalPath ?? pathFor(locale, route.key, route.params) });
  if (item) entries[entries.length - 1].name = item.labels?.[locale] ?? item.labels?.id ?? entries[entries.length - 1].name;
  return entries.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, name: entry.name, item: absoluteUrl(entry.item) }));
}

export function buildStructuredData(route = {}) {
  const metadata = buildMetadata(route);
  const graph = [{
    '@type': ['Organization', 'TravelAgency'],
    '@id': '#rasuna-travel',
    name: 'Rasuna Travel',
    ...(configured(SITE_CONFIG.SITE_ORIGIN) ? { url: SITE_CONFIG.SITE_ORIGIN } : {})
  }];

  if (route.key !== 'not-found') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbData(route)
    });
  }

  if (['pilgrimage-overview', 'umrah-packages', 'umrah-preparation', 'hajj-information', 'worldwide-overview', 'custom-trip', 'family-group'].includes(route.key)) {
    graph.push({
      '@type': 'Service',
      name: routeName(route, route.locale === 'en' ? 'en' : 'id'),
      description: metadata.description,
      provider: { '@id': '#rasuna-travel' }
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
