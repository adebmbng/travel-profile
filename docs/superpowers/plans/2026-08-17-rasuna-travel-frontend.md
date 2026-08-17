# Rasuna Travel Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete frontend-only Rasuna Travel bilingual travel-agency website in vanilla JavaScript and Vite, using the approved generated assets and satisfying the SEO, motion, measurement, referral, accessibility, and privacy design.

**Architecture:** Use a data-driven vanilla JavaScript app with pure HTML render functions shared by the browser and a Node prerender script. Vite builds the browser bundle; a post-build prerender step writes crawlable `/id/...` and `/en/...` HTML pages, metadata, structured data, sitemap, robots, and redirect-aware route files. CSS provides the design system and motion layers; small browser modules attach navigation, language, consent, analytics, WhatsApp, referral, and reduced-motion behavior.

**Tech Stack:** Vite 7+, vanilla JavaScript ESM, CSS, Vitest, Node built-ins for prerendering, generated PNG assets in `public/assets/generated/`. No frontend framework, backend, database, payment flow, live inventory, or CMS.

## Global Constraints

- Bahasa Indonesia is the default language; English is available under equivalent `/en/...` routes.
- The selected concept is **Two Journeys, One Trusted Guide** with equal Hajj/Umrah and Worldwide Travel pillars.
- Primary conversion is contextual WhatsApp consultation; package browsing is secondary; referrals are contextual and disclosed.
- Certified Umrah service is the first trust signal, but `UMRAH_CERTIFICATION_NAME`, `UMRAH_CERTIFICATION_NUMBER`, `UMRAH_CERTIFICATION_ISSUER`, and `UMRAH_CERTIFICATION_VERIFY_URL` remain launch-blocking configuration fields.
- `PRIMARY_WHATSAPP_NUMBER`, `GTM_CONTAINER_ID`, `GA4_MEASUREMENT_ID`, `GOOGLE_ADS_CONVERSION_ID`, `META_PIXEL_ID`, `JAKARTA_VERIFIED_SERVICE_DETAILS`, `BANDUNG_VERIFIED_SERVICE_DETAILS`, and `VERIFIED_TESTIMONIALS` are central launch-blocking configuration fields.
- The current confirmed referral is Travelpayouts Welcome Pickups with marker `641087`, campaign `627`, and promo `8951`; future referral categories are configurable and must not imply confirmed partnerships.
- No fake reviews, ratings, availability, schedules, prices, certifications, offices, staff, or partner relationships may be rendered as facts.
- Standardized offers use `Mulai dari Rp...`; custom, variable, Hajj, or unverified offers use `Konsultasikan harga`.
- Public page content must be crawlable without client-side JavaScript through generated static HTML.
- Motion must respect keyboard input, `prefers-reduced-motion`, small screens, off-screen pausing, and layout-stability requirements.
- Measurement is marketing measurement only: Google Tag Manager, GA4, Google Ads conversions, Meta Pixel, consent-aware attribution, and UTM persistence. Google AdSense is out of scope.
- Referral cards must identify the provider, disclose affiliate relationships, distinguish external booking from Rasuna-operated service, and offer a WhatsApp fallback.
- Accessibility target is WCAG 2.2 AA.
- Generated sacred-site imagery requires human accuracy review before publication; `logo-concept-board.png` is a concept board and not a production logo.
- Do not add application code until the task’s failing test exists and has been observed failing, except package/configuration files explicitly covered by setup steps.

---

## Task 1: Vite foundation, route data, and test harness

**Files:**

- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/site-data.js`
- Create: `src/lib/route-utils.js`
- Create: `src/lib/route-utils.test.js`
- Create: `src/lib/escape-html.js`
- Create: `src/lib/escape-html.test.js`
- Create: `vitest.config.js`
- Create: `.gitignore`
- Modify: `docs/superpowers/plans/2026-08-17-rasuna-travel-frontend.md` only for task bookkeeping

**Interfaces:**

- `site-data.js` exports `LANGUAGES`, `SUPPORTED_ROUTES`, `JOURNEY_PILLARS`, `PACKAGES`, `DESTINATIONS`, `ARTICLES`, and `SITE_CONFIG`.
- `route-utils.js` exports `normalizePath(pathname)`, `parseLocalePath(pathname)`, `resolveRoute(pathname)`, `localizedPath(locale, slug)`, and `routeExists(pathname)`.
- `escape-html.js` exports `escapeHtml(value)`.
- `resolveRoute()` returns `{ locale: 'id'|'en', key: string, params: Record<string,string>, canonicalPath: string }` or `{ key: 'not-found', ... }`.

- [ ] **Step 1: Write failing route and escaping tests**

```js
import { describe, expect, it } from 'vitest';
import { parseLocalePath, resolveRoute, localizedPath } from './route-utils.js';
import { escapeHtml } from './escape-html.js';

