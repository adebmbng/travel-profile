import { expect, it } from 'vitest';
import { renderArticleDetail, renderDestinationDetail, renderPackageDetail, renderPackageDirectory } from './catalog.js';
import { renderTravelTools } from './travel-tools.js';
import { renderLocalPage } from './content-pages.js';

it('renders a package detail with mixed price semantics and WhatsApp CTA', () => {
  const html = renderPackageDetail({ locale: 'id', slug: 'family-lake-escape' });
  expect(html).toContain('Estimasi mulai dari');
  expect(html).toContain('per orang');
  expect(html).toContain('Benchmark pasar');
  expect(html).toContain('Konsultasi via WhatsApp');
  expect(html).toContain('package-detail-family-hero.png');
  expect(html).not.toContain('tersedia sekarang');
});

it('shows the starting benchmark on every package card and detail page', () => {
  const directory = renderPackageDirectory({ locale: 'id' });
  expect(directory.match(/Estimasi mulai dari/g)).toHaveLength(4);
  expect(directory).toContain('19.990.000');
  expect(directory).toContain('2.350.000');

  const detail = renderPackageDetail({ locale: 'en', slug: 'mountain-rail-discovery' });
  expect(detail).toContain('Estimated from');
  expect(detail).toContain('per person');
  expect(detail).toContain('market benchmark');
  expect(detail).toContain('Frequently asked questions');
});

it('renders package guidance as keyboard-friendly native accordions', () => {
  expect(renderPackageDetail({ locale: 'id', slug: 'family-lake-escape' })).toContain('<details class="quiet-card accordion"');
});

it('renders destination detail with related package and article links', () => {
  const html = renderDestinationDetail({ locale: 'en', slug: 'japan-family' });
  expect(html).toContain('destination-japan.png');
  expect(html).toContain('Related');
  expect(html).toContain('Planning notes');
});

it('renders record-specific article content without pending metadata copy', () => {
  const html = renderArticleDetail({ locale: 'en', slug: 'family-travel-planning' });
  expect(html).toContain('Plan the rhythm before the checklist');
  expect(html).toContain('Indonesia Travel');
  expect(html).not.toContain('will be updated');
});

it('discloses the current referral and gives every tool category neutral guidance', () => {
  const html = renderTravelTools({ locale: 'id' });
  expect(html).toContain('Welcome Pickups');
  expect(html).toContain('Travelpayouts');
  expect(html).toContain('affiliate');
  expect(html).toContain('rel="sponsored nofollow noopener noreferrer"');
  expect(html).toContain('Penerbangan');
  expect(html).toContain('Periksa tanggal fleksibel');
  expect(html).not.toContain('Segera hadir');
});

it('does not render unverified local office claims', () => {
  const html = renderLocalPage({ locale: 'id', city: 'jakarta' });
  expect(html).toContain('Mulai dengan konteks perjalanan');
  expect(html).not.toContain('JAKARTA_VERIFIED_SERVICE_DETAILS');
});
