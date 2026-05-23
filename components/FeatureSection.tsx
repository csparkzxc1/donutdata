interface FeatureSectionProps {
  eyebrow?: string;
  title: string;
  titleLight?: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function FeatureSection({ eyebrow, title, titleLight, subtitle, children }: FeatureSectionProps) {
  return (
    <div className="bg-apple-black text-white px-[22px] py-14 text-center">
      {eyebrow && (
        <div className="text-accent text-sm font-semibold tracking-[0.02em] mb-2.5 uppercase">
          {eyebrow}
        </div>
      )}
      <h2 className="text-[40px] font-bold tracking-[-0.035em] leading-[1.05] mb-3">
        {title}
        {titleLight && (
          <>
            <br />
            <span className="font-extralight">{titleLight}</span>
          </>
        )}
      </h2>
      <p className="text-[19px] text-[#f5f5f7] font-normal tracking-[-0.02em] leading-[1.3] mb-8 max-w-[320px] mx-auto">
        {subtitle}
      </p>
      {children}
    </div>
  );
}
