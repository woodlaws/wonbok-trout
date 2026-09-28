import type { Metadata } from "next";
import { PageIntro } from "@/components/content";
import { links } from "@/data/site";
export const metadata: Metadata = { title:"이야기", description:"양식, 송어 요리, 평창을 주제로 한 원복송어 콘텐츠입니다." };
const stories=[["양식","차가운 물과 송어를 돌보는 일","양식장의 기록과 생산자의 생각을 만납니다."],["요리","송어회와 송어포를 즐기는 방법","집에서 차리기 좋은 송어 요리를 소개합니다."],["평창","농장과 여행이 이어지는 계절","평창사랑 체험과 주변의 계절 소식을 전합니다."]];
export default function StoriesPage(){return <main id="main-content"><PageIntro eyebrow="JOURNAL" title="물, 식탁, 계절의 기록" description="기존 네이버 블로그의 콘텐츠 자산으로 연결하고, 앞으로 홈페이지 자체 글을 더할 수 있는 목록 구조입니다."/><section className="content-section shell"><div className="story-grid">{stories.map(([category,title,description])=><article className="story-card" key={title}><div><p className="eyebrow">{category}</p><h3>{title}</h3><p>{description}</p></div><a className="text-link" href={links.blog} target="_blank" rel="noreferrer">네이버 블로그에서 보기</a></article>)}</div></section></main>}
