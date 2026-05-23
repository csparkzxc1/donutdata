import { notFound } from 'next/navigation';
import AppleNav from '@/components/AppleNav';
import AppleHero from '@/components/AppleHero';
import AppleFooter from '@/components/AppleFooter';
import Breadcrumb from '@/components/Breadcrumb';
import StepGrid from '@/components/StepGrid';
import FeatureSection from '@/components/FeatureSection';
import ChannelCompareList from '@/components/ChannelCompareList';
import CatalogList from '@/components/CatalogList';
import { getCityData } from '@/lib/data';
import { findRegion, getSidoName } from '@/data/regions';
import { getAppsForCity } from '@/data/apps';
import { generateMeta, generateBreadcrumbJsonLd, generateHowToJsonLd } from '@/lib/seo';

interface PageProps {
  params: Promise<{ sido: string; sigungu: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { sido, sigungu } = await params;
  const city = getCityData(sido, sigungu);
  if (!city) return {};
  return generateMeta({
    page: 'sigungu',
    sigungu: city.sigungu,
    department: city.department.name,
  });
}

export function generateStaticParams() {
  return [{ sido: 'gyeonggi', sigungu: 'hwaseong' }];
}

export default async function SigunguPage({ params }: PageProps) {
  const { sido, sigungu } = await params;
  const city = getCityData(sido, sigungu);
  if (!city) notFound();

  const region = findRegion(sido, sigungu);
  const sidoName = getSidoName(sido);
  const cityApps = getAppsForCity(sigungu);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: '홈', url: '/' },
    { name: '대형폐기물', url: '/' },
    { name: sidoName, url: '/' },
    { name: city.sigungu, url: `/large/${sido}/${sigungu}` },
  ]);
  const howToJsonLd = generateHowToJsonLd(city.sigungu);

  return (
    <main className="max-w-[420px] mx-auto bg-apple-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <AppleNav />

      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: '대형폐기물', href: '/' },
          { label: sidoName, href: '/' },
          { label: city.sigungu },
        ]}
      />

      <AppleHero
        titleBold={`${city.sigungu}.`}
        titleLight="대형폐기물."
        subtitle="소파·냉장고·침대 등 종량제봉투에 안 들어가는 폐기물. 수수료부터 신고까지."
        links={[
          { label: '바로 신고', href: '#' },
          { label: '절차 보기', href: '#steps' },
        ]}
        size="medium"
      />

      <StepGrid />

      {cityApps.length > 0 && (
        <FeatureSection
          eyebrow="DonutData Exclusive"
          title={`${city.sigungu}에서.`}
          titleLight="쓸 수 있는 신고 채널."
          subtitle={`${cityApps.length}가지 방법. 속도·결제·편의성이 모두 다릅니다.`}
        >
          <ChannelCompareList apps={cityApps} recommended="bbegi" />
        </FeatureSection>
      )}

      <CatalogList
        items={city.items}
        sidoSlug={sido}
        sigunguSlug={sigungu}
        totalCount={city.items.length}
      />

      <AppleFooter
        variant="compact"
        dataSource={`데이터 · ${city.sigungu} ${city.department.name} (${city.department.phone}) · 갱신 ${city.updatedAt}`}
      />
    </main>
  );
}
