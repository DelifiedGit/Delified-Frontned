import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  // In a real app, you would verify the token here
  if (token.value === 'valid_admin_token') {
    return NextResponse.json({ authenticated: true }, { status: 200 })
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}