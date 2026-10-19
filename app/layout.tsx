import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Extreme Metal Vocal Converter',
  description: 'Convert your vocals to classic second-wave black metal style',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
