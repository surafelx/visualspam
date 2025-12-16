'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Note {
  id: string
  title: string
  content: string
  created_at: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    const mockNotes: Note[] = [
      {
        id: '1',
        title: 'Creative Process Notes',
        content: 'Today I explored new audiovisual techniques...',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Technical Insights',
        content: 'Working with WebGL has been challenging but rewarding...',
        created_at: new Date().toISOString(),
      },
    ]
    setNotes(mockNotes)
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
          <h1 className="text-4xl font-bold mr-8">BLOG</h1>
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
    <main className="min-h-screen pt-20">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 px-8">
        <Link href="/" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
          ← BACK
        </Link>
        <div className="flex items-center">
          <div className="bg-purple-500 button-3d px-6 py-2 mr-8">
            <h1 className="text-4xl font-bold text-white">BLOG</h1>
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

      {/* Blog List */}
      <div className="px-8 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {notes.map((note, index) => (
            <Link key={note.id} href={`/notes/${note.id}`}>
              <article className={`bg-purple-500 button-3d p-6 w-full transform rotate-[${index % 2 === 0 ? 2 : -2}deg] hover:rotate-0 transition-transform cursor-pointer`}>
                <h2 className="text-white text-xl font-bold mb-4">{note.title}</h2>
                <p className="text-purple-100 whitespace-pre-wrap mb-4">{note.content}</p>
                <time className="text-purple-200 text-sm">
                  {new Date(note.created_at).toLocaleDateString()}
                </time>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}