describe('parseLocalePath', () => {
  it('defaults root and unknown locale paths to Indonesian', () => {
    expect(parseLocalePath('/')).toEqual({ locale: 'id', segments: [] });
    expect(parseLocalePath('/fr/tours')).toEqual({ locale: 'id', segments: ['fr', 'tours'] });
  });
});

describe('resolveRoute', () => {
  it('resolves an English package detail route with a slug parameter', () => {
    expect(resolveRoute('/en/worldwide/paket/family-lake-escape/')).toMatchObject({
      locale: 'en', key: 'package-detail', params: { slug: 'family-lake-escape' }
    });
  });

  it('returns not-found for an unknown route', () => {
    expect(resolveRoute('/id/missing-page/').key).toBe('not-found');
  });
});

it('creates localized paths without duplicate slashes', () => {
  expect(localizedPath('en', 'worldwide/paket/family-lake-escape')).toBe('/en/worldwide/paket/family-lake-escape/');
});

it('escapes HTML-sensitive values', () => {
  expect(escapeHtml('<script>alert("x")</script>')).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
});
```

- [ ] **Step 2: Run the focused tests and verify they fail because modules do not exist**

Run: `npm test -- --run src/lib/route-utils.test.js src/lib/escape-html.test.js`

Expected: FAIL with module-not-found errors for `route-utils.js` and `escape-html.js`.

- [ ] **Step 3: Add the minimal Vite and Vitest configuration**

Create `package.json` with scripts `dev`, `build`, `preview`, `test`, and `test:watch`; use `vite`, `vitest`, and `@vitejs/plugin-basic-ssl` only if local HTTPS is needed later. Configure Vitest for browser-independent ESM tests. Set `type` to `module`.

- [ ] **Step 4: Add route data and route utilities**

Define all route keys used by the approved information architecture, including `home`, `pilgrimage-overview`, `umrah-packages`, `umrah-preparation`, `hajj-information`, `worldwide-overview`, `destinations`, `destination-detail`, `packages`, `package-detail`, `custom-trip`, `family-group`, `travel-tools`, `about`, `why-rasuna`, `jakarta`, `bandung`, `articles`, `article-detail`, `faq`, `contact`, `privacy`, `cookies`, `affiliate-disclosure`, `terms`, `accessibility`, and `not-found`.

Use real generated assets from `public/assets/generated/` in the records. Set exact safe defaults for unknown fields using the named configuration keys, never invented values.

- [ ] **Step 5: Implement the minimal route and escaping functions**

Implement the signatures in the Interfaces block and keep them pure. Normalize trailing slashes, decode only safe route segments, preserve query strings outside route resolution, and return a not-found result for unknown locale or slug combinations.

- [ ] **Step 6: Run focused tests and verify green**

Run: `npm test -- --run src/lib/route-utils.test.js src/lib/escape-html.test.js`

Expected: all focused tests pass with no warnings.

- [ ] **Step 7: Commit the foundation**

```bash
git add package.json vite.config.js index.html src/site-data.js src/lib vitest.config.js .gitignore
git commit -m "feat: add Vite foundation and route data"
```

## Task 2: Design system, static renderers, and global shell

**Files:**

- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/components.css`
- Create: `src/renderers/document.js`
- Create: `src/renderers/components.js`
- Create: `src/renderers/layout.js`
- Create: `src/renderers/layout.test.js`
- Create: `src/client.js`
- Create: `src/main.js`
- Modify: `src/site-data.js`

**Interfaces:**

- `renderDocument(route, options)` returns a complete HTML document string with metadata, language attributes, skip link, header, `#app`, footer, and structured-data slots.
- `renderHeader({ locale, currentKey })`, `renderFooter({ locale })`, `renderWhatsAppLink(context)`, `renderLanguageSwitcher(route)`, `renderBreadcrumbs(items)`, `renderButton(config)`, `renderCardImage(asset, alt)`, and `renderSectionHeading(config)` return escaped HTML strings.
- `main.js` resolves `window.location.pathname`, injects the route renderer into `#app`, then calls `initClient(document)`.

