'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  media_url?: string
  created_at: string
}

export default function ProjectPage() {
  const params = useParams()
  const id = params.id as string
  const [project, setProject] = useState<Project | null>(null)
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

    const foundProject = mockProjects.find(p => p.id === id)
    setProject(foundProject || null)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <p>Loading...</p>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen p-8">
        <p>Project not found</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-white text-2xl">check again after 5 days</p>
    </main>
  )
}