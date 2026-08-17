import { expect, it } from 'vitest';
import { renderPackageDetail, renderDestinationDetail } from './catalog.js';
import { renderTravelTools } from './travel-tools.js';
import { renderLocalPage } from './content-pages.js';

it('renders a package detail with mixed price semantics and WhatsApp CTA', () => {
  const html = renderPackageDetail({ locale: 'id', slug: 'family-lake-escape' });
  expect(html).toContain('Konsultasikan harga');
  expect(html).toContain('Konsultasi via WhatsApp');
  expect(html).toContain('package-detail-family-hero.png');
  expect(html).not.toContain('tersedia sekarang');
});

it('renders package guidance as keyboard-friendly native accordions', () => {
  expect(renderPackageDetail({ locale: 'id', slug: 'family-lake-escape' })).toContain('<details class="quiet-card accordion"');
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
  expect(html).toContain('rel="sponsored nofollow noopener noreferrer"');
  expect(html).toContain('Segera hadir');
});

it('does not render unverified local office claims', () => {
  expect(renderLocalPage({ locale: 'id', city: 'jakarta' })).toContain('JAKARTA_VERIFIED_SERVICE_DETAILS');
});
