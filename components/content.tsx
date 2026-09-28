import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Product } from "@/data/site";

export function ConceptImage({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <figure className={`concept-image ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 60vw" priority={priority} />
      <figcaption>연출 시안 이미지 · 실제 양식장/제품 사진으로 교체 예정</figcaption>
    </figure>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className={`product-card ${!product.image ? "product-card-text" : ""}`}>
      {product.image ? (
        <div className="product-card-image">
          <Image src={product.image} alt={product.imageAlt ?? product.name} fill sizes="(max-width: 720px) 100vw, 25vw" style={{ objectPosition: product.imagePosition }} />
          {product.imageIsConcept ? <span className="image-note">연출 시안</span> : null}
        </div>
      ) : (
        <div className="product-symbol" aria-hidden="true"><span>熟</span><i /></div>
      )}
      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.short}</p>
        <p className="product-composition">{product.composition ?? product.sizes.join(" · ")}</p>
        <div className="product-card-actions">
          <Link className="button button-light" href={`/products/${product.slug}`}>자세히 보기 <ArrowRight aria-hidden="true" /></Link>
          <a className="button button-coral" href={product.storeUrl} target="_blank" rel="noreferrer">구매하기 <ExternalLink aria-hidden="true" /></a>
        </div>
      </div>
    </article>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="page-intro shell">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </section>
  );
}

export function StoreCta({ title = "최신 판매 정보는 스마트스토어에서 확인하세요", href = "https://smartstore.naver.com/trout88" }: { title?: string; href?: string }) {
  return (
    <section className="store-cta shell">
      <div><p className="eyebrow light">SHOP ONLINE</p><h2>{title}</h2><p>가격, 재고, 배송 조건은 구매 시점의 스마트스토어 정보가 기준입니다.</p></div>
      <a className="button button-coral" href={href} target="_blank" rel="noreferrer">스마트스토어 열기 <ExternalLink aria-hidden="true" /></a>
    </section>
  );
}
