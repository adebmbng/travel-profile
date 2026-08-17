import { renderHeader, renderFooter, renderFloatingWhatsApp, renderSectionHeading, renderWhatsAppLink, routePath } from './components.js';
import { escapeHtml } from '../lib/escape-html.js';
import { renderHome } from './home.js';
import { renderHajjInformation, renderPilgrimageOverview, renderUmrahPackages, renderUmrahPreparation } from './pilgrimage.js';
import { renderWorldwideOverview } from './worldwide.js';
import { renderArticleDetail, renderDestinationDetail, renderDestinationDirectory, renderPackageDetail, renderPackageDirectory } from './catalog.js';
import { renderAbout, renderArticleIndex, renderContact, renderCustomTrip, renderFaq, renderFamilyGroup, renderLocalPage, renderWhyRasuna } from './content-pages.js';
import { renderTravelTools } from './travel-tools.js';
import { renderLegalPage } from './legal.js';

const PAGE_COPY = Object.freeze({
  id: Object.freeze({
    homeTitle: 'Rasuna Travel',
    homeText: 'Rencana perjalanan yang dapat dimulai dengan percakapan.',
    pageText: 'Gunakan halaman ini untuk menyiapkan pertanyaan dan melanjutkan ke konsultasi dengan konteks yang lebih jelas.',
    notFoundTitle: 'Halaman tidak ditemukan',
    notFoundText: 'Gunakan navigasi untuk kembali ke halaman yang tersedia.',
    pilgrimage: 'Haji & Umrah',
    worldwide: 'Wisata Dunia'
  }),
  en: Object.freeze({
    homeTitle: 'Rasuna Travel',
    homeText: 'Travel plans that can begin with a conversation.',
    pageText: 'Use this page to prepare questions and continue to consultation with clearer context.',
    notFoundTitle: 'Page not found',
    notFoundText: 'Use the navigation to return to an available page.',
    pilgrimage: 'Hajj & Umrah',
    worldwide: 'Worldwide Travel'
  })
});

function textFor(locale) {
  return PAGE_COPY[locale] ?? PAGE_COPY.id;
}

export function renderRoute(route = {}) {
  const locale = route.locale === 'en' ? 'en' : 'id';
  const flagshipRenderers = {
    home: renderHome,
    'pilgrimage-overview': renderPilgrimageOverview,
    'umrah-packages': renderUmrahPackages,
    'umrah-preparation': renderUmrahPreparation,
    'hajj-information': renderHajjInformation,
    'worldwide-overview': renderWorldwideOverview
  };
  const catalogRenderers = {
    packages: renderPackageDirectory,
    'package-detail': renderPackageDetail,
    destinations: renderDestinationDirectory,
    'destination-detail': renderDestinationDetail,
    articles: renderArticleIndex,
    'article-detail': renderArticleDetail,
    jakarta: renderLocalPage,
    bandung: renderLocalPage,
    'custom-trip': renderCustomTrip,
    'family-group': renderFamilyGroup,
    about: renderAbout,
    'why-rasuna': renderWhyRasuna,
    faq: renderFaq,
    contact: renderContact,
    'travel-tools': renderTravelTools,
    privacy: renderLegalPage,
    cookies: renderLegalPage,
    'affiliate-disclosure': renderLegalPage,
    terms: renderLegalPage,
    accessibility: renderLegalPage
  };
  const renderer = flagshipRenderers[route.key] ?? catalogRenderers[route.key];
  if (renderer) {
    const params = route.key === 'jakarta' || route.key === 'bandung'
      ? { locale, city: route.key, ...route.params }
      : { locale, key: route.key, ...route.params };
    return renderer(params);
  }
  const text = textFor(locale);
  const isNotFound = route.key === 'not-found';
  const title = isNotFound ? text.notFoundTitle : route.key === 'home' ? text.homeTitle : text.homeTitle;
  const description = isNotFound ? text.notFoundText : route.key === 'home' ? text.homeText : text.pageText;

  return `<section class="page-intro container">${renderSectionHeading({ title, description, level: 1 })}<p>${escapeHtml(isNotFound ? (locale === 'en' ? 'Try one of the two main travel paths or send us a question directly.' : 'Coba salah satu jalur perjalanan utama atau kirimkan pertanyaan secara langsung.') : text.pageText)}</p><div class="page-intro__actions"><a class="button button--secondary" href="${escapeHtml(routePath(locale, 'pilgrimage-overview'))}">${text.pilgrimage}</a><a class="button button--secondary" href="${escapeHtml(routePath(locale, 'worldwide-overview'))}">${text.worldwide}</a><a class="button button--secondary" href="${escapeHtml(routePath(locale, 'packages'))}">${locale === 'en' ? 'View packages' : 'Lihat paket'}</a>${renderWhatsAppLink({ locale })}</div></section>`;
}

export function renderShell(route, { body = '' } = {}) {
  const locale = route?.locale === 'en' ? 'en' : 'id';
  return `<a class="skip-link" href="#main-content">${locale === 'en' ? 'Skip to main content' : 'Lewati ke konten utama'}</a><div class="site-shell" data-site-shell>${renderHeader({ locale, currentKey: route?.key, params: route?.params })}<main id="main-content" tabindex="-1"><div id="app">${body}</div></main>${renderFooter({ locale })}</div>${renderFloatingWhatsApp({ locale, pagePath: route?.canonicalPath })}<div class="language-status" aria-live="polite" aria-atomic="true"></div>`;
}
