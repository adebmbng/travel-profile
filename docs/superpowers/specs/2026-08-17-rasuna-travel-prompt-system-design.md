# Rasuna Travel Website Prompt System Design

**Date:** 2026-08-17  
**Status:** Approved design specification  
**Deliverable type:** Planning and prompt authoring only; no application code  
**Future implementation target:** Frontend-only website using vanilla JavaScript and Vite

## 1. Purpose

Create a complete, modular prompt system that can guide the later design and frontend implementation of a new Rasuna Travel business website. The prompt system must cover product strategy, brand modernization, information architecture, page-level UX, motion, content, bilingual localization, SEO, marketing measurement, referrals, asset generation, accessibility, privacy, performance, testing, and launch readiness.

The website represents an accessible, family-friendly Indonesian travel agency serving two equal flagship business lines:

1. Hajj and Umrah services.
2. Worldwide leisure travel.

The strongest first trust signal is Rasuna Travel's certified Umrah service. The certification name, license number, issuing authority, and verification URL are not yet available and must remain explicit dummy fields until verified.

## 2. Existing-site findings

The existing public site at `https://rasunatravel.com` is a brochure-style WordPress site. Its visible content includes company information, services, articles, contact details, testimonials, consultation calls to action, and a Travel Tools page.

Confirmed live referral integration:

- Affiliate network: Travelpayouts.
- Active product: Welcome Pickups airport transfers.
- Travelpayouts marker/account ID: `641087`.
- Campaign ID: `627`.
- Promo ID: `8951`.
- Current route: `/travel-tools/`.

The previous `/affiliates/` route returns a 404. No other current flight, hotel, activity, insurance, visa, or transport affiliate relationship was verified during discovery. The new system must preserve the confirmed Welcome Pickups relationship and provide unbranded configuration slots for future partners without inventing affiliations.

## 3. Product position

### 3.1 Audience

The primary audience is Indonesian families, couples, groups, and multigenerational travelers seeking approachable human assistance. The brand should feel warm, transparent, reassuring, and capable rather than exclusive, corporate, or bargain-driven.

### 3.2 Geographic focus

Local discovery and consultation content will prioritize Jakarta and Bandung. Rasuna Travel may communicate broader Indonesian service availability, but it must not imply unverified offices or physical locations.

### 3.3 Language

Bahasa Indonesia is the default language. English is available through a persistent language switcher. The required future route structure is:

- Bahasa Indonesia: `/id/...`
- English: `/en/...`

The switcher preserves page context whenever an equivalent translation exists. English copy must be meaningfully localized for English-speaking customers in Indonesia and must not imply overseas branches.

### 3.4 Conversion hierarchy

All three business outcomes are supported with a clear hierarchy:

1. Primary: start a contextual WhatsApp consultation.
2. Secondary: browse packages and destinations.
3. Contextual: follow a disclosed referral to an external platform.

WhatsApp calls to action must be tailored to the visitor's current journey, package, destination, language, and location page. The interface must not silently insert sensitive form values into analytics payloads.

## 4. Selected experience direction

The selected concept is **Two Journeys, One Trusted Guide**.

The homepage introduces two equal visual pathways: Hajj and Umrah, and Worldwide Travel. They share a single Rasuna identity but use different emotional pacing:

- Pilgrimage content is calm, respectful, informative, and trust-led.
- Leisure content is joyful, cinematic, exploratory, and family-friendly.

The experience combines the emotional storytelling of a travel editorial with the scannability of a package marketplace. It must never imply live inventory, real-time prices, or online booking when the frontend only presents static information and outbound actions.

## 5. Information architecture

The prompt system must specify these public experiences:

- Home.
- Hajj and Umrah overview.
- Umrah packages.
- Umrah package detail template.
- Umrah preparation guide.
- Hajj information and consultation.
- Worldwide Travel overview.
- Destination directory.
- Destination detail template.
- Tour package directory.
- Tour package detail template.
- Custom trip consultation.
- Family and group travel.
- Travel Tools and referrals.
- About Rasuna Travel.
- Why Choose Us, including trust and consultation process.
- Jakarta service page.
- Bandung service page.
- Articles hub.
- Article category and detail templates.
- FAQ.
- Contact.
- Privacy policy.
- Cookie policy.
- Affiliate disclosure.
- Terms.
- Accessibility statement.
- Custom 404.
- Optional outbound-redirect confirmation experience.

