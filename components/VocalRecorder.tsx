'use client'

import { useState, useRef } from 'react'

export default function VocalRecorder() {
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder.current = new MediaRecorder(stream)
    chunks.current = []

    mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data)
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' })
      setAudioUrl(URL.createObjectURL(blob))
    }

    mediaRecorder.current.start()
    setRecording(true)
  }

  function stop() {
    mediaRecorder.current?.stop()
    setRecording(false)
  }

  return (
    <div className="space-y-3">
      <button
        onClick={recording ? stop : start}
        className={`px-4 py-2 rounded font-medium ${recording ? 'bg-red-600' : 'bg-zinc-700 hover:bg-zinc-600'}`}
      >
        {recording ? 'Stop Recording' : 'Record Vocals'}
      </button>
      {audioUrl && <audio src={audioUrl} controls className="w-full" />}
    </div>
  )
}
