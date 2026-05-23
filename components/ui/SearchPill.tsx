'use client';

interface SearchPillProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'default' | 'white';
}

export default function SearchPill({ placeholder = '예: 화성시 소파', value, onChange, variant = 'default' }: SearchPillProps) {
  const bg = variant === 'white' ? 'bg-apple-white' : 'bg-apple-grey';

  return (
    <div className={`${bg} rounded-pill px-[22px] py-3.5 flex items-center gap-3 cursor-text`}>
      <svg className="w-[18px] h-[18px] text-apple-text-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="flex-1 border-none outline-none bg-transparent text-[17px] text-apple-text font-sans tracking-[-0.02em] placeholder:text-apple-text-3"
      />
    </div>
  );
}
