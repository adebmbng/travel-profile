# Rasuna Travel Generated Asset Package

**Generated:** 2026-08-17
**Generation mode:** built-in `image_gen` tool
**Output directory:** `public/assets/generated/`
**Status:** Generated and visually inspected; sacred-site imagery still requires human accuracy review before publication.

These are raster art-direction assets for the approved “Two Journeys, One Trusted Guide” concept. They contain no production copy, certification claims, partner logos, or customer evidence. Generated people and scenes are illustrative and must not be presented as real Rasuna customers, staff, offices, departures, or verified partner services.

## Asset manifest

| File | Dimensions | Intended use | Route or surface | Alt-text intent | Status |
| --- | ---: | --- | --- | --- | --- |
| `hero-dual-journey-master.png` | 1915×821 | Homepage dual-world hero | `/id/`, `/en/` home | Makkah dawn and a family coastal journey connected as two travel paths | Reviewed |
| `hero-umrah-master.png` | 1672×941 | Umrah hero | Hajj/Umrah overview, Umrah package pages | Indonesian multigenerational family viewing Makkah at dawn | Requires sacred-site accuracy review |
| `hero-worldwide-master.png` | 1672×941 | Worldwide Travel hero | Worldwide Travel overview | Indonesian family exploring a bright coastal European village | Reviewed |
| `hero-umrah-mobile.png` | 1122×1402 | Mobile Umrah hero | Small-screen Umrah pages | Family viewing Makkah from a calm overlook | Requires sacred-site accuracy review |
| `hero-worldwide-mobile.png` | 1122×1402 | Mobile Worldwide hero | Small-screen leisure pages | Indonesian family walking through a sunny coastal village | Reviewed |
| `umrah-preparation-flatlay.png` | 1448×1086 | Preparation article/support image | Umrah preparation guide and related cards | Blank travel essentials arranged for pilgrimage preparation | Requires religious-context review |
| `hajj-information.png` | 1536×1024 | Hajj information support image | Hajj information page | Pilgrims walking near orderly Arafat tents at dawn | Requires religious-context review |
| `local-jakarta.png` | 1448×1086 | Local landing-page image | Jakarta service page | Indonesian family planning a trip near Monas at blue hour | Reviewed |
| `local-bandung.png` | 1448×1086 | Local landing-page image | Bandung service page | Indonesian family walking through a misty Bandung highland landscape | Reviewed |
| `destination-japan.png` | 1536×1024 | Destination card | Worldwide destination directory | Indonesian family exploring a Kyoto lane in spring | Reviewed |
| `destination-turkiye.png` | 1536×1024 | Destination card | Worldwide destination directory | Indonesian family beside the Istanbul waterfront | Reviewed |
| `destination-bali.png` | 1536×1024 | Destination card | Worldwide destination directory | Indonesian family walking through Bali rice terraces | Cultural review recommended |
| `family-group-travel.png` | 1536×1024 | Family/group travel hero or card | Family and group travel | Multigenerational group beside a mountain train | Reviewed |
| `consultation-scene.png` | 1448×1086 | Consultation CTA/About image | About, Why Rasuna, custom consultation | Advisor and family planning around a blank route map | Reviewed |
| `referral-airport-transfer.png` | 1536×1024 | Travel Tools card | Welcome Pickups/referral category | Family meeting an unbranded airport-transfer driver | Must retain external-service disclosure |
| `article-family-travel-planning.png` | 1448×1086 | Article cover | Family travel planning article | Family hands planning a route around a blank map | Reviewed |
| `og-home-background.png` | 1731×909 | Social/Open Graph background | Homepage sharing metadata | Makkah and coastal family journey as a wide visual transition | Requires sacred-site accuracy review |
| `route-map-texture.png` | 1672×941 | Abstract section background | Motion sections, footer, editorial blocks | Decorative route lines and contour texture | Reviewed |
| `logo-concept-board.png` | 1254×1254 | Brand exploration board | Design review only; not production logo | Four abstract R mark explorations on ivory | Concept only; redraw as vector before launch |
| `traveler-couple.png` | 1536×1024 | Couple package card | Worldwide package directory/detail | Indonesian couple walking beside a tropical coastal village | Reviewed |
| `traveler-solo.png` | 1536×1024 | Solo package card | Worldwide package directory/detail | Solo Indonesian traveler looking across a mountain valley from a train platform | Reviewed |
| `referral-category-illustrations.png` | 1254×1254 | Future referral category board | Travel Tools | Six text-free illustrations for flight, hotel, transfer, activity, insurance, and visa categories | Concept board; redraw as vectors if needed |
| `passport-stamp-texture.png` | 1672×941 | Editorial texture | Article headers, motion transitions | Abstract passport-stamp impressions and route dashes on paper | Reviewed; no real seals or text |
| `package-detail-family-hero.png` | 1672×941 | Package-detail hero | Worldwide package detail template | Family arriving at a lakeside town by train | Reviewed |

