import type { ParsedGuideWithId } from "szgf";

const GITHUB_API_URL =
  "https://api.github.com/repos/seriaati/szgf/contents/guides/parsed";
const RAW_CONTENT_URL =
  "https://raw.githubusercontent.com/seriaati/szgf/main/guides/parsed";

interface GithubContentItem {
  name: string;
  path: string;
  type: string;
  download_url: string;
}

let guidesCache: Record<string, ParsedGuideWithId> | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchGuides(): Promise<Record<string, ParsedGuideWithId>> {
  const now = Date.now();

  if (guidesCache && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    return guidesCache;
  }

  // Fetch list of guide files from GitHub API
  const listResponse = await fetch(GITHUB_API_URL);
  if (!listResponse.ok) {
    throw new Error(`Failed to fetch guide list: ${listResponse.statusText}`);
  }

  const files: GithubContentItem[] = await listResponse.json();
  const jsonFiles = files.filter(
    (f) => f.type === "file" && f.name.endsWith(".json")
  );

  // Fetch all guide files in parallel
  const guidePromises = jsonFiles.map(async (file) => {
    const response = await fetch(`${RAW_CONTENT_URL}/${file.name}`);
    if (!response.ok) {
      console.warn(`Failed to fetch ${file.name}`);
      return null;
    }
    const guide: ParsedGuideWithId = await response.json();
    return guide;
  });

  const guides = await Promise.all(guidePromises);

  // Build record keyed by character ID
  const guidesMap: Record<string, ParsedGuideWithId> = {};
  for (const guide of guides) {
    if (guide && guide.character?.id) {
      guidesMap[guide.character.id] = guide;
    }
  }

  guidesCache = guidesMap;
  lastFetchTime = now;

  return guidesMap;
}

export async function fetchGuide(
  characterId: string
): Promise<ParsedGuideWithId | null> {
  const guides = await fetchGuides();
  return guides[characterId] || null;
}

export function getGuidesSortedByLastUpdated(
  guides: Record<string, ParsedGuideWithId>
): ParsedGuideWithId[] {
  return Object.values(guides).sort((a, b) => {
    const dateA = new Date(a.last_updated).getTime();
    const dateB = new Date(b.last_updated).getTime();
    return dateB - dateA;
  });
}

export function searchGuides(
  guides: ParsedGuideWithId[],
  query: string
): ParsedGuideWithId[] {
  if (!query.trim()) return guides;

  const lowerQuery = query.toLowerCase();
  return guides.filter((guide) =>
    guide.character.name.toLowerCase().includes(lowerQuery)
  );
}
