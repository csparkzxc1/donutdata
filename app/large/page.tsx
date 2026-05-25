'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppleNav from '@/components/AppleNav';
import AppleFooter from '@/components/AppleFooter';
import { regions, getAllSido } from '@/data/regions';

export default function LargeWasteHubPage() {
  const sidoList = getAllSido();
  const [openSido, setOpenSido] = useState<string | null>(null);

  return (
    <main className="max-w-[420px] mx-auto bg-apple-white">
      <AppleNav />

      <div className="bg-apple-white px-[22px] pt-12 pb-10 text-center">
        <h1 className="text-[44px] font-bold tracking-[-0.04em] leading-[1.04] text-apple-text mb-3.5">
          대형폐기물.<br />
          <span className="font-extralight">전국 검색.</span>
        </h1>
        <p className="text-[21px] font-normal text-apple-text tracking-[-0.02em] leading-[1.2] max-w-[320px] mx-auto">
          시·도를 선택하면 시·군·구가 표시됩니다.
        </p>
      </div>

      <div className="px-[22px] pb-12">
        <div className="bg-apple-white rounded-tile overflow-hidden border border-apple-divider/50">
          {sidoList.map((sido, sidoIdx) => {
            const cities = regions.filter(r => r.sidoSlug === sido.slug);
            const isOpen = openSido === sido.slug;

            return (
              <div key={sido.slug}>
                <button
                  onClick={() => setOpenSido(isOpen ? null : sido.slug)}
                  className={`w-full px-5 py-4 flex items-center justify-between cursor-pointer bg-apple-white hover:bg-apple-off text-left border-none font-sans ${
                    sidoIdx < sidoList.length - 1 && !isOpen ? 'border-b border-apple-divider/50' : ''
                  }`}
                >
                  <div>
                    <span className="text-[17px] font-semibold tracking-[-0.02em] text-apple-text">
                      {sido.name}
                    </span>
                    <span className="text-[13px] text-apple-text-3 ml-2 font-normal">
                      {cities.length}개
                    </span>
                  </div>
                  <span
                    className={`text-apple-text-2 text-[22px] font-extralight leading-none transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="bg-apple-grey">
                    {cities.map((city, idx) => (
                      <Link
                        key={`${city.sidoSlug}-${city.sigunguSlug}`}
                        href={`/large/${city.sidoSlug}/${city.sigunguSlug}`}
                        className={`px-7 py-3 flex items-center justify-between cursor-pointer hover:bg-[#ebebed] no-underline text-inherit ${
                          idx < cities.length - 1 ? 'border-b border-apple-divider/30' : ''
                        }`}
                      >
                        <span className="text-[15px] font-medium tracking-[-0.02em]">{city.sigungu}</span>
                        <span className="text-apple-text-3 text-base font-extralight">›</span>
                      </Link>
                    ))}
                    {sidoIdx < sidoList.length - 1 && (
                      <div className="border-b border-apple-divider/50" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AppleFooter />
    </main>
  );
}