## Generation and usage rules

- Keep all copy, language labels, certification data, prices, partner names, and CTAs in HTML/UI layers rather than in generated pixels.
- Use responsive `object-position` values from the composition notes below; do not crop away the family or sacred context.
- Do not add generated testimonials, “real customer” captions, staff names, office claims, or live availability.
- Do not use the logo exploration board as the final logo. Select one direction and redraw it as a proper vector mark.
- Review all pilgrimage imagery with a knowledgeable human before publication. Do not use the images as proof of certification, package availability, or religious authority.
- Add disclosure where referral imagery could be mistaken for a Rasuna-operated service.
- Generate compressed delivery derivatives later (WebP/AVIF where supported) while retaining these masters as source files.

## Reproducible prompt set

The following prompts were used, normalized into the shared image-generation schema, and should be reused for replacement variants. Every prompt intentionally excludes text, logos, watermarks, personal data, and unsupported business claims.

### `hero-dual-journey-master.png`

```text
Use case: photorealistic-natural
Asset type: Rasuna Travel homepage hero, wide desktop master image
Primary request: create a cinematic split-world travel scene for an Indonesian family-friendly travel agency. Visually connect a respectful pilgrimage journey and a joyful worldwide family journey without looking like a collage.
Scene/backdrop: seamless wide cinematic environment with a subtle horizon and flowing route line implied by composition; left side evokes early-morning Makkah with a distant, architecturally accurate Kaaba area seen respectfully from a broad public viewpoint; right side evokes an international family holiday with Indonesian parents and two children walking beside a bright coastal European village and sea.
Subject: one coherent visual narrative of two journeys; no identifiable real people, logos, brands, or readable text.
Style/medium: premium documentary travel photography, natural textures, realistic scale, editorial campaign quality, restrained cinematic grading.
Composition/framing: 21:9 ultra-wide hero; central 38% and lower-left 25% calm and low-detail for headline, buttons, and journey selector; subjects toward outer thirds; strong depth from foreground to horizon.
Lighting/mood: dawn-to-morning transition, warm gold on pilgrimage side, bright airy daylight on leisure side, welcoming and trustworthy.
Color palette: deep emerald, warm ivory, sunrise gold, soft sky blue, restrained coral accents.
Constraints: respectful sacred-site depiction; culturally appropriate modest clothing; no invented certification, inaccurate ritual, customer testimonial, baked-in text, watermark, or border.
Avoid: hard split seam, surreal architecture, malformed Kaaba, extra limbs, distorted faces, duplicated children, excessive crowds, luxury-excess cues, generic stock smiles, airplane clip-art, globe icons, crescents, UI, signs, flags, and brand marks.
```

### `hero-umrah-master.png`

