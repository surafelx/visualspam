'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  created_at: string
}

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Sample Project 1',
        description: 'This is a sample project description.',
        image_url: 'https://via.placeholder.com/400x300',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Sample Project 2',
        description: 'Another sample project for demonstration.',
        image_url: 'https://via.placeholder.com/400x300',
        created_at: new Date().toISOString(),
      },
    ]
    setProjects(mockProjects)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
            ← BACK
          </Link>
        </div>
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-4xl font-bold mr-8">PROJECTS</h1>
          <div className="flex space-x-4">
            <button className="bg-gray-600 button-3d px-3 py-2 text-white font-semibold transform rotate-[-2deg] hover:rotate-0 transition-transform">
              ←
            </button>
            <button className="bg-gray-600 button-3d px-3 py-2 text-white font-semibold transform rotate-[2deg] hover:rotate-0 transition-transform">
              →
            </button>
          </div>
        </div>
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center relative z-10">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white bg-black/50 inline-block px-8 py-4 mb-4">COMING SOON</h1>
        <p className="text-white text-xl">Work portfolio section is under development</p>
      </div>
    </main>
  )
}