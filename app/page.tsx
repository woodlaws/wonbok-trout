import { getBlogPosts } from '../lib/blog-rss';
import { BlogCard } from './blog-feed';
import { Block, Grid, LinkButton } from './detail-ui';
import { brand, contact, data, links, products, visible } from './site';
import { Experience, HowTo, Out, Photo, ProductList, Story, Travel, Visit, Wholesale } from './sections';

export default async function Home() {
  const blog = await getBlogPosts('papatrout');
  return <>
    <section className="hero"><div className="txt">
      <p className="eyebrow">{brand.eyebrow}</p>
      <h1><span>{brand.heroLine1}</span><span>{brand.heroLine2} <em>{brand.heroEm}</em></span></h1>
      <p>{brand.heroText}</p>
      <div className="ctas"><Out href={products[0]?.storeUrl ?? links.store} className="btn btn-salmon">송어액젓 구매하기 ↗</Out><a className="btn btn-ghost" href="/story">61년 이야기 보기 →</a></div>
      <div className="proof">{data.proof.map(item => <div key={item.year}><b>{item.year}</b>{item.text}</div>)}</div>
    </div><div className="pic"><Photo file="story/winter-steam-farm.jpg" alt={contact.farmName + ' 전경'} eager/><div className="inset"><Photo file="sign.jpg" alt={contact.farmName + ' 간판'} eager/><div>{contact.farmName}</div></div><span className="badge-photo">{data.home.heroCaption}</span></div></section>
    <div className="nums"><div className="wrap">{data.numbers.map(item => <div className="n" key={item.label}><div className="big">{item.big}<small>{item.unit}</small></div><div className="lb">{item.label}</div></div>)}</div></div>
    <div className="home-media"><div className="wrap"><b>{data.home.mediaLabel}</b><ul>{data.home.media.filter(visible).map(item => <li key={item.name} className={item.broadcast ? 'tag s' : 'tag'}>{item.name}</li>)}</ul><a href="/story#press">전체 보기 →</a></div></div>
    <Story/><ProductList home/><HowTo/><Wholesale home/><Experience home/><Travel home/><Block title="양식장과 평창의 오늘"><Grid cols={4}>{blog.posts.slice(0,4).map(post=><BlogCard key={post.url} post={post}/>)}</Grid><div className="section-actions"><LinkButton href="/news">소식 전체 보기 →</LinkButton></div></Block><Visit home/>
  </>;
}