```text
Use case: photorealistic-natural
Asset type: Umrah service page hero, wide desktop master
Primary request: a respectful, calm, premium documentary-style scene representing an Indonesian family beginning an Umrah journey near the holy sanctuary.
Scene/backdrop: broad public viewpoint of the Masjid al-Haram exterior and surrounding Makkah skyline at first light, architecturally accurate and respectfully distant; no ritual being staged.
Subject: Indonesian multigenerational family of four seen from behind at a quiet overlook, adults in modest neutral clothing, one older parent supported gently, faces not identifiable.
Style/medium: natural editorial travel photography, realistic scale, tactile stone and fabric, no CGI.
Composition/framing: 16:9 wide hero, people in the right third, open calm negative space on the left for headline and CTA.
Lighting/mood: dawn, warm ivory light, serene, reassuring, prepared, family-friendly.
Color palette: deep emerald, warm ivory, sunrise gold, muted sand, soft sky blue.
Constraints: no readable text, logos, watermark, invented credentials, fake testimonial, or commercial signage.
Avoid: malformed Kaaba or mosque architecture, inaccurate rituals, exaggerated crowds, spectacle, luxury hotel advertising, generic stock smiles, extra limbs, distorted hands, flags, airplane icons, and crescent clip-art.
```

### `hero-worldwide-master.png`

```text
Use case: photorealistic-natural
Asset type: Worldwide Travel service page hero, wide desktop master
Primary request: a joyful but grounded family travel scene showing Rasuna Travel’s worldwide leisure journey.
Scene/backdrop: sunlit coastal European village with a train platform or ferry promenade subtly visible in the distance, mountains and sea, authentic lived-in details, no recognizable brand locations or signs.
Subject: Indonesian parents with two children and a grandparent exploring together, candid walking and looking around, natural interaction, no identifiable real people.
Style/medium: premium documentary travel photography, editorial campaign quality, realistic textures, natural skin and fabric.
Composition/framing: 16:9 wide hero, family grouped in the right third, open sky and scenic negative space on the left for copy.
Lighting/mood: bright late-morning daylight, optimistic, welcoming, curious, accessible.
Color palette: emerald accents, warm ivory, sky blue, sun gold, restrained coral.
Constraints: no text, logos, watermark, brand signage, airline branding, fake review cues, or exaggerated luxury.
Avoid: posed catalog smiles, tourist clichés, fantasy architecture, distorted faces/hands, extra people, heavy crowds, airplane or globe graphics, lens flare covering subjects.
```

### `umrah-preparation-flatlay.png`

```text
Use case: photorealistic-natural
Asset type: Umrah preparation article and package-support image
Primary request: a calm, trustworthy flat-lay scene about preparing for a family pilgrimage journey.
Scene/backdrop: warm ivory tabletop near a window with soft morning light; neutral travel essentials including a plain passport with no readable details, blank notebook, prayer beads, modest folded clothing, water bottle, and phone with blank screen.
Subject: organized preparation still life with no visible personal data.
Style/medium: tactile editorial still-life photography, clean and premium but accessible, natural materials.
Composition/framing: 4:3 landscape, clean upper-left area for article title overlays.
Lighting/mood: soft morning light, calm, prepared, reassuring.
Color palette: warm ivory, sand, deep emerald accents, muted gold, soft charcoal.
Constraints: blank passport cover, no real documents, no readable text, logos, watermark, medical or legal claims.
Avoid: fake visa stamps, inaccurate religious objects, clutter, luxury excess, extra fingers, legible text, and brand marks.
```

### `hajj-information.png`

```text
Use case: photorealistic-natural
Asset type: Hajj information page support image
Primary request: a respectful, educational visual representing preparation and community during Hajj without making a regulatory or service claim.
Scene/backdrop: broad, quiet view of the Arafat plain with orderly neutral tents and distant hills at early morning; no private details and no staged ritual.
Subject: small group of diverse adult pilgrims seen from respectful distance, modest plain clothing, walking calmly.
Style/medium: documentary travel photography, realistic scale, soft atmospheric depth, sober and reverent.
Composition/framing: 3:2 landscape, open sky and uncluttered left side for article copy, people small in lower-right.
Lighting/mood: soft dawn, calm, prepared, respectful.
Color palette: sand, warm ivory, deep emerald accents, pale blue, muted gold.
Constraints: no text, logos, watermark, invented certification, invented service guarantee, or inaccurate ritual depiction.
Avoid: crowd spectacle, unsafe conditions, fake official signage, distorted people, flags, and brand marks.
```

