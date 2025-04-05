import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Your MailerLite API Key - store this in .env.local
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY

    // In v3, we don't need a group ID for basic subscriber creation
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: name || '',
          company: company || '',
        },
        // You can add groups later using the subscriber's ID
        groups: [], // This will be empty for now
        status: 'active'
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to subscribe')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to subscribe" },
      { status: 500 }
    )
  }
} 