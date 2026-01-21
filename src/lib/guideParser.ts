const ICON_MAP: Record<string, string> = {
  ice: "/icons/ice.webp",
  aaa: "/icons/aaa.webp",
  pr: "/icons/pr.webp",
  physical: "/icons/physical.webp",
  pen: "/icons/pen.webp",
  imp: "/icons/imp.webp",
  fire: "/icons/fire.webp",
  hp: "/icons/hp.webp",
  ether: "/icons/ether.webp",
  er: "/icons/er.webp",
  elec: "/icons/elec.webp",
  def: "/icons/def.webp",
  cr: "/icons/cr.webp",
  cd: "/icons/cd.webp",
  atk: "/icons/atk.webp",
  ap: "/icons/ap.webp",
  am: "/icons/am.webp",
};

/**
 * Parse guide text with icon tags, markdown formatting
 * Supports: <icon>, **bold**, *italic*, ~~strikethrough~~, __underline__
 */
export function parseGuideText(text: string): string {
  if (!text) return "";

  let result = text;

  // Replace icon tags: <atk> -> <img src="/icons/atk.webp" />
  result = result.replace(/<(\w+)>/g, (match, iconName) => {
    const iconPath = ICON_MAP[iconName.toLowerCase()];
    if (iconPath) {
      return `<img src="${iconPath}" alt="${iconName}" class="inline-icon" />`;
    }
    return match;
  });

  // Bold: **text** -> <strong>text</strong>
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic: *text* -> <em>text</em>
  result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");

  // Strikethrough: ~~text~~ -> <del>text</del>
  result = result.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // Underline: __text__ -> <u>text</u>
  result = result.replace(/__(.+?)__/g, "<u>$1</u>");

  // Line breaks: \n -> <br />
  result = result.replace(/\n/g, "<br />");

  return result;
}

/**
 * Get icon URL by name
 */
export function getIconUrl(iconName: string): string | null {
  return ICON_MAP[iconName.toLowerCase()] || null;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Get rarity color class (rarity can be number like 4/5 or string like "S"/"A")
 */
export function getRarityColor(rarity: string | number): string {
  const rarityValue = typeof rarity === "number" ? rarity : rarity.toUpperCase();

  switch (rarityValue) {
    case 5:
    case "S":
      return "text-amber-400";
    case 4:
    case "A":
      return "text-purple-400";
    default:
      return "text-gray-400";
  }
}

/**
 * Format rarity for display
 */
export function formatRarity(rarity: string | number): string {
  if (typeof rarity === "number") {
    return rarity === 5 ? "S" : rarity === 4 ? "A" : String(rarity);
  }
  return rarity;
}

// Element IDs from ZZZ game data
const ELEMENT_MAP: Record<number, { name: string; color: string }> = {
  200: { name: "Physical", color: "text-gray-400" },
  201: { name: "Fire", color: "text-orange-400" },
  202: { name: "Ice", color: "text-cyan-400" },
  203: { name: "Electric", color: "text-yellow-400" },
  205: { name: "Ether", color: "text-pink-400" },
};

// Specialty IDs from ZZZ game data
const SPECIALTY_MAP: Record<number, string> = {
  1: "Attack",
  2: "Stun",
  3: "Anomaly",
  4: "Support",
  5: "Defense",
};

/**
 * Get element color class (element can be number ID or string name)
 */
export function getElementColor(element: string | number): string {
  if (typeof element === "number") {
    return ELEMENT_MAP[element]?.color || "text-white";
  }
  const elementLower = element.toLowerCase();
  switch (elementLower) {
    case "fire":
      return "text-orange-400";
    case "ice":
      return "text-cyan-400";
    case "electric":
    case "elec":
      return "text-yellow-400";
    case "ether":
      return "text-pink-400";
    case "physical":
      return "text-gray-400";
    default:
      return "text-white";
  }
}

/**
 * Format element for display (convert ID to name)
 */
export function formatElement(element: string | number): string {
  if (typeof element === "number") {
    return ELEMENT_MAP[element]?.name || "Unknown";
  }
  return element;
}

/**
 * Format specialty for display (convert ID to name)
 */
export function formatSpecialty(specialty: string | number): string {
  if (typeof specialty === "number") {
    return SPECIALTY_MAP[specialty] || "Unknown";
  }
  return specialty;
}
