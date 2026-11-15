import { notFound } from 'next/navigation';
import catalog from '../../../content/products.json';
import { Block, Faq, Grid, JsonLd, LinkButton, Steps, Tile } from '../../detail-ui';
import { onSale, PriceOptions, ProductCard, productPhoto, Recipes } from '../../product-content';
import { ProductGallery } from '../../product-gallery';

type Props = { params: Promise<{slug:string}> };
export const dynamicParams = false;
export function generateStaticParams(){return onSale.map(({slug})=>({slug}));}

async function find(params:Props['params']){
  const {slug}=await params;
  return onSale.find(item=>item.slug===slug)??notFound();
}
export async function generateMetadata({params}:Props){
  const item=await find(params);
  return {title:item.name,description:item.lead,openGraph:{title:item.name,description:item.lead,images:[{url:'/images/'+productPhoto(item.images![0])}]}};
}
export default async function Page({params}:Props){
  const item=await find(params);
  const photos=item.images!.map(productPhoto);
  return <>
    <JsonLd value={{'@context':'https://schema.org','@type':'Product',name:item.name,description:item.lead,image:photos.map(file=>'/images/'+file),offers:item.options!.map(option=>({'@type':'Offer',name:option.size,price:option.price,priceCurrency:'KRW',url:item.storeUrl,availability:'https://schema.org/InStock'})),aggregateRating:{'@type':'AggregateRating',ratingValue:item.review!.rating,reviewCount:item.review!.count}}}/>
    <Block><div className="detail-split product-detail"><ProductGallery images={photos} name={item.name}/><div className="detail-copy">
      <p className="eyebrow">{item.badge} · ★ {item.review!.rating} · 리뷰 {item.review!.count}개</p><h1 className="h2">{item.name}</h1><p>{item.lead}</p>
      <PriceOptions options={item.options}/><dl className="facts">{item.spec?.map(spec=><div className="fact-row" key={spec.k}><dt>{spec.k}</dt><dd>{spec.v}</dd></div>)}</dl>
      <div className="actions"><LinkButton href={item.storeUrl!} className="btn btn-salmon">스마트스토어 구매 ↗</LinkButton><LinkButton href="kakao">카카오톡 문의 ↗</LinkButton></div><p className="detail-note">{catalog.basisDate} 스토어 기준</p>
    </div></div></Block>
    <Block title="61년 양식장이 송어부터 직접" tone="cream"><Grid cols={4}>{catalog.why.map(card=><Tile key={card.t} title={card.t} text={card.p} image={productPhoto(card.image)} label={card.n}/>)}</Grid></Block>
    <Block title="송어 한 마리가 액젓이 되기까지"><Steps items={catalog.process}/></Block>
    <Recipes chaga={item.slug.startsWith('chaga')}/><Faq title="액젓·송어 FAQ" items={catalog.faq}/>
    <Block title="다른 액젓도 만나보세요" tone="mint"><Grid cols={2}>{onSale.filter(product=>product.slug!==item.slug).map(product=><ProductCard key={product.slug} product={product}/>)}<Tile title="식당·납품"><LinkButton href="/wholesale#form">업소용 대용량 상담 →</LinkButton></Tile></Grid></Block>
  </>;
}
