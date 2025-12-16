import Link from 'next/link'

export default function Info() {
  return (
    <main className="min-h-screen pt-20">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 px-8">
        <Link href="/" className="bg-gray-800 button-3d px-4 py-2 text-white font-semibold transform rotate-[-3deg] hover:rotate-0 transition-transform">
          ← BACK
        </Link>
        <div className="flex items-center">
          <div className="bg-blue-500 button-3d px-6 py-2 mr-8">
            <h1 className="text-4xl font-bold text-white">INFO</h1>
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

      {/* Info Content */}
      <div className="px-8 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-8">
          <section className="bg-blue-500 button-3d p-6 transform rotate-[-2deg] hover:rotate-0 transition-transform">
            <h2 className="text-white text-2xl font-bold mb-4">About</h2>
            <p className="text-blue-100">
              VisualSpam is a personal portfolio showcasing experimental audiovisual work.
              This is a living canvas for creative exploration and digital art.
            </p>
          </section>

          <section className="bg-blue-600 button-3d p-6 transform rotate-[2deg] hover:rotate-0 transition-transform">
            <h2 className="text-white text-2xl font-bold mb-4">Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/surafelx" className="text-blue-100 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            
              <li>
                <a href="https://instagram.com/visualspam" className="text-blue-100 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:workwithsurafel@email.com" className="text-blue-100 hover:text-white transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}