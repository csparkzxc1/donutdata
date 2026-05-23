import { notFound } from 'next/navigation';
import Link from 'next/link';
import AppleNav from '@/components/AppleNav';
import AppleFooter from '@/components/AppleFooter';
import Breadcrumb from '@/components/Breadcrumb';
import PriceDisplay from '@/components/PriceDisplay';
import FAQSection from '@/components/FAQSection';
import ReasonCard from '@/components/ui/ReasonCard';
import AppleLink from '@/components/AppleLink';
import { getItemData, formatPrice, getSimilarItems } from '@/lib/data';
import { getSidoName } from '@/data/regions';
import { getAppsForCity } from '@/data/apps';
import { generateMeta, generateBreadcrumbJsonLd, generateFaqJsonLd } from '@/lib/seo';

interface PageProps {
  params: Promise<{ sido: string; sigungu: string; item: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { sido, sigungu, item } = await params;
  const data = getItemData(sido, sigungu, item);
  if (!data) return {};
  return generateMeta({
    page: 'item',
    sigungu: data.city.sigungu,
    itemName: data.item.name,
    fee: data.item.fee,
  });
}

export function generateStaticParams() {
  const items = [
    'sofa-3p', 'sofa-2p', 'sofa-1p', 'sofa-module',
    'refrigerator-double', 'refrigerator-single',
    'mattress-queen', 'mattress-single',
    'washing-machine-drum', 'washing-machine-top',
    'desk', 'desk-l', 'wardrobe', 'wardrobe-small',
    'bed-frame-double', 'bed-frame-single',
    'dining-table-6', 'dining-table-4',
    'armchair', 'bookshelf',
  ];
  return items.map(item => ({ sido: 'gyeonggi', sigungu: 'hwaseong', item }));
}

const faqs = [
  {
    q: '분해해서 종량제봉투에 버려도 되나요?',
    a: '대형 가구는 분해해도 종량제봉투에 들어가지 않으면 대형폐기물로 신고해야 합니다. 매트리스 부분만 따로 빼낸 경우에도 별도 신고가 필요합니다.',
  },
  {
    q: '이사 갈 때 한 번에 여러 개 신고 가능한가요?',
    a: '네, 한 번에 여러 품목을 신고할 수 있습니다. 빼기 앱이나 지자체 사이트에서 품목별로 각각 선택 후 일괄 결제하면 됩니다.',
  },
  {
    q: '비 오는 날 배출해도 되나요?',
    a: '가능하지만 비에 젖으면 무게가 증가해 수거가 어려울 수 있습니다. 가급적 수거일 전날 저녁에 배출하시고, 비닐로 감싸지 마세요.',
  },
  {
    q: '스티커를 잘못 붙였는데 환불 되나요?',
    a: '미사용 스티커는 구매처에서 환불 가능합니다. 이미 부착한 스티커는 환불이 어렵습니다. 앱 결제의 경우 수거 전 취소 가능한 경우도 있습니다.',
  },
];

export default async function ItemDetailPage({ params }: PageProps) {
  const { sido, sigungu, item } = await params;
  const data = getItemData(sido, sigungu, item);
  if (!data) notFound();

  const { city, item: currentItem } = data;
  const sidoName = getSidoName(sido);
  const cityApps = getAppsForCity(sigungu);
  const similar = getSimilarItems(city.items, currentItem, 4);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: '홈', url: '/' },
    { name: '대형폐기물', url: '/' },
    { name: city.sigungu, url: `/large/${sido}/${sigungu}` },
    { name: currentItem.name, url: `/large/${sido}/${sigungu}/${item}` },
  ]);
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <main className="max-w-[420px] mx-auto bg-apple-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <AppleNav />

      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: '대형폐기물', href: '/' },
          { label: city.sigungu, href: `/large/${sido}/${sigungu}` },
          { label: currentItem.name },
        ]}
      />

      {/* Item Hero */}
      <div className="px-[22px] pt-14 pb-8 text-center bg-apple-white">
        <div className="text-sm text-apple-text-2 font-medium tracking-[-0.01em] mb-3">
          {currentItem.category} · {currentItem.spec}
        </div>
        <h1 className="text-[48px] font-bold tracking-[-0.04em] leading-[1.04] mb-3.5">
          {currentItem.name.split(' (')[0]}.
        </h1>
        <p className="text-[21px] text-apple-text font-normal tracking-[-0.02em] leading-[1.2] mb-6 max-w-[320px] mx-auto">
          {currentItem.spec} 기준입니다.
        </p>

        <PriceDisplay
          label={`${city.sigungu} 대형폐기물 수수료`}
          amount={formatPrice(currentItem.fee)}
        />

        <div className="mt-6 flex flex-col gap-3.5 items-center">
          <button className="bg-apple-blue text-white border-none px-7 py-3 rounded-pill text-[17px] font-normal cursor-pointer font-sans tracking-[-0.02em] hover:bg-apple-blue-hover">
            빼기 앱에서 신고
          </button>
          <AppleLink href={`/large/${sido}/${sigungu}`}>다른 신고 방법 보기</AppleLink>
        </div>
      </div>

      {/* Reasons / 신고 방법 */}
      <div className="bg-apple-grey px-[22px] py-12">
        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-center mb-2">
          신고하는 <span className="font-extralight">세 가지 방법.</span>
        </h2>
        <p className="text-[15px] text-apple-text-2 text-center mb-7 tracking-[-0.01em]">
          사용자 편의·속도가 다릅니다.
        </p>
        <div className="flex flex-col gap-2.5">
          {cityApps.length > 0 && (
            <ReasonCard
              title={cityApps[0].name + ' 앱'}
              meta={`${cityApps[0].description.split('.')[0]} · 추천`}
              linkText="신고"
              featured
            />
          )}
          <ReasonCard
            title={`${city.sigungu} 공식 사이트`}
            meta="본인인증 필요"
            linkText="이동"
          />
          <ReasonCard
            title="주민센터 방문"
            meta="관할 동 주민센터 · 현금 결제 가능"
            linkText="위치"
          />
        </div>
      </div>

      {/* Disclosure */}
      <div className="bg-disclosure-bg rounded-[12px] px-4 py-3.5 mx-[22px] my-8 text-[13px] text-disclosure-text leading-[1.5] tracking-[-0.01em]">
        <strong className="text-[#78350f] font-semibold">주의.</strong> 스티커 없이 무단 투기 시 폐기물관리법에 따라 최대 100만 원 과태료가 부과됩니다. {city.sigungu}에서 발급한 스티커는 타 지역에서 사용할 수 없습니다.
      </div>

      {/* Cross-sell */}
      {similar.length > 0 && (
        <div className="px-[22px] pt-12 pb-8 text-center bg-apple-white">
          <h2 className="text-2xl font-bold tracking-[-0.03em] mb-6">비슷한 품목.</h2>
          <div className="grid grid-cols-2 gap-2.5 text-left">
            {similar.map(s => (
              <Link
                key={s.id}
                href={`/large/${sido}/${sigungu}/${s.nameSlug}`}
                className="bg-apple-grey rounded-card px-[18px] py-5 cursor-pointer hover:bg-[#ebebed] no-underline text-inherit"
              >
                <h6 className="text-base font-semibold tracking-[-0.02em] mb-1.5">{s.name}</h6>
                <div className="text-base font-semibold text-apple-text tracking-[-0.02em] mb-2 tabular-nums">
                  {formatPrice(s.fee)}원
                </div>
                <span className="text-apple-blue text-[13px] font-normal">
                  확인<span className="font-light"> ›</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <FAQSection faqs={faqs} />

      <AppleFooter
        variant="compact"
        dataSource={`Copyright © 2026 DonutData. 데이터 · ${city.sigungu} ${city.department.name} · ${city.updatedAt.slice(0, 7).replace('-', '.')}`}
      />
    </main>
  );
}