### `local-jakarta.png`

```text
Use case: photorealistic-natural
Asset type: Jakarta local service page and destination card
Primary request: an authentic, warm Jakarta family travel moment that feels local and useful rather than a generic skyline postcard.
Scene/backdrop: early-evening pedestrian promenade near a recognizable but tasteful Jakarta landmark silhouette, lush tropical plants, clean urban context, warm city lights, no readable signs or brand names.
Subject: Indonesian multigenerational family of four planning a trip together, one person holding a folded map with no text, candid conversation.
Style/medium: premium documentary lifestyle photography, natural textures, realistic Indonesian faces and clothing.
Composition/framing: 4:3 landscape, family on the right third, calm open space on the left for local-page copy.
Lighting/mood: warm blue-hour light, welcoming, practical, trustworthy.
Color palette: deep emerald, warm ivory, sunrise gold, sky blue, muted coral.
Constraints: do not imply a Rasuna office address; no logos, readable text, watermark, exact commercial signage, or fake customers.
Avoid: generic stock poses, distorted faces/hands, invented office storefront, luxury-only cues, traffic chaos, flags, and brand marks.
```

### `local-bandung.png`

```text
Use case: photorealistic-natural
Asset type: Bandung local service page and destination card
Primary request: an authentic Bandung family travel moment combining the city’s cool highland character with approachable travel planning.
Scene/backdrop: lush Bandung highland tea landscape meeting a refined heritage lane with colonial-era architecture in the distance, soft mist, tropical greenery, no readable street signs.
Subject: Indonesian parents, child, and older relative walking slowly and enjoying the landscape, casual modest clothing, natural posture.
Style/medium: premium documentary travel photography, tactile foliage and stone, realistic scale, calm family warmth.
Composition/framing: 4:3 landscape, group to the left third, negative space on the right for copy, layered path into background.
Lighting/mood: soft overcast morning, fresh, calm, friendly, locally grounded.
Color palette: deep emerald, misty blue-green, warm ivory, pale gold, restrained coral.
Constraints: no identifiable office, invented local business, text, logos, watermark, or false testimonial context.
Avoid: fantasy mountains, excessive fog, generic resort advertising, distorted faces/hands, crowded attractions, and brand signage.
```

### Destination-card prompts

The Japan, Türkiye, and Bali cards share the same rules: 3:2 landscape, premium documentary travel photography, Indonesian family representation, open crop-safe space, no readable text, logos, watermark, or fake booking claim. Their scenes are respectively a quiet Kyoto side street in spring, the Istanbul waterfront with accurate distant monuments, and Bali rice terraces with subtle respectful temple context. Use natural daylight, realistic scale, deep emerald/ivory/sky-blue/gold palette, and avoid crowds, distorted people, flags, brand marks, and fantasy architecture.

### `family-group-travel.png`

```text
Use case: photorealistic-natural
Asset type: family and group travel hero/card
Primary request: a joyful multigenerational group travel moment showing accessibility and shared discovery.
Scene/backdrop: scenic train platform beside a green mountain valley, modern unbranded train in background, clear paths and benches, no station text.
Subject: Indonesian family group of six including older adult and children, relaxed candid conversation, one person gently helping older adult.
Style/medium: documentary travel photography, tactile, realistic, optimistic but not posed.
Composition/framing: 3:2 landscape, group on left third, open landscape and negative space on right for copy.
Lighting/mood: clear soft daylight, joyful, safe, inclusive, exploratory.
Color palette: emerald, warm ivory, sky blue, sun gold, muted coral.
Constraints: no logos, readable text, watermark, fake customer story, or unsafe platform behavior.
Avoid: crowding, rushing, distorted faces/hands, inaccessible scene, luxury-only styling, and brand signage.
```

