import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">

      {/* VisualSpam Text */}
      <div className="absolute top-0 left-0 right-0 z-50 transform -skew-x-12 flex justify-center">
        <Link href="/" className="text-[15rem] font-bold text-red-500 tracking-wider glitch extenda-font transform -skew-x-12" style={{ WebkitTextStroke: '3px blue', textShadow: '4px 0px 0px blue, 4px 1px 0px blue, 4px -1px 0px blue' }}>
          visualspam
        </Link>
      </div>

      {/* Central Image */}
      <div className="absolute top-0 z-60" style={{ left: '50%', marginLeft: '-400px' }}>
        <Image
          src="https://res.cloudinary.com/dnr6jc1yr/image/upload/v1765879909/central_bczypa.png"
          alt="Central Image"
          width={800}
          height={800}
          className="w-[800px] h-[800px] lg:w-[1000px] lg:h-[1000px] object-contain glitch animate-float drop-shadow-2xl"
          style={{ minWidth: '800px', minHeight: '800px' }}
        />
      </div>

      {/* Left Buttons */}
      <div className="absolute left-2 lg:left-1/4 top-1/2 transform -translate-y-1/2 space-y-12 z-10">
        <Link href="/info" className="block animate-button-float" style={{ animationDelay: '0s' }}>
          <div className="bg-blue-500 button-3d px-12 py-6 md:px-16 md:py-8 text-white font-semibold transform rotate-[-8deg] hover:rotate-0 transition-transform text-xl md:text-3xl">
            INFO
          </div>
        </Link>
        <Link href="/visuals" className="block animate-button-float" style={{ animationDelay: '1s' }}>
          <div className="bg-yellow-500 button-3d px-12 py-6 md:px-16 md:py-8 text-white font-semibold transform rotate-[12deg] hover:rotate-0 transition-transform text-xl md:text-3xl">
            VISUALS
          </div>
        </Link>
        <Link href="/notes" className="block animate-button-float" style={{ animationDelay: '2s' }}>
          <div className="bg-purple-500 button-3d px-12 py-6 md:px-16 md:py-8 text-white font-semibold transform rotate-[-6deg] hover:rotate-0 transition-transform text-xl md:text-3xl">
            BLOG
          </div>
        </Link>
      </div>

      {/* Right Buttons */}
      <div className="absolute right-2 lg:right-1/4 top-1/2 transform -translate-y-1/2 space-y-12 z-10">
        <Link href="/work" className="block animate-button-float" style={{ animationDelay: '0.5s' }}>
          <div className="bg-red-500 button-3d px-12 py-6 md:px-16 md:py-8 text-white font-semibold transform rotate-[10deg] hover:rotate-0 transition-transform text-xl md:text-3xl">
            PROJECTS
          </div>
        </Link>
        <Link href="/files" className="block animate-button-float" style={{ animationDelay: '1.5s' }}>
          <div className="bg-orange-500 button-3d px-12 py-6 md:px-16 md:py-8 text-white font-semibold transform rotate-[-10deg] hover:rotate-0 transition-transform text-xl md:text-3xl">
            AUDIO
          </div>
        </Link>
        <Link href="/live" className="block animate-button-float" style={{ animationDelay: '2.5s' }}>
          <div className="bg-pink-500 button-3d px-12 py-6 md:px-16 md:py-8 text-white font-semibold transform rotate-[8deg] hover:rotate-0 transition-transform text-xl md:text-3xl">
            SHOWS
          </div>
        </Link>
      </div>

   
    </main>
  )
}
