# 원복송어 홈페이지 — GitHub / Vercel 배포 패키지

Next.js 16 · TypeScript 기반 정적 다페이지 홈페이지입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

프로덕션 빌드:

```bash
npm run build
```

## GitHub에 올리기

1. GitHub에서 새 저장소를 만듭니다.
2. 이 폴더의 **내용 전체**를 저장소 최상위에 올립니다.
3. 기본 브랜치는 `main`으로 둡니다.
4. 포함된 GitHub Actions가 push와 pull request마다 빌드를 확인합니다.

## Vercel 배포

1. Vercel에서 **Add New → Project**를 선택합니다.
2. 위 GitHub 저장소를 Import합니다.
3. Framework Preset이 `Next.js`인지 확인합니다.
4. 별도 변경 없이 Deploy를 누릅니다.

Vercel 프로젝트의 운영 주소는 빌드 시 자동으로 메타데이터·사이트맵·robots.txt에 반영됩니다. 자체 도메인을 연결한 경우 환경 변수 `NEXT_PUBLIC_SITE_URL`에 `https://`를 포함한 실제 주소를 등록하세요.

## 배포 전 확인 항목

- `data/site.ts`의 상품별 `storeUrl`을 실제 상세 주소로 교체
- `public/images/`의 연출 시안 3종을 실제 촬영본으로 교체
- 액젓 2종의 실제 병·라벨 사진 추가
- 최신 체험 운영 일정 확인

가격·재고·배송 조건은 홈페이지에 고정하지 않고 스마트스토어에서 확인하도록 구성되어 있습니다.