### `consultation-scene.png`

```text
Use case: photorealistic-natural
Asset type: consultation CTA and About Rasuna support image
Primary request: a warm, human travel consultation scene that communicates listening and planning.
Scene/backdrop: bright welcoming office-like consultation table with blank notebook, blank tablet, route map with no readable labels, tea, and plants; no identifiable business address.
Subject: Indonesian travel advisor and multigenerational family seated together, advisor listening and pointing to blank route map, candid interaction, no identifiable real people.
Style/medium: premium natural lifestyle photography, family-friendly, credible, approachable.
Composition/framing: 4:3 landscape, advisor and family on right half, clean negative space on left for CTA copy.
Lighting/mood: soft daylight, warm, patient, confident.
Color palette: warm ivory, deep emerald, sky blue, sunrise gold, restrained coral.
Constraints: no logos, text, watermark, fake certification, fake customer testimonial, or identifiable office claim.
Avoid: sales pressure, staged handshake, generic corporate pose, distorted hands, visible personal data, and branded screens.
```

### `referral-airport-transfer.png`

```text
Use case: photorealistic-natural
Asset type: Travel Tools referral card image for airport transfers
Primary request: a generic, trustworthy airport-transfer scene suitable for a referral card without implying Rasuna operates the vehicle.
Scene/backdrop: modern international airport curb at morning, clean unbranded family van arriving, luggage trolley, tropical city atmosphere, no readable signs or logos.
Subject: Indonesian family meeting a professional driver at a curb, natural greeting, no identifiable real people.
Style/medium: polished documentary travel photography, accessible and practical, realistic details.
Composition/framing: 3:2 landscape, vehicle on right, family and open negative space on left for card text.
Lighting/mood: bright morning, easy, reassuring, efficient.
Color palette: emerald, ivory, sky blue, warm gold, muted charcoal.
Constraints: no brand badges, license plates, text, watermark, or claim that Rasuna owns or operates the service.
Avoid: taxi logos, fake signage, dangerous curb behavior, distorted faces/hands, limousine cues, and crowded chaos.
```

### `route-map-texture.png`

```text
Use case: stylized-concept
Asset type: motion-section background texture and route graphic
Primary request: an abstract premium background texture inspired by travel routes, contour lines, folding maps, passport stamps, Indonesian textile rhythm, and subtle Islamic geometry.
Scene/backdrop: warm ivory paper-like field with deep-emerald and soft-sky-blue contour lines flowing diagonally, sunrise-gold route nodes, faint geometric pattern, ample empty center.
Subject: no people, objects, literal map labels, or real geography.
Style/medium: refined editorial graphic texture, tactile paper grain, flat layered shapes with slight depth, vector-friendly edges delivered as raster background.
Composition/framing: 16:9 wide, visual weight toward edges and corners, center quiet for text and cards.
Lighting/mood: calm, curious, optimistic.
Color palette: warm ivory, deep emerald, muted sky blue, sunrise gold, restrained coral.
Constraints: no text, logos, real geography, country borders, watermark, or photographic elements.
Avoid: busy center, harsh neon, childish cartoon style, compass icons, airplane clip-art, crescent, and Kaaba symbols.
```

### `og-home-background.png`

