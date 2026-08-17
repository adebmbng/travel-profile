import { expect, it } from 'vitest';
import { auditRoutes } from './check-routes.mjs';

it('reports all localized prerendered routes as complete', async () => {
  const result = await auditRoutes();

  expect(result.missing).toEqual([]);
  expect(result.invalidCanonical).toEqual([]);
  expect(result.duplicateCanonical).toEqual([]);
  expect(result.missingAlternates).toEqual([]);
});
