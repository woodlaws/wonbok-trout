import type { MetadataRoute } from 'next';
import { navigation, products, siteOrigin } from './site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...navigation.map(([path]) => path), ...products.map(product => '/products/' + product.slug)].map(path => ({ url: new URL(path, siteOrigin()).href }));
}
