import Link from "next/link";
import { ArrowUpRight, Fish, MapPin, Menu } from "lucide-react";
import { company, links, navigation } from "@/data/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="원복송어 홈">
          <span className="wordmark-mark"><Fish aria-hidden="true" /></span>
          <span>원복송어<small>WONBOK TROUT</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <a className="button button-store desktop-store" href={links.store} target="_blank" rel="noreferrer">
          스마트스토어 구매 <ArrowUpRight aria-hidden="true" />
        </a>
        <details className="mobile-menu">
          <summary aria-label="메뉴 열기"><Menu aria-hidden="true" /></summary>
          <nav aria-label="모바일 메뉴">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/contact">오시는 길 · 문의 · FAQ</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow light">FROM PYEONGCHANG</p>
          <h2>평창의 물과 시간을<br />식탁으로 잇습니다.</h2>
        </div>
        <div className="footer-links">
          <Link href="/contact#visit">오시는 길</Link>
          <Link href="/contact#contact">연락처</Link>
          <Link href="/contact#faq">자주 묻는 질문</Link>
          <a href={links.blog} target="_blank" rel="noreferrer">네이버 블로그</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{company.name} · 대표 {company.representative} · {company.businessNumber} · {company.mailOrderNumber}</p>
        <p><MapPin aria-hidden="true" /> {company.address} · {company.phone}</p>
      </div>
    </footer>
  );
}

export function MobileBuyBar() {
  return (
    <div className="mobile-buy-bar">
      <Link href="/trout">송어 구매</Link>
      <Link href="/sauce">액젓 구매</Link>
      <a href={links.store} target="_blank" rel="noreferrer">스토어</a>
    </div>
  );
}
