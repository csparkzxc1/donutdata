'use client';

import { useState } from 'react';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQ[];
}

export default function FAQSection({ title = '자주 묻는 질문.', faqs }: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="bg-apple-grey px-[22px] py-12">
      <h2 className="text-[28px] font-bold tracking-[-0.03em] mb-6 text-center">{title}</h2>
      <div className="bg-apple-white rounded-card overflow-hidden">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`px-5 py-[18px] cursor-pointer ${
              idx < faqs.length - 1 ? 'border-b border-apple-divider/50' : ''
            }`}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <div className="flex items-center justify-between text-base font-medium tracking-[-0.02em]">
              <span>{faq.q}</span>
              <span
                className={`text-apple-text-2 text-[22px] font-extralight leading-none transition-transform duration-200 ${
                  openIdx === idx ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </div>
            {openIdx === idx && (
              <div className="mt-2.5 text-sm text-apple-text-2 leading-[1.5] tracking-[-0.01em]">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
