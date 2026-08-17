import { canTrack, hasStoredConsent, readConsent, writeConsent } from './lib/consent.js';
import { captureAttribution, readAttribution, trackEvent } from './lib/analytics.js';
import { buildReferralLink } from './lib/referrals.js';
import { SITE_CONFIG, REFERRAL_PROVIDERS } from './site-data.js';
import { recommendJourney, renderJourneyRecommendation } from './renderers/journey-finder.js';

const COPY = Object.freeze({
  id: Object.freeze({
    title: 'Persetujuan privasi',
    description: 'Kami menggunakan penyimpanan yang diperlukan agar situs berfungsi. Pengukuran hanya aktif setelah Anda memilihnya.',
    accept: 'Izinkan semua',
    reject: 'Tolak pengukuran',
    customize: 'Atur pilihan',
    save: 'Simpan pilihan',
    analytics: 'Pengukuran anonim',
    marketing: 'Pemasaran dan atribusi',
    necessary: 'Diperlukan agar situs berfungsi.'
  }),
  en: Object.freeze({
    title: 'Consent settings',
    description: 'We use storage needed for the site to work. Measurement starts only after you choose it.',
    accept: 'Allow all',
    reject: 'Reject measurement',
    customize: 'Customize choices',
    save: 'Save choices',
    analytics: 'Anonymous measurement',
    marketing: 'Marketing and attribution',
    necessary: 'Required for the site to work.'
  })
});

function copy(locale) {
  return COPY[locale === 'en' ? 'en' : 'id'];
}

export function renderConsentPanel({ locale = 'id', preferencesOpen = false, consent = {} } = {}) {
  const text = copy(locale);
  const analyticsChecked = consent.analytics === true ? ' checked' : '';
  const marketingChecked = consent.marketing === true ? ' checked' : '';
  const preferences = preferencesOpen
    ? `<fieldset class="consent-preferences"><legend>${text.title}</legend><label><input type="checkbox" name="analytics"${analyticsChecked}> <span>${text.analytics}</span></label><label><input type="checkbox" name="marketing"${marketingChecked}> <span>${text.marketing}</span></label><p>${text.necessary}</p></fieldset><button class="button button--primary" type="button" data-consent-action="save">${text.save}</button>`
    : `<div class="consent-actions"><button class="button button--primary" type="button" data-consent-action="accept">${text.accept}</button><button class="button button--secondary" type="button" data-consent-action="reject">${text.reject}</button><button class="consent-link" type="button" data-consent-action="customize">${text.customize}</button></div>`;

  return `<div class="consent-layer" data-consent-layer><section class="consent-panel" role="dialog" aria-modal="true" aria-labelledby="consent-title"><h2 id="consent-title">${text.title}</h2><p>${text.description}</p>${preferences}</section></div>`;
}

function isConfigured(value) {
  if (!value) return false;
  const text = String(value);
  return !text.startsWith('SITE_')
    && !text.startsWith('PRIMARY_')
    && !text.startsWith('GTM_')
    && !text.startsWith('GA4_')
    && !text.startsWith('GOOGLE_ADS_')
    && !text.startsWith('META_')
    && !text.endsWith('_ID');
}

function trackingDependencies(root) {
  const view = root.defaultView;
  return {
    consent: readConsent(view?.localStorage),
    storage: view?.localStorage,
    dataLayer: view?.dataLayer,
    pagePath: view?.location?.pathname
  };
}

function appendScript(root, src, attributes = {}) {
  const existing = root.querySelector(`script[data-rasuna-src="${src}"]`);
  if (existing) return existing;

  const script = root.createElement('script');
  script.src = src;
  script.async = true;
  script.dataset.rasunaSrc = src;
  Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
  root.head.appendChild(script);
  return script;
}

