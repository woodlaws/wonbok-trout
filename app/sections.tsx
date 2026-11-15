import type { ReactNode } from 'react';
import credits from '../_handoff/data/wikimedia_credits.json';
import { address, brand, contact, data, links, navigation, phone, products, visible } from './site';

export function Out({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener" className={className}>{children}</a>;
}

export function Photo({ file, alt, eager = false }: { file: string; alt: string; eager?: boolean }) {
  return <img src={'/images/' + file} alt={alt} loading={eager ? 'eager' : 'lazy'} />;
}

const creditFiles: Record<string, number> = { 'cave.jpg': 4, 'sheep.jpg': 3, 'odaesan.jpg': 10, 'balwang.jpg': 0, 'troutfest.jpg': 7, 'memil.jpg': 14 };
function Credit({ file }: { file: string }) {
  const credit = credits[creditFiles[file]];
  return credit && <span className="credit">{credit.artist} · {credit.license}</span>;
}

const socials = [
  ['스마트스토어', links.store], ['원복송어 블로그', links.blogWonbok], ['평창사랑 블로그', links.blogPyeongchangSarang],
  ['인스타그램', links.instagram], ['스레드', links.threads], ['유튜브', links.youtube], ['카카오채널', links.kakao], ['평창 관광두레', links.tourDure],
];

export function Header() {
  return <>
    <div className="top"><div className="wrap"><span>{contact.farmName} · <b>{contact.closed} 휴무</b> · {contact.amenities}</span>{phone && <a href={'tel:' + phone}>{phone}</a>}</div></div>
    <header className="gnb"><div className="wrap">
      <a className="logo" href="/"><span className="mark"><svg aria-hidden="true" width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 16c4-6 10-8 16-6 3 1 6 3 9 6-3 3-6 5-9 6-6 2-12 0-16-6zM3 16l-1-4m1 4-1 4m9-7c1 2 1 4 0 6"/><circle cx="22" cy="14.5" r="1.2" fill="currentColor"/></svg></span>
      <span><span className="t1">{brand.name}</span><span className="t2">{brand.eyebrow.split(' · ')[1]} · PYEONGCHANG</span></span></a>
      <nav className="menu" aria-label="주 메뉴">{navigation.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
      <Out href={links.store} className="btn btn-salmon desktop-store">스마트스토어 구매 ↗</Out>
      <details className="mobile-menu"><summary className="burger" aria-label="메뉴 열기">☰</summary><nav aria-label="주 메뉴">{navigation.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav></details>
    </div></header>
  </>;
}

export function Footer() {
  return <>
    <footer><div className="wrap grid">
      {data.companies.map(company => <div key={company.name}><b>{company.name}</b><p>대표 {company.ceo}{company.bizNo && <><br/>사업자등록번호 {company.bizNo}</>}{company.mailOrderNo && <><br/>통신판매업 {company.mailOrderNo}</>}{company.note && <><br/>{company.note}</>}<br/>{company.address}{company.phone && <><br/><a href={'tel:' + company.phone}>{company.phone}</a></>}</p></div>)}
      <div><b>바로가기</b><div className="sns">{socials.map(([label, href]) => <Out key={label} href={href}>{label}</Out>)}</div></div>
    </div><p className="wrap footer-credit">사진 일부 Wikimedia Commons</p></footer>
    <nav className="mbar" aria-label="빠른 문의">{phone ? <a href={'tel:' + phone}><span aria-hidden="true">☎</span>전화</a> : <a href="/visit"><span aria-hidden="true">ⓘ</span>방문 안내</a>}<Out href={links.kakao}><span aria-hidden="true">💬</span>카톡</Out><Out className="st" href={links.store}><span aria-hidden="true">🛒</span>스토어</Out><Out href={links.naverMap}><span aria-hidden="true">📍</span>네이버 지도</Out></nav>
  </>;
}

export function Title({ title, label, description, action }: { title: string; label?: string; description?: string; action?: ReactNode }) {
  return <div className="sec-head"><div>{label && <p className="eyebrow">{label}</p>}<h2 className="h2">{title}</h2>{description && <p className="lead">{description}</p>}</div>{action}</div>;
}

export function Subhero({ title, file, text }: { title: string; file: string; text?: string }) {
  return <section className="subhero"><Photo file={file} alt={title} eager/><div className="wrap"><a className="crumb" href="/">{brand.name}</a><h1>{title}</h1>{text && <p>{text}</p>}</div></section>;
}

export function Story({ full = false }: { full?: boolean }) {
  const timeline = data.timeline.filter(visible);
  const entries = full ? timeline : timeline.filter(item => ['1965', '1976', '1990', '2017', '2021'].includes(item.year)).filter((item, index, list) => index === 0 || item.year !== list[index - 1].year);
  return <section><div className="wrap story">
    <div><div className="ph"><Photo file="brothers.jpg" alt="함준식 박사와 함영식 대표"/></div><p className="cap">함준식 박사 · 함영식 대표</p></div>
    <div><p className="eyebrow">원복송어 이야기</p><h2 className="h2">{brand.tagline}</h2><p className="lead">{brand.heroText}</p>
      <ul className="timeline">{entries.map(item => <li key={item.text}><b>{item.year}</b>{item.text}</li>)}</ul>
      {!full && <a className="btn btn-line after-list" href="/story">이야기 전체 보기 →</a>}
    </div>
  </div></section>;
}

export function Buy({ product }: { product: typeof products[number] }) {
  return <Out className="btn btn-salmon" href={product.storeUrl ?? links.kakao}>{product.storeUrl ? '스마트스토어 구매 ↗' : '카카오톡 문의 ↗'}</Out>;
}

export function ProductList({ home = false }: { home?: boolean }) {
  return <section className={home ? 'product-home' : undefined}><div className="wrap">
    <Title title="송어 · 액젓" action={<Out href={links.store} className="btn btn-ink">스마트스토어 전체 상품 ↗</Out>}/>
    <div className="prods">{products.filter(product => !home || product.featured).map((product, index) => <article className="card" key={product.slug}>
      <a className="im" href={'/products/' + product.slug}><Photo file={product.image} alt={product.name}/></a>
      <div className="bd"><span className={'tag ' + (index === 0 ? 's' : 'g')}>{product.tag}</span>
      <h3><a href={'/products/' + product.slug}>{product.name}</a></h3>{product.sizes && <div>{product.sizes.join(' · ')}</div>}
      <p>{product.short}</p><div className="price">{product.priceNote}</div><a className="go" href={'/products/' + product.slug}>상품 자세히 보기 <span>→</span></a><Buy product={product}/></div>
    </article>)}</div>
  </div></section>;
}

export function HowTo() {
  return <section className="howto" id="recipes"><div className="wrap grid"><div>
    <Title label="송어액젓" title="이렇게 드세요"/>
    <div className="tiles">{data.howto.map(item => <div className="tile" key={item.title}><div className="ic" aria-hidden="true">{item.icon}</div><b>{item.title}</b><span>{item.text}</span></div>)}</div>
  </div><div className="pics"><Photo file="cabbage.jpg" alt="평창 고랭지 배추"/><Photo file="sashimi_aek.jpg" alt="송어회와 송어액젓"/></div></div></section>;
}

export function Wholesale() {
  return <section className="b2b"><div className="grid"><div className="im"><Photo file="sorting.jpg" alt="양식장 송어 선별 작업"/></div><div className="tx">
    <p className="eyebrow">식당 · 납품</p><h2 className="h2">{data.wholesale.title}</h2>
    <ul>{data.wholesale.points.map(point => <li key={point}>{point}</li>)}</ul>
    <div className="actions"><a href="/wholesale#inquiry" className="btn btn-salmon">납품 상담 →</a>{phone && <a className="btn btn-ghost" href={'tel:' + phone}>{phone}</a>}</div>
  </div></div></section>;
}

export function Experience({ home = false }: { home?: boolean }) {
  const experience = data.experience;
  return <section id="course"><div className="wrap">
    <Title label="평창사랑 체험" title={experience.slogan} description={experience.intro} action={home ? <a className="btn btn-ink" href="/experience">체험 전체 보기 →</a> : <Out href={links.kakao} className="btn btn-ink">체험 문의 ↗</Out>}/>
    <div className="steps">{experience.steps.map(step => <div className="step" key={step.no}>
      <div className={'im' + (step.image ? '' : ' text-photo')}>{step.image ? <><Photo file={step.image} alt={step.title}/><Credit file={step.image}/></> : <span className="serif">{experience.slogan.split(' ')[0]}</span>}<span className="no">{step.no}</span></div>
      <b>{step.title}</b><span>{step.text}</span>
    </div>)}</div>
    <div className="course">{experience.courses.map(course => <div key={course.title}><b>{course.title}</b><p>{course.text}</p></div>)}</div>
  </div></section>;
}

type Destination = typeof data.travel.near[number];

function DestinationCard({ item, home = false, big = false }: { item: Destination; home?: boolean; big?: boolean }) {
  return <article className={home ? 'tcard' + (big ? ' big' : '') : 'card destination'}>
    <div className={home ? 'destination-photo' : 'im'}>{item.image ? <><Photo file={item.image} alt={item.name}/><Credit file={item.image}/></> : <div className="placeholder">{item.name}</div>}</div>
    <div className={home ? 'in' : 'bd'}><span className="tag">{item.area}</span><h3>{item.name}</h3>{(!home || big) && <p>{item.text}</p>}</div>
  </article>;
}

function Food() {
  return <div className="food"><b>평창 먹거리</b>{data.travel.foods.map(food => <span key={food}>{food}</span>)}</div>;
}

export function Travel({ home = false }: { home?: boolean }) {
  const { near, famous } = data.travel;
  if (home) return <section className="travel"><div className="wrap">
    <Title label="평창 여행" title={near[0].name + ' · ' + near[1].name} action={<a className="btn btn-line" href="/travel">평창 여행 전체 보기 →</a>}/>
    <div className="tgrid"><DestinationCard item={{ ...near[1], name: near[0].name + ' · ' + near[1].name }} home big/>{[famous[0], famous[1], famous[2], famous[4]].map(item => <DestinationCard key={item.name} item={item} home/>)}</div>
    <Food/>
  </div></section>;
  return <>
    {[[near, '양식장에서 가까운 곳', 'near'], [famous, '평창 명소', 'famous']].map(([items, title, id]) => <section id={id as string} className={id === 'famous' ? 'travel' : undefined} key={id as string}><div className="wrap"><Title title={title as string}/><div className="destinations">{(items as Destination[]).map(item => <DestinationCard key={item.name} item={item}/>)}</div></div></section>)}
    <section className="howto" id="food"><div className="wrap"><Title title="평창 먹거리"/><Food/></div></section>
  </>;
}

export function Press() {
  return <div className="press">{data.press.filter(visible).map(item => {
    const content = <><small>{item.media}{item.date && ' · ' + item.date}</small><b>{item.title}</b></>;
    return <div key={item.title}>{item.url ? <Out href={item.url}>{content}</Out> : content}</div>;
  })}</div>;
}

export function News() {
  return <section><div className="wrap">
    <Title label="소식" title="양식장과 평창의 오늘" action={<div className="actions">{socials.slice(2, 5).map(([label, href]) => <Out key={label} href={href} className="btn btn-line">{label}</Out>)}</div>}/>
    <div className="feed">{data.news.map(item => <Out key={item.title} href={item.url} className="post"><div className="im"><Photo file={item.image} alt={item.title}/><span className="src">{item.source}</span></div><div className="bd"><b>{item.title}</b><span>{item.date}</span></div></Out>)}</div>
    <Press/>
  </div></section>;
}

export function Visit() {
  return <section className="visit"><div className="wrap grid">
    <Out href={links.naverMap} className="visit-map"><Photo file="farm.jpg" alt={contact.farmName + ' 전경'}/><span className="visit-map-label">네이버 지도에서 위치 보기 ↗</span></Out>
    <div className="info"><p className="eyebrow">오시는 길</p><h2 className="h2">{contact.farmName}</h2>
      <dl>{address && <><dt>주소</dt><dd>{address}</dd></>}{phone && <><dt>전화</dt><dd><a href={'tel:' + phone}>{phone}</a></dd></>}
        <dt>휴무</dt><dd>{contact.closed}</dd><dt>편의</dt><dd>{contact.amenities}</dd>{visible(contact.direction) && <><dt>가는 길</dt><dd>{contact.direction.text}</dd></>}
      </dl><div className="row"><Out href={links.naverMap} className="btn btn-ink">네이버 지도 길찾기 ↗</Out><Out href={links.kakao} className="btn btn-line">카카오톡 문의 ↗</Out></div>
    </div>
  </div></section>;
}
