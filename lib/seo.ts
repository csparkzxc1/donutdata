import type { Metadata } from 'next';

const SITE_NAME = '폐기물 정보';
const BASE_URL = 'https://waste.donutdata.kr';

interface SeoParams {
  page: 'home' | 'sigungu' | 'item' | 'app' | 'guide';
  sigungu?: string;
  itemName?: string;
  fee?: number;
  department?: string;
}

export function generateMeta(params: SeoParams): Metadata {
  switch (params.page) {
    case 'home':
      return {
        title: `${SITE_NAME} — 전국 대형폐기물·종량제봉투 수수료 모음`,
        description: '전국 226개 시·군·구의 폐기물 데이터를 한곳에. 공공데이터 기반 매월 갱신.',
        openGraph: {
          title: `${SITE_NAME} — 전국 대형폐기물·종량제봉투 수수료 모음`,
          description: '전국 226개 시·군·구의 폐기물 데이터를 한곳에. 공공데이터 기반 매월 갱신.',
          url: BASE_URL,
          siteName: SITE_NAME,
          locale: 'ko_KR',
          type: 'website',
        },
      };
    case 'sigungu':
      return {
        title: `${params.sigungu} 대형폐기물 수수료 (2026 최신) — ${SITE_NAME}`,
        description: `${params.sigungu} 대형폐기물 신고 방법과 품목별 수수료. ${params.department ?? ''}.`,
        openGraph: {
          title: `${params.sigungu} 대형폐기물 수수료 (2026 최신)`,
          description: `${params.sigungu} 대형폐기물 신고 방법과 품목별 수수료.`,
          url: `${BASE_URL}/large/`,
          siteName: SITE_NAME,
          locale: 'ko_KR',
          type: 'website',
        },
      };
    case 'item':
      return {
        title: `${params.sigungu} ${params.itemName} 수수료 ${params.fee?.toLocaleString('ko-KR')}원 + 신고 방법 | ${SITE_NAME}`,
        description: `${params.sigungu}에서 ${params.itemName} 버릴 때 수수료 ${params.fee?.toLocaleString('ko-KR')}원. 신고 절차와 빠른 신고 방법 안내.`,
        openGraph: {
          title: `${params.sigungu} ${params.itemName} 수수료 ${params.fee?.toLocaleString('ko-KR')}원`,
          description: `${params.sigungu}에서 ${params.itemName} 버릴 때 수수료 ${params.fee?.toLocaleString('ko-KR')}원.`,
          siteName: SITE_NAME,
          locale: 'ko_KR',
          type: 'website',
        },
      };
    case 'app':
      return {
        title: `대형폐기물 신고 앱 비교 — 빼기 vs 우동플러스 vs 여기로 | ${SITE_NAME}`,
        description: '대형폐기물 신고 앱 3개를 한눈에 비교. 속도, 결제 방법, 지원 지역, 사용자 평점까지.',
        openGraph: {
          title: '대형폐기물 신고 앱 비교 — 빼기 vs 우동플러스 vs 여기로',
          description: '대형폐기물 신고 앱 3개를 한눈에 비교.',
          siteName: SITE_NAME,
          locale: 'ko_KR',
          type: 'website',
        },
      };
    default:
      return {
        title: SITE_NAME,
        description: '전국 폐기물 정보.',
      };
  }
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function generateHowToJsonLd(sigungu: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${sigungu} 대형폐기물 배출 방법`,
    step: [
      { '@type': 'HowToStep', position: 1, name: '배출 신고', text: '홈페이지 또는 신고 앱에서 품목·수량 신고' },
      { '@type': 'HowToStep', position: 2, name: '수수료 납부', text: '카드 결제, 가상계좌, 또는 현금 가능' },
      { '@type': 'HowToStep', position: 3, name: '스티커 부착', text: '납부 확인번호나 스티커를 잘 보이게' },
      { '@type': 'HowToStep', position: 4, name: '지정일 배출', text: '수거 예정일 저녁 지정 장소에 놓기' },
    ],
  };
}

export function generateFaqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
