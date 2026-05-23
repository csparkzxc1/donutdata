export interface WasteItem {
  id: string;
  name: string;
  nameSlug: string;
  category: string;
  spec: string;
  fee: number;
}

export interface CityLargeWaste {
  sido: string;
  sidoSlug: string;
  sigungu: string;
  sigunguSlug: string;
  department: {
    name: string;
    phone: string;
  };
  updatedAt: string;
  items: WasteItem[];
}

export function formatPrice(fee: number): string {
  return fee.toLocaleString('ko-KR');
}

export function getCategories(items: WasteItem[]): string[] {
  return [...new Set(items.map(i => i.category))];
}

export function getSimilarItems(items: WasteItem[], currentItem: WasteItem, limit = 4): WasteItem[] {
  return items
    .filter(i => i.id !== currentItem.id && i.category === currentItem.category)
    .slice(0, limit);
}
