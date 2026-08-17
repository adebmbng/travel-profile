# Rasuna Travel Content and Starting Prices Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete every public bilingual page with useful route-specific content and show a market-benchmark starting price for every package record.

**Architecture:** Keep the existing vanilla-JavaScript static renderer architecture. Add structured localized content and numeric benchmark pricing to the existing data records, use shared render helpers for repeated sections and currency labels, and keep all content available in prerendered HTML. Preserve consultation-only semantics for variable or unverified services.

**Tech Stack:** Vite 7, vanilla JavaScript ESM, CSS, Vitest, Node static prerendering, existing generated PNG assets.

## Global Constraints

- Indonesian remains the default locale and English remains under equivalent `/en/` routes.
- Every public route must have route-specific useful copy, an internal next step, and a contextual WhatsApp path where appropriate.
- Package prices are planning benchmarks, not live inventory or confirmed Rasuna Travel offers.
- Starting prices render as `Estimasi mulai dari` / `Estimated from`, with IDR, per-person unit, benchmark date, and consultation disclaimer.
- Do not invent certifications, quotas, schedules, availability, offices, staff, testimonials, partner relationships, or final package inclusions.
- Destination pages remain inspiration-only and do not receive invented prices.
- Hajj remains consultation-only.
- No `Offer` structured data is emitted for benchmark prices.
- Preserve WCAG landmarks, visible focus, static HTML, reduced motion, and existing asset/SEO checks.

---

### Task 1: Add benchmark pricing and structured catalog content

**Files:**
- Modify: `src/site-data.js`
- Create: `src/lib/pricing.js`
- Test: `src/lib/pricing.test.js`
- Test: `src/site-data.test.js`

**Interfaces:**
- `formatStartingPrice(value, locale)` returns a locale-formatted IDR string.
- `hasStartingBenchmark(item)` returns a boolean for a numeric positive `pricing.value` with `mode: 'from'` and `basis: 'market-benchmark'`.
- Each `PACKAGES` record exposes `description`, `duration`, `planning`, `highlights`, `itinerary`, `includes`, `excludes`, `suitableFor`, `preparation`, `faqs`, and `pricing` fields in both locales.
- Each `DESTINATIONS` record exposes localized `description`, `planningNotes`, `highlights`, and `questions` fields.

- [ ] **Step 1: Write the failing data and formatter tests**

```js
import { expect, it } from 'vitest';
import { DESTINATIONS, PACKAGES } from '../site-data.js';
import { formatStartingPrice, hasStartingBenchmark } from './pricing.js';

it('gives every package a positive market benchmark in IDR per person', () => {
  expect(PACKAGES).toHaveLength(4);
  for (const item of PACKAGES) {
    expect(hasStartingBenchmark(item)).toBe(true);
    expect(item.pricing.unit).toBe('person');
    expect(item.pricing.benchmarkDate).toBe('2026-08');
    expect(item.description.id).not.toBe(item.description.en);
    expect(item.faqs.id.length).toBeGreaterThanOrEqual(2);
  }
});

it('formats benchmark prices for both locales', () => {
  expect(formatStartingPrice(19990000, 'id')).toContain('19.990.000');
  expect(formatStartingPrice(19990000, 'en')).toContain('19,990,000');
});

it('gives every destination practical planning content', () => {
  for (const item of DESTINATIONS) {
    expect(item.description.id.length).toBeGreaterThan(40);
    expect(item.highlights.en.length).toBeGreaterThanOrEqual(3);
    expect(item.questions.id.length).toBeGreaterThanOrEqual(2);
  }
});
```

- [ ] **Step 2: Run the focused tests and verify they fail for missing pricing/data fields**

Run: `npm test -- --run src/lib/pricing.test.js src/site-data.test.js`

Expected: FAIL because the pricing module and structured content fields do not yet exist.

- [ ] **Step 3: Add numeric benchmark records and localized catalog fields**

Add these values to the four package records: `19990000`, `2350000`, `28900000`, and `28750000`. Store `currency: 'IDR'`, `unit: 'person'`, `basis: 'market-benchmark'`, `benchmarkDate: '2026-08'`, and source-reference URLs. Add distinct bilingual descriptions, planning assumptions, highlights, sample flows, inclusions/exclusions, preparation prompts, and at least two FAQs per package. Add practical bilingual descriptions, highlights, planning notes, and questions to Japan, Türkiye, and Bali records.

