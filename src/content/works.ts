import { media } from './site'

export type Work = {
  slug: string
  title: string
  year: string
  kind: string
  summary: string
  body: string[]
  tags: string[]
  // A looping clip shown on the card and at the top of the work page.
  video?: string
  image?: string
  // Extra facts shown beside the description, e.g. venue or tools.
  details?: { label: string; value: string }[]
}

// Newest first. Add a new object here to publish a new piece.
export const works: Work[] = [
  {
    slug: 'jan-14',
    title: 'A Little Taste of Jan-14',
    year: '2026',
    kind: 'Live performance',
    summary: 'A live coding and DJ night: code as instrument, with real-time visuals.',
    body: [
      'Code as instrument. Sound is generated in real time from code written on stage, then handed to a surprise DJ who blends traditional mixing with the algorithmic material.',
      'The visuals follow the music live: spectrum, waveform and particle layers driven by the set. Code, sound and visuals together, as one immersive piece.',
    ],
    tags: ['Live coding', 'DJ', 'Real-time visuals'],
    video: media.liveCoding,
    details: [
      { label: 'Date', value: '14 January 2026' },
      { label: 'Format', value: 'Live coding + DJ + AV' },
    ],
  },
  {
    slug: 'visualspam-loop',
    title: 'visualspam loop',
    year: '2025',
    kind: 'Moving image',
    summary: 'The looping visual that has run behind visualspam since the first version of the site.',
    body: [
      'A seamless moving-image loop made as the visual identity of visualspam. It was built to sit underneath everything else: text, tiles and sound.',
    ],
    tags: ['Loop', 'Moving image'],
    video: media.loop,
  },
  {
    slug: 'central',
    title: 'Central',
    year: '2025',
    kind: 'Still image',
    summary: 'The floating centrepiece from the original visualspam home page.',
    body: [
      'A single still image that floated and glitched at the centre of the first visualspam site, framed by the wordmark and the menu tiles.',
    ],
    tags: ['Image', 'Glitch'],
    image: media.central,
  },
]

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug)
}
