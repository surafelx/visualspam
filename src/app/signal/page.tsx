'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  topPages: { page: string; views: number }[]
}

export default function Signal() {
  const [user, setUser] = useState<User | null>(null)
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user) {
      // Mock data for now - replace with actual analytics service
      setTimeout(() => {
        setData({
          pageViews: 1234,
          uniqueVisitors: 567,
          topPages: [
            { page: '/', views: 500 },
            { page: '/work', views: 300 },
            { page: '/notes', views: 150 },
          ],
        })
      }, 1000)
    }
  }, [user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      alert(error.message)
    }
    setAuthLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Signal</h1>
        <p>Loading...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-8 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white/10 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/10 rounded"
              required
            />
            <button
              type="submit"
              disabled={authLoading}
              className="w-full p-3 bg-white/20 hover:bg-white/30 rounded transition-colors"
            >
              {authLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Private Analytics</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
        >
          Logout
        </button>
      </div>
      {data && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/5 rounded">
              <h2 className="text-2xl font-semibold mb-2">Page Views</h2>
              <p className="text-4xl font-bold">{data.pageViews}</p>
            </div>
            <div className="p-6 bg-white/5 rounded">
              <h2 className="text-2xl font-semibold mb-2">Unique Visitors</h2>
              <p className="text-4xl font-bold">{data.uniqueVisitors}</p>
            </div>
          </div>
          <div className="p-6 bg-white/5 rounded">
            <h2 className="text-2xl font-semibold mb-4">Top Pages</h2>
            <ul className="space-y-2">
              {data.topPages.map((page, index) => (
                <li key={index} className="flex justify-between">
                  <span>{page.page}</span>
                  <span>{page.views} views</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}