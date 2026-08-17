import { renderHeader, renderFooter, renderSectionHeading, renderWhatsAppLink } from './components.js';
import { renderHome } from './home.js';
import { renderHajjInformation, renderPilgrimageOverview, renderUmrahPackages, renderUmrahPreparation } from './pilgrimage.js';
import { renderWorldwideOverview } from './worldwide.js';

const PAGE_COPY = Object.freeze({
  id: Object.freeze({
    homeTitle: 'Rasuna Travel',
    homeText: 'Rencana perjalanan yang dapat dimulai dengan percakapan.',
    pageText: 'Informasi perjalanan untuk halaman ini akan diperbarui setelah detail terverifikasi.',
    notFoundTitle: 'Halaman tidak ditemukan',
    notFoundText: 'Gunakan navigasi untuk kembali ke halaman yang tersedia.',
    pilgrimage: 'Haji & Umrah',
    worldwide: 'Wisata Dunia'
  }),
  en: Object.freeze({
    homeTitle: 'Rasuna Travel',
    homeText: 'Travel plans that can begin with a conversation.',
    pageText: 'Travel information for this page will be updated after details are verified.',
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
  const renderer = flagshipRenderers[route.key];
  if (renderer) return renderer({ locale, ...route.params });
  const text = textFor(locale);
  const isNotFound = route.key === 'not-found';
  const title = isNotFound ? text.notFoundTitle : route.key === 'home' ? text.homeTitle : text.homeTitle;
  const description = isNotFound ? text.notFoundText : route.key === 'home' ? text.homeText : text.pageText;

  return `<section class="page-intro container">${renderSectionHeading({ title, description, level: 1 })}<div class="page-intro__actions"><a class="button button--secondary" href="/${locale}/${locale === 'id' ? 'haji-umrah' : 'hajj-umrah'}/">${text.pilgrimage}</a><a class="button button--secondary" href="/${locale}/${locale === 'id' ? 'wisata-dunia' : 'worldwide'}/">${text.worldwide}</a>${renderWhatsAppLink({ locale })}</div></section>`;
}

export function renderShell(route, { body = '' } = {}) {
  const locale = route?.locale === 'en' ? 'en' : 'id';
  return `<a class="skip-link" href="#main-content">${locale === 'en' ? 'Skip to main content' : 'Lewati ke konten utama'}</a><div class="site-shell" data-site-shell>${renderHeader({ locale, currentKey: route?.key, params: route?.params })}<main id="main-content" tabindex="-1"><div id="app">${body}</div></main>${renderFooter({ locale })}</div><div class="language-status" aria-live="polite" aria-atomic="true"></div>`;
}
