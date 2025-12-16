import Link from 'next/link'

export default function Jan14() {
  return (
    <main className="min-h-screen pt-20">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 px-8">
        <Link href="/" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
          ← BACK
        </Link>
        <h1 className="text-4xl font-bold">JAN-14</h1>
        <div></div> {/* Spacer */}
      </div>

      {/* Blog Content */}
      <div className="px-8 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-bold text-white bg-black/50 inline-block px-8 py-4">A LITTLE TASTE</h1>
        </div>

        

        <article className="max-w-4xl mx-auto space-y-6">
          <section className="p-8 bg-black/50 rounded-lg">
            <h2 className="text-white text-3xl font-bold mb-4">What is Live Coding Music?</h2>
            <p className="text-white leading-relaxed">
              Live coding music represents a revolutionary approach to musical performance where artists write and modify computer code in real-time to generate sound. Unlike traditional music production, live coders compose algorithms that create music on the fly, manipulating parameters, functions, and data structures to produce evolving soundscapes. This form of generative music blurs the line between composition and performance, turning the coding process itself into an artistic act.
            </p>
          </section>

          <section className="p-8 bg-black/50 rounded-lg">
            <h2 className="text-white text-3xl font-bold mb-4">Surprise Guest DJ and Vocalists</h2>
            <p className="text-white leading-relaxed mb-4">
              Adding an element of unpredictability and human connection, our event features a surprise guest DJ who will seamlessly blend traditional DJ techniques with the digital realm. Their curated selections will provide rhythmic foundations that interact with the live-coded elements.
            </p>
            <p className="text-white leading-relaxed">
              Complementing the electronic sounds, a group of talented vocalists will contribute live improvisations, adding emotional depth and organic textures to the performance. Their voices will respond to the evolving code-generated music, creating spontaneous harmonies and vocal explorations that bridge the gap between human expression and algorithmic creativity.
            </p>
          </section>

          <section className="p-8 bg-black/50 rounded-lg">
            <h2 className="text-white text-3xl font-bold mb-4">Visuals and Audio-Reactivity</h2>
            <p className="text-white leading-relaxed mb-4">
              At the heart of our experimental setup lies audio-reactive visuals - dynamic graphics that respond in real-time to the music's properties. Using advanced algorithms, visual elements morph, pulse, and transform based on frequency analysis, amplitude, and spectral content of the live-coded sounds.
            </p>
            <p className="text-white leading-relaxed">
              This creates a symbiotic relationship where the visuals not only illustrate the music but actively participate in the performance. Shapes might fractalize with bass frequencies, colors shift with melodic changes, and patterns emerge from rhythmic structures, turning the entire space into a living, breathing audiovisual organism.
            </p>
          </section>

          <section className="p-8 bg-black/50 rounded-lg">
            <h2 className="text-white text-3xl font-bold mb-4">The Experimental Audio-Visual Experience</h2>
            <p className="text-white leading-relaxed mb-4">
              When live coding music converges with audio-reactive visuals, surprise DJ sets, and live vocal performances, something truly extraordinary emerges. This experimental audio-visual experience transcends traditional entertainment, becoming an immersive journey where technology and artistry intertwine.
            </p>
            <p className="text-white leading-relaxed">
              The relevance lies in its ability to push boundaries - challenging our perceptions of music, performance, and human-machine collaboration. In an era of digital saturation, these experiences remind us of the limitless possibilities when code becomes canvas, sound becomes sculpture, and visuals become extensions of musical expression. It's not just about creating art; it's about redefining how we experience it.
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}