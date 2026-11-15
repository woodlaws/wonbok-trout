import { brand, contact, data, links, products } from './site';
import { Experience, HowTo, News, Out, Photo, ProductList, Story, Travel, Visit, Wholesale } from './sections';

export default function Home() {
  const [first, second] = brand.tagline.split(', ');
  const [year, ...rest] = second.split(' ');
  return <>
    <section className="hero"><div className="txt">
      <p className="eyebrow">{brand.eyebrow}</p>
      <h1>{first}<br/>{year}, <em>{rest.join(' ')}</em></h1>
      <p>{brand.heroText}</p>
      <div className="ctas"><Out href={products[0]?.storeUrl ?? links.store} className="btn btn-salmon">송어액젓 구매하기 ↗</Out><a className="btn btn-ghost" href="/travel">평창 여행·체험 보기 →</a></div>
      <div className="proof">{data.proof.map(item => <div key={item.year}><b>{item.year}</b>{item.text}</div>)}</div>
    </div><div className="pic"><Photo file="farm.jpg" alt={contact.farmName + ' 전경'} eager/><div className="inset"><Photo file="sign.jpg" alt={contact.farmName + ' 간판'} eager/><div>{contact.farmName}</div></div></div></section>
    <div className="nums"><div className="wrap">{data.numbers.map(item => <div className="n" key={item.label}><div className="big">{item.big}<small>{item.unit}</small></div><div className="lb">{item.label}</div></div>)}</div></div>
    <Story/><ProductList home/><HowTo/><Wholesale/><Experience home/><Travel home/><News/><Visit/>
  </>;
}
