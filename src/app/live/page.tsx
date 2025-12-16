import Link from 'next/link'
import Image from 'next/image'

interface Show {
  id: string
  title: string
  description: string
  date: string
  thumbnail: string
}

export default function Shows() {
  // Mock shows data
  const shows: Show[] = [
    {
      id: '1',
      title: 'Live Performance #1',
      description: 'Experimental audiovisual performance',
      date: '2024-01-15',
      thumbnail: 'https://via.placeholder.com/400x225'
    },
    {
      id: '2',
      title: 'Interactive Showcase',
      description: 'Real-time generative art demonstration',
      date: '2024-02-20',
      thumbnail: 'https://via.placeholder.com/400x225'
    },
    {
      id: '3',
      title: 'Sound & Vision',
      description: 'Synchronized audio-visual experience',
      date: '2024-03-10',
      thumbnail: 'https://via.placeholder.com/400x225'
    },
  ]

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center relative z-10">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white bg-black/50 inline-block px-8 py-4 mb-4">COMING SOON</h1>
        <p className="text-white text-xl">Live performances section is under development</p>
      </div>
    </main>
  )
}