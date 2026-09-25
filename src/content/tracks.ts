export type Track = {
  title: string
  year: string
  // An audio file (mp3/wav/ogg/m4a). It must be same-origin (put it in public/audio/)
  // or served with CORS headers (Cloudinary is), so the visuals can listen to it.
  src: string
  note?: string // e.g. "Live at Jan-14", "Mix"
}

// Add your tracks here. The player on the home page appears once this list has
// at least one entry. Example:
//   { title: 'Jan-14 live set', year: '2026', src: '/audio/jan-14.mp3', note: 'Live' },
export const tracks: Track[] = []
