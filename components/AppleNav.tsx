import Link from 'next/link';

export default function AppleNav() {
  return (
    <nav className="sticky top-0 z-50 bg-apple-off/80 backdrop-blur-xl backdrop-saturate-[180%] px-[22px] h-12 flex items-center justify-between border-b border-apple-divider/50">
      <Link href="/" className="text-[17px] font-semibold tracking-[-0.02em] text-apple-text">
        <span className="text-apple-blue mr-[1px]">●</span> 폐기물 정보
      </Link>
      <div className="flex items-center gap-[18px]">
        <svg className="w-[18px] h-[18px] text-apple-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <svg className="w-[18px] h-[18px] text-apple-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </div>
    </nav>
  );
}
