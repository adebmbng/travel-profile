import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

const styles = readFileSync(new URL('./components.css', import.meta.url), 'utf8');

it('keeps journey finder select text readable against its light control background', () => {
  const controlRule = styles.match(/\.journey-finder__form input, \.journey-finder__form select \{[^}]+\}/)?.[0] ?? '';

  expect(controlRule).toContain('color: var(--color-forest-ink);');
});

it('keeps scroll-reveal sections visible while their motion starts', () => {
  const revealRule = styles.match(/\.js \[data-reveal\]:not\(\[data-revealed\]\) \{[^}]+\}/)?.[0] ?? '';

  expect(revealRule).not.toContain('opacity: 0');
  expect(revealRule).toContain('transform: translateY(1rem);');
});
