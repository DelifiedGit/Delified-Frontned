import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  // TODO: Validate input
  // TODO: Save registration to database
  // TODO: Send confirmation email

  const registration = {
    id: Date.now().toString(),
    ...body,
    status: 'pending'
  }

  return NextResponse.json(registration, { status: 201 })
}