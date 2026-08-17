import { describe, expect, it } from 'vitest';
import { renderInitialDocument } from '../src/renderers/document.js';
import { auditAccessibilityDocument } from '../scripts/check-routes.mjs';

describe('generated accessibility smoke checks', () => {
  it('finds the required landmarks and image alternatives on the home route', () => {
    const issues = auditAccessibilityDocument(renderInitialDocument('/id/'), '/id/');

    expect(issues).toEqual([]);
  });

  it('reports missing landmarks instead of silently passing malformed HTML', () => {
    expect(auditAccessibilityDocument('<html><body><h1>Broken</h1></body></html>', '/id/'))
      .toEqual(expect.arrayContaining(['missing-lang', 'missing-main', 'missing-skip-link']));
  });
});
