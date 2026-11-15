import catalog from '../content/products.json';
import { Block, Grid, LinkButton, Tile } from './detail-ui';

type Option = { size: string; price: number; listPrice?: number; use: string };
type Spec = { k: string; v: string };
export type Product = { slug:string; status:string; badge:string; name:string; short?:string; lead?:string; options?:Option[]; review?:{count:number;rating:number}; storeUrl?:string; images?:string[]; spec?:Spec[]; image?:string; lastPrice?:string; lastPriceSource?:string; cta?:string; ctaHref?:string };
export const productCatalog: Product[] = catalog.products;
export const onSale = productCatalog.filter(product => product.status === 'onsale');
export const priceLabel = (price: number) => price.toLocaleString('ko-KR') + '원';
export const productPhoto = (image: string) => ['two-bottles.jpg','troutsoup-siraegi.jpg','troutsoup-shelf.jpg','troutsoup-bowl.jpg','sashimi-plate.jpg','sashimi-dip.jpg','rest-area-aekjeot.jpg','cabbage.jpg'].includes(image) ? 'products/' + image : image;

export function PriceOptions({ options }: { options?: Option[] }) {
  return <div className="price-options">{options?.map(option=><div key={option.size}><b>{option.size}</b><strong>{priceLabel(option.price)}</strong>{option.listPrice && <del>{priceLabel(option.listPrice)}</del>}<span>{option.use}</span></div>)}</div>;
}

export function ProductCard({ product }: { product: Product }) {
  const { name, badge, short, review, options, storeUrl, images, image, lastPrice, lastPriceSource, cta, ctaHref } = product;
  const picture = images?.[0] ?? image;
  return <Tile title={name} label={badge} text={short} image={picture ? productPhoto(picture) : undefined}>
    {review && <p className="review-meta">★ {review.rating} · 리뷰 {review.count}개</p>}
    {options && <><PriceOptions options={options}/><small>{catalog.basisDate} 기준</small></>}
    {lastPrice && <p>{lastPriceSource?.includes('품절') ? '지난 판매가 · ' : ''}{lastPrice}<small className="product-source">{lastPriceSource}</small></p>}
    <div className="actions">{storeUrl ? <><LinkButton href={storeUrl} className="btn btn-salmon">스마트스토어 구매 ↗</LinkButton><LinkButton href={'/products/'+product.slug}>자세히 보기 →</LinkButton></> : <LinkButton href={ctaHref ?? 'kakao'}>{cta}</LinkButton>}</div>
  </Tile>;
}

export function Recipes({ chaga = false }: { chaga?: boolean }) {
  const items = catalog.recipes.items;
  const recipes = chaga ? [...items.filter(item=>/돼지고기|된장찌개/.test(item.t)), ...items.filter(item=>!/돼지고기|된장찌개/.test(item.t))] : items;
  return <Block id="recipes" title="소금·간장을 조금 줄이고 액젓으로" lead={catalog.recipes.lead}><Grid cols={4}>{recipes.map(item=><Tile key={item.t} title={item.t} text={item.p} label={item.icon}><p><strong>{item.amt}</strong></p></Tile>)}</Grid><p className="detail-note">{catalog.recipes.source}</p></Block>;
}