- [ ] **Step 1: Write failing renderer tests**

```js
import { describe, expect, it } from 'vitest';
import { renderHeader, renderLanguageSwitcher, renderWhatsAppLink } from './components.js';
import { renderDocument } from './document.js';

it('renders a bilingual header with current navigation state', () => {
  const html = renderHeader({ locale: 'id', currentKey: 'home' });
  expect(html).toContain('aria-current="page"');
  expect(html).toContain('Hajj & Umrah');
  expect(html).toContain('Worldwide Travel');
});

it('renders a language switcher that preserves the current route', () => {
  expect(renderLanguageSwitcher({ locale: 'id', key: 'package-detail', params: { slug: 'family-lake-escape' } }))
    .toContain('/en/worldwide/paket/family-lake-escape/');
});

it('renders a contextual WhatsApp link without exposing private form data', () => {
  const html = renderWhatsAppLink({ locale: 'id', journey: 'umrah', packageName: 'Paket Keluarga' });
  expect(html).toContain('wa.me');
  expect(html).toContain('Paket%20Keluarga');
  expect(html).not.toContain('email');
});

it('renders document metadata and a no-JavaScript fallback', () => {
  const html = renderDocument({ locale: 'id', key: 'home', params: {}, canonicalPath: '/id/' }, { body: '<h1>Rasuna Travel</h1>' });
  expect(html).toContain('<html lang="id">');
  expect(html).toContain('<meta name="description"');
  expect(html).toContain('<noscript>');
  expect(html).toContain('Rasuna Travel');
});
```

- [ ] **Step 2: Run tests and verify they fail for missing renderer modules**

Run: `npm test -- --run src/renderers/layout.test.js`

Expected: FAIL with module-not-found errors.

- [ ] **Step 3: Define design tokens and base styles**

Implement emerald, ivory, sand, sky, gold, coral, forest ink, spacing, radius, elevation, type scale, container widths, focus ring, motion durations, and reduced-motion variables. Import Plus Jakarta Sans and Fraunces with local-safe fallbacks. Set `box-sizing`, visible focus, selection color, `:focus-visible`, reduced-motion media rules, and a stable image background.

- [ ] **Step 4: Implement the shared renderers and shell**

Render semantic `header`, `nav`, `main`, `footer`, skip link, logo placeholder mark, two journey nav groups, ID/EN switch, WhatsApp CTA, disclosure links, local pages, article pages, and legal links. Use actual generated assets only where the route data names them. Keep all unknown business fields behind visible “Informasi akan diperbarui” copy and configuration checks.

- [ ] **Step 5: Implement browser boot and progressive enhancement**

`main.js` renders the same route HTML used by the browser. `client.js` attaches only behavior: menu toggle, language navigation, scroll-reveal observers, reduced-motion detection, and CTA event hooks. The page must remain readable when JavaScript is disabled.

- [ ] **Step 6: Run renderer tests and a dev smoke check**

Run: `npm test -- --run src/renderers/layout.test.js` and `npm run dev -- --host 127.0.0.1`.

Expected: tests pass; the dev server starts without console exceptions.

- [ ] **Step 7: Commit the shell**

```bash
git add src/styles src/renderers src/client.js src/main.js src/site-data.js
git commit -m "feat: add design system and global shell"
```

## Task 3: Homepage and flagship journey pages

**Files:**

- Create: `src/renderers/home.js`
- Create: `src/renderers/pilgrimage.js`
- Create: `src/renderers/worldwide.js`
- Create: `src/renderers/journey-finder.js`
- Create: `src/renderers/flagship.test.js`
- Modify: `src/renderers/components.js`
- Modify: `src/styles/components.css`
- Modify: `src/main.js`

**Interfaces:**

- `renderHome({ locale })` returns the full homepage body.
- `renderPilgrimageOverview({ locale })`, `renderUmrahPackages({ locale })`, `renderUmrahPreparation({ locale })`, `renderHajjInformation({ locale })`, and `renderWorldwideOverview({ locale })` return page bodies.
- `renderJourneyFinder({ locale })` returns a frontend-only recommendation form with deterministic recommendations from `site-data.js`.
- `recommendJourney(input, data)` returns `{ type: 'package'|'consultation', slug?: string, whatsappContext: string }`.

- [ ] **Step 1: Write failing flagship-page tests**

