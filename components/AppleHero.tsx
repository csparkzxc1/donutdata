import AppleLink from './AppleLink';

interface AppleHeroProps {
  titleBold: string;
  titleLight: string;
  subtitle: string;
  links?: { label: string; href: string }[];
  size?: 'large' | 'medium';
}

export default function AppleHero({ titleBold, titleLight, subtitle, links, size = 'large' }: AppleHeroProps) {
  const titleSize = size === 'large' ? 'text-[52px]' : 'text-[44px]';

  return (
    <div className="bg-apple-white px-[22px] py-14 text-center" style={{ paddingTop: size === 'large' ? 56 : 48, paddingBottom: size === 'large' ? 48 : 40 }}>
      <h1 className={`${titleSize} font-bold tracking-[-0.04em] leading-[1.04] text-apple-text mb-3.5`}>
        {titleBold}<br />
        <span className="font-extralight">{titleLight}</span>
      </h1>
      <p className="text-[21px] font-normal text-apple-text tracking-[-0.02em] leading-[1.2] mb-7 max-w-[320px] mx-auto">
        {subtitle}
      </p>
      {links && links.length > 0 && (
        <div className="flex justify-center gap-6 items-center">
          {links.map(link => (
            <AppleLink key={link.label} href={link.href}>{link.label}</AppleLink>
          ))}
        </div>
      )}
    </div>
  );
}
