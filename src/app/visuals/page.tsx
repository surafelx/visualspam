'use client'

import { useState } from 'react'
import Link from 'next/link'

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
    <main className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="absolute top-20 left-8 z-20">
        <Link href="/" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
          ← BACK
        </Link>
      </div>

      {/* Title and Pagination */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 flex items-center">
        <div className="bg-yellow-500 button-3d px-6 py-2 mr-8">
          <h1 className="text-4xl font-bold text-white">VISUALS</h1>
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

      {/* Large video player */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-4xl px-8">
        {currentVideo ? (
          <div>
            <video
              controls
              autoPlay
              className="w-full aspect-video bg-black"
              poster={currentVideo.thumbnail}
            >
              <source src={currentVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
              <p className="text-gray-400">{currentVideo.description}</p>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gray-800 flex items-center justify-center">
            <p className="text-gray-400 text-xl">Select a visual to play</p>
          </div>
        )}
      </div>

      {/* Scrolling carousel */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-6xl px-8">
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max">
            {visuals.map((visual, index) => (
              <div
                key={visual.id}
                className={`flex-shrink-0 w-80 bg-yellow-500 button-3d p-4 transform rotate-[${index % 2 === 0 ? 2 : -2}deg] hover:rotate-0 transition-transform cursor-pointer ${
                  currentVideo?.id === visual.id ? 'ring-4 ring-yellow-300' : ''
                }`}
                onClick={() => setCurrentVideo(visual)}
              >
                <img
                  src={visual.thumbnail}
                  alt={visual.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-white font-bold mb-2">{visual.title}</h3>
                <p className="text-yellow-100 text-sm">{visual.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}