import { expect, it } from 'vitest';
import { renderHome } from './home.js';
import { renderPilgrimageOverview } from './pilgrimage.js';
import { renderWorldwideOverview } from './worldwide.js';
import { recommendJourney } from './journey-finder.js';
import { resolveRoute } from '../lib/route-utils.js';
import { renderRoute } from './layout.js';

it('renders equal flagship journeys and a certification-first trust slot', () => {
  const html = renderHome({ locale: 'id' });

  expect(html).toContain('Hajj &amp; Umrah');
  expect(html).toContain('Worldwide Travel');
  expect(html).toContain('UMRAH_CERTIFICATION_NAME');
  expect(html).toContain('Konsultasi via WhatsApp');
});

it('renders calm pilgrimage and exploratory worldwide imagery', () => {
  expect(renderPilgrimageOverview({ locale: 'id' })).toContain('hero-umrah-master.png');
  expect(renderWorldwideOverview({ locale: 'en' })).toContain('hero-worldwide-master.png');
});

it('recommends a static family package without claiming live inventory', () => {
  expect(recommendJourney({ pillar: 'worldwide', group: 'family', budget: 'mid' }, {})).toMatchObject({
    type: 'package',
    slug: 'family-lake-escape'
  });
});

it('renders flagship bodies for localized flagship routes', () => {
  expect(renderRoute(resolveRoute('/id/haji-umrah/'))).toContain('hero-umrah-master.png');
  expect(renderRoute(resolveRoute('/id/wisata-dunia/'))).toContain('hero-worldwide-master.png');
});