export function loadTrackingScripts(root, consent = readConsent(root.defaultView?.localStorage)) {
  const view = root.defaultView;
  if (!view) return;

  if (canTrack('analytics', consent)) {
    view.dataLayer = view.dataLayer || [];
    view.gtag = view.gtag || ((...args) => view.dataLayer.push(args));
    view.gtag('js', new Date());
    if (isConfigured(SITE_CONFIG.GTM_CONTAINER_ID)) {
      view.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      appendScript(root, `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(SITE_CONFIG.GTM_CONTAINER_ID)}`);
    }
    if (isConfigured(SITE_CONFIG.GA4_MEASUREMENT_ID)) {
      view.gtag('config', SITE_CONFIG.GA4_MEASUREMENT_ID);
      appendScript(root, `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(SITE_CONFIG.GA4_MEASUREMENT_ID)}`);
    }
  }

  if (canTrack('marketing', consent)) {
    view.dataLayer = view.dataLayer || [];
    if (isConfigured(SITE_CONFIG.GOOGLE_ADS_CONVERSION_ID)) {
      view.gtag = view.gtag || ((...args) => view.dataLayer.push(args));
      view.gtag('config', SITE_CONFIG.GOOGLE_ADS_CONVERSION_ID);
      if (!isConfigured(SITE_CONFIG.GA4_MEASUREMENT_ID)) {
        appendScript(root, `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(SITE_CONFIG.GOOGLE_ADS_CONVERSION_ID)}`);
      }
    }
    if (isConfigured(SITE_CONFIG.META_PIXEL_ID)) {
      view.fbq = view.fbq || ((...args) => (view.fbq.queue ??= []).push(args));
      view.fbq('init', SITE_CONFIG.META_PIXEL_ID);
      view.fbq('track', 'PageView');
      appendScript(root, `https://connect.facebook.net/en_US/fbevents.js`, { 'data-meta-pixel': SITE_CONFIG.META_PIXEL_ID });
    }
  }
}

function announce(root, message) {
  const status = root.querySelector('.language-status');
  if (status) status.textContent = message;
}

function focusableElements(container) {
  return [...container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
}

function setupMenu(root) {
  const menuButton = root.querySelector('[data-menu-toggle]');
  const navigation = root.querySelector('[data-site-navigation]');
  if (!menuButton || !navigation) return;

  let lastFocused = null;
  const close = ({ restoreFocus = false } = {}) => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.removeAttribute('data-open');
    if (restoreFocus) lastFocused?.focus();
  };

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      close({ restoreFocus: true });
      return;
    }
    lastFocused = menuButton;
    menuButton.setAttribute('aria-expanded', 'true');
    navigation.setAttribute('data-open', 'true');
    focusableElements(navigation)[0]?.focus();
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      close({ restoreFocus: true });
      return;
    }
    if (event.key !== 'Tab' || menuButton.getAttribute('aria-expanded') !== 'true') return;
    const current = focusableElements(navigation);
    if (!current.length) return;
    const first = current[0];
    const last = current[current.length - 1];
    if (event.shiftKey && root.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && root.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  root.addEventListener('click', (event) => {
    if (menuButton.getAttribute('aria-expanded') !== 'true') return;
    if (!navigation.contains(event.target) && event.target !== menuButton) close();
  });
}

function setupMotion(root) {
  const view = root.defaultView;
  const reducedMotion = view?.matchMedia?.('(prefers-reduced-motion: reduce)');
  const setMotionPreference = () => {
    root.documentElement.toggleAttribute('data-reduced-motion', Boolean(reducedMotion?.matches));
  };
  setMotionPreference();
  reducedMotion?.addEventListener?.('change', setMotionPreference);

  if (reducedMotion?.matches || !view || !('IntersectionObserver' in view)) {
    root.querySelectorAll('[data-reveal]').forEach((element) => element.setAttribute('data-revealed', 'true'));
    return;
  }

  const observer = new view.IntersectionObserver((entries) => {
    if (root.hidden || root.visibilityState === 'hidden') return;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.setAttribute('data-revealed', 'true');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  root.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  root.addEventListener('visibilitychange', () => {
    if (root.visibilityState === 'hidden') observer.disconnect();
  }, { once: true });
}

function setupLanguageLinks(root) {
  root.querySelectorAll('[data-language-link]').forEach((link) => {
    link.addEventListener('click', () => announce(root, link.textContent?.trim() || ''));
  });
}

function setupJourneyFinder(root) {
  root.querySelectorAll('[data-journey-finder]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      const locale = root.documentElement.lang === 'en' ? 'en' : 'id';
      const result = recommendJourney(values);
      const container = form.parentElement?.querySelector('[data-journey-result]');
      if (container) container.innerHTML = renderJourneyRecommendation({ locale, result });
      trackEvent('journey_finder_submit', {
        pillar: values.pillar,
        group: values.group,
        period: values.period,
        budget: values.budget
      }, trackingDependencies(root));
    });
  });
}

