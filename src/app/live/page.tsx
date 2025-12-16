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
    <main className="min-h-screen pt-20 flex items-center justify-center">
      <p className="text-white text-2xl">check again after 5 days</p>
    </main>
  )
}