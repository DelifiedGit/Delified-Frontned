import { NextResponse } from 'next/server'
import { processPayment } from '@/lib/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payment = await processPayment(body)
    return NextResponse.json(payment)
  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 })
  }
}

