export type Show = {
  date: string // ISO date, used for sorting and for the upcoming/past split
  title: string
  format: string
  place?: string
  href?: string // a work page or an external link
}

export const shows: Show[] = [
  {
    date: '2026-01-14',
    title: 'A Little Taste of Jan-14',
    format: 'Live coding · DJ · AV',
    href: '/work/jan-14',
  },
]
