interface PriceDisplayProps {
  label: string;
  amount: string;
}

export default function PriceDisplay({ label, amount }: PriceDisplayProps) {
  return (
    <div>
      <div className="text-sm text-apple-text-2 mb-1 tracking-[-0.01em]">{label}</div>
      <div className="text-[88px] font-bold tracking-[-0.05em] leading-none text-apple-text tabular-nums mb-2">
        {amount}
        <span className="text-[36px] font-normal ml-1 tracking-[-0.03em]">원</span>
      </div>
    </div>
  );
}
