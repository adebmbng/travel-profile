import { NAVIGATION_GROUPS, ROUTE_LABELS, SITE_CONFIG, SUPPORTED_ROUTES } from '../site-data.js';
import { escapeHtml } from '../lib/escape-html.js';
import { localizedPath } from '../lib/route-utils.js';
import { buildWhatsAppUrl } from '../lib/whatsapp.js';

const COPY = Object.freeze({
  id: Object.freeze({
    menu: 'Buka menu',
    closeMenu: 'Tutup menu',
    home: 'Rasuna Travel',
    consult: 'Konsultasi via WhatsApp',
    informationPending: 'Informasi akan diperbarui setelah detail terverifikasi.',
    skip: 'Lewati ke konten utama',
    currentLanguage: 'Bahasa Indonesia',
    switchLanguage: 'English',
    navigation: 'Navigasi utama',
    legal: 'Informasi legal',
    local: 'Halaman lokal',
    reading: 'Bacaan perjalanan',
    contactFallback: 'Buka halaman kontak'
  }),
  en: Object.freeze({
    menu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'Rasuna Travel',
    consult: 'Consult on WhatsApp',
    informationPending: 'Information will be updated after details are verified.',
    skip: 'Skip to main content',
    currentLanguage: 'English',
    switchLanguage: 'Bahasa Indonesia',
    navigation: 'Primary navigation',
    legal: 'Legal information',
    local: 'Local pages',
    reading: 'Travel reading',
    contactFallback: 'Open contact page'
  })
});

function copy(locale) {
  return COPY[locale] ?? COPY.id;
}

function labelFor(key, locale) {
  return ROUTE_LABELS[key]?.[locale] ?? ROUTE_LABELS[key]?.id ?? key;
}

function routePath(locale, key, params = {}) {
  const route = SUPPORTED_ROUTES.find((item) => item.key === key);
  const template = route?.paths?.[locale];
  if (template === undefined) return localizedPath(locale, '404');

  const path = template.split('/').map((segment) => {
    if (!segment.startsWith(':')) return segment;
    const value = params[segment.slice(1)];
    return value ? encodeURIComponent(String(value)) : '404';
  }).join('/');

  return localizedPath(locale, path);
}

function navigationLink(locale, key, currentKey) {
  const current = key === currentKey ? ' aria-current="page"' : '';
  return `<a href="${escapeHtml(routePath(locale, key))}"${current}>${escapeHtml(labelFor(key, locale))}</a>`;
}

export function renderLanguageSwitcher(route) {
  const locale = route?.locale === 'en' ? 'en' : 'id';
  const targetLocale = locale === 'id' ? 'en' : 'id';
  const href = routePath(targetLocale, route?.key ?? 'home', route?.params ?? {});
  const text = copy(locale).switchLanguage;

  return `<a class="language-switcher" data-language-link href="${escapeHtml(href)}" hreflang="${targetLocale}" lang="${targetLocale}">${escapeHtml(text)}</a>`;
}

export function renderWhatsAppLink(context = {}) {
  const locale = context.locale === 'en' ? 'en' : 'id';
  const journey = context.journey ? String(context.journey) : '';
  const packageName = context.packageName ? String(context.packageName) : '';
  const href = buildWhatsAppUrl({
    number: SITE_CONFIG.PRIMARY_WHATSAPP_NUMBER,
    locale,
    journey,
    packageName,
    pagePath: context.pagePath
  });

  if (!href) {
    return `<span class="whatsapp-cta whatsapp-cta--pending"><a class="button button--whatsapp" data-cta="whatsapp" data-configuration-pending="true" href="${escapeHtml(routePath(locale, 'contact'))}">${escapeHtml(copy(locale).consult)}</a><span class="configuration-note">${escapeHtml(copy(locale).contactFallback)}</span></span>`;
  }

  return `<a class="button button--whatsapp" data-cta="whatsapp" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(copy(locale).consult)}</a>`;
}

const BUTTON_ATTRIBUTE_NAMES = new Set([
  'aria-label',
  'aria-describedby',
  'aria-controls',
  'aria-expanded',
  'data-cta',
  'id'
]);

const LINK_ATTRIBUTE_NAMES = new Set(['target', 'rel', 'download']);

function renderButtonAttributes(attributes, isLink) {
  if (!attributes || typeof attributes !== 'object' || Array.isArray(attributes)) return '';

  const allowed = isLink ? new Set([...BUTTON_ATTRIBUTE_NAMES, ...LINK_ATTRIBUTE_NAMES]) : BUTTON_ATTRIBUTE_NAMES;
  return Object.entries(attributes).flatMap(([name, value]) => {
    if (!allowed.has(name) || value === null || value === undefined) return [];
    if (typeof value === 'object' || typeof value === 'function') return [];
    return ` ${name}="${escapeHtml(value)}"`;
  }).join('');
}

