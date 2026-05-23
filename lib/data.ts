import fs from 'fs';
import path from 'path';
import type { CityLargeWaste } from './format';

export type { WasteItem, CityLargeWaste } from './format';
export { formatPrice, getCategories, getSimilarItems } from './format';

export function getCityData(sidoSlug: string, sigunguSlug: string): CityLargeWaste | null {
  const filePath = path.join(process.cwd(), 'data', 'large-waste', `${sidoSlug}-${sigunguSlug}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as CityLargeWaste;
  } catch {
    return null;
  }
}

export function getItemData(sidoSlug: string, sigunguSlug: string, itemSlug: string) {
  const city = getCityData(sidoSlug, sigunguSlug);
  if (!city) return null;
  const item = city.items.find(i => i.nameSlug === itemSlug);
  if (!item) return null;
  return { city, item };
}

export function getAllCityDataFiles(): string[] {
  const dir = path.join(process.cwd(), 'data', 'large-waste');
  try {
    return fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  } catch {
    return [];
  }
}
