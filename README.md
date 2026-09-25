# visualspam

Portfolio site for **visualspam**, an audiovisual artist working with live-coded sound, generative visuals and performance. Built with Next.js and Tailwind CSS.

Live site: https://visualspam.vercel.app

The previous version of the site (the floating-tiles home page, Supabase admin and "coming soon" sections) is kept on the `archive/visualspam-v1` branch.

## What's on the site

- **Hero**: the visualspam video loop, an interactive ASCII portrait of the artist, and the wordmark.
  - The portrait is drawn as text every frame from a photo. The head turns to look at the pointer, or at whichever button you hover. Characters near the pointer glitch, and inside the portrait the cursor becomes a small ASCII face.
  - The `[ WORK ] [ LIVE ] [ SOUND ] [ ABOUT ] [ CONTACT ]` buttons around the head link into the page. A `[ ] colour` toggle switches to the photo's own colours.
- **Work** (`/#work`): a grid of pieces. Hovering a card plays its clip. Each piece has its own page at `/work/<slug>`.
- **Live** (`/#live`): upcoming and past performances, split automatically by date.
- **Sound** (`/#sound`): a small Web Audio instrument whose oscilloscope draws what you hear. Drag on the scope to play it.
- **About** and **Contact**.
- **Video log**: links out to the separate video-log site.

Old routes redirect to their new place: `/jan-14` goes to `/work/jan-14`, and `/visuals`, `/live`, `/files` and `/info` go to sections on the home page.

## Editing content

All content is in `src/content/`. You don't need to touch page code to change it.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, tagline, about text, email, social links, media URLs and the portrait settings |
| `works.ts` | Portfolio pieces. Add an object to publish a new piece. |
| `shows.ts` | Performances, with dates. |

### The portrait

Put the photo at `public/portrait.jpg`. It needs to be same-origin so the browser can read its pixels. Then set `site.portrait.crop` in `site.ts` to frame the face, using fractions of the photo's width and height. If the photo is missing, a generic drawn head is shown instead.

## Run it locally

Requirements: Node.js 20.9 or later.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_VIDEO_LOG_URL` | Optional. URL for the video log link. Defaults to `https://www.visualspam.et`. |

## Project structure

```
src/app/layout.tsx          Root layout, metadata, nav and footer
src/app/page.tsx            Home page: hero, work, live, sound, about, contact
src/app/work/[slug]/        One page per work
src/components/             Nav, Footer, WorkCard, AsciiPortrait, SignalInstrument
src/content/                Site content (see above)
```

Media is hosted on Cloudinary. `res.cloudinary.com` is allowed for `next/image` in `next.config.js`.
