import catalog from '../../content/products.json';
import { Anchors, Block, Chips, Faq, Figure, Grid, LinkButton, PageHero, Tile } from '../detail-ui';
import { onSale, productCatalog, ProductCard, productPhoto, Recipes } from '../product-content';

export const metadata = { title:{absolute:catalog.meta.listTitle}, description:catalog.meta.listDescription };
const showKimjang = catalog.kimjang.showMonths.includes(Number(new Intl.DateTimeFormat('en',{month:'numeric',timeZone:'Asia/Seoul'}).format(new Date())));
const sections = ['catalog','sauce','seasonal','restock','recipes','kimjang','faq'];

export default function Page() {
  return <div className="catalog-page">
    <PageHero hero={catalog.hero} image={productPhoto(catalog.hero.image)}><Chips items={catalog.hero.chips}/></PageHero>
    <Anchors items={catalog.categoryNav.map((label,i)=>({label,id:sections[i]})).filter(item=>item.id!=='kimjang'||showKimjang)}/>
    <Block id="catalog"><div id="sauce"><h2 className="h2">평창무지개송어액젓 2종</h2><Grid cols={2}>{onSale.map(product=><ProductCard key={product.slug} product={product}/>)}</Grid>
      <p className="detail-note">{catalog.basisDate} 기준 · 배송 {catalog.shipping.fee} · {catalog.shipping.freeOver} · {catalog.shipping.islands}</p>
    </div></Block>
    <Block id="seasonal" title="송어회 · 통송어 · 송어탕 · 송어포" lead={catalog.seasonalNote} tone="mint"><div className="availability"><span id="restock"/><Grid cols={4}>{productCatalog.filter(item=>item.status!=='onsale').map(product=><ProductCard key={product.slug} product={product}/>)}</Grid></div></Block>
    <Recipes/>
    {showKimjang && <Block id="kimjang" title={catalog.kimjang.title} tone="cream"><div className="detail-split section-actions"><Figure file={productPhoto(catalog.kimjang.image)} alt={catalog.kimjang.title}/><div className="detail-copy"><p className="eyebrow">{catalog.kimjang.eyebrow}</p><p>{catalog.kimjang.text}</p><Chips items={catalog.kimjang.ratio.map(item=>item.b+' · '+item.s)}/><p className="detail-note">{catalog.kimjang.source}</p></div></div></Block>}
    <Block title="구매처"><Grid cols={4}>{catalog.where.map((item,i)=><Tile key={item.t} title={item.t} text={item.s} label={item.tag}>{i===0&&<LinkButton href="store">스토어에서 보기 ↗</LinkButton>}</Tile>)}</Grid></Block>
    <Faq title="액젓·송어 FAQ" items={catalog.faq}/>
  </div>;
}
