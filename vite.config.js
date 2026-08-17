import { defineConfig } from 'vite';
import { renderInitialDocument } from './src/renderers/document.js';

export default defineConfig({
  appType: 'spa',
  plugins: [{
    name: 'rasuna-static-shell',
    transformIndexHtml: {
      order: 'pre',
      handler(_html, context) {
        const pathname = context?.originalUrl || (context?.path && context.path !== '/index.html' ? context.path : '/id/');
        return renderInitialDocument(pathname);
      }
    }
  }]
});
