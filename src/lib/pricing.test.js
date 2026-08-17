import { expect, it } from 'vitest';
import { formatStartingPrice, hasStartingBenchmark } from './pricing.js';

it('formats benchmark prices for both locales', () => {
  expect(formatStartingPrice(19990000, 'id')).toContain('19.990.000');
  expect(formatStartingPrice(19990000, 'en')).toContain('19,990,000');
});

it('recognizes a valid market benchmark', () => {
  expect(hasStartingBenchmark({
    pricing: { mode: 'from', value: 19990000, unit: 'person', basis: 'market-benchmark' }
  })).toBe(true);
  expect(hasStartingBenchmark({ pricing: { mode: 'consultation' } })).toBe(false);
});
