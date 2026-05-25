import Link from 'next/link';
import AppleNav from '@/components/AppleNav';
import AppleHero from '@/components/AppleHero';
import AppleFooter from '@/components/AppleFooter';
import { regions, getAllSido } from '@/data/regions';

export const metadata = {
  title: '전국 대형폐기물 수수료 — 시·도별 검색 | 폐기물 정보',
  description: '전국 17개 시·도, 229개 시·군·구의 대형폐기물 수수료를 한눈에. 내 지역을 선택하세요.',
};

export default function LargeWasteHubPage() {
  const sidoList = getAllSido();

  return (
    <main className="max-w-[420px] mx-auto bg-apple-white">
      <AppleNav />

      <AppleHero
        titleBold="대형폐기물."
        titleLight="전국 검색."
        subtitle="17개 시·도, 229개 시·군·구. 내 지역을 선택하세요."
        links={[]}
        size="medium"
      />

      <div className="px-[22px] pb-12">
        {sidoList.map(sido => {
          const cities = regions.filter(r => r.sidoSlug === sido.slug);
          return (
            <div key={sido.slug} className="mb-8">
              <h2 className="text-[22px] font-bold tracking-[-0.03em] mb-3 text-apple-text">
                {sido.name}.
              </h2>
              <div className="bg-apple-white rounded-card overflow-hidden border border-apple-divider/50">
                {cities.map((city, idx) => (
                  <Link
                    key={`${city.sidoSlug}-${city.sigunguSlug}`}
                    href={`/large/${city.sidoSlug}/${city.sigunguSlug}`}
                    className={`px-5 py-3.5 flex items-center justify-between cursor-pointer hover:bg-apple-off no-underline text-inherit ${
                      idx < cities.length - 1 ? 'border-b border-apple-divider/50' : ''
                    }`}
                  >
                    <span className="text-base font-medium tracking-[-0.02em]">{city.sigungu}</span>
                    <span className="text-apple-text-3 text-lg font-extralight">›</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AppleFooter />
    </main>
  );
}
