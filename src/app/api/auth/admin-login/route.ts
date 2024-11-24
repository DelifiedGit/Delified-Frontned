import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Dummy admin user (in a real app, this would be stored securely in a database)
const dummyAdminUser = {
  username: 'admin',
  password: 'password123', // In a real app, this would be hashed
}

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  if (username === dummyAdminUser.username && password === dummyAdminUser.password) {
    // In a real app, you would generate a secure token here
    const token = 'valid_admin_token'

    // Set the token in a secure, HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    })

    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}