```js
import { describe, expect, it } from 'vitest';
import { renderHome } from './home.js';
import { renderPilgrimageOverview, renderWorldwideOverview } from './pilgrimage.js';
import { recommendJourney } from './journey-finder.js';

it('renders equal flagship journeys and certification-first trust slot', () => {
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
  expect(recommendJourney({ pillar: 'worldwide', group: 'family', budget: 'mid' }, {})).toMatchObject({ type: 'package' });
});
```

- [ ] **Step 2: Run tests and verify red**

Run: `npm test -- --run src/renderers/flagship.test.js`

Expected: FAIL because page renderers and journey recommendation do not exist.

- [ ] **Step 3: Implement the homepage body**

Include certification-first trust ribbon with safe dummy fields, equal dual hero, journey finder, featured packages, two storytelling panels, Why Rasuna, consultation process, destination rail, verified-testimonial guard, Travel Tools preview, article rail, Jakarta/Bandung block, and final WhatsApp CTA. Use `hero-dual-journey-master.png`, `og-home-background.png`, `consultation-scene.png`, and `route-map-texture.png` where appropriate.

- [ ] **Step 4: Implement pilgrimage and worldwide bodies**

Use calm pilgrimage pacing and `hero-umrah-master.png`, `hero-umrah-mobile.png`, `hajj-information.png`, `umrah-preparation-flatlay.png`; use exploratory worldwide pacing and `hero-worldwide-master.png`, `hero-worldwide-mobile.png`, `family-group-travel.png`, `traveler-couple.png`, and `traveler-solo.png`. Do not expose unsupported Hajj credentials.

- [ ] **Step 5: Implement deterministic journey-finder behavior**

Use select/radio inputs for pillar, group, approximate period, and budget. On submit, show a recommendation card or open a contextual WhatsApp link. The UI must state that results are guidance from static content, not live availability.

- [ ] **Step 6: Run tests and inspect routes in the browser**

Run: `npm test -- --run src/renderers/flagship.test.js` and open `/id/`, `/id/haji-umrah/`, `/id/wisata-dunia/` in the dev server.

Expected: tests pass; all three routes render with no missing asset requests.

- [ ] **Step 7: Commit flagship pages**

```bash
git add src/renderers src/styles/components.css src/main.js
git commit -m "feat: add homepage and flagship journeys"
```

## Task 4: Packages, destinations, articles, local pages, tools, and legal pages

**Files:**

- Create: `src/renderers/catalog.js`
- Create: `src/renderers/content-pages.js`
- Create: `src/renderers/travel-tools.js`
- Create: `src/renderers/legal.js`
- Create: `src/renderers/catalog.test.js`
- Modify: `src/site-data.js`
- Modify: `src/main.js`
- Modify: `src/styles/components.css`

**Interfaces:**

- `renderPackageDirectory({ locale, pillar })`, `renderPackageDetail({ locale, slug })`, `renderDestinationDirectory({ locale })`, `renderDestinationDetail({ locale, slug })`, and `renderArticleDetail({ locale, slug })` return static page bodies.
- `renderLocalPage({ locale, city })` uses a distinct verified-details field for Jakarta or Bandung.
- `renderTravelTools({ locale })` renders Welcome Pickups plus future-ready disabled categories.
- `renderLegalPage({ locale, key })` renders privacy, cookies, affiliate disclosure, terms, and accessibility pages.

- [ ] **Step 1: Write failing catalog and referral tests**

```js
import { expect, it } from 'vitest';
import { renderPackageDetail, renderDestinationDetail } from './catalog.js';
import { renderTravelTools } from './travel-tools.js';
import { renderLocalPage } from './content-pages.js';

it('renders a package detail with mixed price semantics and WhatsApp CTA', () => {
  const html = renderPackageDetail({ locale: 'id', slug: 'family-lake-escape' });
  expect(html).toContain('Mulai dari');
  expect(html).toContain('Konsultasi via WhatsApp');
  expect(html).toContain('package-detail-family-hero.png');
  expect(html).not.toContain('tersedia sekarang');
});

it('renders destination detail with related package and article links', () => {
  const html = renderDestinationDetail({ locale: 'en', slug: 'japan-family' });
  expect(html).toContain('destination-japan.png');
  expect(html).toContain('Related');
});

it('discloses the current referral and keeps future categories visibly unassigned', () => {
  const html = renderTravelTools({ locale: 'id' });
  expect(html).toContain('Welcome Pickups');
  expect(html).toContain('Travelpayouts');
  expect(html).toContain('affiliate');
  expect(html).toContain('Segera hadir');
});

it('does not render unverified local office claims', () => {
  expect(renderLocalPage({ locale: 'id', city: 'jakarta' })).toContain('JAKARTA_VERIFIED_SERVICE_DETAILS');
});
```

