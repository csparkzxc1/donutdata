export interface WasteApp {
  id: string;
  name: string;
  website: string;
  avgTime: number;
  paymentMethods: string[];
  supportedCities: string[];
  features: string[];
  rating: number;
  description: string;
}

export const apps: WasteApp[] = [
  {
    id: 'bbegi',
    name: '빼기',
    website: 'https://bbegi.com',
    avgTime: 3,
    paymentMethods: ['카드', '간편결제'],
    supportedCities: ['hwaseong', 'suwon', 'yongin', 'seongnam', 'gangnam', 'seocho', 'songpa', 'mapo'],
    features: ['사진 자동 인식', '중고 판매 옵션', '실시간 수거 추적'],
    rating: 4.5,
    description: '사진 촬영만으로 품목 자동 인식. 결제까지 약 3분.',
  },
  {
    id: 'woodongplus',
    name: '우리동네 플러스',
    website: 'https://www.woori-dongne.com',
    avgTime: 5,
    paymentMethods: ['카드', '가상계좌'],
    supportedCities: ['hwaseong', 'suwon', 'yongin', 'gangnam', 'seocho', 'songpa', 'haeundae'],
    features: ['지자체 공식 대행', '수거 일정 확인', '영수증 발급'],
    rating: 4.2,
    description: '지자체 공식 위탁 서비스. 안정적인 수거 보장.',
  },
  {
    id: 'yeogiro',
    name: '여기로',
    website: 'https://www.yeogiro.com',
    avgTime: 7,
    paymentMethods: ['카드', '무통장입금'],
    supportedCities: ['gangnam', 'seocho', 'songpa', 'mapo', 'haeundae', 'namdong'],
    features: ['전국 커버리지 확대 중', '기업 대량 배출 지원'],
    rating: 3.8,
    description: '전국 서비스 확대 중. 기업 고객 특화.',
  },
];

export function getAppsForCity(sigunguSlug: string): WasteApp[] {
  return apps.filter(app => app.supportedCities.includes(sigunguSlug));
}
