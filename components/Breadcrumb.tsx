import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-apple-off px-[22px] py-2 text-[11px] text-apple-text-2 border-b border-apple-divider/50">
      {items.map((item, idx) => (
        <span key={idx}>
          {idx > 0 && <span className="mx-[5px]">›</span>}
          {item.href ? (
            <Link href={item.href} className="text-apple-text-2 no-underline hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-apple-text font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
