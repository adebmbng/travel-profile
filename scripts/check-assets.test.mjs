import { expect, it } from 'vitest';
import { auditAssets } from './check-assets.mjs';

it('reports a complete, non-empty generated asset manifest', async () => {
  const result = await auditAssets();

  expect(result.missing).toEqual([]);
  expect(result.zeroByte).toEqual([]);
  expect(result.unreferenced).toEqual([]);
});
