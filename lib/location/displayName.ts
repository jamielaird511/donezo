/**
 * Normalizes city display names by mapping known aliases to their canonical names.
 * @param city - The city name to normalize
 * @returns The normalized city name, or the original if no mapping exists
 */
export function displayCity(city?: string): string {
  if (!city) {
    return "";
  }

  const cityMap: Record<string, string> = {
    "Tāhuna": "Queenstown",
    "Tahuna": "Queenstown",
  };

  const normalized = city.trim();
  return cityMap[normalized] || city;
}



