import { initInteractions } from './client-interactions.js';

export function initClient(root = document) {
  return initInteractions(root);
}

export { initInteractions };
