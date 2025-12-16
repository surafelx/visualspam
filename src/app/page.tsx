import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">

      {/* Central Image */}
      <div className="absolute top-0 z-60" style={{ left: '50%', marginLeft: '-400px' }}>
        <Image
          src="https://res.cloudinary.com/dnr6jc1yr/image/upload/v1765879909/central_bczypa.png"
          alt="Central Image"
          width={800}
          height={800}
          className="w-[800px] h-[800px] object-contain glitch animate-float"
          style={{ minWidth: '800px', minHeight: '800px' }}
        />
      </div>

      {/* Left Buttons */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 space-y-12 z-10">
        <Link href="/info" className="block animate-button-float" style={{ animationDelay: '0s' }}>
          <div className="bg-blue-500 button-3d px-8 py-4 md:px-12 md:py-6 text-white font-semibold transform rotate-[-8deg] hover:rotate-0 transition-transform text-lg md:text-2xl">
            INFO
          </div>
        </Link>
        <Link href="/visuals" className="block animate-button-float" style={{ animationDelay: '1s' }}>
          <div className="bg-yellow-500 button-3d px-8 py-4 md:px-12 md:py-6 text-white font-semibold transform rotate-[12deg] hover:rotate-0 transition-transform text-lg md:text-2xl">
            VISUALS
          </div>
        </Link>
        <Link href="/notes" className="block animate-button-float" style={{ animationDelay: '2s' }}>
          <div className="bg-purple-500 button-3d px-8 py-4 md:px-12 md:py-6 text-white font-semibold transform rotate-[-6deg] hover:rotate-0 transition-transform text-lg md:text-2xl">
            BLOG
          </div>
        </Link>
      </div>

      {/* Right Buttons */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 space-y-12 z-10">
        <Link href="/work" className="block animate-button-float" style={{ animationDelay: '0.5s' }}>
          <div className="bg-red-500 button-3d px-8 py-4 md:px-12 md:py-6 text-white font-semibold transform rotate-[10deg] hover:rotate-0 transition-transform text-lg md:text-2xl">
            PROJECTS
          </div>
        </Link>
        <Link href="/files" className="block animate-button-float" style={{ animationDelay: '1.5s' }}>
          <div className="bg-orange-500 button-3d px-8 py-4 md:px-12 md:py-6 text-white font-semibold transform rotate-[-10deg] hover:rotate-0 transition-transform text-lg md:text-2xl">
            AUDIO
          </div>
        </Link>
        <Link href="/live" className="block animate-button-float" style={{ animationDelay: '2.5s' }}>
          <div className="bg-pink-500 button-3d px-8 py-4 md:px-12 md:py-6 text-white font-semibold transform rotate-[8deg] hover:rotate-0 transition-transform text-lg md:text-2xl">
            SHOWS
          </div>
        </Link>
      </div>

   
    </main>
  )
}
