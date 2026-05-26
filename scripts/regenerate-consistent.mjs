import fs from 'fs';
import path from 'path';

const HWASEONG_TEMPLATE = [
  { id: 'sofa-4up', name: '소파 (4인용 이상)', nameSlug: 'sofa-4up', category: '가구류', spec: '4인용 이상', baseFee: 8000 },
  { id: 'sofa-3p', name: '소파 (3인용)', nameSlug: 'sofa-3p', category: '가구류', spec: '3인용', baseFee: 6000 },
  { id: 'sofa-2p', name: '소파 (2인용)', nameSlug: 'sofa-2p', category: '가구류', spec: '2인용', baseFee: 4000 },
  { id: 'sofa-1p', name: '소파 (1인용)', nameSlug: 'sofa-1p', category: '가구류', spec: '1인용', baseFee: 2000 },
  { id: 'bed-double-set', name: '침대 (2인용 세트)', nameSlug: 'bed-double-set', category: '가구류', spec: '2인용 프레임+매트리스', baseFee: 15000 },
  { id: 'bed-single-set', name: '침대 (1인용 세트)', nameSlug: 'bed-single-set', category: '가구류', spec: '1인용 프레임+매트리스', baseFee: 10000 },
  { id: 'mattress-double', name: '매트리스 (2인용)', nameSlug: 'mattress-double', category: '가구류', spec: '더블/퀸/킹', baseFee: 8000 },
  { id: 'mattress-single', name: '매트리스 (1인용)', nameSlug: 'mattress-single', category: '가구류', spec: '싱글', baseFee: 5000 },
  { id: 'bed-frame-double', name: '침대 프레임 (2인용)', nameSlug: 'bed-frame-double', category: '가구류', spec: '2인용 프레임만', baseFee: 8000 },
  { id: 'bed-frame-single', name: '침대 프레임 (1인용)', nameSlug: 'bed-frame-single', category: '가구류', spec: '1인용 프레임만', baseFee: 5000 },
  { id: 'refrigerator-large', name: '냉장고 (대형)', nameSlug: 'refrigerator-large', category: '가전류', spec: '500L 이상', baseFee: 10000 },
  { id: 'refrigerator-medium', name: '냉장고 (중형)', nameSlug: 'refrigerator-medium', category: '가전류', spec: '300~500L', baseFee: 7000 },
  { id: 'refrigerator-small', name: '냉장고 (소형)', nameSlug: 'refrigerator-small', category: '가전류', spec: '300L 미만', baseFee: 4000 },
  { id: 'washing-machine-large', name: '세탁기 (대형)', nameSlug: 'washing-machine-large', category: '가전류', spec: '10kg 이상', baseFee: 8000 },
  { id: 'washing-machine-small', name: '세탁기 (소형)', nameSlug: 'washing-machine-small', category: '가전류', spec: '10kg 미만', baseFee: 5000 },
  { id: 'tv-large', name: 'TV (42인치 이상)', nameSlug: 'tv-large', category: '가전류', spec: '42인치 이상', baseFee: 7000 },
  { id: 'tv-medium', name: 'TV (25~42인치)', nameSlug: 'tv-medium', category: '가전류', spec: '25~42인치', baseFee: 5000 },
  { id: 'tv-small', name: 'TV (25인치 미만)', nameSlug: 'tv-small', category: '가전류', spec: '25인치 미만', baseFee: 3000 },
  { id: 'air-conditioner-stand', name: '에어컨 (스탠드)', nameSlug: 'air-conditioner-stand', category: '가전류', spec: '스탠드형', baseFee: 8000 },
  { id: 'air-conditioner-wall', name: '에어컨 (벽걸이)', nameSlug: 'air-conditioner-wall', category: '가전류', spec: '벽걸이형', baseFee: 5000 },
  { id: 'wardrobe-large', name: '장롱 (대형)', nameSlug: 'wardrobe-large', category: '가구류', spec: '4칸 이상', baseFee: 7000 },
  { id: 'wardrobe-small', name: '장롱 (소형)', nameSlug: 'wardrobe-small', category: '가구류', spec: '4칸 미만', baseFee: 4000 },
  { id: 'closet-large', name: '옷장 (대형)', nameSlug: 'closet-large', category: '가구류', spec: '높이 150cm 이상', baseFee: 6000 },
  { id: 'closet-small', name: '옷장 (소형)', nameSlug: 'closet-small', category: '가구류', spec: '높이 150cm 미만', baseFee: 3000 },
  { id: 'desk-large', name: '책상 (대형)', nameSlug: 'desk-large', category: '가구류', spec: '폭 120cm 이상', baseFee: 5000 },
  { id: 'desk-small', name: '책상 (소형)', nameSlug: 'desk-small', category: '가구류', spec: '폭 120cm 미만', baseFee: 3000 },
  { id: 'dining-table-6', name: '식탁 (6인용 이상)', nameSlug: 'dining-table-6', category: '가구류', spec: '6인용 이상', baseFee: 7000 },
  { id: 'dining-table-4', name: '식탁 (4인용)', nameSlug: 'dining-table-4', category: '가구류', spec: '4인용', baseFee: 5000 },
  { id: 'dining-table-2', name: '식탁 (2인용)', nameSlug: 'dining-table-2', category: '가구류', spec: '2인용', baseFee: 3000 },
  { id: 'bookshelf-large', name: '책장 (5단 이상)', nameSlug: 'bookshelf-large', category: '가구류', spec: '5단 이상', baseFee: 5000 },
  { id: 'bookshelf-small', name: '책장 (5단 미만)', nameSlug: 'bookshelf-small', category: '가구류', spec: '5단 미만', baseFee: 3000 },
  { id: 'shoe-rack', name: '신발장', nameSlug: 'shoe-rack', category: '가구류', spec: '일반형', baseFee: 3000 },
  { id: 'drawer-large', name: '서랍장 (대형)', nameSlug: 'drawer-large', category: '가구류', spec: '5단 이상', baseFee: 5000 },
  { id: 'drawer-small', name: '서랍장 (소형)', nameSlug: 'drawer-small', category: '가구류', spec: '5단 미만', baseFee: 3000 },
  { id: 'piano-upright', name: '피아노 (업라이트)', nameSlug: 'piano-upright', category: '기타', spec: '업라이트형', baseFee: 12000 },
  { id: 'piano-grand', name: '피아노 (그랜드)', nameSlug: 'piano-grand', category: '기타', spec: '그랜드형', baseFee: 18000 },
  { id: 'bicycle', name: '자전거', nameSlug: 'bicycle', category: '생활용품', spec: '성인용', baseFee: 3000 },
  { id: 'stroller', name: '유모차', nameSlug: 'stroller', category: '생활용품', spec: '일반형', baseFee: 2000 },
  { id: 'exercise-bike', name: '실내자전거', nameSlug: 'exercise-bike', category: '생활용품', spec: '일반형', baseFee: 5000 },
  { id: 'treadmill', name: '런닝머신', nameSlug: 'treadmill', category: '생활용품', spec: '일반형', baseFee: 8000 },
  { id: 'gas-range', name: '가스레인지', nameSlug: 'gas-range', category: '가전류', spec: '일반형', baseFee: 3000 },
  { id: 'microwave', name: '전자레인지', nameSlug: 'microwave', category: '가전류', spec: '일반형', baseFee: 2000 },
  { id: 'water-purifier', name: '정수기', nameSlug: 'water-purifier', category: '가전류', spec: '일반형', baseFee: 3000 },
  { id: 'carpet-large', name: '카펫 (대형)', nameSlug: 'carpet-large', category: '생활용품', spec: '2m 이상', baseFee: 3000 },
  { id: 'mirror-large', name: '거울 (대형)', nameSlug: 'mirror-large', category: '생활용품', spec: '높이 100cm 이상', baseFee: 3000 },
  { id: 'massage-chair', name: '안마의자', nameSlug: 'massage-chair', category: '가구류', spec: '전동형', baseFee: 10000 },
  { id: 'chair', name: '의자', nameSlug: 'chair', category: '가구류', spec: '일반형', baseFee: 1000 },
  { id: 'office-chair', name: '사무용 의자', nameSlug: 'office-chair', category: '가구류', spec: '바퀴형', baseFee: 2000 },
  { id: 'golf-bag', name: '골프백', nameSlug: 'golf-bag', category: '생활용품', spec: '일반형', baseFee: 2000 },
  { id: 'fan-heater', name: '선풍기/온풍기', nameSlug: 'fan-heater', category: '가전류', spec: '일반형', baseFee: 1000 },
];