- [ ] **Step 2: Run tests and verify red**

Run: `npm test -- --run src/renderers/catalog.test.js`

Expected: FAIL because catalog, content, and Travel Tools renderers do not exist.

- [ ] **Step 3: Implement package and destination templates**

Render static directory cards and detail pages with facts, mixed price mode, itinerary, inclusions, exclusions, suitability, preparation, FAQs, related content, disclosure-safe referral cards, and sticky WhatsApp CTA. Use `package-detail-family-hero.png`, destination assets, and `article-family-travel-planning.png`.

- [ ] **Step 4: Implement articles and local pages**

Create distinct Jakarta and Bandung copy blocks guarded by their configuration keys. Render article index/detail pages with author, reviewer, dates, source links, reading time, related packages, and review-date labels. Do not render dummy reviews as verified.

- [ ] **Step 5: Implement Travel Tools and legal pages**

Render the confirmed Welcome Pickups provider with a disclosure and external-link warning. Render future flight, hotel, activity, insurance, visa, transport, connectivity, and essentials categories as `Segera hadir` unless a provider record is configured. Add affiliate disclosure, privacy, cookie, terms, and accessibility pages.

- [ ] **Step 6: Run focused tests and inspect representative pages**

Run: `npm test -- --run src/renderers/catalog.test.js`; inspect `/id/paket/`, `/id/travel-tools/`, `/id/jakarta/`, `/id/artikel/`, and `/id/privacy/`.

Expected: all tests pass and no page contains an unsupported claim.

- [ ] **Step 7: Commit supporting pages**

```bash
git add src/renderers src/site-data.js src/main.js src/styles/components.css
git commit -m "feat: add catalog content tools and legal pages"
```

## Task 5: Motion, interactions, consent, analytics, WhatsApp, and referrals

**Files:**

- Create: `src/lib/consent.js`
- Create: `src/lib/consent.test.js`
- Create: `src/lib/analytics.js`
- Create: `src/lib/analytics.test.js`
- Create: `src/lib/whatsapp.js`
- Create: `src/lib/referrals.js`
- Create: `src/lib/referrals.test.js`
- Create: `src/client-interactions.js`
- Modify: `src/client.js`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/components.css`

**Interfaces:**

- `readConsent(storage)`, `writeConsent(storage, value)`, and `canTrack(category, consent)` manage consent state.
- `trackEvent(name, params, deps)` sends no event before consent and deduplicates identical page events.
- `buildWhatsAppUrl({ number, locale, journey, packageName, pagePath })` returns an encoded URL.
- `getReferralState(provider, now)` returns `active`, `expired`, `missing`, or `disabled`.
- `buildReferralLink(provider, context)` returns a validated external URL or `null`.

- [ ] **Step 1: Write failing consent, analytics, and referral tests**

```js
import { expect, it } from 'vitest';
import { canTrack, readConsent, writeConsent } from './consent.js';
import { buildWhatsAppUrl } from './whatsapp.js';
import { buildReferralLink, getReferralState } from './referrals.js';

it('does not allow marketing tracking before consent', () => {
  expect(canTrack('marketing', { analytics: false, marketing: false })).toBe(false);
});

it('persists only the consent object', () => {
  const storage = { value: '', setItem(_key, value) { this.value = value; }, getItem() { return this.value; } };
  writeConsent(storage, { analytics: true, marketing: false });
  expect(readConsent(storage)).toEqual({ analytics: true, marketing: false });
});

it('builds a contextual WhatsApp URL without personal form data', () => {
  const url = buildWhatsAppUrl({ number: '628000000000', locale: 'id', journey: 'umrah', packageName: 'Paket Keluarga', pagePath: '/id/umrah/' });
  expect(url).toContain('wa.me/628000000000');
  expect(url).toContain('Paket%20Keluarga');
});

