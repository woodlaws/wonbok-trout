import { notFound } from 'next/navigation';
import { Buy, HowTo, Out, Photo } from '../../sections';
import { data, links, products, visible } from '../../site';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

async function findProduct(params: Props['params']) {
  const { slug } = await params;
  return products.find(item => item.slug === slug) ?? notFound();
}

export async function generateMetadata({ params }: Props) {
  const product = await findProduct(params);
  return { title: product.name, description: product.short, openGraph: { title: product.name, description: product.short, images: ['/images/farm.jpg'] } };
}

export default async function Page({ params }: Props) {
  const product = await findProduct(params);
  const milestones = data.timeline.filter(visible).filter(item => ['2017', '2021', '2022'].includes(item.year));
  return <>
    <nav className="tabs"><div className="wrap tab-links">{products.map(item => <a key={item.slug} href={'/products/' + item.slug} className={item.slug === product.slug ? 'on' : undefined} aria-current={item.slug === product.slug ? 'page' : undefined}>{item.name}</a>)}<a href="#recipes">액젓 레시피</a></div></nav>
    <section className="detail"><div className="wrap pd">
      <div className="gal"><div className="main"><Photo file={product.image} alt={product.name} eager/></div><div className="thumbs">{products.filter(item => item.sizes).map(item => <a key={item.slug} href={'/products/' + item.slug} aria-current={item.slug === product.slug ? 'page' : undefined}><Photo file={item.image} alt={item.name}/></a>)}</div></div>
      <div className="pinfo"><span className="tag s">{product.tag}</span><h1>{product.name}</h1><p className="lead">{product.short}</p>
        {product.sizes && <ul className="opt" aria-label="용량">{[...product.sizes].reverse().map(size => <li key={size}>{size}</li>)}</ul>}
        <dl className="facts">{product.ingredients && <><dt>원재료</dt><dd>{product.ingredients}</dd></>}{product.shelfLife && <><dt>소비기한</dt><dd>{product.shelfLife}</dd></>}<dt>가격</dt><dd>{product.priceNote}</dd></dl>
        <div className="actions buy"><Buy product={product}/>{product.storeUrl && <Out className="btn btn-line" href={links.kakao}>카카오톡 문의 ↗</Out>}</div>
      </div>
    </div></section>
    <section className="howto"><div className="wrap"><h2 className="h2">원복송어 이야기</h2><div className="points">{milestones.map((item, index) => <article className="card" key={item.year}><div className="im"><Photo file={['farm.jpg', 'products2022.jpg', 'brothers.jpg'][index]} alt={['원복송어양식장 전경', '송어 가공식품', '함준식 박사와 함영식 대표'][index]}/></div><div className="bd"><span className="eyebrow">{item.year}</span><p>{item.text}</p></div></article>)}</div></div></section>
    <HowTo/>
  </>;
}
