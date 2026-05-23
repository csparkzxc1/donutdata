import AppleNav from '@/components/AppleNav';
import AppleHero from '@/components/AppleHero';
import AppleFooter from '@/components/AppleFooter';
import FeatureSection from '@/components/FeatureSection';
import AppleLink from '@/components/AppleLink';
import { apps } from '@/data/apps';
import { generateMeta } from '@/lib/seo';

export const metadata = generateMeta({ page: 'app' });

export default function AppComparePage() {
  return (
    <main className="max-w-[420px] mx-auto bg-apple-white">
      <AppleNav />

      <AppleHero
        titleBold="신고 앱."
        titleLight="비교해서 선택."
        subtitle="대형폐기물 신고 앱 3개를 한눈에 비교합니다."
        links={[
          { label: '추천 보기', href: '#compare' },
        ]}
      />

      {/* Comparison matrix */}
      <FeatureSection
        eyebrow="DonutData Exclusive"
        title="어떤 앱이."
        titleLight="가장 빠를까."
        subtitle="속도·결제 방법·지원 지역·사용자 평점까지."
      >
        <div className="flex flex-col gap-px bg-apple-divider-dark rounded-card overflow-hidden max-w-[380px] mx-auto text-left">
          {apps.map((app, idx) => (
            <div
              key={app.id}
              className={`bg-[#1d1d1f] px-5 py-[18px] grid grid-cols-[1fr_auto] items-center gap-3 cursor-pointer hover:bg-[#2d2d2f] ${
                idx === 0 ? 'bg-gradient-to-br from-[#1d1d1f] to-[#2a1d1a] border-l-[3px] border-l-accent !pl-[17px]' : ''
              }`}
            >
              <div>
                <div className="text-[19px] font-semibold tracking-[-0.02em] text-white mb-[3px]">
                  {app.name}
                  {idx === 0 && (
                    <span className="inline-block ml-2 text-[11px] font-medium text-accent border border-accent px-1.5 py-px rounded align-[3px] tracking-normal">
                      FASTEST
                    </span>
                  )}
                </div>
                <div className="text-[13px] text-apple-text-3 tracking-[-0.01em]">
                  약 {app.avgTime}분 · ★ {app.rating} · {app.paymentMethods.join(', ')}
                </div>
              </div>
              <span className="text-white text-[22px] font-extralight opacity-60">›</span>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Detail cards for each app */}
      {apps.map(app => (
        <div key={app.id} className="bg-apple-grey px-[22px] py-10 mb-px">
          <div className="text-sm font-medium text-apple-text-2 tracking-[-0.01em] mb-2 uppercase text-center">
            앱 상세
          </div>
          <h2 className="text-[28px] font-bold tracking-[-0.03em] text-center mb-2">
            {app.name}.
          </h2>
          <p className="text-[15px] text-apple-text-2 text-center mb-6 tracking-[-0.01em]">
            {app.description}
          </p>

          <div className="bg-apple-white rounded-card overflow-hidden">
            <div className="px-5 py-4 border-b border-apple-divider/50">
              <div className="text-xs text-apple-text-2 mb-1">평균 소요 시간</div>
              <div className="text-[32px] font-bold tracking-[-0.03em] tabular-nums">
                {app.avgTime}<span className="text-lg font-normal text-apple-text-2 ml-1">분</span>
              </div>
            </div>
            <div className="px-5 py-4 border-b border-apple-divider/50">
              <div className="text-xs text-apple-text-2 mb-1">사용자 평점</div>
              <div className="text-[32px] font-bold tracking-[-0.03em] tabular-nums">
                {app.rating}<span className="text-lg font-normal text-apple-text-2 ml-1">/ 5.0</span>
              </div>
            </div>
            <div className="px-5 py-4 border-b border-apple-divider/50">
              <div className="text-xs text-apple-text-2 mb-2">결제 방법</div>
              <div className="flex gap-1.5 flex-wrap">
                {app.paymentMethods.map(m => (
                  <span key={m} className="bg-apple-grey text-apple-text text-xs font-medium px-2.5 py-1 rounded-pill">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-5 py-4 border-b border-apple-divider/50">
              <div className="text-xs text-apple-text-2 mb-2">주요 기능</div>
              <div className="flex flex-col gap-1">
                {app.features.map(f => (
                  <div key={f} className="text-sm text-apple-text tracking-[-0.01em]">· {f}</div>
                ))}
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="text-xs text-apple-text-2 mb-1">지원 지역</div>
              <div className="text-sm text-apple-text font-medium">{app.supportedCities.length}개 시·군·구</div>
            </div>
          </div>
        </div>
      ))}

      {/* Stats */}
      <div className="bg-apple-white px-[22px] py-12 text-center">
        <h2 className="text-[28px] font-bold tracking-[-0.03em] mb-2">
          한눈에 <span className="font-extralight">비교 요약.</span>
        </h2>
        <p className="text-[15px] text-apple-text-2 mb-8 tracking-[-0.01em]">
          데이터 기준 2026년 5월.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-[40px] font-semibold tracking-[-0.04em] leading-none mb-1.5 text-apple-text tabular-nums">3</div>
            <div className="text-xs text-apple-text-2 font-normal tracking-[-0.01em]">비교 앱</div>
          </div>
          <div className="text-center">
            <div className="text-[40px] font-semibold tracking-[-0.04em] leading-none mb-1.5 text-apple-text tabular-nums">3분</div>
            <div className="text-xs text-apple-text-2 font-normal tracking-[-0.01em]">최단 소요</div>
          </div>
          <div className="text-center">
            <div className="text-[40px] font-semibold tracking-[-0.04em] leading-none mb-1.5 text-apple-text tabular-nums">4.5</div>
            <div className="text-xs text-apple-text-2 font-normal tracking-[-0.01em]">최고 평점</div>
          </div>
        </div>
      </div>

      <AppleFooter />
    </main>
  );
}
