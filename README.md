# VisualSpam

VisualSpam is a personal art site for experimental audiovisual work. It is built with Next.js, Tailwind CSS and Supabase.

Live site: https://visualspam.vercel.app

## What it does

Every page sits on a full-screen looping video background hosted on Cloudinary. The home page shows a large glitching "visualspam" wordmark, a floating central image, and floating, tilted menu tiles. The tiles are:

| Tile | Route | Status in the code |
| --- | --- | --- |
| INFO | `/info` | Live. Shows an About text and links to GitHub, Instagram and email. |
| VISUALS | `/visuals` | Coming soon. |
| BLOG | `/notes` | Coming soon. |
| PROJECTS | `/work` | Coming soon. |
| AUDIO | `/files` | Coming soon. |
| SHOWS | `/live` | Coming soon. |
| VIDEO LOG | external | Live. Opens the separate video-log site in a new tab. |

The VIDEO LOG tile opens `https://www.visualspam.et` by default. You can point it somewhere else with `NEXT_PUBLIC_VIDEO_LOG_URL`.

The home page header also links to Instagram and Telegram. On every other page, the header shows only a "visualspam" link back to the home page.

Other routes:

- `/jan-14`: "A Little Taste of Jan-14", the event page for a live coding and DJ night. It has a live coding video (hosted on Cloudinary), a "Surprise DJ" block, spectrum, waveform and particles tiles, and an "AV Experience" block. None of the home tiles link to it, so you have to open the URL directly.
- `/notes/[id]` and `/work/[id]`: detail pages for blog posts and projects. They look up hard-coded sample data, then show "check again after 5 days" or a not-found message.
- `/admin`: Supabase email and password sign-in, with a sign-up option. The code includes fetch, create, update and delete functions for a `projects` table. Once signed in, the page only shows "check again after 5 days", so the management UI isn't built yet.
- `/signal`: Supabase sign-in for a private analytics view. After sign-in it loads mock numbers, not real analytics, and the page shows "check again after 5 days".

The Visuals, Blog, Projects, Audio and Shows pages already contain sample data in the code (placeholder images and sample media URLs), but they currently render only a "Coming soon" message.

## Tech stack

- Next.js 16 (App Router), React 18, TypeScript
- Tailwind CSS 3, with custom CSS keyframes for the float, button-float and glitch effects
- Supabase JS client (`@supabase/supabase-js`), used for auth on `/admin` and `/signal`
- Framer Motion (a dependency, but not imported by any page right now)
- Fonts: Barriecito (Google Fonts) and Extenda 30 Deca (onlinewebfonts)
- Media hosted on Cloudinary (`res.cloudinary.com` is allowed in `next.config.js`)

## Project structure

```
src/app/layout.tsx     Root layout: video background, header, metadata and Open Graph tags
src/app/Header.tsx     Header: social links on the home page, a home link on other pages
src/app/page.tsx       Home page with the menu tiles and video log link
src/app/loading.tsx    Loading spinner
src/app/info/          About and links
src/app/visuals/, notes/, work/, files/, live/   Sections that show "Coming soon"
src/app/jan-14/        Live coding and DJ event page
src/app/admin/, signal/  Supabase-authenticated pages
src/app/globals.css    Fonts, animations and 3D button styles
src/lib/supabase.ts    Supabase client
public/                favicon.ico
```

## Run it locally

Requirements: Node.js 20.9 or later (needed by Next.js 16).

```bash
npm install
# create .env.local with the variables below
npm run dev      # http://localhost:3000
npm run build
npm run start
```

`src/lib/supabase.ts` creates the Supabase client when the module loads. `/admin` and `/signal` need both Supabase variables to be set.

For admin access, create a user in Supabase Auth, or use the sign-up form on `/admin`. Right now the only table the code refers to is `projects`, with the columns `id`, `title`, `description`, `image_url` and `created_at`.

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key. |
| `NEXT_PUBLIC_VIDEO_LOG_URL` | Optional. The URL for the VIDEO LOG tile. Defaults to `https://www.visualspam.et`. |

Local env files matching `.env*.local` are git-ignored.

## Deployment

The site is deployed on Vercel at https://visualspam.vercel.app. The repo has no `vercel.json`, so it uses the default Next.js preset. Set the environment variables above in the Vercel project settings.