```text
Use case: ads-marketing
Asset type: homepage Open Graph and social-sharing background
Primary request: a polished social preview background for Rasuna Travel’s two-journey homepage, with clear visual storytelling but no baked-in text.
Scene/backdrop: wide cinematic transition from warm Makkah dawn on the left to bright worldwide family coastal travel on the right, connected by subtle route path and shared horizon.
Subject: distant respectful pilgrimage architecture on left and Indonesian family walking beside sunny international coastline on right, no identifiable real people.
Style/medium: premium documentary travel campaign photography with refined editorial grade.
Composition/framing: 1.91:1 social card; central and upper-left zones low-detail for HTML title and logo; important subjects in outer thirds.
Lighting/mood: warm dawn blending into bright morning, welcoming, trustworthy, optimistic.
Color palette: deep emerald, warm ivory, sunrise gold, sky blue.
Constraints: no text, logos, watermark, fake certification, fake testimonial, malformed architecture, or hard split-screen seam.
Avoid: excessive crowding, generic stock smiles, airplane/globe graphics, UI, flags, distorted hands and faces.
```

### Mobile hero variants

`hero-umrah-mobile.png` is a 4:5 re-composition of the Umrah master with the family in the lower half and quiet upper third for mobile copy. `hero-worldwide-mobile.png` is a 4:5 re-composition of the Worldwide master with the family in the lower-middle and quiet upper third. Both retain the desktop prompts’ cultural, text-free, logo-free, and no-claims constraints. Sacred-site review applies to the Umrah variant.

### `article-family-travel-planning.png`

```text
Use case: photorealistic-natural
Asset type: article cover for family travel planning content
Primary request: a warm editorial cover image for an article about planning a family trip with confidence.
Scene/backdrop: airy home planning table with blank notebook, blank tablet, neutral route map with no readable labels, blank calendar, tea, camera, and small suitcase; no personal data.
Subject: Indonesian parents and older relative leaning in to plan together, partial hands and shoulders only, no identifiable real people.
Style/medium: premium lifestyle editorial photography, tactile paper and fabric, accessible and calm.
Composition/framing: 4:3 landscape, objects and people weighted right, quiet negative space left for HTML article title.
Lighting/mood: soft late-afternoon window light, prepared, optimistic, reassuring.
Color palette: warm ivory, deep emerald, sky blue, muted gold, restrained coral.
Constraints: no readable text, logos, watermark, fake documents, fake review, or invented business claims.
Avoid: passport numbers, visa stamps, branded apps, clutter, stock-photo handshake, distorted hands, and luxury excess.
```

### Logo exploration

`logo-concept-board.png` uses the current Rasuna logo only as a continuity reference and presents four flat abstract-R directions. It is a design-review board, not a production logo. A selected mark must be redrawn as accessible SVG/PDF/PNG variants and tested at favicon, header, dark-background, and social-avatar sizes before launch.

### `traveler-couple.png`

```text
Use case: photorealistic-natural
Asset type: couple travel package card
Primary request: an intimate but family-friendly travel scene for a couple-focused worldwide package, with warmth and curiosity rather than luxury excess.
Scene/backdrop: Indonesian couple walking beside a quiet coastal village and sea at golden hour, authentic stone path, soft plants, no readable signs or brand marks.
Subject: adult Indonesian couple, natural conversation and walking, no identifiable real people, culturally appropriate everyday travel clothing.
Style/medium: premium documentary travel photography, natural texture, realistic scale, warm editorial quality.
Composition/framing: 3:2 landscape, couple on the right third, clean scenic negative space on the left for package title and price.
Lighting/mood: soft golden hour, connected, joyful, approachable.
Color palette: deep emerald, warm ivory, sky blue, sunrise gold, restrained coral.
Constraints: no text, logo, watermark, fake review, or implied celebrity/real-customer identity.
Avoid: wedding photography, engagement poses, luxury-only cues, excessive romance, distorted faces/hands, crowds, airplane/globe graphics.
```

### `traveler-solo.png`