it('rejects referral links with unsafe protocols and expired providers', () => {
  expect(buildReferralLink({ url: 'javascript:alert(1)', status: 'active' }, {})).toBeNull();
  expect(getReferralState({ status: 'active', expiresAt: '2020-01-01' }, new Date('2026-08-17'))).toBe('expired');
});
```

- [ ] **Step 2: Run tests and verify red**

Run: `npm test -- --run src/lib/consent.test.js src/lib/analytics.test.js src/lib/referrals.test.js`

Expected: FAIL because the behavior modules do not exist.

- [ ] **Step 3: Implement consent and event behavior**

Use a first-party local-storage key with explicit analytics and marketing booleans. Expose a settings dialog with accept, reject, and customize actions. Load GTM/GA4/Meta only after consent; retain anonymous page functionality without tracking. Define the approved event names and ensure no PII appears in parameters.

- [ ] **Step 4: Implement WhatsApp and referral safety**

Use `PRIMARY_WHATSAPP_NUMBER` only when configured; otherwise render a visible configuration warning in development and a non-breaking contact fallback in production. Validate `https:` external URLs, preserve UTM context, add `rel="sponsored nofollow noopener noreferrer"` where appropriate, and provide disclosure and fallback consultation.

- [ ] **Step 5: Implement motion and interaction layers**

Add scroll reveals, hero route-line drawing, split-journey transitions, card hover/tap states, page-transition classes, menu focus trap, accordion behavior, language-switch announcements, consent-dialog focus management, and reduced-motion overrides. Use CSS transforms/opacity for motion and pause observers when hidden.

- [ ] **Step 6: Run tests and manual keyboard/reduced-motion checks**

Run: `npm test -- --run src/lib/consent.test.js src/lib/analytics.test.js src/lib/referrals.test.js`; then test keyboard navigation with browser devtools and emulate `prefers-reduced-motion: reduce`.

Expected: tests pass; keyboard focus remains visible; reduced motion removes non-essential transitions.

- [ ] **Step 7: Commit behavior modules**

```bash
git add src/lib src/client.js src/client-interactions.js src/styles
git commit -m "feat: add motion consent analytics and referral behavior"
```

## Task 6: Static prerendering, metadata, structured data, sitemap, and redirects

**Files:**

- Create: `scripts/prerender.mjs`
- Create: `scripts/prerender.test.mjs`
- Create: `scripts/generate-redirect-map.mjs`
- Create: `src/seo.js`
- Create: `src/seo.test.js`
- Create: `public/robots.txt`
- Create: `public/.well-known/security.txt`
- Modify: `package.json`
- Modify: `vite.config.js`
- Modify: `src/renderers/document.js`
- Modify: `src/site-data.js`

**Interfaces:**

- `buildMetadata(route)` returns `{ title, description, canonical, alternates, ogImage, robots }`.
- `buildStructuredData(route)` returns a JSON-LD graph with only visible, verified facts.
- `prerenderRoutes({ sourceHtml, outDir, routes })` writes one `index.html` per public route plus `sitemap.xml` and `robots.txt`.
- `legacyRedirects()` returns the old WordPress-to-new-route mapping.

- [ ] **Step 1: Write failing SEO and prerender tests**

```js
import { expect, it } from 'vitest';
import { buildMetadata, buildStructuredData } from '../src/seo.js';

it('builds bilingual canonical and alternate metadata', () => {
  const metadata = buildMetadata({ locale: 'id', key: 'home', params: {}, canonicalPath: '/id/' });
  expect(metadata.canonical).toBe('/id/');
  expect(metadata.alternates).toEqual(expect.arrayContaining([
    { hreflang: 'id', href: '/id/' },
    { hreflang: 'en', href: '/en/' }
  ]));
});