export function renderButton({ href, label, variant = 'primary', type = 'button', attributes } = {}) {
  const classes = `button button--${escapeHtml(variant)}`;
  const text = escapeHtml(label ?? '');
  const safeAttributes = renderButtonAttributes(attributes, Boolean(href));

  if (href) return `<a class="${classes}" href="${escapeHtml(href)}"${safeAttributes}>${text}</a>`;
  return `<button class="${classes}" type="${escapeHtml(type)}"${safeAttributes}>${text}</button>`;
}

export function renderCardImage(asset, alt) {
  if (!asset) return '<div class="card-image card-image--placeholder" aria-hidden="true"></div>';

  return `<img class="card-image" src="${escapeHtml(asset)}" alt="${escapeHtml(alt ?? '')}" width="1200" height="900" loading="lazy" decoding="async">`;
}

export function renderHeroImage({ asset, mobileAsset, alt, className = 'hero__image' } = {}) {
  if (!asset) return '';

  const mobileSource = mobileAsset
    ? `<source media="(max-width: 43rem)" srcset="${escapeHtml(mobileAsset)}">`
    : '';

  return `<picture class="${escapeHtml(className)}">${mobileSource}<img src="${escapeHtml(asset)}" alt="${escapeHtml(alt ?? '')}" width="1672" height="941" fetchpriority="high" decoding="async"></picture>`;
}

export function renderSectionHeading({ eyebrow, title, description, level = 2 } = {}) {
  const tag = Number(level) === 1 ? 'h1' : Number(level) === 3 ? 'h3' : 'h2';
  const eyebrowHtml = eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : '';
  const descriptionHtml = description ? `<p class="section-heading__description">${escapeHtml(description)}</p>` : '';

  return `<header class="section-heading">${eyebrowHtml}<${tag}>${escapeHtml(title ?? '')}</${tag}>${descriptionHtml}</header>`;
}

export function renderBreadcrumbs(items = []) {
  const entries = items.map((item, index) => {
    const isCurrent = index === items.length - 1;
    const label = escapeHtml(item?.label ?? '');
    if (isCurrent || !item?.href) return `<li aria-current="page">${label}</li>`;
    return `<li><a href="${escapeHtml(item.href)}">${label}</a></li>`;
  }).join('');

  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${entries}</ol></nav>`;
}

export function renderHeader({ locale = 'id', currentKey = 'home', params = {} } = {}) {
  const safeLocale = locale === 'en' ? 'en' : 'id';
  const text = copy(safeLocale);
  const groups = NAVIGATION_GROUPS.map((group) => {
    const links = group.routes.map((key) => `<li>${navigationLink(safeLocale, key, currentKey)}</li>`).join('');
    // Group names are authored, fixed labels; no untrusted content is interpolated here.
    return `<section class="site-nav__group" aria-labelledby="nav-${group.id}"><h2 id="nav-${group.id}"><span lang="id">${group.label.id}</span><span aria-hidden="true"> / </span><span lang="en">${group.label.en}</span></h2><ul>${links}</ul></section>`;
  }).join('');

  return `<header class="site-header" data-site-header><div class="site-header__inner container"><a class="site-logo" href="${routePath(safeLocale, 'home')}" aria-label="${escapeHtml(text.home)}"><span class="site-logo__mark" aria-hidden="true">R</span><span>Rasuna Travel</span></a><button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="site-navigation"><span class="visually-hidden">${escapeHtml(text.menu)}</span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></button><nav class="site-nav" id="site-navigation" data-site-navigation aria-label="${escapeHtml(text.navigation)}"><div class="site-nav__home">${navigationLink(safeLocale, 'home', currentKey)}</div>${groups}<div class="site-nav__actions">${renderLanguageSwitcher({ locale: safeLocale, key: currentKey, params })}${renderWhatsAppLink({ locale: safeLocale })}</div></nav></div></header>`;
}

export function renderFooter({ locale = 'id' } = {}) {
  const safeLocale = locale === 'en' ? 'en' : 'id';
  const text = copy(safeLocale);
  const linkList = (keys) => keys.map((key) => `<li>${navigationLink(safeLocale, key)}</li>`).join('');

  return `<footer class="site-footer"><div class="container site-footer__grid"><section><a class="site-logo" href="${routePath(safeLocale, 'home')}"><span class="site-logo__mark" aria-hidden="true">R</span><span>Rasuna Travel</span></a><p>${escapeHtml(text.informationPending)}</p>${renderWhatsAppLink({ locale: safeLocale })}</section><nav aria-label="${escapeHtml(text.local)}"><h2>${escapeHtml(text.local)}</h2><ul>${linkList(['jakarta', 'bandung', 'contact', 'faq'])}</ul></nav><nav aria-label="${escapeHtml(text.reading)}"><h2>${escapeHtml(text.reading)}</h2><ul>${linkList(['articles', 'travel-tools', 'about', 'why-rasuna'])}</ul></nav><nav aria-label="${escapeHtml(text.legal)}"><h2>${escapeHtml(text.legal)}</h2><ul>${linkList(['privacy', 'cookies', 'affiliate-disclosure', 'terms', 'accessibility'])}</ul></nav></div><div class="container site-footer__bottom"><p>© Rasuna Travel</p><p>${escapeHtml(text.informationPending)}</p></div></footer>`;
}

export { copy, labelFor, routePath };
