import { expect, it } from 'vitest';
import { escapeHtml } from './escape-html.js';

it('escapes HTML-sensitive values', () => {
  expect(escapeHtml('<script>alert("x")</script>')).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
});

it('returns an empty string for absent values', () => {
  expect(escapeHtml(null)).toBe('');
});
