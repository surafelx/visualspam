import Link from 'next/link'

export default function Jan14() {
  return (
    <main className="min-h-screen relative z-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-12 px-8">
        <Link href="/" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
          ← BACK
        </Link>
        <div className="p-4 bg-green-500 button-3d transform rotate-[-2deg]">
          <h1 className="text-4xl font-bold text-white">A LITTLE TASTE OF JAN-14</h1>
        </div>
        <div></div> {/* Spacer */}
      </div>

      {/* Blog Content */}
      <div className="px-8 max-h-[calc(100vh-200px)] overflow-y-auto">

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Live Coding Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-6 bg-blue-500 button-3d rounded-lg transform rotate-[-5deg]">
              <h2 className="text-white text-2xl font-bold mb-2">Live Coding</h2>
              <p className="text-white text-sm leading-relaxed">
                Code as instrument. Real-time sound generation.
              </p>
            </div>
            <div className="relative">
              <video
                className="w-full h-48 shadow-2xl border-4 border-white/20 bg-black/80"
                controls
                src="https://res.cloudinary.com/dnr6jc1yr/video/upload/v1765882294/Untitled_design_1_ngjavh.mp4"
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Surprise DJ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-6 bg-orange-500 button-3d transform rotate-[4deg]">
              <h2 className="text-white text-2xl font-bold mb-2">Surprise DJ</h2>
              <p className="text-white text-sm leading-relaxed">
                Unexpected beats blend with live code. Traditional DJing meets algorithmic music.
              </p>
            </div>
            <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 button-3d transform rotate-[-4deg] flex items-center justify-center">
              <span className="text-white text-6xl">🎧</span>
            </div>
          </div>

          {/* Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-gradient-to-br from-cyan-500 to-blue-600 button-3d transform rotate-[-3deg] flex items-center justify-center">
              <span className="text-white text-sm font-bold">SPECTRUM</span>
            </div>
            <div className="h-32 bg-gradient-to-br from-yellow-500 to-orange-600 button-3d transform rotate-[3deg] flex items-center justify-center">
              <span className="text-white text-sm font-bold">WAVEFORM</span>
            </div>
            <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-600 button-3d transform rotate-[-2deg] flex items-center justify-center">
              <span className="text-white text-sm font-bold">PARTICLES</span>
            </div>
          </div>

          {/* Experience */}
          <div className="text-center p-8 bg-purple-500 button-3d rounded-lg transform rotate-[-3deg]">
            <h2 className="text-white text-3xl font-bold mb-4">AV Experience</h2>
            <p className="text-white text-lg leading-relaxed max-w-2xl mx-auto">
              Code + Sound + Visuals = Immersive Art.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}