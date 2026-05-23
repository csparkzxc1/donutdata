import Link from 'next/link';

interface AppleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AppleLink({ href, children, className = '' }: AppleLinkProps) {
  return (
    <Link
      href={href}
      className={`text-apple-blue text-[17px] font-normal tracking-[-0.02em] inline-flex items-center gap-1 hover:underline ${className}`}
    >
      {children}
      <span className="font-light"> ›</span>
    </Link>
  );
}
