# SZGF Website - AI Coding Instructions

## Project Overview
This is a React + TypeScript website for the SZGF (Standardized Zenless Zone Zero Guide Format) standard. It displays guides for game characters fetched from GitHub, along with SDKs, applications, and changelog information.

**Architecture**: SPA using React Router, TanStack Query for data fetching, shadcn/ui components with Radix UI primitives, Tailwind CSS for styling.

## Key Components & Data Flow

### Guide System (`src/services/guideService.ts`, `src/lib/guideParser.ts`)
- **Fetches parsed guides** from `https://api.github.com/repos/seriaati/szgf/contents/guides/parsed`
- **5-minute cache** for guide data to reduce API calls
- Guides are keyed by character ID in a record structure
- The `szgf` npm package (v0.1.5+) provides TypeScript types like `ParsedGuideWithId`

### Custom Text Parsing (`src/lib/guideParser.ts`)
SZGF guides use custom syntax that must be parsed:
- **Icons**: `<atk>`, `<cd>`, `<ice>` → inline images from `/public/icons/`
- **Markdown**: `**bold**`, `*italic*`, `~~strikethrough~~`, `__underline__`
- Icon map is centralized in `ICON_MAP` constant
- Use `parseGuideText()` for all guide content display
- Use `PLACEHOLDER_WENGINE_ICON` for missing W-Engine icons (SVG data URI)

### Component Structure
- **Pages** (`src/pages/`): Route-level components with full layouts (Header + content + Footer)
- **Components** (`src/components/`): Reusable UI blocks (Hero, Features, etc.)
- **UI Components** (`src/components/ui/`): shadcn/ui primitives (DO NOT modify manually, use shadcn CLI)

### Data Files (`src/data/`)
Static JSON files for:
- `applications.json`: Projects using SZGF (id, name, description, url, banner, tags)
- `sdks.json`: Available SDKs (Python, TypeScript with install commands and examples)
- `changelog.json`: Version history

## Development Workflow

### Build & Dev Commands (Bun)
```bash
bun run dev          # Development server on localhost:8080
bun run build        # Production build
bun run build:dev    # Development mode build
bun run preview      # Preview production build
bun run test         # Run tests once
bun run test:watch   # Watch mode testing
bun run lint         # ESLint check
```

**Note**: This project uses **Bun** as the package manager (see `bun.lockb`). Use `bun install`, `bun add`, etc.

### Adding shadcn/ui Components
```bash
npx shadcn@latest add <component-name>
```
Components auto-generate in `src/components/ui/` with proper Tailwind classes and TypeScript types.

### Vite Configuration (`vite.config.ts`)
- Uses React SWC for faster builds
- Path alias: `@` → `src/`
- Dev server runs on `::` (IPv6) port 8080
- `lovable-tagger` plugin in development mode only

## Code Conventions

### Styling
- **Tailwind utility-first**: Use `className` with Tailwind utilities
- **Design tokens**: Use CSS variables (`hsl(var(--primary))`) defined in Tailwind config
- **Responsive**: Mobile-first with `sm:`, `lg:` breakpoints
- **Dark mode**: Configured via `darkMode: ["class"]` in Tailwind

### Component Patterns
```tsx
// Typical page structure
const PageName = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{/* content */}</main>
      <Footer />
    </div>
  );
};
```

### Data Fetching with TanStack Query
```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ["guide", characterId],
  queryFn: () => fetchGuide(characterId!),
  enabled: !!characterId, // Conditional fetching
});
```

### Route Structure (`src/App.tsx`)
- `/` - Homepage
- `/changelog` - Version history
- `/applications` - Projects using SZGF
- `/sdk` - SDK documentation
- `/guides` - Guide list
- `/guides/:characterId` - Individual guide detail
- `*` - 404 page

## External Dependencies

### SZGF Ecosystem
- **Main repo**: `https://github.com/seriaati/szgf` (Python SDK + guide definitions)
- **TypeScript SDK**: `https://github.com/seriaati/szgf/tree/main/szgf-ts`
- **Generator**: `https://generator.szgf.seria.moe`
- **Docs**: `https://docs.szgf.seria.moe`

### Icon System
All game stat/skill icons are stored in `/public/icons/` as WebP files. Icon names match the SZGF standard (lowercase: `atk`, `cd`, `cr`, `ice`, `fire`, etc.).

## Testing

- Uses **Vitest** with jsdom environment
- Test files in `src/test/`
- Setup file: `src/test/setup.ts`
- Testing Library React for component tests

## Common Tasks

**Adding a new page**:
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx` Routes
3. Add nav link in `src/components/Header.tsx` if needed

**Adding new icons**:
1. Add WebP icon to `/public/icons/`
2. Add entry to `ICON_MAP` in `src/lib/guideParser.ts`

**Updating guide data source**:
Modify constants in `src/services/guideService.ts` (API URL, cache duration, etc.)
