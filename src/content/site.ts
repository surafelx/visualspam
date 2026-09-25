// Everything the site says about the artist lives here and in works.ts / shows.ts.
// Edit these files to update the portfolio; no page code needs to change.

const CLOUDINARY = 'https://res.cloudinary.com/dnr6jc1yr'

export const media = {
  loop: `${CLOUDINARY}/video/upload/v1765879366/Untitled_design_q3wmpk.mp4`,
  liveCoding: `${CLOUDINARY}/video/upload/v1765882294/Untitled_design_1_ngjavh.mp4`,
  central: `${CLOUDINARY}/image/upload/v1765879909/central_bczypa.png`,
  ogPreview: `${CLOUDINARY}/image/upload/v1765879366/preview.jpg`,
}

export const site = {
  name: 'visualspam',
  tagline: 'Audiovisual artist',
  description:
    'visualspam is an audiovisual practice working with live-coded sound, generative visuals and performance.',
  url: 'https://visualspam.vercel.app',
  // The ASCII portrait in the hero. Put the photo in public/ (same-origin, so the
  // browser can read its pixels). crop is the part of the photo to use, as fractions
  // of its width and height: x, y = top-left corner, w, h = size.
  portrait: {
    src: '/portrait.jpg',
    crop: { x: 0.17, y: 0.15, w: 0.66, h: 0.44 },
  },
  // The video log is its own site. Set NEXT_PUBLIC_VIDEO_LOG_URL if it moves.
  videoLogUrl: process.env.NEXT_PUBLIC_VIDEO_LOG_URL || 'https://www.visualspam.et',
  disciplines: ['Live coding', 'Generative visuals', 'Sound', 'Performance'],
  about: [
    'visualspam is a personal practice for experimental audiovisual work: a living canvas where code is treated as an instrument and sound and image are made in the same gesture.',
    'The work moves between live-coded sets, DJ nights with real-time visuals, looping moving-image pieces and small browser instruments like the one on this page.',
  ],
  contact: {
    email: 'workwithsurafel@email.com',
  },
  links: [
    { label: 'Instagram', href: 'https://instagram.com/visualspam' },
    { label: 'Telegram', href: 'https://t.me/SurafelYimam' },
    { label: 'GitHub', href: 'https://github.com/surafelx' },
  ],
}
