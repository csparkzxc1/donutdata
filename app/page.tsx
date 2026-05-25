import AppleNav from '@/components/AppleNav';
import AppleHero from '@/components/AppleHero';
import AppleFooter from '@/components/AppleFooter';
import Tile from '@/components/Tile';
import SearchPill from '@/components/ui/SearchPill';
import { generateMeta } from '@/lib/seo';

export const metadata = generateMeta({ page: 'home' });

export default function HomePage() {
  return (
    <main className="max-w-[420px] mx-auto bg-apple-white">
      <AppleNav />

      <AppleHero
        titleBold="버릴 때."
        titleLight="미리 확인."
        subtitle="전국 226개 시·군·구의 폐기물 데이터를 한 곳에서."
        links={[
          { label: '시작하기', href: '/large' },
          { label: '데이터 출처', href: '/' },
        ]}
      />

      {/* Feature tile - 신고 채널 비교 */}
      <div className="mx-3">
        <Tile
          variant="dark"
          eyebrow="DonutData Exclusive"
          title="신고 채널"
          titleLight="한눈에 비교."
          subtitle="빼기·우동플러스·여기로·지자체 사이트. 내 지역에서 뭐가 가장 빠른지."
          links={[
            { label: '자세히 보기', href: '/app' },
            { label: '지원 지역', href: '/app' },
          ]}
        />
      </div>

      {/* 2-up tile grid */}
      <div className="px-3 pt-3 grid grid-cols-2 gap-3">
        <Tile
          compact
          title="대형폐기물"
          subtitle="시·군·구별 수수료."
          links={[{ label: '보기', href: '/large' }]}
          statNumber="226"
        />
        <Tile
          compact
          title="종량제봉투"
          subtitle="용량별 가격표."
          links={[{ label: '보기', href: '/' }]}
          statNumber="68k"
        />
      </div>

      {/* 폐가전 무상수거 */}
      <div className="mx-3 mt-3">
        <Tile
          eyebrow="무상."
          title="폐가전,"
          titleLight="무료로."
          subtitle="TV·냉장고·세탁기·에어컨·전자레인지. 1599-0903 한 통이면 끝."
          links={[
            { label: '전화걸기', href: 'tel:1599-0903' },
            { label: '신청 방법', href: '/' },
          ]}
        />
      </div>

      {/* 2-up tile grid bottom */}
      <div className="px-3 pt-3 grid grid-cols-2 gap-3">
        <Tile
          compact
          title="무단투기"
          subtitle="최대 100만 원 과태료."
          links={[{ label: '법령 보기', href: '/' }]}
        />
        <Tile
          compact
          title="정책 변경"
          subtitle="최근 갱신 정리."
          links={[{ label: '전체 보기', href: '/' }]}
        />
      </div>

      {/* 검색 */}
      <div className="pt-14 pb-8 text-center bg-apple-white px-[22px]">
        <div className="text-sm font-medium text-apple-text-2 tracking-[-0.01em] mb-3 uppercase">
          Quick Find
        </div>
        <h2 className="text-[36px] font-bold tracking-[-0.035em] leading-[1.1] mb-0">
          지역 + 품목으로
          <br />
          <span className="font-extralight">바로 검색.</span>
        </h2>
      </div>
      <div className="px-[22px] pb-8 bg-apple-white">
        <SearchPill placeholder="예: 화성시 소파" />
      </div>

      {/* Stats */}
      <div className="bg-apple-grey px-[22px] py-12 text-center">
        <div className="text-sm font-medium text-apple-text-2 tracking-[-0.01em] mb-3 uppercase">
          공공데이터 기반
        </div>
        <h2 className="text-[36px] font-bold tracking-[-0.035em] leading-[1.1] mb-10 max-w-[340px] mx-auto">
          <span className="font-extralight">전국</span> 데이터,
          <br />
          매월 갱신.
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-[40px] font-semibold tracking-[-0.04em] leading-none mb-1.5 text-apple-text tabular-nums">226</div>
            <div className="text-xs text-apple-text-2 font-normal tracking-[-0.01em]">시·군·구</div>
          </div>
          <div className="text-center">
            <div className="text-[40px] font-semibold tracking-[-0.04em] leading-none mb-1.5 text-apple-text tabular-nums">68k</div>
            <div className="text-xs text-apple-text-2 font-normal tracking-[-0.01em]">품목 데이터</div>
          </div>
          <div className="text-center">
            <div className="text-[40px] font-semibold tracking-[-0.04em] leading-none mb-1.5 text-apple-text tabular-nums">4</div>
            <div className="text-xs text-apple-text-2 font-normal tracking-[-0.01em]">신고 채널</div>
          </div>
        </div>
      </div>

      <AppleFooter />
    </main>
  );
}
