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
    supportedCities: ["gangnam","gangdong","gangbuk","gangseo","gwanak","gwangjin","guro","geumcheon","nowon","dobong","dongdaemun","dongjak","mapo","seodaemun","seocho","seongdong","seongbuk","songpa","yangcheon","yeongdeungpo","yongsan","eunpyeong","jongno","jung","jungnang","gangseo","geumjeong","gijang","nam","dong","dongnae","busanjin","buk","sasang","saha","seo","suyeong","yeonje","yeongdo","jung","haeundae","nam","dalseo","dalseong","dong","buk","seo","suseong","jung","ganghwa","gyeyang","namdong","dong","michuhol","bupyeong","seo","yeonsu","ongjin","jung","gwangsan","nam","dong","buk","seo","daedeok","dong","seo","yuseong","jung","nam","dong","buk","ulju","jung","sejong","gapyeong","goyang","gwacheon","gwangmyeong","gwangju-g"],
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
    supportedCities: ["gangnam","gangdong","gangbuk","gangseo","gwanak","gwangjin","guro","geumcheon","nowon","dobong","dongdaemun","dongjak","mapo","seodaemun","seocho","seongdong","seongbuk","songpa","yangcheon","yeongdeungpo","yongsan","eunpyeong","jongno","jung","jungnang","gangseo","geumjeong","gijang","nam","dong","dongnae","busanjin","buk","sasang","saha","seo","suyeong","yeonje","yeongdo","jung","haeundae","nam","dalseo","dalseong","dong","buk","seo","suseong","jung","ganghwa","gyeyang","namdong","dong","michuhol","bupyeong","seo","yeonsu","ongjin","jung","gwangsan","nam","dong","buk","seo","daedeok","dong","seo","yuseong","jung","nam","dong","buk","ulju","jung","sejong","gapyeong","goyang","gwacheon","gwangmyeong","gwangju-g","guri","gunpo","gimpo","namyangju","dongducheon","bucheon","seongnam","suwon","siheung","ansan","anseong","anyang","yangju","yangpyeong","yeoju","yeoncheon","osan","yongin","uiwang","uijeongbu","icheon","paju","pyeongtaek","pocheon","hanam","hwaseong","gangneung","goseong","donghae","samcheok","sokcho","yanggu","yangyang","yeongwol","wonju","inje","jeongseon","cheorwon","chuncheon","taebaek"],
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
    supportedCities: ["gangnam","gangseo","guro","dobong","mapo","seongdong","yangcheon","eunpyeong","jungnang","gijang","dongnae","sasang","suyeong","jung","dalseo","buk","jung","namdong","bupyeong","ongjin","nam","seo","seo","nam","ulju","gapyeong","gwangmyeong","gunpo","dongducheon","suwon","anseong","yangpyeong","osan","uijeongbu","pyeongtaek","hwaseong","donghae","yanggu","wonju","cheorwon","pyeongchang","hoengseong","boeun","eumseong","jincheon","gyeryong","nonsan","buyeo","asan","cheongyang","gochang","namwon","sunchang","imsil","jeongeup","goheung","gurye","mokpo","suncheon","yeonggwang","jangseong","hampyeong","gyeongsan","gumi","mungyeong","seongju","yeongyang","yecheon","uiseong","chilgok","geochang","namhae","sancheong","jinju","tongyeong","hamyang","seogwipo"],
    features: ['전국 커버리지 확대 중', '기업 대량 배출 지원'],
    rating: 3.8,
    description: '전국 서비스 확대 중. 기업 고객 특화.',
  },
];

export function getAppsForCity(sigunguSlug: string): WasteApp[] {
  return apps.filter(app => app.supportedCities.includes(sigunguSlug));
}
