import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  // TODO: Validate input
  // TODO: Process payment
  // TODO: Update registration status in database

  const checkout = {
    id: Date.now().toString(),
    ...body,
    status: 'completed'
  }

  return NextResponse.json(checkout, { status: 200 })
}