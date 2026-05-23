import type { MetadataRoute } from 'next';
import { getCityData, getAllCityDataFiles } from '@/lib/data';

const BASE_URL = 'https://waste.donutdata.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/app`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const files = getAllCityDataFiles();
  for (const file of files) {
    const [sido, sigungu] = file.replace('.json', '').split('-');
    const city = getCityData(sido, sigungu);
    if (!city) continue;

    entries.push({
      url: `${BASE_URL}/large/${city.sidoSlug}/${city.sigunguSlug}`,
      lastModified: new Date(city.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    for (const item of city.items) {
      entries.push({
        url: `${BASE_URL}/large/${city.sidoSlug}/${city.sigunguSlug}/${item.nameSlug}`,
        lastModified: new Date(city.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