- [ ] **Step 4: Implement the pure pricing helpers**

Use `Intl.NumberFormat(locale === 'en' ? 'en-US' : 'id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })` and return an empty-safe result for invalid values. Keep validation independent of rendering so tests and future data checks can reuse it.

- [ ] **Step 5: Run the focused tests and verify they pass**

Run: `npm test -- --run src/lib/pricing.test.js src/site-data.test.js`

Expected: PASS with all four packages and all three destinations covered.

- [ ] **Step 6: Commit the data layer**

```bash
git add src/site-data.js src/lib/pricing.js src/lib/pricing.test.js src/site-data.test.js
git commit -m "feat: add complete catalog content and price benchmarks"
```

### Task 2: Render package, destination, and article content completely

**Files:**
- Modify: `src/renderers/catalog.js`
- Modify: `src/renderers/home.js`
- Modify: `src/renderers/journey-finder.js`
- Test: `src/renderers/catalog.test.js`
- Test: `src/renderers/flagship.test.js`

**Interfaces:**
- `renderPackagePrice(item, locale)` returns the benchmark label and disclaimer.
- `renderPackageDetail` renders each record’s localized structured sections and FAQs.
- `renderDestinationDetail` renders destination highlights, planning notes, questions, and related content.
- Article index/detail renders complete article sections and verified-source links without pending metadata copy.

- [ ] **Step 1: Write the failing renderer tests**

```js
it('shows the starting benchmark and disclaimer on every package surface', () => {
  const directory = renderPackageDirectory({ locale: 'id' });
  expect(directory.match(/Estimasi mulai dari/g)).toHaveLength(4);
  expect(directory).toContain('per orang');
  expect(directory).toContain('Benchmark pasar');

  const detail = renderPackageDetail({ locale: 'en', slug: 'mountain-rail-discovery' });
  expect(detail).toContain('Estimated from');
  expect(detail).toContain('per person');
  expect(detail).toContain('market benchmark');
  expect(detail).toContain('Frequently asked questions');
});

it('renders record-specific destination and article content', () => {
  expect(renderDestinationDetail({ locale: 'id', slug: 'bali' })).toContain('Catatan perencanaan');
  expect(renderArticleDetail({ locale: 'en', slug: 'family-travel-planning' })).toContain('Plan the rhythm');
  expect(renderArticleDetail({ locale: 'en', slug: 'family-travel-planning' })).not.toContain('will be updated');
});
```

- [ ] **Step 2: Run the focused tests and verify they fail**

Run: `npm test -- --run src/renderers/catalog.test.js src/renderers/flagship.test.js`

Expected: FAIL because current renderers hide unverified prices and use generic guidance/pending copy.

- [ ] **Step 3: Implement shared price and structured-section rendering**

Add localized labels for estimated price, per-person unit, market-benchmark basis, and final-quote disclaimer. Render price in home cards, catalog cards, package detail hero, and finder recommendations. Replace generic package accordions with the record’s overview, itinerary, confirmable items, exclusions, suitability, preparation, and FAQs. Render destination highlights/planning/questions and article body sections/source links.

- [ ] **Step 4: Update home and journey-finder package cards**

Show each package’s benchmark on the homepage and finder recommendation while retaining the static-guidance notice. Keep the WhatsApp context tied to the selected package.

- [ ] **Step 5: Run the focused tests and verify they pass**

Run: `npm test -- --run src/renderers/catalog.test.js src/renderers/flagship.test.js`

Expected: PASS with all package prices and record-specific content present.

- [ ] **Step 6: Commit the catalog renderers**

```bash
git add src/renderers/catalog.js src/renderers/home.js src/renderers/journey-finder.js src/renderers/catalog.test.js src/renderers/flagship.test.js
git commit -m "feat: render package prices and detailed catalog content"
```

### Task 3: Complete flagship and support-page copy