Each route must have an Indonesian and English equivalent unless a documented exception is approved. Existing WordPress URLs must be included in a redirect-mapping artifact.

## 6. Homepage experience

The homepage is an animated journey selector, trust builder, and consultation funnel. Its sequence is:

1. Certification-first trust ribbon with clearly marked dummy certification fields.
2. Split cinematic hero with equal Hajj and Umrah and Worldwide Travel pathways.
3. Quick journey finder using trip purpose, destination interest, group type, approximate period, and budget range.
4. Featured packages using mixed pricing.
5. Two scroll-driven storytelling panels for the flagship journeys.
6. Why Rasuna trust section.
7. Animated consultation process.
8. Destination inspiration rail.
9. Verified testimonials module.
10. Travel Tools referral preview.
11. Educational article recommendations.
12. Distinct Jakarta and Bandung local-service content.
13. Final WhatsApp consultation panel and complete trust/legal footer.

The journey finder is a frontend recommendation tool, not a live search engine. It recommends relevant static content or opens a prefilled WhatsApp message. It must not imply availability or price verification.

## 7. Flagship page behavior

### 7.1 Hajj and Umrah

These pages emphasize guidance, preparation, required documents, itinerary clarity, accommodation and transport context, family and elderly suitability, frequently asked questions, and human consultation. The certified Umrah module is prominent. Hajj claims remain conservative until separate evidence or credentials are provided.

Prohibited content includes unsupported guarantees, invented regulatory claims, fabricated religious endorsements, fake departure schedules, and promises of availability.

### 7.2 Worldwide Travel

These pages emphasize discovery, family suitability, seasonal inspiration, package comparison, customizable trips, and useful destination guidance. Motion may be brighter and more playful than on pilgrimage pages while maintaining fast access to package facts and consultation actions.

### 7.3 Package details

Package prompts must cover:

- Cinematic hero.
- Key facts.
- Fixed starting-price or consultation-price mode.
- Duration and indicative travel period.
- Itinerary timeline.
- Inclusions and exclusions.
- Accommodation and transport notes.
- Family, elderly, accessibility, or group suitability.
- Preparation checklist.
- Frequently asked questions.
- Related articles.
- Related referrals.
- Sticky contextual WhatsApp consultation.

Standardized packages may display `Mulai dari Rp...`. Custom, group, Hajj, or variable offers use `Konsultasikan harga` unless an approved price is supplied.

## 8. Brand modernization

The current identity uses a green abstract `R`, serif `RASUNA` wordmark, and bright red italic `TOUR & TRAVEL`. The new direction retains the recognizable `R` and green brand equity while simplifying geometry, improving small-size legibility, and removing the dated red treatment.

### 8.1 Proposed palette roles

- Deep emerald: trust, brand recognition, and Umrah anchor.
- Warm sunrise gold: optimism and important actions.
- Soft sky blue: worldwide exploration.
- Sand and warm ivory: welcoming page surfaces.
- Deep forest ink: accessible primary text.
- Coral: limited use for joyful offers and travel accents.

Exact color values will be selected during the design-system prompt stage and must pass contrast checks in their intended combinations.

### 8.2 Typography

- Interface and body direction: Plus Jakarta Sans.
- Display direction: Fraunces. A substitute may be proposed only if testing finds a documented legibility, loading, or required-glyph failure; the substitute must preserve the warm editorial character and pass the same acceptance checks.

The prompt system must specify fallbacks, loading behavior, multilingual glyph coverage, responsive type scale, line lengths, numeral styling, and accessibility requirements.

### 8.3 Logo deliverables

Logo prompts will evolve the abstract `R` so it may subtly suggest a route, journey, or horizon. They must avoid generic airplane, globe, crescent, mosque, and Kaaba clip-art.

Required variants:

- Horizontal.
- Stacked.
- Symbol only.
- Monochrome.
- Dark-background.
- Favicon/app icon.
- Social avatar.

## 9. Motion system

Motion is abundant but purposeful. Every major transition and interaction receives considered motion, but the interface must not move continuously without meaning.

Core motifs:

- Journey line connecting major homepage sections.
- Split hero transitions between pilgrimage and worldwide travel.
- Layered cinematic parallax with restrained depth.
- Masked and staggered text reveals.
- Destination-card depth, coordinates, and route traces.
- Smooth package-card detail expansion.
- Scroll-responsive geometric patterns.
- Animated counters, trust badges, testimonials, and process timelines.
- Tactile button and CTA feedback.
- Page transitions inspired by passport stamps and unfolding maps.

Motion requirements:

- Slower and calmer on pilgrimage pages.
- Brighter and more playful on leisure pages.
- No essential information conveyed only through motion.
- Full keyboard operability.
- Complete `prefers-reduced-motion` behavior.
- Static fallback for every important animated state.
- Reduced parallax and lower complexity on small or constrained devices.
- Off-screen effects pause.
- Motion may not create layout shift or block content.

## 10. SEO and content system

The future vanilla JavaScript and Vite build must output crawlable static HTML for every public route at build time. Important page content, metadata, navigation, and internal links must not depend on client-side execution.

### 10.1 Technical SEO requirements

- Unique titles and descriptions.
- One clear primary heading per page.
- Self-referencing canonical URLs.
- Reciprocal `hreflang` for Indonesian and English equivalents.
- XML sitemap.
- Robots directives.
- Semantic HTML.
- Accessible navigation and landmarks.
- Stable, responsive images.
- Complete internal linking and breadcrumbs.
- Open Graph and social-sharing metadata.
- Redirect map from old WordPress routes.
- Useful custom 404.

### 10.2 Structured data

Use structured data only when supported by visible, verified content. Eligible types include:

- Organization.
- TravelAgency or the most accurate current schema type.
- Service.
- BreadcrumbList.
- Article.
- FAQPage when the visible page and current search guidelines permit it.
- Offer when the visible package information is real and current.

Fake ratings, reviews, prices, availability, certifications, offices, and unsupported schema are prohibited.

### 10.3 Content clusters

- Umrah packages, preparation, documents, packing, family travel, elderly support, timing, and consultation.
- Hajj information, preparation, process, and consultation.
- Family international travel, group travel, destination planning, seasons, budgets, visas, and itineraries.
- Jakarta travel agency and Umrah consultation content.
- Bandung travel agency and Umrah consultation content.
- Travel tools covering airport transfers and future partner categories.

Jakarta and Bandung pages must contain distinct local context, service information, customer questions, and travel patterns. City-name substitution is prohibited.

### 10.4 Article records

Each article prompt specifies search intent, audience stage, primary and supporting topics, author, reviewer, publish/update dates, sources, category, reading time, internal links, related packages, related referrals, CTA, schema eligibility, image brief, and localization guidance.

Religious, regulatory, health, visa, price, and schedule information requires a review date and authoritative-source register.

## 11. Marketing measurement and consent

The site supports marketing measurement rather than publisher advertising. Google AdSense placements are out of scope.

Planned integration points:

- Google Tag Manager.
- Google Analytics 4.
- Google Ads conversions.
- Meta Pixel.
- Consent Mode support.
- UTM and campaign attribution persistence.

All IDs are replaceable configuration fields. Dummy IDs must not be accepted as launch-ready values. Analytics and advertising storage must follow the visitor's consent choice and applicable policy requirements.

The central placeholder register must use, at minimum, these exact keys for currently unknown launch inputs:

- `UMRAH_CERTIFICATION_NAME`.
- `UMRAH_CERTIFICATION_NUMBER`.
- `UMRAH_CERTIFICATION_ISSUER`.
- `UMRAH_CERTIFICATION_VERIFY_URL`.
- `PRIMARY_WHATSAPP_NUMBER`.
- `GTM_CONTAINER_ID`.
- `GA4_MEASUREMENT_ID`.
- `GOOGLE_ADS_CONVERSION_ID`.
- `META_PIXEL_ID`.
- `JAKARTA_VERIFIED_SERVICE_DETAILS`.
- `BANDUNG_VERIFIED_SERVICE_DETAILS`.
- `VERIFIED_TESTIMONIALS`.