function setupCtas(root) {
  root.querySelectorAll('[data-cta]').forEach((cta) => {
    cta.addEventListener('click', () => {
      const type = cta.dataset.cta;
      const params = {
        type,
        locale: root.documentElement.lang,
        path: root.defaultView?.location?.pathname
      };
      trackEvent(type === 'whatsapp' ? 'whatsapp_click' : 'cta_click', params, trackingDependencies(root));
      const EventConstructor = root.defaultView?.CustomEvent ?? globalThis.CustomEvent;
      if (EventConstructor) root.dispatchEvent(new EventConstructor('rasuna:cta', { detail: { type } }));
    });
  });
}

function setupReferrals(root) {
  root.querySelectorAll('[data-referral-provider]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const provider = REFERRAL_PROVIDERS.find((item) => item.id === link.dataset.referralProvider);
      const view = root.defaultView;
      const query = new URLSearchParams(view?.location?.search ?? '');
      const currentAttribution = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
        const value = query.get(key);
        if (value) currentAttribution[key] = value;
      });
      const context = { ...readAttribution(view?.localStorage), ...currentAttribution };
      const safeUrl = buildReferralLink(provider, context);
      if (!safeUrl) {
        event.preventDefault();
        return;
      }
      link.href = safeUrl;
      trackEvent('referral_click', {
        provider: provider.id,
        category: provider.category,
        path: view?.location?.pathname
      }, trackingDependencies(root));
    });
  });
}

function focusDialog(dialog) {
  const elements = focusableElements(dialog);
  elements[0]?.focus();
  const ownerDocument = dialog.ownerDocument;
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const current = focusableElements(dialog);
    if (!current.length) return;
    const first = current[0];
    const last = current[current.length - 1];
    if (event.shiftKey && ownerDocument.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && ownerDocument.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function setupConsent(root) {
  const view = root.defaultView;
  const storage = view?.localStorage;

  const removeLayer = () => root.querySelector('[data-consent-layer]')?.remove();

  const complete = (value) => {
    const consent = writeConsent(storage, value);
    captureAttribution(view?.location?.search, storage, consent);
    loadTrackingScripts(root, consent);
    removeLayer();
    trackEvent('page_view', { path: view?.location?.pathname, locale: root.documentElement.lang }, trackingDependencies(root));
  };

  const bindPanel = (layer, preferencesOpen) => {
    layer.querySelector('[data-consent-action="accept"]')?.addEventListener('click', () => complete({ analytics: true, marketing: true }));
    layer.querySelector('[data-consent-action="reject"]')?.addEventListener('click', () => complete({ analytics: false, marketing: false }));
    layer.querySelector('[data-consent-action="customize"]')?.addEventListener('click', () => showPanel(true));
    layer.querySelector('[data-consent-action="save"]')?.addEventListener('click', () => {
      const form = layer.querySelector('.consent-preferences');
      complete({
        analytics: Boolean(form?.querySelector('[name="analytics"]')?.checked),
        marketing: Boolean(form?.querySelector('[name="marketing"]')?.checked)
      });
    });
    if (preferencesOpen) focusDialog(layer.querySelector('.consent-panel'));
    else layer.querySelector('[data-consent-action="accept"]')?.focus();
  };

  const showPanel = (preferencesOpen) => {
    removeLayer();
    const locale = root.documentElement.lang === 'en' ? 'en' : 'id';
    root.body.insertAdjacentHTML('beforeend', renderConsentPanel({ locale, preferencesOpen, consent: readConsent(storage) }));
    const layer = root.querySelector('[data-consent-layer]');
    if (layer) bindPanel(layer, preferencesOpen);
  };

  if (hasStoredConsent(storage)) {
    const consent = readConsent(storage);
    captureAttribution(view?.location?.search, storage, consent);
    loadTrackingScripts(root, consent);
    trackEvent('page_view', { path: view?.location?.pathname, locale: root.documentElement.lang }, trackingDependencies(root));
  } else {
    showPanel(false);
  }
}

export function initInteractions(root = document) {
  if (!root?.documentElement || root.documentElement.dataset.clientInitialized === 'true') return;

  root.documentElement.dataset.clientInitialized = 'true';
  root.documentElement.classList.add('js');
  root.body?.classList.add('page-transition-ready');
  setupMenu(root);
  setupLanguageLinks(root);
  setupMotion(root);
  setupJourneyFinder(root);
  setupCtas(root);
  setupReferrals(root);
  setupConsent(root);
}
