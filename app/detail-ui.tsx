import type { ReactNode } from 'react';
import { links } from './site';
import { Out, Photo } from './sections';

export function LinkButton({ href, children, className = 'btn btn-line' }: { href: string; children: ReactNode; className?: string }) {
  const url = href === 'store' ? links.store : href === 'kakao' ? links.kakao : href;
  return /^https?:/.test(url) ? <Out href={url} className={className}>{children}</Out> : <a href={url} className={className}>{children}</a>;
}

export function PageHero({ hero, image, children }: { hero: { title: string; eyebrow?: string; lead: string; highlight?: string; caption?: string }; image?: string; children?: ReactNode }) {
  const index = hero.highlight ? hero.title.indexOf(hero.highlight) : -1;
  return <section className={'page-hero' + (image ? ' has-image' : '')}>
    {image && <Photo file={image} alt={hero.caption ?? hero.title} eager/>}
    <div className="wrap">
      {hero.eyebrow && <p className="eyebrow">{hero.eyebrow}</p>}
      <h1>{index < 0 ? hero.title : <>{hero.title.slice(0,index)}<em>{hero.highlight}</em>{hero.title.slice(index + (hero.highlight?.length ?? 0))}</>}</h1>
      <p>{hero.lead}</p>{children}
    </div>
    {hero.caption && <span className="badge-photo">{hero.caption}</span>}
  </section>;
}

export function Anchors({ items }: { items: readonly { id: string; label: string }[] }) {
  return <nav className="detail-nav" aria-label="페이지 메뉴"><div className="wrap">{items.map(item => <a key={item.id} href={'#' + item.id}>{item.label}</a>)}</div></nav>;
}

export function Block({ id, title, lead, tone, children }: { id?: string; title?: string; lead?: string; tone?: 'cream' | 'mint' | 'dark'; children: ReactNode }) {
  return <section id={id} className={'detail-block ' + (tone ?? '')}><div className="wrap">{title && <h2 className="h2">{title}</h2>}{lead && <p className="lead">{lead}</p>}{children}</div></section>;
}

export function Grid({ children, cols = 3 }: { children: ReactNode; cols?: 2|3|4|5|6 }) {
  return <div className={'detail-grid cols-' + cols}>{children}</div>;
}

export function Figure({ file, alt, credit }: { file: string; alt: string; credit?: string }) {
  return <figure className="detail-figure"><Photo file={file} alt={alt}/>{credit && <figcaption>{credit}</figcaption>}</figure>;
}

export function Tile({ title, text, image, label, credit, children }: { title: string; text?: string; image?: string | null; label?: string; credit?: string; children?: ReactNode }) {
  return <article className="detail-card">{image && <Figure file={image} alt={title} credit={credit}/>}<div className="detail-card-body">{label && <span className="tag">{label}</span>}<h3>{title}</h3>{text && <p>{text}</p>}{children}</div></article>;
}

export function Chips({ items }: { items: readonly string[] }) {
  return <div className="detail-chips">{items.map(item => <span className="tag" key={item}>{item}</span>)}</div>;
}

export function Steps({ items }: { items: readonly { t: string; s: string }[] }) {
  return <ol className="detail-steps">{items.map((item,i) => <li key={item.t}><span>{i+1}</span><strong>{item.t}</strong><p>{item.s}</p></li>)}</ol>;
}

export function Faq({ items, title = '자주 묻는 질문' }: { items: readonly { q: string; a: string | null; href?: string }[]; title?: string }) {
  return <Block id="faq" title={title}><div className="faq">{items.filter(item => item.a).map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p>{item.href && <LinkButton href={item.href}>자세히 →</LinkButton>}</details>)}</div></Block>;
}

export function JsonLd({ value }: { value: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g,'\u005c\u003c') }}/>;
}
