# Travis Crawford — portfolio

Source for [traviscrawforddesign.com](https://traviscrawforddesign.com). React + Vite, deployed on Vercel.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Where things live

- `src/pages/` — one file per route (Home, Projects, Posters, Experiments, Logo brief, case studies)
- `src/data/projects.js` — case study content: titles, tags, copy, images
- `src/data/posters.js`, `src/data/experiments.js` — archive content
- `src/styles/brand.css` — the Travis Crawford brand layer (colors, type, components)
- `src/index.css` — base styles from the earlier site that pages still use
- `api/` — Vercel function that emails the logo brief as a PDF
- `public/images/` — project images

## Adding images

Export images at most 2400px wide, as WebP for gallery images or JPEG for
covers that may be used as social previews. Keep single files under about
1 MB so pages load quickly on phones.
