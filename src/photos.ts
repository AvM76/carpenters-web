/* Every photo on the site comes from a folder in src/assets — no code to
   edit when photos change. See README.md for the folder-by-folder guide. */
import type { ImageMetadata } from 'astro';

type Mods = Record<string, { default: ImageMetadata }>;

// A single `*` pattern (filtered below) avoids the duplicate matches a
// {jpg,JPG} brace list causes on case-insensitive filesystems.
const isImage = (p: string) => /\.(jpe?g|png|webp|avif)$/i.test(p);

/** Z→A by path, so date-prefixed names (2026-05-…) put the newest first. */
const zToA = (a: string, b: string) => b.localeCompare(a, undefined, { numeric: true });

const images = (mods: Mods) =>
  Object.entries(mods)
    .filter(([p]) => isImage(p))
    .sort(([a], [b]) => zToA(a, b))
    .map(([path, m]) => ({ path, img: m.default }));

/** The one photo in a single-photo folder (top-sorted if there are several). */
const first = (mods: Mods) => images(mods)[0]?.img;

export const topPhoto = first(
  import.meta.glob<{ default: ImageMetadata }>('./assets/top-photo/*', { eager: true }),
);
export const featuredPhoto = first(
  import.meta.glob<{ default: ImageMetadata }>('./assets/featured-photo/*', { eager: true }),
);
/** Undefined until a photo is dropped into src/assets/anne-photo/. */
export const annePhoto = first(
  import.meta.glob<{ default: ImageMetadata }>('./assets/anne-photo/*', { eager: true }),
);

/* Work sections: each folder in src/assets/work/ is a section. Folders sort
   Z→A ("04 Kitchens" above "01 Furniture"); the number is dropped from the
   title shown on the site. */
const workMods = import.meta.glob<{ default: ImageMetadata }>('./assets/work/*/*', {
  eager: true,
});

export interface WorkSection {
  id: string;
  title: string;
  photos: ImageMetadata[];
}

export const workSections: WorkSection[] = (() => {
  const byFolder = new Map<string, ImageMetadata[]>();
  for (const { path, img } of images(workMods)) {
    const folder = path.split('/').at(-2)!;
    byFolder.set(folder, [...(byFolder.get(folder) ?? []), img]);
  }
  return [...byFolder.keys()].sort(zToA).map((folder) => {
    const title = folder.replace(/^\d+[\s._-]*/, '').trim() || folder;
    return {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      title,
      photos: byFolder.get(folder)!,
    };
  });
})();
