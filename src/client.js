import { recommendJourney, renderJourneyRecommendation } from './renderers/journey-finder.js';

export function initClient(root = document) {
  if (!root?.documentElement || root.documentElement.dataset.clientInitialized === 'true') return;

  root.documentElement.dataset.clientInitialized = 'true';
  root.documentElement.classList.add('js');

  const menuButton = root.querySelector('[data-menu-toggle]');
  const navigation = root.querySelector('[data-site-navigation]');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      navigation.toggleAttribute('data-open', !expanded);
    });
  }

  const status = root.querySelector('.language-status');
  root.querySelectorAll('[data-language-link]').forEach((link) => {
    link.addEventListener('click', () => {
      if (status) status.textContent = link.textContent?.trim() || '';
    });
  });

  const reducedMotion = root.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)');
  const setMotionPreference = () => root.documentElement.toggleAttribute('data-reduced-motion', Boolean(reducedMotion?.matches));
  setMotionPreference();
  reducedMotion?.addEventListener?.('change', setMotionPreference);

  if (!reducedMotion?.matches && 'IntersectionObserver' in root.defaultView) {
    const observer = new root.defaultView.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-revealed', 'true');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    root.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  }

  root.querySelectorAll('[data-cta]').forEach((cta) => {
    cta.addEventListener('click', () => {
      root.dispatchEvent(new CustomEvent('rasuna:cta', { detail: { type: cta.dataset.cta } }));
    });
  });

  root.querySelectorAll('[data-journey-finder]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      const locale = root.documentElement.lang === 'en' ? 'en' : 'id';
      const result = recommendJourney(values);
      const container = form.parentElement?.querySelector('[data-journey-result]');
      if (container) container.innerHTML = renderJourneyRecommendation({ locale, result });
    });
  });
}
