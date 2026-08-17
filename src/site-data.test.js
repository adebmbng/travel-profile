import { expect, it } from 'vitest';
import { DESTINATIONS, PACKAGES } from './site-data.js';
import { hasStartingBenchmark } from './lib/pricing.js';

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

it('gives every destination practical planning content', () => {
  for (const item of DESTINATIONS) {
    expect(item.description.id.length).toBeGreaterThan(40);
    expect(item.highlights.en.length).toBeGreaterThanOrEqual(3);
    expect(item.questions.id.length).toBeGreaterThanOrEqual(2);
  }
});
