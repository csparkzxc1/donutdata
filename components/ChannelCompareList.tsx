import type { WasteApp } from '@/data/apps';

interface ChannelCompareListProps {
  apps: WasteApp[];
  recommended?: string;
}

export default function ChannelCompareList({ apps, recommended }: ChannelCompareListProps) {
  return (
    <div className="flex flex-col gap-px bg-apple-divider-dark rounded-card overflow-hidden max-w-[380px] mx-auto text-left">
      {apps.map(app => {
        const isFeatured = app.id === recommended;
        return (
          <div
            key={app.id}
            className={`bg-[#1d1d1f] px-5 py-[18px] grid grid-cols-[1fr_auto] items-center gap-3 cursor-pointer hover:bg-[#2d2d2f] ${
              isFeatured ? 'bg-gradient-to-br from-[#1d1d1f] to-[#2a1d1a] border-l-[3px] border-l-accent !pl-[17px]' : ''
            }`}
          >
            <div>
              <div className="text-[19px] font-semibold tracking-[-0.02em] text-white mb-[3px]">
                {app.name}
                {isFeatured && (
                  <span className="inline-block ml-2 text-[11px] font-medium text-accent border border-accent px-1.5 py-px rounded align-[3px] tracking-normal">
                    RECOMMENDED
                  </span>
                )}
              </div>
              <div className="text-[13px] text-apple-text-3 tracking-[-0.01em]">
                {app.description.split('.')[0]} · 약 {app.avgTime}분
              </div>
            </div>
            <span className="text-white text-[22px] font-extralight opacity-60">›</span>
          </div>
        );
      })}
    </div>
  );
}
