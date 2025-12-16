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
    <main className="min-h-screen pt-20">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 px-8">
        <Link href="/" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
          ← BACK
        </Link>
        <div className="flex items-center">
          <div className="bg-green-500 button-3d px-6 py-2 mr-8">
            <h1 className="text-4xl font-bold text-white">AUDIO</h1>
          </div>
          <div className="flex space-x-4">
            <button className="bg-gray-600 button-3d px-3 py-2 text-white font-semibold transform rotate-[-2deg] hover:rotate-0 transition-transform">
              ←
            </button>
            <button className="bg-gray-600 button-3d px-3 py-2 text-white font-semibold transform rotate-[2deg] hover:rotate-0 transition-transform">
              →
            </button>
          </div>
        </div>
        <div></div> {/* Spacer */}
      </div>

      {/* Audio Grid */}
      <div className="px-8 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="bg-green-500 button-3d p-6 transform rotate-[(index % 2 === 0 ? 3 : -3)deg] hover:rotate-0 transition-transform"
            >
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">{track.title}</h3>
                <p className="text-green-100 mb-4">{track.artist}</p>
                <p className="text-sm text-green-200 mb-4">Duration: {track.duration}</p>

                <audio
                  controls
                  className="w-full"
                  onPlay={() => setCurrentTrack(track.id)}
                  onPause={() => setCurrentTrack(null)}
                >
                  <source src={track.url} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>

                {currentTrack === track.id && (
                  <div className="mt-2 text-green-200 text-sm animate-pulse">
                    Now Playing
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}