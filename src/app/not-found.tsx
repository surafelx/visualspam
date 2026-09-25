import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/50">No signal</p>
      <h1 className="font-display wordmark wordmark-glitch mt-4 text-[10rem] leading-none sm:text-[16rem]">404</h1>
      <Link href="/" className="mt-8 border border-paper/40 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:border-signal hover:text-signal">
        Back to visualspam
      </Link>
    </main>
  )
}
