export const links = {
  store: "https://smartstore.naver.com/trout88",
  blog: "https://blog.naver.com/papatrout/",
  legacyShop: "https://k-trout.com/",
  pyeongchangTour: "https://in700.imweb.me/",
  visitKorea:
    "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=02416c27-a8af-4df7-aab0-fe077cdb2dc6",
} as const;

export const navigation = [
  { href: "/trout", label: "송어 구매" },
  { href: "/sauce", label: "송어액젓" },
  { href: "/farm", label: "양식장 이야기" },
  { href: "/experience", label: "평창사랑 체험" },
  { href: "/travel", label: "평창 여행" },
  { href: "/stories", label: "이야기" },
] as const;

export type Product = {
  slug: string;
  name: string;
  category: "송어" | "액젓";
  short: string;
  description: string;
  sizes: string[];
  usage: string[];
  image?: string;
  imagePosition?: string;
  storeUrl: string;
};

// 상품별 스마트스토어 URL을 확인하면 storeUrl만 교체하세요.
export const products: Product[] = [
  {
    slug: "trout-sashimi",
    name: "송어회",
    category: "송어",
    short: "먹기 좋게 손질한 평창 송어",
    description:
      "집에서도 편하게 차려낼 수 있도록 손질한 송어회입니다. 가격·재고·배송일은 스마트스토어의 최신 정보를 확인해 주세요.",
    sizes: ["400g"],
    usage: ["채소와 초장에 곁들여 송어회로", "간장과 고추냉이로 담백하게"],
    image: "/images/concept-trout-table.png",
    imagePosition: "35% center",
    storeUrl: links.store,
  },
  {
    slug: "trout-fillet",
    name: "송어포",
    category: "송어",
    short: "요리에 바로 쓰기 좋은 손질 송어포",
    description:
      "구이·샐러드·덮밥 등 여러 요리에 활용하기 좋은 송어포입니다. 가격·재고·배송일은 스마트스토어에서 확인해 주세요.",
    sizes: ["400g"],
    usage: ["팬에 노릇하게 구워 한 끼로", "샐러드나 덮밥의 단백질로"],
    image: "/images/concept-trout-table.png",
    imagePosition: "82% center",
    storeUrl: links.store,
  },
  {
    slug: "rainbow-trout-fish-sauce",
    name: "무지개송어액젓",
    category: "액젓",
    short: "평창 무지개송어로 만든 액젓",
    description:
      "국물과 무침, 김치 양념에 감칠맛을 더하는 송어액젓입니다. 실제 제품 사진과 최신 옵션은 스마트스토어에서 확인해 주세요.",
    sizes: ["250ml", "500ml"],
    usage: ["국·찌개의 간을 맞출 때", "나물과 겉절이 양념에"],
    storeUrl: links.store,
  },
  {
    slug: "chaga-trout-fish-sauce",
    name: "차가버섯 송어액젓",
    category: "액젓",
    short: "차가버섯을 더한 송어액젓",
    description:
      "차가버섯을 더한 원복송어의 액젓 제품입니다. 원재료 상세와 최신 판매 옵션은 스마트스토어에서 확인해 주세요.",
    sizes: ["250ml", "500ml"],
    usage: ["볶음밥과 볶음 요리의 감칠맛으로", "양념장에 조금씩 더해"],
    storeUrl: links.store,
  },
];

export const company = {
  name: "원복송어",
  representative: "함준식",
  address: "강원특별자치도 평창군 미탄면 송어길 54",
  phone: "033-333-8877",
  email: "papatrout@naver.com",
  businessNumber: "879-63-00304",
  mailOrderNumber: "2020-강원평창-0136",
} as const;