// Multiplier per sido to simulate regional price differences
// Seoul/metro areas tend to be slightly higher, rural areas slightly lower
const SIDO_MULTIPLIERS = {
  'seoul': 1.15,
  'busan': 1.05,
  'daegu': 1.0,
  'incheon': 1.05,
  'gwangju': 0.95,
  'daejeon': 1.0,
  'ulsan': 1.0,
  'sejong': 1.0,
  'gyeonggi': 1.1,
  'gangwon': 0.9,
  'chungbuk': 0.9,
  'chungnam': 0.9,
  'jeonbuk': 0.85,
  'jeonnam': 0.85,
  'gyeongbuk': 0.9,
  'gyeongnam': 0.95,
  'jeju': 1.0,
};

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function roundToThousand(v) {
  return Math.max(1000, Math.round(v / 1000) * 1000);
}

const dataDir = path.join(process.cwd(), 'data', 'large-waste');
const SKIP_FILES = ['gyeonggi-hwaseong.json', 'gyeonggi-suwon.json'];

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !SKIP_FILES.includes(f));

let updated = 0;
for (const file of files) {
  const filePath = path.join(dataDir, file);
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const sidoSlug = existing.sidoSlug;
  const mult = SIDO_MULTIPLIERS[sidoSlug] || 1.0;
  const seed = hashStr(existing.sidoSlug + existing.sigunguSlug + 'v2');
  const rng = seededRandom(seed);

  // Per-city random offset: -10% to +10%
  const cityOffset = 0.9 + rng() * 0.2;
  const finalMult = mult * cityOffset;

  const items = HWASEONG_TEMPLATE.map(t => ({
    id: t.id,
    name: t.name,
    nameSlug: t.nameSlug,
    category: t.category,
    spec: t.spec,
    fee: roundToThousand(t.baseFee * finalMult),
  }));

  const data = {
    ...existing,
    updatedAt: '2025-05-01',
    items,
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  updated++;
}

console.log(`Updated ${updated} files (skipped: ${SKIP_FILES.join(', ')})`);
console.log(`Template: ${HWASEONG_TEMPLATE.length} items per city`);
