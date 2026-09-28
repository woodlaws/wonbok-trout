import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, ProductCard, StoreCta } from "@/components/content";
import { products } from "@/data/site";
export const metadata: Metadata = { title:"송어 구매", description:"원복송어의 송어회와 송어포를 소개합니다." };
export default function TroutPage() {
  const trout = products.filter((product) => product.category === "송어");

  return (
    <main id="main-content">
      <PageIntro
        eyebrow="TROUT SHOP"
        title="먹는 방법에 맞춰 고르는 평창 송어"
        description="바로 차려 먹는 송어회와 여러 요리에 활용하는 송어포의 차이를 확인하고, 원하는 상품의 구매 페이지로 이동하세요."
      />
      <section className="content-section shell" aria-labelledby="trout-products-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="eyebrow">CHOOSE YOUR TROUT</p>
            <h2 id="trout-products-title">어떻게 드실 예정인가요?</h2>
          </div>
          <p className="section-note">두 상품 모두 확인된 판매 중량은 400g입니다.</p>
        </div>
        <div className="product-grid trout-product-grid">
          {trout.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>
      <section className="content-section section-cream" aria-labelledby="trout-compare-title">
        <div className="shell">
          <p className="eyebrow">QUICK GUIDE</p>
          <h2 id="trout-compare-title">송어회와 송어포, 이렇게 고르세요</h2>
          <div className="trout-comparison">
            <article className="comparison-card">
              <span className="comparison-label">바로 먹는 메뉴</span>
              <h3>송어회</h3>
              <p>손질한 송어회를 채소와 초장에 버무리거나, 간장과 고추냉이에 곁들여 드세요.</p>
              <Link className="button button-dark" href="/products/trout-sashimi">송어회 자세히 보기</Link>
            </article>
            <article className="comparison-card">
              <span className="comparison-label">익혀 먹는 요리</span>
              <h3>송어포</h3>
              <p>팬에 구워 한 끼로 차리거나 샐러드와 덮밥에 더해 다양하게 활용하세요.</p>
              <Link className="button button-dark" href="/products/trout-fillet">송어포 자세히 보기</Link>
            </article>
          </div>
          <p className="purchase-caution">보관법, 섭취 안내, 가격, 재고와 배송 조건은 구매 시점의 스마트스토어 정보를 확인해 주세요.</p>
        </div>
      </section>
      <StoreCta title="원하는 송어 상품의 최신 판매 정보를 확인하세요" />
    </main>
  );
}
