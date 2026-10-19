'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    })
  }

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/` }
    })
    setLoading(false)
    if (error) alert(error.message)
    else alert('Check your email for the magic link')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Extreme Metal Vocal Converter</h1>
        <p className="text-center text-zinc-400 text-sm">Convert your vocals to classic second-wave black metal style</p>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-white text-black py-3 rounded font-medium"
        >
          Continue with Google
        </button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-700" /></div>
          <div className="relative flex justify-center text-sm"><span className="bg-black px-2 text-zinc-500">or</span></div>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3"
        />
        <button
          onClick={signInWithEmail}
          disabled={loading || !email}
          className="w-full bg-red-700 hover:bg-red-600 py-3 rounded font-medium disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send magic link'}
        </button>
      </div>
    </div>
  )
}