it('never emits unverified review or certification schema', () => {
  const json = JSON.stringify(buildStructuredData({ locale: 'id', key: 'home', params: {}, canonicalPath: '/id/' }));
  expect(json).not.toContain('AggregateRating');
  expect(json).not.toContain('UMRAH_CERTIFICATION_NUMBER');
});
```

- [ ] **Step 2: Run tests and verify red**

Run: `npm test -- --run src/seo.test.js scripts/prerender.test.mjs`

Expected: FAIL because SEO and prerender modules do not exist.

- [ ] **Step 3: Implement metadata and structured data**

Generate unique ID/EN titles and descriptions from route data, absolute canonical path placeholders, reciprocal `hreflang`, Open Graph/Twitter fields, breadcrumbs, Organization/TravelAgency, Service, Article, FAQ, and Offer JSON-LD only where supported by visible verified content. Escape all content and avoid dummy schema.

- [ ] **Step 4: Implement the post-build prerender script**

After Vite writes `dist/index.html`, import the pure renderers and route table. Write each route to `dist/<locale>/<segments>/index.html` with static body content, metadata, language attributes, shared asset URLs, and script/module references. Generate `dist/sitemap.xml` for indexable routes, `dist/robots.txt` with a sitemap URL, and a redirect map for prior routes such as `/tentang-kami/`, `/layanan/`, `/travel-tools/`, `/artikel/`, `/kontak/`, and `/affiliates/`.

- [ ] **Step 5: Wire the production build command**

Set `npm run build` to run `vite build && node scripts/prerender.mjs`. Ensure all nested output directories are created with Node `fs.mkdir({ recursive: true })` and that the script exits non-zero when a route renderer or asset reference is missing.

- [ ] **Step 6: Run SEO tests and full build**

Run: `npm test -- --run src/seo.test.js scripts/prerender.test.mjs` and `npm run build`.

Expected: all tests pass; `dist/id/index.html`, `dist/en/index.html`, nested route HTML, `dist/sitemap.xml`, and `dist/robots.txt` exist; build exits 0.

- [ ] **Step 7: Commit static SEO output tooling**

```bash
git add scripts src/seo.js src/seo.test.js public package.json vite.config.js src/renderers/document.js src/site-data.js
git commit -m "feat: add static prerendering and technical SEO"
```

## Task 7: Responsive, accessibility, performance, and full verification

**Files:**

- Create: `tests/accessibility-smoke.test.mjs`
- Create: `scripts/check-assets.mjs`
- Create: `scripts/check-routes.mjs`
- Modify: `src/styles/base.css`
- Modify: `src/styles/components.css`
- Modify: `package.json`
- Modify: `README.md`

**Interfaces:**

- `scripts/check-assets.mjs` exits non-zero for missing, zero-byte, or unreferenced required assets.
- `scripts/check-routes.mjs` exits non-zero for missing prerendered route files, duplicate canonical paths, or missing language alternates.
- `tests/accessibility-smoke.test.mjs` checks generated HTML for landmarks, skip link, language, heading presence, alt attributes, and focusable controls.

- [ ] **Step 1: Write failing verification tests and checks**

Create tests that expect the current incomplete project to fail: route files do not exist, asset references are incomplete, and generated HTML is not yet available.

- [ ] **Step 2: Run verification checks and observe the expected red state**

Run: `npm test -- --run tests/accessibility-smoke.test.mjs`; `node scripts/check-assets.mjs`; `node scripts/check-routes.mjs`.

Expected: failures identify missing build artifacts, not test syntax errors.

- [ ] **Step 3: Implement responsive and accessibility refinements**

Verify 360px, 768px, 1024px, and 1440px layouts; preserve touch target size, visible focus, semantic buttons/links, alt text, contrast, heading order, dialog announcements, and no horizontal overflow. Use `loading="lazy"` for below-fold images, explicit image dimensions, `decoding="async"`, and no auto-playing video.

- [ ] **Step 4: Implement asset and route checkers**

Check every required file in `public/assets/generated/`, every manifest entry, every route in `SUPPORTED_ROUTES`, every ID/EN alternate, and every canonical output. Fail on unresolved required fields being rendered as factual claims.

- [ ] **Step 5: Add a user-facing README**

Document `npm install`, `npm run dev`, `npm test`, `npm run build`, route conventions, configuration keys, how to replace dummy certification/measurement/local facts, where generated assets live, and the required human review for sacred imagery and vector logo redraw.

- [ ] **Step 6: Run the complete verification suite**

Run:

```bash
npm test -- --run
npm run build
node scripts/check-assets.mjs
node scripts/check-routes.mjs
```

Expected: all tests pass; build exits 0; asset and route checkers exit 0; no warnings about missing imports or missing files.

- [ ] **Step 7: Commit verification and documentation**

```bash
git add tests scripts src/styles package.json README.md
git commit -m "chore: add accessibility performance and launch checks"
```

## Self-review checklist

- [ ] Every requirement in the approved design specification maps to at least one task above.
- [ ] No task uses an unspecified placeholder behavior; unknown business facts use named configuration keys.
- [ ] Interfaces use the same names and return shapes across tasks.
- [ ] Static prerendering is tested independently of browser behavior.
- [ ] Consent, referrals, analytics, accessibility, and reduced motion have focused tests.
- [ ] The full suite and production build are run before completion claims.
