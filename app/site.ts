import source from '../_handoff/data/site.json';

export const data = source;
export const { brand, links, contact } = data;

export function visible<T extends object>(entry: T) {
  return data.flags.showUnconfirmed || !('confirm' in entry && entry.confirm === true);
}

export const products = data.products.filter(visible);
export const phone = !contact.phoneConfirm || data.flags.showUnconfirmed ? contact.phone : null;
export const address = !contact.addressConfirm || data.flags.showUnconfirmed ? contact.address : null;
export const navigation = [
  ['/story', '원복송어 이야기'], ['/products', '송어·액젓'], ['/wholesale', '식당·납품'],
  ['/experience', '평창사랑 체험'], ['/travel', '평창 여행'], ['/news', '소식'], ['/visit', '오시는 길'],
] as const;

export function siteOrigin() {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return process.env.SITE_URL || (host ? 'https://' + host : 'http://localhost:3000');
}
