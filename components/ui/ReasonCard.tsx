interface ReasonCardProps {
  title: string;
  meta: string;
  linkText: string;
  featured?: boolean;
  href?: string;
}

export default function ReasonCard({ title, meta, linkText, featured = false }: ReasonCardProps) {
  const base = featured
    ? 'bg-gradient-to-br from-apple-blue to-[#1d4ed8] text-white'
    : 'bg-apple-white';

  const titleColor = featured ? 'text-white' : 'text-apple-text';
  const metaColor = featured ? 'text-white/80' : 'text-apple-text-2';
  const linkColor = featured ? 'text-white' : 'text-apple-blue';

  return (
    <div className={`${base} rounded-card px-[22px] py-5 grid grid-cols-[1fr_auto] gap-3.5 items-center cursor-pointer`}>
      <div className="min-w-0">
        <div className={`text-[19px] font-semibold tracking-[-0.02em] mb-[3px] ${titleColor}`}>
          {title}
        </div>
        <div className={`text-xs ${metaColor} tracking-[-0.005em]`}>{meta}</div>
      </div>
      <span className={`${linkColor} text-[15px] font-normal tracking-[-0.02em] whitespace-nowrap`}>
        {linkText}<span className="font-light"> ›</span>
      </span>
    </div>
  );
}
