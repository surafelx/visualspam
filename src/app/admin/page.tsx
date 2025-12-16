'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  created_at: string
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState<Project[]>([])

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState({ title: '', description: '', image_url: '' })

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
      fetchProjects()
    }
  }, [user])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
    } else {
      setProjects(data || [])
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        alert(error.message)
      } else {
        alert('Check your email for confirmation')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        alert(error.message)
      }
    }
    setAuthLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('projects')
      .insert([newProject])

    if (error) {
      alert(error.message)
    } else {
      setNewProject({ title: '', description: '', image_url: '' })
      fetchProjects()
      setShowModal(false)
    }
  }

  const handleEditProject = (project: Project) => {
    setIsEditing(true)
    setEditingProject(project)
    setShowModal(true)
  }

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return

    const { error } = await supabase
      .from('projects')
      .update({
        title: editingProject.title,
        description: editingProject.description,
        image_url: editingProject.image_url,
      })
      .eq('id', editingProject.id)

    if (error) {
      alert(error.message)
    } else {
      setEditingProject(null)
      setShowModal(false)
      fetchProjects()
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
    } else {
      fetchProjects()
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Admin</h1>
        <p>Loading...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-8 text-center">Admin Access</h1>
          <div className="flex mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 ${!isSignUp ? 'bg-white/20' : 'bg-white/10'} rounded-l transition-colors`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 ${isSignUp ? 'bg-white/20' : 'bg-white/10'} rounded-r transition-colors`}
            >
              Sign Up
            </button>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
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
              {authLoading ? (isSignUp ? 'Signing up...' : 'Signing in...') : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-2">
          <div className="mb-4">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
            >
              Logout
            </button>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${
              activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${
              activeTab === 'projects' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${
              activeTab === 'info' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Info
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${
              activeTab === 'notes' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${
              activeTab === 'files' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Files
          </button>
          <Link
            href="/signal"
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Analytics
          </Link>
          <Link
            href="/"
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            View Site
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
                <p className="text-3xl font-bold">{projects.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">System Status</h3>
                <p className="text-green-400">All systems operational</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Projects</h2>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditingProject(null)
                  setNewProject({ title: '', description: '', image_url: '' })
                  setShowModal(true)
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setIsEditing(true)
                          setEditingProject(project)
                          setShowModal(true)
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Info Management</h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">About Section</h3>
              <p className="text-gray-400 mb-4">Manage the about text and links displayed on the info page.</p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
                Edit Info
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Notes Management</h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Blog Posts</h3>
              <p className="text-gray-400 mb-4">Manage notes and blog posts.</p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
                Add Note
              </button>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Files Management</h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Downloadable Files</h3>
              <p className="text-gray-400 mb-4">Manage downloadable artifacts, audio, and visual files.</p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
                Upload File
              </button>
            </div>
          </div>
        )}

        {/* Modal for Add/Edit Project */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">
                {isEditing ? 'Edit Project' : 'Add New Project'}
              </h3>
              <form onSubmit={isEditing ? handleUpdateProject : handleAddProject} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={isEditing ? editingProject?.title || '' : newProject.title}
                  onChange={(e) => {
                    if (isEditing && editingProject) {
                      setEditingProject({ ...editingProject, title: e.target.value })
                    } else {
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                  }}
                  className="w-full p-3 bg-gray-700 rounded"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={isEditing ? editingProject?.description || '' : newProject.description}
                  onChange={(e) => {
                    if (isEditing && editingProject) {
                      setEditingProject({ ...editingProject, description: e.target.value })
                    } else {
                      setNewProject({ ...newProject, description: e.target.value })
                    }
                  }}
                  className="w-full p-3 bg-gray-700 rounded"
                  rows={3}
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={isEditing ? editingProject?.image_url || '' : newProject.image_url}
                  onChange={(e) => {
                    if (isEditing && editingProject) {
                      setEditingProject({ ...editingProject, image_url: e.target.value })
                    } else {
                      setNewProject({ ...newProject, image_url: e.target.value })
                    }
                  }}
                  className="w-full p-3 bg-gray-700 rounded"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
                  >
                    {isEditing ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}