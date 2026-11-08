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

let guidesPromise: Promise<Record<string, ParsedGuideWithId>> | null = null;

// Called once per build; every page shares the same result.
export function fetchGuides(): Promise<Record<string, ParsedGuideWithId>> {
  guidesPromise ??= loadGuides();
  return guidesPromise;
}

async function loadGuides(): Promise<Record<string, ParsedGuideWithId>> {
  // Unauthenticated GitHub API calls are limited to 60/hour per IP, which shared build machines can hit.
  const token = import.meta.env.GITHUB_TOKEN;
  const listResponse = await fetch(GITHUB_API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!listResponse.ok) {
    throw new Error(`Failed to fetch guide list: ${listResponse.statusText}`);
  }

  const files: GithubContentItem[] = await listResponse.json();
  const jsonFiles = files.filter(
    (f) => f.type === "file" && f.name.endsWith(".json")
  );

  const guides = await Promise.all(
    jsonFiles.map(async (file) => {
      const response = await fetch(`${RAW_CONTENT_URL}/${file.name}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${file.name}: ${response.statusText}`);
      }
      const guide: ParsedGuideWithId = await response.json();
      return guide;
    })
  );

  const guidesMap: Record<string, ParsedGuideWithId> = {};
  for (const guide of guides) {
    if (guide.character?.id) {
      guidesMap[guide.character.id] = guide;
    }
  }

  return guidesMap;
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
