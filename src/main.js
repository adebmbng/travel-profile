import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import { initClient } from './client.js';
import { resolveRoute } from './lib/route-utils.js';
import { renderRoute, renderShell } from './renderers/layout.js';

export function boot(locationPathname = window.location.pathname, root = document) {
  const route = resolveRoute(locationPathname);
  let app = root.getElementById('app');

  if (!root.querySelector('[data-site-shell]')) {
    root.body.innerHTML = renderShell(route);
    app = root.getElementById('app');
  }

  root.documentElement.lang = route.locale;
  root.title = route.key === 'not-found' ? 'Rasuna Travel | 404' : 'Rasuna Travel';
  if (app) app.innerHTML = renderRoute(route);
  initClient(root);

  return route;
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') boot();
