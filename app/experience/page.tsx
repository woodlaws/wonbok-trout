import data from '../../content/experience.json';
import { Anchors, Block, Chips, Faq, Figure, Grid, LinkButton, PageHero, Tile } from '../detail-ui';
import { InquiryForm } from '../detail-client';
import { links } from '../site';

export const metadata = { title: { absolute: data.meta.title }, description: data.meta.description };
const photo = (file: string) => 'experience/' + file;
const contactMessage = '가격·일정은 문의해 주세요';
const fields = data.group.form.fields.map((label,i)=>({ name: 'field'+i, label: label.split('(')[0], required: i<2, type: [undefined,undefined,'date','number','radio','textarea'][i], options:i===4 ? label.split('(')[1].replace(/\)$/,'').split('/') : undefined }));

export default function Page() {
  const { hero, about, route, box, group } = data;
  return <div className="experience-page">
    <PageHero hero={hero} image={photo(hero.image)}><div className="actions">{hero.buttons.map((button,i)=><LinkButton key={button.href} href={button.href} className={i===0?'btn btn-salmon':'btn btn-ghost'}>{button.label}</LinkButton>)}</div></PageHero>
    <Anchors items={data.nav}/>
    <Block title="세 글자로 보는 평창사랑 체험"><Grid>{data.shikhyugyeong.map(item=><Tile key={item.han} title={item.title} text={item.text} label={item.han} image={photo(item.image)}/>)}</Grid></Block>
    <Block id="about" tone="cream"><div className="detail-split"><Figure file={photo(about.image)} alt={about.title}/><div className="detail-copy"><h2 className="h2">{about.title}</h2><p>{about.text}</p><Grid cols={2}>{about.members.map(member=><Tile key={member.name} title={member.name} text={member.text}/>)}</Grid></div></div></Block>
    <Block id="route" title={route.title} lead={route.lead}><ol className="route-detail">{route.steps.map(step=><li className="detail-split" key={step.no}><div className="detail-copy"><span className="route-number">{step.no}</span><p className="eyebrow">{step.where}</p><h3>{step.title}</h3><p>{step.text}</p><Chips items={step.tags}/></div><Figure file={photo(step.image)} alt={step.title} credit={step.credit}/></li>)}</ol><p className="detail-note">{contactMessage}</p></Block>
    <Block id="courses" title="일정에 맞게 고르세요" tone="mint"><Grid>{data.courses.map(course=><Tile key={course.title} title={course.title} text={course.sub} label={course.label}><ul>{course.items.map(item=><li key={item}>{item}</li>)}</ul><p>{contactMessage}</p><LinkButton href="#group" className={'btn ' + (course.hot ? 'btn-salmon' : 'btn-line')}>예약 문의 →</LinkButton></Tile>)}</Grid></Block>
    <Block title="손님들과 함께한 평창의 하루"><div className="experience-gallery">{data.gallery.map(item=><div key={item.image} className={item.size}><Figure file={photo(item.image)} alt={item.caption} credit={item.caption}/></div>)}</div></Block>
    <Block id="season" title="언제 오셔도 할 게 있습니다"><Grid cols={4}>{data.seasons.items.map(season=><article className="detail-card season-card" key={season.name} style={{borderTopColor:season.color}}><div className="detail-card-body"><h3>{season.name}</h3><ul>{season.items.map(item=><li key={item}>{item}</li>)}</ul></div></article>)}</Grid></Block>
    <Block id="box" title={box.title} lead={box.text} tone="cream"><Grid cols={4}>{box.images.map(file=><Figure file={photo(file)} alt={box.title} key={file}/>)}</Grid><div className="actions section-actions">{box.buttons.map(button=><LinkButton key={button.href} href={button.href}>{button.label}</LinkButton>)}</div></Block>
    <Block id="group" title={group.title} lead={group.lead} tone="dark"><div className="detail-split section-actions"><ul className="detail-list">{group.cases.map(item=><li key={item.date}><strong>{item.who}</strong><small>{item.date}</small>{item.what}</li>)}</ul><div><h3>{group.form.title}</h3><InquiryForm fields={fields} consent={group.form.agree} label="카카오톡 예약 문의" kakao={links.kakao} openChat/></div></div></Block>
    <Faq title="체험 전에 궁금한 것" items={data.faq}/>
    <Block title="연락처" tone="cream"><Grid>{data.contacts.items.map(item=><Tile key={item.label} title={item.label} text={item.address}><LinkButton href={'tel:'+item.phone}>{item.phone}</LinkButton></Tile>)}<Tile title="체험 문의"><LinkButton href="kakao">카카오톡 문의 ↗</LinkButton></Tile></Grid></Block>
  </div>;
}
