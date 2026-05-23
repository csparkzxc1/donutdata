export interface Region {
  sido: string;
  sidoSlug: string;
  sigungu: string;
  sigunguSlug: string;
}

export const regions: Region[] = [
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '화성시', sigunguSlug: 'hwaseong' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '수원시', sigunguSlug: 'suwon' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '용인시', sigunguSlug: 'yongin' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '성남시', sigunguSlug: 'seongnam' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '강남구', sigunguSlug: 'gangnam' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '서초구', sigunguSlug: 'seocho' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '송파구', sigunguSlug: 'songpa' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '마포구', sigunguSlug: 'mapo' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '해운대구', sigunguSlug: 'haeundae' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '남동구', sigunguSlug: 'namdong' },
];

export function findRegion(sidoSlug: string, sigunguSlug: string): Region | undefined {
  return regions.find(r => r.sidoSlug === sidoSlug && r.sigunguSlug === sigunguSlug);
}

export function getSidoName(sidoSlug: string): string {
  const region = regions.find(r => r.sidoSlug === sidoSlug);
  return region?.sido ?? sidoSlug;
}
