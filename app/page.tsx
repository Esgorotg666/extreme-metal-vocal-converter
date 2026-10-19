'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LyricGenerator from '@/components/LyricGenerator'
import VocalRecorder from '@/components/VocalRecorder'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [lyrics, setLyrics] = useState('')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setUser(data.user)
    })
  }, [router])

  if (!user) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Extreme Metal Vocal Converter</h1>
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} className="text-sm text-zinc-400">
            Sign out
          </button>
        </header>

        <section>
          <h2 className="text-lg font-semibold mb-3">1. Generate Lyrics</h2>
          <LyricGenerator onLyrics={setLyrics} />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. Record Your Vocals</h2>
          <VocalRecorder />
          <p className="text-xs text-zinc-500 mt-2">Record the lyrics above (or your own). Cleaner takes convert better.</p>
        </section>

        <section className="border border-zinc-800 rounded p-4">
          <h2 className="text-lg font-semibold mb-2">3. Convert (coming soon)</h2>
          <p className="text-sm text-zinc-400">Upload instrumental + convert to Darkthrone / Immortal / Dark Funeral / Nargaroth style will be added once the API key is connected.</p>
        </section>
      </div>
    </div>
  )
}
