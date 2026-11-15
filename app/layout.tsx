import type { Metadata } from 'next';
import { Header, Footer } from './sections';
import { address, brand, contact, phone, siteOrigin } from './site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: { default: brand.name + ' | ' + brand.tagline, template: '%s | ' + brand.name },
  description: brand.heroText,
  openGraph: { title: brand.name + ' | ' + brand.tagline, description: brand.heroText, locale: 'ko_KR', type: 'website', images: ['/images/farm.jpg'] },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', name: contact.farmName,
    image: new URL('/images/farm.jpg', siteOrigin()).href,
    ...(address && { address: { '@type': 'PostalAddress', streetAddress: address, addressCountry: 'KR' } }),
    ...(phone && { telephone: phone }),
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: 'https://schema.org/Sunday', opens: '00:00', closes: '00:00' },
  };
  return <html lang="ko"><body><a className="skip" href="#content">본문으로 이동</a><Header/><main id="content">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u005c\u003c') }}/></body></html>;
}
