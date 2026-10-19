import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { theme } = await req.json()

  // Placeholder — replace with real LLM call (OpenAI / Anthropic) later
  const lyrics = `In the frozen wastes of forgotten realms\nThe black sun rises over broken thrones\nBlood on the snow, screams in the wind\nWe are the frost that never ends\n\nThrough the gates of eternal night\nWhere the old gods lie in chains\nI call the storm, I call the void\nSeven tears are flowing to the river again`

  return NextResponse.json({ lyrics })
}