**Files:**
- Modify: `src/renderers/pilgrimage.js`
- Modify: `src/renderers/worldwide.js`
- Modify: `src/renderers/content-pages.js`
- Modify: `src/renderers/travel-tools.js`
- Modify: `src/renderers/legal.js`
- Modify: `src/renderers/layout.js`
- Modify: `src/renderers/components.js`
- Test: `src/renderers/content-pages.test.js`
- Create: `src/renderers/content-completeness.test.js`

**Interfaces:**
- Every route renderer includes a localized overview, useful content block, and next action without leaked configuration tokens.
- Support pages use page-specific content instead of one shared question/answer set.
- Travel Tools keeps the confirmed affiliate and adds neutral guidance for every remaining category.
- Legal pages render complete policy sections in both locales.

- [ ] **Step 1: Write the failing completeness tests**

```js
import { expect, it } from 'vitest';
import { publicRoutePaths } from '../../scripts/prerender.mjs';
import { renderInitialDocument } from './document.js';

it('renders substantive, placeholder-free content for every public localized route', () => {
  for (const pathname of publicRoutePaths()) {
    const html = renderInitialDocument(pathname);
    expect(html).toMatch(/<h1\b/);
    expect(html).toContain(pathname.startsWith('/en/') ? 'Consult on WhatsApp' : 'Konsultasi via WhatsApp');
    expect(html).not.toMatch(/(?:SITE_CONFIG|JAKARTA_VERIFIED|BANDUNG_VERIFIED|TODO|TBD|Segera hadir|will be updated)/i);
  }
});
```

- [ ] **Step 2: Run the test and verify it fails on current placeholder content**

Run: `npm test -- --run src/renderers/content-completeness.test.js`

Expected: FAIL on configuration tokens, generic pending copy, or missing route-specific content.

- [ ] **Step 3: Replace flagship placeholders with useful, honest guidance**

Expand pilgrimage preparation and Hajj information with checklists and conservative verification guidance. Expand worldwide overview with planning styles. Replace the homepage trust/testimonial/local placeholders with clear verification and privacy-safe copy that does not claim unknown facts.

- [ ] **Step 4: Give support and local routes distinct content**

Add route-specific structured copy for custom trips, family/group travel, About, Why Rasuna, FAQ, Contact, Jakarta, and Bandung. Keep the local copy remote-consultation-oriented and do not invent offices or opening hours.

- [ ] **Step 5: Complete Travel Tools, legal pages, and 404**

Give each tool category a short actionable checklist, retain affiliate disclosure and WhatsApp fallback, expand each legal page into readable sections, and add recovery links to the 404 route.

- [ ] **Step 6: Run focused tests and verify green**

Run: `npm test -- --run src/renderers/content-pages.test.js src/renderers/content-completeness.test.js tests/accessibility-smoke.test.mjs`

Expected: PASS with no configuration tokens or placeholder messages in generated route HTML.

- [ ] **Step 7: Commit all page content**

```bash
git add src/renderers
git commit -m "feat: complete bilingual page content"
```

### Task 4: Verify static output and requirement coverage

**Files:**
- Modify: `README.md`
- Modify: `src/seo.js`
- Test: existing full suite and static checks

- [ ] **Step 1: Update public documentation for benchmark-price semantics**

Document that package prices are dated market benchmarks, per-person, and require final consultation; explain that destination pages remain price-free inspiration pages.

- [ ] **Step 2: Update route descriptions to describe completed content**

Remove stale “will be updated” SEO descriptions and describe the actual guides, checklists, planning notes, and benchmark semantics.

- [ ] **Step 3: Run the full verification commands**

Run:

```bash
npm test -- --run
npm run build
npm run check:assets
npm run check:routes
npm run test:a11y
```

Expected: all tests pass; build exits 0; every localized static route, metadata artifact, image, accessibility check, sitemap, and redirect artifact verifies successfully.

- [ ] **Step 4: Audit the final rendered routes**

Inspect the generated `dist/id/` and `dist/en/` documents with `rg` for all four benchmark values, localized price labels, missing `<h1>`, leaked placeholders, and stale pending copy. Confirm the package count is four in home and package directory output.

- [ ] **Step 5: Commit verification/documentation changes**

```bash
git add README.md src/seo.js
git commit -m "docs: document complete content and benchmark prices"
```
