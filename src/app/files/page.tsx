'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AudioTrack {
  id: string
  title: string
  artist: string
  duration: string
  url: string
}

export default function Audio() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)

  // Mock audio tracks
  const tracks: AudioTrack[] = [
    {
      id: '1',
      title: 'Ambient Soundscape',
      artist: 'VisualSpam',
      duration: '3:24',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Placeholder URL
    },
    {
      id: '2',
      title: 'Digital Noise',
      artist: 'VisualSpam',
      duration: '2:18',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Placeholder URL
    },
    {
      id: '3',
      title: 'Experimental Audio',
      artist: 'VisualSpam',
      duration: '4:12',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Placeholder URL
    },
  ]

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center">
      <p className="text-white text-2xl">check again after 5 days</p>
    </main>
  )
}