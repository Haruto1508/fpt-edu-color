import { useEffect } from 'react';

const BASE_URL = 'https://www.tienglongmientay.com';

function updateMetaTag(selector, attribute, value) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const parts = selector.match(/meta\[([a-zA-Z:-]+)="([^"]+)"\]/);
    if (parts) {
      element.setAttribute(parts[1], parts[2]);
      document.head.appendChild(element);
    }
  }
  if (element) {
    element.setAttribute(attribute, value);
  }
}

/**
 * Custom hook to dynamically manage SEO metadata for each page.
 * @param {Object} options
 * @param {string} options.title - Page title
 * @param {string} options.description - Meta description
 * @param {string} [options.canonicalPath] - Relative path for canonical URL (e.g. '/kham-pha')
 * @param {string} [options.ogImage] - Absolute or relative image URL
 * @param {Object} [options.schema] - JSON-LD Schema object
 */
export default function useSEO({ title, description, canonicalPath, ogImage, schema }) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
      updateMetaTag('meta[name="title"]', 'content', title);
      updateMetaTag('meta[property="og:title"]', 'content', title);
      updateMetaTag('meta[property="twitter:title"]', 'content', title);
    }

    // 2. Update Description
    if (description) {
      updateMetaTag('meta[name="description"]', 'content', description);
      updateMetaTag('meta[property="og:description"]', 'content', description);
      updateMetaTag('meta[property="twitter:description"]', 'content', description);
    }

    // 3. Update Canonical Link
    const targetPath = canonicalPath !== undefined 
      ? canonicalPath 
      : (window.location.pathname || '/');
    const cleanPath = targetPath.length > 1 && targetPath.endsWith('/') 
      ? targetPath.slice(0, -1) 
      : targetPath;
    const fullCanonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);
    updateMetaTag('meta[property="og:url"]', 'content', fullCanonicalUrl);
    updateMetaTag('meta[property="twitter:url"]', 'content', fullCanonicalUrl);

    // 4. Update OG Image
    if (ogImage) {
      const fullImgUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;
      updateMetaTag('meta[property="og:image"]', 'content', fullImgUrl);
      updateMetaTag('meta[property="twitter:image"]', 'content', fullImgUrl);
    }

    // 5. Update JSON-LD Structured Data Schema if provided
    let schemaScript = document.getElementById('page-structured-data');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'page-structured-data';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Cleanup custom page schema on unmount
      const existingScript = document.getElementById('page-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonicalPath, ogImage, schema]);
}
