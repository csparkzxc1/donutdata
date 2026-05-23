import Link from 'next/link';

interface AppleFooterProps {
  variant?: 'full' | 'compact';
  dataSource?: string;
}

export default function AppleFooter({ variant = 'full', dataSource }: AppleFooterProps) {
  if (variant === 'compact') {
    return (
      <footer className="bg-apple-off px-[22px] py-6 border-t border-apple-divider/50 text-xs text-apple-text-2">
        {dataSource && <div>{dataSource}</div>}
        {!dataSource && <div>Copyright &copy; 2026 DonutData. All rights reserved.</div>}
      </footer>
    );
  }

  return (
    <footer className="bg-apple-off px-[22px] pt-6 pb-7 border-t border-apple-divider/50 text-xs text-apple-text-2 leading-[1.4]">
      <div className="grid grid-cols-2 gap-6 mb-6 pb-5 border-b border-apple-divider/50">
        <div>
          <h5 className="text-xs text-apple-text font-semibold mb-2 tracking-[-0.01em]">섹션</h5>
          <Link href="/" className="block text-apple-text-2 no-underline py-[3px] text-xs hover:underline hover:text-apple-text">대형폐기물</Link>
          <Link href="/" className="block text-apple-text-2 no-underline py-[3px] text-xs hover:underline hover:text-apple-text">종량제봉투</Link>
          <Link href="/" className="block text-apple-text-2 no-underline py-[3px] text-xs hover:underline hover:text-apple-text">무상수거</Link>
          <Link href="/" className="block text-apple-text-2 no-underline py-[3px] text-xs hover:underline hover:text-apple-text">과태료</Link>
          <Link href="/app" className="block text-apple-text-2 no-underline py-[3px] text-xs hover:underline hover:text-apple-text">앱 비교</Link>
        </div>
        <div>
          <h5 className="text-xs text-apple-text font-semibold mb-2 tracking-[-0.01em]">도넛데이터</h5>
          <Link href="/" className="block text-apple-text-2 no-underline py-[3px] text-xs hover:underline hover:text-apple-text">소개</Link>
          <Link href="/" className="block text-apple-text-2 no-underline py-[3px] text-xs hover:underline hover:text-apple-text">데이터 출처</Link>
          <Link href="/" className="block text-apple-text-2 no-underline py-[3px] text-xs hover:underline hover:text-apple-text">면책 조항</Link>
          <Link href="/" className="block text-apple-text-2 no-underline py-[3px] text-xs hover:underline hover:text-apple-text">피드백</Link>
        </div>
      </div>
      <div className="text-[11px] text-apple-text-3">
        Copyright &copy; 2026 DonutData. All rights reserved.
        <br /><br />
        <Link href="/" className="text-apple-text-2 no-underline mr-3.5">개인정보처리방침</Link>
        <Link href="/" className="text-apple-text-2 no-underline">이용약관</Link>
      </div>
    </footer>
  );
}
