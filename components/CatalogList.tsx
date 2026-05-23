'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import type { WasteItem } from '@/lib/format';
import { formatPrice, getCategories } from '@/lib/format';

interface CatalogListProps {
  items: WasteItem[];
  sidoSlug: string;
  sigunguSlug: string;
  totalCount: number;
}

export default function CatalogList({ items, sidoSlug, sigunguSlug, totalCount }: CatalogListProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');
  const categories = ['전체', ...getCategories(items)];

  const fuse = useMemo(
    () => new Fuse(items, { keys: ['name', 'category', 'spec'], threshold: 0.3 }),
    [items]
  );

  const filtered = useMemo(() => {
    let result = items;
    if (query.trim()) {
      result = fuse.search(query).map(r => r.item);
    }
    if (activeCategory !== '전체') {
      result = result.filter(i => i.category === activeCategory);
    }
    return result;
  }, [items, query, activeCategory, fuse]);

  return (
    <div className="bg-apple-grey px-[22px] py-12">
      <div className="text-sm font-medium text-apple-text-2 tracking-[-0.01em] mb-1.5 uppercase text-center">
        품목별 수수료
      </div>
      <h2 className="text-[28px] font-bold tracking-[-0.03em] leading-[1.15] mb-1.5 text-center">
        {totalCount}개 품목.
        <br />
        <span className="font-extralight">검색해서 확인.</span>
      </h2>

      <div className="mb-3.5 mt-6">
        <div className="bg-apple-white rounded-pill px-[18px] py-3 flex items-center gap-3">
          <svg className="w-[18px] h-[18px] text-apple-text-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="품목명 검색"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 border-none outline-none bg-transparent text-[17px] text-apple-text font-sans tracking-[-0.02em] placeholder:text-apple-text-3"
          />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto mb-4 pb-0.5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3.5 py-[7px] rounded-pill text-[13px] font-medium whitespace-nowrap tracking-[-0.01em] border-none cursor-pointer ${
              activeCategory === cat
                ? 'bg-apple-black text-white'
                : 'bg-apple-white text-apple-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-apple-white rounded-card overflow-hidden">
        {filtered.map((item, idx) => (
          <Link
            key={item.id}
            href={`/large/${sidoSlug}/${sigunguSlug}/${item.nameSlug}`}
            className={`px-5 py-4 grid grid-cols-[1fr_auto] items-center gap-3.5 cursor-pointer hover:bg-apple-off no-underline text-inherit ${
              idx < filtered.length - 1 ? 'border-b border-apple-divider/50' : ''
            }`}
          >
            <div>
              <div className="text-base font-medium tracking-[-0.02em] mb-[3px]">{item.name}</div>
              <div className="text-xs text-apple-text-2 tracking-[-0.005em]">
                <span className="text-apple-blue font-medium mr-2">{item.category}</span>
                {item.spec}
              </div>
            </div>
            <div className="text-[17px] font-semibold tracking-[-0.02em] text-apple-text tabular-nums">
              {formatPrice(item.fee)}
              <span className="font-normal text-apple-text-2 ml-[1px] text-[13px]">원</span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="px-5 py-8 text-center text-apple-text-2 text-sm">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
