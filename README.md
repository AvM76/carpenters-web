# AVM Timber Design — website

Every photo on the site comes from a folder. To change a photo, change what's
in its folder. You never need to touch any code.

All the photo folders are in **`src/assets/`**.

---

## How to upload or delete a file on GitHub

- **Upload:** open the folder → **Add file** → **Upload files** → drag photos
  in → green **Commit changes** button.
- **Delete:** click the photo → **⋯** menu (top right) → **Delete file** →
  **Commit changes**.

The live site updates by itself a couple of minutes later.

---

## The work galleries

📁 `src/assets/work/`

Each folder inside is one section of the site:

```
04 Kitchens
03 Bedrooms
02 Bathrooms
01 Furniture
```

- **Add a photo:** upload it into the right folder.
- **Order of sections:** highest number comes first. The number isn't shown
  on the site, so `04 Kitchens` shows up as **Kitchens**.
- **Add a new section:** upload a photo and, on the upload page, type the new
  folder name in front of the file name, e.g. `05 Staircases/photo.jpg`.
  GitHub creates the folder. A button for it appears on the site
  automatically.
- **Order of photos:** by file name, Z to A. To put new work first, start
  the name with the date, e.g. `2026-10-oak-table.jpg`.

---

## The big top photo

📁 `src/assets/top-photo/`

Keep **one** photo in here. To change it: delete the old one, upload the new
one.

## The large featured photo

📁 `src/assets/featured-photo/`

Same as above: keep **one** photo in here.

## Anne's photo (About section)

📁 `src/assets/anne-photo/`

Upload **one** photo of Anne here. Until there is one, the site shows a
grey "portrait" placeholder.

---

## Good to know

- Photos can be any size, straight off a phone. The site shrinks them.
- Use **JPG** or **PNG**. iPhone **HEIC** photos won't show. If a photo goes
  missing, that's usually why.
- Contact details (email, phone, Instagram) are in `src/site.ts`. Change the
  text between the quotes.
- The wording on the page is in `src/pages/index.astro`.
- The `/admin` page is left over from an older design and isn't used.

---

## Hosting (already set up)

The site is hosted on **Cloudflare Pages**. Anything saved to the `main`
branch goes live automatically. For reference, the build settings are:
build command `npm run build`, environment variable `NODE_VERSION` = `22`.

---

## For developers

Astro 6 single page. Photo folders are read in `src/photos.ts`; the galleries
and jump buttons are in `src/components/Gallery.astro`. Preview locally with
`npm install` then `npm run dev`.
