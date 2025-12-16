import Link from 'next/link'

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
    <main className="min-h-screen pt-20">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 px-8">
        <Link href="/" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
          ← BACK
        </Link>
        <div className="flex items-center">
          <div className="bg-pink-500 button-3d px-6 py-2 mr-8">
            <h1 className="text-4xl font-bold text-white">SHOWS</h1>
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

      {/* Shows Grid */}
      <div className="px-8 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {shows.map((show, index) => (
            <div
              key={show.id}
              className="bg-pink-500 button-3d p-6 transform rotate-[(index % 2 === 0 ? 4 : -4)deg] hover:rotate-0 transition-transform"
            >
              <img
                src={show.thumbnail}
                alt={show.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-white font-bold mb-2">{show.title}</h3>
              <p className="text-pink-100 text-sm mb-2">{show.description}</p>
              <p className="text-pink-200 text-xs">Date: {new Date(show.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}