Any unresolved value in this list is a launch blocker for the feature or claim that consumes it. The prompt package must define an owner, evidence source, affected routes, replacement status, and validation rule for each key.

### 11.1 Event taxonomy

- Language change.
- Journey-pillar selection.
- Package view.
- Package comparison.
- Journey-finder start.
- Journey-finder completion.
- Journey recommendation.
- WhatsApp click with non-sensitive page/package context.
- Phone click.
- Email click.
- Map click.
- Social click.
- Referral impression.
- Referral outbound click.
- Article engagement.
- Article-to-package click.
- Certification verification click.
- Consent choice.
- Optional future form success and failure.

The prompt system must define event names, triggers, parameters, consent requirements, deduplication behavior, validation method, and destination platform.

## 12. Referral and redirect system

Welcome Pickups through Travelpayouts is the only currently named active referral. The prompt system also provides configurable, initially unassigned categories for:

- Flights.
- Hotels.
- Airport transfers.
- Activities.
- Travel insurance.
- Visa assistance.
- Ground transport.
- Connectivity.
- Travel essentials.

Each referral record includes provider name, category, status, destination URL, disclosure text, languages, logo asset, tracking fields, fallback action, effective date, expiry/review date, and verification status.

Every referral interaction must:

- Identify the destination provider.
- State that the visitor is leaving Rasuna Travel.
- Disclose the affiliate relationship.
- Distinguish external booking from Rasuna-operated services.
- Use safe external-link behavior.
- Record consent-aware outbound-click measurement.
- Offer WhatsApp consultation when the partner or widget is unavailable.

An optional redirect confirmation may be used for clarity and measurement. Deceptive countdowns, disguised links, forced redirects, and fake urgency are prohibited.

## 13. Error and fallback behavior

Page and component prompts must specify useful behavior for:

- Third-party widget failure.
- Blocked third-party script.
- Expired offer.
- Missing or disabled partner.
- Invalid outbound URL.
- Offline visitor.
- Missing translation.
- Failed WhatsApp launch.
- Missing image.
- Empty package or article collection.
- JavaScript-disabled browsing.

Fallbacks preserve core content and generally offer direct consultation. No failure state may leave a blank section, trap focus, conceal the external destination, or repeatedly retry without user control.

## 14. AI-generated asset system

AI-generated imagery is acceptable for the initial site. It must be treated as illustrative rather than evidence of real customers, staff, offices, departures, accommodations, or partnerships.

### 14.1 Asset families

- Logo explorations and production variants.
- Dual-world homepage hero.
- Umrah and Hajj hero scenes.
- Worldwide family-travel hero scenes.
- Destination-card imagery by region.
- Jakarta and Bandung contextual imagery.
- Family, multigenerational, group, couple, and solo-travel imagery.
- Route maps, contour lines, passport textures, stamps, and geometric patterns.
- Icon family and referral-category illustrations.
- Article covers.
- Package-detail hero crops.
- Open Graph and social-sharing templates.
- Motion keyframes and transition storyboards.

### 14.2 Prompt requirements

Each asset prompt defines:

- Purpose and route.
- Subject and composition.
- Aspect ratio and dimensions.
- Focal point.
- Responsive crop-safe zones.
- Lighting and color palette.
- Indonesian audience representation.
- Wardrobe and cultural context.
- Realism and art direction.
- Negative prompt.
- Text-free and logo-free requirements for photography.
- Compression and delivery target.
- Alt-text intent.

Pilgrimage imagery must be respectful and documentary-inspired. Prompts must avoid malformed sacred architecture, inaccurate rituals, identifiable fake customer stories, invented staff, exaggerated luxury, unsafe crowd scenes, and compositions that imply generated people are verified Rasuna customers. Sacred-site imagery requires human accuracy review before publication.

### 14.3 Asset manifest

