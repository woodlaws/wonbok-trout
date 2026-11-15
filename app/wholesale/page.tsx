import data from '../../content/wholesale.json';
import { Block, Faq, Grid, LinkButton, PageHero, Steps, Tile } from '../detail-ui';
import { InquiryForm } from '../detail-client';
import { links } from '../site';

export const metadata = { title: { absolute: data.meta.title }, description: data.meta.description };

export default function Page() {
  return <>
    <PageHero hero={data.hero} image={data.hero.image}><div className="actions"><LinkButton href="#form" className="btn btn-salmon">납품 상담 신청 →</LinkButton></div></PageHero>
    <div className="wrap detail-stats"><Grid cols={4}>{data.trust.map(item=><Tile key={item.s} title={item.b+item.u} text={item.s}/>)}</Grid></div>
    <Block title="살이 단단한 송어는 물에서 결정됩니다"><Grid>{data.why.map(item=><Tile key={item.t} title={item.t} text={item.p} image={item.image === 'delivery-unload.jpg' ? 'wholesale/' + item.image : item.image} label={item.n}/>)}</Grid></Block>
    <Block title="이런 것을 공급합니다" tone="cream"><Grid cols={4}>{data.items.map(item=><Tile key={item.t} title={item.t} text={item.p} label={item.icon}><ul>{item.list.map(point=><li key={point}>{point}</li>)}</ul></Tile>)}</Grid><p className="detail-note">{data.itemsNote}</p></Block>
    <Block title="상담부터 정기 공급까지"><Steps items={data.flow}/></Block>
    <Block title="전국 송어 식당과 함께합니다" tone="mint"><p className="lead">전국 송어 식당·횟집에 공급하고 있습니다.</p></Block>
    <Block id="form" title={data.form.title} lead={data.form.lead} tone="cream"><div className="detail-split section-actions">
      <div className="detail-copy">{data.form.side.map(item=><Tile key={item.t} title={item.t} text={item.s}/>)}<LinkButton href="kakao">카카오톡 상담 ↗</LinkButton></div>
      <InquiryForm fields={data.form.fields} consent={data.form.consent} label={data.form.submitLabel} kakao={links.kakao}/>
    </div></Block>
    <Faq title="납품 FAQ" items={data.faq}/>
  </>;
}
