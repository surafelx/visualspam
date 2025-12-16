'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className={`fixed ${isHome ? 'top-0 left-0 right-0 z-40 transform -skew-x-12' : 'top-4 left-4 z-50'} `}>
      {isHome ? (
        <div className="flex flex-col items-center max-w-6xl mx-auto">
          <div className="flex space-x-4 mb-2">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black border border-white flex items-center justify-center"
            >
              <span className="text-white text-lg">IG</span>
            </a>
            {/* Telegram */}
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black border border-white flex items-center justify-center"
            >
              <span className="text-white text-lg">TG</span>
            </a>
          </div>
          <Link href="/" className="text-[15rem] font-bold text-red-500 tracking-wider glitch extenda-font transform -skew-x-12" style={{ WebkitTextStroke: '3px blue', textShadow: '4px 0px 0px blue, 4px 1px 0px blue, 4px -1px 0px blue' }}>
            visualspam
          </Link>
        </div>
      ) : (
        <Link href="/" className=" text-4xl font-bold text-red-500 tracking-wider extenda-font">
          visualspam
        </Link>
      )}
    </header>
  )
}