import Link from 'next/link'

interface Note {
  id: string
  title: string
  content: string
  created_at: string
}

interface PageProps {
  params: {
    id: string
  }
}

export default function NoteDetail({ params }: PageProps) {
  // Mock data - in a real app, this would be fetched from a database
  const mockNotes: Note[] = [
    {
      id: '1',
      title: 'Creative Process Notes',
      content: 'Today I explored new audiovisual techniques. The intersection of sound and visual elements creates fascinating possibilities for expression. I\'ve been experimenting with generative art algorithms that respond to audio input in real-time. The challenge lies in creating systems that are both predictable enough to be coherent and unpredictable enough to be engaging.\n\nOne approach I\'ve found promising is using Web Audio API to analyze frequency data and map it to visual parameters. This creates a direct connection between the auditory and visual domains, where the music literally shapes the imagery.\n\nThe key insight is that successful audiovisual work requires understanding both mediums deeply. You can\'t just overlay visuals on sound; they need to be integrated at a fundamental level.',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Technical Insights',
      content: 'Working with WebGL has been challenging but rewarding. The low-level nature of graphics programming forces you to think about performance in ways that higher-level frameworks abstract away. Every draw call, every shader compilation, every texture upload matters.\n\nI\'ve learned that optimization is not just about making things faster, but about making the right trade-offs. Sometimes sacrificing visual fidelity for performance creates a better user experience. Other times, the visual impact justifies the computational cost.\n\nThe most important lesson has been about the iterative nature of creative coding. You start with a vision, implement a basic version, identify bottlenecks, optimize, and repeat. Each cycle brings you closer to the ideal balance of performance and aesthetics.',
      created_at: new Date().toISOString(),
    },
  ]

  const note = mockNotes.find(n => n.id === params.id)

  if (!note) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <Link href="/notes" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
            ← Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 px-8">
        <Link href="/notes" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
          ← BACK
        </Link>
        <h1 className="text-4xl font-bold">{note.title}</h1>
        <div></div> {/* Spacer */}
      </div>

      {/* Blog Content */}
      <div className="px-8 max-h-[calc(100vh-200px)] overflow-y-auto">
        <article className="max-w-4xl mx-auto bg-purple-500 button-3d p-8 transform rotate-[-1deg] hover:rotate-0 transition-transform">
          <h2 className="text-white text-3xl font-bold mb-6">{note.title}</h2>
          <div className="text-purple-100 whitespace-pre-wrap mb-6 leading-relaxed">
            {note.content}
          </div>
          <time className="text-purple-200 text-sm block">
            Published on {new Date(note.created_at).toLocaleDateString()}
          </time>
        </article>
      </div>
    </main>
  )
}