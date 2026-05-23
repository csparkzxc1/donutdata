import AppleLink from './AppleLink';

interface TileProps {
  variant?: 'light' | 'dark';
  eyebrow?: string;
  title: string;
  titleLight?: string;
  subtitle: string;
  links?: { label: string; href: string }[];
  statNumber?: string;
  statUnit?: string;
  className?: string;
  compact?: boolean;
}

export default function Tile({
  variant = 'light',
  eyebrow,
  title,
  titleLight,
  subtitle,
  links,
  statNumber,
  statUnit,
  className = '',
  compact = false,
}: TileProps) {
  const isDark = variant === 'dark';
  const bg = isDark ? 'bg-apple-black text-white' : 'bg-apple-grey';
  const titleColor = isDark ? 'text-white' : 'text-apple-text';
  const eyebrowColor = isDark ? 'text-apple-text-3' : 'text-apple-text-2';
  const subtitleColor = isDark ? 'text-[#f5f5f7]' : 'text-apple-text-2';
  const linkColor = isDark ? '!text-[#2997ff]' : '';
  const titleSize = compact ? 'text-2xl' : 'text-[32px]';
  const subtitleSize = compact ? 'text-sm' : 'text-[17px]';
  const statSize = compact ? 'text-[56px]' : 'text-[84px]';
  const statUnitSize = compact ? 'text-[22px]' : 'text-[36px]';
  const padding = compact ? 'px-[18px] py-7' : 'px-6 pt-10 pb-9';
  const visualHeight = compact ? 'h-[72px]' : 'h-[100px]';

  return (
    <div className={`${bg} rounded-tile text-center relative overflow-hidden ${padding} ${className}`}>
      {eyebrow && (
        <div className={`text-xs ${eyebrowColor} font-medium tracking-[-0.005em] mb-2 uppercase`}>
          {eyebrow}
        </div>
      )}
      <h3 className={`${titleSize} font-bold tracking-[-0.03em] leading-[1.1] mb-1.5 ${titleColor}`}>
        {title}
        {titleLight && (
          <>
            <br />
            <span className="font-extralight">{titleLight}</span>
          </>
        )}
      </h3>
      <p className={`${subtitleSize} ${subtitleColor} font-normal tracking-[-0.02em] leading-[1.3] mb-5 max-w-[280px] mx-auto`}>
        {subtitle}
      </p>
      {links && links.length > 0 && (
        <div className="mb-[18px] flex justify-center gap-5">
          {links.map(link => (
            <AppleLink key={link.label} href={link.href} className={`${linkColor} ${compact ? '!text-sm' : ''}`}>
              {link.label}
            </AppleLink>
          ))}
        </div>
      )}
      {statNumber && (
        <div className={`mt-3 ${visualHeight} flex items-center justify-center`}>
          <span className={`${statSize} font-bold tracking-[-0.05em] leading-none ${titleColor} tabular-nums`}>
            {statNumber}
            {statUnit && <span className={`${statUnitSize} font-normal ml-0.5 tracking-[-0.03em]`}>{statUnit}</span>}
          </span>
        </div>
      )}
    </div>
  );
}
