import { cache } from 'react';
import data from '../content/news.json';

export type BlogPost = {title:string;url:string;date:string;category?:string;tab?:string;summary?:string;thumbLocal?:string|null;thumbRemote?:string|null;image?:string;aiImageSuspect?:boolean};
const categories:Record<string,string>=data.categoryMap;
const fallback:Record<string,BlogPost[]>={papatrout:data.fallbackPosts,durepcsarang:data.psarang.fallbackPosts};

function decode(text:string){
  const entities:Record<string,string>={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '};
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi,(entity,key:string)=>{
    if(!key.startsWith('#')) return entities[key]??entity;
    const point=key[1].toLowerCase()==='x'?Number.parseInt(key.slice(2),16):Number.parseInt(key.slice(1),10);
    return point<=0x10ffff?String.fromCodePoint(point):entity;
  });
}

function field(entry:string,name:string){
  const value=entry.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+name+'>','i'))?.[1]?.trim()??'';
  return value.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/)?.[1]??decode(value);
}

function thumbnail(description:string){
  const source=description.match(/<img\s[^>]*?src\s*=\s*["']([^"']+)["']/i)?.[1];
  if(!source) return undefined;
  try{
    const url=new URL(decode(source));
    if(url.protocol!=='https:'||!url.hostname.endsWith('.pstatic.net')) return undefined;
    if(url.searchParams.get('type')==='s3') url.searchParams.set('type','w2');
    return url.href;
  }catch{return undefined;}
}

function parse(xml:string,account:string){
  const posts:BlogPost[]=[];
  for(const [,entry] of xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)){
    const title=decode(field(entry,'title'));
    const url=field(entry,'guid')||field(entry,'link').split('?')[0];
    const time=new Date(field(entry,'pubDate'));
    if(!title||!url.startsWith('https://blog.naver.com/'+account+'/')||Number.isNaN(time.getTime())) continue;
    const category=field(entry,'category');
    const description=field(entry,'description');
    const summary=decode(description.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim().slice(0,160);
    const date=new Intl.DateTimeFormat('sv-SE',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Seoul'}).format(time);
    const editorial=fallback[account]?.find(item=>item.url===url);
    posts.push({title,url,date,category,tab:categories[category]??'etc',summary,thumbRemote:thumbnail(description),aiImageSuspect:editorial?.aiImageSuspect||/AI\s*(이미지|생성)|ChatGPT|미드저니/i.test(description)});
  }
  return posts.sort((a,b)=>b.date.localeCompare(a.date));
}

export const getBlogPosts=cache(async(account:'papatrout'|'durepcsarang')=>{
  try{
    const channel=data.channels.find(item=>item.rss?.endsWith('/'+account+'.xml'));
    if(!channel?.rss) throw new Error('RSS URL missing');
    const response=await fetch(channel.rss,{signal:AbortSignal.timeout(8000)});
    if(!response.ok) throw new Error('HTTP '+response.status);
    const posts=parse(await response.text(),account);
    if(!posts.length) throw new Error('RSS has no usable posts');
    console.info('[blog-rss] '+account+': '+posts.length+' items');
    return {posts:posts.slice(0,account==='papatrout'?24:4),source:'rss' as const};
  }catch(error){
    console.info('[blog-rss] '+account+': fallback ('+(error instanceof Error?error.message:'unknown error')+')');
    return {posts:fallback[account].slice(0,account==='papatrout'?24:4),source:'fallback' as const};
  }
});
