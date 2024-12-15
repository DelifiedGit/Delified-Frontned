import { NextResponse } from 'next/server'
import { fetchRegistrationById } from '@/lib/api'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const registration = await fetchRegistrationById(params.id)
    return NextResponse.json(registration)
  } catch (error) {
    console.error('Error fetching registration:', error)
    return NextResponse.json({ error: 'Failed to fetch registration' }, { status: 500 })
  }
}

