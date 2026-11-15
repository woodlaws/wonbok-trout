import data from '../../content/news.json';
import { BlogCard, BlogFeed } from '../blog-feed';
import { Block, Grid, LinkButton, PageHero, Tile } from '../detail-ui';
import { Out } from '../sections';
import { getBlogPosts } from '../../lib/blog-rss';

export const metadata={title:{absolute:data.meta.title},description:data.meta.description};

export default async function Page(){
  const [blog,psarang]=await Promise.all([getBlogPosts('papatrout'),getBlogPosts('durepcsarang')]);
  const {hero,channels,notices,broadcast,press,instagram,threads}=data;
  return <>
    <PageHero hero={hero}><div className="actions">{channels.map(channel=><LinkButton key={channel.key} href={channel.url} className="btn btn-ghost">{channel.label} ↗</LinkButton>)}</div><div className="news-stats">{hero.stats.map(stat=><div key={stat.label}><strong>{stat.big}</strong><small>{stat.label} · {stat.asOf} 기준</small></div>)}</div></PageHero>
    <div className="notice-strip"><div className="wrap">{notices.map(notice=><span key={notice.text}>{notice.icon} {notice.text}{notice.href&&<> · <Out href={notice.href==='store'?'https://smartstore.naver.com/durepcsarang':notice.href}>{notice.sub??'바로가기'} ↗</Out></>}</span>)}</div></div>
    <Block title="평창사랑 일기"><BlogFeed posts={blog.posts} extra={data.curatedExtra} tabs={data.tabs}/><p className="detail-note">{blog.source==='rss'?'홈페이지가 배포될 때 블로그 최신 글을 갱신합니다.':'블로그에서 최신 글을 확인하실 수 있습니다.'}</p><div className="section-actions"><LinkButton href={channels[0].url}>블로그에서 전체 보기 ↗</LinkButton></div></Block>
    <Block title="TV와 신문이 찾아온 원복송어" tone="dark"><Grid>{broadcast.map(item=><Tile key={item.title} title={item.title} image={item.image} label={item.ch} text={item.date}>{item.url&&<LinkButton href={item.url} className="btn btn-ink">방송 보기 ↗</LinkButton>}</Tile>)}</Grid><ul className="detail-list">{press.map(item=><li key={item.title}>{item.url?<Out href={item.url}>{item.title} ↗</Out>:item.title}<small>{item.media} · {item.date}</small></li>)}</ul></Block>
    <Block title="인스타그램 · 스레드에서 매일 만나요" tone="mint"><Grid cols={3}>{instagram.posts.map(item=><Tile key={item.url} title={item.caption} image={item.image}><LinkButton href={item.url}>게시물 보기 ↗</LinkButton></Tile>)}</Grid><Grid>{threads.posts.map(item=><Tile key={item.text} title={item.date} text={item.text}/>)}</Grid><div className="actions section-actions">{channels.filter(item=>item.key==='instagram'||item.key==='threads').map(item=><LinkButton key={item.key} href={item.url}>{item.label} 팔로우 ↗</LinkButton>)}</div></Block>
    <Block title="관광두레 평창사랑 블로그">{psarang.posts[0]?.date<'2024-01-01'&&<span className="tag">지난 소식</span>}<Grid cols={4}>{psarang.posts.map(post=><BlogCard key={post.url} post={post}/>)}</Grid></Block>
  </>;
}
