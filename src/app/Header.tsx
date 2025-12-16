'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className={`fixed ${isHome ? 'top-0 left-0 right-0 z-30 transform -skew-x-12' : 'top-4 left-4 z-50'} `}>
      {isHome ? (
        <div className="flex flex-col items-center max-w-6xl mx-auto">
          <div className="flex space-x-4 mb-2">
            {/* Instagram */}
            <a
              href="https://instagram.com/visualspam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black border border-white flex items-center justify-center"
            >
              <span className="text-white text-lg">IG</span>
            </a>
            {/* Telegram */}
            <a
              href="https://t.me/SurafelYimam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black border border-white flex items-center justify-center"
            >
              <span className="text-white text-lg">TG</span>
            </a>
          </div>
        </div>
      ) : (
        <Link href="/" className=" text-4xl font-bold text-red-500 tracking-wider extenda-font">
          visualspam
        </Link>
      )}
    </header>
  )
}