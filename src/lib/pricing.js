export function formatStartingPrice(value, locale = 'id') {
  if (!Number.isFinite(value) || value <= 0) return '';
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
}

export function hasStartingBenchmark(item) {
  const pricing = item?.pricing;
  return pricing?.mode === 'from'
    && Number.isFinite(pricing.value)
    && pricing.value > 0
    && pricing.unit === 'person'
    && pricing.basis === 'market-benchmark';
}
