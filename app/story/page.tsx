import story from '../../content/story.json';
import { Anchors, Block, Chips, Figure, Grid, JsonLd, LinkButton, PageHero, Tile } from '../detail-ui';
import { Out } from '../sections';

export const metadata = { title: { absolute: story.meta.title }, description: story.meta.description };

function image(file: string) {
  return file === 'stream.jpg' ? file : 'story/' + file;
}

function Chapter({ chapter }: { chapter: typeof story.chapters[number] }) {
  const picture = chapter.image;
  return <Block id={chapter.id}><div className={picture ? 'detail-split' + (chapter.reverse ? ' reverse' : '') : 'detail-copy'}>
    {picture && <Figure file={image(picture)} alt={chapter.title} credit={chapter.caption}/>}
    <div className="detail-copy"><p className="eyebrow">{chapter.no} · {chapter.eyebrow}</p><h2 className="h2">{chapter.title}</h2>
      {chapter.body.map(text => <p key={text}>{text}</p>)}{chapter.chips && <Chips items={chapter.chips}/>}
      {chapter.cta && <LinkButton href={chapter.cta.href}>{chapter.cta.label}</LinkButton>}
    </div>
  </div></Block>;
}

export default function Page() {
  const { hero, facts, quote, water, brothers, cycle, history, community, ending } = story;
  return <>
    <JsonLd value={{ '@context': 'https://schema.org', '@type': 'Organization', name: '원복송어양식장', founder: { '@type': 'Person', name: '함준식' } }}/>
    <PageHero hero={hero} image={image(hero.image)}/><Anchors items={story.nav}/>
    <div className="wrap"><Grid cols={5}>{facts.map(fact => <Tile key={fact.label} title={fact.big + fact.unit} text={fact.label}/>)}</Grid></div>
    <Chapter chapter={story.chapters[0]}/>
    <Block tone="dark"><blockquote className="detail-quote">{quote.text}<cite>{quote.cite}</cite></blockquote></Block>
    <Chapter chapter={story.chapters[1]}/>
    <Block id="water" title={water.title} lead={water.lead} tone="mint"><div className="detail-split"><Figure file={image(water.image)} alt={water.title}/><Grid cols={2}>{water.points.map(point => <Tile key={point.text} title={point.big} text={point.text}/>)}</Grid></div><p className="detail-note">{water.footnote}</p></Block>
    <Block id="brothers" title={brothers.title} lead={brothers.lead}><Grid>{brothers.people.map(person => <Tile key={person.name} title={person.name} label={person.role} text={person.sub} image={person.image && image(person.image)}><ul>{person.items.map(item => <li key={item}>{item}</li>)}</ul>{person.say && <p>{person.say}</p>}</Tile>)}</Grid></Block>
    <Block id="cycle" title={cycle.title} lead={cycle.lead} tone="cream"><Grid cols={4}>{cycle.steps.map(step => <Tile key={step.title} title={step.title} label={step.month} text={step.text} image={image(step.image)}/>)}</Grid></Block>
    <Chapter chapter={story.chapters[2]}/>
    <Block id="history" title="한 장으로 보는 원복송어 61년" tone="mint">
      <div className="history-eras">{history.map(era => <article key={era.era}><h3>{era.era}</h3><ol className="detail-list">{era.items.map(item => <li key={item.y+item.t} className={item.key ? 'history-key' : undefined}><b>{item.y} {'d' in item && item.d}　</b>{item.t}{item.s && <small>{item.s}</small>}</li>)}</ol></article>)}</div>
    </Block>
    <Block id="community" title={community.title}><Grid cols={4}>{community.cards.map(card=><Tile key={card.t} title={card.t} text={card.p} label={card.y}/>)}</Grid><Grid cols={2}>{community.photos.map(card=><Tile key={card.t} title={card.t} text={card.p} label={card.small} image={image(card.image)}/>)}</Grid></Block>
    <Block id="press" title="세상이 기록한 원복송어" tone="cream"><Grid>{(story.press as {title:string;media:string;date?:string;url?:string|null;tv?:boolean}[]).map(item=><Tile key={item.title} title={item.title} label={(item.tv ? 'TV · ' : '') + item.media} text={item.date}>{item.url && <Out href={item.url} className="btn btn-line">보도 보기 ↗</Out>}</Tile>)}</Grid></Block>
    <Block tone="dark" title={ending.title} lead={ending.text}><div className="actions section-actions">{ending.buttons.map((button,i)=><LinkButton key={button.href} href={button.href} className={i===0 ? 'btn btn-salmon' : 'btn btn-line'}>{button.label}</LinkButton>)}</div></Block>
  </>;
}
