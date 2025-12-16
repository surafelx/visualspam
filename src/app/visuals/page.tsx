'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Visual {
  id: string
  title: string
  thumbnail: string
  videoUrl: string
  description: string
}

export default function Visuals() {
  const [currentVideo, setCurrentVideo] = useState<Visual | null>(null)

  // Mock visuals data
  const visuals: Visual[] = [
    {
      id: '1',
      title: 'Abstract Motion',
      thumbnail: 'https://via.placeholder.com/400x225',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      description: 'Experimental abstract motion graphics'
    },
    {
      id: '2',
      title: 'Digital Landscapes',
      thumbnail: 'https://via.placeholder.com/400x225',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      description: 'Generated digital landscapes'
    },
    {
      id: '3',
      title: 'Particle Systems',
      thumbnail: 'https://via.placeholder.com/400x225',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      description: 'Interactive particle animations'
    },
  ]

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center">
      <p className="text-white text-2xl">check again after 5 days</p>
    </main>
  )
}