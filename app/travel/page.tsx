import data from '../../content/travel.json';
import { Anchors, Block, Figure, Grid, LinkButton, PageHero, Tile } from '../detail-ui';
import { Out } from '../sections';

export const metadata = { title:{absolute:data.meta.title},description:data.meta.description };
type Place={id:string;name:string;area:string;km:number;addr?:string;text:string;image?:string|null;zone:string;feature?:boolean;tips?:{t:string;p:string}[]};
type Credit={file:string;title:string;artist:string;license:string;source?:string};
const places:Place[]=data.places;
const credits:Credit[]=data.credits;
const kakao=(name:string)=>'https://map.kakao.com/link/search/'+encodeURIComponent(name);
const trail=(file?:string|null)=>file?'travel/'+file:undefined;
const credit=(file?:string|null)=>{ const row=credits.find(item=>item.file===file); return row ? row.artist+' · '+row.license : undefined; };
const distance=(km:number|string)=>'직선 약 '+km+(typeof km==='number'?' km':'');
const featured=places.find(place=>place.feature)!;
const near=places.filter(place=>['baengnyong','songeogil','rockpark'].includes(place.id));
const famous=places.filter(place=>place.zone==='famous'&&place.id!=='cheonjiae');
const points=[['yukbaek',52,36],['baengnyong',73,66],['market',30,43],['gwangcheon',38,24],['balwang',72,18],['woljeongsa',53,11]] as const;

function Attraction({ place }: { place:Place }) {
  return <Tile title={place.name} text={place.text} image={trail(place.image)} credit={credit(place.image)} label={distance(place.km)}>
    <small>{place.area}</small><div><LinkButton href={kakao(place.name)}>카카오맵 ↗</LinkButton></div>
  </Tile>;
}

export default function Page(){
  return <>
    <PageHero hero={data.hero} image={trail(data.hero.image)}/><Anchors items={data.nav}/>
    <Block id="distance" title="양식장에서 얼마나 걸릴까요?" tone="cream"><div className="detail-split section-actions">
      <div className="distance-radar" aria-label="양식장과 명소의 대략적인 방향"><span>{data.origin.name}</span>{points.map(([id,x,y])=>{const item=places.find(place=>place.id===id)!;return <Out key={id} href={kakao(item.name)}>{/* Direction only, not a geographic map. */}<span style={{left:x+'%',top:y+'%'}}>{item.name}</span></Out>;})}</div>
      <div>{data.distanceRows.map(row=><article key={row.zone}><h3>{row.zone}</h3><ul className="detail-list">
        {row.rows?.map(id=>{const item=places.find(place=>place.id===id);return item&&<li key={id}><Out href={kakao(item.name)}>{item.name}</Out><small>{distance(item.km)}</small></li>;})}
        {row.groups?.map(group=><li key={group.name}>{group.name}<small>{distance(group.km)}</small></li>)}
      </ul></article>)}</div></div><p className="detail-note">{data.distanceNote}</p></Block>
    <Block id="near" title="양식장에서 10km 안의 평창"><div className="detail-split section-actions"><Figure file={trail(featured.image)!} alt={featured.name}/><div className="detail-copy"><span className="tag">{distance(featured.km)}</span><h3>{featured.name}</h3><p>{featured.text}</p><LinkButton href={kakao(featured.name)}>카카오맵 ↗</LinkButton></div></div><Grid cols={4}>{featured.tips?.map(tip=><Tile key={tip.t} title={tip.t} text={tip.p}/>)}</Grid><Grid>{near.map(place=><Attraction key={place.id} place={place}/>)}</Grid></Block>
    <Block id="famous" title="평창에 왔다면 한 번은" tone="mint"><Grid>{famous.map(place=><Attraction key={place.id} place={place}/>)}</Grid></Block>
    <Block id="festival" title="계절마다 평창은 축제 중" lead={data.festivals.note}><Grid>{data.festivals.items.map(item=><Tile key={item.name} title={item.name} text={item.place} image={trail(item.image)} credit={item.credit??credit(item.image)} label={item.month}><p>{item.date2026}</p>{item.url&&<LinkButton href={item.url}>공식 사이트 ↗</LinkButton>}</Tile>)}</Grid><p className="detail-note">{data.festivals.tip}</p></Block>
    <Block id="food" title="평창에서 꼭 맛볼 것" tone="cream"><Grid cols={4}>{data.foods.map(item=><Tile key={item.name} title={item.name} text={item.text} image={item.image === 'aekjeot_two.jpg' ? item.image : trail(item.image)}>{item.link&&<LinkButton href={item.link}>상품 보기 →</LinkButton>}</Tile>)}</Grid></Block>
    <Block id="course" title="원복송어에서 출발하는 3가지 코스"><Grid>{data.courses.map(course=><Tile key={course.title} title={course.title} label={course.label}><ol className="course-stops">{course.stops?.map(stop=><li key={stop.t}><b>{stop.t}</b><p>{stop.s}</p></li>)}</ol>{course.days?.map(day=><div key={day.day}><h4>{day.day}</h4><ol className="course-stops">{day.stops.map(stop=><li key={stop.t}><b>{stop.t}</b><p>{stop.s}</p></li>)}</ol></div>)}{course.link&&<LinkButton href={course.link}>체험 보기 →</LinkButton>}</Tile>)}</Grid><div className="section-actions"><LinkButton href="/experience#group">체험 예약 문의 →</LinkButton></div></Block>
    <Block id="stay" title={data.stay.title} lead={data.stay.text} tone="mint"><Grid cols={4}>{data.tips.map(item=><Tile key={item.t} title={item.t} text={item.p}/>)}</Grid><details className="detail-note"><summary>사진 출처</summary><ul className="detail-list">{credits.map(item=><li key={item.file}>{item.file} · {item.artist} · {item.license} · <Out href={item.source??'https://commons.wikimedia.org/wiki/'+encodeURIComponent(item.title.replaceAll(' ','_'))}>원본 ↗</Out></li>)}</ul></details></Block>
  </>;
}