```text
Use case: photorealistic-natural
Asset type: solo travel package card
Primary request: a confident, safe, inclusive solo-traveler scene for a worldwide travel package.
Scene/backdrop: Indonesian adult traveler standing on a clear mountain-view train platform with a small backpack, modern unbranded train and scenic valley, no readable station signs.
Subject: one adult Indonesian traveler in three-quarter profile, relaxed and curious, no identifiable real person.
Style/medium: premium documentary travel photography, realistic textures, approachable and safe.
Composition/framing: 3:2 landscape, traveler on the left third, clear path and open landscape on the right for package copy.
Lighting/mood: bright soft daylight, capable, calm, adventurous without risk-taking.
Color palette: deep emerald, warm ivory, sky blue, sun gold, muted coral.
Constraints: no text, logos, watermark, unsafe platform behavior, or invented safety claim.
Avoid: isolation or danger cues, extreme trekking, influencer posing, distorted face/hands, crowded station, brand signage.
```

### `referral-category-illustrations.png`

```text
Use case: stylized-concept
Asset type: referral-category illustration board
Primary request: a six-panel editorial illustration board for future referral categories: flights, hotels, airport transfers, activities, travel insurance, and visa assistance.
Scene/backdrop: warm ivory background with six evenly spaced rounded panels.
Subject: one simple flat illustration per panel: minimal airplane silhouette, welcoming hotel, airport-transfer vehicle, activity camera and landscape, protective shield with heart/check, and blank passport/document with route line; no text labels.
Style/medium: refined flat editorial illustration, geometric shapes, subtle paper grain, coherent icon-friendly line weight.
Composition/framing: square 2x3 grid, equal panels, ample padding, legible at card scale.
Lighting/mood: calm, friendly, trustworthy, modern.
Color palette: deep emerald, warm sunrise gold, soft sky blue, warm ivory, restrained coral.
Constraints: no readable text, logos, watermarks, real passport numbers, airline/hotel brands, religious symbols, or tiny complex details.
Avoid: childish clip-art, generic stock icons, excessive gradients, noisy background, inconsistent perspective, crowded panels.
```

### `passport-stamp-texture.png`

```text
Use case: stylized-concept
Asset type: passport-stamp and travel-texture background
Primary request: an abstract warm paper texture for article headers and motion transitions, inspired by travel stamps without readable words or real government seals.
Scene/backdrop: warm ivory fibrous paper with overlapping abstract circular and rectangular stamp impressions, route dashes, gold nodes, and subtle ink imperfections.
Subject: decorative surface only; no country names, dates, passport numbers, flags, or official seals.
Style/medium: tactile editorial printmaking, restrained layered ink, premium handmade paper.
Composition/framing: 16:9 wide texture with quiet center and visual weight at corners, suitable for low-opacity overlay.
Lighting/mood: calm, nostalgic, optimistic.
Color palette: deep emerald, muted sky blue, sunrise gold, restrained coral, warm ivory.
Constraints: no readable text, logos, watermark, real geography, or official insignia.
Avoid: busy center, neon colors, grunge dirt, fake credentials, patriotic flags, legible typography.
```

### `package-detail-family-hero.png`

```text
Use case: photorealistic-natural
Asset type: package-detail hero for a family itinerary
Primary request: a flexible package-detail hero showing the feeling of a well-planned family journey.
Scene/backdrop: Indonesian family of four arriving at a scenic lakeside town by an unbranded train, clear path, small luggage, welcoming architecture and mountains, no readable signs.
Subject: parents and children walking together naturally, no identifiable real people.
Style/medium: premium documentary travel photography, realistic texture, accessible and warm.
Composition/framing: 16:9 landscape, family on the right third, open scenic space on the left for package name and starting price.
Lighting/mood: clear morning daylight, prepared, joyful, calm.
Color palette: deep emerald, warm ivory, sky blue, sunrise gold, restrained coral.
Constraints: no text, logos, watermark, fake price, fake itinerary, or real destination claim.
Avoid: crowded terminal, unsafe luggage handling, distorted faces/hands, luxury-only styling, generic stock poses, brand signage.
```

## Provenance

All generated masters were copied from the built-in image-generation output directory into the project. No external stock image was downloaded for this package. The original generated output remains in the tool-managed generation directory; the project copies above are the files intended for future frontend integration.
