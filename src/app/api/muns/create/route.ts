import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')

  if (!token || token.value !== 'valid_admin_token') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  // TODO: Validate input
  // TODO: Save to database

  const newMun = {
    id: Date.now().toString(),
    ...body
  }

  return NextResponse.json(newMun, { status: 201 })
}