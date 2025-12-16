export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center relative z-10">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    </main>
  )
}