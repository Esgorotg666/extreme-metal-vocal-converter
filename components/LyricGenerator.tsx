'use client'

import { useState } from 'react'

export default function LyricGenerator({ onLyrics }: { onLyrics: (lyrics: string) => void }) {
  const [theme, setTheme] = useState('cold, frozen, misanthropic, ancient, black metal')
  const [lyrics, setLyrics] = useState('')
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)
    const res = await fetch('/api/lyrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme })
    })
    const data = await res.json()
    setLyrics(data.lyrics)
    onLyrics(data.lyrics)
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <textarea
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-sm"
        rows={2}
        placeholder="Describe the mood / theme..."
      />
      <button
        onClick={generate}
        disabled={loading}
        className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Lyrics'}
      </button>
      {lyrics && (
        <pre className="bg-zinc-950 border border-zinc-800 p-3 text-sm whitespace-pre-wrap rounded">
          {lyrics}
        </pre>
      )}
    </div>
  )
}
