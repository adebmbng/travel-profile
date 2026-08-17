import { describe, expect, it } from 'vitest';
import { renderButton, renderHeader, renderLanguageSwitcher, renderWhatsAppLink } from './components.js';
import { renderDocument, renderInitialDocument } from './document.js';

describe('shared page shell', () => {
  it('renders a bilingual header with current navigation state', () => {
    const html = renderHeader({ locale: 'id', currentKey: 'home' });

    expect(html).toContain('aria-current="page"');
    expect(html).toContain('Hajj & Umrah');
    expect(html).toContain('Worldwide Travel');
  });

  it('renders a language switcher that preserves the current route', () => {
    expect(renderLanguageSwitcher({ locale: 'id', key: 'package-detail', params: { slug: 'family-lake-escape' } }))
      .toContain('/en/worldwide/paket/family-lake-escape/');
  });

  it('renders a contextual WhatsApp link without exposing private form data', () => {
    const html = renderWhatsAppLink({ locale: 'id', journey: 'umrah', packageName: 'Paket Keluarga' });

    expect(html).toContain('wa.me');
    expect(html).toContain('Paket%20Keluarga');
    expect(html).not.toContain('email');
  });

  it('renders document metadata and a no-JavaScript fallback', () => {
    const html = renderDocument(
      { locale: 'id', key: 'home', params: {}, canonicalPath: '/id/' },
      { body: '<h1>Rasuna Travel</h1>' }
    );

    expect(html).toContain('<html lang="id">');
    expect(html).toContain('<meta name="description"');
    expect(html).toContain('<noscript>');
    expect(html).toContain('Rasuna Travel');
  });

  it('renders the shared shell and localized route content in the initial document', () => {
    const html = renderInitialDocument('/en/worldwide/');

    expect(html).toContain('<html lang="en">');
    expect(html).toContain('data-site-shell');
    expect(html).toContain('<nav class="site-nav"');
    expect(html).toContain('<div id="app"><section class="page-intro');
    expect(html).toContain('src="/src/main.js"');
  });

  it('allows only escaped, structured button attributes', () => {
    const html = renderButton({
      label: 'Go',
      attributes: { 'aria-label': 'Go "now"', onfocus: 'alert(1)' }
    });

    expect(html).toContain('aria-label="Go &quot;now&quot;"');
    expect(html).not.toContain('onfocus');
    expect(html).not.toContain('alert(1)');
  });
});
