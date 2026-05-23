# waste.donutdata.kr

Next.js 14+ (App Router) + Tailwind CSS + TypeScript.
정적 SEO 사이트 — 전국 폐기물 수수료·신고 채널 비교.

## Commands
- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint

## Architecture
- Data: static JSON in `data/large-waste/`
- Pages: SSG + ISR for item detail pages
- Design: Apple.com style (Pretendard, weight 700/200 contrast, alternating sections)
