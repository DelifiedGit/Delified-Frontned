import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const response = NextResponse.json({ success: true });
  // Clear the auth token cookie
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // This will cause the cookie to expire immediately
    path: '/',
  })

  return NextResponse.json({ success: true })
}