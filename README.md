# Rasuna Travel

Rasuna Travel is a bilingual, frontend-only travel-agency site built with vanilla JavaScript, Vite, and static prerendering. Bahasa Indonesia is the default language; equivalent English routes live under `/en/`.

## Development

```bash
npm ci
npm run dev
npm test -- --run
npm run build
```

The production build writes crawlable HTML documents to `dist/`, including localized route pages, `sitemap.xml`, `robots.txt`, `_redirects`, and `redirects.json`.

## Cloudflare Workers deployment

This is an assets-only Cloudflare Worker. The explicit `wrangler.jsonc` configuration points Wrangler at the Vite output in `dist/`, which prevents Wrangler from trying to infer a Worker entry point from `vite.config.js`.

For Cloudflare Workers Builds, use:

- Build command: `npm run build`
- Deploy command: `npm run deploy:worker`

For a local deployment, run `npm run build` and then `npm run deploy:worker`. Git operations use the repository's SSH remote, while Wrangler uses Cloudflare authentication configured in the deployment environment; no application secrets are committed to this repository.

## Verification commands

```bash
npm run check:assets
npm run check:routes
npm run test:a11y
```

The asset checker validates the generated-image manifest, file sizes, and source/render references. The route checker validates every localized static route, canonical URL, alternate-language link, accessibility smoke result, and SEO artifact.

## Configuration before launch

Unknown business facts intentionally remain named configuration fields in `src/site-data.js`. Replace and verify these before publishing:

- `SITE_ORIGIN`
- `PRIMARY_WHATSAPP_NUMBER` (default: `081224426102`, normalized to `6281224426102` for `wa.me`)
- `GTM_CONTAINER_ID`, `GA4_MEASUREMENT_ID`, `GOOGLE_ADS_CONVERSION_ID`, `META_PIXEL_ID`
- `UMRAH_CERTIFICATION_NAME`, `UMRAH_CERTIFICATION_NUMBER`, `UMRAH_CERTIFICATION_ISSUER`, `UMRAH_CERTIFICATION_VERIFY_URL`
- `JAKARTA_VERIFIED_SERVICE_DETAILS`, `BANDUNG_VERIFIED_SERVICE_DETAILS`
- `VERIFIED_TESTIMONIALS`
- article author, reviewer, dates, reading time, and source-link fields
- approved package prices and any referral expiry/status values

Do not replace a placeholder with an assumption. Verify certifications, religious and regulatory information, prices, schedules, local service claims, testimonials, and partner relationships before changing the data.

## Routes and redirects

Routes are declared in `src/site-data.js` and resolved by `src/lib/route-utils.js`. Static documents are generated for both locales, including package, destination, and article detail records. Legacy WordPress paths are maintained in `scripts/generate-redirect-map.mjs`.

## Assets and review gates

Generated masters live in `public/assets/generated/`. Keep copy, prices, certifications, partner names, and calls to action in HTML/data layers rather than inside pixels. Sacred-site imagery requires human accuracy and cultural review before publication. `logo-concept-board.png` is a design-review reference only; redraw and test a production vector logo before launch.

The site has no live inventory, online booking, payment flow, CMS, or AdSense integration. External Travel Tools are disclosed affiliate referrals and retain a WhatsApp fallback.
