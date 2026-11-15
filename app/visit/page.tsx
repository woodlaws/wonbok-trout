import data from '../../content/visit.json';
import { Block, Faq, Figure, Grid, JsonLd, LinkButton, PageHero, Tile } from '../detail-ui';
import { CopyAddress, InquiryForm } from '../detail-client';
import { KakaoMap } from '../kakao-map';
import { Out, Photo } from '../sections';
import { links } from '../site';

export const metadata={title:{absolute:data.meta.title},description:data.meta.description};
const {place,quick,restaurant}=data;
const channels:Record<string,string>={kakao:links.kakao,store:links.store,kakaoDirections:place.kakaoTo};
const fields=data.form.fields.slice(0,-1).map((label,i)=>({name:'field'+i,label:label.split('(')[0],required:i<3||i===5,type:[undefined,'tel','radio','date','number','textarea'][i],options:i===2?label.split('(')[1].replace(/\)$/,'').split('/'):undefined}));

export default function Page(){
  const appKey=process.env.KAKAO_MAP_JAVASCRIPT_KEY?.trim()||process.env.KAKAO_MAP_JS_KEY?.trim();
  const fallback=<Out href={place.kakaoPlace} className="visit-map"><Photo file="visit/drone-farm.jpg" alt={place.name+' 전경'}/><span className="visit-map-label">카카오맵에서 위치 보기 ↗</span></Out>;
  return <div className="visit-page">
    <JsonLd value={{'@context':'https://schema.org','@type':'LocalBusiness',name:place.name,description:place.closed+' 휴무',address:{'@type':'PostalAddress',streetAddress:place.address,postalCode:place.zip,addressCountry:'KR'},geo:{'@type':'GeoCoordinates',latitude:place.lat,longitude:place.lng}}}/>
    <PageHero hero={data.hero} image={data.hero.image}/>
    <div className="wrap detail-stats"><Grid cols={4}>{quick.filter(item=>channels[item.value]).map(item=><Tile key={item.value} title={item.icon}><LinkButton href={channels[item.value]}>{item.label} ↗</LinkButton></Tile>)}</Grid></div>
    <Block tone="cream"><div className="detail-split visit-detail-map">
      {appKey?<KakaoMap appKey={appKey} latitude={place.lat} longitude={place.lng} name={place.name}>{fallback}</KakaoMap>:fallback}
      <article className="info"><h2 className="h2">{place.name}</h2><dl><dt>주소</dt><dd>{place.address}<small> ({place.jibun}, {place.zip})</small></dd><dt>휴무</dt><dd>{place.closed}</dd><dt>편의</dt><dd>{place.amenities}</dd><dt>해발</dt><dd>{place.elevation}</dd></dl><div className="actions"><LinkButton href={place.kakaoTo} className="btn btn-ink">카카오맵 길찾기 ↗</LinkButton><LinkButton href={place.naverPlace}>네이버 지도 ↗</LinkButton><CopyAddress address={place.address}/></div></article>
    </div></Block>
    <Block title="양식장에서 얼마나 떨어져 있나요?"><Grid cols={6}>{data.distances.items.map(item=><Tile key={item.name} title={item.km+' km'} text={item.name} label={item.sub}/>)}</Grid><p className="detail-note">{data.distances.note}</p></Block>
    <Block title="자가용 · 대중교통" tone="mint"><Grid cols={2}><Tile title="자가용"><ul className="detail-list">{data.drive.routes.map(item=><li key={item.from}><strong>{item.from}</strong><p>{item.text}</p></li>)}</ul></Tile><Tile title="대중교통"><ul className="detail-list">{data.transit.steps.map(item=><li key={item.from}><strong>{item.from}</strong><p>{item.text}</p>{item.sub&&<small>{item.sub}</small>}</li>)}</ul><p className="detail-note">버스 시간은 바뀔 수 있습니다. 출발 전 <Out href="https://www.pyeongchang-pti.kr">평창군 대중교통정보 ↗</Out> 또는 <a href="tel:033-332-2407">평창터미널 033-332-2407</a>에서 확인해 주세요.</p></Tile></Grid></Block>
    <Block tone="dark"><div className="detail-split"><Figure file={restaurant.image} alt={restaurant.name}/><div className="detail-copy"><p className="eyebrow">{restaurant.label}</p><h2 className="h2">{restaurant.name}</h2><p>{restaurant.text}</p><div className="actions"><LinkButton href={'tel:'+restaurant.phone}>{restaurant.phone}</LinkButton><LinkButton href={restaurant.kakaoUrl}>카카오맵 ↗</LinkButton></div></div></div></Block>
    <Block title="이것만 알고 오세요"><Grid cols={4}>{data.tips.map(item=><Tile key={item.title} title={item.title} text={item.text} label={item.icon}/>)}</Grid></Block>
    <Block title="편한 방법으로 연락 주세요" tone="cream"><Grid>{data.contacts.map(item=><Tile key={item.label} title={item.label} text={item.note}>{item.url?<LinkButton href={item.url}>{item.value} ↗</LinkButton>:<p>{item.value}</p>}</Tile>)}<Tile title="카카오톡 문의"><LinkButton href="kakao">카카오채널 ↗</LinkButton></Tile></Grid></Block>
    <Faq title="FAQ" items={data.faq}/>
    <Block id="inquiry" title={data.form.title} tone="mint"><div className="visit-inquiry section-actions"><InquiryForm fields={fields} consent={data.form.fields.at(-1)} label="보내기" kakao={links.kakao} openChat/></div></Block>
  </div>;
}
