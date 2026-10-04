import type { SearchItem } from "@/lib/buildSearchIndex";

// Filter the flat index by title — used while the user types
export function filterSearchIndex(
  index: SearchItem[],
  searchText: string
): SearchItem[] {
  const query = searchText.trim().toLowerCase();
  if (query === "") return [];
  return index.filter((item) => item.title.toLowerCase().includes(query));
}
