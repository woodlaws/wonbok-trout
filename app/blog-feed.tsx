'use client';

import { useState } from 'react';
import type { BlogPost } from '../lib/blog-rss';

const fallback:Record<string,string>={farm:'news/ig-stream.jpg',history:'story/dr-ham-research.jpg',product:'news/ig-sashimi-aekjeot.jpg',psarang:'travel/apple-walk.jpg',event:'news/ig-megashow.jpg',travel:'travel/yukbaek-1.jpg'};

function BlogImage({post}:{post:BlogPost}){
  const substitute='/images/'+(fallback[post.tab??'']??'story/winter-steam-farm.jpg');
  const preferred=post.thumbLocal||post.image;
  return <img src={preferred?'/images/'+preferred:post.thumbRemote??substitute} onError={event=>{if(!event.currentTarget.src.endsWith(substitute)) event.currentTarget.src=substitute;}} alt={post.title} loading="lazy" referrerPolicy="no-referrer"/>;
}

export function BlogCard({post,large=false}:{post:BlogPost;large?:boolean}){
  return <a className={'detail-card blog-card'+(large?' blog-feature':'')} href={post.url} target="_blank" rel="noopener"><BlogImage post={post}/><div className="detail-card-body"><small>{post.category||'원복송어 블로그'} · {post.date}</small><h3>{post.title}</h3>{large&&post.summary&&<p>{post.summary}</p>}</div></a>;
}

export function BlogFeed({posts,extra,tabs}:{posts:BlogPost[];extra:BlogPost[];tabs:{key:string;label:string}[]}){
  const [tab,setTab]=useState('all');
  const feature=posts.find(post=>!post.aiImageSuspect&&(post.thumbLocal||post.thumbRemote));
  const remaining=posts.filter(post=>post!==feature);
  const filtered=tab==='all'?remaining.slice(3,11):[...posts,...extra].filter(post=>post.tab===tab);
  return <>
    <div className="blog-filter" role="group" aria-label="블로그 글 분류">{tabs.map(item=><button type="button" key={item.key} onClick={()=>setTab(item.key)} aria-pressed={tab===item.key}>{item.label}</button>)}</div>
    {tab==='all'&&feature&&<div className="detail-split blog-lead"><BlogCard post={feature} large/><ul className="detail-list">{remaining.slice(0,3).map(post=><li key={post.url}><a href={post.url} target="_blank" rel="noopener">{post.title}<small>{post.date} · {post.category}</small></a></li>)}</ul></div>}
    <div className="detail-grid cols-4">{(tab==='all'&&!feature?posts.slice(0,8):filtered).map(post=><BlogCard key={post.url} post={post}/>)}</div>
    {tab!=='all'&&filtered.length===0&&<p className="detail-note">이 분류의 최신 글이 없습니다.</p>}
  </>;
}
