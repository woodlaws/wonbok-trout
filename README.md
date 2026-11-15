# 원복송어 홈페이지

Next.js App Router로 만든 정적 홈페이지입니다.

## 로컬 실행

```sh
npm ci
npm run build
npm start
```

미리보기 주소는 http://127.0.0.1:3000 입니다. 콘텐츠는 `_handoff/data/site.json`에서 관리합니다. 이 저장소에는 공개용 데이터만 포함됩니다.

Vercel은 `main` 브랜치에서 빌드하며 `out`을 게시합니다. 메타데이터의 기준 URL은 `SITE_URL` 또는 Vercel의 운영 URL을 사용합니다.