The asset manifest records filename, purpose, route, dimensions, responsive variants, generation status, approval status, attribution/license field, alt text, and replacement priority.

## 15. Prompt library architecture

The production plan will create modular, copy-paste-ready prompts in this dependency order:

1. Master product and business brief.
2. Content-truth, evidence, and placeholder register.
3. Brand modernization and logo direction.
4. Design tokens, typography, layout, and accessibility.
5. Global navigation, language switching, footer, consent, and WhatsApp systems.
6. Homepage.
7. Hajj and Umrah experiences.
8. Worldwide Travel experiences.
9. Package and destination templates.
10. Jakarta and Bandung local pages.
11. Articles and SEO content templates.
12. Travel Tools, referral cards, and outbound redirects.
13. Motion direction and animation choreography.
14. Analytics and event taxonomy.
15. Technical SEO and static-output requirements.
16. Responsive behavior and mobile experience.
17. Performance, accessibility, privacy, and error states.
18. Visual asset generation.
19. Content-entry prompts for future packages, destinations, partners, and articles.
20. QA, launch audit, and placeholder-removal checklist.

Every prompt must contain:

- Role and objective.
- Approved context.
- Required inputs.
- Dependencies and referenced artifacts.
- Exact scope.
- Constraints and prohibited assumptions.
- Expected output structure.
- Responsive, accessibility, SEO, motion, privacy, and performance considerations where relevant.
- Acceptance criteria.
- Self-review checklist.

No prompt may use `TBD` as an excuse for an unspecified behavior. Unknown business facts must use named placeholders tied to the central placeholder register.

## 16. Required planning artifacts

The complete prompt package will produce:

- Master prompt index and execution order.
- Business-truth and evidence register.
- Placeholder register.
- Page matrix.
- Component matrix.
- Content model.
- Package and destination record schemas.
- Design-system prompt.
- Motion matrix.
- SEO and structured-data matrix.
- Redirect matrix.
- Analytics-event matrix.
- Referral-provider schema.
- Asset prompt library.
- Asset manifest.
- Responsive behavior matrix.
- Accessibility checklist.
- Performance budget and third-party script policy.
- Privacy and consent checklist.
- Error/fallback matrix.
- Final launch checklist.

## 17. Quality gates

The prompt package is complete only when it ensures:

- Equal overall positioning for pilgrimage and worldwide travel.
- Certified Umrah service is the first trust signal without an invented credential.
- WhatsApp consultation is consistently accessible.
- Fixed and consultation pricing are visibly distinct.
- Referral services are clearly separated from Rasuna-operated services.
- Indonesian and English content, routes, metadata, and switching rules are complete.
- Jakarta and Bandung pages provide distinct local value.
- Major content is crawlable without client-side JavaScript.
- Motion is rich but supports keyboard use, reading, reduced motion, and mobile performance.
- Reviews, ratings, availability, licenses, offices, prices, schedules, and partnerships are verified or withheld.
- Consent controls Google and Meta measurement behavior.
- Measurement events are defined and testable without sensitive personal data.
- Failure states provide useful alternatives.
- Asset variants support desktop, tablet, mobile, and social crops.
- Accessibility targets WCAG 2.2 AA.
- Performance prioritizes strong Core Web Vitals despite animation and third-party integrations.
- Every placeholder is centrally inventoried and blocks production release until resolved.

## 18. Success measures

Success is evaluated through:

- Qualified WhatsApp consultation starts.
- Package and destination engagement.
- Journey-finder completion and follow-through.
- Referral click-through.
- Organic landing-page growth.
- Jakarta and Bandung search visibility.
- Indonesian and English page coverage.
- Consent-respecting attribution quality.
- Accessibility audit results.
- Core Web Vitals.
- Placeholder-free, evidence-backed launch readiness.

Animation volume alone is not a success measure.

## 19. Scope boundaries

This phase does not include application code, Vite scaffolding, production assets, live tracking installation, referral enrollment, backend services, payment, real-time inventory, CRM integration, or publishing changes to the existing website.

The next approved phase is a detailed production plan for authoring and validating every prompt and planning artifact described in this specification.
