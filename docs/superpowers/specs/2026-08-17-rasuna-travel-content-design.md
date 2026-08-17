# Rasuna Travel Content and Starting-Price Design

**Date:** 2026-08-17

## Goal

Complete the copy shown on every public Rasuna Travel page in Indonesian and English, and give every catalogued travel package a visible starting-price benchmark that is useful for planning without pretending to be live inventory or a confirmed quotation.

## Scope

The existing route table remains the source of truth. Every route currently prerendered under `/id/` and `/en/` receives route-specific introductory copy, practical guidance, internal next steps, and a contextual WhatsApp path. Dynamic package, destination, and article records receive their own descriptions instead of sharing one generic paragraph.

The four existing package records are the units referred to by “each travel”:

| Package | Starting benchmark | Basis shown in UI |
| --- | ---: | --- |
| Family Lake Escape | Rp19.990.000 per person | 2026 Japan group-tour market benchmark |
| Coastal Couple Journey | Rp2.350.000 per person | 2026 domestic 4D3N coastal land-package benchmark |
| Mountain Rail Discovery | Rp28.900.000 per person | 2026 Europe group-tour market benchmark |
| Family Umrah Guidance | Rp28.750.000 per person | 2026 regular Umrah quad-room market benchmark |

These are planning benchmarks, not Rasuna Travel offers. The UI uses “Estimasi mulai dari” / “Estimated from”, identifies the unit, states that dates, exchange rates, inclusions, and availability can change, and sends the visitor to consultation for a final quote. Destination pages remain inspiration pages and do not receive invented package prices. Hajj information remains consultation-only because a fixed public price would be misleading.

## Approaches considered

1. **Central localized content records (recommended).** Extend `site-data.js` records and small route-level copy objects, then teach existing renderers to display structured sections. This keeps Indonesian/English variants together, makes every page statically crawlable, and gives one source for prices.
2. **Hard-code prose in each renderer.** This is quicker for one page but duplicates package and destination facts, makes translation drift likely, and makes a complete-page audit difficult.
3. **Introduce Markdown/content files.** This would help a future editorial workflow, but adds a new parser and build surface for a small frontend-only catalog.

## Content design

- Package detail pages show: overview, starting benchmark, planning assumptions, sample flow, what to confirm, what is not included by default, suitability, preparation checklist, FAQs, and consultation CTA.
- Destination pages show: why the destination is considered, trip styles, planning notes, practical questions, related packages/articles, and consultation CTA. They never imply dates or live availability.
- Hajj & Umrah pages show preparation, documents/questions to gather, family and elderly considerations, conservative Hajj guidance, Umrah package guidance, and a reminder to verify the organizer before payment. No unverified certification, quota, hotel, flight, office, or testimonial is invented.
- Worldwide pages show family/couple/solo planning directions, destination discovery, timing and comfort prompts, and routes into packages or custom planning.
- Home, local, support, Travel Tools, article, legal, and 404 pages receive useful route-specific sections and clear next actions. The confirmed Welcome Pickups affiliate remains the only external partner; all other tool categories receive neutral guidance rather than a fake partnership.
- Unknown business facts are replaced with plain-language verification guidance, not leaked configuration keys. Unverified testimonials remain explicitly absent rather than fabricated.

## Price rendering

Package data stores numeric IDR values and `basis: 'market-benchmark'`, a month-level benchmark date, unit, and source references. A shared formatter renders locale-appropriate currency and the same label on the home cards, package directory, package detail hero, and journey-finder result. JSON-LD does not emit `Offer` because the prices are not verified Rasuna offers.

## Testing and acceptance

- A data test fails if any package lacks a positive starting benchmark, unit, or benchmark basis.
- Renderer tests fail if a package directory/detail omits the benchmark label, unit, or planning disclaimer.
- Content-completeness tests render every public localized route and reject leaked configuration tokens, `TODO`/`TBD`, “coming soon” placeholders, or the old generic “will be updated after verification” page copy.
- Existing route, accessibility, asset, SEO, and full Vitest checks remain green.
- The production build and static route audit verify the completed Indonesian and English HTML documents, sitemap, redirects, and assets.
